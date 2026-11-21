"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function MeetingSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1"); // always reset to page 1 on a new search
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div role="search" className="mb-6">
            <label htmlFor="meeting-search" className="sr-only">
                Search meetings
            </label>
            <input
                id="meeting-search"
                type="search"
                placeholder="Search by speaker, leader, or meeting type..."
                defaultValue={searchParams.get("query")?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
                aria-label="Search meetings"
                className="w-full rounded-md border border-border bg-surface px-4 py-3 text-base placeholder:text-muted focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
        </div>
    );
}