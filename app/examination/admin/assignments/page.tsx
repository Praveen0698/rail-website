"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Assignment {
  _id: string;
  title: string;
  description?: string;
  startTime: string;
  durationMinutes: number;
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
        setAssignments(data);
      } catch (err) {
        console.log("Failed to fetch assignments", err);
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

  const filtered = assignments.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      (a.description || "").toLowerCase().includes(search.toLowerCase()),
  );

  const statusConfig = {
    live: {
      label: "Live",
      dot: "bg-emerald-400 animate-pulse",
      badge: "bg-emerald-50 text-emerald-600 border-emerald-100",
      bar: "from-emerald-400 to-teal-400",
    },
    upcoming: {
      label: "Upcoming",
      dot: "bg-amber-400",
      badge: "bg-amber-50 text-amber-600 border-amber-100",
      bar: "from-amber-300 to-yellow-400",
    },
    ended: {
      label: "Ended",
      dot: "bg-gray-300",
      badge: "bg-gray-50 text-gray-500 border-gray-100",
      bar: "from-gray-200 to-gray-300",
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
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage and review all assessments
          </p>
        </div>
        {/* <Link href="/examination/admin/assignments/create">
          <span className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors cursor-pointer">
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
            Create New
          </span>
        </Link> */}
      </div>

      {/* Search + count */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
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
          <span className="text-xs font-medium text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full shrink-0">
            {filtered.length} of {assignments.length}
          </span>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
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
            <p className="text-sm text-gray-400">Loading assignments...</p>
          </div>
        </div>
      ) : filtered.length === 0 ? (
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-400">
            {search
              ? "No assignments match your search."
              : "No assignments found."}
          </p>
          {!search && (
            <Link href="/examination/admin/assignments/create">
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-violet-600 hover:text-violet-700 cursor-pointer">
                <svg
                  className="w-3.5 h-3.5"
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
                Create your first assignment
              </span>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((assignment) => {
            const status = getStatus(assignment);
            const cfg = statusConfig[status];
            return (
              <div
                key={assignment._id}
                onClick={() =>
                  router.push(
                    `/examination/admin/assignments/${assignment._id}`,
                  )
                }
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer group overflow-hidden flex flex-col"
              >
                {/* Top accent bar */}
                <div className={`h-1 w-full bg-linear-to-r ${cfg.bar}`} />

                <div className="p-5 flex flex-col flex-1">
                  {/* Status badge + arrow */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${cfg.badge}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </span>
                    <svg
                      className="w-4 h-4 text-gray-300 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all"
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
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mb-1.5 leading-snug line-clamp-2">
                    {assignment.title}
                  </h3>
                  {assignment.description && (
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">
                      {assignment.description}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="space-y-1.5 border-t border-gray-50 pt-3 mt-auto">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
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
                      <span>
                        Starts:{" "}
                        <span className="text-gray-600 font-medium">
                          {formatDate(assignment.startTime)}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
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
                      <span>
                        Duration:{" "}
                        <span className="text-gray-600 font-medium">
                          {assignment.durationMinutes} mins
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
