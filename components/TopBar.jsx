"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function TopBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
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
    <div className="min-w-full bg-[#2b6f95] text-white px-2 md:px-6 py-[4px] md:py-[6px] overflow-hidden">

      <div className="flex items-center justify-between min-w-0 text-[9px] md:text-[13px]">

        {/* Time */}
        <div className="font-medium whitespace-nowrap shrink-0">
          {time}
        </div>

        {/* All right controls — single row, no wrap */}
        <div className="flex items-center gap-[4px] md:gap-3 whitespace-nowrap shrink-0">


          <span className="opacity-60">|</span>

          {/* Accessibility */}
          <div className="flex items-center gap-[3px] md:gap-2">
            <span className="cursor-pointer hover:underline">A+</span>
            <span className="cursor-pointer hover:underline">A</span>
            <span className="cursor-pointer hover:underline">A-</span>
          </div>

          <span className="opacity-60">|</span>

          {/* Skip Links */}
          <span className="cursor-pointer hover:underline">Skip to main content</span>
          <span className="opacity-60">|</span>
          <span className="cursor-pointer hover:underline">Skip to navigation</span>

          {/* Search */}
          <div className="flex items-center ml-[2px] md:ml-0">
            <input
              type="text"
              placeholder="Search"
              className="h-[18px] md:h-7 w-[50px] md:w-56 px-1 md:px-3 text-black text-[9px] md:text-[13px] bg-white border border-gray-300 outline-none"
            />
            <button className="h-[18px] md:h-7 px-[3px] md:px-3 bg-[#1f5c85] border border-gray-300 border-l-0 flex items-center justify-center">
              <Search size={8} className="text-white md:w-[14px] md:h-[14px]" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}