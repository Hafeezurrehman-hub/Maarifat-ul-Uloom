import { useEffect, useState } from "react";

/**
 * Cycles through a list of phrases with a typewriter effect —
 * types the phrase out, pauses, deletes it, then moves to the next.
 *
 * Props:
 *  - words: string[] — phrases to cycle through
 *  - typingSpeed: ms per character while typing (default 55)
 *  - deletingSpeed: ms per character while deleting (default 30)
 *  - pause: ms to hold the full phrase before deleting (default 1600)
 *  - className: applied to the wrapping <span>
 */
export default function TypewriterText({
  words = [],
  typingSpeed = 55,
  deletingSpeed = 30,
  pause = 1600,
  className = "",
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing"); // "typing" | "pausing" | "deleting"

  // FIX: respect prefers-reduced-motion — just show the first word statically
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduceMotion || words.length === 0) return;
    const current = words[wordIndex % words.length];

    let timeout;
    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pause);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 200);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), deletingSpeed);
      } else {
        setPhase("typing");
        setWordIndex((i) => (i + 1) % words.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pause, reduceMotion]);

  if (reduceMotion || words.length === 0) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span className={className}>
      {text}
      <span aria-hidden="true" className="inline-block w-[2px] h-[1em] ml-0.5 -mb-[0.1em] bg-current animate-pulse" />
    </span>
  );
}
