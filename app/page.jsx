"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Filter,
  MapPin,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import { mockTurfs } from "@/lib/mockData";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedSport, setSelectedSport] = useState("all");

  const locations = useMemo(
    () => [
      "all",
      ...Array.from(new Set(mockTurfs.map((turf) => turf.location))),
    ],
    [],
  );

  const filteredTurfs = useMemo(() => {
    return mockTurfs.filter((turf) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        turf.name.toLowerCase().includes(q) ||
        turf.location.toLowerCase().includes(q) ||
        turf.details.toLowerCase().includes(q);
      const matchesLocation =
        selectedLocation === "all" || turf.location === selectedLocation;
      const matchesSport =
        selectedSport === "all" || turf.sports?.includes(selectedSport);
      return matchesSearch && matchesLocation && matchesSport;
    });
  }, [searchQuery, selectedLocation, selectedSport]);

  const sports = useMemo(
    () => [
      "all",
      ...Array.from(new Set(mockTurfs.flatMap((turf) => turf.sports || []))),
    ],
    [],
  );

  const quickStats = useMemo(() => {
    const totalTurfs = mockTurfs.length;
    const avgPrice =
      totalTurfs > 0
        ? Math.round(
            mockTurfs.reduce((sum, turf) => sum + turf.pricePerHour, 0) /
              totalTurfs,
          )
        : 0;
    const highestRated = mockTurfs.reduce(
      (best, turf) => (turf.rating > best.rating ? turf : best),
      mockTurfs[0],
    );

    return {
      totalTurfs,
      avgPrice,
      topRatedName: highestRated?.name ?? "N/A",
    };
  }, []);

  const featuredTurfs = useMemo(
    () => [...mockTurfs].sort((a, b) => b.rating - a.rating).slice(0, 3),
    [],
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-white">
      <section className="relative overflow-hidden bg-linear-to-r from-green-700 via-emerald-700 to-green-600 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-yellow-200 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-50">
              <Sparkles className="h-3.5 w-3.5" /> Smart Turf Discovery
            </p>
            <h1 className="text-4xl font-bold md:text-5xl">
              Book your perfect turf
            </h1>
            <p className="mt-4 text-lg text-green-100">
              Discover top venues, compare prices instantly, and reserve the
              best slot for your team.
            </p>
          </div>

          <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-2xl md:flex-row">
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search turf, city, or details"
                className="w-full py-2 text-gray-900 outline-none"
              />
            </div>
            <div className="flex items-center gap-2 border-t border-gray-200 px-3 md:border-l md:border-t-0">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-transparent py-2 text-gray-900 outline-none"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location === "all" ? "All Locations" : location}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 border-t border-gray-200 px-3 md:border-l md:border-t-0">
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="bg-transparent py-2 text-gray-900 outline-none"
              >
                {sports.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport === "all" ? "All Sports" : sport}
                  </option>
                ))}
              </select>
            </div>
            <Link
              href={`/venues/${selectedLocation.toLowerCase()}/sports/${selectedSport.toLowerCase()}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
              Explore Venues <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-white/15 p-4 backdrop-blur-sm">
              <p className="text-xs text-green-100">Trending Area</p>
              <p className="mt-1 text-sm font-semibold">Mumbai Football</p>
            </div>
            <div className="rounded-xl bg-white/15 p-4 backdrop-blur-sm">
              <p className="text-xs text-green-100">Peak Hours</p>
              <p className="mt-1 text-sm font-semibold">6 PM - 10 PM</p>
            </div>
            <div className="rounded-xl bg-white/15 p-4 backdrop-blur-sm">
              <p className="text-xs text-green-100">Top Rated Turf</p>
              <p className="mt-1 text-sm font-semibold">
                {quickStats.topRatedName}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Featured Turfs</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {featuredTurfs.map((turf) => (
            <Link
              key={turf.id}
              href={`/turf/${turf.id}`}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={turf.images[0]}
                alt={turf.name}
                className="h-44 w-full object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-gray-900">{turf.name}</p>
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">
                    {turf.rating} ★
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{turf.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Available Turfs ({filteredTurfs.length})
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTurfs.map((turf) => (
            <Link
              key={turf.id}
              href={`/turf/${turf.id}`}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={turf.images[0]}
                alt={turf.name}
                className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">
                    {turf.name}
                  </h3>
                  <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                    Rs. {turf.pricePerHour}/hr
                  </span>
                </div>
                <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {turf.location}
                </div>
                <div className="mb-3 flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  <span className="font-semibold text-gray-900">
                    {turf.rating}
                  </span>
                  <span className="text-gray-600">
                    ({turf.reviewCount} reviews)
                  </span>
                </div>
                <p className="mb-3 text-sm text-gray-600">{turf.details}</p>
                <div className="flex flex-wrap gap-2">
                  {turf.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-green-700">
                  View details <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
