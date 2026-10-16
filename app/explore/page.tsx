"use client";

import { useMemo, useState } from "react";
import { Header, EmptyState } from "@/components/Header";
import { FollowButton } from "@/components/FollowButton";
import { Avatar } from "@/components/Avatar";
import { SearchIcon } from "@/components/icons";
import { TweetList } from "@/components/TweetList";
import { useStore } from "@/lib/store";
import { TRENDS } from "@/lib/seed";

export default function ExplorePage() {
  const { db } = useStore();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const results = useMemo(
    () =>
      q
        ? db.tweets.filter((t) => t.text.toLowerCase().includes(q))
        : db.tweets.filter((t) => !t.replyToId),
    [db.tweets, q]
  );

  return (
    <div className="pb-14 md:pb-0">
      <Header title="Search">
        <div className="border-b border-border px-4 pb-3">
          <label className="group flex h-[42px] items-center gap-3 rounded-full bg-surface px-4 text-secondary focus-within:bg-app focus-within:ring-1 focus-within:ring-accent">
            <SearchIcon className="h-5 w-5" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts"
              className="w-full bg-transparent text-[15px] text-primary outline-none placeholder:text-secondary"
            />
            {query ? (
              <button type="button" onClick={() => setQuery("")} className="text-sm" aria-label="Clear search">
                ✕
              </button>
            ) : null}
          </label>
        </div>
      </Header>

      {q ? (
        <TweetList
          tweets={results}
          empty={<EmptyState title="No results" body={`Nothing matches "${query.trim()}". Try another search.`} />}
        />
      ) : (
        <>
          <section className="border-b border-border p-4 pb-5">
            <h2 className="mb-3 text-xl font-extrabold">Trends for you</h2>
            <div className="grid grid-cols-2 gap-3">
              {TRENDS.map((t) => (
                <div
                  key={t.tag}
                  className="rounded-2xl border border-border p-4 transition-colors hover:bg-hover"
                >
                  <p className="text-[13px] text-secondary">{t.category} · Trending</p>
                  <p className="text-[17px] font-bold">{t.tag}</p>
                  <p className="text-[13px] text-secondary">{t.posts}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="p-4">
            <h2 className="mb-1 text-xl font-extrabold">Who to follow</h2>
            <div className="overflow-hidden rounded-2xl border border-border">
              {db.users
                .filter((u) => u.id !== "u_you")
                .map((u) => (
                  <div key={u.id} className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0 hover:bg-hover">
                    <Avatar user={u} size={40} />
                    <div className="min-w-0 flex-1 leading-tight">
                      <p className="truncate font-bold">{u.name}</p>
                      <p className="truncate text-[15px] text-secondary">@{u.handle}</p>
                    </div>
                    <FollowButton user={u} />
                  </div>
                ))}
            </div>
          </section>
          <TweetList tweets={results.slice(0, 5)} />
        </>
      )}
    </div>
  );
}
