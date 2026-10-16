<div align="center">

# 𝕏 CLONE

**A pixel-crafted recreation of the X (formerly Twitter) interface — a learning side project, built from scratch.**

*No real accounts. No network layer. Everything lives in your browser.*

![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React%2019-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-F91880?style=flat-square)
![Status](https://img.shields.io/badge/status-learning%20project-00BA7C?style=flat-square)

</div>

---

> ⚠️ **Disclaimer** — This project imitates X's interface for **educational purposes only**. It is not affiliated with, endorsed by, or intended for production use with any real platform. X and Twitter are trademarks of their respective owners.

## ✨ Features

**Layout & UI**

- 🏗️ **Three-column X-style shell** — left navigation sidebar (icon-only on tablets), a 600px center feed, and a right sidebar with Premium card, trends, and "Who to follow"
- 📱 **Responsive** — mobile bottom navigation bar and stacked layout under `md`
- 🎨 **Zero-asset icons** — every icon is inline SVG, including the authentic X logo and verified-badge paths
- 💎 **Deterministic avatars** — CSS gradients generated from a handle hash; no external images, no network requests

**Interactions**

- 💬 **Compose box** — auto-growing textarea, 280-character progress ring (amber → red states), media/emoji/poll toolbar, `Ctrl+Enter` to post
- 🔁 **Repost · Like · Bookmark · Reply** — with X-accurate colors (`#1d9bf0`, `#00ba7c`, `#f91880`) and live counters
- ↩️ **Inline reply composer** under each post

**Pages**

- 🏠 **Home** — "For you" / "Following" tabs with skeleton loading states
- 👤 **Profile** (`/profile/[handle]`) — gradient banner, overlapping avatar, bio, join date, follow/unfollow, and Posts / Replies / Likes tabs
- 🔍 **Explore** — full-text search over all posts + trends grid
- 🔔 **Notifications** — derived entirely from your in-app activity
- 🔖 **Bookmarks** — posts you saved, persisted in `localStorage`

## 🛠️ Tech Stack

<div align="center">

<a href="https://nextjs.org/docs"><img src="https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16"/></a>
<a href="https://react.dev"><img src="https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19"/></a>
<a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript%20Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/></a>
<a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4"/></a>
<a href="https://eslint.org"><img src="https://img.shields.io/badge/ESLint%209-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint"/></a>

</div>

| # | Concern            | Choice                                                            | Why                                                                  |
| :-: | :--------------- | :-------------------------------------------------------------- | :------------------------------------------------------------------- |
| 1 | Framework         | **Next.js 16** (App Router, Cache Components)                     | Streaming shells, modern prerender rules, file-system routing        |
| 2 | Language          | **TypeScript** (strict)                                           | End-to-end types for the store, models, and components               |
| 3 | UI                | **React 19 + Tailwind CSS v4**                                    | `@theme` tokens map the X palette straight into class names          |
| 4 | Font              | **Inter** (`next/font/google`)                                    | Close stand-in for X's proprietary typeface                          |
| 5 | State             | **`useSyncExternalStore`** external store                         | Sub-millisecond, no state library — snapshots sync to the browser    |
| 6 | Persistence       | **`localStorage`** (mock backend)                                 | Free "backend", survives refreshes, zero infra                       |

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** — your timeline is already alive with seed data.

<details>
<summary><strong>Other scripts</strong></summary>

| Command         | Action                                            |
| --------------- | ------------------------------------------------- |
| `npm run build` | Production build (type-checks + full prerender)    |
| `npm start`     | Serve the production build                         |
| `npm run lint`  | ESLint (react-hooks compiled rules)                |

</details>

## 🧠 How the Mock Backend Works

Instead of a REST API, the app uses a tiny **external store** in `lib/store.tsx`:

1. **Build-time safe** — `getServerSnapshot` returns a stable empty store on the server, so streaming prerenders never hit impure reads
2. **One-time hydrate** — `ensure()` reads `localStorage` once; if nothing is saved, it seeds from `lib/seed.ts` (7 fictional accounts, ~15 posts)
3. **Immutable updates** — every mutation (`addTweet`, `toggleLike`, `toggleRetweet`, `toggleBookmark`, `toggleFollow`) produces a new snapshot, notifies React, and writes back to `localStorage` under the key `x-clone-db-v1`
4. **Reset anytime** — clear the `x-clone-db-v1` key (DevTools → Application → Local Storage) and refresh

## 📁 Project Structure

<details>
<summary><strong>Expand the file tree</strong></summary>

```
x_clone/
├─ app/
│  ├─ page.tsx                  # Home feed + For you / Following
│  ├─ layout.tsx                # Fonts, metadata, app shell
│  ├─ globals.css               # Tailwind v4 theme tokens (X palette)
│  ├─ explore/page.tsx          # Search + trends grid
│  ├─ notifications/page.tsx    # Derived activity
│  ├─ bookmarks/page.tsx        # Saved posts
│  └─ profile/[handle]/page.tsx # User pages
├─ components/
│  ├─ Shell.tsx                 # 3-column layout + Suspense fallback
│  ├─ Sidebar.tsx / MobileNav.tsx
│  ├─ RightSidebar.tsx          # Search, premium, trends, suggestions
│  ├─ Composer.tsx              # Post/reply composer with char ring
│  ├─ Tweet.tsx / TweetList.tsx
│  ├─ Header.tsx                # Sticky headers, tabs, empty states
│  ├─ Avatar.tsx / FollowButton.tsx
│  └─ icons.tsx                 # Hand-drawn SVG icon set
└─ lib/
   ├─ store.tsx                 # localStorage-backed external store
   ├─ seed.ts                   # Seed users, posts, trends
   ├─ types.ts                  # User / Tweet / DB models
   └─ time.ts                   # Relative timestamps, compact numbers
```

</details>

## 🎨 Design Notes

- X's palette is codified as Tailwind v4 `@theme` tokens in `app/globals.css`, so utilities read 1:1 with the real product — `bg-accent`, `text-like`, `hover:bg-rtdim`…
- All pages are client components rendered beneath a streamed shell, matching the "everything is user state" model
- Relative timestamps and compact counters (`12.3K`) live in `lib/time.ts`

## ⚠️ Limitations (by design)

- 🔑 No real authentication — you are always signed in as the seeded demo account (`@you`)
- 🌐 No network layer — data never leaves your browser
- 🖼️ No media uploads, videos, polls, DMs, timelines-as-cards, or thread detail pages
- 🔔 Notifications are a derived mock, not a separate data source
- 🧪 Share / media toolbar buttons are decorative

## 🎯 Learning Goals

This project was built to practice:

- **App Router end-to-end** — streamed Suspense shells and Next 15/16 prerender rules (e.g. keeping `Date.now()` out of static prerenders)
- **External store pattern** — with `useSyncExternalStore` instead of Redux/Zustand
- **UI replication** — rebuilding a familiar, complex interface pixel by pixel with Tailwind
- **Accessibility basics** — semantic `article`/`button` markup, `aria` labels, keyboard posting

## 📄 License

Released under the [MIT License](LICENSE). The X name and logo belong to X Corp. — this is a **non-commercial learning exercise** and is not distributed as an official product of any kind.

---

<div align="center">

**Built for fun, with a strict linter and a lot of heart.**

</div>
