"use client";
import { useState } from "react";

const navItems = [
  {
    label: "MINISTRY OF\nRAILWAYS",
    options: ["Railway Board", "Others Railways"],
  },
  { label: "BHARAT GAURAV\nTRAINS", options: [] },
  {
    label: "ZONAL RAILWAYS",
    options: [
      "Central Railway", "East Central Railway", "East Coast Railway",
      "Eastern Railway", "Metro Railway Kolkata", "North Central Railway",
      "North Eastern Railway", "North Western Railway", "North East Frontier Railway",
      "Northern Railway", "South Central Railway", "South East Central Railway",
      "South Eastern Railway", "South Western Railway", "Southern Railway",
      "West Central Railway", "Western Railway",
    ],
  },
  {
    label: "PASSENGER\nSERVICES",
    options: ["Coach/Train booking", "E-Ticketing", "PNR Status", "Train Arrival/Departure", "E-Catering"],
  },
  {
    label: "FREIGHT\nSERVICES",
    options: ["Freight Business", "Parcel Business"],
  },
  {
    label: "MANUFACTURING\nUNITS",
    options: [
      "CLW Chitranjan", "CORE Allahabad", "BLW Varanasi", "PLW Patiala",
      "ICF Chennai", "MRVC Mumbai", "RCF Kapurthala", "RWF Bangalore",
      "MCF Raebareli", "RWP Bela", "WPO Patna", "COFMOW",
    ],
  },
  {
    label: "EDUCATION AND\nRESEARCH",
    options: [
      "RDSO Lucknow", "NAIR Vadodara", "IRICEN Pune", "IRIEEN Nasik",
      "IRIMEE Jamalpur", "IRISET Secunderabad", "IRITM Lucknow",
    ],
  },
  {
    label: "HERITAGE",
    options: ["Indian Heritage", "DHR"],
  },
  { label: "RECRUITMENT", options: [] },
  {
    label: "RTI",
    options: ["RTI Act", "Proactive Disclosure of Information U/s4(1)(b)"],
  },
  { label: "IR MAP", options: [] },
];

export default function Navbar() {
  const [openIndex, setOpenIndex] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#1c5a85] text-white text-[11px] md:text-[13px] relative z-50">

      {/* Mobile hamburger */}
      <div className="flex md:hidden items-center justify-between px-3 py-2">
        <span className="text-white font-bold text-[13px]">MENU</span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white flex flex-col gap-[5px] p-1"
        >
          <span className={`block w-5 h-[2px] bg-white transition-transform ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-5 h-[2px] bg-white transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[2px] bg-white transition-transform ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1c5a85] border-t border-blue-700 px-2 pb-3">
          {navItems.map((item, index) => (
            <div key={index}>
              <div
                className="flex justify-between items-center px-3 py-2 border-b border-blue-700 cursor-pointer hover:bg-[#154766]"
                onClick={() =>
                  item.options.length > 0
                    ? setMobileExpanded(mobileExpanded === index ? null : index)
                    : null
                }
              >
                <span>{item.label.replace("\n", " ")}</span>
                {item.options.length > 0 && (
                  <span className="text-[10px]">{mobileExpanded === index ? "▲" : "▼"}</span>
                )}
              </div>
              {mobileExpanded === index && item.options.length > 0 && (
                <div className="bg-white text-gray-800 text-[11px]">
                  {item.options.map((opt, i) => (
                    <div key={i} className="px-5 py-2 border-b border-gray-100 hover:bg-gray-100 cursor-pointer">
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Desktop Menu */}
      <div className="hidden md:flex items-stretch w-full">
        {/* Home icon */}
        <div className="flex items-center justify-center px-3 bg-[#154766] border-r border-blue-700 cursor-pointer hover:bg-[#0f3a55] shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="white" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </div>

        {navItems.map((item, index) => (
          <div
            key={index}
            className="relative"
            onMouseEnter={() => item.options.length > 0 && setOpenIndex(index)}
            onMouseLeave={() => setOpenIndex(null)}
            onClick={() => item.options.length > 0 && handleToggle(index)}
          >
            <div className="px-3 py-2 border-r border-blue-700 hover:bg-[#154766] cursor-pointer h-full flex items-center text-center leading-tight whitespace-pre-line font-medium">
              {item.label}
            </div>

            {/* Dropdown */}
            {openIndex === index && item.options.length > 0 && (
              <div className="absolute top-full left-0 bg-white text-gray-800 text-[12px] shadow-lg z-50 min-w-[220px] border border-gray-200">
                {item.options.map((opt, i) => (
                  <div
                    key={i}
                    className="px-4 py-[7px] hover:bg-gray-100 cursor-pointer border-b border-gray-100 whitespace-nowrap"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}