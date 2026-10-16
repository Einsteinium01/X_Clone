"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { DB, Tweet } from "./types";
import { buildSeedDB } from "./seed";

const STORAGE_KEY = "x-clone-db-v1";
const EMPTY_DB: DB = { users: [], tweets: [] };

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

interface StoreValue {
  db: DB;
  hydrated: boolean;
  currentUserId: string;
  addTweet: (text: string, authorId: string, replyToId?: string) => void;
  toggleLike: (id: string) => void;
  toggleRetweet: (id: string) => void;
  toggleBookmark: (id: string) => void;
  toggleFollow: (userId: string) => void;
  repliesOf: (tweetId: string) => Tweet[];
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<DB>(EMPTY_DB);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let next: DB = buildSeedDB();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DB;
        if (Array.isArray(parsed.users) && Array.isArray(parsed.tweets)) next = parsed;
      }
    } catch {
      next = buildSeedDB();
    }
    setDb(next);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch {
      // storage full or unavailable: keep running in memory
    }
  }, [db, hydrated]);

  const addTweet = useCallback((text: string, authorId: string, replyToId?: string) => {
    setDb((d) => ({
      ...d,
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
  }, []);

  const toggleLike = useCallback((id: string) => {
    setDb((d) => ({
      ...d,
      tweets: d.tweets.map((t) =>
        t.id === id ? { ...t, liked: !t.liked, likes: t.likes + (t.liked ? -1 : 1) } : t
      ),
    }));
  }, []);

  const toggleRetweet = useCallback((id: string) => {
    setDb((d) => ({
      ...d,
      tweets: d.tweets.map((t) =>
        t.id === id ? { ...t, retweeted: !t.retweeted, retweets: t.retweets + (t.retweeted ? -1 : 1) } : t
      ),
    }));
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setDb((d) => ({
      ...d,
      tweets: d.tweets.map((t) => (t.id === id ? { ...t, bookmarked: !t.bookmarked } : t)),
    }));
  }, []);

  const toggleFollow = useCallback((userId: string) => {
    setDb((d) => ({
      tweets: d.tweets,
      users: d.users.map((u) =>
        u.id === userId ? { ...u, following: !u.following, followers: u.followers + (u.following ? -1 : 1) } : u
      ),
    }));
  }, []);

  const repliesOf = useCallback(
    (tweetId: string) => db.tweets.filter((t) => t.replyToId === tweetId),
    [db.tweets]
  );

  return (
    <StoreContext.Provider
      value={{
        db,
        hydrated,
        currentUserId: "u_you",
        addTweet,
        toggleLike,
        toggleRetweet,
        toggleBookmark,
        toggleFollow,
        repliesOf,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
