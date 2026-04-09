"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cookies from "js-cookie";

const REDIRECT_URL = "https://indianrailways.gov.in";
const TOTAL = 5;

export default function SubmittedPage() {
  const [countdown, setCountdown] = useState(TOTAL);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.href = REDIRECT_URL;
          Cookies.remove("session_token", { path: "/" });
          Cookies.remove("userRole", { path: "/" });
          sessionStorage.clear();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const progress = ((TOTAL - countdown) / TOTAL) * 100;

  return (
    <div className="min-h-screen bg-[#eef2f7] flex flex-col">
      <Header />

      {/* Title bar */}
      <div className="bg-[#003580] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <h1 className="text-sm font-bold uppercase tracking-widest">
            Application Status
          </h1>
          <span className="text-xs text-blue-200 bg-white/10 px-3 py-1">
            Form Fill-Up Portal
          </span>
        </div>
      </div>
      <div className="h-1 bg-[#f4a900]" />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Main card */}
          <div className="bg-white border border-gray-200 shadow-lg overflow-hidden">
            {/* Green success header band */}
            <div className="bg-emerald-600 px-6 py-6 flex flex-col items-center gap-3">
              {/* Circle check */}
              <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/60 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-lg uppercase tracking-wide leading-tight">
                  Submitted Successfully
                </p>
                <p className="text-emerald-100 text-xs uppercase tracking-widest mt-1">
                  Application recorded
                </p>
              </div>
            </div>

            {/* Amber accent strip */}
            <div className="h-1 bg-[#f4a900]" />

            <div className="px-6 py-7">
              {/* Reference / org name */}
              <div className="text-center mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                  Submitted to
                </p>
                <p className="text-sm font-bold text-[#003580] uppercase tracking-wide">
                  Indian Railway Human Resource Management System
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Railway Recruitment Cell · Indian Railway
                </p>
              </div>

              <div className="border-t border-dashed border-gray-200 my-5" />

              {/* IPAS ID Section */}
              <div className="border border-[#003580]/20 bg-blue-50/50 px-5 py-4 mb-5">
                {/* Notice text */}
                <p className="text-[11px] text-gray-600 leading-relaxed mb-4">
                  Your HRMS have successfully submitted, kindly receive your{" "}
                  <span className="font-semibold text-[#003580]">
                    11 digit IPAS ID
                  </span>{" "}
                  (Integrated Payroll and Accounting System ID) number from the
                  Accounts Department, ECoR, Bhubaneswar.
                </p>
              </div>

              <div className="border-t border-dashed border-gray-200 my-5" />

              {/* Countdown box */}
              <div className="border border-gray-200 bg-gray-50 px-5 py-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                    Redirecting in
                  </p>
                  <span className="text-[11px] text-gray-400">
                    indianrailways.gov.in
                  </span>
                </div>

                {/* Number + bar */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 shrink-0 border-2 border-[#003580] flex items-center justify-center">
                    <span className="text-2xl font-bold text-[#003580] tabular-nums leading-none">
                      {countdown}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#003580] h-1.5 rounded-full transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5 uppercase tracking-wider">
                      seconds remaining
                    </p>
                  </div>
                </div>
              </div>

              {/* Manual link */}
              <p className="text-center text-[11px] text-gray-400 mt-4">
                Not redirected?{" "}
                <a
                  href={REDIRECT_URL}
                  className="text-[#003580] underline font-semibold hover:text-[#002560]"
                >
                  Click here
                </a>
              </p>
            </div>
          </div>

          <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest mt-5">
            For official use only · Ministry of Railways · Govt. of India
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
