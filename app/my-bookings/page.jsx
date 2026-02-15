"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, Clock, HandCoins, MapPin, Users } from "lucide-react";
import { mockBidRequests, mockBookings, mockTurfs } from "@/lib/mockData";

export default function MyBookingsPage() {
  const [filter, setFilter] = useState("all");
  const userId = "user1";
  const today = "2026-02-15";
  const bookings = mockBookings.filter((booking) => booking.userId === userId);

  const filteredBookings = useMemo(() => {
    let result = bookings;
    if (filter !== "all") {
      result = result.filter((booking) => booking.status === filter);
    }
    return result;
  }, [bookings, filter]);

  const upcoming = filteredBookings.filter((booking) => booking.date >= today);
  const previous = filteredBookings.filter((booking) => booking.date < today);

  const myBidRequests = mockBidRequests.filter(
    (bid) => bid.bidderUserId === userId,
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">My Bookings</h1>

        <div className="mb-6 flex flex-wrap gap-2">
          {["all", "confirmed", "completed", "cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                filter === tab
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mb-6 rounded-xl bg-white p-5 shadow">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <HandCoins className="h-5 w-5 text-purple-600" />
            Bid Activity
          </h2>
          {myBidRequests.length === 0 ? (
            <p className="text-sm text-gray-600">No bidding activity yet.</p>
          ) : (
            <div className="space-y-2 text-sm text-gray-700">
              {myBidRequests.map((bid) => (
                <p key={bid.id}>
                  {bid.date} • {bid.startTime}-{bid.endTime} • Offer Rs.{" "}
                  {bid.offeredAmount} • {bid.status}
                </p>
              ))}
            </div>
          )}
        </div>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Upcoming Bookings
          </h2>
          <div className="space-y-4">
            {upcoming.map((booking) => {
              const turf = mockTurfs.find((item) => item.id === booking.turfId);
              if (!turf) return null;
              return (
                <div
                  key={booking.id}
                  className="rounded-xl bg-white p-5 shadow"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {turf.name}
                      </h3>
                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {turf.location}
                      </div>
                    </div>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize">
                      {booking.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-gray-600 md:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {booking.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {booking.startTime} - {booking.endTime}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {booking.numberOfPeople} people
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-gray-700">
                    Type: {booking.type} | Equipment: {booking.equipment.bats}{" "}
                    bats, {booking.equipment.balls} balls
                  </p>

                  <p className="mt-2 text-sm text-gray-700">
                    Refund:{" "}
                    {turf.refundPolicy.enabled
                      ? `${turf.refundPolicy.refundPercent}% available`
                      : "Not allowed"}
                  </p>

                  <p className="mt-3 font-semibold text-gray-900">
                    Total: Rs. {booking.totalAmount}
                  </p>

                  <Link
                    href={`/turf/${booking.turfId}`}
                    className="mt-4 inline-block rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    View Turf
                  </Link>
                </div>
              );
            })}
            {upcoming.length === 0 && (
              <div className="rounded-xl bg-white p-5 text-sm text-gray-600 shadow">
                No upcoming bookings.
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Previous Bookings
          </h2>
          <div className="space-y-4">
            {previous.map((booking) => {
              const turf = mockTurfs.find((item) => item.id === booking.turfId);
              if (!turf) return null;
              return (
                <div
                  key={booking.id}
                  className="rounded-xl bg-white p-5 shadow"
                >
                  <p className="font-semibold text-gray-900">{turf.name}</p>
                  <p className="mt-1 text-sm text-gray-600">
                    {booking.date} | {booking.startTime} - {booking.endTime} |
                    Rs. {booking.totalAmount}
                  </p>
                </div>
              );
            })}
            {previous.length === 0 && (
              <div className="rounded-xl bg-white p-5 text-sm text-gray-600 shadow">
                No previous bookings.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
