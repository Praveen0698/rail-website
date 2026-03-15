"use client";
import { useState } from "react";

const navItems = [
  {
    label: "MINISTRY OF\nRAILWAYS",
    href: null,
    options: [
      { label: "Railway Board", href: "https://indianrailways.gov.in/railwayboard/", target: "_blank" },
      { label: "Others Railways", href: "#",  },
    ],
  },
  {
    label: "BHARAT GAURAV TRAINS",
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
    label: "PASSENGER SERVICES",
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
    label: "FREIGHT SERVICES",
    href: null,
    options: [
      { label: "Freight Business", href: "https://www.fois.indianrail.gov.in/RailSAHAY/index.jsp", target: "_blank" },
      { label: "Parcel Business", href: "https://parcel.indianrail.gov.in/", target: "_blank" },
    ],
  },
  {
    label: "MANUFACTURING UNITS",
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
    href: "/recruitment",
    options: [],
  },
  {
    label: "RTI",
    href: null,
    options: [
      { label: "RTI Act", href: "#",  },
      { label: "Proactive Disclosure of Information U/s4(1)(b)", href: "https://indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,1,1260", target: "_blank" },
    ],
  },
  {
    label: "IR\nMAP",
    href: "https://indianrailways.gov.in/index/index.html",
    target: "_blank",
    options: [],
  },
];

const itemInnerStyle = {
  display: "flex",
  alignItems: "start",
  width: "100%",
  height: "100%",
  padding: "6px 4px 6px 8px",
  boxSizing: "border-box",
  fontFamily: "Arial, sans-serif",
  fontSize: "11.8px",
  fontWeight: "500",
  lineHeight: "1.3",
  wordBreak: "break-word",
  color: "#fff",
  textDecoration: "none",
  background: "transparent",
  cursor: "pointer",
  textTransform: "uppercase",
  whiteSpace: "pre-line",
};

export default function Navbar() {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [homeHovered, setHomeHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  return (
    <div
      style={{
        backgroundColor: "#146696",
        color: "#fff",
        position: "relative",
        zIndex: 50,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* ── Mobile hamburger ── */}
      <div className="flex md:hidden items-center justify-between px-3 py-2">
        <span className="text-white font-bold" style={{ fontSize: "13px" }}>
          MENU
        </span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white flex flex-col gap-[5px] p-1"
        >
          <span
            className={`block w-5 h-[2px] bg-white transition-transform ${
              mobileOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-white transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-white transition-transform ${
              mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-[#146696] border-t border-blue-700 px-2 pb-3">
          {navItems.map((item, index) => (
            <div key={index}>
              <div
                className="flex justify-between items-center px-3 py-2 border-b border-blue-700 cursor-pointer"
                style={{ fontSize: "12px", fontWeight: "bold" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#000")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
                onClick={() =>
                  item.options.length > 0
                    ? setMobileExpanded(
                        mobileExpanded === index ? null : index
                      )
                    : null
                }
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.target || "_self"}
                    rel="nofollow noopener"
                    className="text-white w-full"
                    style={{ textDecoration: "none" }}
                  >
                    {item.label.replace("\n", " ")}
                  </a>
                ) : (
                  <span>{item.label.replace("\n", " ")}</span>
                )}
                {item.options.length > 0 && (
                  <span style={{ fontSize: "10px", marginLeft: "8px" }}>
                    {mobileExpanded === index ? "▲" : "▼"}
                  </span>
                )}
              </div>
              {mobileExpanded === index && item.options.length > 0 && (
                <div
                  className="bg-white text-gray-800"
                  style={{ fontSize: "11px" }}
                >
                  {item.options.map((opt, i) => (
                    <a
                      key={i}
                      href={opt.href}
                      target={opt.target || "_self"}
                      rel="nofollow noopener"
                      className="block px-5 py-2 border-b border-gray-100 cursor-pointer text-gray-800 no-underline"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f3f4f6")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#fff")
                      }
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

      {/* ── Desktop Menu ── */}
      <div
        className="hidden md:flex items-stretch w-full"
        style={{ justifyContent: "space-between" }}
      >
        {/* Home icon */}
        <a
          href="#"
          title="Home"
          rel="nofollow noopener"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "6px 10px",
            backgroundColor: homeHovered ? "#000" : "#0d3d5c",
            borderRight: "1px solid rgba(255,255,255,0.3)",
            flexShrink: 0,
            cursor: "pointer",
            transition: "background-color 0.15s",
            textDecoration: "none",
          }}
          onMouseEnter={() => setHomeHovered(true)}
          onMouseLeave={() => setHomeHovered(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: 20, height: 20 }}
            fill="white"
            viewBox="0 0 24 24"
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </a>

        {navItems.map((item, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              flex: "1 1 auto",
              minWidth: 0,
              borderRight: "1px solid rgba(255,255,255,0.3)",
              backgroundColor: hoveredIndex === index ? "#000" : "transparent",
              transition: "background-color 0.15s",
              cursor: "pointer",
            }}
            onMouseEnter={() => {
              setHoveredIndex(index);
              if (item.options.length > 0) setOpenIndex(index);
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              setOpenIndex(null);
            }}
          >
            {item.href ? (
              <a
                href={item.href}
                target={item.target || "_self"}
                rel="nofollow noopener"
                style={itemInnerStyle}
              >
                {item.label}
              </a>
            ) : (
              <div style={itemInnerStyle}>{item.label}</div>
            )}

            {/* Dropdown */}
            {openIndex === index && item.options.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  backgroundColor: "#fff",
                  color: "#333",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                  zIndex: 100,
                  minWidth: "max-content",
                  border: "1px solid #ddd",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "12px",
                }}
              >
                {item.options.map((opt, i) => (
                  <a
                    key={i}
                    href={opt.href}
                    target={opt.target || "_self"}
                    rel="nofollow noopener"
                    style={{
                      display: "block",
                      padding: "6px 16px",
                      borderBottom: "1px solid #f0f0f0",
                      whiteSpace: "nowrap",
                      color: "#333",
                      textDecoration: "none",
                      fontWeight: "normal",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f0f0f0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#fff")
                    }
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