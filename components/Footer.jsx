"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Footer() {
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

  const ownerLinks = [
    { href: "/owner-dashboard", label: "Dashboard" },
    { href: "/owner-dashboard/stats", label: "Stats" },
    { href: "/profile", label: "Owner Profile" },
  ];

  const userLinks = [
    { href: "/", label: "Home" },
    { href: "/venues", label: "Venues" },
    { href: "/tournaments", label: "Tournaments" },
    { href: "/my-bookings", label: "My Bookings" },
    { href: "/profile", label: "Profile" },
  ];

  const links =
    role === "owner" ? ownerLinks : role === "user" ? userLinks : [];

  return (
    <footer className="mt-4 border-t border-gray-200 bg-white text-gray-700 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">
              TurfBook
            </h3>
            <p className="mt-1 text-xs text-gray-600 dark:text-zinc-400">
              {role === "owner"
                ? "Owner workspace for turf, grounds, tournaments, and analytics."
                : "User workspace for turf discovery, booking, and tournaments."}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-zinc-200">
              {role === "owner"
                ? "Owner Menu"
                : role === "user"
                  ? "User Menu"
                  : "Login Required"}
            </h4>
            <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600 dark:text-zinc-400">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-red-500 dark:hover:text-red-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {links.length === 0 && (
                <li>
                  <Link
                    href="/login"
                    className="transition hover:text-red-500 dark:hover:text-red-300"
                  >
                    Select Owner or User Login
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-zinc-200">
              Access
            </h4>
            <ul className="mt-1.5 text-xs text-gray-600 dark:text-zinc-400">
              <li>
                <Link
                  href="/login"
                  className="transition hover:text-red-500 dark:hover:text-red-300"
                >
                  Switch Role Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-3 border-t border-gray-200 pt-2 text-center text-[11px] text-gray-500 dark:border-zinc-800 dark:text-zinc-500">
          Copyright 2026 TurfBook.
        </p>
      </div>
    </footer>
  );
}
