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
    <footer className="mt-8 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div>
            <h3 className="text-base font-semibold text-gray-900">TurfBook</h3>
            <p className="mt-1 text-xs text-gray-600">
              {role === "owner"
                ? "Owner workspace for turf, grounds, tournaments, and analytics."
                : "User workspace for turf discovery, booking, and tournaments."}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">
              {role === "owner"
                ? "Owner Menu"
                : role === "user"
                  ? "User Menu"
                  : "Login Required"}
            </h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-green-600">
                    {link.label}
                  </Link>
                </li>
              ))}
              {links.length === 0 && (
                <li>
                  <Link href="/login" className="hover:text-green-600">
                    Select Owner or User Login
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">Access</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>
                <Link href="/login" className="hover:text-green-600">
                  Switch Role Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-4 border-t border-gray-100 pt-3 text-xs text-gray-500">
          Copyright 2026 TurfBook.
        </p>
      </div>
    </footer>
  );
}
