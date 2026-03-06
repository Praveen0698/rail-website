"use client";

import Image from "next/image";

export default function Header() {
  return (
    <>
      <style>{`
        .header-gov-text { display: flex; }
        .header-center-text { flex: 1; text-align: center; line-height: 1.6; padding: 8px 4px; }
        .header-right-logos { display: flex; gap: 16px; padding: 8px 16px; }

        @media (max-width: 768px) {
          .header-wrapper {
            flex-wrap: wrap;
            justify-content: center;
          }
          .header-logo-section {
            width: auto !important;
            padding: 8px !important;
          }
          .header-gov-text {
            min-width: unset !important;
            margin-left: 0 !important;
            margin-top: 0 !important;
            padding: 4px 8px;
            text-align: center;
            justify-content: center;
          }
          .header-gov-text span {
            white-space: normal !important;
            text-align: center;
          }
          .header-center-text {
            width: 100%;
            flex: unset;
          }
          .header-right-logos {
            width: 100%;
            justify-content: center;
            padding: 8px;
          }
          .header-right-logos img {
            max-width: 80px !important;
            height: auto !important;
          }
        }
      `}</style>

      <div
        className="header-wrapper"
        style={{
          backgroundColor: "#FFFFFF",
          paddingLeft: 0,
          paddingRight: 0,
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Logo */}
        <div
          className="header-logo-section"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            padding: "8px 0",
            flexShrink: 0,
          }}
        >
          <a href="http://www.indianrailways.gov.in/railwayboard/">
            <Image
              src="/indian-railway.png"
              alt="Indian Railway main logo"
              width={80}
              height={80}
              style={{ borderRadius: "50%" }}
            />
          </a>
        </div>

        {/* Government of India & Ministry */}
        <div
          className="header-gov-text"
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: -10,
            marginTop: 20,
            minWidth: 200,
            flexShrink: 0,
          }}
        >
          <div style={{ lineHeight: 1.3 }}>
            <span style={{ fontSize: 14, fontWeight: "bold", color: "#000000", whiteSpace: "nowrap" }}>
              GOVERNMENT OF INDIA
            </span>
            <br />
            <span style={{ fontSize: 13, fontWeight: "normal", color: "#000000", whiteSpace: "nowrap" }}>
              MINISTRY OF RAILWAYS (Railway Board)
            </span>
          </div>
        </div>

        {/* Center Hindi/English Text */}
        <div className="header-center-text">
          <span style={{ fontSize: 14 }}>
            <b>भारतीय रेल</b>
          </span>{" "}
          राष्ट्र की जीवन रेखा...
          <br />
          <span style={{ fontSize: 14 }}>
            <b>INDIAN RAILWAYS</b>
          </span>{" "}
          Lifeline to the Nation...
        </div>

        {/* Right Side Logos */}
        <div className="header-right-logos" style={{ textAlign: "center", display: "flex" }}>
          <Image
            src="/voters.png"
            alt="National Emblem of India - Voters"
            width={100}
            height={45}
          />
          <Image
            src="/emblemBlack.png"
            alt="National Emblem of India"
            width={70}
            height={55}
          />
        </div>
      </div>
    </>
  );
}