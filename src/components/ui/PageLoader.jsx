/**
 * Shown briefly while a lazy-loaded page's JS chunk is being fetched
 * (typically a few hundred ms on a normal connection, since each chunk is
 * small). Kept minimal so it doesn't feel like a jarring full-page spinner.
 */
export default function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex items-center gap-3 text-navy-700/60 dark:text-white/50">
        <span className="w-5 h-5 rounded-full border-2 border-gold-500 border-t-transparent animate-spin" />
        <span className="text-sm font-medium">Loading…</span>
      </div>
    </div>
  );
}
