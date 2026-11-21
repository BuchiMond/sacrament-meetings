"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const linkClass =
    "rounded-md border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand hover:text-brand-contrast";
const disabledClass =
    "rounded-md border border-border px-4 py-2 text-sm font-semibold text-muted";

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    function createPageURL(page: number) {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(page));
        return `${pathname}?${params.toString()}`;
    }

    return (
        <nav
            aria-label="Pagination"
            className="mt-8 flex items-center justify-center gap-4"
        >
            {currentPage > 1 ? (
                <Link href={createPageURL(currentPage - 1)} className={linkClass}>
                    <span aria-hidden="true">&larr; </span>Previous
                </Link>
            ) : (
                <span aria-disabled="true" className={disabledClass}>
                    <span aria-hidden="true">&larr; </span>Previous
                </span>
            )}

            <span aria-current="page" className="text-sm font-semibold">
                Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
                <Link href={createPageURL(currentPage + 1)} className={linkClass}>
                    Next<span aria-hidden="true"> &rarr;</span>
                </Link>
            ) : (
                <span aria-disabled="true" className={disabledClass}>
                    Next<span aria-hidden="true"> &rarr;</span>
                </span>
            )}
        </nav>
    );
}