import * as Icons from "lucide-react";

// Renders any lucide-react icon by name string, so data files can stay plain JS/JSON.
export default function Icon({ name, className = "", size = 24, strokeWidth = 1.5 }) {
  const LucideIcon = Icons[name] || Icons.Circle;
  return <LucideIcon className={className} size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}
