/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Option = { text: string; isCorrect: boolean; image?: string };
type Question = {
  _id: string;
  text: string;
  image?: string;
  options: Option[];
};

export default function AdminQuestions() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<Option[]>([
    { text: "", isCorrect: false, image: "" },
    { text: "", isCorrect: false, image: "" },
    { text: "", isCorrect: false, image: "" },
    { text: "", isCorrect: false, image: "" },
  ]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [questionImageBase64, setQuestionImageBase64] = useState<string | null>(
    null,
  );
  const [submitting, setSubmitting] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchQuestions = async () => {
    const res = await axios.get("/examination/api/admin/questions");
    setQuestions(res.data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSubmit = async () => {
    if (!question.trim()) return alert("Question text cannot be empty");
    if (options.some((opt) => !opt.text.trim()))
      return alert("All options must be filled out");
    if (!options.some((opt) => opt.isCorrect))
      return alert("Please select a correct option");

    setSubmitting(true);
    try {
      await axios.post("/examination/api/admin/questions", {
        text: question,
        // Send the full base64 string (or null) — NOT empty string
        image: questionImageBase64 || "",
        options: options.map((opt) => ({
          text: opt.text,
          isCorrect: opt.isCorrect,
          // Send the full base64 string (or null) — NOT empty string
          image: opt.image || "",
        })),
      });
      setQuestion("");
      setQuestionImageBase64(null);
      setOptions(
        options.map(() => ({ text: "", isCorrect: false, image: "" })),
      );
      fetchQuestions();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this question?")) return;
    await axios.delete("/examination/api/admin/questions", { data: { id } });
    fetchQuestions();
  };

  const filteredQuestions = questions.filter((q) =>
    q.text.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div
      className="min-h-screen bg-gray-50 p-8"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {/* Page header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage MCQs</h1>
          <p className="text-sm text-gray-400 mt-1">
            Create and manage multiple choice questions
          </p>
        </div>
        <span className="text-xs font-medium text-gray-400 bg-white border border-gray-100 shadow-sm px-3 py-1.5 rounded-full">
          {questions.length} question{questions.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* LEFT — Add Question form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-violet-50 flex items-center justify-center">
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h2 className="text-sm font-semibold text-gray-800">
                Add New Question
              </h2>
            </div>

            <div className="p-5 space-y-4">
              {/* Question text */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Question Text <span className="text-red-400">*</span>
                </label>
                <textarea
                  placeholder="Enter your question here..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-200 bg-gray-50 px-3.5 py-2.5 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Question image */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Question Image{" "}
                  <span className="text-gray-300">(optional)</span>
                </label>
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
                  <span className="text-xs text-gray-400">
                    {questionImageBase64
                      ? "Image selected — click to change"
                      : "Upload image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onloadend = () =>
                        setQuestionImageBase64(reader.result as string);
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
                {questionImageBase64 && (
                  <div className="mt-2 relative inline-block">
                    <img
                      src={questionImageBase64}
                      alt="question"
                      className="w-24 h-24 object-cover rounded-lg border border-gray-100"
                    />
                    <button
                      onClick={() => setQuestionImageBase64(null)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
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

              {/* Options */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Options <span className="text-red-400">*</span>
                </label>
                <div className="space-y-2.5">
                  {options.map((opt, i) => (
                    <div
                      key={i}
                      className={`rounded-lg border p-3 transition-colors ${opt.isCorrect ? "border-emerald-200 bg-emerald-50/50" : "border-gray-100 bg-gray-50"}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${opt.isCorrect ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-500"}`}
                        >
                          {optionLabels[i]}
                        </span>
                        <input
                          type="text"
                          placeholder={`Option ${optionLabels[i]}`}
                          value={opt.text}
                          onChange={(e) => {
                            const updated = [...options];
                            updated[i].text = e.target.value;
                            setOptions(updated);
                          }}
                          className="flex-1 bg-transparent border-none text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                        />
                        <button
                          onClick={() => {
                            const updated = options.map((o, idx) => ({
                              ...o,
                              isCorrect: idx === i,
                            }));
                            setOptions(updated);
                          }}
                          className={`text-xs font-medium px-2 py-1 rounded-md transition-colors shrink-0 ${opt.isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600"}`}
                        >
                          {opt.isCorrect ? "✓ Correct" : "Set correct"}
                        </button>
                      </div>

                      {/* Option image */}
                      <div className="flex items-center gap-2 mt-1">
                        <label className="flex items-center gap-1.5 cursor-pointer text-xs text-gray-400 hover:text-gray-600 transition-colors">
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
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {opt.image ? "Change image" : "Add image"}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                const copy = [...options];
                                copy[i].image = reader.result as string;
                                setOptions(copy);
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                        </label>
                        {opt.image && (
                          <div className="relative inline-block">
                            <img
                              src={opt.image}
                              alt={`opt-${i}`}
                              className="w-10 h-10 object-cover rounded-md border border-gray-100"
                            />
                            <button
                              onClick={() => {
                                const copy = [...options];
                                copy[i].image = "";
                                setOptions(copy);
                              }}
                              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                            >
                              <svg
                                className="w-2.5 h-2.5"
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
                  ))}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-1"
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
                    Adding...
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Question
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT — Questions list */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-gray-50">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-800">
                  All Questions
                </h2>
                <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                  {filteredQuestions.length} result
                  {filteredQuestions.length !== 1 ? "s" : ""}
                </span>
              </div>
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
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 pl-9 pr-3.5 py-2.5 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="overflow-y-auto divide-y divide-gray-50 max-h-[75vh]">
              {filteredQuestions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
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
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-400">
                    No questions found
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Add your first question using the form
                  </p>
                </div>
              ) : (
                filteredQuestions.map((q, qIdx) => {
                  const isExpanded = expandedId === q._id;
                  return (
                    <div
                      key={q._id}
                      className="px-5 py-4 hover:bg-gray-50/60 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-violet-50 text-violet-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {qIdx + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-semibold text-gray-800 leading-snug">
                              {q.text}
                            </p>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() =>
                                  setExpandedId(isExpanded ? null : q._id)
                                }
                                className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-md bg-gray-50 hover:bg-gray-100 text-gray-500 border border-gray-100 transition-colors"
                              >
                                {isExpanded ? (
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
                                      d="M5 15l7-7 7 7"
                                    />
                                  </svg>
                                ) : (
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
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                )}
                                {isExpanded ? "Hide" : "Show"}
                              </button>
                              <button
                                onClick={() => handleDelete(q._id)}
                                className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-md bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 transition-colors"
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
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                                Delete
                              </button>
                            </div>
                          </div>

                          {q.image && (
                            <img
                              src={q.image}
                              alt="question"
                              className="w-24 h-24 object-cover rounded-lg border border-gray-100 mt-2"
                            />
                          )}

                          {isExpanded && (
                            <div className="mt-3 grid grid-cols-1 gap-1.5">
                              {q.options.map((opt, i) => (
                                <div
                                  key={i}
                                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${
                                    opt.isCorrect
                                      ? "bg-emerald-50 border border-emerald-100 text-emerald-700"
                                      : "bg-gray-50 border border-gray-100 text-gray-600"
                                  }`}
                                >
                                  <span
                                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${opt.isCorrect ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-500"}`}
                                  >
                                    {optionLabels[i]}
                                  </span>
                                  <span className="flex-1">{opt.text}</span>
                                  {opt.isCorrect && (
                                    <svg
                                      className="w-4 h-4 text-emerald-500 shrink-0"
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
                                  )}
                                  {opt.image && (
                                    <img
                                      src={opt.image}
                                      alt="opt"
                                      className="w-8 h-8 object-cover rounded-md border border-gray-100 shrink-0"
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
