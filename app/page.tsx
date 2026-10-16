"use client";

import { useMemo, useState } from "react";
import { Composer } from "@/components/Composer";
import { Header, TabsBar } from "@/components/Header";
import { EmptyState } from "@/components/Header";
import { TweetList } from "@/components/TweetList";
import { useStore } from "@/lib/store";

export default function HomePage() {
  const { db, hydrated, currentUserId } = useStore();
  const [tab, setTab] = useState("foryou");

  const feed = useMemo(() => {
    const base = db.tweets.filter((t) => !t.replyToId);
    if (tab !== "following") return base;
    const followed = new Set(
      db.users.filter((u) => u.following && u.id !== currentUserId).map((u) => u.id)
    );
    return base.filter((t) => followed.has(t.authorId) || t.authorId === currentUserId);
  }, [db, tab, currentUserId]);

  return (
    <div className="pb-14 md:pb-0">
      <Header title="Home">
        <TabsBar
          tabs={[
            { id: "foryou", label: "For you" },
            { id: "following", label: "Following" },
          ]}
          active={tab}
          onChange={setTab}
        />
      </Header>

      <Composer />

      <TweetList
        tweets={feed}
        loading={!hydrated}
        empty={
          <EmptyState
            title="Nothing to see here, yet"
            body="Follow more accounts to fill your Following feed."
          />
        }
      />
    </div>
  );
}
