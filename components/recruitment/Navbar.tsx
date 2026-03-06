"use client";

import { useState } from "react";
import Link from "next/link";

interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
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
  {
    label: "For IR Personnel",
    href: "view_section.jsp?lang=0&id=0,5",
    children: [
      { label: "Vacancy Circulars", href: "view_section.jsp?lang=0&id=0,5,373" },
      { label: "Empanelments (Beta Version)", href: "view_section.jsp?lang=0&id=0,5,1387" },
      { label: "REIS", href: "view_section.jsp?lang=0&id=0,5,383" },
      { label: "Promotion/Posting/Other Orders", href: "view_section.jsp?lang=0&id=0,5,1418" },
      { label: "Recruitment Rules", href: "view_section.jsp?lang=0&id=0,5,1749" },
      { label: "IRWO", href: "view_section.jsp?lang=0&id=0,5,353" },
      { label: "Codes And Manuals", href: "view_section.jsp?lang=0&id=0,5,377" },
      { label: "FROA", href: "view_section.jsp?lang=0&id=0,5,384" },
      { label: "Training Circulars", href: "view_section.jsp?lang=0&id=0,5,385" },
      { label: "FEDERATION", href: "view_section.jsp?lang=0&id=0,5,1144" },
      { label: "IR Good Work Portal", href: "view_section.jsp?lang=0&id=0,5,1940" },
      { label: "Selection for L-17 posts", href: "view_section.jsp?lang=0&id=0,5,3135" },
      { label: "Empanelment for IRMS", href: "view_section.jsp?lang=0&id=0,5,2703" },
      { label: "SPARROW", href: "view_section.jsp?lang=0&id=0,5,3036" },
    ],
  },
  {
    label: "Passenger Info",
    href: "view_section.jsp?lang=0&id=0,2",
    children: [
      { label: "Tourist Information", href: "view_section.jsp?lang=0&id=0,2,320" },
      { label: "Concessions List", href: "view_section.jsp?lang=0&id=0,2,1360" },
      { label: "Concession Certificates", href: "view_section.jsp?lang=0&id=0,2,1491" },
      { label: "Time Table Information", href: "view_section.jsp?lang=0&id=0,2,266" },
      { label: "Reservation & Ticketing", href: "view_section.jsp?lang=0&id=0,2,330" },
      { label: "Claims Passenger", href: "view_section.jsp?lang=0&id=0,2,280" },
      { label: "Concession Rules", href: "view_section.jsp?lang=0&id=0,2,281" },
    ],
  },
  {
    label: "Freight Info",
    href: "view_section.jsp?lang=0&id=0,6",
    children: [
      { label: "Claims Freight", href: "view_section.jsp?lang=0&id=0,6,287" },
      { label: "Freight Rate", href: "view_section.jsp?lang=0&id=0,6,338" },
    ],
  },
  {
    label: "Tenders",
    href: "view_section.jsp?lang=0&id=0,3",
    children: [
      { label: "Railway Board Tenders", href: "view_section.jsp?lang=0&id=0,3,269" },
      { label: "CPP Portal Instructions", href: "view_section.jsp?lang=0&id=0,3,1243" },
    ],
  },
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
        minWidth: 200,
        boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
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
          display: "block",
          padding: "6px 8px",
          color: "white",
          textDecoration: "none",
          fontFamily: "Arial Narrow, Arial, sans-serif",
          fontSize: 14,
          backgroundColor: hovered ? "#3D76C0" : "#CF343A",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          whiteSpace: "nowrap",
        }}
      >
        {item.label}
        {item.children && item.children.length > 0 && " ▶"}
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
function MobileMenuItem({
  item,
  depth = 0,
}: {
  item: MenuItem;
  depth?: number;
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
            fontFamily: "Arial Narrow, Arial, sans-serif",
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
      `}</style>

      <nav
        style={{
          backgroundColor: "#3E70CB",
          padding: 0,
          borderRadius: 0,
          borderBottom: "2px solid red",
          position: "relative",
          marginBottom:"20px"
        }}
      >
        {/* ── Desktop layout ── */}
        <div
          className="navbar-desktop"
          style={{ alignItems: "stretch", flexWrap: "wrap" }}
        >
          {/* Home icon */}
          <Link
            href="/"
            style={{
              backgroundColor: "#CF343A",
              width: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "7px",
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

          {/* Menu items */}
          {menuItems.map((item, index) => (
            <div
              key={index}
              style={{ position: "relative", display: "flex", alignItems: "center" }}
              onMouseEnter={() => setActiveMenu(index)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <a
                href={item.href}
                style={{
                  display: "block",
                  color: "white",
                  textAlign: "center",
                  padding: "10px 8px",
                  textDecoration: "none",
                  fontFamily: "Arial Narrow, Arial, sans-serif",
                  fontSize: 14,
                  backgroundColor: activeMenu === index ? "#3D76C0" : "#3E70CB",
                  lineHeight: "20px",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </a>
              {item.children && activeMenu === index && (
                <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 9999 }}>
                  <DropdownMenu items={item.children} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Mobile layout: home icon + hamburger button ── */}
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

          {/* <span
            style={{
              color: "white",
              fontFamily: "Arial Narrow, Arial, sans-serif",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            Indian Railways
          </span> */}

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
              /* X icon */
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
              /* Hamburger icon */
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

        {/* ── Mobile drawer menu ── */}
        {mobileOpen && (
          <div className="navbar-mobile-menu">
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {menuItems.map((item, i) => (
                <MobileMenuItem key={i} item={item} depth={0} />
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}