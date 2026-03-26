"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Assignment {
  _id: string;
  title: string;
  startTime: string;
  durationMinutes: number;
  marks?: number;
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await fetch("/examination/api/admin/assignments");
        const data = await res.json();
        if (Array.isArray(data)) setAssignments(data);
        else if (Array.isArray(data?.data)) setAssignments(data.data);
        else {
          console.error("Invalid assignments response:", data);
          setAssignments([]);
        }
      } catch (err) {
        console.log("Failed to fetch assignments", err);
        setAssignments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const now = new Date();

  const getStatus = (assignment: Assignment): "upcoming" | "live" | "ended" => {
    const start = new Date(assignment.startTime);
    const end = new Date(start.getTime() + assignment.durationMinutes * 60000);
    if (now < start) return "upcoming";
    if (now >= start && now <= end) return "live";
    return "ended";
  };

  const filtered = assignments?.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()),
  );

  const statusConfig = {
    live: {
      label: "Live",
      dot: "bg-emerald-400 animate-pulse",
      badge: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    upcoming: {
      label: "Upcoming",
      dot: "bg-amber-400",
      badge: "bg-amber-50 text-amber-600 border-amber-100",
    },
    ended: {
      label: "Ended",
      dot: "bg-gray-300",
      badge: "bg-gray-50 text-gray-400 border-gray-100",
    },
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div
      className="min-h-screen bg-gray-50 p-8"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {/* Page header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage and review all assessments
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-400 bg-white border border-gray-100 shadow-sm px-3 py-1.5 rounded-full">
            {assignments.length} assignment{assignments.length !== 1 ? "s" : ""}
          </span>
          {/* <button
            onClick={() => router.push("/examination/admin/assignments/create")}
            className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create
          </button> */}
        </div>
      </div>

      {/* Search bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-800">
            All Assignments
          </h2>
          <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="px-5 py-3">
          <div className="relative">
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
              placeholder="Search assignments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 bg-gray-50 pl-9 pr-3.5 py-2.5 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center mb-3">
              <svg
                className="w-5 h-5 text-gray-300 animate-spin"
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
            </div>
            <p className="text-sm font-medium text-gray-400">
              Loading assignments...
            </p>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex flex-col items-center justify-center py-20 text-center">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-400">
              No assignments found
            </p>
            <p className="text-xs text-gray-300 mt-1">
              Create your first assignment using the button above
            </p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((assignment) => {
            const status = getStatus(assignment);
            const cfg = statusConfig[status];

            return (
              <div
                key={assignment._id}
                onClick={() => {
                  if (status !== "ended")
                    router.push(
                      `/examination/admin/assignments/${assignment._id}`,
                    );
                }}
                className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all
                  ${status === "ended" ? "opacity-60 cursor-not-allowed" : "hover:shadow-md cursor-pointer"}`}
              >
                {/* Top accent line */}
                <div
                  className={`h-1 w-full
                  ${status === "live" ? "bg-emerald-400" : status === "upcoming" ? "bg-amber-400" : "bg-gray-200"}`}
                />

                <div className="p-5">
                  {/* Status badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${cfg.badge}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`}
                      />
                      {cfg.label}
                    </span>
                    {status !== "ended" && (
                      <svg
                        className="w-4 h-4 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 leading-snug">
                    {assignment.title}
                  </h3>

                  {/* Meta info */}
                  <div className="space-y-1.5 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-3.5 h-3.5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-gray-600">
                        {formatDate(assignment.startTime)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-3.5 h-3.5 shrink-0"
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
                      <span className="text-gray-600">
                        {assignment.durationMinutes} mins
                      </span>
                    </div>
                  </div>

                  {status === "upcoming" && (
                    <p className="mt-3 text-xs text-amber-500 font-medium">
                      Exam not started yet
                    </p>
                  )}
                  {status === "ended" && (
                    <p className="mt-3 text-xs text-gray-400">Exam has ended</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
