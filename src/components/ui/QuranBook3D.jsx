import { motion, useTransform } from "framer-motion";

/**
 * Decorative 3D Quran book — pure SVG/CSS, no external images (keeps things
 * license-safe and crisp at any size). Covers open like real book pages as
 * `progress` (0 → 1, usually tied to scroll) increases, revealing gold
 * Islamic geometric line-work on the inner pages.
 *
 * progress: MotionValue<number> 0..1
 */
export default function QuranBook3D({ progress, className = "" }) {
  // Front cover rotates open around the spine (left edge)
  const leftRotate = useTransform(progress, [0, 1], [0, -152]);
  // Back "page stack" rotates slightly open on the right for depth
  const rightRotate = useTransform(progress, [0, 1], [0, 8]);
  const glowOpacity = useTransform(progress, [0, 0.4, 1], [0.15, 0.5, 0.85]);
  const floatY = useTransform(progress, [0, 1], [0, -18]);

  return (
    <motion.div
      style={{ y: floatY }}
      className={`relative [transform-style:preserve-3d] [perspective:1600px] ${className}`}
    >
      {/* Ambient gold glow that intensifies as the book opens */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 -m-16 rounded-full bg-gold-400 blur-[90px] pointer-events-none"
      />

      <div
        className="relative w-full h-full [transform-style:preserve-3d]"
        style={{ transform: "rotateX(18deg) rotateZ(-2deg)" }}
      >
        {/* Right page stack (base, always visible, gives thickness) */}
        <svg
          viewBox="0 0 400 520"
          className="absolute inset-0 w-full h-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
        >
          <defs>
            <linearGradient id="pageGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FAF6EC" />
              <stop offset="100%" stopColor="#EFE6CC" />
            </linearGradient>
            <linearGradient id="coverGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1F2A44" />
              <stop offset="55%" stopColor="#242F4E" />
              <stop offset="100%" stopColor="#1F2A44" />
            </linearGradient>
          </defs>

          {/* page block thickness */}
          <rect x="196" y="18" width="200" height="484" rx="6" fill="url(#pageGrad)" />
          <rect x="196" y="18" width="200" height="484" rx="6" fill="none" stroke="#D8BE8A" strokeOpacity="0.25" />
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={i}
              x1={198 + i * 1.6}
              y1={20 + i * 0.8}
              x2={198 + i * 1.6}
              y2={498 - i * 0.8}
              stroke="#D8BE8A"
              strokeOpacity="0.12"
            />
          ))}

          {/* Right inner page — Islamic star pattern + text lines (calligraphy-style, not real script) */}
          <g transform="translate(206,40)">
            <rect width="182" height="450" rx="4" fill="#FCFAF2" />
            <g stroke="#D8BE8A" strokeWidth="1.2" opacity="0.8">
              <rect x="14" y="14" width="154" height="422" rx="2" />
              <rect x="20" y="20" width="142" height="410" rx="2" strokeWidth="0.6" opacity="0.6" />
            </g>
            {/* 8-point star medallion */}
            <g transform="translate(91,90)" stroke="#A8894F" strokeWidth="1.4" fill="none" opacity="0.85">
              <polygon points="0,-30 8,-8 30,0 8,8 0,30 -8,8 -30,0 -8,-8" />
              <circle r="34" strokeWidth="0.8" opacity="0.5" />
            </g>
            {/* text-suggestion lines */}
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1={34}
                y1={150 + i * 20}
                x2={34 + (i % 3 === 0 ? 96 : 128)}
                y2={150 + i * 20}
                stroke="#1F2A44"
                strokeOpacity="0.35"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            ))}
          </g>
        </svg>

        {/* Front cover — hinges open from the spine */}
        <motion.svg
          viewBox="0 0 400 520"
          style={{
            rotateY: leftRotate,
            transformOrigin: "200px 260px",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-0 w-full h-full drop-shadow-[0_40px_70px_rgba(0,0,0,0.55)]"
        >
          <rect x="196" y="10" width="200" height="500" rx="10" fill="url(#coverGradDup)" />
          <defs>
            <linearGradient id="coverGradDup" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1F2A44" />
              <stop offset="55%" stopColor="#242F4E" />
              <stop offset="100%" stopColor="#1F2A44" />
            </linearGradient>
          </defs>
          <rect
            x="210"
            y="24"
            width="172"
            height="472"
            rx="6"
            fill="none"
            stroke="#D8BE8A"
            strokeOpacity="0.7"
            strokeWidth="2"
          />
          <rect
            x="220"
            y="34"
            width="152"
            height="452"
            rx="4"
            fill="none"
            stroke="#E0C99C"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          {/* Central gold medallion (generic geometric star, not depicting any figure) */}
          <g transform="translate(296,150)" fill="none" stroke="#D8BE8A" strokeWidth="1.6" opacity="0.9">
            <polygon points="0,-38 10,-10 38,0 10,10 0,38 -10,10 -38,0 -10,-10" />
            <circle r="46" strokeWidth="0.8" opacity="0.5" />
            <circle r="52" strokeWidth="0.5" opacity="0.3" />
          </g>
          {/* corner flourishes */}
          {[
            [222, 36],
            [370, 36],
            [222, 484],
            [370, 484],
          ].map(([cx, cy], i) => (
            <g key={i} transform={`translate(${cx},${cy})`} stroke="#E0C99C" strokeOpacity="0.55" fill="none">
              <path d="M0,0 q14,0 14,14" strokeWidth="1.2" />
              <path d="M0,0 q0,14 -14,14" strokeWidth="1.2" transform="translate(0,-14) rotate(180)" opacity="0" />
            </g>
          ))}
          <text
            x="296"
            y="330"
            textAnchor="middle"
            fontFamily="Amiri, serif"
            fontSize="30"
            fill="#E0C99C"
            opacity="0.95"
          >
            القرآن
          </text>
          <text
            x="296"
            y="360"
            textAnchor="middle"
            fontFamily="Space Grotesk, sans-serif"
            fontSize="11"
            letterSpacing="3"
            fill="#F3E7CF"
            opacity="0.8"
          >
            THE HOLY QURAN
          </text>

          {/* spine */}
          <rect x="188" y="10" width="16" height="500" fill="#1F2A44" opacity="0.9" />
        </motion.svg>
      </div>
    </motion.div>
  );
}
