"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Calendar, DollarSign, MapPin, Trophy, Users } from "lucide-react";
import { mockTournaments, mockTurfs } from "@/lib/mockData";

const paymentOptions = [
  { key: "upi", label: "UPI" },
  { key: "card", label: "Card" },
  { key: "netbanking", label: "Net Banking" },
];

export default function TournamentJoinPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [paymentMessage, setPaymentMessage] = useState("");

  const tournament = useMemo(
    () => mockTournaments.find((item) => item.id === params?.id),
    [params?.id],
  );

  const turf = useMemo(
    () => mockTurfs.find((item) => item.id === tournament?.turfId),
    [tournament?.turfId],
  );

  const teamName = searchParams.get("team") || "Your Team";

  if (!tournament || !turf) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 text-gray-900 dark:bg-zinc-950 dark:text-zinc-100">
        <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-2xl font-bold">Tournament not found</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400">
            This tournament link is invalid or no longer available.
          </p>
        </div>
      </div>
    );
  }

  const handlePayAndContinue = () => {
    setPaymentMessage(
      `Entry payment selected via ${paymentMethod.toUpperCase()}. Redirecting to booking...`,
    );
    router.push(`/booking/${turf.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 text-gray-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <Trophy className="h-8 w-8 text-red-400" />
          <h1 className="text-3xl font-bold">Tournament Join & Payment</h1>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <img
            src={turf.images[0]}
            alt={turf.name}
            className="h-56 w-full object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-100">
              {tournament.name}
            </h2>
            <div className="mt-3 space-y-2 text-sm text-gray-700 dark:text-zinc-300">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {turf.name}
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {tournament.date}
              </p>
              <p className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Team: {teamName}
              </p>
              <p className="flex items-center gap-2 font-semibold text-red-500 dark:text-red-400">
                <DollarSign className="h-4 w-4" />
                Entry Fee: Rs. {tournament.entryFee}
              </p>
            </div>

            <div className="mt-5 rounded-lg border border-gray-200 p-4 dark:border-zinc-700">
              <p className="mb-2 text-sm font-semibold">
                Select Payment Method
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {paymentOptions.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setPaymentMethod(option.key)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                      paymentMethod === option.key
                        ? "border-red-500 bg-red-500 text-white"
                        : "border-gray-300 bg-white text-gray-800 hover:bg-gray-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handlePayAndContinue}
                className="mt-4 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Pay Entry & Continue to Booking
              </button>

              {paymentMessage && (
                <p className="mt-2 text-xs text-gray-600 dark:text-zinc-400">
                  {paymentMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
