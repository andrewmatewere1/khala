import { MARQUEE_ITEMS } from "../data";

export default function Marquee() {
    return (
        <div className="overflow-hidden bg-forest-deep py-5" data-testid="marquee-band">
            <div className="flex w-max animate-marquee">
                {[0, 1].map((copy) => (
                    <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
                        {MARQUEE_ITEMS.map((item, i) => (
                            <span
                                key={i}
                                className="flex items-center font-mono text-xs uppercase tracking-[0.28em] text-paper/75"
                            >
                                <span className="px-8">{item}</span>
                                <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
