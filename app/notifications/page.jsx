"use client";

import { useMemo, useState } from "react";
import { Bell, Calendar, DollarSign, Tag, Trophy } from "lucide-react";
import { mockNotifications } from "@/lib/mockData";

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all");
  const notifications = mockNotifications;

  const filtered = useMemo(() => {
    if (filter === "all") return notifications;
    if (filter === "unread") return notifications.filter((item) => !item.read);
    return notifications.filter((item) => item.type === filter);
  }, [filter, notifications]);

  const getIcon = (type) => {
    if (type === "booking" || type === "reminder" || type === "timing_over") {
      return <Calendar className="h-5 w-5 text-green-600" />;
    }
    if (type === "discount") return <Tag className="h-5 w-5 text-blue-600" />;
    if (type === "competition")
      return <Trophy className="h-5 w-5 text-yellow-600" />;
    if (type === "bidding" || type === "refund")
      return <DollarSign className="h-5 w-5 text-purple-600" />;
    return <Bell className="h-5 w-5 text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <Bell className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {["all", "unread", "booking", "discount", "competition"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  filter === tab
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {tab}
              </button>
            ),
          )}
        </div>

        <div className="space-y-3">
          {filtered.map((notification) => (
            <div
              key={notification.id}
              className="rounded-xl bg-white p-4 shadow"
            >
              <div className="flex gap-3">
                <div className="mt-0.5">{getIcon(notification.type)}</div>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {notification.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {notification.message}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {notification.createdAt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
