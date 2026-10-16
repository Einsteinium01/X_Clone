"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Avatar } from "./Avatar";
import {
  BellIcon,
  BookmarkIcon,
  HomeIcon,
  MoreIcon,
  SearchIcon,
  UserIcon,
  XLogo,
} from "./icons";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { db } = useStore();
  const me = db.users.find((u) => u.id === "u_you");
  if (!me) return <aside className="hidden md:block md:w-[72px] lg:w-[275px]" />;

  const items = [
    { href: "/", label: "Home", icon: <HomeIcon className="h-6 w-6" /> },
    { href: "/explore", label: "Explore", icon: <SearchIcon className="h-6 w-6" /> },
    { href: "/notifications", label: "Notifications", icon: <BellIcon className="h-6 w-6" /> },
    { href: "/bookmarks", label: "Bookmarks", icon: <BookmarkIcon className="h-6 w-6" /> },
    { href: `/profile/${me.handle}`, label: "Profile", icon: <UserIcon className="h-6 w-6" /> },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const openComposer = () => {
    if (pathname !== "/") router.push("/");
    setTimeout(() => {
      const ta = document.querySelector("textarea");
      if (ta) (ta as HTMLTextAreaElement).focus();
    }, 80);
  };

  return (
    <aside className="top-0 hidden h-dvh shrink-0 flex-col items-center pb-3 pl-1 pr-1 md:sticky md:flex md:w-[72px] lg:w-[275px] lg:items-start lg:pl-2 lg:pr-1">
      <Link
        href="/"
        className="hover:bg-surface mt-1 mb-1 rounded-full p-3 transition-colors"
        aria-label="X home"
      >
        <XLogo className="h-7 w-7" />
      </Link>

      <nav className="flex w-full flex-col items-center gap-0.5 lg:items-start">
        {items.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className={`group flex max-w-full items-center gap-4 rounded-full py-2.5 pl-3 pr-5 transition-colors ${
              isActive(i.href) ? "font-extrabold text-primary" : "text-primary"
            } hover:bg-surface`}
          >
            {i.icon}
            <span
              className={`hidden pr-2 text-xl lg:block ${isActive(i.href) ? "font-extrabold" : ""}`}
            >
              {i.label}
            </span>
          </Link>
        ))}
      </nav>

      <button
        onClick={openComposer}
        className="my-3 flex h-[52px] w-full items-center justify-center rounded-full bg-accent text-[17px] font-bold text-white transition-colors hover:bg-accentstrong lg:w-max lg:px-8"
      >
        <span className="hidden md:block lg:hidden text-4xl font-light leading-none">+</span>
        <span className="lg:px-2">Post</span>
      </button>

      <button className="hover:bg-surface mt-auto hidden w-full items-center gap-3 rounded-full p-3 text-left transition-colors md:flex">
        <Avatar user={me} size={40} />
        <span className="hidden min-w-0 flex-1 leading-tight lg:block">
          <span className="block truncate text-[15px] font-bold">{me.name}</span>
          <span className="block truncate text-[15px] text-secondary">@{me.handle}</span>
        </span>
        <MoreIcon className="hidden h-5 w-5 shrink-0 lg:block" />
      </button>
    </aside>
  );
}
