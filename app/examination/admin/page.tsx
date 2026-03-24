/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

type Assessment = {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  duration: number;
};

export default function AdminDashboard() {
  const [activeAssessments, setActiveAssessments] = useState<Assessment[]>([]);
  const [pastAssessments, setPastAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const res = await fetch("/examination/api/admin/assignments");
        if (!res.ok) {
          const errorMessage = await res.text();
          throw new Error(`HTTP error! status: ${res.status}, ${errorMessage}`);
        }
        const data = await res.json();
        if (data && data.length > 0) {
          const now = new Date();
          const active = data.filter((a: any) => {
            const startTime = new Date(a.startTime);
            const endTime = new Date(
              startTime.getTime() + a.durationMinutes * 60000,
            );
            return endTime > now;
          });
          const past = data.filter((a: any) => {
            const startTime = new Date(a.startTime);
            const endTime = new Date(
              startTime.getTime() + a.durationMinutes * 60000,
            );
            return endTime <= now;
          });
          setActiveAssessments(active);
          setPastAssessments(past);
        }
      } catch {
        alert(
          "An error occurred while fetching assessments. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAssessments();
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <svg
            className="w-8 h-8 text-violet-500 animate-spin"
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
          <p className="text-sm text-gray-400 font-medium">
            Loading assessments...
          </p>
        </div>
      </div>
    );
  }

  const totalAssessments = activeAssessments.length + pastAssessments.length;

  return (
    <div
      className="p-8 space-y-8 min-h-screen bg-gray-50"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">
            Overview of all assessments
          </p>
        </div>
        <span className="text-xs font-medium text-gray-400 bg-white border border-gray-100 shadow-sm px-3 py-1.5 rounded-full">
          {totalAssessments} total assessment{totalAssessments !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 max-w-sm">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs font-medium text-gray-400">Active</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {activeAssessments.length}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-gray-300" />
            <p className="text-xs font-medium text-gray-400">Past</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {pastAssessments.length}
          </p>
        </div>
      </div>

      {/* Active Assessments */}
      <section>
        <div className="flex items-center gap-2.5 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Active Assessments
          </h2>
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
            {activeAssessments.length}
          </span>
        </div>

        {activeAssessments.length === 0 ? (
          <EmptyState message="No active assessments right now." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeAssessments.map((a) => (
              <AssessmentCard
                key={a._id}
                assessment={a}
                variant="active"
                formatDate={formatDate}
                onClick={() =>
                  redirect(`/examination/admin/assignments/${a._id}`)
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* Past Assessments */}
      <section>
        <div className="flex items-center gap-2.5 mb-4">
          <span className="w-2 h-2 rounded-full bg-gray-300" />
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Past Assessments
          </h2>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">
            {pastAssessments.length}
          </span>
        </div>

        {pastAssessments.length === 0 ? (
          <EmptyState message="No past assessments yet." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastAssessments.map((a) => (
              <AssessmentCard
                key={a._id}
                assessment={a}
                variant="past"
                formatDate={formatDate}
                onClick={() =>
                  redirect(`/examination/admin/assignments/${a._id}`)
                }
                onReview={() =>
                  router.push(`/examination/admin/assessment/${a._id}`)
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function AssessmentCard({
  assessment: a,
  variant,
  formatDate,
  onClick,
  onReview,
}: {
  assessment: Assessment;
  variant: "active" | "past";
  formatDate: (d: string) => string;
  onClick: () => void;
  onReview?: () => void;
}) {
  const isActive = variant === "active";

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group overflow-hidden flex flex-col ${
        isActive
          ? "border-emerald-100 hover:border-emerald-200"
          : "border-gray-100 hover:border-gray-200"
      }`}
    >
      {/* Top accent bar */}
      <div
        className={`h-1 w-full ${isActive ? "bg-linear-to-r from-emerald-400 to-teal-400" : "bg-linear-to-r from-gray-200 to-gray-300"}`}
      />

      <div className="p-5 flex flex-col flex-1">
        {/* Status badge */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
              isActive
                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                : "bg-gray-50 text-gray-500 border border-gray-100"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-400 animate-pulse" : "bg-gray-300"}`}
            />
            {isActive ? "Live" : "Ended"}
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
          {a.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">
          {a.description}
        </p>

        {/* Time info */}
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
              Start:{" "}
              <span className="text-gray-600 font-medium">
                {formatDate(a.startTime)}
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
              End:{" "}
              <span className="text-gray-600 font-medium">
                {formatDate(a.endTime)}
              </span>
            </span>
          </div>
        </div>

        {/* Review button for past */}
        {!isActive && onReview && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReview();
            }}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Review Results
          </button>
        )}
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl px-6 py-10 flex flex-col items-center justify-center text-center">
      <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center mb-3">
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
      <p className="text-sm font-medium text-gray-400">{message}</p>
    </div>
  );
}
