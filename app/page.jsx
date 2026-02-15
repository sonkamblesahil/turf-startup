"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Filter, MapPin, Search, Star } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-linear-to-r from-green-600 to-green-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold md:text-5xl">
            Book your perfect turf
          </h1>
          <p className="mt-4 text-lg text-green-100">
            Frontend-only static showcase with demo data
          </p>

          <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-3 rounded-xl bg-white p-3 shadow-lg md:flex-row">
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
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
              Explore Venues
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Turfs</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {quickStats.totalTurfs}
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Average Price / Hour</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              Rs. {quickStats.avgPrice}
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Top Rated Turf</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {quickStats.topRatedName}
            </p>
          </div>
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
              className="overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={turf.images[0]}
                alt={turf.name}
                className="h-48 w-full object-cover"
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
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
