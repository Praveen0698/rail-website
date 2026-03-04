"use client";
import { useState } from "react";

const navItems = [
  {
    label: "MINISTRY OF\nRAILWAYS",
    href: null,
    options: [
      { label: "Railway Board", href: "https://indianrailways.gov.in/railwayboard/", target: "_blank" },
      { label: "Others Railways", href: "OthersRailway.html", target: "_blank" },
    ],
  },
  {
    label: "BHARAT GAURAV\nTRAINS",
    href: "https://bharatgauravtrains.indianrailways.gov.in",
    target: "_blank",
    options: [],
  },
  {
    label: "ZONAL RAILWAYS",
    href: null,
    options: [
      { label: "Central Railway", href: "https://cr.indianrailways.gov.in/", target: "_blank" },
      { label: "East Central Railway", href: "https://ecr.indianrailways.gov.in/", target: "_blank" },
      { label: "East Coast Railway", href: "https://eastcoastrail.indianrailways.gov.in/", target: "_blank" },
      { label: "Eastern Railway", href: "https://er.indianrailways.gov.in/", target: "_blank" },
      { label: "Metro Railway Kolkata", href: "https://mtp.indianrailways.gov.in/", target: "_blank" },
      { label: "North Central Railway", href: "https://ncr.indianrailways.gov.in/", target: "_blank" },
      { label: "North Eastern Railway", href: "https://ner.indianrailways.gov.in/", target: "_blank" },
      { label: "North Western Railway", href: "https://nwr.indianrailways.gov.in/", target: "_blank" },
      { label: "North East Frontier Railway", href: "https://nfr.indianrailways.gov.in/", target: "_blank" },
      { label: "Northern Railway", href: "https://nr.indianrailways.gov.in/", target: "_blank" },
      { label: "South Central Railway", href: "https://scr.indianrailways.gov.in/", target: "_blank" },
      { label: "South East Central Railway", href: "https://secr.indianrailways.gov.in/", target: "_blank" },
      { label: "South Eastern Railway", href: "https://ser.indianrailways.gov.in/", target: "_blank" },
      { label: "South Western Railway", href: "https://swr.indianrailways.gov.in/", target: "_blank" },
      { label: "Southern Railway", href: "https://sr.indianrailways.gov.in/", target: "_blank" },
      { label: "West Central Railway", href: "https://wcr.indianrailways.gov.in/", target: "_blank" },
      { label: "Western Railway", href: "https://wr.indianrailways.gov.in/", target: "_blank" },
    ],
  },
  {
    label: "PASSENGER\nSERVICES",
    href: null,
    options: [
      { label: "Coach/Train booking", href: "https://www.ftr.irctc.co.in/ftr/", target: "_blank" },
      { label: "E-Ticketing", href: "https://irctc.co.in/", target: "_blank" },
      { label: "PNR Status", href: "https://indianrail.gov.in/pnr_Enq.html", target: "_blank" },
      { label: "Train Arrival/Departure", href: "https://enquiry.indianrail.gov.in/", target: "_blank" },
      { label: "E-Catering", href: "https://ecatering.irctc.co.in/eCatering/", target: "_blank" },
    ],
  },
  {
    label: "FREIGHT\nSERVICES",
    href: null,
    options: [
      { label: "Freight Business", href: "https://www.fois.indianrail.gov.in/RailSAHAY/index.jsp", target: "_blank" },
      { label: "Parcel Business", href: "https://parcel.indianrail.gov.in/", target: "_blank" },
    ],
  },
  {
    label: "MANUFACTURING\nUNITS",
    href: null,
    options: [
      { label: "CLW Chitranjan", href: "https://clw.indianrailways.gov.in/", target: "_blank" },
      { label: "CORE Allahabad", href: "https://core.indianrailways.gov.in/", target: "_blank" },
      { label: "BLW Varanasi", href: "https://blw.indianrailways.gov.in/", target: "_blank" },
      { label: "PLW Patiala", href: "https://plw.indianrailways.gov.in/", target: "_blank" },
      { label: "ICF Chennai", href: "https://icf.indianrailways.gov.in/", target: "_blank" },
      { label: "MRVC Mumbai", href: "https://mrvc.indianrailways.gov.in/", target: "_blank" },
      { label: "RCF Kapurthala", href: "https://rcf.indianrailways.gov.in/", target: "_blank" },
      { label: "RWF Bangalore", href: "https://rwf.indianrailways.gov.in/", target: "_blank" },
      { label: "MCF Raebareli", href: "https://mcf.indianrailways.gov.in/", target: "_blank" },
      { label: "RWP Bela", href: "https://rwp.indianrailways.gov.in/", target: "_blank" },
      { label: "WPO Patna", href: "https://wpo.indianrailways.gov.in/", target: "_blank" },
      { label: "COFMOW", href: "https://cofmow.indianrailways.gov.in/", target: "_blank" },
    ],
  },
  {
    label: "EDUCATION AND\nRESEARCH",
    href: null,
    options: [
      { label: "RDSO Lucknow", href: "https://rdso.indianrailways.gov.in/", target: "_blank" },
      { label: "NAIR Vadodara", href: "https://nair.indianrailways.gov.in/", target: "_blank" },
      { label: "IRICEN Pune", href: "https://iricen.gov.in/iricen/Home", target: "_blank" },
      { label: "IRIEEN Nasik", href: "https://irieen.indianrailways.gov.in/", target: "_blank" },
      { label: "IRIMEE Jamalpur", href: "https://irimee.indianrailways.gov.in/", target: "_blank" },
      { label: "IRISET Secunderabad", href: "https://iriset.indianrailways.gov.in/", target: "_blank" },
      { label: "IRITM Lucknow", href: "https://iritm.indianrailways.gov.in/", target: "_blank" },
    ],
  },
  {
    label: "HERITAGE",
    href: null,
    options: [
      { label: "Indian Heritage", href: "https://indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,1,304,366,1706", target: "_blank" },
      { label: "DHR", href: "https://dhr.indianrailways.gov.in/", target: "_blank" },
    ],
  },
  {
    label: "RECRUITMENT",
    href: "https://indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,7,1281",
    target: "_blank",
    options: [],
  },
  {
    label: "RTI",
    href: null,
    options: [
      { label: "RTI Act", href: "rti-act.pdf", target: "_blank" },
      { label: "Proactive Disclosure of Information U/s4(1)(b)", href: "https://indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,1,1260", target: "_blank" },
    ],
  },
  {
    label: "IR MAP",
    href: "https://indianrailways.gov.in/index/index.html",
    target: "_blank",
    options: [],
  },
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
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.target || "_self"}
                    rel="nofollow noopener"
                    className="text-white hover:underline w-full"
                  >
                    {item.label.replace("\n", " ")}
                  </a>
                ) : (
                  <span>{item.label.replace("\n", " ")}</span>
                )}
                {item.options.length > 0 && (
                  <span className="text-[10px] ml-2">{mobileExpanded === index ? "▲" : "▼"}</span>
                )}
              </div>
              {mobileExpanded === index && item.options.length > 0 && (
                <div className="bg-white text-gray-800 text-[11px]">
                  {item.options.map((opt, i) => (
                    <a
                      key={i}
                      href={opt.href}
                      target={opt.target || "_self"}
                      rel="nofollow noopener"
                      className="block px-5 py-2 border-b border-gray-100 hover:bg-gray-100 cursor-pointer text-gray-800 no-underline"
                    >
                      {opt.label}
                    </a>
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
        <a
          href="index.html"
          title="Home"
          rel="nofollow noopener"
          className="flex items-center justify-center px-3 bg-[#154766] border-r border-blue-700 cursor-pointer hover:bg-[#0f3a55] shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="white" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </a>

        {navItems.map((item, index) => (
          <div
            key={index}
            className="relative"
            onMouseEnter={() => item.options.length > 0 && setOpenIndex(index)}
            onMouseLeave={() => setOpenIndex(null)}
            onClick={() => item.options.length > 0 && handleToggle(index)}
          >
            {item.href ? (
              <a
                href={item.href}
                target={item.target || "_self"}
                rel="nofollow noopener"
                className="px-3 py-2 border-r border-blue-700 hover:bg-[#154766] cursor-pointer h-full flex items-center text-center leading-tight whitespace-pre-line font-medium text-white no-underline"
              >
                {item.label}
              </a>
            ) : (
              <div className="px-3 py-2 border-r border-blue-700 hover:bg-[#154766] cursor-pointer h-full flex items-center text-center leading-tight whitespace-pre-line font-medium">
                {item.label}
              </div>
            )}

            {/* Dropdown */}
            {openIndex === index && item.options.length > 0 && (
              <div className="absolute top-full left-0 bg-white text-gray-800 text-[12px] shadow-lg z-50 min-w-55 border border-gray-200">
                {item.options.map((opt, i) => (
                  <a
                    key={i}
                    href={opt.href}
                    target={opt.target || "_self"}
                    rel="nofollow noopener"
                    className="block px-4 py-1.75 hover:bg-gray-100 cursor-pointer border-b border-gray-100 whitespace-nowrap text-gray-800 no-underline"
                  >
                    {opt.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}