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
    <footer className="mt-auto w-full border-t border-gray-200/80 bg-white/90 shadow-sm backdrop-blur-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900/90 dark:shadow-black/30">
      <div className="grid grid-cols-1 gap-8 px-6 py-8 md:grid-cols-3 md:px-10 md:py-10">
        <div>
          <p className="text-lg font-bold tracking-tight text-gray-900 dark:text-zinc-100">
            TurfBook
          </p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-red-500 dark:text-red-400">
            Play • Book • Win
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-zinc-400">
            {role === "owner"
              ? "Owner workspace for turf, grounds, tournaments, and analytics."
              : "User workspace for turf discovery, booking, and tournaments."}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-800 dark:text-zinc-200">
            {role === "owner"
              ? "Owner Menu"
              : role === "user"
                ? "User Menu"
                : "Login Required"}
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2.5 text-sm text-gray-600 dark:text-zinc-400">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex rounded-full border border-gray-200 px-3 py-1.5 transition hover:border-red-300 hover:text-red-500 dark:border-zinc-700 dark:hover:border-red-400/50 dark:hover:text-red-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {links.length === 0 && (
              <li>
                <Link
                  href="/login"
                  className="inline-flex rounded-full border border-gray-200 px-3 py-1.5 transition hover:border-red-300 hover:text-red-500 dark:border-zinc-700 dark:hover:border-red-400/50 dark:hover:text-red-300"
                >
                  Select Owner or User Login
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-800 dark:text-zinc-200">
            Access
          </h4>
          <ul className="mt-3 text-sm text-gray-600 dark:text-zinc-400">
            <li>
              <Link
                href="/login"
                className="inline-flex rounded-full border border-gray-200 px-3 py-1.5 transition hover:border-red-300 hover:text-red-500 dark:border-zinc-700 dark:hover:border-red-400/50 dark:hover:text-red-300"
              >
                Switch Role Login
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 px-6 py-4 dark:border-zinc-800 md:px-10">
        <p className="text-xs text-gray-500 dark:text-zinc-500">
          Copyright 2026 TurfBook.
        </p>
      </div>
    </footer>
  );
}
