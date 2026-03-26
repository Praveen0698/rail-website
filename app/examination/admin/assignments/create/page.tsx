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
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");

  const [users, setUsers] = useState<any[]>([]);
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
    // ✅ USERS FIXED
    axios.get("/examination/api/admin/users").then((res) => {
      setAllUsers(
        res.data.map((user: any) => ({
          label: `${user.name} (${user.rollNo}) - ${user.designation}`,
          value: user._id,
          name: user.name,
          rollNo: user.rollNo,
          designation: user.designation,
        })),
      );
    });

    // QUESTIONS
    axios.get("/examination/api/admin/questions").then((res) => {
      setAllQuestions(
        res.data.map((q: any) => ({
          label: q.text,
          value: q._id,
        })),
      );
    });
  }, []);

  console.log(users);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        title,
        startTime: new Date(startTime).toISOString(),
        durationMinutes: parseInt(duration),
        users: users.map((u: any) => ({
          _id: u._id,
          name: u.name,
          rollNo: u.rollNo,
          designation: u.designation,
        })),
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
      alert(`Error: ${error?.message || "Unknown error"}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/examination/admin/assignments">
            <span className="text-xs text-gray-400 hover:text-violet-600 cursor-pointer">
              ← Assignments
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">
            Create Assignment
          </h1>
        </div>
      </div>

      <div className="max-w-4xl space-y-5">
        {/* BASIC */}
        <SectionCard title="Basic Information" icon={"📄"}>
          <div>
            <label className={labelClass}>Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
            />
          </div>
        </SectionCard>

        {/* SCHEDULING */}
        <SectionCard title="Scheduling" icon={"⏱"}>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className={inputClass}
            />
            <input
              type="number"
              placeholder="Duration (mins)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className={inputClass}
            />
          </div>
        </SectionCard>

        {/* USERS */}
        <SectionCard title="Assign Users" icon={"👤"}>
          <ClientSelect
            isMulti
            options={allUsers}
            value={allUsers.filter((u) =>
              users.some((user) => user._id === u.value),
            )}
            onChange={(selected: any) =>
              setUsers(
                selected
                  ? selected.map((o: any) => ({
                      _id: o.value,
                      name: o.name,
                      rollNo: o.rollNo,
                      designation: o.designation,
                    }))
                  : [],
              )
            }
            getOptionLabel={(e: any) => e.label}
            getOptionValue={(e: any) => e.value}
            isOptionSelected={(option: any, value: any) =>
              value.some((v: any) => v.value === option.value)
            }
            placeholder="Select users..."
            menuPortalTarget={
              typeof window !== "undefined" ? document.body : null
            }
            styles={{
              menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
            }}
          />
        </SectionCard>

        {/* QUESTIONS */}
        <SectionCard title="Questions" icon={"❓"}>
          <button
            onClick={handleSelectAllQuestions}
            className="mb-2 text-xs bg-violet-100 px-2 py-1 rounded"
          >
            {selectAllQuestions ? "Unselect All" : "Select All"}
          </button>

          <ClientSelect
            isMulti
            options={allQuestions}
            value={allQuestions.filter((q) => questions.includes(q.value))}
            onChange={(selected: any) => {
              const ids = selected?.map((o: any) => o.value) || [];
              setQuestions(ids);
              setSelectAllQuestions(ids.length === allQuestions.length);
            }}
            placeholder="Select questions..."
            menuPortalTarget={
              typeof window !== "undefined" ? document.body : null
            }
            styles={{
              menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
            }}
          />
        </SectionCard>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-violet-600 text-white px-6 py-2 rounded-xl"
        >
          {submitting ? "Creating..." : "Create Assignment"}
        </button>
      </div>
    </div>
  );
}
