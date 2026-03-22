"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

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

export default function Header() {
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const langRef = useRef(null);

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
    <header className="bg-white w-full border-b border-gray-200 font-sans relative overflow-hidden">

      {/*
        Single layout row. No top padding — the logo image itself fills the full height.
        pl-0 = logo starts at the absolute left edge (no padding).
        pr-10 md:pr-16 = generous right gap after emblem.
      */}
      <div className="w-full pl-1 pr-8 md:pr-16 flex items-stretch justify-between">

        {/* ── LEFT: logo circle + text ── */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/*
            The railway logo uses items-stretch on the parent so it fills
            the full row height naturally.
          */}
          <Image
            src="/indian-blue.png"
            width={120}
            height={120}
            alt="Indian Railways Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-20 md:h-20 object-contain self-center"
          />
          <div className="flex flex-col justify-center py-3 md:py-4">
            <h1 className="text-[10px] sm:text-[19px] md:text-[24px] font-sans font-black text-black leading-none tracking-tight whitespace-nowrap">
              GOVERNMENT OF INDIA
            </h1>
            <p className="text-[8px] sm:text-[12px] md:text-[16px] text-[#666] font-semibold leading-none uppercase whitespace-nowrap mt-1">
              MINISTRY OF RAILWAYS
            </p>
          </div>
        </div>

        {/* ── CENTER: अ/A language switcher — absolutely centered ── */}
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 z-10"
          ref={langRef}
        >
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex flex-col items-center text-[#2b3990] leading-none cursor-pointer bg-transparent border-none outline-none hover:opacity-75"
            aria-label="Select language"
            aria-haspopup="listbox"
            aria-expanded={langOpen}
          >
            <span className="text-[6px] sm:text-[6px] md:text-[14px] font-bold leading-tight">
              अ
            </span>
            <span className="text-[5px] sm:text-[5px] md:text-[11px] font-bold leading-tight ml-1 md:ml-4">
              A
            </span>
          </button>

          {/* Language dropdown */}
          {/* {langOpen && (
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full mt-1 bg-white text-gray-800 shadow-lg z-[200] border border-gray-200 text-[11px] md:text-[12px]"
              style={{ minWidth: "200px", maxHeight: "260px", overflowY: "auto" }}
              role="listbox"
              aria-label="Select language"
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
                  className={`px-4 py-[6px] cursor-pointer border-b border-gray-100 hover:bg-gray-100 flex items-center gap-1 ${
                    selectedLang.value === lang.value
                      ? "bg-blue-50 font-semibold"
                      : ""
                  }`}
                >
                  <span>{lang.label}</span>
                  {lang.native && (
                    <span lang={lang.lang} className="text-gray-500 text-[10px]">
                      ({lang.native})
                    </span>
                  )}
                </div>
              ))}

              <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 bg-gray-50">
                <a
                  href="https://bhashini.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
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
          )} */}
        </div>

        {/* ── RIGHT: 2025 badge + divider + National Emblem ── */}
        {/*
          Both images use self-stretch / h-full so they grow to fill
          the full header height — matching the target image exactly.
          A thin vertical divider separates the two right-side images.
        */}
        <div className="flex items-stretch shrink-0">

          {/* 2025 International Year of Cooperatives badge */}
          <div className="flex flex-col items-center justify-center px-3 sm:px-5 md:px-6">
            <Image
              src="/irctc2025.jpeg"
              width={90}
              height={90}
              alt="2025 International Year of Cooperatives"
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-26 md:h-26 object-contain"
            />
          </div>

        

          {/* National Emblem */}
          <div className="flex flex-col items-center justify-center px-3 sm:px-5 md:px-6">
            <Image
              src="/emblemBlack.png"
              width={60}
              height={80}
              alt="National Emblem of India"
              className="w-8 h-auto sm:w-11 md:w-16 object-contain"
            />
          </div>

        </div>

      </div>
    </header>
  );
}