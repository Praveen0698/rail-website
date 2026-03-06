"use client";

export default function TopBar() {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .topbar-links { flex-wrap: wrap; gap: 4px !important; font-size: 12px !important; }
          .topbar-links a { font-size: 12px !important; }
          .topbar-left { display: none !important; }
        }
      `}</style>
      <div
        style={{
          backgroundColor: "#FBFBFB",
          minHeight: 30,
          lineHeight: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 15px",
          margin: 0,
          flexWrap: "wrap",
        }}
      >
        {/* Left placeholder */}
        <div className="topbar-left" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, color: "#1D0A69", fontWeight: "bold" }}>A</span>
        </div>

        {/* Right: Links */}
        <div
          className="topbar-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            flexWrap: "wrap",
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          <a
            href="#"
            style={{ fontWeight: "bold", fontSize: 14, color: "blue", textDecoration: "none" }}
          >
            Search Documents(Date Wise)
          </a>
          &nbsp;
          <a
            href="#"
            style={{ fontWeight: "bold", fontSize: 14, color: "blue", textDecoration: "none" }}
          >
            Search
          </a>
          &nbsp;|&nbsp;
          <a href="#" style={{ fontSize: 14, textDecoration: "none" }}>
            <span style={{ fontWeight: "bold" }}>A+</span>
          </a>
          <a href="#" style={{ fontSize: 14, textDecoration: "none" }}>
            <span>A</span>
          </a>
          <a href="#" style={{ fontSize: 14, textDecoration: "none" }}>
            <span>A-</span>
          </a>
          &nbsp;|
        </div>
      </div>
    </>
  );
}