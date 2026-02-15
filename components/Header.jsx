"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Calendar,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  MapPin,
  Menu,
  Moon,
  Sun,
  Trophy,
  Users,
  User,
  X,
} from "lucide-react";

export default function Header() {
  const [role, setRole] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    setMobileMenuOpen(false);
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
        { href: "/venues", label: "Venues", icon: MapPin },
        { href: "/tournaments", label: "Tournaments", icon: Trophy },
        { href: "/team-matching", label: "Team Matching", icon: Users },
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
      <div className="flex h-18 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
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
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-xl border border-black/20 bg-transparent p-2 text-gray-900 transition hover:bg-black/10 dark:border-white/20 dark:text-white/90 dark:hover:bg-white/10 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
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
          <Link
            href={role ? "/profile" : "/login"}
            className="rounded-xl p-2 text-gray-900 transition hover:bg-black/10 dark:text-white/90 dark:hover:bg-white/10 md:hidden"
          >
            <User className="h-5 w-5" />
          </Link>
          {role ? (
            <>
              <Link
                href="/profile"
                className="hidden rounded-xl p-2 text-gray-900 transition hover:bg-black/10 dark:text-white/90 dark:hover:bg-white/10 md:inline-flex"
              >
                <User className="h-5 w-5" />
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="hidden rounded-xl border border-black/20 bg-transparent px-3 py-1.5 text-sm font-semibold text-gray-900 transition hover:bg-black/10 dark:border-white/20 dark:text-white/90 dark:hover:bg-white/10 md:inline-flex"
              >
                <span className="inline-flex items-center gap-1">
                  <LogOut className="h-4 w-4" /> Logout
                </span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-xl border border-red-400/50 bg-transparent px-3 py-1.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/15 md:inline-flex"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/45"
            aria-label="Close mobile menu overlay"
          />

          <aside className="fixed top-18 right-0 z-50 h-[calc(100vh-4.5rem)] w-72 max-w-[85vw] overflow-y-auto border-l border-gray-200/80 bg-white/95 p-4 shadow-2xl backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/95">
            <nav className="space-y-2">
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

              {role ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-xl border border-black/20 px-3 py-2 text-sm font-semibold text-gray-900 transition hover:bg-black/10 dark:border-white/20 dark:text-white/90 dark:hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 rounded-xl border border-red-400/50 px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/15"
                >
                  <LogIn className="h-4 w-4" /> Login
                </Link>
              )}
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}
