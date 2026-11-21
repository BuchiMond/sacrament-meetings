import { connection } from "next/server";
import NavLinks from "./NavLinks";

export const WARD_NAME = "Lagos Ikeja Ward";

export default async function Header() {
  // The current date changes per request, so wait for a real request first.
  await connection();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="no-print bg-brand text-brand-contrast">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-xl font-semibold">{WARD_NAME}</p>
          <p className="text-sm text-blue-100">{today}</p>
        </div>
        <NavLinks />
      </div>
    </header>
  );
}
