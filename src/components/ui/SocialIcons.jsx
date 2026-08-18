// Minimal monoline SVG icons for social platforms, matched to our icon stroke style
// (lucide-react removed brand icons, so these are hand-drawn to stay on-brand anyway
// since we render them in navy/gold, never native brand colors).

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function FacebookIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...common}>
      <path d="M15 3h-2a5 5 0 0 0-5 5v3H6v4h2v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function InstagramIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...common}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedinIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...common}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7.5" y1="10" x2="7.5" y2="17" />
      <circle cx="7.5" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 17v-4.5a2.3 2.3 0 0 1 4.6 0V17" />
      <line x1="11.5" y1="10" x2="11.5" y2="17" />
    </svg>
  );
}

export function PinterestIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 18c1-3 1.5-5.5 2-8a2.5 2.5 0 1 1 3 2c-.3 1.4-.5 2.5-1.8 2.5-1.3 0-1.7-1-1.4-2.2.3-1.3 1-3.6 1-4.6a1.3 1.3 0 0 0-2.5-.5" />
    </svg>
  );
}

export function TikTokIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...common}>
      <path d="M14 4v9.5a3 3 0 1 1-2.2-2.9" />
      <path d="M14 4c.4 2.2 2 3.8 4 4.1" />
    </svg>
  );
}

export function YoutubeIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...common}>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...common}>
      <line x1="4" y1="4" x2="20" y2="20" />
      <line x1="20" y1="4" x2="4" y2="20" />
    </svg>
  );
}
