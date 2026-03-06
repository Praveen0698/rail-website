"use client";

const importantLinks = [
  {
    text: "Gati-Shakti Cargo Terminal (GCT) Application",
    href: "https://www.fois.indianrail.gov.in/RailSAHAY/index.jsp",
    target: "_blank",
  },
  {
    text: "ENVIRONMENT CONSERVATION: A Way of Life for Indian Railways : View(42.0 MB)",
    href: "https://indianrailways.gov.in/railwayboard/uploads/directcontent/1624430347085-Environment%20Conservation_A%20Way%20of%20Life%20for%20Indian%20Railways.pdf",
    target: "_blank",
    hasIcon: true,
    mono: true,
  },
  {
    text: "Reforms in Indian Railways",
    href: "http://indianrailways.gov.in/railwayboard//view_section.jsp?lang=0&id=0,1,304,366,523,2505",
    target: "_blank",
  },
  {
    text: "State-wise Achievement Booklets for the period from 2014 to 31.03.2024",
    href: "https://indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,1,304,366,522,3041",
    target: "_blank",
  },
  {
    text: "Anubhav Portal for Retired Employees",
    href: "https://pensionersportal.gov.in/anubhav/",
    target: "_blank",
  },
];

export default function SocialSection() {
  return (
    <div className="w-full mt-4">
      <div className="flex flex-col md:flex-row items-stretch">

        {/* Column 1: Facebook — fixed width, plain, no rounding */}
        <div
          className="shrink-0 bg-white overflow-hidden"
          style={{ width: "380px", borderRight: "1px solid #e5e7eb" }}
        >
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FRailMinIndia&tabs=timeline&width=380&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            height="600"
            style={{ border: "none", overflow: "hidden", display: "block", width: "100%" }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="Ministry of Railways Facebook"
          />
        </div>

        {/* Column 2: Important Information — white card, border, shadow */}
        <div
          className="flex-1 bg-white rounded-lg"
          style={{
            border: "1px solid #cfd9de",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            padding: "18px 24px",
            margin: "0 6px",
          }}
        >
          {/* Title — bold, centered, large */}
          <h2
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: "22px",
              lineHeight: "28px",
              borderBottom: "1px solid #cfd9de",
              paddingBottom: "10px",
              marginBottom: "14px",
              color: "#111",
            }}
          >
            Important Information
          </h2>

          {/* Links list — no extra spacing, inline bullet */}
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {importantLinks.map((item, i) => (
              <li key={i} style={{ marginBottom: "8px", lineHeight: "1.4" }}>
                <a
                  href={item.href}
                  target={item.target || "_self"}
                  rel="nofollow noopener"
                  style={{
                    color: "#00008b",
                    fontWeight: "700",
                    fontSize: item.mono ? "13px" : "14px",
                    fontFamily: item.mono ? "monospace" : "inherit",
                    textDecoration: "none",
                    display: "inline",
                  }}
                  onMouseOver={e => e.currentTarget.style.textDecoration = "underline"}
                  onMouseOut={e => e.currentTarget.style.textDecoration = "none"}
                >
                  • {item.text}
                  {item.hasIcon && (
                    <span style={{ marginLeft: "4px", fontSize: "12px" }}>📄</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Twitter — white, fixed width, "Tweets by" pill at absolute bottom-right */}
        <div
          className="shrink-0 bg-white"
          style={{ width: "280px", minHeight: "500px", position: "relative" }}
        >
          {/* Twitter timeline embed */}
          <div style={{ height: "100%", overflow: "hidden" }}>
            <a
              className="twitter-timeline"
              data-height="500"
              data-theme="light"
              data-chrome="noheader nofooter noborders transparent"
              href="https://twitter.com/RailMinIndia"
            />
          </div>
          <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />

          {/* "Tweets by RailMinIndia" pill — pinned to bottom-right corner */}
          <a
            href="https://twitter.com/RailMinIndia"
            target="_blank"
            rel="noreferrer"
            style={{
              position: "absolute",
              bottom: "50%",
              right: "5%",
              textAlign: "center",
              display: "inline-block",
              border: "1px solid #e5e7eb",
              borderRadius: "20px",
              padding: "3px 16px",
              color: "#4b0082",
              fontWeight: "700",
              fontSize: "13px",
              background: "#fff",
              textDecoration: "none",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              whiteSpace: "nowrap",
              width: "90%",

            }}
          >
            Tweets by RailMinIndia
          </a>
        </div>

      </div>
    </div>
  );
}