import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

// FIX: smaller x-offsets (was ±40). On slow mobile connections the
// whileInView trigger can lag behind the initial render, so the card sits
// in its "initial" position for a moment — a large 40px offset made the
// Contact form/details cards look shoved to one side and clipped. 20px is
// subtle enough that even a delayed trigger doesn't look broken.
const directions = {
  up: { y: 28, x: 0 },
  left: { y: 0, x: -20 },
  right: { y: 0, x: 20 },
  scale: { y: 0, x: 0, scale: 0.94 },
  none: { y: 0, x: 0 },
};

/**
 * Scroll-reveal wrapper. Triggers once when 15% of the element is visible.
 * direction: "up" | "left" | "right" | "scale" | "none"
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  as = "div",
}) {
  const d = directions[direction] || directions.up;
  const Comp = motion[as] || motion.div;

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, ...d, scale: d.scale ?? 1 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      // FIX: margin lets the animation fire slightly before the element
      // is actually on-screen, so slower/janky mobile scrolls don't leave
      // it visibly stuck half-revealed.
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -15% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}
