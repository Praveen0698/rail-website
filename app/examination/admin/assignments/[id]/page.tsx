/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

const ClientSelect = dynamic(() => import("@/components/mcq/ReactSelect"), {
  ssr: false,
});

interface Question {
  _id: string;
  text: string;
}

function toLocalDateTimeString(date: Date): string {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset)?.toISOString().slice(0, 16);
}

const inputClass =
  "w-full border border-gray-200 bg-gray-50 px-3.5 py-2.5 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent focus:bg-white transition-all";

const labelClass = "block text-xs font-medium text-gray-500 mb-1.5";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
        {label}
      </p>
      <div className="text-sm text-gray-800">{children}</div>
    </div>
  );
}

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-md bg-violet-50 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

export default function AssessmentReviewPage() {
  const { id } = useParams();
  const [assessment, setAssessment] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [selectAllQuestions, setSelectAllQuestions] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSelectAllQuestions = () => {
    if (selectAllQuestions) {
      setFormData((prev: any) => ({ ...prev, questions: [] }));
      setSelectAllQuestions(false);
    } else {
      setFormData((prev: any) => ({
        ...prev,
        questions: allQuestions.map((q) => q._id),
      }));
      setSelectAllQuestions(true);
    }
  };

  useEffect(() => {
    if (!formData.questions || !allQuestions.length) return;
    setSelectAllQuestions(formData.questions.length === allQuestions.length);
  }, [formData.questions, allQuestions]);

  useEffect(() => {
    const fetchData = async () => {
      const [assignmentRes, usersRes, questionsRes] = await Promise.all([
        fetch(`/examination/api/admin/assignments/${id}`),
        fetch("/examination/api/admin/users"),
        fetch("/examination/api/admin/questions"),
      ]);
      const assignmentData = await assignmentRes.json();
      const usersData = await usersRes.json();
      const questionsData = await questionsRes.json();
      setAssessment(assignmentData);
      setFormData({
        ...assignmentData,
        startTime: toLocalDateTimeString(new Date(assignmentData.startTime)),
        users: assignmentData?.users || [],
        questions: assignmentData.questionIds?.map((q: any) => q._id),
        companyName: assignmentData.companyName || "",
      });
      setAllUsers(
        usersData.map((u: any) => ({
          value: u._id,
          label: `${u.name} (${u.rollNo}) - ${u.designation}`,
          _id: u._id,
          name: u.name,
          rollNo: u.rollNo,
          designation: u.designation,
        })),
      );
      setAllQuestions(questionsData);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (allUsers.length && assessment?.users) {
      setFormData((prev: any) => ({
        ...prev,
        users: assessment.users,
      }));
    }
  }, [allUsers, assessment]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, values: string[]) => {
    setFormData((prev: any) => ({ ...prev, [name]: values }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const payload = {
        ...formData,
        startTime: new Date(formData.startTime).toISOString(),
      };
      const res = await fetch(`/examination/api/admin/assignments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const updated = await res.json();
        setAssessment(updated);
        setIsEditing(false);
      }
    } catch (err) {
      console.log("Error updating assignment:", err);
    } finally {
      setSaving(false);
    }
  };

  const getStatus = () => {
    if (!assessment) return null;
    const start = new Date(assessment.startTime);
    const end = new Date(start.getTime() + assessment.durationMinutes * 60000);
    const now = new Date();
    if (now < start)
      return {
        label: "Upcoming",
        dot: "bg-amber-400",
        badge: "bg-amber-50 text-amber-600 border-amber-100",
      };
    if (now >= start && now <= end)
      return {
        label: "Live",
        dot: "bg-emerald-400 animate-pulse",
        badge: "bg-emerald-50 text-emerald-600 border-emerald-100",
      };
    return {
      label: "Ended",
      dot: "bg-gray-300",
      badge: "bg-gray-50 text-gray-500 border-gray-100",
    };
  };

  if (!assessment) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
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
          <p className="text-sm text-gray-400">Loading assessment...</p>
        </div>
      </div>
    );
  }

  const status = getStatus();

  return (
    <div
      className="min-h-screen bg-gray-50 p-8"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/examination/admin/assignments">
              <span className="text-xs text-gray-400 hover:text-violet-600 cursor-pointer transition-colors flex items-center gap-1">
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Assignments
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {isEditing ? (
                <input
                  type="text"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-violet-400 focus:outline-none pb-0.5"
                />
              ) : (
                assessment.title
              )}
            </h1>
            {status && (
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${status.badge}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit Assignment
            </button>
          ) : (
            <>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
              >
                {saving ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
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
                    Saving...
                  </>
                ) : (
                  <>
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setFormData({
                    ...assessment,
                    startTime: toLocalDateTimeString(
                      new Date(assessment.startTime),
                    ),
                    users: assessment.users || [],
                    questions: assessment.questionIds?.map((q: any) => q._id),
                    companyName: assessment.companyName || "",
                  });
                  setIsEditing(false);
                }}
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div className="max-w-4xl space-y-5">
        {/* Scheduling */}
        <SectionCard
          title="Scheduling"
          icon={
            <svg
              className="w-3.5 h-3.5 text-violet-600"
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
          }
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              {isEditing ? (
                <>
                  <label className={labelClass}>Start Time</label>
                  <input
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className={`${inputClass} bg-white`}
                  />
                </>
              ) : (
                <Field label="Start Time">
                  <p className="text-gray-700">
                    {new Date(assessment.startTime).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </Field>
              )}
            </div>
            <div>
              {isEditing ? (
                <>
                  <label className={labelClass}>Duration</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="durationMinutes"
                      value={formData.durationMinutes}
                      onChange={handleChange}
                      className={`${inputClass} pr-14`}
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                      mins
                    </span>
                  </div>
                </>
              ) : (
                <Field label="Duration">
                  <p className="text-gray-700">
                    {assessment.durationMinutes} minutes
                  </p>
                </Field>
              )}
            </div>
          </div>
        </SectionCard>

        {/* Users */}
        <SectionCard
          title="Assigned Users"
          icon={
            <svg
              className="w-3.5 h-3.5 text-violet-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          }
        >
          {isEditing ? (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={`${labelClass} mb-0`}>Select Users</label>
                {formData.users?.length > 0 && (
                  <span className="text-xs text-violet-600 font-medium bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full">
                    {formData.users.length} selected
                  </span>
                )}
              </div>
              <ClientSelect
                isMulti
                options={allUsers}
                value={
                  allUsers.length > 0
                    ? allUsers.filter((opt) =>
                        formData.users?.some(
                          (u: any) => String(u._id) === String(opt.value),
                        ),
                      )
                    : []
                }
                onChange={(selected: any) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    users: selected
                      ? selected.map((s: any) => ({
                          _id: s._id,
                          name: s.name,
                          rollNo: s.rollNo,
                          designation: s.designation,
                        }))
                      : [],
                  }))
                }
                placeholder="Search and select users..."
                className="text-sm text-black"
                menuPortalTarget={
                  typeof window !== "undefined" ? document.body : null
                }
                styles={{
                  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
                }}
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {assessment.users?.length === 0 ? (
                <p className="text-sm text-gray-400">No users assigned.</p>
              ) : (
                assessment.users?.map((user: any, idx: number) => {
                  const name = user?.name;
                  const rollNo = user?.rollNo;
                  return (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-xs font-medium bg-gray-50 border border-gray-100 text-gray-600 px-2.5 py-1.5 rounded-full"
                    >
                      <span className="w-4 h-4 rounded-full bg-violet-100 text-violet-600 text-[9px] font-bold flex items-center justify-center">
                        {name?.[0]?.toUpperCase()}
                      </span>
                      {name} ({rollNo})
                    </span>
                  );
                })
              )}
            </div>
          )}
        </SectionCard>

        {/* Questions */}
        <SectionCard
          title="Questions"
          icon={
            <svg
              className="w-3.5 h-3.5 text-violet-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        >
          {isEditing ? (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={`${labelClass} mb-0`}>Select Questions</label>
                <div className="flex items-center gap-2">
                  {formData.questions?.length > 0 && (
                    <span className="text-xs text-violet-600 font-medium bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full">
                      {formData.questions.length} of {allQuestions.length}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={handleSelectAllQuestions}
                    className={`text-xs font-medium px-2.5 py-1 rounded-md border transition-colors ${selectAllQuestions ? "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200" : "bg-violet-50 text-violet-600 border-violet-100 hover:bg-violet-100"}`}
                  >
                    {selectAllQuestions ? "Unselect All" : "Select All"}
                  </button>
                </div>
              </div>
              <ClientSelect
                isMulti
                value={formData.questions?.map((qid: string) => {
                  const q = allQuestions.find((q) => q._id === qid);
                  return q
                    ? { value: q._id, label: q.text }
                    : { value: qid, label: qid };
                })}
                options={allQuestions.map((q) => ({
                  value: q._id,
                  label: q.text,
                }))}
                onChange={(selected: any) => {
                  const ids = selected?.map((s: any) => s.value) || [];
                  handleSelectChange("questions", ids);
                  setSelectAllQuestions(ids.length === allQuestions.length);
                }}
                className="text-sm text-black"
                placeholder="Search and select questions..."
              />
            </div>
          ) : (
            <div className="space-y-1.5">
              {!assessment.questionIds?.length ? (
                <p className="text-sm text-gray-400">No questions assigned.</p>
              ) : (
                assessment.questionIds.map((q: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-lg"
                  >
                    <span className="w-5 h-5 rounded-full bg-violet-50 text-violet-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-gray-700 leading-snug">
                      {q.text}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
