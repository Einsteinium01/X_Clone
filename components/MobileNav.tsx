"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BellIcon,
  BookmarkIcon,
  HomeIcon,
  SearchIcon,
} from "./icons";

export function MobileNav() {
  const pathname = usePathname();
  const items = [
    { href: "/", icon: HomeIcon },
    { href: "/explore", icon: SearchIcon },
    { href: "/notifications", icon: BellIcon },
    { href: "/bookmarks", icon: BookmarkIcon },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex h-14 items-center justify-around border-t border-border bg-app/85 backdrop-blur md:hidden">
      {items.map((i) => {
        const active = i.href === "/" ? pathname === "/" : pathname.startsWith(i.href);
        const Icon = i.icon;
        return (
          <Link
            key={i.href}
            href={i.href}
            aria-label={i.href.slice(1) || "Home"}
            className={`p-3 ${active ? "text-primary" : "text-secondary"}`}
          >
            <Icon className="h-6 w-6" />
          </Link>
        );
      })}
    </nav>
  );
}
