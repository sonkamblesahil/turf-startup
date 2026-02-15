"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MapPin, Search, Target } from "lucide-react";
import { mockTurfs } from "@/lib/mockData";

const cityPhotoMap = {
  mumbai: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=1200",
  bangalore:
    "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1200",
  delhi: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200",
};

const fallbackCityPhoto =
  "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=1200";

const sportPhotoMap = {
  football:
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200",
  cricket:
    "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200",
  "box-cricket":
    "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=1200",
  badminton:
    "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1200",
  tournament:
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200",
};

const fallbackSportPhoto =
  "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=1200";

export default function VenuesLandingPage() {
  const [citySearch, setCitySearch] = useState("");
  const [sportSearch, setSportSearch] = useState("");

  const cities = useMemo(
    () =>
      Array.from(new Set(mockTurfs.map((turf) => turf.location.toLowerCase()))),
    [],
  );
  const sports = useMemo(
    () => Array.from(new Set(mockTurfs.flatMap((turf) => turf.sports || []))),
    [],
  );

  const filteredCities = useMemo(() => {
    const query = citySearch.trim().toLowerCase();
    if (!query) return cities;
    return cities.filter((city) => city.includes(query));
  }, [cities, citySearch]);

  const filteredSports = useMemo(() => {
    const query = sportSearch.trim().toLowerCase();
    if (!query) return sports;
    return sports.filter((sport) => sport.replace("-", " ").includes(query));
  }, [sportSearch, sports]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 text-gray-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-zinc-100">
          Explore Venues
        </h1>
        <p className="mb-8 text-sm text-gray-600 dark:text-zinc-400">
          Browse by city and sport to find the right venue quickly.
        </p>

        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-zinc-100">
            <MapPin className="h-5 w-5 text-red-400" /> Cities
          </h2>
          <div className="mb-4 flex max-w-md items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 dark:border-zinc-700 dark:bg-zinc-900">
            <Search className="h-4 w-4 text-gray-400 dark:text-zinc-500" />
            <input
              value={citySearch}
              onChange={(event) => setCitySearch(event.target.value)}
              placeholder="Search cities"
              className="w-full py-2 text-sm text-gray-900 outline-none dark:text-zinc-100"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {filteredCities.map((city) => (
              <Link
                key={city}
                href={`/venues/${city}/sports/all`}
                className="group relative overflow-hidden rounded-xl border border-gray-200 shadow-md dark:border-zinc-800 dark:shadow-lg dark:shadow-black/40"
              >
                <img
                  src={cityPhotoMap[city] || fallbackCityPhoto}
                  alt={`${city} iconic view`}
                  className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent" />
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-lg bg-white/95 px-3 py-1.5 text-sm font-semibold capitalize text-gray-900 ring-1 ring-gray-200 dark:bg-zinc-900/95 dark:text-zinc-100 dark:ring-zinc-700/90">
                  <MapPin className="h-4 w-4 text-red-400" /> {city}
                </div>
              </Link>
            ))}
          </div>
          {filteredCities.length === 0 && (
            <p className="mt-4 text-sm text-gray-600 dark:text-zinc-400">
              No cities found for this search.
            </p>
          )}
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-zinc-100">
            <Target className="h-5 w-5 text-red-400" /> Sports
          </h2>
          <div className="mb-4 flex max-w-md items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 dark:border-zinc-700 dark:bg-zinc-900">
            <Search className="h-4 w-4 text-gray-400 dark:text-zinc-500" />
            <input
              value={sportSearch}
              onChange={(event) => setSportSearch(event.target.value)}
              placeholder="Search sports"
              className="w-full py-2 text-sm text-gray-900 outline-none dark:text-zinc-100"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {filteredSports.map((sport) => (
              <Link
                key={sport}
                href={`/venues/all/sports/${sport}`}
                className="group relative overflow-hidden rounded-xl border border-gray-200 shadow-md dark:border-zinc-800 dark:shadow-lg dark:shadow-black/40"
              >
                <img
                  src={sportPhotoMap[sport] || fallbackSportPhoto}
                  alt={`${sport.replace("-", " ")} sport`}
                  className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent" />
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-lg bg-white/95 px-3 py-1.5 text-sm font-semibold capitalize text-gray-900 ring-1 ring-gray-200 dark:bg-zinc-900/95 dark:text-zinc-100 dark:ring-zinc-700/90">
                  <Target className="h-4 w-4 text-red-400" />
                  {sport.replace("-", " ")}
                </div>
              </Link>
            ))}
          </div>
          {filteredSports.length === 0 && (
            <p className="mt-4 text-sm text-gray-600 dark:text-zinc-400">
              No sports found for this search.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
