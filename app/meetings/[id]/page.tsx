import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import MeetingDetail from "@/components/MeetingDetail";
import PrintButton from "@/components/PrintButton";
import { fetchMeeting } from "@/lib/api";

async function MeetingContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meeting = await fetchMeeting(id);

  if (!meeting) {
    notFound();
  }

  return (
    <>
      <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link href="/meetings" className="font-semibold text-brand underline underline-offset-4">
          &larr; Back to all meetings
        </Link>
        <PrintButton />
      </div>
      <MeetingDetail meeting={meeting} />
    </>
  );
}

export default function MeetingPage({ params }: PageProps<"/meetings/[id]">) {
  return (
    <main className="py-6">
      <Suspense fallback={<p className="text-muted">Loading program&hellip;</p>}>
        <MeetingContent params={params} />
      </Suspense>
    </main>
  );
}
