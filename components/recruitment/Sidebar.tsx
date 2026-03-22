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
                  display: "block",
                }}
                className="text-[11px] md:text-[14px]"
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
                  display: "block",
                  paddingLeft: 12,
                }}
                className="text-[11px] md:text-[14px]"
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
        width="100%"
        cellPadding={0}
        style={{ backgroundColor: "#2352b9" }}
      >
        <tbody>
          {sidebarLinks.map((link, index) => (
            <Fragment key={index}>
              <tr>
                <td
                  width={18}
                  height={20}
                  style={{ textAlign: "center" }}
                  className="md:w-[27px] md:h-[25px]"
                >
                  <span
                    style={{ color: "#aad4f5" }}
                    className="text-[8px] md:text-[10px]"
                  >
                    ●
                  </span>
                </td>
                <td style={{ textAlign: "left" }}>
                  <a
                    href={link.href}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontFamily: "Arial Narrow, Arial, sans-serif",
                    }}
                    className="text-[11px] md:text-[14px]"
                  >
                    {link.label}
                  </a>
                </td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  style={{ height: 1, backgroundColor: "#4a6fa5" }}
                >
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