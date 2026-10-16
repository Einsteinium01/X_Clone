"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "./icons";

export function Header({
  title,
  subtitle,
  back,
  children,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-20 bg-app/65 backdrop-blur-md">
      <div
        className={`flex h-[53px] items-center gap-6 px-4 ${
          children ? "" : "border-b border-border"
        }`}
      >
        {back ? (
          <button
            onClick={() => router.back()}
            className="-ml-2 rounded-full p-2 transition-colors hover:bg-surface"
            aria-label="Back"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
        ) : null}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-bold leading-6">{title}</h1>
          {subtitle ? <p className="truncate text-[13px] text-secondary">{subtitle}</p> : null}
        </div>
      </div>
      {children}
    </div>
  );
}

export function TabsBar({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex border-b border-border">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className="hover:bg-surface h-[50px] flex-1 transition-colors"
        >
          <span
            className={`relative flex h-full items-center justify-center text-[15px] ${
              active === t.id ? "font-bold text-primary" : "font-medium text-secondary"
            }`}
          >
            {t.label}
            {active === t.id ? (
              <span className="absolute bottom-0 h-[4px] w-[56px] rounded-full bg-accent" />
            ) : null}
          </span>
        </button>
      ))}
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="mx-auto max-w-[380px] p-8 pt-14 text-center">
      <h2 className="text-3xl font-extrabold">{title}</h2>
      <p className="mt-2 text-[15px] text-secondary">{body}</p>
    </div>
  );
}
