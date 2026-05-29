"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { LinkButton } from "@/components/ui/Button";

export function Navbar() {
  const compareCount = useSelector((state: RootState) => state.app.compareIds.length);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100/80 glass">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-[8px] bg-emerald-600 text-lg font-black text-white shadow-lg shadow-emerald-200">
            P
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-950">Pathwise</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          <Link className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800" href="/">
            Home
          </Link>
          <Link className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800" href="/colleges">
            Colleges
          </Link>
          <Link className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800" href="/compare">
            Compare {compareCount ? `(${compareCount})` : ""}
          </Link>
           <Link className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800" href="/discussion">
            Discussion
          </Link>
          <Link className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800" href="/saved">
            Saved
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <LinkButton href="/auth/login" variant="ghost" className="hidden sm:inline-flex">
            Login
          </LinkButton>
          <LinkButton href="/auth/signup">Sign up</LinkButton>
        </div>
      </nav>
    </header>
  );
}
