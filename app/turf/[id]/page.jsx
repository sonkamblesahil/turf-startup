"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, Mail, MapPin, Phone, Star, Users } from "lucide-react";
import { mockReviews, mockTurfs, mockUsers } from "@/lib/mockData";

export default function TurfDetailsPage() {
  const params = useParams();
  const turfId = typeof params.id === "string" ? params.id : params.id?.[0];
  const turf = mockTurfs.find((item) => item.id === turfId);
  const [currentUser, setCurrentUser] = useState(
    mockUsers.find((user) => user.role === "user"),
  );
  const [reviews, setReviews] = useState(() =>
    mockReviews.filter((review) => review.turfId === turfId),
  );
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const currentUserRaw = localStorage.getItem("currentUser");
    if (!currentUserRaw) return;

    try {
      const parsedUser = JSON.parse(currentUserRaw);
      if (parsedUser?.role === "user") {
        setCurrentUser(parsedUser);
      }
    } catch {
      setCurrentUser(mockUsers.find((user) => user.role === "user"));
    }
  }, []);

  useEffect(() => {
    setReviews(mockReviews.filter((review) => review.turfId === turfId));
  }, [turfId]);

  const handleAddReview = (event) => {
    event.preventDefault();
    const trimmedComment = comment.trim();
    const numericRating = Number(rating);

    if (!trimmedComment) {
      setReviewMessage("Please write a review comment.");
      return;
    }

    if (
      !Number.isFinite(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      setReviewMessage("Please choose a valid rating from 1 to 5.");
      return;
    }

    const userId = currentUser?.id || "user1";
    const userName = currentUser?.name || "User";

    setReviews((prev) => {
      const existingIndex = prev.findIndex(
        (review) => review.userId === userId,
      );
      const updatedReview = {
        id:
          existingIndex >= 0 ? prev[existingIndex].id : `review-${Date.now()}`,
        turfId: turf?.id,
        userId,
        userName,
        rating: numericRating,
        comment: trimmedComment,
        createdAt: new Date().toISOString(),
      };

      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = updatedReview;
        return next;
      }

      return [updatedReview, ...prev];
    });

    setComment("");
    setRating("5");
    setReviewMessage("Your review has been submitted.");
  };

  if (!turf) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Turf not found</h1>
      </div>
    );
  }

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

            <div
              id="add-review"
              className="rounded-xl bg-white p-6 shadow scroll-mt-24"
            >
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Reviews
              </h2>
              <form
                onSubmit={handleAddReview}
                className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-4"
              >
                <p className="mb-2 text-sm font-semibold text-gray-900">
                  Add your review
                </p>
                <p className="mb-3 text-xs text-gray-600">
                  Posting as {currentUser?.name || "User"}
                </p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                  <select
                    value={rating}
                    onChange={(event) => {
                      setRating(event.target.value);
                      setReviewMessage("");
                    }}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Very Good</option>
                    <option value="3">3 - Good</option>
                    <option value="2">2 - Fair</option>
                    <option value="1">1 - Poor</option>
                  </select>
                  <textarea
                    rows={2}
                    value={comment}
                    onChange={(event) => {
                      setComment(event.target.value);
                      setReviewMessage("");
                    }}
                    placeholder="Write your experience"
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm md:col-span-3"
                  />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    Submit Review
                  </button>
                  {reviewMessage && (
                    <p className="text-sm font-medium text-green-700">
                      {reviewMessage}
                    </p>
                  )}
                </div>
              </form>

              <div className="space-y-4">
                {reviews.length === 0 && (
                  <p className="text-sm text-gray-600">
                    No reviews yet. Be the first to add one.
                  </p>
                )}
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
              <a
                href="#add-review"
                className="mt-3 block rounded-lg border border-green-600 py-2 text-center text-sm font-semibold text-green-700 hover:bg-green-50"
              >
                Add Review
              </a>
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
