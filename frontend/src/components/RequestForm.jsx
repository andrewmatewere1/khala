import { useState } from "react";
import axios from "axios";
import { Reveal, Eyebrow } from "./Reveal";
import { PROJECT_TYPES, BUDGET_RANGES } from "../data";
import { ChevronDown, Send, CheckCircle2, FileText, MailCheck, PhoneCall } from "lucide-react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const STEPS = [
    { icon: FileText, text: "Tell us about your site and requirements" },
    { icon: MailCheck, text: "We review and prepare a tailored proposal" },
    { icon: PhoneCall, text: "Our engineers contact you to plan the installation" },
];

const initialForm = { full_name: "", contact_info: "", project_type: "", budget: "", message: "" };

const inputCls =
    "w-full rounded-xl border border-sandline bg-paper px-4 py-3.5 text-sm text-ink outline-none transition-all placeholder:text-muted/60 focus:border-forest focus:ring-2 focus:ring-forest/15";

export default function RequestForm() {
    const [form, setForm] = useState(initialForm);
    const [sending, setSending] = useState(false);

    const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        if (!form.full_name.trim() || !form.contact_info.trim() || !form.project_type || !form.message.trim()) {
            toast.error("Please fill in your name, contact, project type and message");
            return;
        }
        setSending(true);
        try {
            const res = await axios.post(`${API}/contact`, form);
            if (res.data?.email_sent) {
                toast.success("Request received — our team will contact you shortly");
            } else {
                toast.success("Request received and saved — our team will contact you shortly");
            }
            setForm(initialForm);
        } catch (err) {
            toast.error(err.response?.data?.detail || "Something went wrong — please try again");
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="request-form" className="relative bg-cream py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <Reveal>
                            <Eyebrow>Design Request Form</Eyebrow>
                            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-forest sm:text-3xl lg:text-4xl">
                                Request a proposal for your project.
                            </h2>
                            <p className="mt-5 text-base leading-relaxed text-muted">
                                Whether it's a Starlink installation, a factory-wide CCTV rollout or
                                a custom software build — send us the details and our consultants
                                will respond with a tailored solution.
                            </p>
                        </Reveal>
                        <div className="mt-9 flex flex-col gap-5">
                            {STEPS.map((s, i) => (
                                <Reveal key={i} delay={0.08 + i * 0.08}>
                                    <div className="flex items-center gap-4" data-testid={`form-step-${i + 1}`}>
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-forest shadow-sm">
                                            <s.icon size={19} />
                                        </span>
                                        <p className="text-sm font-medium text-ink">{s.text}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    <Reveal delay={0.1} className="lg:col-span-7">
                        <form
                            onSubmit={submit}
                            className="rounded-2xl border border-sandline bg-white p-7 shadow-[0_20px_50px_-24px_rgba(65,118,188,0.25)] sm:p-9"
                            data-testid="design-request-form"
                        >
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="fr-name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-forest">
                                        Full Name *
                                    </label>
                                    <input
                                        id="fr-name"
                                        data-testid="form-name-input"
                                        className={inputCls}
                                        placeholder="Your name"
                                        value={form.full_name}
                                        onChange={set("full_name")}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="fr-contact" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-forest">
                                        Phone / Email *
                                    </label>
                                    <input
                                        id="fr-contact"
                                        data-testid="form-contact-input"
                                        className={inputCls}
                                        placeholder="+265 … or you@company.com"
                                        value={form.contact_info}
                                        onChange={set("contact_info")}
                                    />
                                </div>
                                <div className="relative">
                                    <label htmlFor="fr-type" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-forest">
                                        Project Type *
                                    </label>
                                    <select
                                        id="fr-type"
                                        data-testid="form-project-select"
                                        className={`${inputCls} appearance-none pr-10 ${form.project_type ? "" : "text-muted/60"}`}
                                        value={form.project_type}
                                        onChange={set("project_type")}
                                    >
                                        <option value="" disabled>
                                            Select a service…
                                        </option>
                                        {PROJECT_TYPES.map((t) => (
                                            <option key={t} value={t}>
                                                {t}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} className="pointer-events-none absolute bottom-4 right-4 text-muted" />
                                </div>
                                <div className="relative">
                                    <label htmlFor="fr-budget" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-forest">
                                        Estimated Budget
                                    </label>
                                    <select
                                        id="fr-budget"
                                        data-testid="form-budget-select"
                                        className={`${inputCls} appearance-none pr-10 ${form.budget ? "" : "text-muted/60"}`}
                                        value={form.budget}
                                        onChange={set("budget")}
                                    >
                                        <option value="" disabled>
                                            Select a range…
                                        </option>
                                        {BUDGET_RANGES.map((b) => (
                                            <option key={b} value={b}>
                                                {b}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} className="pointer-events-none absolute bottom-4 right-4 text-muted" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="fr-message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-forest">
                                        Project Requirements & Site Location *
                                    </label>
                                    <textarea
                                        id="fr-message"
                                        data-testid="form-message-input"
                                        rows={5}
                                        className={`${inputCls} resize-none`}
                                        placeholder="Describe your project, the site location and anything else we should know…"
                                        value={form.message}
                                        onChange={set("message")}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                data-testid="form-submit-button"
                                disabled={sending}
                                className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-clay px-7 py-4 font-semibold text-paper transition-all duration-300 hover:bg-forest disabled:opacity-60 sm:w-auto"
                            >
                                {sending ? "Sending…" : "Send Design Request"}
                                <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                            <p className="mt-4 flex items-center gap-2 text-xs text-muted">
                                <CheckCircle2 size={14} className="text-forest" />
                                Your request is emailed directly to our consultants at info@khalaumba.net
                            </p>
                        </form>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
