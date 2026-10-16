"use client";

import { useSyncExternalStore } from "react";
import { buildSeedDB } from "./seed";
import type { DB, Tweet } from "./types";

const STORAGE_KEY = "x-clone-db-v1";
const EMPTY_DB: DB = { users: [], tweets: [] };

let snapshot: DB | null = null;
const listeners = new Set<() => void>();

function ensure(): DB {
  if (snapshot !== null) return snapshot;
  snapshot = EMPTY_DB;
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DB;
        if (Array.isArray(parsed.users) && Array.isArray(parsed.tweets)) snapshot = parsed;
      }
    } catch {
      snapshot = EMPTY_DB;
    }
    if (snapshot === EMPTY_DB) snapshot = buildSeedDB();
  }
  return snapshot;
}

function getServerSnapshot(): DB {
  return EMPTY_DB;
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function update(fn: (d: DB) => DB): void {
  const next = fn(ensure());
  snapshot = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage full or unavailable: keep running in memory
  }
  listeners.forEach((l) => l());
}

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export function addTweet(text: string, authorId: string, replyToId?: string): void {
  update((d) => ({
    users: d.users,
    tweets: [
      {
        id: makeId(),
        authorId,
        text,
        createdAt: Date.now(),
        likes: 0,
        retweets: 0,
        liked: false,
        retweeted: false,
        bookmarked: false,
        ...(replyToId ? { replyToId } : {}),
      },
      ...d.tweets,
    ],
  }));
}

export function toggleLike(id: string): void {
  update((d) => ({
    users: d.users,
    tweets: d.tweets.map((t) =>
      t.id === id ? { ...t, liked: !t.liked, likes: t.likes + (t.liked ? -1 : 1) } : t
    ),
  }));
}

export function toggleRetweet(id: string): void {
  update((d) => ({
    users: d.users,
    tweets: d.tweets.map((t) =>
      t.id === id
        ? { ...t, retweeted: !t.retweeted, retweets: t.retweets + (t.retweeted ? -1 : 1) }
        : t
    ),
  }));
}

export function toggleBookmark(id: string): void {
  update((d) => ({
    users: d.users,
    tweets: d.tweets.map((t) => (t.id === id ? { ...t, bookmarked: !t.bookmarked } : t)),
  }));
}

export function toggleFollow(userId: string): void {
  update((d) => ({
    tweets: d.tweets,
    users: d.users.map((u) =>
      u.id === userId
        ? { ...u, following: !u.following, followers: u.followers + (u.following ? -1 : 1) }
        : u
    ),
  }));
}

function repliesOfIds(db: DB, tweetId: string): Tweet[] {
  return db.tweets.filter((t) => t.replyToId === tweetId);
}

interface StoreValue {
  db: DB;
  hydrated: boolean;
  currentUserId: string;
  addTweet: typeof addTweet;
  toggleLike: typeof toggleLike;
  toggleRetweet: typeof toggleRetweet;
  toggleBookmark: typeof toggleBookmark;
  toggleFollow: typeof toggleFollow;
  repliesOf: (tweetId: string) => Tweet[];
}

export function useStore(): StoreValue {
  const db = useSyncExternalStore(subscribe, ensure, getServerSnapshot);
  return {
    db,
    hydrated: db.users.length > 0,
    currentUserId: "u_you",
    addTweet,
    toggleLike,
    toggleRetweet,
    toggleBookmark,
    toggleFollow,
    repliesOf: (tweetId: string) => repliesOfIds(db, tweetId),
  };
}
