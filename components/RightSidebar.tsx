"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Avatar } from "./Avatar";
import { FollowButton } from "./FollowButton";
import { SearchIcon, SparklesIcon } from "./icons";
import { TRENDS } from "@/lib/seed";
export function RightSidebar() {
  const router = useRouter();
  const { db } = useStore();
  const suggestions = db.users.filter((u) => u.id !== "u_you" && !u.following).slice(0, 3);
  if (db.users.length === 0) return <aside className="hidden w-[350px] shrink-0 pl-8 lg:block" />;

  return (
    <aside className="top-0 hidden h-dvh w-[350px] shrink-0 flex-col gap-4 overflow-y-auto py-1 pl-8 pr-2 lg:sticky lg:flex">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/explore");
        }}
      >
        <label className="group flex h-[47px] items-center gap-3 rounded-full border border-transparent bg-surface px-4 focus-within:border-accent focus-within:bg-app">
          <SearchIcon className="h-5 w-5 shrink-0 text-secondary group-focus-within:text-accent" />
          <input
            type="search"
            placeholder="Search X"
            className="h-full w-full bg-transparent text-[15px] outline-none placeholder:text-secondary"
          />
        </label>
      </form>

      <section className="rounded-2xl border border-border p-4">
        <h2 className="text-xl font-extrabold">Subscribe to Premium</h2>
        <p className="mt-1 text-[15px] leading-5">
          Subscribe to unlock new features and, if eligible, receive a share of revenue.
        </p>
        <button className="mt-3 flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-bold text-white transition-colors hover:bg-accentstrong">
          <SparklesIcon className="h-4 w-4" />
          Subscribe
        </button>
      </section>

      <section className="overflow-hidden rounded-2xl border border-border">
        <h2 className="px-4 pt-3 pb-2 text-xl font-extrabold">Trends for you</h2>
        {TRENDS.map((t) => (
          <button
            key={t.tag}
            className="block w-full px-4 py-3 text-left transition-colors hover:bg-hover"
          >
            <p className="text-[13px] text-secondary">{t.category} · Trending</p>
            <p className="text-[15px] font-bold">{t.tag}</p>
            <p className="text-[13px] text-secondary">{t.posts}</p>
          </button>
        ))}
        <button className="block w-full px-4 py-3 text-left text-[15px] text-accent transition-colors hover:bg-hover">
          Show more
        </button>
      </section>

      <section className="overflow-hidden rounded-2xl border border-border">
        <h2 className="px-4 pt-3 pb-2 text-xl font-extrabold">Who to follow</h2>
        {suggestions.map((u) => (
          <div key={u.id} className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-hover">
            <Link href={`/profile/${u.handle}`}>
              <Avatar user={u} size={40} />
            </Link>
            <Link href={`/profile/${u.handle}`} className="min-w-0 flex-1 leading-tight">
              <span className="flex items-center gap-1 font-bold">
                <span className="truncate">{u.name}</span>
              </span>
              <span className="block truncate text-[15px] text-secondary">@{u.handle}</span>
            </Link>
            <FollowButton user={u} />
          </div>
        ))}
        <button className="block w-full px-4 py-3 text-left text-[15px] text-accent transition-colors hover:bg-hover">
          Show more
        </button>
      </section>

      <div className="flex flex-wrap gap-x-3 gap-y-1 px-1 text-[13px] text-secondary">
        <span>Terms of Service</span>
        <span>Privacy Policy</span>
        <span>Cookie Policy</span>
        <span>Accessibility</span>
        <span>Ads info</span>
        <span className="flex items-center gap-1">More · © 2026 X Clone</span>
      </div>
    </aside>
  );
}
