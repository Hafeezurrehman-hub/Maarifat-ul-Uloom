import Marquee from "../ui/Marquee";

const PHRASES = [
  "Noorani Qaida",
  "Quran Reading with Tajweed",
  "Hifz Support",
  "Islamic Studies",
  "Arabic Language",
  "English Language",
  "Free Trial Class Available",
  "Certified Male & Female Teachers",
];

export default function TrustMarquee() {
  return (
    <div className="relative bg-navy-900 py-4 border-y border-gold-500/10 overflow-hidden">
      <Marquee
        items={PHRASES}
        speed={32}
        className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-white/60"
      />
    </div>
  );
}
