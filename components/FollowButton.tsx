"use client";

import type { User } from "@/lib/types";
import { useStore } from "@/lib/store";

export function FollowButton({ user, full }: { user: User; full?: boolean }) {
  const { toggleFollow } = useStore();
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFollow(user.id);
      }}
      className={`group rounded-full text-[14px] font-bold transition-colors ${
        full ? "w-full py-2" : "h-8 px-4"
      } ${
        user.following
          ? "border border-border text-primary hover:border-[#f4212e]/50 hover:bg-likedim hover:text-like"
          : "bg-primary text-black hover:bg-white/90"
      }`}
    >
      {user.following ? (
        <>
          <span className="group-hover:hidden">Following</span>
          <span className="hidden group-hover:block">Unfollow</span>
        </>
      ) : (
        "Follow"
      )}
    </button>
  );
}
