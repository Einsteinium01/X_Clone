"use client";

import Link from "next/link";
import { useState } from "react";
import { compactNumber, relativeTime } from "@/lib/time";
import { useStore } from "@/lib/store";
import type { Tweet as TweetType } from "@/lib/types";
import { Avatar } from "./Avatar";
import { Composer } from "./Composer";
import {
  BookmarkIcon,
  HeartIcon,
  MoreIcon,
  ReplyIcon,
  RetweetIcon,
  ShareIcon,
  VerifiedIcon,
} from "./icons";

function renderText(text: string) {
  return text.split(/([#@][\w]+)/g).map((p, i) =>
    /^[#@][\w]+$/.test(p) ? (
      <span key={i} className="text-accent hover:underline">
        {p}
      </span>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

interface ActionProps {
  icon: React.ReactNode;
  count?: number;
  active?: boolean;
  activeClass?: string;
  hoverClass: string;
  label: string;
  onClick: () => void;
}

function Action({ icon, count, active, activeClass, hoverClass, label, onClick }: ActionProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      title={label}
      aria-label={label}
      className={`flex items-center rounded-full transition-colors ${
        active ? activeClass : "text-secondary"
      } ${hoverClass}`}
    >
      <span className="hover-area flex items-center justify-center rounded-full p-2">{icon}</span>
      {count && count > 0 ? (
        <span className="px-1.5 text-[13px] tabular-nums">{compactNumber(count)}</span>
      ) : null}
    </button>
  );
}

export function Tweet({ tweet }: { tweet: TweetType }) {
  const { db, repliesOf, currentUserId, toggleLike, toggleRetweet, toggleBookmark, addTweet } =
    useStore();
  const author = db.users.find((u) => u.id === tweet.authorId);
  const [replying, setReplying] = useState(false);
  const replyCount = repliesOf(tweet.id).length;

  if (!author) return null;
  const profileHref = `/profile/${author.handle}`;
  const isOwn = author.id === currentUserId;

  return (
    <article className="border-b border-border px-4 py-3 transition-colors hover:bg-hover">
      <div className="flex gap-3">
        <Link href={profileHref} className="shrink-0">
          <Avatar user={author} size={40} />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 text-[15px] leading-5">
            <Link href={profileHref} className="truncate font-bold hover:underline">
              {author.name}
            </Link>
            {author.verified ? <VerifiedIcon className="h-[18px] w-[18px] shrink-0 text-accent" /> : null}
            <span className="truncate text-secondary">@{author.handle}</span>
            <span className="px-1 text-secondary" aria-hidden>
              ·
            </span>
            <Link href={profileHref} className="shrink-0 text-secondary hover:underline">
              {relativeTime(tweet.createdAt)}
            </Link>
            <button
              type="button"
              className="ml-auto shrink-0 rounded-full p-1 text-secondary transition-colors hover:bg-accentdim hover:text-accent"
              title="More (mock)"
              aria-label="More"
            >
              <MoreIcon className="h-4 w-4" />
            </button>
          </div>

          <p className="whitespace-pre-wrap break-words text-[15px] leading-5">
            {renderText(tweet.text)}
          </p>

          <div className="mt-2 flex max-w-md items-center justify-between">
            <Action
              icon={<ReplyIcon className="h-[18px] w-[18px]" fill={replying ? "currentColor" : "none"} />}
              count={replyCount}
              label="Reply"
              onClick={() => setReplying((r) => !r)}
              hoverClass="hover:text-accent hover:bg-accentdim"
            />
            <Action
              icon={<RetweetIcon className="h-[18px] w-[18px]" />}
              count={tweet.retweets}
              label="Repost"
              active={tweet.retweeted}
              activeClass="text-rt"
              hoverClass="hover:text-rt hover:bg-rtdim"
              onClick={() => toggleRetweet(tweet.id)}
            />
            <Action
              icon={
                <HeartIcon
                  className="h-[18px] w-[18px]"
                  fill={tweet.liked ? "currentColor" : "none"}
                />
              }
              count={tweet.likes}
              label="Like"
              active={tweet.liked}
              activeClass="text-like"
              hoverClass="hover:text-like hover:bg-likedim"
              onClick={() => toggleLike(tweet.id)}
            />
            <Action
              icon={
                <BookmarkIcon
                  className="h-[18px] w-[18px]"
                  fill={tweet.bookmarked ? "currentColor" : "none"}
                />
              }
              count={tweet.bookmarked ? 1 : undefined}
              label="Bookmark"
              active={tweet.bookmarked}
              activeClass="text-accent"
              hoverClass="hover:text-accent hover:bg-accentdim"
              onClick={() => toggleBookmark(tweet.id)}
            />
            <Action
              icon={<ShareIcon className="h-[18px] w-[18px]" />}
              label="Share"
              onClick={() => {}}
              hoverClass="hover:text-accent hover:bg-accentdim"
            />
          </div>

          {replying ? (
            <div className="mt-3 border-t border-border pt-1">
              <Composer
                replyTo={tweet.id}
                autoFocus
                onPosted={() => setReplying(false)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
