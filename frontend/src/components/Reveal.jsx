import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "", y = 28 }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
        {children}
    </motion.div>
);

export const Eyebrow = ({ children, light = false }) => (
    <p
        className={`font-mono text-xs uppercase tracking-[0.22em] ${
            light ? "text-amber-warm" : "text-clay"
        }`}
    >
        {children}
    </p>
);
