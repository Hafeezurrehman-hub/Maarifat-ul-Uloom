/**
 * Full-bleed open Qur'an spread — fills the entire hero section as a
 * background layer (already open to the first page, not animated closed).
 * Pure SVG so it's crisp at any size and stays license-safe.
 */
export default function QuranOpenBackground({ className = "" }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pageL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E9DCC0" />
          <stop offset="100%" stopColor="#F8F0DC" />
        </linearGradient>
        <linearGradient id="pageR" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F8F0DC" />
          <stop offset="100%" stopColor="#E9DCC0" />
        </linearGradient>
        <radialGradient id="spineShadow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* left page */}
      <path d="M 60 90 Q 780 40 795 90 L 795 830 Q 780 870 60 810 Z" fill="url(#pageL)" />
      {/* right page */}
      <path d="M 1540 90 Q 820 40 805 90 L 805 830 Q 820 870 1540 810 Z" fill="url(#pageR)" />
      {/* spine shadow */}
      <ellipse cx="800" cy="450" rx="90" ry="420" fill="url(#spineShadow)" />
      <line x1="800" y1="55" x2="800" y2="855" stroke="#8A6F3A" strokeOpacity="0.35" strokeWidth="3" />

      {/* left page frame + medallion */}
      <g opacity="0.8">
        <rect x="120" y="140" width="620" height="620" fill="none" stroke="#A8894F" strokeWidth="1.5" opacity="0.5" />
        <rect x="132" y="152" width="596" height="596" fill="none" stroke="#A8894F" strokeWidth="0.6" opacity="0.35" />
        <g transform="translate(430,300)" stroke="#A8894F" strokeWidth="1.4" fill="none" opacity="0.6">
          <polygon points="0,-46 12,-12 46,0 12,12 0,46 -12,12 -46,0 -12,-12" />
          <circle r="58" strokeWidth="0.7" opacity="0.5" />
        </g>
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={i}
            x1="180"
            y1={430 + i * 26}
            x2={180 + (i % 4 === 0 ? 300 : i % 3 === 0 ? 420 : 480)}
            y2={430 + i * 26}
            stroke="#2C2F38"
            strokeOpacity="0.28"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* right page frame + medallion */}
      <g opacity="0.8">
        <rect x="860" y="140" width="620" height="620" fill="none" stroke="#A8894F" strokeWidth="1.5" opacity="0.5" />
        <rect x="872" y="152" width="596" height="596" fill="none" stroke="#A8894F" strokeWidth="0.6" opacity="0.35" />
        <g transform="translate(1170,300)" stroke="#A8894F" strokeWidth="1.4" fill="none" opacity="0.6">
          <polygon points="0,-46 12,-12 46,0 12,12 0,46 -12,12 -46,0 -12,-12" />
          <circle r="58" strokeWidth="0.7" opacity="0.5" />
        </g>
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={i}
            x1="920"
            y1={430 + i * 26}
            x2={920 + (i % 4 === 0 ? 300 : i % 3 === 0 ? 420 : 480)}
            y2={430 + i * 26}
            stroke="#2C2F38"
            strokeOpacity="0.28"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* page-curl highlight lines */}
      <path d="M 60 90 Q 780 40 795 90" fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" />
      <path d="M 1540 90 Q 820 40 805 90" fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" />
    </svg>
  );
}
