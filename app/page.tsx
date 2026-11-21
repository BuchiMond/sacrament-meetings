import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <section aria-labelledby="home-heading" className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-sm">
        <Image
          src="/hero.jpg"
          alt="Sunrise glow over layered hills, a calm backdrop for Sunday worship"
          width={1600}
          height={640}
          priority
          className="h-48 w-full object-cover sm:h-64"
        />
        <div className="p-6">
          <h1 id="home-heading" className="text-3xl font-semibold">
            Sacrament Meeting Planner
          </h1>
          <p className="mt-3 max-w-2xl text-lg">
            Plan each Sunday&apos;s program, review past agendas, and print a clean copy
            for the stand. Leaders can see every hymn, prayer, speaker, and piece of
            ward business in one place.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/meetings/current"
              className="rounded-md bg-brand px-5 py-3 font-semibold text-brand-contrast hover:opacity-90"
            >
              This week&apos;s program
            </Link>
            <Link
              href="/meetings"
              className="rounded-md border border-brand px-5 py-3 font-semibold text-brand hover:bg-brand/10"
            >
              Browse all meetings
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
