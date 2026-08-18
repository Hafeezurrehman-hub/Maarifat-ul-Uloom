import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import GeometricStar from "./GeometricStar";

/**
 * Ambient floating geometric layer with subtle mouse-parallax.
 * Movement is intentionally slow and minimal — never distracting.
 */
export default function FloatingBackground({ variant = "dark" }) {
  const ref = useRef(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mvY, { stiffness: 40, damping: 20 });

  const x1 = useTransform(springX, (v) => v * 12);
  const y1 = useTransform(springY, (v) => v * 12);
  const x2 = useTransform(springX, (v) => v * -8);
  const y2 = useTransform(springY, (v) => v * -8);

  useEffect(() => {
    const handleMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      mvX.set(px);
      mvY.set(py);
    };
    const el = ref.current;
    el?.addEventListener("mousemove", handleMove);
    return () => el?.removeEventListener("mousemove", handleMove);
  }, [mvX, mvY]);

  const strokeColor = variant === "dark" ? "#C9973B" : "#1B3B6F";

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute -top-10 -left-10 w-[420px] h-[420px] animate-float"
      >
        <GeometricStar opacity={variant === "dark" ? 0.08 : 0.05} stroke={strokeColor} />
      </motion.div>
      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute top-1/3 right-[-80px] w-[320px] h-[320px] animate-float-slow"
      >
        <GeometricStar opacity={variant === "dark" ? 0.06 : 0.04} stroke={strokeColor} />
      </motion.div>
      <motion.div
        style={{ x: x1, y: y2 }}
        className="absolute bottom-[-60px] left-1/3 w-[260px] h-[260px] animate-float"
      >
        <GeometricStar opacity={variant === "dark" ? 0.05 : 0.03} stroke={strokeColor} />
      </motion.div>
    </div>
  );
}
