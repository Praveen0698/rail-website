const newsItems = [
  {
    text: "Rail Tech Portal",
    link: "https://railtech.indianrailways.gov.in/",
    target: "_blank",
  },
  {
    text: "INDIAN RAILWAYS - Trains At A Glance - 2026",
    link: "https://indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,1,304,366,537,3143",
    target: "_blank",
  },
  {
    text: "RailOne - Official Indian Railways Super App!",
    link: null,
    subLinks: [
      { label: "Android", href: "https://play.google.com/store/apps/details?id=org.cris.aikyam", target: "_blank" },
      { label: "IOS", href: "https://apps.apple.com/in/app/railone/id6473384334", target: "_blank" },
    ],
  },
  {
    text: "Rail Rajbhasha Journal 142nd Issue : View(13.8 MB)",
    link: "https://indianrailways.gov.in/railwayboard/uploads/directcontent/1758878152833-Rail%20Rajbhasha%20142.pdf",
    target: "_blank",
  },
  {
    text: "Payment of Productivity Linked Bonus (PLB) to all eligible non-gazetted Railway employees for the financial year 2024-25",
    link: "https://indianrailways.gov.in/railwayboard/uploads/directcontent/1758717747720-24.09.2025_PLB%20for%20F.Y.%202024-25.pdf",
    target: "_blank",
  },
  {
    text: "माननीय रेल मंत्री जी का हिंदी दिवस संदेश",
    link: "संदेश -2025 (1).pdf",
    target: "_blank",
  },
  {
    text: "AIZAWL ON THE RAIL MAP TURNING DREAMS INTO REALITY",
    link: null,
    subLinks: [
      { label: "Hindi", href: "AIZAWL_BR_2025.pdf", target: "_blank" },
      { label: "English", href: "AIZAWL_IR_2025.pdf", target: "_blank" },
    ],
  },
  {
    text: "Train in the Valley of Kashmir",
    link: null,
    subLinks: [
      { label: "Hindi", href: "BR_June_Kashmir2025.pdf", target: "_blank" },
      { label: "English", href: "IR_June_Kashmir2025.pdf", target: "_blank" },
    ],
  },
  {
    text: "Children Rescued by RPF",
    link: "https://missionvatsalya.wcd.gov.in/login#tabs",
    target: "_blank",
  },
  {
    text: "Ek Bharat Sanskriti Sangam",
    link: "https://ekbharat.gov.in/",
    target: "_blank",
  },
  {
    text: "Suggestions for Amrit Bharat Stations/ सुझाव दो आपका स्टेशन कैसा हो ?",
    link: "https://indianrailways.gov.in/railwayboard/FeedBackForm/index.jsp",
    target: "_blank",
  },
  {
    text: "New Standard Signages for Railway Stations on IR : View(15.3 MB)",
    link: "https://indianrailways.gov.in/railwayboard/uploads/directorate/GATI-SHAKTI/2023/Signages_Standard_Sizes.pdf",
    target: "_blank",
  },
  {
    text: "SPECIAL CAMPAIGN 2.0 ACHIEVEMENTS AND BEST PRACTICES OF MINISTRY OF RAILWAYS",
    link: "https://indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,1,304,366,523,2800",
    target: "_blank",
  },
];

export default function WhatsNew() {
  return (
    <div className="mt-4 px-1">
      <div className="bg-white rounded border border-gray-200 shadow-md px-6 md:px-10 py-5 rounded-lg">
        <h2 className="text-center text-[18px] md:text-[26px] font-bold text-gray-900 mb-4">
          What&apos;s New
        </h2>
        <ul className="space-y-2">
          {newsItems.map((item, i) => (
            <li key={i} className="leading-snug">
              {item.link ? (
                // Single link item
                <a
                  href={item.link}
                  target={item.target || "_self"}
                  rel="nofollow noopener"
                  className="text-[#fc2e2e] font-bold text-[11px] md:text-[14px] hover:underline block"
                >
                  • {item.text}
                </a>
              ) : (
                // Multi-link item (e.g. RailOne, AIZAWL, Kashmir)
                <span className="text-[#fc2e2e] font-bold text-[11px] md:text-[14px] block">
                  • {item.text}{" "}
                  {item.subLinks && (
                    <span className="inline-flex gap-1 flex-wrap">
                      {"("}
                      {item.subLinks.map((sub, j) => (
                        <span key={j}>
                          <a
                            href={sub.href}
                            target={sub.target || "_self"}
                            rel="nofollow noopener"
                            className="text-[#fc2e2e] hover:underline underline"
                          >
                            {sub.label}
                          </a>
                          {j < item.subLinks.length - 1 && (
                            <span className="mx-[2px]">/</span>
                          )}
                        </span>
                      ))}
                      {")"}
                    </span>
                  )}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}