"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, Search, Star } from "lucide-react";
import { mockTurfs } from "@/lib/mockData";

export default function VenueDiscoveryPage() {
  const params = useParams();
  const city = decodeURIComponent(params.city || "all").toLowerCase();
  const sport = decodeURIComponent(params.sport || "all").toLowerCase();

  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(3000);

  const results = useMemo(() => {
    return mockTurfs.filter((turf) => {
      const cityMatch = city === "all" || turf.location.toLowerCase() === city;
      const sportMatch = sport === "all" || turf.sports?.includes(sport);
      const query = searchQuery.trim().toLowerCase();
      const textMatch =
        !query ||
        turf.name.toLowerCase().includes(query) ||
        turf.location.toLowerCase().includes(query) ||
        turf.details.toLowerCase().includes(query);
      const priceMatch = turf.pricePerHour <= maxPrice;

      return cityMatch && sportMatch && textMatch && priceMatch;
    });
  }, [city, maxPrice, searchQuery, sport]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Venue Discovery</h1>
          <p className="mt-2 text-sm text-gray-600">
            City: <span className="font-semibold capitalize">{city}</span> |
            Sport: <span className="font-semibold capitalize">{sport}</span>
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 rounded-xl bg-white p-4 shadow md:grid-cols-3">
          <div className="md:col-span-2">
            <label className="text-sm text-gray-700">Search venue</label>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-gray-300 px-3">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by name, location, details"
                className="w-full py-2 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700">Max price / hour</label>
            <input
              type="range"
              min="500"
              max="4000"
              step="100"
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="mt-2 w-full"
            />
            <p className="text-sm font-medium text-gray-800">Rs. {maxPrice}</p>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">{results.length} venues found</p>
          <Link
            href="/"
            className="text-sm font-medium text-green-700 hover:underline"
          >
            Back to home
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((turf) => (
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
              <div className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-bold text-gray-900">
                    {turf.name}
                  </h2>
                  <span className="rounded-full bg-green-600 px-2.5 py-1 text-xs font-semibold text-white">
                    Rs. {turf.pricePerHour}/hr
                  </span>
                </div>

                <p className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {turf.location}
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  {turf.rating} ({turf.reviewCount})
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {(turf.sports || []).map((item) => (
                    <span
                      key={item}
                      className="rounded bg-gray-100 px-2 py-1 text-xs capitalize text-gray-700"
                    >
                      {item.replace("-", " ")}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
