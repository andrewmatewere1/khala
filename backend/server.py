import asyncio
import ipaddress
import logging
import os
import re
import uuid
from contextlib import suppress
from datetime import datetime, timezone
from html import escape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from pymongo import ASCENDING, DESCENDING, IndexModel
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Emergent managed email proxy (constant survives deployment)
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "info@khalaumba.net")

INDEXES: dict[str, list[IndexModel]] = {
    "design_requests": [
        IndexModel([("id", ASCENDING)], name="id", unique=True),
        IndexModel([("created_at", DESCENDING)], name="created_at_desc"),
    ],
}


async def ensure_indexes() -> None:
    for collection, models in INDEXES.items():
        for model in models:
            try:
                await db[collection].create_indexes([model])
            except Exception as exc:
                logging.getLogger(__name__).error("ensure_indexes(%s.%s): %s", collection, model.document["name"], exc)


app = FastAPI()
api_router = APIRouter(prefix="/api")

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as http:
            resp = await http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        try:
            code = e.response.json().get("code", "")
        except ValueError:
            code = ""
        if code in ("insufficient_credits", "integration_disabled", "daily_limit_reached"):
            logging.getLogger(__name__).warning(
                f"Email paused: {code} ({e.response.status_code}): {e.response.json().get('message', '')}")
            raise HTTPException(status_code=503, detail="Email is temporarily unavailable")
        logging.getLogger(__name__).error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except Exception as e:
        logging.getLogger(__name__).error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    contact_info: str
    project_type: str
    budget: str
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


def _field_row(label: str, value: str) -> str:
    return (f'<tr><td style="padding:8px 12px;font-size:13px;color:#52635B;width:140px;'
            f'vertical-align:top">{escape(label)}</td>'
            f'<td style="padding:8px 12px;font-size:14px;color:#1A2421;font-weight:600">'
            f'{escape(value)}</td></tr>')


@api_router.get("/")
async def root():
    return {"message": "Khalaumba ICT API is running"}


@api_router.post("/contact")
async def submit_contact(input: ContactSubmission):
    full_name = input.full_name.strip()[:120]
    contact_info = input.contact_info.strip()[:200]
    project_type = input.project_type.strip()[:120]
    budget = input.budget.strip()[:120]
    message = input.message.strip()[:3000]
    if not full_name or not contact_info or not project_type or not message:
        raise HTTPException(status_code=422, detail="Please fill in all required fields")

    submission = ContactSubmission(
        full_name=full_name, contact_info=contact_info,
        project_type=project_type, budget=budget, message=message)
    doc = submission.model_dump()
    await db.design_requests.insert_one(doc)

    html = (
        '<table role="presentation" width="100%" style="background:#F3EFE6;padding:24px;'
        'font-family:Arial,sans-serif"><tr><td align="center">'
        '<table role="presentation" width="100%" style="background:#FFFFFF;border-radius:12px;'
        'padding:28px;max-width:560px">'
        '<tr><td><h2 style="color:#1B3B2B;margin:0 0 4px;font-size:20px">New Design Request</h2>'
        '<p style="color:#52635B;margin:0 0 14px;font-size:13px">'
        'Submitted through the Khalaumba ICT website request form</p>'
        f'<table role="presentation" width="100%" style="border-top:1px solid #E7E1D5">'
        + _field_row("Name", full_name)
        + _field_row("Phone / Email", contact_info)
        + _field_row("Project type", project_type)
        + _field_row("Budget", budget or "Not specified")
        + '</table>'
        f'<p style="margin:14px 0 0;font-size:13px;color:#52635B">Message</p>'
        f'<p style="margin:4px 0 0;font-size:14px;color:#1A2421;line-height:1.6">'
        f'{escape(message).replace(chr(10), "<br>")}</p>'
        '<p style="font-size:12px;color:#888;margin-top:22px">Sent by Khalaumba ICT. '
        'We never ask for your password or card details by email.</p>'
        '</td></tr></table></td></tr></table>')

    email_sent = True
    try:
        await send_email(
            to=OWNER_EMAIL,
            subject=f"New design request from {full_name}",
            html=html,
            reply_to=EMAIL_REPLY_TO,
        )
    except HTTPException as e:
        email_sent = False
        logging.getLogger(__name__).warning(f"Contact saved but email not sent: {e.detail}")

    return {"status": "success", "id": submission.id, "email_sent": email_sent}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def start_index_build():
    app.state.index_task = asyncio.create_task(ensure_indexes())


@app.on_event("shutdown")
async def shutdown_db_client():
    app.state.index_task.cancel()
    with suppress(asyncio.CancelledError):
        await app.state.index_task
    client.close()
