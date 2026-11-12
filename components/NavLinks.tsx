"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/meetings", label: "All Meetings" },
  { href: "/meetings/current", label: "This Week" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  // "All Meetings" should be active for the list and any detail page.
  if (href === "/meetings") {
    return pathname === "/meetings" || /^\/meetings\/\d+/.test(pathname);
  }
  return pathname === href;
}

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main">
      <ul className="flex flex-wrap gap-2">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-white text-brand"
                    : "text-white hover:bg-white/15"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
