import { Reveal, Eyebrow } from "./Reveal";
import { SERVICES } from "../data";
import { Satellite, Cctv, Cable, Network, RadioTower, Code2, ArrowUpRight } from "lucide-react";

const ICONS = { Satellite, Cctv, Cable, Network, RadioTower, Code2 };

export default function Services() {
    return (
        <section id="services" className="relative bg-cream py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <Reveal>
                        <Eyebrow>What We Do</Eyebrow>
                        <h2 className="mt-4 max-w-2xl font-display text-2xl font-bold tracking-tight text-forest sm:text-3xl lg:text-4xl">
                            Full-stack ICT services, from satellite dishes to software.
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="max-w-sm text-sm leading-relaxed text-muted">
                            Network design, installation, maintenance and management — delivered by
                            certified Cisco, A+ hardware and software engineers.
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {SERVICES.map((s, i) => {
                        const Icon = ICONS[s.icon];
                        const dark = s.dark;
                        return (
                            <Reveal
                                key={s.id}
                                delay={0.05 + i * 0.05}
                                className={s.featured ? "md:col-span-2" : ""}
                            >
                                <a
                                    href="#request-form"
                                    data-testid={`service-card-${s.id}`}
                                    className={`group flex h-full flex-col rounded-2xl p-8 transition-all duration-300 ${
                                        dark
                                            ? "bg-forest text-paper hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(42,78,128,0.5)]"
                                            : "border border-sandline bg-white hover:-translate-y-1 hover:border-clay/40 hover:shadow-[0_16px_36px_-16px_rgba(65,118,188,0.25)]"
                                    }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <span
                                            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                                                dark ? "bg-paper/10 text-amber-warm" : "bg-cream text-forest"
                                            }`}
                                        >
                                            <Icon size={22} />
                                        </span>
                                        <ArrowUpRight
                                            size={18}
                                            className={`transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                                                dark ? "text-paper/50" : "text-muted/50"
                                            }`}
                                        />
                                    </div>
                                    <p
                                        className={`mt-6 font-mono text-[10px] uppercase tracking-[0.22em] ${
                                            dark ? "text-amber-warm" : "text-clay"
                                        }`}
                                    >
                                        {s.category}
                                    </p>
                                    <h3 className={`mt-2 font-display text-lg font-bold sm:text-xl ${dark ? "text-paper" : "text-forest"}`}>
                                        {s.title}
                                    </h3>
                                    <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-paper/70" : "text-muted"}`}>
                                        {s.desc}
                                    </p>
                                </a>
                            </Reveal>
                        );
                    })}

                    <Reveal delay={0.35} className="md:col-span-2 lg:col-span-4">
                        <div
                            className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-forest/25 bg-white/60 p-7 sm:flex-row sm:items-center sm:justify-between"
                            data-testid="services-extra-strip"
                        >
                            <p className="text-sm leading-relaxed text-muted">
                                <span className="font-semibold text-forest">Also offered:</span>{" "}
                                network consultancy & design, network RFP preparation, network
                                maintenance & support, service level agreements (SLAs) and
                                one-off network repairs.
                            </p>
                            <a
                                href="#request-form"
                                data-testid="services-strip-cta"
                                className="shrink-0 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-clay"
                            >
                                Discuss your project
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
