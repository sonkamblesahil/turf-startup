"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Filter, MapPin, Search, Star } from "lucide-react";
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

  const featuredTurfs = useMemo(
    () => [...mockTurfs].sort((a, b) => b.rating - a.rating).slice(0, 3),
    [],
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 via-white to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-black">
      <section className="relative -mt-18 min-h-[48vh] overflow-hidden text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/45 to-black/65 dark:from-black/85 dark:via-black/65 dark:to-black/80" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/15 dark:from-black/70 dark:to-black/20" />
        <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-[25vh] sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold md:text-4xl">
              Book your perfect turf
            </h1>
            <p className="mt-3 text-base text-zinc-200">
              Discover top venues, compare prices instantly, and reserve the
              best slot for your team.
            </p>
          </div>

          <div className="mx-auto mt-4 flex max-w-3xl flex-col gap-2 rounded-xl border border-gray-200/90 bg-white/95 p-2 shadow-xl dark:border-zinc-700/80 dark:bg-zinc-900/95 md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-2 px-2">
              <Search className="h-4 w-4 text-gray-400 dark:text-zinc-500" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search turf, city, or details"
                className="w-full bg-transparent py-1.5 text-sm text-gray-900 placeholder:text-gray-500 outline-none dark:text-zinc-100 dark:placeholder:text-zinc-500"
              />
            </div>
            <div className="flex items-center gap-2 border-t border-gray-200 px-2 dark:border-zinc-700 md:border-l md:border-t-0">
              <Filter className="h-4 w-4 text-gray-400 dark:text-zinc-500" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-transparent py-1.5 text-sm text-gray-900 outline-none dark:text-zinc-100"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location === "all" ? "All Locations" : location}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 border-t border-gray-200 px-2 dark:border-zinc-700 md:border-l md:border-t-0">
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="bg-transparent py-1.5 text-sm text-gray-900 outline-none dark:text-zinc-100"
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
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
            >
              Explore <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-100">
            Featured Turfs
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {featuredTurfs.map((turf) => (
            <Link
              key={turf.id}
              href={`/turf/${turf.id}`}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <img
                src={turf.images[0]}
                alt={turf.name}
                className="h-44 w-full object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-gray-900 dark:text-zinc-100">
                    {turf.name}
                  </p>
                  <span className="rounded-full bg-yellow-500/20 px-2 py-1 text-xs font-semibold text-yellow-300">
                    {turf.rating} ★
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-zinc-400">
                  {turf.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-zinc-100">
          Available Turfs ({filteredTurfs.length})
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTurfs.map((turf) => (
            <Link
              key={turf.id}
              href={`/turf/${turf.id}`}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
            >
              <img
                src={turf.images[0]}
                alt={turf.name}
                className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-100">
                    {turf.name}
                  </h3>
                  <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                    Rs. {turf.pricePerHour}/hr
                  </span>
                </div>
                <div className="mb-2 flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400">
                  <MapPin className="h-4 w-4" />
                  {turf.location}
                </div>
                <div className="mb-3 flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  <span className="font-semibold text-gray-900 dark:text-zinc-100">
                    {turf.rating}
                  </span>
                  <span className="text-gray-600 dark:text-zinc-400">
                    ({turf.reviewCount} reviews)
                  </span>
                </div>
                <p className="mb-3 text-sm text-gray-600 dark:text-zinc-400">
                  {turf.details}
                </p>
                <div className="flex flex-wrap gap-2">
                  {turf.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400">
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
