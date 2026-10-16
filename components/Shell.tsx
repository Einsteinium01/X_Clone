"use client";

import { Suspense } from "react";
import { StoreProvider } from "@/lib/store";
import { Sidebar } from "./Sidebar";
import { RightSidebar } from "./RightSidebar";
import { MobileNav } from "./MobileNav";

function ShellFallback() {
  return (
    <div className="mx-auto flex w-full max-w-[1265px] justify-center">
      <aside className="hidden w-[72px] shrink-0 md:block md:sticky md:top-0 md:h-dvh lg:w-[275px]" />
      <main className="w-full min-w-0 flex-grow border-border md:max-w-[600px] md:flex-grow-0 md:border-x">
        <div className="h-[53px] border-b border-border" />
        <div className="animate-pulse space-y-4 p-4" aria-busy>
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-surface" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-40 rounded bg-surface" />
                <div className="h-3 w-full rounded bg-surface" />
                <div className="h-3 w-2/3 rounded bg-surface" />
              </div>
            </div>
          ))}
        </div>
      </main>
      <aside className="hidden w-[350px] shrink-0 pl-8 lg:block lg:sticky lg:top-0 lg:h-dvh" />
    </div>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <Suspense fallback={<ShellFallback />}>
        <div className="mx-auto flex w-full max-w-[1265px] justify-center">
          <Sidebar />
          <main className="w-full min-w-0 flex-grow border-border md:max-w-[600px] md:flex-grow-0 md:border-x">
            {children}
          </main>
          <RightSidebar />
        </div>
        <MobileNav />
      </Suspense>
    </StoreProvider>
  );
}
