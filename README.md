# X Clone

A minimal, single-page recreation of the X (formerly Twitter) interface built with **Next.js**, **TypeScript**, and **Tailwind CSS v4**. All data lives in the browser — there is no real authentication, network layer, or database, which makes it a safe sandbox for experimenting with UI patterns and client-side state management.

> This is a **side project built for learning**. It faithfully imitates X's dark-mode layout and interactions for educational purposes only, and is not affiliated with, endorsed by, or intended for production use with any real platform. X and Twitter are trademarks of their respective owners.

## Features

- **Three-column X-style layout** — left navigation sidebar (icon-only on tablets), 600px center feed, right sidebar with Premium card, trends, and "Who to follow"
- **Responsive shell** — mobile bottom navigation bar and stacked layout under `md`
- **Compose box** — auto-growing textarea, 280-character progress ring (amber/red states), emoji/media/poll toolbar placeholders, `Ctrl+Enter` to post
- **Post interactions** — reply (inline composer), repost, like, and bookmark with X-accurate colors (`#1d9bf0`, `#00ba7c`, `#f91880`) and live counters
- **Home feed** — "For you" / "Following" tabs, skeleton loading states
- **Profile pages** (`/profile/[handle]`) — gradient banner, overlapping avatar, bio, join date, follower counts, follow/unfollow toggle, and Posts / Replies / Likes tabs
- **Explore** — full-text search across all posts plus a trends grid
- **Notifications & Bookmarks** — derived entirely from your own in-app activity (likes trigger like notifications, toggles persist to the Bookmarks page, etc.)
- **Seed data** — 7 fictional accounts and ~15 posts with varied timestamps, so the timeline looks alive on first load
- **Zero-asset icons** — all icons are inline SVG, including the authentic X logo and verified-badge paths

## Tech Stack

| Layer     | Choice                                    |
| --------- | ----------------------------------------- |
| Framework | Next.js 16 (App Router, Cache Components) |
| Language  | TypeScript (strict)                       |
| UI        | React 19 + Tailwind CSS v4                |
| Font      | Inter via `next/font/google`              |
| Storage   | Browser `localStorage` (mock backend)     |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Other scripts:

```bash
npm run build   # production build (type-checks + lints)
npm start       # serve the production build
npm run lint    # eslint
```

## How the Mock Backend Works

Instead of a REST API, the app uses a tiny **external store** in `lib/store.tsx`:

1. `useSyncExternalStore(subscribe, ensure, getServerSnapshot)` provides the store to React, with a stable empty snapshot for server rendering (no hydration mismatches).
2. `ensure()` reads `localStorage` once; if nothing is saved yet, it hydrates the seed dataset from `lib/seed.ts`.
3. Every mutation (`addTweet`, `toggleLike`, `toggleRetweet`, `toggleBookmark`, `toggleFollow`) immutably updates the store and immediately writes the whole snapshot back to `localStorage` under the key `x-clone-db-v1`.

To reset the demo data, clear that key from DevTools → Application → Local Storage and refresh.

## Project Structure

```
x_clone/
├─ app/
│  ├─ page.tsx               # Home feed + tabs + composer
│  ├─ explore/page.tsx       # Search + trends
│  ├─ notifications/page.tsx # Activity derived from your interactions
│  ├─ bookmarks/page.tsx     # Saved posts
│  ├─ profile/[handle]/page.tsx
│  ├─ layout.tsx             # Fonts, metadata, app shell
│  └─ globals.css            # Tailwind v4 theme tokens (X palette)
├─ components/
│  ├─ Shell.tsx              # 3-column layout + Suspense fallback
│  ├─ Sidebar.tsx / MobileNav.tsx
│  ├─ RightSidebar.tsx       # Search, premium, trends, suggestions
│  ├─ Composer.tsx           # Post/reply composer with char ring
│  ├─ Tweet.tsx / TweetList.tsx
│  ├─ Header.tsx             # Sticky page headers, tabs, empty states
│  ├─ Avatar.tsx / FollowButton.tsx
│  └─ icons.tsx              # Hand-drawn SVG icon set
├─ lib/
│  ├─ store.tsx              # localStorage-backed external store
│  ├─ seed.ts                # Seed users, posts, trends
│  ├─ types.ts               # User / Tweet / DB models
│  └─ time.ts                # Relative timestamps, compact numbers
└─ next.config.ts
```

## Design Notes

- The X color palette is defined as Tailwind v4 `@theme` tokens in `app/globals.css`, so classes like `bg-accent`, `text-like`, and `hover:bg-rtdim` map 1:1 to real X values.
- Avatars are deterministic CSS gradients generated from a handle hash — no external images, no network requests.
- All pages render as client components after a streamed shell, simplifying the "everything is user-state" model.

## Limitations (by design)

- No real authentication — you're always signed in as the seeded demo account (`@you`)
- No network layer; data never leaves your browser
- No media uploads, videos, polls, DMs, or tweet detail/thread pages
- Notifications are a derived mock, not a separate data source
- Icon-only buttons such as share are decorative

## Learning Goals

This project was built to practice:

- App Router data flow, streaming with Suspense, and Next 15/16 prerender rules (e.g. avoiding `Date.now()` during static prerender)
- External store pattern with `useSyncExternalStore` instead of a state library
- Replicating a complex, familiar UI pixel by pixel with Tailwind
- Accessibility basics: semantic article/button markup, `aria` labels, keyboard posting

## License

Released for educational purposes under the [MIT License](https://opensource.org/licenses/MIT). The X name and logo belong to X Corp. — this project is a non-commercial learning exercise and should not be distributed as if it were an official product.
