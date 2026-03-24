/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import Link from "next/link";

const ClientSelect = dynamic(() => import("@/components/mcq/ReactSelect"), {
  ssr: false,
});

interface UserOption {
  label: string;
  value: string;
}
interface QuestionOption {
  label: string;
  value: string;
}

const inputClass =
  "w-full border border-gray-200 bg-gray-50 px-3.5 py-2.5 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent focus:bg-white transition-all";

const labelClass = "block text-xs font-medium text-gray-500 mb-1.5";

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

export default function CreateAssignmentPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [declaration, setDeclaration] = useState("");
  const [instructions, setInstructions] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [allUsers, setAllUsers] = useState<UserOption[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [allQuestions, setAllQuestions] = useState<QuestionOption[]>([]);
  const [selectAllQuestions, setSelectAllQuestions] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSelectAllQuestions = () => {
    if (selectAllQuestions) {
      setQuestions([]);
      setSelectAllQuestions(false);
    } else {
      setQuestions(allQuestions.map((q) => q.value));
      setSelectAllQuestions(true);
    }
  };

  useEffect(() => {
    axios.get("/examination/api/admin/users").then((res) => {
      setAllUsers(
        res.data.map((user: { email: string }) => ({
          label: user.email,
          value: user.email,
        })),
      );
    });
    axios.get("/examination/api/admin/questions").then((res) => {
      setAllQuestions(
        res.data.map((q: { _id: string; text: string }) => ({
          label: q.text,
          value: q._id,
        })),
      );
    });
  }, []);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      let logoUrl = "";
      if (logoFile) {
        const formData = new FormData();
        formData.append("file", logoFile);
        const uploadRes = await axios.post(
          "/examination/api/uploadLogo",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        if (uploadRes.status === 200 && uploadRes.data?.url) {
          logoUrl = uploadRes.data.url;
        } else throw new Error("Logo upload failed");
      }

      const payload = {
        title,
        description,
        startTime: new Date(startTime).toISOString(),
        durationMinutes: parseInt(duration, 10),
        declarationContent: declaration,
        instructions,
        companyName,
        logo: logoUrl,
        users,
        questions,
      };

      const res = await axios.post(
        "/examination/api/admin/assignments",
        payload,
      );
      if (res.status === 200 || res.status === 201) {
        alert("Assignment created successfully!");
        redirect("/examination/admin/assignments");
      } else throw new Error("Assignment creation failed");
    } catch (error: any) {
      alert(`Error creating assignment: ${error?.message || "Unknown error"}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 p-8"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
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
          <h1 className="text-2xl font-bold text-gray-900">
            Create Assignment
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Fill in the details to create a new assessment
          </p>
        </div>
      </div>

      <div className="max-w-4xl space-y-5">
        {/* Basic Info */}
        <SectionCard
          title="Basic Information"
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        >
          <div>
            <label className={labelClass}>
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. React Developer Assessment"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              placeholder="Brief overview of this assignment..."
              value={description}
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Company Name</label>
              <input
                type="text"
                placeholder="e.g. Acme Corp"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Upload Logo</label>
              {!logoFile ? (
                <label className="flex items-center gap-2.5 cursor-pointer border border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 rounded-lg px-3.5 py-2.5 transition-colors">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-xs text-gray-400">Upload image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                  />
                </label>
              ) : (
                <div className="flex items-center gap-3 border border-gray-100 rounded-lg px-3 py-2 bg-gray-50">
                  <img
                    src={URL.createObjectURL(logoFile)}
                    alt="Logo preview"
                    className="w-10 h-10 object-cover rounded-md border border-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-700 truncate">
                      {logoFile.name}
                    </p>
                  </div>
                  <button
                    onClick={() => setLogoFile(null)}
                    className="w-6 h-6 bg-red-50 hover:bg-red-100 text-red-500 rounded-full flex items-center justify-center shrink-0 transition-colors"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </SectionCard>

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
              <label className={labelClass}>
                Start Time <span className="text-red-400">*</span>
              </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={`${inputClass} bg-white`}
              />
            </div>
            <div>
              <label className={labelClass}>
                Duration <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="e.g. 60"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className={`${inputClass} pr-16`}
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                  mins
                </span>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Content */}
        <SectionCard
          title="Content"
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
        >
          <div>
            <label className={labelClass}>
              Declaration{" "}
              <span className="text-gray-300 font-normal">
                (shown before starting)
              </span>
            </label>
            <textarea
              placeholder="Enter the declaration text that candidates must agree to before starting..."
              value={declaration}
              rows={5}
              onChange={(e) => setDeclaration(e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </div>
          <div>
            <label className={labelClass}>
              Instructions{" "}
              <span className="text-gray-300 font-normal">
                (shown alongside questions)
              </span>
            </label>
            <textarea
              placeholder="Enter instructions that will be visible to candidates during the assessment..."
              value={instructions}
              rows={5}
              onChange={(e) => setInstructions(e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </div>
        </SectionCard>

        {/* Users */}
        <SectionCard
          title="Assign Users"
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
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={`${labelClass} mb-0`}>Select Users</label>
              {users.length > 0 && (
                <span className="text-xs text-violet-600 font-medium bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full">
                  {users.length} selected
                </span>
              )}
            </div>
            <ClientSelect
              isMulti
              options={allUsers}
              value={allUsers.filter((u) => users.includes(u.value))}
              onChange={(selected: any) =>
                setUsers(selected.map((o: any) => o.value))
              }
              className="w-full text-black text-sm"
              placeholder="Search and select users..."
            />
          </div>
        </SectionCard>

        {/* Questions */}
        <SectionCard
          title="Add Questions"
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
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={`${labelClass} mb-0`}>Select Questions</label>
              <div className="flex items-center gap-2">
                {questions.length > 0 && (
                  <span className="text-xs text-violet-600 font-medium bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full">
                    {questions.length} of {allQuestions.length} selected
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleSelectAllQuestions}
                  className={`text-xs font-medium px-2.5 py-1 rounded-md border transition-colors ${
                    selectAllQuestions
                      ? "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                      : "bg-violet-50 text-violet-600 border-violet-100 hover:bg-violet-100"
                  }`}
                >
                  {selectAllQuestions ? "Unselect All" : "Select All"}
                </button>
              </div>
            </div>
            <ClientSelect
              isMulti
              options={allQuestions}
              value={allQuestions.filter((q) => questions.includes(q.value))}
              onChange={(selected: any) => {
                const ids = selected?.map((o: any) => o.value) || [];
                setQuestions(ids);
                setSelectAllQuestions(ids.length === allQuestions.length);
              }}
              className="w-full text-black text-sm"
              placeholder="Search and select questions..."
            />
          </div>
        </SectionCard>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-2 pb-8">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors"
          >
            {submitting ? (
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
                Creating...
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
                Create Assignment
              </>
            )}
          </button>
          <Link href="/examination/admin/assignments">
            <span className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium px-5 py-2.5 rounded-xl transition-colors cursor-pointer">
              Cancel
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
