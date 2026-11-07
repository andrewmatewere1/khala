# PRD — Khalaumba ICT Portfolio Site

## Original Problem Statement
Build a portfolio site for an IT service company "Khalaumba ICT" with home, team, past project, service, contact us and design request form sections. Contact details: Khalaumba ICT, P.O. Box 140, Bvumbwe, Thyolo; Phone: +265 999 270 004 / +265 882 000 455; Email: info@khalaumba.net. Responsive on mobile, hero on home page, nav bar, quick actions in footer, external social icon links (Facebook, X, Instagram).

## User Choices (from ask_human)
- Look: clean corporate light + warm local-business feel, "modern and nice, not too AI design"
- Hero on home page with company tagline: yes
- Services: derived from full About Us text provided (Starlink, CCTV incl. AI license-plate, cabling/UPS, networks/VPN/servers, GPS & fuel monitoring, VSAT, IP PABX, access control, software/mobile dev, hosting)
- Design request form fields: Name, phone/email, project type, budget, message
- Form submissions: sent by email to info@khalaumba.net (Emergent-managed Resend integration)
- No admin/login requested

## Architecture
- Frontend: React (CRA + craco) + Tailwind + framer-motion + lenis smooth scroll + sonner toasts. Single-page site with anchor sections: #home, #about, #services, #projects, #team, #contact, #request-form. Custom SVG logo mark + favicon.
- Backend: FastAPI on :8001 (supervisor), routes under /api. POST /api/contact validates, stores in MongoDB (design_requests collection, uuid id + ISO created_at) and sends notification email via Emergent email proxy (guardrail gate _assert_safe_email applied; recipient from OWNER_EMAIL env, never caller-controlled).
- Env: backend/.env has MONGO_URL, DB_NAME, EMERGENT_EMAIL_KEY, EMAIL_FROM_NAME=Khalaumba ICT, EMAIL_REPLY_TO=info@khalaumba.net, OWNER_EMAIL=info@khalaumba.net.

## Implemented (2026-11-07)
- Sticky glass nav bar (desktop + mobile hamburger), kinetic hero with masked line-by-line reveal, animated signal-mesh canvas, parallax hero image, stat badges (Est. 1993, Cisco·A+, 24/7, License 16492)
- Slow editorial marquee band (Est. 1993 … 24/7 support)
- About section: company history, Mission, Vision, 4 Core Values, Corporate Strategy (exact user text)
- Services bento grid (6 cards, Starlink featured dark) + consultancy extras strip (RFP prep, SLAs, maintenance, repairs)
- Past Projects: 5 client case studies with exact user scope bullets (Sun N Sand, Sunseed Oil, Rainbow Paints, BIU, Satemwa) + "other clients upon request"
- Team ("Our People"): capability cards (Cisco engineers, A+ hardware board-to-component, software engineers) + 24/7 support card — no invented team member names
- Contact: address/phone/email cards with copy-to-clipboard, tel/mailto links, social band (FB/X/IG external)
- Design Request Form: name, phone/email, project type, budget, message → POST /api/contact → MongoDB + email to info@khalaumba.net; sonner success/error toasts
- Footer: quick actions (6), contact column, socials, license line

## Updates (2026-11-07)
- Floating WhatsApp chat button (wa.me/265999270004, pre-filled enquiry message).
- User's own logo (logo.png + K-mark favicon.png) replaced the custom SVG mark; whole palette switched from forest green to the logo's blue family (#4176BC primary, #2A4E80 deep).
- Hero now has a full-bleed IT background photo (server room) behind the headline with a paper overlay + animated signal mesh.
- Brand-styled thin scrollbar.
- Design request form delivery switched to Formspree (FORMSPREE_FORM_ID secret; backend accepts bare ID or full endpoint URL). Managed-email delivery kept as fallback when the ID is absent. Honeypot anti-spam field added. Verified end-to-end: email_sent=true, delivered_via=formspree.

## Verified
- curl POST /api/contact → {"status":"success","email_sent":true}
- Screenshots desktop 1440 & mobile 390: no overflow-x, mobile menu functional, all sections render

## Backlog / Next
- P2: Google Maps embed of Bvumbwe; WhatsApp click-to-chat button; team member profiles when names/photos provided
- Note: social links use placeholder handles (facebook.com/khalaumbaict etc.) — user should confirm real URLs
