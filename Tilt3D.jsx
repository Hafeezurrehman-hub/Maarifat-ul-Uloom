import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Wraps children in a mouse-tracking 3D tilt + glare + lift-on-hover.
 * FIX: Touch devices (phones/tablets) skip ALL tilt logic — no unnecessary
 *      motion values, no spring calculations, no perspective CSS — just a
 *      plain wrapper div. This prevents jank on mobile and saves CPU.
 *
 * Props:
 *  - max: max tilt angle in degrees (default 10)
 *  - scale: hover scale (default 1.02)
 *  - glare: show moving light sheen (default true)
 *  - className: applied to the outer perspective wrapper
 */

// Detect touch-only devices once at module level (avoids per-render check)
const isTouchDevice =
  typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

function TiltDesktop({ children, max, scale, glare, className }) {
  const ref = useRef(null);

  const mvX = useMotionValue(0.5);
  const mvY = useMotionValue(0.5);
  const springConfig = { stiffness: 220, damping: 20, mass: 0.6 };
  const sx = useSpring(mvX, springConfig);
  const sy = useSpring(mvY, springConfig);

  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const glareX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(sy, [0, 1], ["0%", "100%"]);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mvX.set((e.clientX - rect.left) / rect.width);
    mvY.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mvX.set(0.5);
    mvY.set(0.5);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group [perspective:1000px] ${className}`}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative will-change-transform"
      >
        {children}

        {glare && (
          <motion.div
            aria-hidden="true"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) =>
                  `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 60%)`
              ),
            }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
          />
        )}
      </motion.div>
    </div>
  );
}

export default function Tilt3D({
  children,
  max = 10,
  scale = 1.02,
  glare = true,
  className = "",
}) {
  // FIX: On touch/mobile — render plain div, zero tilt overhead
  if (isTouchDevice) {
    return <div className={className}>{children}</div>;
  }

  return (
    <TiltDesktop max={max} scale={scale} glare={glare} className={className}>
      {children}
    </TiltDesktop>
  );
}
