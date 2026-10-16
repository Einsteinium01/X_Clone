import type { User } from "@/lib/types";

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

export function hueOf(handle: string): number {
  let n = 0;
  for (const c of handle) n = (n * 31 + c.charCodeAt(0)) % 360;
  return n;
}

export function Avatar({
  user,
  size = 40,
  className = "",
}: {
  user: User;
  size?: number;
  className?: string;
}) {
  const h = hueOf(user.handle);
  return (
    <div
      className={`flex shrink-0 select-none items-center justify-center rounded-full font-bold text-white ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, hsl(${h} 46% 52%), hsl(${(h + 65) % 360} 55% 38%))`,
        fontSize: size * 0.36,
      }}
      aria-hidden
    >
      {initials(user.name)}
    </div>
  );
}
