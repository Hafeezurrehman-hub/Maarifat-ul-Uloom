/**
 * A single 8-point star (khatam) line-art SVG, used as a subtle decorative
 * motif behind hero/dark sections. Never filled, always low-opacity.
 */
export default function GeometricStar({ className = "", opacity = 0.06, stroke = "#C9973B" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <g fill="none" stroke={stroke} strokeWidth="1.2">
        <polygon points="100,10 122,60 178,52 142,96 178,148 122,140 100,190 78,140 22,148 58,96 22,52 78,60" />
        <circle cx="100" cy="100" r="70" />
      </g>
    </svg>
  );
}
