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

  const handleProceed = () => {
    router.replace("/examination/assignment");
  };

  return (
    <div className="min-h-screen bg-[#eef2f7] flex flex-col">
      <Header />

      {/* Page title bar */}
      <div className="bg-[#003580] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <h1 className="text-sm font-bold uppercase tracking-widest">
            Examination Instructions
          </h1>
          <span className="text-xs text-blue-200 bg-white/10 px-3 py-1">
            Read Carefully Before Proceeding
          </span>
        </div>
      </div>

      {/* Amber accent strip */}
      <div className="h-1 bg-[#f4a900]" />

      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Exam summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Total Questions", value: "50" },
              { label: "Marks per Question", value: "2" },
              { label: "Maximum Marks", value: "100" },
              { label: "Duration", value: "50 Min" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-white border border-gray-200 shadow-sm text-center py-4 px-2"
              >
                <p className="text-xl sm:text-2xl font-bold text-[#003580]">
                  {value}
                </p>
                <p className="text-[11px] text-gray-500 uppercase tracking-wide mt-1 leading-tight">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Declaration box */}
          <div className="bg-white border border-gray-200 shadow-sm mb-6">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-sm font-bold uppercase tracking-wide">
                Exam Declaration
              </span>
            </div>

            <div className="p-5 sm:p-6 text-sm text-gray-700 leading-7 text-justify space-y-4">
              <p>
                I hereby solemnly declare that this examination consists of a
                total of 50 multiple-choice questions, with each question
                carrying 2 marks, making the maximum total score 100 marks. I
                also acknowledge that the total duration allotted for completing
                this examination is strictly limited to 50 minutes, and I am
                responsible for managing my time effectively within this period.
              </p>
              <p>
                I fully understand and accept that this examination is conducted
                under strict guidelines to ensure fairness, transparency, and
                academic integrity. I am aware that any form of cheating,
                malpractice, or use of unfair means is strictly prohibited.
              </p>
              <p>
                I further acknowledge that the use of electronic devices such as
                mobile phones, smartwatches, secondary screens, or any
                communication tools during the examination is strictly forbidden
                unless explicitly permitted.
              </p>
              <p>
                I understand that this assessment is designed to evaluate my
                individual knowledge and I commit to completing the examination
                independently without any external help.
              </p>
              <p>
                I am aware that any violation of the examination rules may
                result in immediate disqualification and disciplinary action.
              </p>
            </div>
          </div>

          {/* Important notes */}
          <div className="bg-yellow-50 border border-yellow-300 shadow-sm mb-8">
            <div className="bg-[#f4a900] px-5 py-2.5 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-[#003580] shrink-0"
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
              <span className="text-[#003580] text-sm font-bold uppercase tracking-wide">
                Important Instructions
              </span>
            </div>
            <ul className="p-5 space-y-2 text-sm text-gray-700">
              {[
                "Camera access is mandatory throughout the examination for proctoring.",
                "Do not refresh or close the browser tab during the exam.",
                "Navigating away from the exam page may result in auto-submission.",
                "Each question has only one correct answer. Choose carefully.",
                "You may mark questions for review and return to them before submission.",
                "By proceeding, you confirm that you have read and agreed to all rules.",
              ].map((note, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-1 w-4 h-4 bg-[#003580] text-white rounded-full text-[10px] flex items-center justify-center shrink-0 font-bold">
                    {i + 1}
                  </span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Proceed button */}
          <div className="flex justify-center">
            <button
              onClick={handleProceed}
              className="bg-[#003580] hover:bg-[#002560] text-white font-bold px-10 py-3 uppercase tracking-widest text-sm transition shadow-md"
            >
              I Agree — Proceed to Examination
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
