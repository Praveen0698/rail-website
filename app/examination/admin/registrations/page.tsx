/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewRegistrations() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loadingRegs, setLoadingRegs] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("/examination/api/admin/assignments")
      .then((res) => setAssignments(res.data));
  }, []);

  const fetchRegistrations = async (assignmentId: string) => {
    setSelectedId(assignmentId);
    setRegistrations([]);
    setSearch("");
    if (!assignmentId) return;
    setLoadingRegs(true);
    try {
      const res = await axios.get(
        `/examination/api/admin/registrations?assignmentId=${assignmentId}`,
      );
      setRegistrations(res.data);
    } finally {
      setLoadingRegs(false);
    }
  };

  const selectedAssignment = assignments.find((a) => a._id === selectedId);

  const filtered = registrations.filter(
    (r) =>
      r.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.email?.toLowerCase().includes(search.toLowerCase()),
  );

  const Avatar = ({ name, email }: { name?: string; email: string }) => {
    const initials = name
      ? name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : email[0].toUpperCase();
    const colors = [
      "bg-violet-100 text-violet-600",
      "bg-blue-100 text-blue-600",
      "bg-emerald-100 text-emerald-600",
      "bg-amber-100 text-amber-600",
      "bg-rose-100 text-rose-600",
    ];
    const color = colors[email.charCodeAt(0) % colors.length];
    return (
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${color}`}
      >
        {initials}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-gray-50 p-8"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registrations</h1>
          <p className="text-sm text-gray-400 mt-1">
            View users registered for each assessment
          </p>
        </div>
        {registrations.length > 0 && (
          <span className="text-xs font-medium text-gray-400 bg-white border border-gray-100 shadow-sm px-3 py-1.5 rounded-full">
            {registrations.length} registered
          </span>
        )}
      </div>

      {/* Select + Search row */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Select Assessment
        </label>
        <div className="relative">
          <svg
            className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <select
            className="w-full appearance-none border border-gray-200 bg-gray-50 pl-10 pr-10 py-2.5 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent focus:bg-white transition-all cursor-pointer"
            value={selectedId}
            onChange={(e) => fetchRegistrations(e.target.value)}
          >
            <option value="">Choose an assignment...</option>
            {assignments.map((a) => (
              <option key={a._id} value={a._id}>
                {a.title}
              </option>
            ))}
          </select>
          <svg
            className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {selectedAssignment && (
          <div className="mt-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <p className="text-xs text-gray-500">
              Showing registrations for{" "}
              <span className="font-semibold text-gray-700">
                {selectedAssignment.title}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Results */}
      {loadingRegs ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <svg
              className="w-7 h-7 text-violet-500 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <p className="text-sm text-gray-400">Fetching registrations...</p>
          </div>
        </div>
      ) : selectedId && registrations.length === 0 && !loadingRegs ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-14 flex flex-col items-center text-center">
          <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center mb-3">
            <svg
              className="w-5 h-5 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-400">
            No registrations found
          </p>
          <p className="text-xs text-gray-300 mt-1">
            No users have registered for this assessment yet.
          </p>
        </div>
      ) : registrations.length > 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Table toolbar */}
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-xs">
              <svg
                className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 bg-gray-50 pl-9 pr-3.5 py-2 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent focus:bg-white transition-all"
              />
            </div>
            <span className="text-xs text-gray-400 shrink-0">
              {filtered.length} of {registrations.length}
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400 w-12">
                    #
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    User
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Email
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Registered At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-10 text-center text-sm text-gray-400"
                    >
                      No results match your search.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r, idx) => (
                    <tr
                      key={r._id}
                      className="hover:bg-gray-50/70 transition-colors"
                    >
                      <td className="px-5 py-3.5 text-xs text-gray-400 font-medium">
                        {idx + 1}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar name={r.name} email={r.email} />
                          <span className="font-semibold text-gray-800 text-sm">
                            {r.name || "—"}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 text-sm">
                        {r.email}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                          <svg
                            className="w-3 h-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {new Date(r.registeredAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
}
