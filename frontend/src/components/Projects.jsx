import { Reveal, Eyebrow } from "./Reveal";
import { PROJECTS } from "../data";
import { MapPin, Check } from "lucide-react";

export default function Projects() {
    return (
        <section id="projects" className="relative py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <Reveal className="mb-14">
                    <Eyebrow>Past Projects</Eyebrow>
                    <h2 className="mt-4 max-w-3xl font-display text-2xl font-bold tracking-tight text-forest sm:text-3xl lg:text-4xl">
                        Trusted by Malawi's leading estates, resorts, universities and industry.
                    </h2>
                </Reveal>

                <div className="flex flex-col gap-16 lg:gap-24">
                    {PROJECTS.map((p, i) => (
                        <Reveal key={p.id} delay={0.05}>
                            <article
                                className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 ${
                                    i % 2 === 1 ? "" : ""
                                }`}
                                data-testid={`project-card-${p.id}`}
                            >
                                <div className={`relative lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                                    <div
                                        className={`absolute inset-0 rounded-2xl ${
                                            i % 2 === 1 ? "-left-3 -bottom-3" : "-right-3 -bottom-3"
                                        } bg-forest/10`}
                                    />
                                    <img
                                        src={p.image}
                                        alt={`${p.name} project`}
                                        loading="lazy"
                                        className="relative aspect-[16/11] w-full rounded-2xl object-cover"
                                    />
                                    <span className="absolute -top-4 left-5 rounded-full bg-clay px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper">
                                        0{i + 1}
                                    </span>
                                </div>

                                <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                                    <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                                        <MapPin size={13} className="text-clay" /> {p.location}
                                    </p>
                                    <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-forest sm:text-3xl">
                                        {p.name}
                                    </h3>
                                    <ul className="mt-6 flex flex-col gap-3">
                                        {p.scope.map((item, j) => (
                                            <li key={j} className="flex items-start gap-3 text-sm leading-relaxed text-muted sm:text-base">
                                                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cream">
                                                    <Check size={12} className="text-forest" />
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.1} className="mt-16">
                    <p className="rounded-2xl bg-cream p-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted" data-testid="projects-more-note">
                        Other client references available upon request
                    </p>
                </Reveal>
            </div>
        </section>
    );
}
