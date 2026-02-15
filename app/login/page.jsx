"use client";

import { useRouter } from "next/navigation";
import { ShieldUser, UserRound } from "lucide-react";
import { mockUsers } from "@/lib/mockData";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (role) => {
    const selectedUser =
      role === "owner"
        ? mockUsers.find((user) => user.role === "owner")
        : mockUsers.find((user) => user.role === "user");

    if (!selectedUser) return;
    localStorage.setItem("currentUser", JSON.stringify(selectedUser));

    if (role === "owner") {
      router.push("/owner-dashboard");
      return;
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow">
          <h1 className="text-3xl font-bold text-gray-900">
            Select Login Role
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Choose how you want to continue. Navigation and dashboard options
            are role-specific.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() => handleLogin("owner")}
              className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-left hover:bg-emerald-100"
            >
              <ShieldUser className="h-7 w-7 text-emerald-700" />
              <p className="mt-3 text-lg font-semibold text-gray-900">
                Owner Login
              </p>
              <p className="mt-1 text-sm text-gray-700">
                Manage turfs, grounds, booking analytics, and tournaments.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleLogin("user")}
              className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-left hover:bg-blue-100"
            >
              <UserRound className="h-7 w-7 text-blue-700" />
              <p className="mt-3 text-lg font-semibold text-gray-900">
                User Login
              </p>
              <p className="mt-1 text-sm text-gray-700">
                Discover venues, create bookings, and join tournaments.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
