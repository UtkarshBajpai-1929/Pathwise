"use client";

import Link from "next/link";
import { LogOut, MoreVertical, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { LinkButton } from "@/components/ui/Button";
import { setUser } from "@/store/features";

export function Navbar() {
  const dispatch = useDispatch();
  const compareCount = useSelector((state: RootState) => state.app.compareIds.length);
  const user = useSelector((state: RootState) => state.app.user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch("/api/auth/me")
      .then((response) => response.json())
      .then((data) => {
        if (mounted) dispatch(setUser(data.user));
      })
      .catch(() => undefined);
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    dispatch(setUser(null));
    setUserOpen(false);
    setMobileOpen(false);
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/colleges", label: "Colleges" },
    { href: "/compare", label: `Compare ${compareCount ? `(${compareCount})` : ""}` },
    { href: "/discussion", label: "Discussion" },
    { href: "/saved", label: "Saved" },
  ];

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
          {links.map((link) => (
            <Link key={link.href} className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800" href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <div className="relative">
              <button
                aria-label="Open user menu"
                title="User menu"
                onClick={() => setUserOpen((value) => !value)}
                className="grid h-10 w-10 place-items-center rounded-full border border-emerald-200 bg-white text-emerald-700 transition hover:bg-emerald-50"
              >
                <UserRound size={18} />
              </button>
              {userOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-[8px] border border-emerald-100 bg-white p-3 soft-shadow">
                  <p className="truncate text-sm font-bold text-slate-950">{user.name}</p>
                  <p className="truncate text-xs text-slate-500">{user.email}</p>
                  <button onClick={logout} className="mt-3 flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <LinkButton href="/auth/login" variant="ghost" className="hidden sm:inline-flex">
                Login
              </LinkButton>
              <LinkButton href="/auth/signup" className="hidden sm:inline-flex">Sign up</LinkButton>
            </>
          )}
          <button
            aria-label="Open navigation menu"
            title="Navigation menu"
            onClick={() => setMobileOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-emerald-200 bg-white text-slate-700 transition hover:bg-emerald-50 md:hidden"
          >
            {mobileOpen ? <X size={18} /> : <MoreVertical size={19} />}
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="border-t border-emerald-100 bg-white px-4 py-4 md:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {links.map((link) => (
              <Link key={link.href} onClick={() => setMobileOpen(false)} className="rounded-[8px] px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800" href={link.href}>
                {link.label}
              </Link>
            ))}
            {!user && (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <LinkButton href="/auth/login" variant="secondary" onClick={() => setMobileOpen(false)}>Login</LinkButton>
                <LinkButton href="/auth/signup" onClick={() => setMobileOpen(false)}>Sign up</LinkButton>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
