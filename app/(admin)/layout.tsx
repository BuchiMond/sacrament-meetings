// Admin (leader-facing) layout. Authentication is scaffolded in Week 05.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto w-full max-w-5xl px-6 pt-6">
            <p className="no-print inline-block rounded-md bg-brand px-3 py-1 text-sm font-semibold text-brand-contrast">
                Leader tools
            </p>
            {children}
        </div>
    );
}