"use client";

import { useMemo, useState } from "react";
import { Calendar, DollarSign, MapPin, Trophy, Users } from "lucide-react";
import { mockMatchRequests, mockTournaments, mockTurfs } from "@/lib/mockData";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState(mockTournaments);
  const [form, setForm] = useState({
    name: "",
    turfId: mockTurfs[0]?.id ?? "",
    date: "",
    entryFee: "",
    prizePool: "",
    maxTeams: "",
  });
  const [teamName, setTeamName] = useState("");
  const [hostMessage, setHostMessage] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");

  const turfNameMap = useMemo(
    () => Object.fromEntries(mockTurfs.map((turf) => [turf.id, turf.name])),
    [],
  );

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setHostMessage("");
  };

  const handleHostTournament = (event) => {
    event.preventDefault();
    const required = [
      form.name,
      form.turfId,
      form.date,
      form.entryFee,
      form.prizePool,
      form.maxTeams,
    ];

    if (required.some((value) => !String(value).trim())) {
      setHostMessage("Please complete all tournament fields.");
      return;
    }

    const maxTeams = Number(form.maxTeams);
    const entryFee = Number(form.entryFee);
    const prizePool = Number(form.prizePool);

    if (maxTeams < 2 || entryFee < 0 || prizePool < 0) {
      setHostMessage(
        "Use valid numeric values for teams, entry fee, and prize.",
      );
      return;
    }

    const newTournament = {
      id: `tournament-${Date.now()}`,
      turfId: form.turfId,
      ownerId: "owner1",
      name: form.name.trim(),
      date: form.date,
      startTime: "09:00",
      endTime: "18:00",
      maxTeams,
      registeredTeams: [],
      entryFee,
      prizePool,
      status: "upcoming",
    };

    setTournaments((prev) => [newTournament, ...prev]);
    setForm({
      name: "",
      turfId: mockTurfs[0]?.id ?? "",
      date: "",
      entryFee: "",
      prizePool: "",
      maxTeams: "",
    });
    setHostMessage("Tournament created successfully.");
  };

  const handleRegisterTeam = (tournamentId) => {
    const trimmedTeamName = teamName.trim();
    if (!trimmedTeamName) {
      setRegistrationMessage("Enter a team name before registering.");
      return;
    }

    setTournaments((prev) =>
      prev.map((tournament) => {
        if (tournament.id !== tournamentId) return tournament;
        if (tournament.registeredTeams.length >= tournament.maxTeams) {
          return tournament;
        }

        const exists = tournament.registeredTeams.some(
          (team) => team.name.toLowerCase() === trimmedTeamName.toLowerCase(),
        );
        if (exists) {
          return tournament;
        }

        return {
          ...tournament,
          registeredTeams: [
            ...tournament.registeredTeams,
            {
              name: trimmedTeamName,
              captain: "You",
              size: 7,
              location: "Your City",
            },
          ],
        };
      }),
    );

    setRegistrationMessage("Team registration updated.");
    setTeamName("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <Trophy className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Tournaments</h1>
        </div>

        <form
          onSubmit={handleHostTournament}
          className="mb-8 rounded-xl bg-white p-6 shadow"
        >
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Host Tournament (Owner)
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              className="rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Tournament name"
              value={form.name}
              onChange={(event) => setField("name", event.target.value)}
            />
            <select
              className="rounded-lg border border-gray-300 px-3 py-2"
              value={form.turfId}
              onChange={(event) => setField("turfId", event.target.value)}
            >
              {mockTurfs.map((turf) => (
                <option key={turf.id} value={turf.id}>
                  {turf.name}
                </option>
              ))}
            </select>
            <input
              className="rounded-lg border border-gray-300 px-3 py-2"
              type="date"
              value={form.date}
              onChange={(event) => setField("date", event.target.value)}
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Entry fee"
              type="number"
              min="0"
              value={form.entryFee}
              onChange={(event) => setField("entryFee", event.target.value)}
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Prize pool"
              type="number"
              min="0"
              value={form.prizePool}
              onChange={(event) => setField("prizePool", event.target.value)}
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Max teams"
              type="number"
              min="2"
              value={form.maxTeams}
              onChange={(event) => setField("maxTeams", event.target.value)}
            />
          </div>
          {hostMessage && (
            <p className="mt-3 text-sm font-medium text-green-700">
              {hostMessage}
            </p>
          )}
          <button
            type="submit"
            className="mt-4 rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white hover:bg-green-700"
          >
            Create Tournament
          </button>
        </form>

        <div className="mb-8 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Team Matchmaking
          </h2>
          <p className="text-sm text-gray-600">
            If team size is less, we match teams with similar location and
            preferred date, then suggest nearest turf.
          </p>
          <div className="mt-4 space-y-2 text-sm text-gray-700">
            {mockMatchRequests.map((request) => (
              <p key={request.id}>
                {request.teamName} ({request.teamSize}) •{" "}
                {request.preferredLocation} • {request.preferredDate} •{" "}
                {request.status === "matched"
                  ? `matched with ${request.matchedWith}`
                  : "waiting for match"}
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tournaments.map((tournament) => {
            const turf = mockTurfs.find(
              (item) => item.id === tournament.turfId,
            );
            if (!turf) return null;

            return (
              <article
                key={tournament.id}
                className="overflow-hidden rounded-xl bg-white shadow"
              >
                <img
                  src={turf.images[0]}
                  alt={turf.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {tournament.name}
                  </h2>
                  <div className="mt-3 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {turf.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {tournament.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {tournament.registeredTeams.length}/{tournament.maxTeams}{" "}
                      teams
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Entry Rs. {tournament.entryFee}
                    </div>
                  </div>

                  <p className="mt-4 rounded bg-green-50 px-3 py-2 text-sm font-semibold text-green-800">
                    Prize Pool: Rs. {tournament.prizePool}
                  </p>

                  <div className="mt-4 rounded-lg border border-gray-200 p-3 text-sm text-gray-700">
                    <p className="mb-1 font-medium text-gray-900">
                      Registered Teams
                    </p>
                    {tournament.registeredTeams.map((team) => (
                      <p key={team.name}>
                        {team.name} • Captain: {team.captain} • {team.location}
                      </p>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <input
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      placeholder="Your team name"
                      value={teamName}
                      onChange={(event) => {
                        setTeamName(event.target.value);
                        setRegistrationMessage("");
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRegisterTeam(tournament.id)}
                      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                    >
                      Register
                    </button>
                  </div>
                  {registrationMessage && (
                    <p className="mt-2 text-sm font-medium text-green-700">
                      {registrationMessage}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    Venue: {turfNameMap[tournament.turfId]}
                  </p>
                  <button
                    type="button"
                    disabled={
                      tournament.registeredTeams.length >= tournament.maxTeams
                    }
                    onClick={() => handleRegisterTeam(tournament.id)}
                    className={`mt-3 w-full rounded-lg py-2 font-semibold text-white ${
                      tournament.registeredTeams.length >= tournament.maxTeams
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {tournament.registeredTeams.length >= tournament.maxTeams
                      ? "Slots Full"
                      : "Quick Register"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
