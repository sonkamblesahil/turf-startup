import { Calendar, DollarSign, MapPin, Trophy, Users } from "lucide-react";
import { mockMatchRequests, mockTournaments, mockTurfs } from "@/lib/mockData";

export default function TournamentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <Trophy className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Tournaments</h1>
        </div>

        <div className="mb-8 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Host Tournament (Owner)
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              className="rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Tournament name"
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Turf"
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2"
              type="date"
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Entry fee"
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Prize pool"
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Max teams"
            />
          </div>
          <button className="mt-4 rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white hover:bg-green-700">
            Create Tournament (Demo)
          </button>
        </div>

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
          {mockTournaments.map((tournament) => {
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

                  <button className="mt-4 w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700">
                    Register Team (Demo)
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
