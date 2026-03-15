"use client";

import { Fragment } from "react";

const sidebarLinks = [
  { label: "Tel. Directory & Email ID", href: "#" },
  { label: "Other Railway Sites", href: "#" },
  { label: "Sitemap", href: "#" },
  { label: "Disclaimer", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

export default function Sidebar() {
  return (
    <div style={{ backgroundColor: "#2352b9" }}>

      {/* Contact Us + RRBs Website — left aligned, RRBs indented as sub-item */}
      <table
        border={0}
        cellSpacing={0}
        width="100%"
        cellPadding={0}
        style={{ backgroundColor: "#2352b9" }}
      >
        <tbody>
          <tr>
            <td width={10} height={25}>
              <div style={{ width: 15, height: 1 }} />
            </td>
            <td style={{ textAlign: "left", paddingTop: 8, paddingBottom: 4 }}>
              {/* Parent: Contact Us */}
              <a
                href="#"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontFamily: "Arial Narrow, Arial, sans-serif",
                  fontSize: 14,
                  display: "block",
                }}
              >
                <strong>Contact Us</strong>
              </a>
              {/* Sub-item: › RRBs Website */}
              <a
                href="#"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontFamily: "Arial Narrow, Arial, sans-serif",
                  fontSize: 14,
                  display: "block",
                  paddingLeft: 12,
                }}
              >
                <strong>› RRBs Website</strong>
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Sub links list */}
      <table
        border={0}
        cellSpacing={0}
        width={200}
        cellPadding={0}
        style={{ backgroundColor: "#2352b9" }}
      >
        <tbody>
          {sidebarLinks.map((link, index) => (
            <Fragment key={index}>
              <tr>
                <td width={27} height={25} style={{ textAlign: "center" }}>
                  <span style={{ color: "#aad4f5", fontSize: 10 }}>●</span>
                </td>
                <td style={{ textAlign: "left" }}>
                  <a
                    href={link.href}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontFamily: "Arial Narrow, Arial, sans-serif",
                      fontSize: 14,
                    }}
                  >
                    {link.label}
                  </a>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ height: 1, backgroundColor: "#4a6fa5" }}>
                  <div style={{ height: 1 }} />
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}