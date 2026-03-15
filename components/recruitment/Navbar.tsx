"use client";

import { useState } from "react";
import Link from "next/link";

interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  // ── flexmenu0: About Indian Railways ──
  {
    label: "About Indian Railways",
    href: "view_section.jsp?lang=0&id=0,1",
    children: [
      { label: "Honourable Ministers", href: "view_section.jsp?lang=0&id=0,1,2550" },
      {
        label: "Corporate Overview",
        href: "view_section.jsp?lang=0&id=0,1,304",
        children: [
          { label: "Organisation Structure", href: "view_section.jsp?lang=0&id=0,1,304,305" },
          { label: "Board Members/General Managers", href: "view_section.jsp?lang=0&id=0,1,304,365" },
        ],
      },
      { label: "Statistics", href: "view_section.jsp?lang=0&id=0,1,304,366,554" },
      { label: "Railway Board Directorates", href: "view_section.jsp?lang=0&id=0,1,388" },
      { label: "Citizen Charter", href: "view_section.jsp?lang=0&id=0,1,262" },
      { label: "Portal Policies", href: "view_section.jsp?lang=0&id=0,1,265" },
      { label: "RTI", href: "view_section.jsp?lang=0&id=0,1,1260" },
      { label: "IPR of Railway Officers", href: "view_section.jsp?lang=0&id=0,1,2469" },
      { label: "Archives", href: "view_section.jsp?lang=0&id=0,1,1289" },
    ],
  },

  // ── flexmenu1: For IR Personnel ──
  {
    label: "For IR Personnel",
    href: "view_section.jsp?lang=0&id=0,5",
    children: [
      {
        label: "Vacancy Circulars",
        href: "view_section.jsp?lang=0&id=0,5,373",
        children: [
          { label: "Vacancy_Circular_2026", href: "view_section.jsp?lang=0&id=0,5,373,3147" },
          { label: "Vacancy_Circular_2025", href: "view_section.jsp?lang=0&id=0,5,373,3067" },
          { label: "E(O)III_Vacancy_Circulars", href: "view_section.jsp?lang=0&id=0,5,373,2101" },
          { label: "VC for RB Posting for Executive Directors", href: "view_section.jsp?lang=0&id=0,5,373,1411" },
          { label: "VC for RB Posting for Directors", href: "view_section.jsp?lang=0&id=0,5,373,1763" },
          { label: "Deputation Instructions", href: "view_section.jsp?lang=0&id=0,5,373,2238" },
          { label: "VC for RDSO Posting for Exe. Director", href: "view_section.jsp?lang=0&id=0,5,373,1550" },
          { label: "VC for RDSO Posting for Directors", href: "view_section.jsp?lang=0&id=0,5,373,1487" },
          { label: "VC for Non-Gaz Emp.", href: "view_section.jsp?lang=0&id=0,5,373,3087" },
          { label: "VC for RB Posting- Ex Cadre Post", href: "view_section.jsp?lang=0&id=0,5,373,1449" },
          { label: "VC_RCT", href: "view_section.jsp?lang=0&id=0,5,373,2606" },
        ],
      },
            { label: "CBT Examination", href: "https://examination.irrb.co.in" },

      { label: "Empanelments (Beta Version)", href: "view_section.jsp?lang=0&id=0,5,1387" },
      {
        label: "Promotion/Posting/Other Orders",
        href: "view_section.jsp?lang=0&id=0,5,1418",
        children: [
          {
            label: "E(O)-II's Orders",
            href: "view_section.jsp?lang=0&id=0,5,1418,1448",
            children: [
              { label: "2026", href: "view_section.jsp?lang=0&id=0,5,1418,1448,3153" },
              { label: "2025", href: "view_section.jsp?lang=0&id=0,5,1418,1448,3068" },
              { label: "2024", href: "view_section.jsp?lang=0&id=0,5,1418,1448,2985" },
              { label: "2022", href: "view_section.jsp?lang=0&id=0,5,1418,1448,2654" },
              { label: "2021", href: "view_section.jsp?lang=0&id=0,5,1418,1448,2432" },
            ],
          },
          {
            label: "E(O)-III's Orders",
            href: "view_section.jsp?lang=0&id=0,5,1418,1459",
            children: [
              { label: "2026", href: "view_section.jsp?lang=0&id=0,5,1418,1459,3152" },
              { label: "2025", href: "view_section.jsp?lang=0&id=0,5,1418,1459,3065" },
              { label: "2024", href: "view_section.jsp?lang=0&id=0,5,1418,1459,2984" },
              { label: "2023", href: "view_section.jsp?lang=0&id=0,5,1418,1459,2812" },
              { label: "2022", href: "view_section.jsp?lang=0&id=0,5,1418,1459,2650" },
              { label: "2021", href: "view_section.jsp?lang=0&id=0,5,1418,1459,2440" },
              { label: "2020", href: "view_section.jsp?lang=0&id=0,5,1418,1459,2439" },
              { label: "2019", href: "view_section.jsp?lang=0&id=0,5,1418,1459,2377" },
              { label: "2018", href: "view_section.jsp?lang=0&id=0,5,1418,1459,2376" },
              { label: "2017", href: "view_section.jsp?lang=0&id=0,5,1418,1459,2375" },
              { label: "2016", href: "view_section.jsp?lang=0&id=0,5,1418,1459,2374" },
              { label: "2015", href: "view_section.jsp?lang=0&id=0,5,1418,1459,2373" },
              { label: "2014", href: "view_section.jsp?lang=0&id=0,5,1418,1459,2372" },
            ],
          },
          {
            label: "ERB-I Orders",
            href: "view_section.jsp?lang=0&id=0,5,1418,1447",
            children: [
              { label: "Previous_Orders", href: "view_section.jsp?lang=0&id=0,5,1418,1447,1801" },
              { label: "Organised Services", href: "view_section.jsp?lang=0&id=0,5,1418,1447,1971" },
              { label: "Orders of RBSS/RBSSS", href: "view_section.jsp?lang=0&id=0,5,1418,1447,1972" },
              { label: "Misc.Services", href: "view_section.jsp?lang=0&id=0,5,1418,1447,2020" },
            ],
          },
          {
            label: "E(O)-I Orders",
            href: "view_section.jsp?lang=0&id=0,5,1418,2629",
            children: [
              { label: "Voluntary Retirement(VR)", href: "view_section.jsp?lang=0&id=0,5,1418,2629,2635" },
              { label: "Seniority", href: "view_section.jsp?lang=0&id=0,5,1418,2629,2636" },
              { label: "Miscellaneous Orders", href: "view_section.jsp?lang=0&id=0,5,1418,2629,2637" },
            ],
          },
          {
            label: "ERB-II Orders",
            href: "view_section.jsp?lang=0&id=0,5,1418,1985",
            children: [
              { label: "2025", href: "view_section.jsp?lang=0&id=0,5,1418,1985,3078" },
              { label: "2024", href: "view_section.jsp?lang=0&id=0,5,1418,1985,3030" },
              { label: "2023", href: "view_section.jsp?lang=0&id=0,5,1418,1985,2814" },
              { label: "2021", href: "view_section.jsp?lang=0&id=0,5,1418,1985,2513" },
            ],
          },
          { label: "EO-IIs Deputation orders-2020", href: "view_section.jsp?lang=0&id=0,5,1418,2433" },
          {
            label: "ERB_V_Orders",
            href: "view_section.jsp?lang=0&id=0,5,1418,1464",
            children: [
              { label: "2024", href: "view_section.jsp?lang=0&id=0,5,1418,1464,3058" },
            ],
          },
          {
            label: "E(GR)-I's Orders",
            href: "view_section.jsp?lang=0&id=0,5,1418,2784",
            children: [
              { label: "2025", href: "view_section.jsp?lang=0&id=0,5,1418,2784,3119" },
              { label: "2024", href: "view_section.jsp?lang=0&id=0,5,1418,2784,2993" },
            ],
          },
        ],
      },
      { label: "Recruitment Rules", href: "view_section.jsp?lang=0&id=0,5,1749" },
      { label: "IRWO", href: "view_section.jsp?lang=0&id=0,5,353" },
      {
        label: "Codes And Manuals",
        href: "view_section.jsp?lang=0&id=0,5,377",
        children: [
          { label: "IRPWM-2019", href: "view_section.jsp?lang=0&id=0,5,377,1345" },
          { label: "IRAC_Vol_1", href: "view_section.jsp?lang=0&id=0,5,377,1900" },
          { label: "IREC", href: "view_section.jsp?lang=0&id=0,5,377,1901" },
          { label: "IRTCC", href: "view_section.jsp?lang=0&id=0,5,377,1902" },
          { label: "Manual for Inspection of Station Accounts", href: "view_section.jsp?lang=0&id=0,5,377,1945" },
          { label: "IRSC-I", href: "view_section.jsp?lang=0&id=0,5,377,2023" },
          { label: "IRPWM-2020", href: "view_section.jsp?lang=0&id=0,5,377,2595" },
          { label: "IRAC_Vol-2", href: "view_section.jsp?lang=0&id=0,5,377,2866" },
          { label: "IRPWM-2004", href: "view_section.jsp?lang=0&id=0,5,377,2966" },
          { label: "IRA&F", href: "view_section.jsp?lang=0&id=0,5,377,1899" },
          { label: "IRFC_Vol_II", href: "view_section.jsp?lang=0&id=0,5,377,1896" },
          { label: "IRFC_Vol_1", href: "view_section.jsp?lang=0&id=0,5,377,1895" },
          { label: "IRSEM", href: "view_section.jsp?lang=0&id=0,5,377,1685" },
          { label: "AT Welding Manual", href: "view_section.jsp?lang=0&id=0,5,377,1829" },
          { label: "FBW_Manual", href: "view_section.jsp?lang=0&id=0,5,377,1830" },
          { label: "USFD_Manual", href: "view_section.jsp?lang=0&id=0,5,377,1831" },
          { label: "Correction Slip to Manual Glued Insulated Rail Joints", href: "view_section.jsp?lang=0&id=0,5,377,1882" },
          { label: "IREC_Vol_1", href: "view_section.jsp?lang=0&id=0,5,377,1886" },
          { label: "IREC_Vol_II", href: "view_section.jsp?lang=0&id=0,5,377,1887" },
          { label: "IREM-Vol_I", href: "view_section.jsp?lang=0&id=0,5,377,1894" },
          { label: "IRPWM-2024", href: "view_section.jsp?lang=0&id=0,5,377,3055" },
        ],
      },
      {
        label: "FROA",
        href: "view_section.jsp?lang=0&id=0,5,384",
        children: [
          { label: "Governing Council", href: "view_section.jsp?lang=0&id=0,5,384,819" },
          { label: "Federation_Units", href: "view_section.jsp?lang=0&id=0,5,384,3204" },
          { label: "Objectives", href: "view_section.jsp?lang=0&id=0,5,384,2931" },
          { label: "Importent Issues", href: "view_section.jsp?lang=0&id=0,5,384,823" },
          { label: "IMPORTANT FACTS", href: "view_section.jsp?lang=0&id=0,5,384,2932" },
          { label: "Important Correspondence", href: "view_section.jsp?lang=0&id=0,5,384,824" },
          { label: "Promotion/Posting Order", href: "view_section.jsp?lang=0&id=0,5,384,826" },
          { label: "Vacancies Notices", href: "view_section.jsp?lang=0&id=0,5,384,827" },
          { label: "Important Circulars", href: "view_section.jsp?lang=0&id=0,5,384,828" },
          { label: "Meeting/Seminar", href: "view_section.jsp?lang=0&id=0,5,384,829" },
          { label: "FAQ's", href: "view_section.jsp?lang=0&id=0,5,384,830" },
          { label: "Contact_Us", href: "view_section.jsp?lang=0&id=0,5,384,831" },
          { label: "Disclaimer", href: "view_section.jsp?lang=0&id=0,5,384,832" },
          { label: "News Flash (Old)", href: "view_section.jsp?lang=0&id=0,5,384,2933" },
        ],
      },
      { label: "Training Circulars", href: "view_section.jsp?lang=0&id=0,5,385" },
      {
        label: "FEDERATION",
        href: "view_section.jsp?lang=0&id=0,5,1144",
        children: [
          { label: "AIRF", href: "view_section.jsp?lang=0&id=0,5,1144,1152" },
          { label: "IRPOF", href: "view_section.jsp?lang=0&id=0,5,1144,1299" },
          { label: "NFIR", href: "view_section.jsp?lang=0&id=0,5,1144,1145" },
        ],
      },
      { label: "IR Good Work Portal", href: "view_section.jsp?lang=0&id=0,5,1940" },
      { label: "Selection for L-17 posts", href: "view_section.jsp?lang=0&id=0,5,3135" },
      {
        label: "Empanelment for IRMS",
        href: "view_section.jsp?lang=0&id=0,5,2703",
        children: [
          { label: "IRMSNotifications", href: "view_section.jsp?lang=0&id=0,5,2703,3124" },
          { label: "List of Empanelled Officers(IRMS)", href: "view_section.jsp?lang=0&id=0,5,2703,3125" },
        ],
      },
      {
        label: "SPARROW",
        href: "view_section.jsp?lang=0&id=0,5,3036",
        children: [
          { label: "Circulars", href: "view_section.jsp?lang=0&id=0,5,3036,3038" },
          { label: "Progress report", href: "view_section.jsp?lang=0&id=0,5,3036,3039" },
        ],
      },
    ],
  },

  // ── flexmenu2: Passenger Info ──
  {
    label: "Passenger Info",
    href: "view_section.jsp?lang=0&id=0,2",
    children: [
      {
        label: "Tourist Information",
        href: "view_section.jsp?lang=0&id=0,2,320",
        children: [
          { label: "Rail Tourism in India", href: "view_section.jsp?lang=0&id=0,2,320,3154" },
          { label: "Tourist Cars", href: "view_section.jsp?lang=0&id=0,2,320,379" },
          { label: "Hotels", href: "view_section.jsp?lang=0&id=0,2,320,381" },
        ],
      },
      { label: "Concessions List", href: "view_section.jsp?lang=0&id=0,2,1360" },
      { label: "Concession Certificates", href: "view_section.jsp?lang=0&id=0,2,1491" },
      { label: "Time Table Information", href: "view_section.jsp?lang=0&id=0,2,266" },
      { label: "Reservation & Ticketing", href: "view_section.jsp?lang=0&id=0,2,330" },
      { label: "Claims Passenger", href: "view_section.jsp?lang=0&id=0,2,280" },
      {
        label: "Concession Rules",
        href: "view_section.jsp?lang=0&id=0,2,281",
        children: [
          { label: "GENERAL RULES FOR CONCESSION", href: "view_section.jsp?lang=0&id=0,2,281,877" },
        ],
      },
    ],
  },

  // ── flexmenu3: Freight Info ──
  {
    label: "Freight Info",
    href: "view_section.jsp?lang=0&id=0,6",
    children: [
      { label: "Claims Freight", href: "view_section.jsp?lang=0&id=0,6,287" },
      { label: "Freight Rate", href: "view_section.jsp?lang=0&id=0,6,338" },
    ],
  },

  // ── flexmenu4: Tenders ──
  {
    label: "Tenders",
    href: "view_section.jsp?lang=0&id=0,3",
    children: [
      { label: "Railway Board Tenders", href: "view_section.jsp?lang=0&id=0,3,269" },
      { label: "CPP Portal Instructions", href: "view_section.jsp?lang=0&id=0,3,1243" },
    ],
  },

  // ── flexmenu5: Contact Us ──
  {
    label: "Contact Us",
    href: "view_section.jsp?lang=0&id=0,7",
    children: [
      { label: "Tel. Directory & Email ID", href: "view_section.jsp?lang=0&id=0,7,367" },
      { label: "RRBs Website", href: "view_section.jsp?lang=0&id=0,7,1281" },
      { label: "Other Railway Sites", href: "view_section.jsp?lang=0&id=0,7,276" },
      { label: "Sitemap", href: "view_section.jsp?lang=0&id=0,7,277" },
      { label: "Disclaimer", href: "view_section.jsp?lang=0&id=0,7,286" },
      { label: "Terms & Conditions", href: "view_section.jsp?lang=0&id=0,7,332" },
      { label: "Privacy Policy", href: "view_section.jsp?lang=0&id=0,7,333" },
    ],
  },
];

/* ── Desktop dropdown ── */
function DropdownMenu({ items }: { items: MenuItem[] }) {
  return (
    <ul
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        backgroundColor: "#CF343A",
        listStyle: "none",
        margin: 0,
        padding: 0,
        zIndex: 1000,
        minWidth: 240,
        boxShadow: "2px 2px 6px rgba(0,0,0,0.3)",
      }}
    >
      {items.map((item, i) => (
        <DropdownItem key={i} item={item} />
      ))}
    </ul>
  );
}

function DropdownItem({ item }: { item: MenuItem }) {
  const [hovered, setHovered] = useState(false);
  return (
    <li
      style={{ position: "relative" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={item.href}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px 12px",
          color: "white",
          textDecoration: "none",
          fontFamily: '"Arial Narrow", Arial, sans-serif',
          fontSize: 13,
          backgroundColor: hovered ? "#3D76C0" : "#CF343A",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          whiteSpace: "nowrap",
        }}
      >
        <span>{item.label}</span>
        {item.children && item.children.length > 0 && (
          <span style={{ marginLeft: 10, fontSize: 10 }}>▶</span>
        )}
      </a>
      {item.children && item.children.length > 0 && hovered && (
        <div style={{ position: "absolute", left: "100%", top: 0 }}>
          <DropdownMenu items={item.children} />
        </div>
      )}
    </li>
  );
}

/* ── Mobile accordion item ── */
function MobileMenuItem({ item, depth = 0 }: { item: MenuItem; depth?: number }) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  return (
    <li style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 16 + depth * 12,
          paddingRight: 12,
          backgroundColor: depth === 0 ? "#3E70CB" : depth === 1 ? "#CF343A" : "#a82a30",
        }}
      >
        <a
          href={item.href}
          style={{
            flex: 1,
            display: "block",
            padding: "10px 0",
            color: "white",
            textDecoration: "none",
            fontFamily: '"Arial Narrow", Arial, sans-serif',
            fontSize: 14,
          }}
        >
          {item.label}
        </a>
        {hasChildren && (
          <button
            onClick={() => setOpen((o) => !o)}
            style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: 16, padding: "0 4px", lineHeight: 1 }}
            aria-label="toggle submenu"
          >
            {open ? "▲" : "▼"}
          </button>
        )}
      </div>
      {hasChildren && open && (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {item.children!.map((child, i) => (
            <MobileMenuItem key={i} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

/* ── Main Navbar ── */
export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .navbar-desktop { display: none !important; }
          .navbar-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .navbar-mobile-menu { display: none !important; }
          .navbar-hamburger { display: none !important; }
          .navbar-desktop { display: flex !important; }
        }
        .nav-menu-item {
          flex: 1;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          position: relative;
        }
        .nav-menu-item > a {
          display: block;
          width: 100%;
          height: 100%;
          color: white;
          text-align: left;
          padding: 8px 14px 0 14px;
          text-decoration: none;
          font-family: "Arial Narrow", Arial, sans-serif;
          font-size: 14px;
          font-weight: bold;
          line-height: 1.3;
          white-space: normal;
          word-break: break-word;
        }
        .nav-menu-item:hover {
          background-color: #3D76C0 !important;
        }
      `}</style>

      <nav
        style={{
          backgroundColor: "#3E70CB",
          padding: 0,
          borderRadius: 0,
          borderBottom: "2px solid red",
          position: "relative",
          marginBottom: "10px",
        }}
      >
        {/* ── Desktop ── */}
        <div
          className="navbar-desktop"
          style={{ alignItems: "flex-start", width: "100%", height: "49px" }}
        >
          <Link
            href="/"
            style={{
              backgroundColor: "#CF343A",
              width: 72,
              minWidth: 72,
              height: "49px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </Link>

          {menuItems.map((item, index) => (
            <div
              key={index}
              className="nav-menu-item"
              style={{ backgroundColor: activeMenu === index ? "#3D76C0" : "#3E70CB", height: "49px" }}
              onMouseEnter={() => setActiveMenu(index)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <a href={item.href}>{item.label}</a>
              {item.children && activeMenu === index && (
                <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 9999 }}>
                  <DropdownMenu items={item.children} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Mobile ── */}
        <div
          className="navbar-hamburger"
          style={{ display: "none", alignItems: "center", justifyContent: "space-between", padding: "0 8px" }}
        >
          <Link
            href="/"
            style={{ backgroundColor: "#CF343A", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 16px", textDecoration: "none" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="white">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </Link>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            style={{ background: "none", border: "1px solid rgba(255,255,255,0.5)", borderRadius: 4, padding: "6px 10px", cursor: "pointer", color: "white" }}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="navbar-mobile-menu">
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {menuItems.map((item, i) => <MobileMenuItem key={i} item={item} depth={0} />)}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}