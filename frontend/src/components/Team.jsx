import { Reveal, Eyebrow } from "./Reveal";
import { Network, Cpu, Code2, Headset } from "lucide-react";

const CAPABILITIES = [
    {
        icon: Network,
        title: "Certified Cisco Engineers",
        desc: "Highly qualified, certified professionals specialising in network design, routing, security and enterprise infrastructure.",
    },
    {
        icon: Cpu,
        title: "A+ Hardware Specialists",
        desc: "Technical experts with extensive experience working on systems from board level to component level.",
    },
    {
        icon: Code2,
        title: "Software & Systems Engineers",
        desc: "Developers and systems administrators delivering software solutions, server deployments and hosting.",
    },
];

export default function Team() {
    return (
        <section id="team" className="grain relative overflow-hidden bg-forest-deep py-24 text-paper lg:py-32">
            <div className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-clay/10 blur-3xl" />
            <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <Reveal>
                            <Eyebrow light>Our People</Eyebrow>
                            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-paper sm:text-3xl lg:text-4xl">
                                Our team is our greatest asset.
                            </h2>
                            <p className="mt-5 text-base leading-relaxed text-paper/70">
                                At Khalaumba, we employ highly qualified and certified
                                professionals who specialise in both hardware and software systems.
                                Our technical experts have extensive experience working on systems
                                from board level to component level, ensuring efficient and
                                effective support for our clients.
                            </p>
                        </Reveal>
                        <Reveal delay={0.15}>
                            <div
                                className="mt-8 flex items-center gap-4 rounded-2xl border border-paper/15 bg-paper/5 p-6 backdrop-blur"
                                data-testid="team-support-card"
                            >
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-clay text-paper">
                                    <Headset size={22} />
                                </span>
                                <div>
                                    <p className="font-display text-base font-bold">24/7 Availability of Support</p>
                                    <p className="mt-1 text-sm text-paper/70">
                                        Round-the-clock assistance whenever your systems need us.
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
                        {CAPABILITIES.map((c, i) => (
                            <Reveal key={c.title} delay={0.08 + i * 0.08} className={i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}>
                                <div
                                    className="flex h-full flex-col rounded-2xl border border-paper/15 bg-paper/5 p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-clay/50 hover:bg-paper/10"
                                    data-testid={`team-card-${i + 1}`}
                                >
                                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay/20 text-amber-warm">
                                        <c.icon size={22} />
                                    </span>
                                    <h3 className="mt-5 font-display text-lg font-bold">{c.title}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-paper/70">{c.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
