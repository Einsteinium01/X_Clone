"use client";

import { useMemo, type ReactNode } from "react";
import type { Tweet as TweetType } from "@/lib/types";
import { Tweet } from "./Tweet";

export function TweetList({
  tweets,
  empty,
  loading,
}: {
  tweets: TweetType[];
  empty?: ReactNode;
  loading?: boolean;
}) {
  const sorted = useMemo(
    () => [...tweets].sort((a, b) => b.createdAt - a.createdAt),
    [tweets]
  );

  if (loading) {
    return (
      <div className="animate-pulse" aria-busy>
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex gap-3 border-b border-border px-4 py-4">
            <div className="h-10 w-10 shrink-0 rounded-full bg-surface" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-40 rounded bg-surface" />
              <div className="h-3 w-full rounded bg-surface" />
              <div className="h-3 w-2/3 rounded bg-surface" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (sorted.length === 0 && empty) return <>{empty}</>;

  return (
    <>
      {sorted.map((t) => (
        <Tweet key={t.id} tweet={t} />
      ))}
    </>
  );
}
