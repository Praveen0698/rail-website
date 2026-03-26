"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Header from "@/components/mcq/Header";
import Footer from "@/components/mcq/Footer";

export default function Instructions() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("session_token");
    const role = Cookies.get("userRole");
    if (!token || role !== "user") {
      router.replace("/examination");
    }
  }, [router]);

  const handleProceed = async () => {
    router.replace("/examination/declaration");
  };

  return (
    <div className="min-h-screen bg-[#eef2f7] flex flex-col overflow-x-hidden">
      <Header />

      {/* Title bar */}
      <div className="bg-[#003580] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <h1 className="text-sm font-bold uppercase tracking-widest">
            General Instructions
          </h1>
          <span className="text-xs text-blue-200 bg-white/10 px-3 py-1">
            Please Read Carefully
          </span>
        </div>
      </div>
      <div className="h-1 bg-[#f4a900]" />

      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-5">
          <p className="text-center font-bold text-[#003580] text-base uppercase tracking-wide">
            Read all instructions before proceeding
          </p>

          {/* General Instructions */}
          <div className="bg-white border border-gray-200 shadow-sm">
            <div className="bg-[#003580] text-white px-5 py-3 flex items-center gap-2">
              <svg
                className="w-4 h-4 shrink-0"
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
              <span className="text-sm font-bold uppercase tracking-wide">
                General Instructions
              </span>
            </div>
            <ol className="p-5 sm:p-6 space-y-4 text-sm text-gray-700 leading-relaxed list-none">
              {[
                "Candidates are strictly prohibited from navigating away from the examination window. Any attempt to refresh, close, switch tabs, minimize the window, or use the browser back button will result in automatic submission of the test.",
                "The clock will be set at the server. The countdown timer in the top right corner will display the remaining time.",
                null, // palette item — rendered separately
                'Click ">" or "<" to toggle question palette visibility.',
              ].map((item, i) => {
                if (item === null) {
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 h-5 bg-[#003580] text-white rounded-full text-[10px] flex items-center justify-center shrink-0 font-bold">
                        {i + 1}
                      </span>
                      <div>
                        <p>
                          The Questions Palette will show the status of each
                          question using these symbols:
                        </p>
                        <div className="mt-3 space-y-2 pl-1">
                          {[
                            {
                              color: "border border-gray-400 bg-white",
                              label: "You have not visited the question yet.",
                            },
                            {
                              color: "bg-red-500",
                              label: "You have not answered the question.",
                            },
                            {
                              color: "bg-green-600",
                              label: "You have answered the question.",
                            },
                            {
                              color: "bg-purple-700",
                              label: "Marked for review without answering.",
                            },
                            {
                              color: "bg-indigo-600",
                              label:
                                "Answered & marked for review — will be considered for evaluation.",
                            },
                          ].map(({ color, label }) => (
                            <div
                              key={label}
                              className="flex items-center gap-3"
                            >
                              <span className={`w-5 h-5 shrink-0 ${color}`} />
                              <span className="text-xs text-gray-600">
                                {label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </li>
                  );
                }
                return (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 bg-[#003580] text-white rounded-full text-[10px] flex items-center justify-center shrink-0 font-bold">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Navigating to a Question */}
          <div className="bg-white border border-gray-200 shadow-sm">
            <div className="bg-[#003580] text-white px-5 py-3 flex items-center gap-2">
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              <span className="text-sm font-bold uppercase tracking-wide">
                Navigating to a Question
              </span>
            </div>
            <ol className="p-5 sm:p-6 space-y-3 text-sm text-gray-700 leading-relaxed list-none">
              {[
                "Click on a question number in the palette to navigate directly to that question.",
                "Use Save & Next to save your current answer and move to the next question.",
                "Use Mark for Review & Next to flag the question for later review while saving your answer.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 bg-[#f4a900] text-[#003580] rounded-full text-[10px] flex items-center justify-center shrink-0 font-bold">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Answering a Question */}
          <div className="bg-white border border-gray-200 shadow-sm">
            <div className="bg-[#003580] text-white px-5 py-3 flex items-center gap-2">
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              <span className="text-sm font-bold uppercase tracking-wide">
                Answering a Question
              </span>
            </div>
            <ol className="p-5 sm:p-6 space-y-3 text-sm text-gray-700 leading-relaxed list-none">
              {[
                "Select your answer by clicking on the desired option.",
                'Deselect by clicking the same option again or using "Clear Response".',
                "Change your answer by simply selecting a different option.",
                "Use Save & Next to confirm and save your answer.",
                "Use Mark for Review & Next to flag the question while saving your answer.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 bg-[#f4a900] text-[#003580] rounded-full text-[10px] flex items-center justify-center shrink-0 font-bold">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Warning note */}
          <div className="bg-red-50 border border-red-300 px-5 py-4 flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-600 shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
            <p className="text-sm text-red-700 leading-relaxed">
              <span className="font-bold">Note: </span>
              All questions will appear in English language only. Do not refresh
              the page once the exam has started.
            </p>
          </div>

          {/* Proceed button */}
          <div className="flex justify-center pb-4">
            <button
              onClick={handleProceed}
              className="bg-[#003580] hover:bg-[#002560] text-white font-bold px-10 py-3 uppercase tracking-widest text-sm transition shadow-md cursor-pointer"
            >
              Proceed to Declaration →
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
