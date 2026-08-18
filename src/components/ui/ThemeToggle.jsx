import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative w-11 h-6 rounded-full border border-gold-500/40 bg-navy-900/10 dark:bg-cream/10 transition-colors duration-300 ${className}`}
    >
      <motion.span
        animate={{ x: isDark ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-0.5 left-0 w-5 h-5 rounded-full bg-gold-500 flex items-center justify-center text-navy-900"
      >
        {isDark ? <Moon size={12} strokeWidth={2.5} /> : <Sun size={12} strokeWidth={2.5} />}
      </motion.span>
    </button>
  );
}
