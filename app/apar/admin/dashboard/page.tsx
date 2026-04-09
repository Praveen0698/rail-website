"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Student {
  rollNo: string;
  name: string;
  dob: string;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function formatDob(dob: string) {
  if (!dob) return "—";
  const date = new Date(dob);
  if (isNaN(date.getTime())) return dob;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    String(date.getUTCDate()).padStart(2, "0") +
    " " +
    months[date.getUTCMonth()] +
    " " +
    date.getUTCFullYear()
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

// ─── MODAL ────────────────────────────────────────────────────────────────────

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

function CreateModal({ open, onClose, onCreated }: ModalProps) {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setRollNo("");
    setDob("");
    setError("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!rollNo.trim()) {
      setError("Roll Number is required.");
      return;
    }
    if (!dob) {
      setError("Date of Birth is required.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/apar/api/students", {
        name: name.trim(),
        rollNo: rollNo.trim(),
        dob,
      });
      reset();
      onCreated();
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to create student. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15, 23, 42, 0.45)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Modal */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#003580]/10 flex items-center justify-center">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#003580"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800 leading-none">
                Add New Student
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Fill in the candidate details below
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="px-6 py-5 flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="m-name"
                className="text-[11px] font-semibold uppercase tracking-wider text-slate-500"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="m-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                autoComplete="off"
                className="h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:border-[#003580] focus:ring-2 focus:ring-[#003580]/10"
              />
            </div>

            {/* Roll No */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="m-roll"
                className="text-[11px] font-semibold uppercase tracking-wider text-slate-500"
              >
                Roll Number <span className="text-red-500">*</span>
              </label>
              <input
                id="m-roll"
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="e.g. 21000012345678"
                autoComplete="off"
                className="h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-800 font-mono outline-none transition-all placeholder:text-slate-300 focus:border-[#003580] focus:ring-2 focus:ring-[#003580]/10"
              />
            </div>

            {/* DOB */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="m-dob"
                className="text-[11px] font-semibold uppercase tracking-wider text-slate-500"
              >
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                id="m-dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-800 outline-none transition-all focus:border-[#003580] focus:ring-2 focus:ring-[#003580]/10"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-100 px-3 py-2.5">
                <svg
                  className="shrink-0 mt-0.5 text-red-500"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span className="text-xs text-red-700">{error}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2.5 px-6 py-4 bg-slate-50 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClose}
              className="h-9 px-4 rounded-lg text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="h-9 px-5 rounded-lg text-xs font-semibold text-white bg-[#003580] hover:bg-[#002560] disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating…
                </>
              ) : (
                <>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Add Student
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── DELETE CONFIRM MODAL ─────────────────────────────────────────────────────

interface DeleteModalProps {
  student: Student | null;
  onClose: () => void;
  onDeleted: () => void;
}

function DeleteModal({ student, onClose, onDeleted }: DeleteModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!student) return;
    setLoading(true);
    setError("");
    try {
      await axios.delete(`/apar/api/students/${student.rollNo}`);
      onDeleted();
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to delete. Please try again.",
      );
      setLoading(false);
    }
  };

  if (!student) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15, 23, 42, 0.45)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 pt-6 pb-4 text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-slate-800 mb-1">
            Remove Student?
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            You are about to remove{" "}
            <span className="font-semibold text-slate-700">{student.name}</span>{" "}
            <span className="font-mono text-slate-400">({student.rollNo})</span>
            . This action cannot be undone.
          </p>
          {error && <p className="text-xs text-red-600 mt-3">{error}</p>}
        </div>
        <div className="flex items-center gap-2.5 px-6 py-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-9 rounded-lg text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 h-9 rounded-lg text-xs font-semibold text-white bg-red-500 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Removing…
              </>
            ) : (
              "Yes, Remove"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────

const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("apar_session_token", { path: "/" });
    Cookies.remove("apar_userRole", { path: "/" });
    sessionStorage.clear();
    router.replace("/apar");
  };

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setFetchError("");
    try {
      const res = await axios.get("/apar/api/students");
      // API may return an array directly, or wrap it: { students: [] } / { data: [] }
      const raw = res.data;
      const list: Student[] = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.students)
          ? raw.students
          : Array.isArray(raw?.data)
            ? raw.data
            : [];
      setStudents(list);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setFetchError(err.response?.data?.message || "Failed to load students.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.name?.toLowerCase().includes(q) || s.rollNo?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Students
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              {students.length} registered candidate
              {students.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-sm font-semibold transition-all"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
            <button
              type="button"
              onClick={() => setShowCreate(true)}
              className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-[#003580] hover:bg-[#002560] text-white text-sm font-semibold transition-all shadow-sm"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Student
            </button>
          </div>
        </div>

        {/* Search + table card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
            <div className="relative flex-1 max-w-xs">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or roll no…"
                className="w-full h-9 pl-8 pr-3 rounded-lg border border-slate-200 text-sm text-slate-800 outline-none placeholder:text-slate-300 focus:border-[#003580] focus:ring-2 focus:ring-[#003580]/10 transition-all"
              />
            </div>
            <button
              type="button"
              onClick={fetchStudents}
              title="Refresh"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-[#003580] hover:border-[#003580] transition-all"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 4v6h6" />
                <path d="M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
              </svg>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 w-8">
                    #
                  </th>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Candidate
                  </th>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Roll Number
                  </th>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Date of Birth
                  </th>
                  <th className="text-right px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Loading */}
                {loading && (
                  <tr>
                    <td colSpan={5} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-7 h-7 border-[2.5px] border-[#003580]/20 border-t-[#003580] rounded-full animate-spin" />
                        <span className="text-xs text-slate-400">
                          Loading students…
                        </span>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Error */}
                {!loading && fetchError && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <svg
                          className="text-red-400"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <p className="text-xs text-red-500">{fetchError}</p>
                        <button
                          onClick={fetchStudents}
                          className="text-xs text-[#003580] underline mt-1"
                        >
                          Retry
                        </button>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Empty */}
                {!loading && !fetchError && filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-1">
                          <svg
                            className="text-slate-400"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-slate-500">
                          {search
                            ? "No students match your search"
                            : "No students yet"}
                        </p>
                        {!search && (
                          <p className="text-xs text-slate-400">
                            Click{" "}
                            <span className="font-semibold">Add Student</span>{" "}
                            to get started.
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                )}

                {/* Rows */}
                {!loading &&
                  !fetchError &&
                  filtered.map((student, idx) => (
                    <tr
                      key={student.rollNo}
                      className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors group"
                    >
                      <td className="px-5 py-3.5 text-xs text-slate-400 tabular-nums">
                        {idx + 1}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#003580]/10 flex items-center justify-center shrink-0">
                            <span className="text-[11px] font-bold text-[#003580]">
                              {initials(student.name)}
                            </span>
                          </div>
                          <span className="font-medium text-slate-800 text-sm">
                            {student.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                          {student.rollNo}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-slate-500">
                        {formatDob(student.dob)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(student)}
                          className="inline-flex cursor-pointer items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-semibold text-red-500 border border-red-100 bg-red-50 hover:bg-red-100 hover:border-red-200 transition-all"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                          </svg>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Footer count */}
          {!loading && !fetchError && filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Showing {filtered.length} of {students.length} student
                {students.length !== 1 ? "s" : ""}
              </span>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-xs text-[#003580] hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={fetchStudents}
      />
      <DeleteModal
        student={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onDeleted={fetchStudents}
      />
    </div>
  );
};

export default Dashboard;
