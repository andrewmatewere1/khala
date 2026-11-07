import { Reveal, Eyebrow } from "./Reveal";
import { BRAND } from "../data";
import { MapPin, Phone, Mail, Copy, Facebook, Twitter, Instagram, Clock } from "lucide-react";
import { toast } from "sonner";

const copy = async (value, label) => {
    try {
        await navigator.clipboard.writeText(value);
        toast.success(`${label} copied to clipboard`);
    } catch {
        toast.error("Could not copy to clipboard");
    }
};

export default function Contact() {
    return (
        <section id="contact" className="relative py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <Reveal className="mb-12">
                    <Eyebrow>Contact Us</Eyebrow>
                    <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-forest sm:text-3xl lg:text-4xl">
                        Let's build your next network.
                    </h2>
                </Reveal>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <Reveal delay={0.05}>
                        <div className="flex h-full flex-col rounded-2xl border border-sandline bg-white p-8" data-testid="contact-address-card">
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cream text-forest">
                                <MapPin size={22} />
                            </span>
                            <h3 className="mt-5 font-display text-lg font-bold text-forest">Visit / Write to Us</h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted">
                                {BRAND.address.split(", ").slice(0, 2).join(", ")}
                                <br />
                                {BRAND.address.split(", ").slice(2).join(", ")}
                            </p>
                            <button
                                data-testid="contact-copy-address"
                                onClick={() => copy(BRAND.address, "Address")}
                                className="mt-5 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-clay hover:underline"
                            >
                                <Copy size={13} /> Copy address
                            </button>
                        </div>
                    </Reveal>

                    <Reveal delay={0.12}>
                        <div className="flex h-full flex-col rounded-2xl border border-sandline bg-white p-8" data-testid="contact-phone-card">
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cream text-forest">
                                <Phone size={22} />
                            </span>
                            <h3 className="mt-5 font-display text-lg font-bold text-forest">Call Us</h3>
                            <div className="mt-3 flex flex-col gap-1">
                                {BRAND.phones.map((p, i) => (
                                    <a
                                        key={p}
                                        href={BRAND.phoneHrefs[i]}
                                        data-testid={`contact-phone-${i + 1}`}
                                        className="w-fit text-sm font-semibold text-ink transition-colors hover:text-clay"
                                    >
                                        {p}
                                    </a>
                                ))}
                            </div>
                            <button
                                data-testid="contact-copy-phone"
                                onClick={() => copy(BRAND.phones.join(" / "), "Phone number")}
                                className="mt-5 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-clay hover:underline"
                            >
                                <Copy size={13} /> Copy number
                            </button>
                        </div>
                    </Reveal>

                    <Reveal delay={0.19}>
                        <div className="flex h-full flex-col rounded-2xl border border-sandline bg-white p-8" data-testid="contact-email-card">
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cream text-forest">
                                <Mail size={22} />
                            </span>
                            <h3 className="mt-5 font-display text-lg font-bold text-forest">Email Us</h3>
                            <a
                                href={`mailto:${BRAND.email}`}
                                data-testid="contact-email-link"
                                className="mt-3 w-fit text-sm font-semibold text-ink transition-colors hover:text-clay"
                            >
                                {BRAND.email}
                            </a>
                            <p className="mt-3 flex items-center gap-2 text-xs text-muted">
                                <Clock size={13} className="text-forest" /> 24/7 availability of support
                            </p>
                            <button
                                data-testid="contact-copy-email"
                                onClick={() => copy(BRAND.email, "Email")}
                                className="mt-5 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-clay hover:underline"
                            >
                                <Copy size={13} /> Copy email
                            </button>
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={0.25} className="mt-10">
                    <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-forest p-8 text-paper sm:flex-row sm:items-center" data-testid="contact-social-band">
                        <div>
                            <p className="font-display text-lg font-bold">Follow our work</p>
                            <p className="mt-1 text-sm text-paper/70">
                                Project highlights, tips and announcements on social media.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            {[
                                { icon: Facebook, href: BRAND.socials.facebook, label: "facebook" },
                                { icon: Twitter, href: BRAND.socials.x, label: "x" },
                                { icon: Instagram, href: BRAND.socials.instagram, label: "instagram" },
                            ].map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid={`social-${s.label}-link`}
                                    aria-label={`Khalaumba ICT on ${s.label}`}
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/25 text-paper transition-all duration-300 hover:-translate-y-0.5 hover:border-clay hover:bg-clay"
                                >
                                    <s.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
