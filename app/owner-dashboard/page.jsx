import {
  Calendar,
  CreditCard,
  DollarSign,
  LayoutDashboard,
  ListChecks,
  Trophy,
  Users,
} from "lucide-react";
import {
  mockBidRequests,
  mockBookings,
  mockTurfs,
  mockUsers,
} from "@/lib/mockData";

export default function OwnerDashboardPage() {
  const owner = mockUsers.find((user) => user.role === "owner");
  const ownerTurfs = mockTurfs.filter((turf) => turf.ownerId === owner?.id);
  const ownerBookings = mockBookings.filter((booking) =>
    ownerTurfs.some((turf) => turf.id === booking.turfId),
  );

  const totalRevenue = ownerBookings
    .filter((booking) => booking.status !== "cancelled")
    .reduce((sum, booking) => sum + booking.totalAmount, 0);

  const dailyBookings = ownerBookings.filter(
    (booking) => booking.date === "2026-02-15",
  ).length;
  const weeklyBookings = ownerBookings.filter(
    (booking) => booking.date >= "2026-02-10" && booking.date <= "2026-02-16",
  ).length;
  const monthlyBookings = ownerBookings.filter((booking) =>
    booking.date.startsWith("2026-02"),
  ).length;

  const upcomingBookings = ownerBookings.filter(
    (booking) => booking.date >= "2026-02-15",
  );
  const monthlyPlatformFee = ownerTurfs.reduce(
    (sum, turf) => sum + (turf.platformFees?.monthlyFee || 0),
    0,
  );

  const ownerBidCommissions = mockBidRequests
    .filter((bid) => ownerTurfs.some((turf) => turf.id === bid.turfId))
    .reduce((sum, bid) => {
      const platformCommission =
        (bid.offeredAmount * bid.commissionPercent) / 100;
      const ownerShare = (platformCommission * bid.ownerSharePercent) / 100;
      return sum + ownerShare;
    }, 0);

  const estimatedPayout =
    totalRevenue + ownerBidCommissions - monthlyPlatformFee;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <LayoutDashboard className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow">
            <DollarSign className="mb-3 h-6 w-6 text-green-600" />
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">
              Rs. {totalRevenue}
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow">
            <Calendar className="mb-3 h-6 w-6 text-blue-600" />
            <p className="text-sm text-gray-500">Total Bookings</p>
            <p className="text-2xl font-bold text-gray-900">
              {ownerBookings.length}
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow">
            <Trophy className="mb-3 h-6 w-6 text-yellow-600" />
            <p className="text-sm text-gray-500">Listed Turfs</p>
            <p className="text-2xl font-bold text-gray-900">
              {ownerTurfs.length}
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow">
            <Users className="mb-3 h-6 w-6 text-purple-600" />
            <p className="text-sm text-gray-500">Avg Group Size</p>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(
                ownerBookings.reduce(
                  (sum, booking) => sum + booking.numberOfPeople,
                  0,
                ) / Math.max(ownerBookings.length, 1),
              )}
            </p>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">
              Booking Analytics
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>Daily bookings: {dailyBookings}</p>
              <p>Weekly bookings: {weeklyBookings}</p>
              <p>Monthly bookings: {monthlyBookings}</p>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">
              Bank & Platform Fees
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                {owner?.bankDetails?.accountHolderName}
              </p>
              <p>A/C: {owner?.bankDetails?.accountNumber}</p>
              <p>IFSC: {owner?.bankDetails?.ifscCode}</p>
              <p className="pt-1 font-semibold">
                Monthly platform fees: Rs. {monthlyPlatformFee}
              </p>
              <p className="font-semibold">
                Bid commission share: Rs. {Math.round(ownerBidCommissions)}
              </p>
              <p className="font-semibold text-green-700">
                Estimated payout: Rs. {Math.round(estimatedPayout)}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">
              Upcoming Booking Tracker
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              {upcomingBookings.slice(0, 4).map((booking) => {
                const turf = ownerTurfs.find(
                  (item) => item.id === booking.turfId,
                );
                return (
                  <p key={booking.id}>
                    {booking.date} • {booking.startTime}-{booking.endTime} •{" "}
                    {turf?.name}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <ListChecks className="h-5 w-5 text-green-600" /> Turf Registration
            (Owner)
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              className="rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Turf name"
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Location"
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Size of turf"
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Owner contact number"
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Available timing (e.g., 06:00-20:00)"
            />
            <select className="rounded-lg border border-gray-300 px-3 py-2">
              <option>Refund allowed</option>
              <option>Refund not allowed</option>
            </select>
            <textarea
              className="rounded-lg border border-gray-300 px-3 py-2 md:col-span-2"
              rows={3}
              placeholder="Turf details, amenities, tournament availability"
            />
          </div>
          <button className="mt-4 rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white hover:bg-green-700">
            Save Turf Registration (Demo)
          </button>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Recent Bookings
          </h2>
          <div className="space-y-3">
            {ownerBookings.map((booking) => {
              const turf = mockTurfs.find((item) => item.id === booking.turfId);
              return (
                <div
                  key={booking.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-gray-900">{turf?.name}</p>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize">
                      {booking.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {booking.date} | {booking.startTime} - {booking.endTime}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {booking.numberOfPeople} people | Rs. {booking.totalAmount}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
