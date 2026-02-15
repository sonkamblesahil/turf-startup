"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  DollarSign,
  MapPin,
  Search,
  Trophy,
  Users,
} from "lucide-react";
import { mockTournaments, mockTurfs } from "@/lib/mockData";

export default function TournamentsPage() {
  const router = useRouter();
  const [tournaments, setTournaments] = useState(() =>
    mockTournaments.map((tournament) => ({
      ...tournament,
      registeredTeams: [...tournament.registeredTeams],
    })),
  );
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [teamNameByTournament, setTeamNameByTournament] = useState({});
  const [joinMessageByTournament, setJoinMessageByTournament] = useState({});

  useEffect(() => {
    const currentUserRaw = localStorage.getItem("currentUser");
    if (!currentUserRaw) {
      setCurrentUser(null);
      return;
    }

    try {
      const user = JSON.parse(currentUserRaw);
      setCurrentUser(user || null);
    } catch {
      setCurrentUser(null);
    }
  }, []);

  const isNormalUser = currentUser?.role === "user";

  const filteredTournaments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return tournaments;

    return tournaments.filter((tournament) => {
      const turf = mockTurfs.find((item) => item.id === tournament.turfId);
      const source = [
        tournament.name,
        tournament.date,
        turf?.name || "",
        turf?.location || "",
      ]
        .join(" ")
        .toLowerCase();

      return source.includes(query);
    });
  }, [searchQuery, tournaments]);

  const setTeamName = (tournamentId, value) => {
    setTeamNameByTournament((prev) => ({ ...prev, [tournamentId]: value }));
    setJoinMessageByTournament((prev) => ({ ...prev, [tournamentId]: "" }));
  };

  const joinTournament = (tournamentId) => {
    if (!isNormalUser) {
      setJoinMessageByTournament((prev) => ({
        ...prev,
        [tournamentId]: "Login as a normal user to participate.",
      }));
      return;
    }

    const targetTournament = tournaments.find(
      (item) => item.id === tournamentId,
    );
    if (!targetTournament) {
      setJoinMessageByTournament((prev) => ({
        ...prev,
        [tournamentId]: "Tournament not found.",
      }));
      return;
    }

    const alreadyRegisteredByCaptain = targetTournament.registeredTeams.some(
      (team) => team.captain === currentUser.name,
    );
    if (alreadyRegisteredByCaptain) {
      setJoinMessageByTournament((prev) => ({
        ...prev,
        [tournamentId]: "You are already registered in this tournament.",
      }));
      router.push(`/tournaments/${targetTournament.id}`);
      return;
    }

    const teamName = (teamNameByTournament[tournamentId] || "").trim();
    if (!teamName) {
      setJoinMessageByTournament((prev) => ({
        ...prev,
        [tournamentId]: "Enter your team name first.",
      }));
      return;
    }

    if (targetTournament.registeredTeams.length >= targetTournament.maxTeams) {
      setJoinMessageByTournament((prev) => ({
        ...prev,
        [tournamentId]: "Tournament slots are full.",
      }));
      return;
    }

    const duplicateTeamName = targetTournament.registeredTeams.some(
      (team) => team.name.toLowerCase() === teamName.toLowerCase(),
    );

    if (duplicateTeamName) {
      setJoinMessageByTournament((prev) => ({
        ...prev,
        [tournamentId]: "This team name is already registered.",
      }));
      return;
    }

    setTournaments((prev) =>
      prev.map((tournament) =>
        tournament.id !== tournamentId
          ? tournament
          : {
              ...tournament,
              registeredTeams: [
                ...tournament.registeredTeams,
                {
                  name: teamName,
                  captain: currentUser.name,
                  size: 7,
                  location: "Your City",
                },
              ],
            },
      ),
    );

    setJoinMessageByTournament((prev) => ({
      ...prev,
      [tournamentId]: "Team registered successfully.",
    }));
    setTeamNameByTournament((prev) => ({ ...prev, [tournamentId]: "" }));
    router.push(
      `/tournaments/${targetTournament.id}?team=${encodeURIComponent(teamName)}`,
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 text-gray-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <Trophy className="h-8 w-8 text-red-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-100">
            Tournaments
          </h1>
        </div>

        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/95 dark:shadow-lg dark:shadow-black/40">
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-zinc-100">
            Tournament Access
          </h2>
          <p className="text-sm text-gray-600 dark:text-zinc-400">
            Tournaments are organized by turf owners only. Users can view
            upcoming tournaments and use team matching to combine players.
          </p>
          <div className="mt-4">
            <Link
              href="/team-matching"
              className="inline-flex items-center rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/20"
            >
              Open Team Matching
            </Link>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 dark:border-zinc-800 dark:bg-zinc-900/95">
          <Search className="h-4 w-4 text-gray-400 dark:text-zinc-500" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search tournaments, turf, city, or date"
            className="w-full py-3 text-sm text-gray-900 outline-none dark:text-zinc-100"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTournaments.map((tournament) => {
            const turf = mockTurfs.find(
              (item) => item.id === tournament.turfId,
            );
            if (!turf) return null;

            return (
              <article
                key={tournament.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/95 dark:shadow-xl dark:shadow-black/45"
              >
                <img
                  src={turf.images[0]}
                  alt={turf.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100">
                    {tournament.name}
                  </h2>
                  <div className="mt-3 space-y-2 text-sm text-gray-700 dark:text-zinc-300">
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

                  <p className="mt-4 rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-200">
                    Prize Pool: Rs. {tournament.prizePool}
                  </p>

                  <div className="mt-4 rounded-lg border border-gray-200 p-3 text-sm text-gray-700 dark:border-zinc-700 dark:text-zinc-300">
                    <p className="mb-1 font-medium text-gray-900 dark:text-zinc-100">
                      Registered Teams
                    </p>
                    {tournament.registeredTeams.length === 0 ? (
                      <p className="text-gray-500 dark:text-zinc-500">
                        No teams registered yet.
                      </p>
                    ) : (
                      tournament.registeredTeams.map((team) => (
                        <p key={team.name}>
                          {team.name} • Captain: {team.captain} •{" "}
                          {team.location}
                        </p>
                      ))
                    )}
                  </div>
                  <p className="mt-3 text-xs text-gray-500 dark:text-zinc-400">
                    Slots: {tournament.registeredTeams.length}/
                    {tournament.maxTeams}
                  </p>

                  <div className="mt-4 border-t border-gray-200 pt-4 dark:border-zinc-700">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-zinc-400">
                      User Participation
                    </p>
                    <div className="flex gap-2">
                      <input
                        value={teamNameByTournament[tournament.id] || ""}
                        onChange={(event) =>
                          setTeamName(tournament.id, event.target.value)
                        }
                        placeholder="Your team name"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                        disabled={!isNormalUser}
                      />
                      <button
                        type="button"
                        onClick={() => joinTournament(tournament.id)}
                        disabled={!isNormalUser}
                        className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${
                          isNormalUser
                            ? "bg-red-600 hover:bg-red-700"
                            : "cursor-not-allowed bg-gray-400 dark:bg-zinc-700"
                        }`}
                      >
                        Join
                      </button>
                    </div>
                    {joinMessageByTournament[tournament.id] && (
                      <p className="mt-2 text-xs text-gray-600 dark:text-zinc-400">
                        {joinMessageByTournament[tournament.id]}
                      </p>
                    )}
                    {!isNormalUser && (
                      <p className="mt-2 text-xs text-gray-500 dark:text-zinc-500">
                        Only normal users can join tournaments.
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredTournaments.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600 dark:border-zinc-800 dark:bg-zinc-900/95 dark:text-zinc-400">
            No tournaments found for this search.
          </div>
        )}
      </div>
    </div>
  );
}
