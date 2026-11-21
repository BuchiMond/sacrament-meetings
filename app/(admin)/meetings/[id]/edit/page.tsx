import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Edit Meeting",
};

export default function EditMeetingPage() {
    return (
        <main className="py-6">
            <h1 className="text-3xl font-semibold">Edit Meeting — Coming in Week 04</h1>
            <Link
                href="/meetings"
                className="mt-4 inline-block font-semibold text-brand underline underline-offset-4"
            >
                &larr; Back to all meetings
            </Link>
        </main>
    );
}