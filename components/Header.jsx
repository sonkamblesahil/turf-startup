import Link from "next/link";
import {
  Bell,
  Calendar,
  Home,
  LayoutDashboard,
  Trophy,
  User,
} from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-gray-900">
          TurfBook
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-700 hover:text-green-600"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link
            href="/venues"
            className="flex items-center gap-2 text-gray-700 hover:text-green-600"
          >
            Venues
          </Link>
          <Link
            href="/tournaments"
            className="flex items-center gap-2 text-gray-700 hover:text-green-600"
          >
            <Trophy className="h-4 w-4" />
            Tournaments
          </Link>
          <Link
            href="/my-bookings"
            className="flex items-center gap-2 text-gray-700 hover:text-green-600"
          >
            <Calendar className="h-4 w-4" />
            My Bookings
          </Link>
          <Link
            href="/owner-dashboard"
            className="flex items-center gap-2 text-gray-700 hover:text-green-600"
          >
            <LayoutDashboard className="h-4 w-4" />
            Owner Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/notifications"
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
          >
            <Bell className="h-5 w-5" />
          </Link>
          <Link
            href="/profile"
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
