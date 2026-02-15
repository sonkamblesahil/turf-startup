"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Bell,
  Calendar,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  Moon,
  Sun,
  Trophy,
  User,
} from "lucide-react";

export default function Header() {
  const [role, setRole] = useState(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const currentUserRaw = localStorage.getItem("currentUser");
    if (!currentUserRaw) {
      setRole(null);
      return;
    }

    try {
      const currentUser = JSON.parse(currentUserRaw);
      setRole(currentUser?.role || null);
    } catch {
      setRole(null);
    }
  }, [pathname]);

  const navItems = useMemo(() => {
    if (role === "owner") {
      return [
        {
          href: "/owner-dashboard",
          label: "Owner Dashboard",
          icon: LayoutDashboard,
        },
        { href: "/owner-dashboard/stats", label: "Owner Stats", icon: Trophy },
      ];
    }

    if (role === "user") {
      return [
        { href: "/", label: "Home", icon: Home },
        { href: "/venues", label: "Venues" },
        { href: "/tournaments", label: "Tournaments", icon: Trophy },
        { href: "/my-bookings", label: "My Bookings", icon: Calendar },
      ];
    }

    return [{ href: "/login", label: "Login", icon: LogIn }];
  }, [role]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setRole(null);
    window.location.href = "/login";
  };

  const isDark = theme !== "light";

  return (
    <header className="sticky top-0 left-0 right-0 z-50 border-b border-gray-200/80 bg-white/95 transition-colors dark:border-transparent dark:bg-transparent">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={role === "owner" ? "/owner-dashboard" : "/"}
          className="group inline-flex items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-black/10 dark:hover:bg-white/10"
        >
          <img
            src="/turfbook-logo.svg"
            alt="TurfBook logo"
            className="h-9 w-9 rounded-lg shadow-sm"
          />
          <div className="leading-tight">
            <p className="text-lg font-bold tracking-tight text-gray-900 dark:text-zinc-100">
              TurfBook
            </p>
            <p className="text-[11px] font-medium text-red-400">
              Play • Book • Win
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-2xl border border-black/20 bg-transparent px-2 py-1.5 shadow-none transition-colors dark:border-white/20 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-black/10 text-red-600 dark:bg-white/10 dark:text-red-400"
                    : "text-gray-900 hover:bg-black/10 hover:text-red-600 dark:text-white/90 dark:hover:bg-white/10 dark:hover:text-red-400"
                }`}
              >
                {Icon ? <Icon className="h-4 w-4" /> : null}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="rounded-xl border border-black/20 bg-transparent p-2 text-gray-900 transition hover:bg-black/10 dark:border-white/20 dark:text-white/90 dark:hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {mounted && isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          {role ? (
            <>
              {role === "user" && (
                <Link
                  href="/notifications"
                  className="rounded-xl p-2 text-gray-900 transition hover:bg-black/10 dark:text-white/90 dark:hover:bg-white/10"
                >
                  <Bell className="h-5 w-5" />
                </Link>
              )}
              <Link
                href="/profile"
                className="rounded-xl p-2 text-gray-900 transition hover:bg-black/10 dark:text-white/90 dark:hover:bg-white/10"
              >
                <User className="h-5 w-5" />
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-black/20 bg-transparent px-3 py-1.5 text-sm font-semibold text-gray-900 transition hover:bg-black/10 dark:border-white/20 dark:text-white/90 dark:hover:bg-white/10"
              >
                <span className="inline-flex items-center gap-1">
                  <LogOut className="h-4 w-4" /> Logout
                </span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-xl border border-red-400/50 bg-transparent px-3 py-1.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/15"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
