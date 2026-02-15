"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Calendar,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  Trophy,
  User,
} from "lucide-react";

export default function Header() {
  const [role, setRole] = useState(null);
  const pathname = usePathname();

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

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100/80 bg-white/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={role === "owner" ? "/owner-dashboard" : "/"}
          className="group inline-flex items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-emerald-50"
        >
          <img
            src="/turfbook-logo.svg"
            alt="TurfBook logo"
            className="h-9 w-9 rounded-lg shadow-sm"
          />
          <div className="leading-tight">
            <p className="text-lg font-bold tracking-tight text-gray-900">
              TurfBook
            </p>
            <p className="text-[11px] font-medium text-emerald-700">
              Play • Book • Win
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-2xl border border-gray-200 bg-white px-2 py-1.5 shadow-sm transition-colors md:flex">
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
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-emerald-700"
                }`}
              >
                {Icon ? <Icon className="h-4 w-4" /> : null}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {role ? (
            <>
              {role === "user" && (
                <Link
                  href="/notifications"
                  className="rounded-xl p-2 text-gray-700 transition hover:bg-gray-100"
                >
                  <Bell className="h-5 w-5" />
                </Link>
              )}
              <Link
                href="/profile"
                className="rounded-xl p-2 text-gray-700 transition hover:bg-gray-100"
              >
                <User className="h-5 w-5" />
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <span className="inline-flex items-center gap-1">
                  <LogOut className="h-4 w-4" /> Logout
                </span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-xl border border-green-600 bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700 transition hover:bg-green-100"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
