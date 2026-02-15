import Link from "next/link";
import { MapPin, Target } from "lucide-react";
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {cities.map((city) => (
              <Link
                key={city}
                href={`/venues/${city}/sports/all`}
                className="group relative overflow-hidden rounded-xl shadow"
              >
                <img
                  src={cityPhotoMap[city] || fallbackCityPhoto}
                  alt={`${city} iconic view`}
                  className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent" />
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 text-sm font-semibold capitalize text-gray-900">
                  <MapPin className="h-4 w-4 text-green-600" /> {city}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <Target className="h-5 w-5 text-green-600" /> Sports
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {sports.map((sport) => (
              <Link
                key={sport}
                href={`/venues/all/sports/${sport}`}
                className="group relative overflow-hidden rounded-xl shadow"
              >
                <img
                  src={sportPhotoMap[sport] || fallbackSportPhoto}
                  alt={`${sport.replace("-", " ")} sport`}
                  className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent" />
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 text-sm font-semibold capitalize text-gray-900">
                  <Target className="h-4 w-4 text-green-600" />
                  {sport.replace("-", " ")}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
