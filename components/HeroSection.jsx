"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";


import WhatsNew from "./WhatsNew";
import QuickLinksGrid from "./QuickLinks";
const banners = [
  "/carousel1.jpg", "/carousel2.jpg", "/carousel3.jpg",
  "/carousel4.jpg", "/carousel5.jpeg", "/carousel6.png",
];

const scrollingText =
  "The National Single Window System has access to over 100 Central level approvals and State Single Window Systems of 14 States/ UTs with one user id and password";

const newsItems = [
  { text: "Rail Tech Portal", link: "#" },
  { text: "INDIAN RAILWAYS - Trains At A Glance - 2025", link: "#" },
  { text: "RailOne - Official Indian Railways Super App! ( Android/ IOS )", link: "#" },
  { text: "Rail Rajbhasha Journal 142nd Issue : View(13.8 MB)", link: "#" },
  { text: "Payment of Productivity Linked Bonus (PLB) to all eligible non-gazetted Railway employees for the financial year 2024-25", link: "#" },
  { text: "Hindi Divasa message of Honourable Railway Minister", link: "#" },
  { text: "AIZAWL ON THE RAIL MAP TURNING DREAMS INTO REALITY ( Hindi , English )", link: "#" },
  { text: "Train in the Valley of Kashmir ( Hindi , English )", link: "#" },
  { text: "Children Rescued by RPF", link: "#" },
  { text: "Ek Bharat Sanskriti Sangam", link: "#" },
  { text: "Suggestions for Amrit Bharat Stations/ Suggest how your station should be?", link: "#" },
  { text: "New Standard Signages for Railway Stations on IR : View(15.3 MB)", link: "#" },
  { text: "SPECIAL CAMPAIGN 2.0 ACHIEVEMENTS AND BEST PRACTICES OF MINISTRY OF RAILWAYS", link: "#" },
];

const marqueeStyles = `
  @keyframes scrollText {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .scrolling-text {
    display: inline-block;
    animation: scrollText 25s linear infinite;
  }
  .scrolling-text:hover {
    animation-play-state: paused;
  }
`;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
  };

  useEffect(() => {
    if (isPlaying) startTimer();
    else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  const prev = () => { setCurrent((p) => (p - 1 + banners.length) % banners.length); startTimer(); };
  const next = () => { setCurrent((p) => (p + 1) % banners.length); startTimer(); };

  return (
    <div className="w-full">
      <style dangerouslySetInnerHTML={{ __html: marqueeStyles }} />

      {/* ── Carousel ── */}
      <div className="relative w-full overflow-hidden bg-gray-200 aspect-[16/7] md:aspect-[16/6] lg:aspect-[16/5]">
        {banners.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            <Image
              src={src}
              fill
              alt={`Banner ${i + 1}`}
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Prev */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 w-8 h-12 md:w-10 md:h-14 flex items-center justify-center shadow font-bold text-lg md:text-xl"
        >
          ‹
        </button>

        {/* Next */}
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 w-8 h-12 md:w-10 md:h-14 flex items-center justify-center shadow font-bold text-lg md:text-xl"
        >
          ›
        </button>

        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-0 right-0 z-20 bg-black/70 hover:bg-black text-white w-9 h-9 md:w-11 md:h-11 flex items-center justify-center text-sm md:text-base"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
      </div>

      {/* ── Social Icons ── */}
      <div className="flex items-center gap-2 mt-2 px-1 py-1 md:py-3">
        <a href="#" aria-label="Facebook">
          <Image src="/facebook.jpg" width={28} height={28} alt="Facebook" className="w-6 h-6 md:w-7 md:h-7" />
        </a>
        <a href="#" aria-label="Twitter">
          <Image src="/twitter.jpg" width={28} height={28} alt="Twitter" className="w-6 h-6 md:w-7 md:h-7" />
        </a>
        <a href="#" aria-label="YouTube">
          <Image src="/youtube.jpg" width={56} height={28} alt="YouTube" className="h-6 md:h-7 w-auto" />
        </a>
      </div>

      {/* ── Scrolling Text Bar ── */}
      <div className="mt-2 overflow-hidden bg-white border-gray-200 py-1">
        <div className="scrolling-text whitespace-nowrap text-[11px] md:text-[16px] text-gray-700">
          <span>{scrollingText}</span>
          <span className="inline-block w-24 md:w-40" />
          <span>{scrollingText}</span>
          <span className="inline-block w-24 md:w-40" />
        </div>
      </div>


       {/* ── What's New ── */}
      <WhatsNew />

      {/* ── Quick Links Grid ── */}
      <QuickLinksGrid />
    </div>
  );
}