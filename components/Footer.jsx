import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">TurfBook</h3>
            <p className="mt-2 text-sm text-gray-600">
              Static demo website for turf discovery, booking, tournaments, and owner analytics.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-green-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tournaments" className="hover:text-green-600">
                  Tournaments
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="hover:text-green-600">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">Owner</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/owner-dashboard" className="hover:text-green-600">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/notifications" className="hover:text-green-600">
                  Notifications
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">Profile</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/profile" className="hover:text-green-600">
                  User Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-gray-100 pt-6 text-sm text-gray-500">
          Copyright 2026 TurfBook. Static frontend preview.
        </p>
      </div>
    </footer>
  );
}
