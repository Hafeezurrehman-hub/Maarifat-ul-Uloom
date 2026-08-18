import { motion } from "framer-motion";

/**
 * Infinite auto-scrolling horizontal strip. Duplicates its children once
 * so the loop is seamless, then animates the whole track from 0 to -50%.
 *
 * Props:
 *  - items: string[] — text items to repeat across the strip
 *  - speed: seconds for one full loop (default 28 — slower = calmer)
 *  - className: applied to each item's wrapping span
 */
export default function Marquee({ items = [], speed = 28, className = "" }) {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex w-max items-center gap-10 sm:gap-14"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className={`flex items-center gap-10 sm:gap-14 shrink-0 ${className}`}>
            <span className="whitespace-nowrap">{item}</span>
            <span className="text-gold-500/50" aria-hidden="true">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
