"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Calendar, Mail, MapPin, Phone, Star, Users } from "lucide-react";
import { mockReviews, mockTurfs } from "@/lib/mockData";

export default function TurfDetailsPage() {
  const params = useParams();
  const turf = mockTurfs.find((item) => item.id === params.id);

  if (!turf) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Turf not found</h1>
      </div>
    );
  }

  const reviews = mockReviews.filter((review) => review.turfId === turf.id);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {turf.images.map((image) => (
            <img
              key={image}
              src={image}
              alt={turf.name}
              className="h-72 w-full rounded-xl object-cover"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <section className="space-y-6 lg:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow">
              <h1 className="text-3xl font-bold text-gray-900">{turf.name}</h1>
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                <Star className="h-4 w-4 fill-current text-yellow-400" />
                {turf.rating} ({turf.reviewCount} reviews)
              </div>
              <div className="mt-3 flex items-start gap-2 text-gray-600">
                <MapPin className="mt-0.5 h-5 w-5" />
                {turf.address}
              </div>
              <p className="mt-4 text-gray-700">{turf.details}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {turf.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-lg border border-green-200 bg-green-50 px-3 py-1 text-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Reviews
              </h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-100 pb-4 last:border-0"
                  >
                    <p className="font-semibold text-gray-900">
                      {review.userName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {review.rating}/5 | {review.createdAt.slice(0, 10)}
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-sm text-gray-500">Price per hour</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">
                Rs. {turf.pricePerHour}
              </p>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Flexible booking slots
                </p>
                <p className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Group-friendly facilities
                </p>
              </div>
              <Link
                href={`/booking/${turf.id}`}
                className="mt-5 block rounded-lg bg-green-600 py-3 text-center font-semibold text-white hover:bg-green-700"
              >
                Book Now
              </Link>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h3 className="mb-3 font-semibold text-gray-900">
                Owner Contact
              </h3>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                {turf.ownerContact.name}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                {turf.ownerContact.phone}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                {turf.ownerContact.email}
              </p>

              <div className="mt-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
                <p className="font-semibold text-gray-900">Slot Timings</p>
                <p className="mt-1">{turf.timings.join(", ")}</p>
              </div>

              <div className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
                <p className="font-semibold text-gray-900">Refund Policy</p>
                {turf.refundPolicy.enabled ? (
                  <p className="mt-1">
                    {turf.refundPolicy.refundPercent}% refund before{" "}
                    {turf.refundPolicy.refundDeadlineHours} hours.
                  </p>
                ) : (
                  <p className="mt-1">No refund for cancellations.</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
