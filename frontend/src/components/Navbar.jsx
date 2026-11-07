import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BRAND } from "../data";

const LINKS = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Past Projects", href: "#projects" },
    { label: "Team", href: "#team" },
    { label: "Contact Us", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                scrolled || open
                    ? "bg-paper/90 shadow-[0_1px_0_rgba(65,118,188,0.15)] backdrop-blur-md"
                    : "bg-transparent"
            }`}
        >
            <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
                <a href="#home" data-testid="nav-home-link" className="flex items-center">
                    <img
                        src="/logo.png"
                        alt="Khalaumba ICT logo"
                        data-testid="nav-logo"
                        className="h-13 w-auto rounded-lg"
                        style={{ height: "52px" }}
                    />
                </a>

                <div className="hidden items-center gap-7 lg:flex">
                    {LINKS.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}-link`}
                            className="group relative text-sm font-medium text-ink/80 transition-colors hover:text-forest"
                        >
                            {l.label}
                            <span className="absolute -bottom-1 left-0 h-px w-0 bg-clay transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                    <a
                        href="#request-form"
                        data-testid="nav-request-cta"
                        className="rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest"
                    >
                        Request a Quote
                    </a>
                </div>

                <button
                    data-testid="nav-mobile-toggle"
                    aria-label="Toggle menu"
                    onClick={() => setOpen(!open)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-sandline text-forest lg:hidden"
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </nav>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-sandline bg-paper/95 backdrop-blur-md lg:hidden"
                    >
                        <div className="flex flex-col gap-1 px-5 pb-5 pt-2">
                            {LINKS.map((l) => (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    data-testid={`nav-mobile-${l.label.toLowerCase().replace(/\s+/g, "-")}-link`}
                                    onClick={() => setOpen(false)}
                                    className="rounded-lg px-3 py-3 font-display text-base font-semibold text-forest hover:bg-cream"
                                >
                                    {l.label}
                                </a>
                            ))}
                            <a
                                href="#request-form"
                                data-testid="nav-mobile-request-cta"
                                onClick={() => setOpen(false)}
                                className="mt-2 rounded-full bg-clay px-5 py-3 text-center font-semibold text-paper"
                            >
                                Request a Quote
                            </a>
                            <p className="mt-3 px-3 font-mono text-[11px] uppercase tracking-widest text-muted">
                                {BRAND.phones[0]}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
