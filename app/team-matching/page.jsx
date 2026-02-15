"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Handshake, MapPin, Search, Users } from "lucide-react";
import { mockMatchRequests, mockTurfs } from "@/lib/mockData";

const sportOptions = ["all", "football", "cricket", "box-cricket", "badminton"];

const requestSportMap = {
  match1: "football",
  match2: "football",
};

export default function TeamMatchingPage() {
  const [selectedSport, setSelectedSport] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [connectedIds, setConnectedIds] = useState([]);
  const [payerByRequest, setPayerByRequest] = useState({});
  const [chatInputByRequest, setChatInputByRequest] = useState({});
  const [chatByRequest, setChatByRequest] = useState({});
  const [message, setMessage] = useState("");
  const [teamRequests, setTeamRequests] = useState(
    mockMatchRequests.map((request) => ({
      ...request,
      sport: requestSportMap[request.id] || "football",
      createdBy: "other",
    })),
  );
  const [form, setForm] = useState({
    teamName: "",
    sport: "football",
    teamSize: "",
    preferredLocation: "",
    preferredDate: "",
    suggestedTurfId: mockTurfs[0]?.id || "",
  });

  const openRequests = useMemo(
    () =>
      teamRequests.filter((request) => {
        const sportMatch =
          selectedSport === "all" ? true : request.sport === selectedSport;
        const query = searchQuery.trim().toLowerCase();
        const textMatch =
          !query ||
          [
            request.teamName,
            request.sport,
            request.preferredLocation,
            request.preferredDate,
            getTurfName(request.suggestedTurfId),
          ]
            .join(" ")
            .toLowerCase()
            .includes(query);

        return sportMatch && textMatch;
      }),
    [searchQuery, selectedSport, teamRequests],
  );

  const getTurfName = (turfId) =>
    mockTurfs.find((turf) => turf.id === turfId)?.name || "Suggested Turf";

  const connectTeam = (requestId) => {
    if (connectedIds.includes(requestId)) return;
    setConnectedIds((prev) => [...prev, requestId]);
    setPayerByRequest((prev) => ({ ...prev, [requestId]: "you" }));
    setChatByRequest((prev) => ({
      ...prev,
      [requestId]: [
        {
          sender: "System",
          text: "You are connected. Decide payer and coordinate booking.",
        },
      ],
    }));
  };

  const setPayer = (requestId, payer) => {
    setPayerByRequest((prev) => ({ ...prev, [requestId]: payer }));
  };

  const sendChat = (requestId) => {
    const input = (chatInputByRequest[requestId] || "").trim();
    if (!input) return;

    setChatByRequest((prev) => ({
      ...prev,
      [requestId]: [...(prev[requestId] || []), { sender: "You", text: input }],
    }));
    setChatInputByRequest((prev) => ({ ...prev, [requestId]: "" }));
  };

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setMessage("");
  };

  const handleAddTeam = (event) => {
    event.preventDefault();

    if (
      !form.teamName.trim() ||
      !form.sport ||
      !form.teamSize ||
      !form.preferredLocation.trim() ||
      !form.preferredDate ||
      !form.suggestedTurfId
    ) {
      setMessage("Please fill all team details before posting.");
      return;
    }

    const teamSize = Number(form.teamSize);
    if (Number.isNaN(teamSize) || teamSize < 2) {
      setMessage("Team size should be at least 2 players.");
      return;
    }

    const newRequest = {
      id: `match-${Date.now()}`,
      userId: "user1",
      teamName: form.teamName.trim(),
      teamSize,
      preferredLocation: form.preferredLocation.trim(),
      preferredDate: form.preferredDate,
      status: "open",
      matchedWith: null,
      suggestedTurfId: form.suggestedTurfId,
      sport: form.sport,
      createdBy: "me",
    };

    setTeamRequests((prev) => [newRequest, ...prev]);
    setForm({
      teamName: "",
      sport: selectedSport === "all" ? "football" : selectedSport,
      teamSize: "",
      preferredLocation: "",
      preferredDate: "",
      suggestedTurfId: mockTurfs[0]?.id || "",
    });
    setMessage("Team request posted. Other users can now connect.");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 text-gray-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <Handshake className="h-7 w-7 text-red-400" />
          <h1 className="text-3xl font-bold">Team Matching</h1>
        </div>

        <p className="mb-5 text-sm text-gray-600 dark:text-zinc-400">
          Need more players? Pick your sport, connect with another team, and
          book together.
        </p>

        <form
          onSubmit={handleAddTeam}
          className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-lg dark:shadow-black/35"
        >
          <h2 className="mb-3 text-base font-semibold text-gray-900 dark:text-zinc-100">
            Add Team Request
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            <input
              value={form.teamName}
              onChange={(event) => setField("teamName", event.target.value)}
              placeholder="Team name"
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            />
            <select
              value={form.sport}
              onChange={(event) => setField("sport", event.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            >
              {sportOptions
                .filter((sport) => sport !== "all")
                .map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
            </select>
            <input
              value={form.teamSize}
              onChange={(event) => setField("teamSize", event.target.value)}
              placeholder="Team size"
              type="number"
              min="2"
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            />
            <input
              value={form.preferredLocation}
              onChange={(event) =>
                setField("preferredLocation", event.target.value)
              }
              placeholder="Preferred location"
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            />
            <input
              value={form.preferredDate}
              onChange={(event) =>
                setField("preferredDate", event.target.value)
              }
              type="date"
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            />
            <select
              value={form.suggestedTurfId}
              onChange={(event) =>
                setField("suggestedTurfId", event.target.value)
              }
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            >
              {mockTurfs.map((turf) => (
                <option key={turf.id} value={turf.id}>
                  {turf.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Post Team Request
            </button>
            {message && (
              <p className="text-sm text-gray-600 dark:text-zinc-300">
                {message}
              </p>
            )}
          </div>
        </form>

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-lg dark:shadow-black/35">
          <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-zinc-200">
            Filter by sport
          </label>
          <select
            value={selectedSport}
            onChange={(event) => setSelectedSport(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 md:w-72"
          >
            {sportOptions.map((sport) => (
              <option key={sport} value={sport}>
                {sport === "all" ? "All Sports" : sport}
              </option>
            ))}
          </select>
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 dark:border-zinc-700 dark:bg-zinc-950 md:w-96">
            <Search className="h-4 w-4 text-gray-400 dark:text-zinc-500" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search team, location, turf, or date"
              className="w-full py-2 text-sm text-gray-900 outline-none dark:text-zinc-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {openRequests.map((request) => {
            const connected = connectedIds.includes(request.id);
            const ownRequest = request.createdBy === "me";
            return (
              <article
                key={request.id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-xl dark:shadow-black/45"
              >
                <h2 className="text-lg font-bold text-gray-900 dark:text-zinc-100">
                  {request.teamName}
                </h2>
                <p className="mt-1 text-sm capitalize text-gray-600 dark:text-zinc-400">
                  Sport: {request.sport}
                </p>

                <div className="mt-3 space-y-2 text-sm text-gray-700 dark:text-zinc-300">
                  <p className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-red-400" />
                    Team size: {request.teamSize}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-400" />
                    {request.preferredLocation} • {request.preferredDate}
                  </p>
                  <p className="text-gray-600 dark:text-zinc-400">
                    Suggested Turf: {getTurfName(request.suggestedTurfId)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => connectTeam(request.id)}
                  disabled={ownRequest}
                  className={`mt-4 w-full rounded-lg px-4 py-2 text-sm font-semibold ${
                    ownRequest
                      ? "cursor-default border border-gray-300 bg-gray-100 text-gray-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                      : ""
                  } ${
                    connected
                      ? "cursor-default border border-gray-300 bg-gray-100 text-gray-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  {ownRequest
                    ? "Your Team Request"
                    : connected
                      ? "Connected"
                      : "Connect Team"}
                </button>

                {connected && !ownRequest && (
                  <>
                    <div className="mt-3 rounded-lg border border-gray-300 bg-gray-50 p-3 dark:border-zinc-700 dark:bg-zinc-950">
                      <label className="mb-2 block text-xs font-semibold text-gray-700 dark:text-zinc-300">
                        Who will pay?
                      </label>
                      <select
                        value={payerByRequest[request.id] || "you"}
                        onChange={(event) =>
                          setPayer(request.id, event.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                      >
                        <option value="you">You will pay</option>
                        <option value="other">
                          {request.teamName} will pay
                        </option>
                      </select>
                    </div>

                    <div className="mt-3 rounded-lg border border-gray-300 bg-gray-50 p-3 dark:border-zinc-700 dark:bg-zinc-950">
                      <p className="mb-2 text-xs font-semibold text-gray-700 dark:text-zinc-300">
                        Team Chat
                      </p>
                      <div className="mb-2 max-h-28 space-y-1 overflow-y-auto rounded-md border border-gray-300 bg-white p-2 text-xs text-gray-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                        {(chatByRequest[request.id] || []).map(
                          (item, index) => (
                            <p key={`${request.id}-msg-${index}`}>
                              <span className="font-semibold text-gray-900 dark:text-zinc-100">
                                {item.sender}:
                              </span>{" "}
                              {item.text}
                            </p>
                          ),
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input
                          value={chatInputByRequest[request.id] || ""}
                          onChange={(event) =>
                            setChatInputByRequest((prev) => ({
                              ...prev,
                              [request.id]: event.target.value,
                            }))
                          }
                          placeholder="Type a message"
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                        />
                        <button
                          type="button"
                          onClick={() => sendChat(request.id)}
                          className="rounded-lg bg-gray-800 px-3 py-2 text-xs font-semibold text-white hover:bg-gray-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                        >
                          Send
                        </button>
                      </div>
                    </div>

                    <Link
                      href={`/booking/${request.suggestedTurfId}`}
                      className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/20"
                    >
                      Book Turf Together (
                      {(payerByRequest[request.id] || "you") === "you"
                        ? "You Pay"
                        : `${request.teamName} Pays`}
                      )
                    </Link>
                  </>
                )}
              </article>
            );
          })}
        </div>

        {openRequests.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            No matching teams found for this sport yet.
          </div>
        )}
      </div>
    </div>
  );
}
