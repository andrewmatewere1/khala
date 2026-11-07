import { BRAND } from "../data";
import { Facebook, Twitter, Instagram, ArrowUpRight } from "lucide-react";

const QUICK_ACTIONS = [
    { label: "Request a Quote", href: "#request-form" },
    { label: "Our Services", href: "#services" },
    { label: "Past Projects", href: "#projects" },
    { label: "Meet the Team", href: "#team" },
    { label: "Contact Us", href: "#contact" },
    { label: "Call Now", href: BRAND.phoneHrefs[0] },
];

export default function Footer() {
    return (
        <footer className="bg-forest-deep text-paper">
            <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <a href="#home" data-testid="footer-logo-link" className="inline-block">
                            <img
                                src="/logo.png"
                                alt="Khalaumba ICT logo"
                                data-testid="footer-logo"
                                className="h-16 w-auto rounded-lg"
                            />
                            <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">
                                Est. 1993 · Bvumbwe, Thyolo
                            </span>
                        </a>
                        <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/65">
                            A leading information systems consultancy providing cutting-edge
                            electronic business solutions and comprehensive IT support services
                            across Malawi.
                        </p>
                        <div className="mt-7 flex items-center gap-3">
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
                                    data-testid={`footer-social-${s.label}`}
                                    aria-label={`Khalaumba ICT on ${s.label}`}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-paper/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-clay hover:bg-clay hover:text-paper"
                                >
                                    <s.icon size={17} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-amber-warm">
                            Quick Actions
                        </h4>
                        <ul className="mt-5 grid grid-cols-1 gap-1 sm:grid-cols-2">
                            {QUICK_ACTIONS.map((a) => (
                                <li key={a.label}>
                                    <a
                                        href={a.href}
                                        data-testid={`footer-quick-${a.label.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="group inline-flex items-center gap-1.5 py-2 text-sm text-paper/75 transition-colors hover:text-paper"
                                    >
                                        {a.label}
                                        <ArrowUpRight
                                            size={13}
                                            className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-3">
                        <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-amber-warm">
                            Get in Touch
                        </h4>
                        <address className="mt-5 text-sm not-italic leading-relaxed text-paper/75">
                            {BRAND.address}
                            <br />
                            <a href={BRAND.phoneHrefs[0]} data-testid="footer-phone-1" className="mt-3 block transition-colors hover:text-paper">
                                {BRAND.phones[0]}
                            </a>
                            <a href={BRAND.phoneHrefs[1]} data-testid="footer-phone-2" className="block transition-colors hover:text-paper">
                                {BRAND.phones[1]}
                            </a>
                            <a href={`mailto:${BRAND.email}`} data-testid="footer-email" className="mt-3 block transition-colors hover:text-paper">
                                {BRAND.email}
                            </a>
                        </address>
                    </div>
                </div>

                <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-paper/10 pt-7 sm:flex-row">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">
                        © {new Date().getFullYear()} Khalaumba ICT · {BRAND.license}
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">
                        24/7 Availability of Support
                    </p>
                </div>
            </div>
        </footer>
    );
}
