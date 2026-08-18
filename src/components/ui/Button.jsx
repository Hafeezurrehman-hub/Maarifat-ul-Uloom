import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

/**
 * variant: "primary" (gold filled) | "secondary" (navy outline) | "ghost" (text link)
 */
export default function Button({
  children,
  variant = "primary",
  onClick,
  href,
  type = "button",
  showArrow = true,
  className = "",
  disabled = false,
}) {
  const [ripples, setRipples] = useState([]);
  const ref = useRef(null);

  const handleClick = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((r) => [...r, { x, y, id }]);
    setTimeout(() => {
      setRipples((r) => r.filter((rp) => rp.id !== id));
    }, 600);
    onClick?.(e);
  };

  const base =
    "relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full font-heading font-medium transition-[background-color,box-shadow] duration-300 ease-premium select-none";

  const variants = {
    primary:
      "bg-gold-500 text-navy-900 px-7 py-3.5 text-sm sm:text-base hover:bg-gold-400 shadow-gold-3d",
    secondary:
      "bg-transparent text-navy dark:text-white border border-navy/40 dark:border-cream/40 px-7 py-3.5 text-sm sm:text-base hover:border-gold-500 hover:text-gold-700 dark:hover:text-gold-400",
    ghost:
      "bg-transparent text-gold-700 px-0 py-1 text-sm sm:text-base hover:text-gold-500",
  };

  const Comp = href ? "a" : "button";

  return (
    <motion.div
      style={{ perspective: 600 }}
      whileHover={
        variant === "primary"
          ? { scale: 1.03, y: -2 }
          : { scale: variant === "ghost" ? 1 : 1.03 }
      }
      whileTap={
        variant === "primary" ? { scale: 0.97, y: 1 } : { scale: 0.97 }
      }
      transition={{ duration: 0.2, ease: EASE }}
      className={variant === "primary" ? "inline-block rounded-full active:[&_a]:shadow-gold-3d-active active:[&_button]:shadow-gold-3d-active" : "inline-block"}
    >
      <Comp
        ref={ref}
        href={href}
        type={href ? undefined : type}
        onClick={disabled ? undefined : handleClick}
        disabled={disabled}
        aria-disabled={disabled}
        className={`${base} ${variants[variant]} ${className} ${disabled ? "opacity-60 pointer-events-none" : ""}`}
      >
        <span className="relative z-10">{children}</span>
        {showArrow && (
          <motion.span
            className="relative z-10 inline-flex"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <ArrowRight size={variant === "ghost" ? 15 : 18} strokeWidth={2} />
          </motion.span>
        )}
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute rounded-full bg-white/40 pointer-events-none animate-[ripple_0.6s_ease-out]"
            style={{
              left: r.x,
              top: r.y,
              width: 10,
              height: 10,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </Comp>
    </motion.div>
  );
}
