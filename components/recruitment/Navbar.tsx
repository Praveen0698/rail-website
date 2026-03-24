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
    href: "#",
    children: [
      { label: "Honourable Ministers", href: "#" },
      {
        label: "Corporate Overview",
        href: "#",
        children: [
          { label: "Organisation Structure", href: "#" },
          { label: "Board Members/General Managers", href: "#" },
        ],
      },
      { label: "Statistics", href: "#" },
      { label: "Railway Board Directorates", href: "#" },
      { label: "Citizen Charter", href: "#" },
      { label: "Portal Policies", href: "#" },
      { label: "RTI", href: "#" },
      { label: "IPR of Railway Officers", href: "#" },
      { label: "Archives", href: "#" },
    ],
  },

  // ── flexmenu1: For IR Personnel ──
  {
    label: "For IR Personnel",
    href: "#",
    children: [
      {
        label: "Vacancy Circulars",
        href: "#",
        children: [
          { label: "Vacancy_Circular_2026", href: "#" },
          { label: "Vacancy_Circular_2025", href: "#" },
          { label: "E(O)III_Vacancy_Circulars", href: "#" },
          { label: "VC for RB Posting for Executive Directors", href: "#" },
          { label: "VC for RB Posting for Directors", href: "#" },
          { label: "Deputation Instructions", href: "#" },
          { label: "VC for RDSO Posting for Exe. Director", href: "#" },
          { label: "VC for RDSO Posting for Directors", href: "#" },
          { label: "VC for Non-Gaz Emp.", href: "#" },
          { label: "VC for RB Posting- Ex Cadre Post", href: "#" },
          { label: "VC_RCT", href: "#" },
        ],
      },
      {
        label: "CBT Examination",
        href: "/examination",
      },
      { label: "Application Form", href: "/application/form" },
      { label: "Admit Card", href: "#" },

      { label: "Empanelments (Beta Version)", href: "#" },
      {
        label: "Promotion/Posting/Other Orders",
        href: "#",
        children: [
          {
            label: "E(O)-II's Orders",
            href: "#",
            children: [
              { label: "2026", href: "#" },
              { label: "2025", href: "#" },
              { label: "2024", href: "#" },
              { label: "2022", href: "#" },
              { label: "2021", href: "#" },
            ],
          },
          {
            label: "E(O)-III's Orders",
            href: "#",
            children: [
              { label: "2026", href: "#" },
              { label: "2025", href: "#" },
              { label: "2024", href: "#" },
              { label: "2023", href: "#" },
              { label: "2022", href: "#" },
              { label: "2021", href: "#" },
              { label: "2020", href: "#" },
              { label: "2019", href: "#" },
              { label: "2018", href: "#" },
              { label: "2017", href: "#" },
              { label: "2016", href: "#" },
              { label: "2015", href: "#" },
              { label: "2014", href: "#" },
            ],
          },
          {
            label: "ERB-I Orders",
            href: "#",
            children: [
              { label: "Previous_Orders", href: "#" },
              { label: "Organised Services", href: "#" },
              { label: "Orders of RBSS/RBSSS", href: "#" },
              { label: "Misc.Services", href: "#" },
            ],
          },
          {
            label: "E(O)-I Orders",
            href: "#",
            children: [
              { label: "Voluntary Retirement(VR)", href: "#" },
              { label: "Seniority", href: "#" },
              { label: "Miscellaneous Orders", href: "#" },
            ],
          },
          {
            label: "ERB-II Orders",
            href: "#",
            children: [
              { label: "2025", href: "#" },
              { label: "2024", href: "#" },
              { label: "2023", href: "#" },
              { label: "2021", href: "#" },
            ],
          },
          { label: "EO-IIs Deputation orders-2020", href: "#" },
          {
            label: "ERB_V_Orders",
            href: "#",
            children: [{ label: "2024", href: "#" }],
          },
          {
            label: "E(GR)-I's Orders",
            href: "#",
            children: [
              { label: "2025", href: "#" },
              { label: "2024", href: "#" },
            ],
          },
        ],
      },
      { label: "Recruitment Rules", href: "#" },
      { label: "IRWO", href: "#" },
      {
        label: "Codes And Manuals",
        href: "#",
        children: [
          { label: "IRPWM-2019", href: "#" },
          { label: "IRAC_Vol_1", href: "#" },
          { label: "IREC", href: "#" },
          { label: "IRTCC", href: "#" },
          { label: "Manual for Inspection of Station Accounts", href: "#" },
          { label: "IRSC-I", href: "#" },
          { label: "IRPWM-2020", href: "#" },
          { label: "IRAC_Vol-2", href: "#" },
          { label: "IRPWM-2004", href: "#" },
          { label: "IRA&F", href: "#" },
          { label: "IRFC_Vol_II", href: "#" },
          { label: "IRFC_Vol_1", href: "#" },
          { label: "IRSEM", href: "#" },
          { label: "AT Welding Manual", href: "#" },
          { label: "FBW_Manual", href: "#" },
          { label: "USFD_Manual", href: "#" },
          {
            label: "Correction Slip to Manual Glued Insulated Rail Joints",
            href: "#",
          },
          { label: "IREC_Vol_1", href: "#" },
          { label: "IREC_Vol_II", href: "#" },
          { label: "IREM-Vol_I", href: "#" },
          { label: "IRPWM-2024", href: "#" },
        ],
      },
      {
        label: "FROA",
        href: "#",
        children: [
          { label: "Governing Council", href: "#" },
          { label: "Federation_Units", href: "#" },
          { label: "Objectives", href: "#" },
          { label: "Importent Issues", href: "#" },
          { label: "IMPORTANT FACTS", href: "#" },
          { label: "Important Correspondence", href: "#" },
          { label: "Promotion/Posting Order", href: "#" },
          { label: "Vacancies Notices", href: "#" },
          { label: "Important Circulars", href: "#" },
          { label: "Meeting/Seminar", href: "#" },
          { label: "FAQ's", href: "#" },
          { label: "Contact_Us", href: "#" },
          { label: "Disclaimer", href: "#" },
          { label: "News Flash (Old)", href: "#" },
        ],
      },
      { label: "Training Circulars", href: "#" },
      {
        label: "FEDERATION",
        href: "#",
        children: [
          { label: "AIRF", href: "#" },
          { label: "IRPOF", href: "#" },
          { label: "NFIR", href: "#" },
        ],
      },
      { label: "IR Good Work Portal", href: "#" },
      { label: "Selection for L-17 posts", href: "#" },
      {
        label: "Empanelment for IRMS",
        href: "#",
        children: [
          { label: "IRMSNotifications", href: "#" },
          { label: "List of Empanelled Officers(IRMS)", href: "#" },
        ],
      },
      {
        label: "SPARROW",
        href: "#",
        children: [
          { label: "Circulars", href: "#" },
          { label: "Progress report", href: "#" },
        ],
      },
    ],
  },

  // ── flexmenu2: Passenger Info ──
  {
    label: "Passenger Info",
    href: "#",
    children: [
      {
        label: "Tourist Information",
        href: "#",
        children: [
          { label: "Rail Tourism in India", href: "#" },
          { label: "Tourist Cars", href: "#" },
          { label: "Hotels", href: "#" },
        ],
      },
      { label: "Concessions List", href: "#" },
      { label: "Concession Certificates", href: "#" },
      { label: "Time Table Information", href: "#" },
      { label: "Reservation & Ticketing", href: "#" },
      { label: "Claims Passenger", href: "#" },
      {
        label: "Concession Rules",
        href: "#",
        children: [{ label: "GENERAL RULES FOR CONCESSION", href: "#" }],
      },
    ],
  },

  // ── flexmenu3: Freight Info ──
  {
    label: "Freight Info",
    href: "#",
    children: [
      { label: "Claims Freight", href: "#" },
      { label: "Freight Rate", href: "#" },
    ],
  },

  // ── flexmenu4: Tenders ──
  {
    label: "Tenders",
    href: "#",
    children: [
      { label: "Railway Board Tenders", href: "#" },
      { label: "CPP Portal Instructions", href: "#" },
    ],
  },

  // ── flexmenu5: Contact Us ──
  {
    label: "Contact Us",
    href: "#",
    children: [
      { label: "Tel. Directory & Email ID", href: "#" },
      { label: "RRBs Website", href: "#" },
      { label: "Other Railway Sites", href: "#" },
      { label: "Sitemap", href: "#" },
      { label: "Disclaimer", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

/* ── Desktop dropdown ── */
function DropdownMenu({
  items,
  setShowAdmitModal,
}: {
  items: MenuItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowAdmitModal: any;
}) {
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
        <DropdownItem
          key={i}
          item={item}
          setShowAdmitModal={setShowAdmitModal}
        />
      ))}
    </ul>
  );
}

function DropdownItem({
  item,
  setShowAdmitModal,
}: {
  item: MenuItem;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowAdmitModal: any;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <li
      style={{ position: "relative" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={item.href}
        onClick={(e) => {
          if (item.label === "Admit Card") {
            e.preventDefault();
            setShowAdmitModal(true);
          }
        }}
        target={
          item.label === "CBT Examination" || item.label === "Application Form"
            ? "_blank"
            : "_self"
        }
        rel="noopener noreferrer"
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
          <DropdownMenu
            items={item.children}
            setShowAdmitModal={setShowAdmitModal}
          />
        </div>
      )}
    </li>
  );
}

/* ── Mobile accordion item ── */
function MobileMenuItem({
  item,
  depth = 0,
  setShowAdmitModal,
}: {
  item: MenuItem;
  depth?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowAdmitModal: any;
}) {
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
          backgroundColor:
            depth === 0 ? "#3E70CB" : depth === 1 ? "#CF343A" : "#a82a30",
        }}
      >
        <a
          href={item.href}
          onClick={(e) => {
            if (item.label === "Admit Card") {
              e.preventDefault();
              setShowAdmitModal(true);
            }
          }}
          target={
            item.label === "CBT Examination" ||
            item.label === "Application Form"
              ? "_blank"
              : "_self"
          }
          rel="noopener noreferrer"
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
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: 16,
              padding: "0 4px",
              lineHeight: 1,
            }}
            aria-label="toggle submenu"
          >
            {open ? "▲" : "▼"}
          </button>
        )}
      </div>
      {hasChildren && open && (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {item.children!.map((child, i) => (
            <MobileMenuItem
              key={i}
              item={child}
              depth={depth + 1}
              setShowAdmitModal={setShowAdmitModal}
            />
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
  const [showAdmitModal, setShowAdmitModal] = useState(false);

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </Link>

          {menuItems.map((item, index) => (
            <div
              key={index}
              className="nav-menu-item"
              style={{
                backgroundColor: activeMenu === index ? "#3D76C0" : "#3E70CB",
                height: "49px",
              }}
              onMouseEnter={() => setActiveMenu(index)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <a
                href={item.href}
                onClick={(e) => {
                  if (item.label === "Admit Card") {
                    e.preventDefault();
                    setShowAdmitModal(true);
                  }
                }}
                target={
                  item.label === "CBT Examination" ||
                  item.label === "Application Form"
                    ? "_blank"
                    : "_self"
                }
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
              {item.children && activeMenu === index && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    zIndex: 9999,
                  }}
                >
                  <DropdownMenu
                    items={item.children}
                    setShowAdmitModal={setShowAdmitModal}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Mobile ── */}
        <div
          className="navbar-hamburger"
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 8px",
          }}
        >
          <Link
            href="/"
            style={{
              backgroundColor: "#CF343A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 16px",
              textDecoration: "none",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </Link>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.5)",
              borderRadius: 4,
              padding: "6px 10px",
              cursor: "pointer",
              color: "white",
            }}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {showAdmitModal && (
          <div
            onClick={() => setShowAdmitModal(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 99999,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()} // prevent close inside
              style={{
                background: "white",
                padding: 25,
                borderRadius: 8,
                width: 420, // 🔥 increased width
                position: "relative",
              }}
            >
              {/* ❌ Close Button */}
              <button
                onClick={() => setShowAdmitModal(false)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "transparent",
                  border: "none",
                  fontSize: 18,
                  cursor: "pointer",
                  color: "#333",
                }}
              >
                ✕
              </button>

              <h3 style={{ marginBottom: 20 }}>Download Admit Card</h3>

              <input
                type="text"
                placeholder="Roll Number"
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 12,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                }}
              />

              <input
                type="date"
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 18,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                }}
              />

              <button
                style={{
                  width: "100%",
                  padding: 12,
                  backgroundColor: "#3E70CB",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Download
              </button>
            </div>
          </div>
        )}

        {mobileOpen && (
          <div className="navbar-mobile-menu">
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {menuItems.map((item, i) => (
                <MobileMenuItem
                  key={i}
                  item={item}
                  depth={0}
                  setShowAdmitModal={setShowAdmitModal}
                />
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
