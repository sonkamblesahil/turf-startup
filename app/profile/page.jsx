import {
  Award,
  CreditCard,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { mockUsers } from "@/lib/mockData";

export default function ProfilePage() {
  const user = mockUsers.find((item) => item.id === "user1");
  const owner = mockUsers.find((item) => item.role === "owner");

  return (
    <div className="min-h-screen bg-gray-50 py-8 text-gray-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-zinc-100">
          User Profile
        </h1>
        <p className="mb-8 text-sm text-gray-600 dark:text-zinc-400">
          View your registration details and owner payout account details.
        </p>

        <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/95 dark:shadow-xl dark:shadow-black/35">
          <div className="bg-linear-to-r from-red-600 to-red-700 p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-white p-4">
                <User className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-red-100">Registered User Account</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2 md:p-8">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-zinc-500">
                Full Name
              </p>
              <div className="flex items-center gap-3 text-sm">
                <User className="h-5 w-5 text-gray-400 dark:text-zinc-500" />
                {user?.name}
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-zinc-500">
                Email Address
              </p>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-5 w-5 text-gray-400 dark:text-zinc-500" />
                {user?.email}
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-zinc-500">
                Contact Number
              </p>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-5 w-5 text-gray-400 dark:text-zinc-500" />
                {user?.phone}
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-zinc-500">
                Basic Details
              </p>
              <div className="flex items-center gap-3 text-sm">
                <Award className="h-5 w-5 text-gray-400 dark:text-zinc-500" />
                Age: {user?.age} | Gender: {user?.gender}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/95 dark:shadow-xl dark:shadow-black/35 md:p-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-zinc-100">
            <CreditCard className="h-5 w-5 text-red-500" /> Owner Bank Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-zinc-500">
                Account Holder
              </p>
              <p className="mt-2 text-sm text-gray-800 dark:text-zinc-200">
                {owner?.bankDetails?.accountHolderName}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-zinc-500">
                Account Number
              </p>
              <p className="mt-2 text-sm text-gray-800 dark:text-zinc-200">
                {owner?.bankDetails?.accountNumber}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-zinc-500">
                IFSC Code
              </p>
              <p className="mt-2 text-sm text-gray-800 dark:text-zinc-200">
                {owner?.bankDetails?.ifscCode}
              </p>
            </div>
          </div>
          <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-700 dark:text-red-300">
            <ShieldCheck className="h-4 w-4" />
            Payment info is shown for booking and tournament settlement context.
          </p>
        </div>
      </div>
    </div>
  );
}
