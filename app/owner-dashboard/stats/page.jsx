"use client";

import { useMemo, useState } from "react";
import { BarChart3, Building2, MapPin, Target, Users } from "lucide-react";
import { mockBookings, mockTurfs, mockUsers } from "@/lib/mockData";

function buildGroundsForStats(turf) {
  const baseSport = turf.sports?.[0] || "football";
  const altSport = turf.sports?.[1] || baseSport;

  return [
    {
      id: `${turf.id}-g1`,
      name: "Ground 1",
      sport: baseSport,
      capacity: 14,
      occupancy: 68,
      avgPrice: turf.pricePerHour,
    },
    {
      id: `${turf.id}-g2`,
      name: "Ground 2",
      sport: altSport,
      capacity: 14,
      occupancy: 54,
      avgPrice: turf.pricePerHour,
    },
  ];
}

export default function OwnerStatsPage() {
  const owner = mockUsers.find((user) => user.id === "owner1");
  const ownerTurfs = mockTurfs.filter((turf) => turf.ownerId === owner?.id);

  const turfStats = useMemo(() => {
    return ownerTurfs.map((turf) => {
      const turfBookings = mockBookings.filter(
        (booking) => booking.turfId === turf.id,
      );
      const revenue = turfBookings.reduce(
        (sum, booking) => sum + booking.totalAmount,
        0,
      );
      const grounds = buildGroundsForStats(turf);

      return {
        turfId: turf.id,
        turfName: turf.name,
        location: turf.location,
        totalBookings: turfBookings.length,
        totalRevenue: revenue,
        avgBookingValue: Math.round(revenue / Math.max(turfBookings.length, 1)),
        grounds,
      };
    });
  }, [ownerTurfs]);

  const [selectedTurfId, setSelectedTurfId] = useState(
    turfStats[0]?.turfId || "",
  );
  const selectedTurf =
    turfStats.find((turf) => turf.turfId === selectedTurfId) || turfStats[0];

  const allTurfsStats = useMemo(() => {
    const totalBookings = turfStats.reduce(
      (sum, turf) => sum + turf.totalBookings,
      0,
    );
    const totalRevenue = turfStats.reduce(
      (sum, turf) => sum + turf.totalRevenue,
      0,
    );
    const totalGrounds = turfStats.reduce(
      (sum, turf) => sum + turf.grounds.length,
      0,
    );

    return {
      totalBookings,
      totalRevenue,
      totalGrounds,
      avgBookingValue: Math.round(totalRevenue / Math.max(totalBookings, 1)),
    };
  }, [turfStats]);

  const [selectedGroundId, setSelectedGroundId] = useState(
    selectedTurf?.grounds?.[0]?.id || "",
  );

  const selectedGround =
    selectedTurf?.grounds.find((ground) => ground.id === selectedGroundId) ||
    selectedTurf?.grounds?.[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl bg-linear-to-r from-emerald-700 to-green-600 p-6 text-white shadow">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <BarChart3 className="h-8 w-8" /> Owner Stats Center
          </h1>
          <p className="mt-2 text-sm text-green-50">
            Track specific ground stats, specific turf stats, and all-turfs
            performance.
          </p>
        </div>

        <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">All Turfs</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {turfStats.length}
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">All Grounds</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {allTurfsStats.totalGrounds}
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">All Bookings</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {allTurfsStats.totalBookings}
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">All Revenue</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              Rs. {allTurfsStats.totalRevenue}
            </p>
          </div>
        </section>

        <section className="mb-8 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <Building2 className="h-5 w-5 text-emerald-600" /> Specific Turf
            Stats
          </h2>
          <select
            value={selectedTurf?.turfId || ""}
            onChange={(event) => {
              const turfId = event.target.value;
              setSelectedTurfId(turfId);
              const turf = turfStats.find((item) => item.turfId === turfId);
              setSelectedGroundId(turf?.grounds?.[0]?.id || "");
            }}
            className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm md:w-96"
          >
            {turfStats.map((turf) => (
              <option key={turf.turfId} value={turf.turfId}>
                {turf.turfName}
              </option>
            ))}
          </select>

          {selectedTurf && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Turf</p>
                <p className="font-semibold text-gray-900">
                  {selectedTurf.turfName}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold text-gray-900">
                  {selectedTurf.location}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Bookings</p>
                <p className="font-semibold text-gray-900">
                  {selectedTurf.totalBookings}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="font-semibold text-gray-900">
                  Rs. {selectedTurf.totalRevenue}
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <Target className="h-5 w-5 text-blue-600" /> Specific Ground Stats
          </h2>

          {selectedTurf && (
            <>
              <select
                value={selectedGround?.id || ""}
                onChange={(event) => setSelectedGroundId(event.target.value)}
                className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm md:w-96"
              >
                {selectedTurf.grounds.map((ground) => (
                  <option key={ground.id} value={ground.id}>
                    {ground.name}
                  </option>
                ))}
              </select>

              {selectedGround && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                  <div className="rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-500">Ground</p>
                    <p className="font-semibold text-gray-900">
                      {selectedGround.name}
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-500">Sport</p>
                    <p className="font-semibold text-gray-900">
                      {selectedGround.sport}
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-500">Capacity</p>
                    <p className="font-semibold text-gray-900">
                      {selectedGround.capacity}
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-500">Occupancy</p>
                    <p className="font-semibold text-gray-900">
                      {selectedGround.occupancy}%
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-500">Avg Price</p>
                    <p className="font-semibold text-gray-900">
                      Rs. {selectedGround.avgPrice}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </section>

        <section className="mt-8 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <MapPin className="h-5 w-5 text-purple-600" /> All Turfs Comparison
          </h2>
          <div className="space-y-3">
            {turfStats.map((turf) => (
              <div
                key={turf.turfId}
                className="rounded-lg border border-gray-200 p-4 text-sm"
              >
                <p className="font-semibold text-gray-900">{turf.turfName}</p>
                <p className="text-gray-700">
                  {turf.location} • {turf.grounds.length} grounds •{" "}
                  {turf.totalBookings} bookings • Rs. {turf.totalRevenue}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
