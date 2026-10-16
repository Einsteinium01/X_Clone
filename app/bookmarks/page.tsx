"use client";

import { EmptyState, Header } from "@/components/Header";
import { TweetList } from "@/components/TweetList";
import { useStore } from "@/lib/store";

export default function BookmarksPage() {
  const { db, hydrated } = useStore();
  const saved = db.tweets.filter((t) => t.bookmarked);

  return (
    <div className="pb-14 md:pb-0">
      <Header title="Bookmarks" back />
      <TweetList
        tweets={saved}
        loading={!hydrated}
        empty={
          <EmptyState
            title="Save posts for later"
            body="Bookmark posts to easily find them again in the future."
          />
        }
      />
    </div>
  );
}
