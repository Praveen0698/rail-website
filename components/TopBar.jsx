"use client";

import { useEffect, useState, useRef } from "react";

import { Search } from "lucide-react";

const languages = [
  { value: "en", label: "English", native: null },
  { value: "as", label: "Assamese", native: "অসমীয়া", lang: "as" },

  { value: "bn", label: "Bengali", native: "বাংলা", lang: "bn" },

  { value: "brx", label: "Bodo", native: "बड़ो", lang: "brx" },

  { value: "doi", label: "Dogri", native: "डोगरी", lang: "doi" },

  { value: "gom", label: "Goan Konkani", native: "गोवा कोंकणी", lang: "gom" },

  { value: "gu", label: "Gujarati", native: "ગુજરાતી", lang: "gu" },

  { value: "hi", label: "Hindi", native: "हिन्दी", lang: "hi" },

  { value: "kn", label: "Kannada", native: "ಕನ್ನಡ", lang: "kn" },

  { value: "ks", label: "Kashmiri", native: "कश्मीरी", lang: "ks" },

  { value: "mai", label: "Maithili", native: "मैथिली", lang: "mai" },

  { value: "ml", label: "Malayalam", native: "മലയാളം", lang: "ml" },

  { value: "mni", label: "Manipuri", native: "মণিপুরী", lang: "mni" },

  { value: "mr", label: "Marathi", native: "मराठी", lang: "mr" },

  { value: "ne", label: "Nepali", native: "नेपाली", lang: "ne" },

  { value: "or", label: "Odia", native: "ଓଡ଼ିଆ", lang: "or" },

  { value: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ", lang: "pa" },

  { value: "sa", label: "Sanskrit", native: "संस्कृत", lang: "sa" },

  { value: "sat", label: "Santali", native: "संताली", lang: "sat" },

  { value: "sd", label: "Sindhi", native: "سنڌي", lang: "sd" },

  { value: "ta", label: "Tamil", native: "தமிழ்", lang: "ta" },

  { value: "te", label: "Telugu", native: "తెలుగు", lang: "te" },

  { value: "ur", label: "Urdu", native: "اردو", lang: "ur" },
];

export default function TopBar() {
  const [time, setTime] = useState("");

  const [langOpen, setLangOpen] = useState(false);

  const [selectedLang, setSelectedLang] = useState(languages[0]);

  const langRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();

      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const dayName = days[now.getDay()];

      const monthName = months[now.getMonth()];

      const date = now.getDate();

      const year = now.getFullYear();

      let hours = now.getHours();

      const minutes = now.getMinutes().toString().padStart(2, "0");

      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12 || 12;

      setTime(
        `${dayName}, ${monthName} ${date}, ${year}, ${hours}:${minutes} ${ampm}`,
      );
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click

  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="max-w-screen bg-[#2b6f95] text-white px-2 md:px-6 py-1 md:py-1.5">
      <div className="flex items-center justify-between min-w-0 text-[9px] md:text-[13px]">
        {/* Time */}

        <div className="font-medium whitespace-nowrap shrink-0">{time}</div>

        {/* All right controls */}

        <div className="flex items-center gap-[4px] md:gap-3 whitespace-nowrap shrink-0">
          {/* Bhashini Language Selector */}

          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 cursor-pointer hover:underline text-white text-[9px] md:text-[13px] bg-transparent border-none outline-none"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label="Select language"
            >
              <span>🌐</span>

              <span className="hidden md:inline">{selectedLang.label}</span>

              <span className="md:hidden">Lang</span>

              <span className="text-[7px] md:text-[10px]">▼</span>
            </button>

            {langOpen && (
              <div
                className="absolute left-0 top-full mt-1 bg-white text-gray-800 shadow-lg z-[100] border border-gray-200 text-[11px] md:text-[12px]"
                style={{
                  minWidth: "200px",
                  maxHeight: "260px",
                  overflowY: "auto",
                }}
                role="listbox"
                aria-label="Select language"
                id="bhashiniLanguageDropdown"
              >
                {languages.map((lang) => (
                  <div
                    key={lang.value}
                    role="option"
                    aria-selected={selectedLang.value === lang.value}
                    tabIndex={0}
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangOpen(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setSelectedLang(lang);
                        setLangOpen(false);
                      }
                    }}
                    className={`px-4 py-[6px] cursor-pointer border-b border-gray-100 hover:bg-gray-100 flex items-center gap-1 ${selectedLang.value === lang.value ? "bg-blue-50 font-semibold" : ""}`}
                  >
                    <span>{lang.label}</span>

                    {lang.native && (
                      <span
                        lang={lang.lang}
                        className="text-gray-500 text-[10px]"
                      >
                        ({lang.native})
                      </span>
                    )}
                  </div>
                ))}

                {/* Bhashini branding */}

                <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 bg-gray-50">
                  <a
                    href="https://bhashini.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Bhashini website"
                    className="flex items-center gap-1 text-gray-500 text-[10px] hover:underline no-underline"
                  >
                    <span>Powered by</span>

                    <img
                      src="https://translation-plugin.bhashini.co.in/v3/bhashini-logo.png"
                      alt="Bhashini Logo"
                      className="h-4"
                    />
                  </a>

                  <button
                    className="text-gray-400 hover:text-gray-600"
                    title="Feedback"
                    aria-label="Feedback"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src="https://translation-plugin.bhashini.co.in/v3/feedback.svg"
                      alt="feedback"
                      className="h-4 w-4"
                    />
                  </button>
                </div>
              </div>
            )}
          </div>

          <span className="opacity-60">|</span>

          {/* Accessibility */}

          <div className="flex items-center gap-[3px] md:gap-2">
            <span className="cursor-pointer hover:underline">A+</span>

            <span className="cursor-pointer hover:underline">A</span>

            <span className="cursor-pointer hover:underline">A-</span>
          </div>

          <span className="opacity-60">|</span>

          {/* Skip Links */}

          <a
            href="#main-content"
            className="cursor-pointer hover:underline text-white no-underline"
          >
            Skip to main content
          </a>

          <span className="opacity-60">|</span>

          <a
            href="#navigation"
            className="cursor-pointer hover:underline text-white no-underline"
          >
            Skip to navigation
          </a>

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
