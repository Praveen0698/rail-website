"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white w-full border-b-2 border-gray-200 font-sans py-1">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">

        {/* ── LEFT: National Emblem + Text ── */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <Image
            src="/emblemBlack.png"
            width={70}
            height={90}
            alt="National Emblem of India"
            className="w-10 h-10 sm:w-14 sm:h-14 md:w-24 md:h-24 object-contain"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-[13px] sm:text-[18px] md:text-[22px] lg:text-[26px] font-black text-[#1a3a8f] leading-tight tracking-wide uppercase whitespace-nowrap">
              Railway Recruitment Board            </h1>
            <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] font-semibold text-gray-700 leading-tight whitespace-nowrap mt-0.5">
              Government of India, Ministry of Railways
            </p>
          </div>
        </div>

        {/* ── RIGHT: Indian Railways Emblem ── */}
        <div className="shrink-0">
          <Image
            src="/indian-blue.png"
            width={80}
            height={80}
            alt="Indian Railways Logo"
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-21 md:h-21 object-contain"
          />
        </div>

      </div>
    </header>
  );
}