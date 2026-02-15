import Link from "next/link";
import { MapPin, Target } from "lucide-react";
import { mockTurfs } from "@/lib/mockData";

export default function VenuesLandingPage() {
  const cities = Array.from(
    new Set(mockTurfs.map((turf) => turf.location.toLowerCase())),
  );
  const sports = Array.from(
    new Set(mockTurfs.flatMap((turf) => turf.sports || [])),
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Explore Venues
        </h1>
        <p className="mb-8 text-sm text-gray-600">
          Browse by city and sport to find the right venue quickly.
        </p>

        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <MapPin className="h-5 w-5 text-green-600" /> Cities
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {cities.map((city) => (
              <Link
                key={city}
                href={`/venues/${city}/sports/all`}
                className="rounded-xl bg-white px-4 py-3 text-center font-medium capitalize text-gray-800 shadow hover:bg-green-50"
              >
                {city}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <Target className="h-5 w-5 text-green-600" /> Sports
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {sports.map((sport) => (
              <Link
                key={sport}
                href={`/venues/all/sports/${sport}`}
                className="rounded-xl bg-white px-4 py-3 text-center font-medium capitalize text-gray-800 shadow hover:bg-green-50"
              >
                {sport.replace("-", " ")}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
