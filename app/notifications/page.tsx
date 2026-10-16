"use client";

import { EmptyState, Header } from "@/components/Header";
import { Avatar } from "@/components/Avatar";
import {
  HeartIcon,
  RetweetIcon,
  ReplyIcon,
  UserIcon,
} from "@/components/icons";
import { relativeTime } from "@/lib/time";
import { useStore } from "@/lib/store";

interface Note {
  id: string;
  userId: string;
  kind: "like" | "retweet" | "reply" | "follow";
  tweetId?: string;
  when: number;
}

export default function NotificationsPage() {
  const { db, hydrated } = useStore();
  if (!hydrated) {
    return <EmptyState title="Notifications" body="Loading..." />;
  }

  // derive mock notifications from seed states
  const you = db.users.find((u) => u.id === "u_you")!;
  const notes: Note[] = [];
  for (const t of db.tweets) {
    if (t.authorId !== "u_you") continue;
    if (t.liked)
      notes.push({
        id: `n_like_${t.id}`,
        userId: "u_nova",
        kind: "like",
        tweetId: t.id,
        when: t.createdAt + 60_000,
      });
    if (t.retweeted)
      notes.push({
        id: `n_rt_${t.id}`,
        userId: "u_dev",
        kind: "retweet",
        tweetId: t.id,
        when: t.createdAt + 120_000,
      });
    const replies = db.tweets.filter((r) => r.replyToId === t.id);
    for (const r of replies) {
      if (r.authorId !== "u_you")
        notes.push({
          id: `n_rep_${r.id}`,
          userId: r.authorId,
          kind: "reply",
          tweetId: r.id,
          when: r.createdAt,
        });
    }
  }
  const ownTimes = db.tweets
    .filter((t) => t.authorId === you.id)
    .map((t) => t.createdAt)
    .sort((a, b) => b - a);
  const anchorA = ownTimes[0] ?? 0;
  for (const u of db.users) {
    if (u.following && u.id !== "u_you") {
      const i = notes.length;
      notes.push({
        id: `n_follow_${u.id}`,
        userId: u.id,
        kind: "follow",
        when: anchorA > 0 ? anchorA - i * 60_000 : 0,
      });
    }
  }
  notes.sort((a, b) => b.when - a.when);

  if (notes.length === 0) {
    return (
      <div>
        <Header title="Notifications" />
        <EmptyState
          title="Nothing to see here, yet"
          body="When someone interacts with your posts, it shows up here."
        />
      </div>
    );
  }

  return (
    <div className="pb-14 md:pb-0">
      <Header title="Notifications" />
      {notes.map((n) => {
        const u = db.users.find((x) => x.id === n.userId)!;
        const target = n.tweetId ? db.tweets.find((t) => t.id === n.tweetId) : undefined;
        const meta =
          n.kind === "like"
            ? { icon: <HeartIcon className="h-5 w-5" fill="currentColor" />, color: "text-like", text: "liked your post" }
            : n.kind === "retweet"
              ? { icon: <RetweetIcon className="h-5 w-5" />, color: "text-rt", text: "reposted your post" }
              : n.kind === "reply"
                ? { icon: <ReplyIcon className="h-5 w-5" />, color: "text-accent", text: "replied to you" }
                : { icon: <UserIcon className="h-5 w-5" />, color: "text-accent", text: "followed you" };

        return (
          <div
            key={n.id}
            className="flex gap-3 border-b border-border px-4 py-3 transition-colors hover:bg-hover"
          >
            <span className={`shrink-0 pt-0.5 ${meta.color}`}>{meta.icon}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1 text-[15px] leading-5">
                <Avatar user={u} size={20} />
                <span className="truncate font-bold hover:underline">{u.name}</span>
                <span className="truncate px-1 text-secondary">{meta.text}</span>
                <span className="ml-auto shrink-0 text-[13px] text-secondary">
                  {relativeTime(n.when)}
                </span>
              </div>
              {target ? (
                <p className="truncate pt-0.5 text-[13px] text-secondary">
                  {target.text.replace(/\n/g, " · ")}
                </p>
              ) : (
                <p className="truncate pt-0.5 text-[13px] text-secondary">Now you follow each other</p>
              )}
            </div>
          </div>
        );
      })}
      <p className="px-4 py-4 text-[13px] text-secondary">
        Signed in as @{you.handle}. Interactions happen when you toggle likes and reposts in this demo.
      </p>
    </div>
  );
}
