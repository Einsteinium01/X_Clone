"use client";

import { useRef, useState } from "react";
import { useStore } from "@/lib/store";
import { Avatar } from "./Avatar";
import {
  CalendarIcon,
  EmojiIcon,
  GifIcon,
  MediaIcon,
  PollIcon,
} from "./icons";

const LIMIT = 280;
const RING_C = 2 * Math.PI * 9;

export function Composer({
  replyTo,
  placeholder,
  autoFocus,
  onPosted,
}: {
  replyTo?: string;
  placeholder?: string;
  autoFocus?: boolean;
  onPosted?: () => void;
}) {
  const { db, currentUserId, addTweet } = useStore();
  const [text, setText] = useState("");
  const taRef = useRef<HTMLTextAreaElement>(null);
  const isReply = Boolean(replyTo);
  const over = text.length > LIMIT;
  const canPost = text.trim().length > 0 && !over;
  const pct = Math.min(text.length / LIMIT, 1);
  const me = db.users.find((u) => u.id === currentUserId);
  if (!me) return null;

  const post = () => {
    if (!canPost) return;
    addTweet(text.trim(), currentUserId, replyTo);
    setText("");
    onPosted?.();
    if (taRef.current) {
      taRef.current.style.height = "auto";
      taRef.current.focus();
    }
  };

  const update = (v: string) => {
    setText(v);
    const el = taRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        post();
      }}
      className="flex gap-3 border-b border-border px-4 py-3"
    >
      <Avatar user={me} size={40} />
      <div className="min-w-0 flex-1 pt-2">
        <textarea
          ref={taRef}
          autoFocus={autoFocus}
          value={text}
          onChange={(e) => update(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) post();
          }}
          rows={1}
          maxLength={4000}
          placeholder={placeholder ?? (isReply ? "Post your reply" : "What is happening?")}
          className="w-full resize-none bg-transparent text-lg leading-6 outline-none placeholder:text-secondary"
        />
        <div className="mt-1 flex w-full items-center justify-between">
          {isReply ? <span /> : (
            <div className="-ml-2 flex items-center text-accent">
              {[
                { icon: MediaIcon, label: "Add media" },
                { icon: GifIcon, label: "Add GIF" },
                { icon: PollIcon, label: "Add poll" },
                { icon: EmojiIcon, label: "Add emoji" },
                { icon: CalendarIcon, label: "Schedule post" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  title={`${label} (mock)`}
                  className="hover:bg-accentdim rounded-full p-2 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-3">
            {(text.length > 0 || over) && (
              <span
                className={`text-[13px] ${over ? "text-like" : "text-secondary"}`}
                aria-live="polite"
              >
                {(LIMIT - text.length).toString()}
              </span>
            )}
            <svg viewBox="0 0 24 24" className="hidden -rotate-90 text-accent md:block" aria-hidden>
              <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.4" opacity="0.25" />
              <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeDasharray={RING_C}
                strokeDashoffset={RING_C * (1 - pct)}
                className={
                  over ? "text-like" : text.length > LIMIT * 0.9 ? "text-[#ffd400]" : "text-accent"
                }
              />
            </svg>
            <button
              type="submit"
              disabled={!canPost}
              className="rounded-full bg-accent px-4 font-bold text-white transition-colors enabled:hover:bg-accentstrong disabled:opacity-40"
              style={{ height: "36px" }}
            >
              {isReply ? "Reply" : "Post"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
