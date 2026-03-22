"use client";

import { useEffect, useState } from "react";

export default function TopBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];
      const dayName = days[now.getDay()];
      const monthName = months[now.getMonth()];
      const date = now.getDate();
      const year = now.getFullYear();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      setTime(`${dayName}, ${monthName} ${date}, ${year}, ${hours}:${minutes} ${ampm}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#2b6f95] text-white overflow-hidden">
      <div className="flex items-center justify-between pl-2 pr-0.5 md:px-1 py-[1px] md:py-1">

        {/* Left: Date & Time */}
        <div className="font-medium whitespace-nowrap shrink-0 text-[7px] md:text-[13px]">
          {time}
        </div>

        {/* Right: all controls in one flex row, no wrapping */}
        <div className="flex items-center gap-[3px] md:gap-[5px] shrink-0 flex-nowrap">

          {/* A+ A A- — shown on ALL screen sizes */}
          <div className="flex items-center gap-[3px] md:gap-[3px]">
            <button className="bg-transparent border-none text-white text-[4px] md:text-[13px] cursor-pointer hover:underline leading-none">
              A<sup className="text-[5px] md:text-[8px]">+</sup>
            </button>
            <button className="bg-transparent border-none text-white text-[4px] md:text-[13px] cursor-pointer hover:underline leading-none">
              A
            </button>
            <button className="bg-transparent border-none text-white text-[4px] md:text-[12px] cursor-pointer hover:underline leading-none">
              A<sup className="text-[5px] md:text-[7px]">-</sup>
            </button>
          </div>

          <span className="opacity-40 text-[5px] md:text-[13px]">|</span>

          <a
            href="#main-content"
            className="hover:underline text-white no-underline whitespace-nowrap text-[5px] md:text-[13px]"
          >
            Skip to main content
          </a>

          <span className="opacity-40 text-[4px] md:text-[13px]">|</span>

          <a
            href="#navigation"
            className="hover:underline text-white no-underline whitespace-nowrap text-[5px] md:text-[13px]"
          >
            Skip to navigation
          </a>

          <span className="opacity-40 text-[9px] md:text-[13px]">|</span>

          {/* Search: white input + white Search button with dark text */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder=""
              className="h-[10px] md:h-[24px] w-25 md:w-44 px-1 md:px-2 text-black text-[8px] md:text-[13px] bg-white border-0 outline-none"
            />
            <button className="h-[10px] md:h-[24px] px-[3px] mx-[2px] md:px-2 bg-gray-50 text-[#111] text-[8px] md:text-[13px] font-semibold whitespace-nowrap flex items-center justify-center border-0 border-l border-gray-300">
              Search
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}