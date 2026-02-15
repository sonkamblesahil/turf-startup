"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  Calendar,
  Clock3,
  HandCoins,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  mockBidRequests,
  mockBookings,
  mockMatchRequests,
  mockTurfs,
} from "@/lib/mockData";

export default function BookingPage() {
  const params = useParams();
  const turf = mockTurfs.find((item) => item.id === params.turfId);

  const [selectedDate, setSelectedDate] = useState("2026-02-20");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookingType, setBookingType] = useState("hourly");
  const [numberOfPeople, setNumberOfPeople] = useState(10);
  const [bats, setBats] = useState(0);
  const [balls, setBalls] = useState(0);
  const [useMatchmaking, setUseMatchmaking] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const userId = "user1";
  const today = "2026-02-15";

  const userBookings = useMemo(
    () =>
      mockBookings.filter(
        (booking) => booking.userId === userId && booking.turfId === turf?.id,
      ),
    [turf],
  );

  const upcoming = userBookings.filter((booking) => booking.date >= today);
  const previous = userBookings.filter((booking) => booking.date < today);

  const slots = useMemo(() => {
    if (!turf) return [];
    return turf.timings.map((slot) => {
      const [startTime, endTime] = slot.split("-");
      const isBooked = turf.bookedSlots.some(
        (booked) =>
          booked.date === selectedDate &&
          booked.startTime === startTime &&
          booked.endTime === endTime,
      );
      return { slot, startTime, endTime, isBooked };
    });
  }, [selectedDate, turf]);

  const bidOptions = useMemo(() => {
    if (!turf) return [];
    return mockBidRequests.filter(
      (bid) =>
        bid.turfId === turf.id &&
        bid.date === selectedDate &&
        bid.status === "open",
    );
  }, [selectedDate, turf]);

  const matchmakingSuggestion = useMemo(() => {
    return mockMatchRequests.find(
      (request) =>
        request.userId === userId &&
        request.preferredLocation === turf?.location &&
        request.preferredDate === selectedDate,
    );
  }, [selectedDate, turf]);

  const amountBreakdown = useMemo(() => {
    if (!turf || !selectedSlot) return null;
    const base = turf.pricePerHour;
    const equipmentCharge = bats * 50 + balls * 30;
    const platformFee = Math.round(base * 0.03);
    return {
      base,
      equipmentCharge,
      platformFee,
      total: base + equipmentCharge + platformFee,
    };
  }, [balls, bats, selectedSlot, turf]);

  if (!turf) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Turf not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold text-gray-900">Book {turf.name}</h1>
          <Link
            href={`/turf/${turf.id}`}
            className="text-sm font-medium text-green-700 hover:underline"
          >
            Back to Turf Details
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="space-y-6 lg:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow">
              <h2 className="text-xl font-semibold text-gray-900">
                Turf Information
              </h2>
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {turf.address}
                </p>
                <p className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Size: {turf.size} | Supports hourly + tournament bookings
                </p>
                <p className="text-gray-600">{turf.details}</p>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h2 className="text-xl font-semibold text-gray-900">
                Calendar & Slot Availability
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="text-sm text-gray-700">
                  Booking Date
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </label>
                <label className="text-sm text-gray-700">
                  Booking Type
                  <select
                    value={bookingType}
                    onChange={(e) => setBookingType(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="tournament">Tournament</option>
                  </select>
                </label>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
                {slots.map((slotItem) => (
                  <button
                    key={slotItem.slot}
                    disabled={slotItem.isBooked}
                    onClick={() => setSelectedSlot(slotItem.slot)}
                    className={`rounded-lg border px-3 py-2 text-sm ${
                      slotItem.isBooked
                        ? "cursor-not-allowed border-red-200 bg-red-50 text-red-700"
                        : selectedSlot === slotItem.slot
                          ? "border-green-600 bg-green-600 text-white"
                          : "border-gray-300 bg-white text-gray-700"
                    }`}
                  >
                    {slotItem.slot}{" "}
                    {slotItem.isBooked ? "(Booked)" : "(Available)"}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h2 className="text-xl font-semibold text-gray-900">
                Booking Details
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="text-sm text-gray-700">
                  Number of People
                  <input
                    type="number"
                    min="1"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </label>
                <label className="text-sm text-gray-700">
                  Bats Rental
                  <input
                    type="number"
                    min="0"
                    value={bats}
                    onChange={(e) => setBats(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </label>
                <label className="text-sm text-gray-700">
                  Balls Rental
                  <input
                    type="number"
                    min="0"
                    value={balls}
                    onChange={(e) => setBalls(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={useMatchmaking}
                    onChange={(e) => setUseMatchmaking(e.target.checked)}
                  />
                  Enable matchmaking (for smaller teams)
                </label>
              </div>

              {amountBreakdown && (
                <div className="mt-4 rounded-lg bg-gray-50 p-4 text-sm">
                  <p className="font-medium text-gray-900">Price Breakdown</p>
                  <p>Base slot: Rs. {amountBreakdown.base}</p>
                  <p>Equipment: Rs. {amountBreakdown.equipmentCharge}</p>
                  <p>Platform fee: Rs. {amountBreakdown.platformFee}</p>
                  <p className="mt-2 text-base font-semibold">
                    Total: Rs. {amountBreakdown.total}
                  </p>
                </div>
              )}

              <div className="mt-4 rounded-lg border border-gray-200 p-4">
                <p className="text-sm font-medium text-gray-900">
                  Payment Method
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  {[
                    { key: "upi", label: "UPI" },
                    { key: "card", label: "Card" },
                    { key: "netbanking", label: "Net Banking" },
                    { key: "wallet", label: "Wallet" },
                  ].map((method) => (
                    <button
                      key={method.key}
                      onClick={() => setPaymentMethod(method.key)}
                      className={`rounded-lg border px-3 py-1.5 ${
                        paymentMethod === method.key
                          ? "border-green-600 bg-green-600 text-white"
                          : "border-gray-300 bg-white text-gray-700"
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              <button className="mt-5 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700">
                Confirm & Pay with {paymentMethod.toUpperCase()} (Demo)
              </button>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h2 className="text-xl font-semibold text-gray-900">
                Bid for Already Booked Slots
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                If a slot is already booked, you can place a higher offer.
                Platform and owner commission are applied.
              </p>
              <div className="mt-4 space-y-3">
                {bidOptions.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No open bid slots for this date.
                  </p>
                )}
                {bidOptions.map((bid) => (
                  <div
                    key={bid.id}
                    className="rounded-lg border border-gray-200 p-4 text-sm"
                  >
                    <p className="font-semibold text-gray-900">
                      {bid.startTime} - {bid.endTime}
                    </p>
                    <p>Current offer: Rs. {bid.offeredAmount}</p>
                    <p>
                      Platform commission: {bid.commissionPercent}% | Owner
                      share: {bid.ownerSharePercent}% of commission
                    </p>
                    <button className="mt-2 rounded-lg border border-gray-300 px-3 py-1.5 hover:bg-gray-50">
                      Place Higher Bid (Demo)
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow">
              <h3 className="flex items-center gap-2 font-semibold text-gray-900">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                Refund Policy
              </h3>
              {turf.refundPolicy.enabled ? (
                <p className="mt-2 text-sm text-gray-700">
                  Refund enabled: {turf.refundPolicy.refundPercent}% before{" "}
                  {turf.refundPolicy.refundDeadlineHours} hours.
                </p>
              ) : (
                <p className="mt-2 text-sm text-gray-700">
                  Refunds are not available for this turf.
                </p>
              )}
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h3 className="flex items-center gap-2 font-semibold text-gray-900">
                <HandCoins className="h-5 w-5 text-purple-600" />
                Matchmaking
              </h3>
              {useMatchmaking && matchmakingSuggestion ? (
                <p className="mt-2 text-sm text-gray-700">
                  Matched with{" "}
                  <span className="font-semibold">
                    {matchmakingSuggestion.matchedWith}
                  </span>{" "}
                  near your preferred location. Suggested turf:{" "}
                  <span className="font-semibold">{turf.name}</span>.
                </p>
              ) : (
                <p className="mt-2 text-sm text-gray-700">
                  Turn on matchmaking if your team size is low; we try to pair
                  you with nearby teams.
                </p>
              )}
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h3 className="font-semibold text-gray-900">
                Your Turf Booking History
              </h3>
              <div className="mt-3 space-y-3 text-sm">
                <div>
                  <p className="mb-1 flex items-center gap-2 font-medium text-gray-800">
                    <Calendar className="h-4 w-4" /> Upcoming
                  </p>
                  {upcoming.length === 0 ? (
                    <p className="text-gray-500">No upcoming bookings.</p>
                  ) : (
                    upcoming.map((booking) => (
                      <p key={booking.id} className="text-gray-700">
                        {booking.date} | {booking.startTime}-{booking.endTime}
                      </p>
                    ))
                  )}
                </div>
                <div>
                  <p className="mb-1 flex items-center gap-2 font-medium text-gray-800">
                    <Clock3 className="h-4 w-4" /> Previous
                  </p>
                  {previous.length === 0 ? (
                    <p className="text-gray-500">No previous bookings.</p>
                  ) : (
                    previous.map((booking) => (
                      <p key={booking.id} className="text-gray-700">
                        {booking.date} | {booking.startTime}-{booking.endTime}
                      </p>
                    ))
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
