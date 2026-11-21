export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="py-10">
      <p className="text-muted">Loading meetings&hellip;</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2" aria-hidden="true">
        {[0, 1, 2, 3].map((n) => (
          <div key={n} className="h-40 animate-pulse rounded-[var(--radius-card)] bg-border" />
        ))}
      </div>
    </div>
  );
}
