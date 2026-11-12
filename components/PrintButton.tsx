"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast hover:opacity-90"
    >
      Print program
    </button>
  );
}
