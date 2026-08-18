import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export function StaggerGroup({ children, className = "", stagger = 0.1 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", direction = "up" }) {
  // FIX: added left/right offsets so cards can slide in horizontally too,
  // not just fade up — used to alternate direction across grids for a
  // more dynamic, professional feel.
  const offsets = {
    up: { y: 24, x: 0 },
    left: { y: 0, x: -36 },
    right: { y: 0, x: 36 },
    scale: { y: 0, x: 0, scale: 0.92 },
  };
  const d = offsets[direction] || offsets.up;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...d },
        show: { opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
