import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

function Stroke({ children, ...p }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...p}
    >
      {children}
    </svg>
  );
}

export function XLogo(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-5.982zm-1.16 17.52h1.833L7.084 4.126H5.117l11.967 15.644z" />
    </svg>
  );
}

export function HomeIcon(props: P) {
  return (
    <Stroke {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h5v-6h4v6h5V9.5" />
    </Stroke>
  );
}

export function SearchIcon(props: P) {
  return (
    <Stroke {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Stroke>
  );
}

export function BellIcon(props: P) {
  return (
    <Stroke {...props}>
      <path d="M18 9a6 6 0 1 0-12 0c0 6-2.5 7.5-2.5 7.5h17S18 15 18 9" />
      <path d="M10.3 20a2 2 0 0 0 3.4 0" />
    </Stroke>
  );
}

export function BookmarkIcon(props: P) {
  return (
    <Stroke {...props}>
      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" />
    </Stroke>
  );
}

export function UserIcon(props: P) {
  return (
    <Stroke {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" />
    </Stroke>
  );
}

export function ReplyIcon(props: P) {
  return (
    <Stroke {...props}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22l5.9-2Z" />
    </Stroke>
  );
}

export function RetweetIcon(props: P) {
  return (
    <Stroke {...props}>
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </Stroke>
  );
}

export function HeartIcon(props: P) {
  return (
    <Stroke {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    </Stroke>
  );
}

export function ShareIcon(props: P) {
  return (
    <Stroke {...props}>
      <path d="M12 13V3" />
      <path d="m7 8 5-5 5 5" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
    </Stroke>
  );
}

export function MoreIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <circle cx="5" cy="12" r="1.7" />
      <circle cx="12" cy="12" r="1.7" />
      <circle cx="19" cy="12" r="1.7" />
    </svg>
  );
}

export function VerifiedIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81C14.67 2.63 13.43 1.75 12 1.75s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.63 9.33 1.75 10.57 1.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
    </svg>
  );
}

export function SparklesIcon(props: P) {
  return (
    <Stroke {...props}>
      <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3Z" />
    </Stroke>
  );
}

export function MediaIcon(props: P) {
  return (
    <Stroke {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="10.5" r="1.5" />
      <path d="m21 15-4.5-4.5L6 21" />
    </Stroke>
  );
}

export function GifIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <rect
        x="2.5"
        y="6"
        width="19"
        height="12"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <text
        x="12"
        y="14.8"
        textAnchor="middle"
        fontSize="7"
        fontWeight="bold"
        fill="currentColor"
        stroke="none"
      >
        GIF
      </text>
    </svg>
  );
}

export function PollIcon(props: P) {
  return (
    <Stroke {...props}>
      <path d="M6 19v-6" />
      <path d="M12 19V7" />
      <path d="M18 19v-9" />
      <path d="M3 19h18" />
    </Stroke>
  );
}

export function CalendarIcon(props: P) {
  return (
    <Stroke {...props}>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M8 3v3" />
      <path d="M16 3v3" />
      <path d="M3.5 10h17" />
    </Stroke>
  );
}

export function EmojiIcon(props: P) {
  return (
    <Stroke {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14s1.3 1.6 3.5 1.6 3.5-1.6 3.5-1.6" />
      <path d="M9 9.5h.01" />
      <path d="M15 9.5h.01" />
    </Stroke>
  );
}

export function ArrowLeftIcon(props: P) {
  return (
    <Stroke {...props}>
      <path d="m14 6-6 6 6 6" />
    </Stroke>
  );
}

export function PinIcon(props: P) {
  return (
    <Stroke {...props}>
      <path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Stroke>
  );
}
