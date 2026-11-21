import Link from "next/link";

export default function MeetingsLayout({ children }: LayoutProps<"/meetings">) {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 pt-6">
      <nav aria-label="Meetings section" className="no-print text-sm">
        <ul className="flex flex-wrap gap-4 text-brand">
          <li>
            <Link href="/meetings" className="font-semibold underline underline-offset-4">
              All meetings
            </Link>
          </li>
          <li>
            <Link
              href="/meetings/current"
              className="font-semibold underline underline-offset-4"
            >
              Current week
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
