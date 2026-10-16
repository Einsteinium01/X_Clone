"use client";

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Avatar, hueOf } from "@/components/Avatar";
import { EmptyState, Header, TabsBar } from "@/components/Header";
import { FollowButton } from "@/components/FollowButton";
import { TweetList } from "@/components/TweetList";
import { CalendarIcon, VerifiedIcon } from "@/components/icons";
import { compactNumber, joinedDate } from "@/lib/time";
import { useStore } from "@/lib/store";

export default function ProfilePage() {
  const params = useParams<{ handle: string }>();
  const handle = (params?.handle ?? "").toLowerCase();
  const { db, hydrated, currentUserId } = useStore();
  const [tab, setTab] = useState("posts");

  const user = db.users.find((u) => u.handle === handle);

  const posts = useMemo(
    () => (user ? db.tweets.filter((t) => t.authorId === user.id && !t.replyToId) : []),
    [db.tweets, user]
  );
  const replies = useMemo(
    () => (user ? db.tweets.filter((t) => t.authorId === user.id && t.replyToId) : []),
    [db.tweets, user]
  );
  const likes = useMemo(
    () =>
      user
        ? user.id === currentUserId
          ? db.tweets.filter((t) => t.liked)
          : []
        : [],
    [db.tweets, user, currentUserId]
  );

  if (!hydrated) {
    return (
      <div>
        <Header title="Profile" back />
        <div className="h-[200px] bg-surface" />
        <div className="animate-pulse space-y-3 p-4">
          <div className="h-24 w-24 rounded-full bg-surface" />
          <div className="h-4 w-40 rounded bg-surface" />
          <div className="h-3 w-64 rounded bg-surface" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <Header title="Profile" back />
        <EmptyState
          title="This account does not exist"
          body={`No account found for @${handle}.`}
        />
      </div>
    );
  }

  const isMe = user.id === currentUserId;
  const hue = hueOf(user.handle);
  const followingLabel = isMe
    ? db.users.filter((u) => u.following && u.id !== currentUserId).length
    : Math.max(3, Math.round(user.followers / 91));

  return (
    <div className="pb-14 md:pb-0">
      <Header
        title={user.name}
        subtitle={`${compactNumber(posts.length + replies.length)} posts`}
        back
      />

      <div
        className="h-[200px] w-full"
        style={{
          background: `linear-gradient(135deg, hsl(${hue} 46% 52%), hsl(${(hue + 65) % 360} 55% 38%))`,
        }}
      />

      <div className="relative px-4 pb-4">
        <Avatar
          user={user}
          size={140}
          className="absolute -top-[70px] border-4 border-app"
        />

        <div className="h-[74px] flex items-start justify-end py-3">
          {isMe ? (
            <button className="rounded-full border border-border px-4 py-2 text-[15px] font-bold transition-colors hover:bg-surface">
              Edit profile
            </button>
          ) : (
            <FollowButton user={user} />
          )}
        </div>

        <div>
          <h2 className="flex items-center gap-1 text-2xl font-extrabold leading-6">
            {user.name}
            {user.verified ? <VerifiedIcon className="h-5 w-5 text-accent" /> : null}
          </h2>
          <p className="text-[15px] text-secondary">@{user.handle}</p>

          <p className="mt-3 whitespace-pre-wrap text-[15px]">{user.bio}</p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[15px] text-secondary">
            <span className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Joined {joinedDate(user.joinedAt)}
            </span>
            {user.location ? (
              <span className="flex items-center gap-2">
                <span className="text-[14px]">◉</span>
                {user.location}
              </span>
            ) : null}
          </div>

          <div className="mt-3 flex gap-5 text-[15px]">
            <span>
              <span className="font-bold">{compactNumber(followingLabel)}</span>{" "}
              <span className="text-secondary">Following</span>
            </span>
            <span>
              <span className="font-bold">{compactNumber(user.followers)}</span>{" "}
              <span className="text-secondary">Followers</span>
            </span>
          </div>
        </div>
      </div>

      <HeaderTabsOnly tabs={["posts", "replies", "likes"]} active={tab} onChange={setTab} />

      <TweetList
        tweets={tab === "posts" ? posts : tab === "replies" ? replies : likes}
        empty={
          tab === "likes" && !isMe ? (
            <EmptyState
              title="No likes yet"
              body={`We do not track likes for @${user.handle} in this demo.`}
            />
          ) : (
            <EmptyState
              title={tab === "posts" ? "No posts yet" : tab === "replies" ? "No replies yet" : "No likes yet"}
              body={
                tab === "posts"
                  ? "When this account posts, it shows up here."
                  : tab === "replies"
                    ? "When this account replies, it shows up here."
                    : "Posts you like show up here."
              }
            />
          )
        }
      />
    </div>
  );
}

function HeaderTabsOnly({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <TabsBar
      tabs={tabs.map((t) => ({ id: t, label: t[0]!.toUpperCase() + t.slice(1) }))}
      active={active}
      onChange={onChange}
    />
  );
}
