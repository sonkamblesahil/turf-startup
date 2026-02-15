"use client";

import { useMemo, useState } from "react";
import {
  BellRing,
  CalendarDays,
  CircleDollarSign,
  LayoutDashboard,
  MapPin,
  Phone,
  Plus,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";
import {
  mockBookings,
  mockTournaments,
  mockTurfs,
  mockUsers,
} from "@/lib/mockData";

const today = "2026-02-15";

function createInitialGrounds(turf) {
  const primarySport = turf.sports?.[0] || "football";
  const secondarySport = turf.sports?.[1] || primarySport;

  return [
    {
      id: `${turf.id}-ground-1`,
      name: "Ground 1",
      sport: primarySport,
      size: turf.size || "100x60 feet",
      surfaceType: "artificial",
      maxPlayers: 14,
      lighting: "floodlights",
      details: "Main playable ground with standard tournament markings.",
      pricePerHour: turf.pricePerHour,
      status: "active",
    },
    {
      id: `${turf.id}-ground-2`,
      name: "Ground 2",
      sport: secondarySport,
      size: turf.size || "90x55 feet",
      surfaceType: "artificial",
      maxPlayers: 14,
      lighting: "floodlights",
      details: "Practice and friendly match ground.",
      pricePerHour: turf.pricePerHour,
      status: "active",
    },
  ];
}

export default function OwnerDashboardPage() {
  const owner = mockUsers.find((user) => user.id === "owner1");
  const users = mockUsers.filter((user) => user.role === "user");

  const [ownerTurfs, setOwnerTurfs] = useState(
    mockTurfs.filter((turf) => turf.ownerId === owner?.id),
  );

  const [turfGroundMap, setTurfGroundMap] = useState(() => {
    const initial = {};
    mockTurfs
      .filter((turf) => turf.ownerId === owner?.id)
      .forEach((turf) => {
        initial[turf.id] = createInitialGrounds(turf);
      });
    return initial;
  });

  const [bookings, setBookings] = useState(mockBookings);
  const [tournaments, setTournaments] = useState(
    mockTournaments.filter((tournament) => tournament.ownerId === owner?.id),
  );

  const [newTurfForm, setNewTurfForm] = useState({
    name: "",
    location: "",
    address: "",
    details: "",
    size: "",
    sports: "football, cricket",
    openingTime: "06:00",
    closingTime: "22:00",
    amenities: "Floodlights, Changing Rooms",
    contactNumber: owner?.phone || "",
    refundEnabled: "yes",
    refundPercent: "80",
    refundDeadlineHours: "12",
    monthlyFee: "1500",
    pricePerHour: "",
    groundCount: "2",
  });
  const [newTurfMessage, setNewTurfMessage] = useState("");

  const [newGroundForms, setNewGroundForms] = useState({});
  const [newGroundMessage, setNewGroundMessage] = useState("");

  const [newTournamentForm, setNewTournamentForm] = useState({
    name: "",
    turfId: ownerTurfs[0]?.id || "",
    date: "",
    maxTeams: "",
    entryFee: "",
    prizePool: "",
  });
  const [tournamentMessage, setTournamentMessage] = useState("");

  const [campaignForm, setCampaignForm] = useState({
    type: "discount",
    title: "",
    message: "",
  });
  const [campaigns, setCampaigns] = useState([]);
  const [campaignMessage, setCampaignMessage] = useState("");

  const ownerTurfIds = useMemo(
    () => new Set(ownerTurfs.map((turf) => turf.id)),
    [ownerTurfs],
  );

  const ownerBookings = useMemo(
    () => bookings.filter((booking) => ownerTurfIds.has(booking.turfId)),
    [bookings, ownerTurfIds],
  );

  const userMap = useMemo(
    () => Object.fromEntries(mockUsers.map((user) => [user.id, user])),
    [],
  );

  const analytics = useMemo(() => {
    const paidBookings = ownerBookings.filter(
      (booking) => booking.status !== "cancelled",
    );
    const totalRevenue = paidBookings.reduce(
      (sum, booking) => sum + booking.totalAmount,
      0,
    );
    const activeCustomers = new Set(
      ownerBookings.map((booking) => booking.userId),
    ).size;
    const upcomingBookings = ownerBookings.filter(
      (booking) => booking.date >= today && booking.status === "confirmed",
    ).length;
    const completedBookings = ownerBookings.filter(
      (booking) => booking.status === "completed",
    ).length;
    const averageTicket = Math.round(
      totalRevenue / Math.max(paidBookings.length, 1),
    );

    const byTurf = ownerTurfs.map((turf) => {
      const turfBookings = ownerBookings.filter(
        (booking) => booking.turfId === turf.id,
      );
      return {
        turfId: turf.id,
        turfName: turf.name,
        bookings: turfBookings.length,
        revenue: turfBookings.reduce(
          (sum, booking) => sum + booking.totalAmount,
          0,
        ),
      };
    });

    return {
      totalRevenue,
      activeCustomers,
      upcomingBookings,
      completedBookings,
      averageTicket,
      byTurf,
    };
  }, [ownerBookings, ownerTurfs]);

  const updateBookingStatus = (bookingId, status) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status } : booking,
      ),
    );
  };

  const handleAddTurf = (event) => {
    event.preventDefault();
    const requiredFields = [
      newTurfForm.name,
      newTurfForm.location,
      newTurfForm.address,
      newTurfForm.details,
      newTurfForm.size,
      newTurfForm.sports,
      newTurfForm.openingTime,
      newTurfForm.closingTime,
      newTurfForm.amenities,
      newTurfForm.contactNumber,
      newTurfForm.refundPercent,
      newTurfForm.refundDeadlineHours,
      newTurfForm.monthlyFee,
      newTurfForm.pricePerHour,
      newTurfForm.groundCount,
    ];

    if (requiredFields.some((field) => !String(field).trim())) {
      setNewTurfMessage("Please fill all turf fields.");
      return;
    }

    const groundCount = Math.max(1, Number(newTurfForm.groundCount));
    const pricePerHour = Number(newTurfForm.pricePerHour);
    const refundPercent = Number(newTurfForm.refundPercent);
    const refundDeadlineHours = Number(newTurfForm.refundDeadlineHours);
    const monthlyFee = Number(newTurfForm.monthlyFee);

    if (!Number.isFinite(pricePerHour) || pricePerHour <= 0) {
      setNewTurfMessage("Price per hour must be a valid number.");
      return;
    }

    if (
      !Number.isFinite(refundPercent) ||
      refundPercent < 0 ||
      refundPercent > 100 ||
      !Number.isFinite(refundDeadlineHours) ||
      refundDeadlineHours < 0 ||
      !Number.isFinite(monthlyFee) ||
      monthlyFee < 0
    ) {
      setNewTurfMessage("Refund and fee values must be valid numbers.");
      return;
    }

    const sports = newTurfForm.sports
      .split(",")
      .map((sport) => sport.trim().toLowerCase())
      .filter(Boolean);

    const amenities = newTurfForm.amenities
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const timings = [`${newTurfForm.openingTime}-${newTurfForm.closingTime}`];

    const turfId = `owner-turf-${Date.now()}`;
    const newTurf = {
      id: turfId,
      ownerId: owner?.id,
      name: newTurfForm.name.trim(),
      location: newTurfForm.location.trim(),
      address: newTurfForm.address.trim(),
      details: newTurfForm.details.trim(),
      size: newTurfForm.size.trim(),
      sports: sports.length ? sports : ["football"],
      pricePerHour,
      timings,
      bookedSlots: [],
      amenities: amenities.length ? amenities : ["Floodlights"],
      ownerContact: {
        name: owner?.name || "Owner",
        phone: newTurfForm.contactNumber.trim(),
        email: owner?.email || "owner@turfbook.com",
      },
      refundPolicy: {
        enabled: newTurfForm.refundEnabled === "yes",
        refundPercent,
        refundDeadlineHours,
      },
      platformFees: {
        monthlyFee,
        bidCommissionPercent: 10,
      },
      images: [
        "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800",
      ],
    };

    setOwnerTurfs((prev) => [newTurf, ...prev]);
    setTurfGroundMap((prev) => ({
      ...prev,
      [turfId]: Array.from({ length: groundCount }).map((_, index) => ({
        id: `${turfId}-ground-${index + 1}`,
        name: `Ground ${index + 1}`,
        sport: index % 2 === 0 ? "football" : "cricket",
        size: index % 2 === 0 ? "100x60 feet" : "90x55 feet",
        surfaceType: "artificial",
        maxPlayers: 14,
        lighting: "floodlights",
        details: `Ground ${index + 1} at this turf location.`,
        pricePerHour,
        status: "active",
      })),
    }));

    setNewTournamentForm((prev) => ({
      ...prev,
      turfId: prev.turfId || turfId,
    }));

    setNewTurfForm({
      name: "",
      location: "",
      address: "",
      details: "",
      size: "",
      sports: "football, cricket",
      openingTime: "06:00",
      closingTime: "22:00",
      amenities: "Floodlights, Changing Rooms",
      contactNumber: owner?.phone || "",
      refundEnabled: "yes",
      refundPercent: "80",
      refundDeadlineHours: "12",
      monthlyFee: "1500",
      pricePerHour: "",
      groundCount: "2",
    });
    setNewTurfMessage("New turf and grounds added successfully.");
  };

  const handleAddGround = (turfId) => {
    const form = newGroundForms[turfId] || {
      name: "",
      sport: "football",
      size: "",
      surfaceType: "artificial",
      maxPlayers: "",
      lighting: "floodlights",
      details: "",
      pricePerHour: "",
    };

    if (
      !form.name.trim() ||
      !form.size.trim() ||
      !String(form.maxPlayers).trim() ||
      !form.details.trim() ||
      !String(form.pricePerHour).trim()
    ) {
      setNewGroundMessage("Please fill all required ground details.");
      return;
    }

    const pricePerHour = Number(form.pricePerHour);
    const maxPlayers = Number(form.maxPlayers);
    if (!Number.isFinite(pricePerHour) || pricePerHour <= 0) {
      setNewGroundMessage("Ground price must be valid.");
      return;
    }
    if (!Number.isFinite(maxPlayers) || maxPlayers <= 0) {
      setNewGroundMessage("Max players must be a valid number.");
      return;
    }

    const ground = {
      id: `${turfId}-ground-${Date.now()}`,
      name: form.name.trim(),
      sport: form.sport,
      size: form.size.trim(),
      surfaceType: form.surfaceType,
      maxPlayers,
      lighting: form.lighting,
      details: form.details.trim(),
      pricePerHour,
      status: "active",
    };

    setTurfGroundMap((prev) => ({
      ...prev,
      [turfId]: [...(prev[turfId] || []), ground],
    }));

    setNewGroundForms((prev) => ({
      ...prev,
      [turfId]: {
        name: "",
        sport: "football",
        size: "",
        surfaceType: "artificial",
        maxPlayers: "",
        lighting: "floodlights",
        details: "",
        pricePerHour: "",
      },
    }));
    setNewGroundMessage("Ground added successfully.");
  };

  const handleCreateTournament = (event) => {
    event.preventDefault();

    const required = [
      newTournamentForm.name,
      newTournamentForm.turfId,
      newTournamentForm.date,
      newTournamentForm.maxTeams,
      newTournamentForm.entryFee,
      newTournamentForm.prizePool,
    ];

    if (required.some((field) => !String(field).trim())) {
      setTournamentMessage("Please complete all tournament fields.");
      return;
    }

    const maxTeams = Number(newTournamentForm.maxTeams);
    const entryFee = Number(newTournamentForm.entryFee);
    const prizePool = Number(newTournamentForm.prizePool);

    if (
      !Number.isFinite(maxTeams) ||
      maxTeams < 2 ||
      !Number.isFinite(entryFee) ||
      entryFee < 0 ||
      !Number.isFinite(prizePool) ||
      prizePool < 0
    ) {
      setTournamentMessage(
        "Use valid values for teams, entry fee, and prize pool.",
      );
      return;
    }

    const tournament = {
      id: `owner-tournament-${Date.now()}`,
      ownerId: owner?.id,
      turfId: newTournamentForm.turfId,
      name: newTournamentForm.name.trim(),
      date: newTournamentForm.date,
      startTime: "09:00",
      endTime: "18:00",
      maxTeams,
      registeredTeams: [],
      entryFee,
      prizePool,
      status: "upcoming",
    };

    setTournaments((prev) => [tournament, ...prev]);
    setNewTournamentForm((prev) => ({
      ...prev,
      name: "",
      date: "",
      maxTeams: "",
      entryFee: "",
      prizePool: "",
    }));
    setTournamentMessage("Tournament created successfully.");
  };

  const handleBroadcastCampaign = (event) => {
    event.preventDefault();

    if (!campaignForm.title.trim() || !campaignForm.message.trim()) {
      setCampaignMessage("Title and message are required.");
      return;
    }

    const campaign = {
      id: `campaign-${Date.now()}`,
      type: campaignForm.type,
      title: campaignForm.title.trim(),
      message: campaignForm.message.trim(),
      recipients: users.map((user) => ({
        userId: user.id,
        name: user.name,
        phone: user.phone,
      })),
      createdAt: new Date().toISOString(),
    };

    setCampaigns((prev) => [campaign, ...prev]);
    setCampaignForm({ type: "discount", title: "", message: "" });
    setCampaignMessage(`Notification sent to ${users.length} users.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-2xl bg-linear-to-r from-green-700 to-emerald-600 p-6 text-white shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-green-100">
                Separate Turf Owner UI
              </p>
              <h1 className="mt-1 flex items-center gap-2 text-3xl font-bold">
                <LayoutDashboard className="h-8 w-8" />
                Turf Owner Control Center
              </h1>
              <p className="mt-2 text-sm text-green-50">
                Manage bookings, analytics, tournaments, teams, grounds, and
                user communication.
              </p>
            </div>
            <div className="rounded-xl bg-white/15 p-4 text-sm">
              <p className="font-semibold">{owner?.name}</p>
              <p className="mt-1 flex items-center gap-2">
                <Phone className="h-4 w-4" /> {owner?.phone}
              </p>
              <p className="mt-1">{owner?.email}</p>
            </div>
          </div>
        </section>

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              Rs. {analytics.totalRevenue}
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Owner Turfs</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {ownerTurfs.length}
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Total Grounds</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {Object.values(turfGroundMap).reduce(
                (sum, grounds) => sum + grounds.length,
                0,
              )}
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Upcoming Bookings</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {analytics.upcomingBookings}
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Active Customers</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {analytics.activeCustomers}
            </p>
          </div>
        </section>

        <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <article className="rounded-xl bg-white p-6 shadow lg:col-span-2">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
              <CalendarDays className="h-5 w-5 text-blue-600" />
              Booking Management + Customer Details
            </h2>
            <div className="space-y-3">
              {ownerBookings.map((booking) => {
                const turf = ownerTurfs.find(
                  (item) => item.id === booking.turfId,
                );
                const customer = userMap[booking.userId];
                return (
                  <div
                    key={booking.id}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-gray-900">
                        {turf?.name} • {booking.date} • {booking.startTime}-
                        {booking.endTime}
                      </p>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize">
                        {booking.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-700">
                      Customer: {customer?.name} • Mobile: {customer?.phone} •
                      Team size: {booking.numberOfPeople}
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                      Amount: Rs. {booking.totalAmount}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateBookingStatus(booking.id, "confirmed")
                        }
                        className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700"
                      >
                        Mark Confirmed
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateBookingStatus(booking.id, "completed")
                        }
                        className="rounded-md border border-blue-300 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
                      >
                        Mark Completed
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateBookingStatus(booking.id, "cancelled")
                        }
                        className="rounded-md border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
              <CircleDollarSign className="h-5 w-5 text-green-600" />
              Booking Analytics
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>Completed bookings: {analytics.completedBookings}</p>
              <p>Average ticket: Rs. {analytics.averageTicket}</p>
              <p>Tournaments managed: {tournaments.length}</p>
            </div>
            <div className="mt-4 space-y-3">
              {analytics.byTurf.map((row) => (
                <div
                  key={row.turfId}
                  className="rounded-lg border border-gray-200 p-3 text-sm"
                >
                  <p className="font-semibold text-gray-900">{row.turfName}</p>
                  <p className="text-gray-700">Bookings: {row.bookings}</p>
                  <p className="text-gray-700">Revenue: Rs. {row.revenue}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mb-8 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <MapPin className="h-5 w-5 text-emerald-600" />
            Turf + Ground Manager (One Turf Location can have multiple Grounds)
          </h2>

          <form
            onSubmit={handleAddTurf}
            className="mb-6 grid grid-cols-1 gap-3 rounded-xl border border-gray-200 p-4 md:grid-cols-2 xl:grid-cols-3"
          >
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="Turf location name"
              value={newTurfForm.name}
              onChange={(event) => {
                setNewTurfForm((prev) => ({
                  ...prev,
                  name: event.target.value,
                }));
                setNewTurfMessage("");
              }}
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="City"
              value={newTurfForm.location}
              onChange={(event) => {
                setNewTurfForm((prev) => ({
                  ...prev,
                  location: event.target.value,
                }));
                setNewTurfMessage("");
              }}
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="Address"
              value={newTurfForm.address}
              onChange={(event) => {
                setNewTurfForm((prev) => ({
                  ...prev,
                  address: event.target.value,
                }));
                setNewTurfMessage("");
              }}
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="Details"
              value={newTurfForm.details}
              onChange={(event) => {
                setNewTurfForm((prev) => ({
                  ...prev,
                  details: event.target.value,
                }));
                setNewTurfMessage("");
              }}
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="Turf size (e.g., 110x70 feet)"
              value={newTurfForm.size}
              onChange={(event) => {
                setNewTurfForm((prev) => ({
                  ...prev,
                  size: event.target.value,
                }));
                setNewTurfMessage("");
              }}
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="Sports (comma separated)"
              value={newTurfForm.sports}
              onChange={(event) => {
                setNewTurfForm((prev) => ({
                  ...prev,
                  sports: event.target.value,
                }));
                setNewTurfMessage("");
              }}
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              type="time"
              value={newTurfForm.openingTime}
              onChange={(event) => {
                setNewTurfForm((prev) => ({
                  ...prev,
                  openingTime: event.target.value,
                }));
                setNewTurfMessage("");
              }}
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              type="time"
              value={newTurfForm.closingTime}
              onChange={(event) => {
                setNewTurfForm((prev) => ({
                  ...prev,
                  closingTime: event.target.value,
                }));
                setNewTurfMessage("");
              }}
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="Amenities (comma separated)"
              value={newTurfForm.amenities}
              onChange={(event) => {
                setNewTurfForm((prev) => ({
                  ...prev,
                  amenities: event.target.value,
                }));
                setNewTurfMessage("");
              }}
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="Owner contact number"
              value={newTurfForm.contactNumber}
              onChange={(event) => {
                setNewTurfForm((prev) => ({
                  ...prev,
                  contactNumber: event.target.value,
                }));
                setNewTurfMessage("");
              }}
            />
            <select
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              value={newTurfForm.refundEnabled}
              onChange={(event) => {
                setNewTurfForm((prev) => ({
                  ...prev,
                  refundEnabled: event.target.value,
                }));
                setNewTurfMessage("");
              }}
            >
              <option value="yes">Refund Enabled</option>
              <option value="no">No Refund</option>
            </select>
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              type="number"
              min="0"
              max="100"
              placeholder="Refund percentage"
              value={newTurfForm.refundPercent}
              onChange={(event) => {
                setNewTurfForm((prev) => ({
                  ...prev,
                  refundPercent: event.target.value,
                }));
                setNewTurfMessage("");
              }}
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              type="number"
              min="0"
              placeholder="Refund deadline (hours)"
              value={newTurfForm.refundDeadlineHours}
              onChange={(event) => {
                setNewTurfForm((prev) => ({
                  ...prev,
                  refundDeadlineHours: event.target.value,
                }));
                setNewTurfMessage("");
              }}
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              type="number"
              min="0"
              placeholder="Monthly platform fee"
              value={newTurfForm.monthlyFee}
              onChange={(event) => {
                setNewTurfForm((prev) => ({
                  ...prev,
                  monthlyFee: event.target.value,
                }));
                setNewTurfMessage("");
              }}
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="Price per hour"
              type="number"
              min="1"
              value={newTurfForm.pricePerHour}
              onChange={(event) => {
                setNewTurfForm((prev) => ({
                  ...prev,
                  pricePerHour: event.target.value,
                }));
                setNewTurfMessage("");
              }}
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="Number of grounds"
              type="number"
              min="1"
              value={newTurfForm.groundCount}
              onChange={(event) => {
                setNewTurfForm((prev) => ({
                  ...prev,
                  groundCount: event.target.value,
                }));
                setNewTurfMessage("");
              }}
            />
            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 xl:col-span-3"
            >
              Add Turf Location with Grounds
            </button>
          </form>

          {newTurfMessage && (
            <p className="mb-4 text-sm font-semibold text-emerald-700">
              {newTurfMessage}
            </p>
          )}

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {ownerTurfs.map((turf) => {
              const grounds = turfGroundMap[turf.id] || [];
              const groundForm = newGroundForms[turf.id] || {
                name: "",
                sport: "football",
                size: "",
                surfaceType: "artificial",
                maxPlayers: "",
                lighting: "floodlights",
                details: "",
                pricePerHour: "",
              };

              return (
                <article
                  key={turf.id}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-gray-900">{turf.name}</p>
                      <p className="text-sm text-gray-600">{turf.address}</p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {grounds.length} grounds
                    </span>
                  </div>

                  <div className="space-y-2">
                    {grounds.map((ground) => (
                      <div
                        key={ground.id}
                        className="rounded-lg border border-gray-200 p-3 text-sm"
                      >
                        <p className="font-semibold text-gray-900">
                          {ground.name}
                        </p>
                        <p className="text-gray-700">
                          Sport: {ground.sport} • Rs. {ground.pricePerHour}/hour
                          • {ground.status}
                        </p>
                        <p className="mt-1 text-gray-700">
                          Size: {ground.size} • Surface: {ground.surfaceType} •
                          Max players: {ground.maxPlayers}
                        </p>
                        <p className="mt-1 text-gray-700">
                          Lighting: {ground.lighting}
                        </p>
                        <p className="mt-1 text-gray-600">{ground.details}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
                    <input
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      placeholder="Ground name"
                      value={groundForm.name}
                      onChange={(event) =>
                        setNewGroundForms((prev) => ({
                          ...prev,
                          [turf.id]: {
                            ...groundForm,
                            name: event.target.value,
                          },
                        }))
                      }
                    />
                    <select
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      value={groundForm.sport}
                      onChange={(event) =>
                        setNewGroundForms((prev) => ({
                          ...prev,
                          [turf.id]: {
                            ...groundForm,
                            sport: event.target.value,
                          },
                        }))
                      }
                    >
                      <option value="football">Football</option>
                      <option value="cricket">Cricket</option>
                      <option value="badminton">Badminton</option>
                    </select>
                    <input
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      placeholder="Ground size (e.g., 100x60 feet)"
                      value={groundForm.size}
                      onChange={(event) =>
                        setNewGroundForms((prev) => ({
                          ...prev,
                          [turf.id]: {
                            ...groundForm,
                            size: event.target.value,
                          },
                        }))
                      }
                    />
                    <select
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      value={groundForm.surfaceType}
                      onChange={(event) =>
                        setNewGroundForms((prev) => ({
                          ...prev,
                          [turf.id]: {
                            ...groundForm,
                            surfaceType: event.target.value,
                          },
                        }))
                      }
                    >
                      <option value="artificial">Artificial</option>
                      <option value="natural-grass">Natural Grass</option>
                      <option value="matting">Matting</option>
                    </select>
                    <input
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      placeholder="Max players"
                      type="number"
                      min="1"
                      value={groundForm.maxPlayers}
                      onChange={(event) =>
                        setNewGroundForms((prev) => ({
                          ...prev,
                          [turf.id]: {
                            ...groundForm,
                            maxPlayers: event.target.value,
                          },
                        }))
                      }
                    />
                    <select
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      value={groundForm.lighting}
                      onChange={(event) =>
                        setNewGroundForms((prev) => ({
                          ...prev,
                          [turf.id]: {
                            ...groundForm,
                            lighting: event.target.value,
                          },
                        }))
                      }
                    >
                      <option value="floodlights">Floodlights</option>
                      <option value="daylight-only">Daylight only</option>
                      <option value="mixed">Mixed lighting</option>
                    </select>
                    <input
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      placeholder="Price/hour"
                      type="number"
                      min="1"
                      value={groundForm.pricePerHour}
                      onChange={(event) =>
                        setNewGroundForms((prev) => ({
                          ...prev,
                          [turf.id]: {
                            ...groundForm,
                            pricePerHour: event.target.value,
                          },
                        }))
                      }
                    />
                    <textarea
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm md:col-span-3"
                      rows={2}
                      placeholder="Ground details (condition, markings, netting, etc.)"
                      value={groundForm.details}
                      onChange={(event) =>
                        setNewGroundForms((prev) => ({
                          ...prev,
                          [turf.id]: {
                            ...groundForm,
                            details: event.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddGround(turf.id)}
                    className="mt-3 inline-flex items-center gap-1 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700"
                  >
                    <Plus className="h-4 w-4" /> Add Ground
                  </button>
                </article>
              );
            })}
          </div>
          {newGroundMessage && (
            <p className="mt-3 text-sm font-semibold text-emerald-700">
              {newGroundMessage}
            </p>
          )}
        </section>

        <section className="mb-8 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <Trophy className="h-5 w-5 text-yellow-600" />
            Tournament + Team Organizer
          </h2>

          <form
            onSubmit={handleCreateTournament}
            className="mb-6 grid grid-cols-1 gap-3 rounded-xl border border-gray-200 p-4 md:grid-cols-2 xl:grid-cols-3"
          >
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="Tournament name"
              value={newTournamentForm.name}
              onChange={(event) => {
                setNewTournamentForm((prev) => ({
                  ...prev,
                  name: event.target.value,
                }));
                setTournamentMessage("");
              }}
            />
            <select
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              value={newTournamentForm.turfId}
              onChange={(event) => {
                setNewTournamentForm((prev) => ({
                  ...prev,
                  turfId: event.target.value,
                }));
                setTournamentMessage("");
              }}
            >
              {ownerTurfs.map((turf) => (
                <option key={turf.id} value={turf.id}>
                  {turf.name}
                </option>
              ))}
            </select>
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              type="date"
              value={newTournamentForm.date}
              onChange={(event) => {
                setNewTournamentForm((prev) => ({
                  ...prev,
                  date: event.target.value,
                }));
                setTournamentMessage("");
              }}
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              type="number"
              min="2"
              placeholder="Max teams"
              value={newTournamentForm.maxTeams}
              onChange={(event) => {
                setNewTournamentForm((prev) => ({
                  ...prev,
                  maxTeams: event.target.value,
                }));
                setTournamentMessage("");
              }}
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              type="number"
              min="0"
              placeholder="Entry fee"
              value={newTournamentForm.entryFee}
              onChange={(event) => {
                setNewTournamentForm((prev) => ({
                  ...prev,
                  entryFee: event.target.value,
                }));
                setTournamentMessage("");
              }}
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              type="number"
              min="0"
              placeholder="Prize pool"
              value={newTournamentForm.prizePool}
              onChange={(event) => {
                setNewTournamentForm((prev) => ({
                  ...prev,
                  prizePool: event.target.value,
                }));
                setTournamentMessage("");
              }}
            />
            <button
              type="submit"
              className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600 xl:col-span-3"
            >
              Create Tournament
            </button>
          </form>

          {tournamentMessage && (
            <p className="mb-4 text-sm font-semibold text-yellow-700">
              {tournamentMessage}
            </p>
          )}

          <div className="space-y-4">
            {tournaments.map((tournament) => {
              const turf = ownerTurfs.find(
                (item) => item.id === tournament.turfId,
              );
              const slotsLeft =
                tournament.maxTeams - tournament.registeredTeams.length;

              return (
                <article
                  key={tournament.id}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {tournament.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {turf?.name} • {tournament.date} • Entry Rs.{" "}
                        {tournament.entryFee} • Prize Rs. {tournament.prizePool}
                      </p>
                    </div>
                    <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">
                      {tournament.registeredTeams.length}/{tournament.maxTeams}{" "}
                      teams
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                    {tournament.registeredTeams.map((team) => (
                      <div
                        key={`${tournament.id}-${team.name}`}
                        className="rounded-lg border border-gray-200 p-3 text-sm"
                      >
                        <p className="font-semibold text-gray-900">
                          {team.name}
                        </p>
                        <p className="text-gray-700">
                          Captain: {team.captain} • Size: {team.size} •{" "}
                          {team.location}
                        </p>
                      </div>
                    ))}
                  </div>

                  {tournament.registeredTeams.length === 0 && (
                    <p className="mt-3 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">
                      No teams registered yet.
                    </p>
                  )}

                  <p className="mt-3 rounded-lg bg-yellow-50 px-3 py-2 text-sm text-yellow-800">
                    Teams are registered by users during tournament booking.
                    Owner can view and manage tournament progress here.
                  </p>

                  <p className="mt-2 text-xs font-medium text-gray-600">
                    Slots left: {Math.max(slotsLeft, 0)}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <BellRing className="h-5 w-5 text-purple-600" />
            User Directory + Broadcast Notifications
          </h2>

          <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="rounded-lg border border-gray-200 p-3 text-sm"
              >
                <p className="flex items-center gap-2 font-semibold text-gray-900">
                  <UserRound className="h-4 w-4 text-gray-600" /> {user.name}
                </p>
                <p className="mt-1 flex items-center gap-2 text-gray-700">
                  <Phone className="h-4 w-4" /> {user.phone}
                </p>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleBroadcastCampaign}
            className="grid grid-cols-1 gap-3 rounded-xl border border-gray-200 p-4 md:grid-cols-2"
          >
            <select
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              value={campaignForm.type}
              onChange={(event) => {
                setCampaignForm((prev) => ({
                  ...prev,
                  type: event.target.value,
                }));
                setCampaignMessage("");
              }}
            >
              <option value="discount">Discount</option>
              <option value="price-update">Price Update</option>
              <option value="sale">Sale</option>
              <option value="tournament">Tournament</option>
            </select>
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="Notification title"
              value={campaignForm.title}
              onChange={(event) => {
                setCampaignForm((prev) => ({
                  ...prev,
                  title: event.target.value,
                }));
                setCampaignMessage("");
              }}
            />
            <textarea
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm md:col-span-2"
              rows={3}
              placeholder="Write notification message for all users"
              value={campaignForm.message}
              onChange={(event) => {
                setCampaignForm((prev) => ({
                  ...prev,
                  message: event.target.value,
                }));
                setCampaignMessage("");
              }}
            />
            <button
              type="submit"
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 md:col-span-2"
            >
              Send to All Users ({users.length})
            </button>
          </form>

          {campaignMessage && (
            <p className="mt-3 text-sm font-semibold text-purple-700">
              {campaignMessage}
            </p>
          )}

          {campaigns.length > 0 && (
            <div className="mt-5 space-y-3">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="rounded-lg border border-gray-200 p-4 text-sm"
                >
                  <p className="font-semibold text-gray-900">
                    {campaign.title} ({campaign.type})
                  </p>
                  <p className="mt-1 text-gray-700">{campaign.message}</p>
                  <p className="mt-1 text-gray-600">
                    Sent to {campaign.recipients.length} users •{" "}
                    {campaign.createdAt.slice(0, 16).replace("T", " ")}
                  </p>
                  <p className="mt-1 text-gray-600">
                    Recipients:{" "}
                    {campaign.recipients
                      .slice(0, 3)
                      .map(
                        (recipient) => `${recipient.name} (${recipient.phone})`,
                      )
                      .join(", ")}
                    {campaign.recipients.length > 3 ? " ..." : ""}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
