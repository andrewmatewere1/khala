import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone, ShieldCheck, Clock, Award } from "lucide-react";
import SignalMesh from "./SignalMesh";
import { IMAGES } from "../data";

const lineVariant = {
    hidden: { y: "112%" },
    show: (i) => ({
        y: "0%",
        transition: { duration: 0.95, delay: 0.25 + i * 0.14, ease: [0.22, 1, 0.36, 1] },
    }),
};

const STATS = [
    { icon: Award, label: "Established", value: "1993" },
    { icon: ShieldCheck, label: "Certified", value: "Cisco · A+" },
    { icon: Clock, label: "Support", value: "24/7" },
    { icon: Phone, label: "Licensed", value: "No. 16492" },
];

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
    const meshY = useTransform(scrollYProgress, [0, 1], [0, 140]);

    return (
        <section id="home" ref={ref} className="grain relative overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-40">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600"
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-paper/75" />
                <div className="absolute inset-0 bg-gradient-to-r from-paper/95 via-paper/70 to-paper/40" />
            </div>
            <motion.div style={{ y: meshY }} className="absolute inset-0">
                <SignalMesh className="h-full w-full opacity-70" />
            </motion.div>
            <div className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-clay/5 blur-3xl" />

            <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-7">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 inline-flex items-center gap-3 rounded-full border border-sandline bg-white/70 px-4 py-2 backdrop-blur"
                    >
                        <span className="h-2 w-2 rounded-full bg-clay" />
                        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-forest">
                            License 16492 · Est. 1993 · Bvumbwe, Thyolo
                        </span>
                    </motion.div>

                    <h1 className="font-display text-4xl font-black leading-[1.06] tracking-tight text-forest sm:text-5xl lg:text-[4.2rem]">
                        {["Precision networks,", "security & connectivity", "engineered in Malawi."].map(
                            (line, i) => (
                                <span key={i} className="block overflow-hidden pb-1">
                                    <motion.span
                                        className="block"
                                        custom={i}
                                        variants={lineVariant}
                                        initial="hidden"
                                        animate="show"
                                    >
                                        {i === 2 ? (
                                            <>
                                                engineered in{" "}
                                                <em className="not-italic text-clay">Malawi.</em>
                                            </>
                                        ) : (
                                            line
                                        )}
                                    </motion.span>
                                </span>
                            )
                        )}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.75 }}
                        className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
                    >
                        Khalaumba ICT is a leading information systems consultancy delivering
                        cutting-edge electronic business solutions and comprehensive IT support —
                        from Starlink connectivity and AI-driven CCTV to structured cabling and
                        hardened enterprise networks.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.9 }}
                        className="mt-9 flex flex-wrap items-center gap-4"
                    >
                        <a
                            href="#request-form"
                            data-testid="hero-cta-request"
                            className="group inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 font-semibold text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-clay"
                        >
                            Request a Proposal
                            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                        <a
                            href="#services"
                            data-testid="hero-cta-services"
                            className="inline-flex items-center gap-2 rounded-full border border-forest/25 px-7 py-3.5 font-semibold text-forest transition-all duration-300 hover:border-forest hover:bg-cream"
                        >
                            Explore Services
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                        className="mt-12 grid grid-cols-2 gap-6 border-t border-sandline pt-7 sm:grid-cols-4"
                    >
                        {STATS.map((s) => (
                            <div key={s.label} data-testid={`hero-stat-${s.label.toLowerCase()}`}>
                                <s.icon size={18} className="text-clay" />
                                <p className="mt-2 font-display text-xl font-extrabold text-forest">{s.value}</p>
                                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{s.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative lg:col-span-5"
                >
                    <motion.div style={{ y: imgY }} className="relative">
                        <div className="absolute -right-3 -top-3 h-full w-full rounded-2xl bg-clay/90" />
                        <img
                            src={IMAGES.hero}
                            alt="Khalaumba ICT engineer working on server and network equipment"
                            className="relative aspect-[4/5] w-full rounded-2xl object-cover"
                            data-testid="hero-image"
                        />
                        <div className="absolute bottom-5 left-5 rounded-xl bg-forest-deep/85 px-5 py-4 text-paper backdrop-blur">
                            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-warm">
                                Since 1993
                            </p>
                            <p className="mt-1 font-display text-sm font-semibold leading-snug">
                                Board-level to component-level IT support
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
