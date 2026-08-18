export default function Eyebrow({ children, light = false }) {
  return (
    <span
      className={`inline-block text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase mb-4 ${
        light ? "text-gold-400" : "text-gold-700"
      }`}
    >
      {children}
    </span>
  );
}
