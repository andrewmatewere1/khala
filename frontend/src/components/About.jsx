import { Reveal, Eyebrow } from "./Reveal";
import { VALUES, IMAGES } from "../data";
import { Target, Compass } from "lucide-react";

export default function About() {
    return (
        <section id="about" className="relative py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <Reveal>
                            <Eyebrow>About Khalaumba ICT</Eyebrow>
                            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-forest sm:text-3xl lg:text-4xl">
                                A Malawian ICT heritage, since 1993.
                            </h2>
                            <p className="mt-5 text-base leading-relaxed text-muted">
                                Khalaumba ICT is a leading information systems consultancy providing
                                cutting-edge electronic business solutions and comprehensive IT
                                support services. Since our founding in 1993, with License Number
                                16492, we have specialised in network design, installation,
                                maintenance and management, along with system configuration,
                                hardware support and software solutions.
                            </p>
                            <p className="mt-4 text-base leading-relaxed text-muted">
                                With a strong focus on network infrastructure, security and
                                monitoring, we ensure businesses operate in a secure and optimised
                                IT environment — delivered with 24/7 availability of support.
                            </p>
                        </Reveal>

                        <Reveal delay={0.15} className="mt-10">
                            <div className="relative">
                                <div className="absolute -left-3 -top-3 h-full w-full rounded-2xl border border-clay/40" />
                                <img
                                    src={IMAGES.aboutEstate}
                                    alt="Tea estate landscape in Thyolo, Malawi"
                                    className="relative aspect-[16/10] w-full rounded-2xl object-cover"
                                    data-testid="about-image"
                                />
                            </div>
                        </Reveal>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <Reveal delay={0.05}>
                                <div className="h-full rounded-2xl bg-forest p-8 text-paper" data-testid="mission-card">
                                    <Target size={24} className="text-amber-warm" />
                                    <h3 className="mt-4 font-display text-xl font-bold">Our Mission</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-paper/75">
                                        To establish and maintain long-term, value-driven
                                        relationships with customers by delivering world-class
                                        products, solutions and services that enhance business
                                        operations and ensure technological excellence.
                                    </p>
                                </div>
                            </Reveal>
                            <Reveal delay={0.12}>
                                <div className="h-full rounded-2xl border border-sandline bg-white p-8" data-testid="vision-card">
                                    <Compass size={24} className="text-clay" />
                                    <h3 className="mt-4 font-display text-xl font-bold text-forest">Our Vision</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-muted">
                                        To be a highly successful company providing advanced
                                        information management technologies and solutions to both
                                        public and private sector organisations — leading the way
                                        in IT services and innovation.
                                    </p>
                                </div>
                            </Reveal>
                            {VALUES.map((v, i) => (
                                <Reveal key={v.title} delay={0.08 + i * 0.06}>
                                    <div
                                        className="h-full rounded-2xl border border-sandline bg-cream p-7 transition-colors duration-300 hover:bg-white"
                                        data-testid={`value-card-${i + 1}`}
                                    >
                                        <p className="font-mono text-xs text-clay">0{i + 1}</p>
                                        <h4 className="mt-2 font-display text-base font-bold text-forest">{v.title}</h4>
                                        <p className="mt-2 text-sm leading-relaxed text-muted">{v.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal delay={0.2} className="mt-5">
                            <div
                                className="rounded-2xl border border-clay/30 bg-clay/5 p-7"
                                data-testid="strategy-card"
                            >
                                <h4 className="font-display text-base font-bold text-clay">Corporate Strategy</h4>
                                <p className="mt-2 text-sm leading-relaxed text-muted">
                                    We foster partnerships that enable the integration of emerging
                                    skills into the mainstream economy, particularly for
                                    historically disadvantaged individuals. We emphasise skills
                                    transfer and development, so every project contributes to both
                                    technological advancement and economic empowerment.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
