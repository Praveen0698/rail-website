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
      { label: "Hindi", href: "#",  },
      { label: "English", href: "#",  },
    ],
  },
  {
    text: "Train in the Valley of Kashmir",
    link: null,
    subLinks: [
      { label: "Hindi", href: "#",  },
      { label: "English", href: "#",  },
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
    <div className="mt-1 md:mt-4 px-1">
      <div className="bg-white border border-gray-200 shadow-sm px-3 md:px-8 py-3 md:py-5 rounded-lg">
        {/* Smaller Title with less margin */}
        <h2 className="text-center text-[9px] md:text-[22px] font-bold text-gray-900 mb-2 md:mb-4">
          What&apos;s New
        </h2>
        
        {/* Tight spacing between items */}
        <ul className="space-y-0.5 md:space-y-2">
          {newsItems.map((item, i) => (
            <li key={i} className="flex items-start text-[5px] md:text-[12px] leading-[1.2] md:leading-normal">
              {/* Neutral bullet point */}
              <span className="text-gray-500 mr-1.5">•</span>
              
              <div className="flex-1">
                {item.link ? (
                  <a
                    href={item.link}
                    target={item.target || "_self"}
                    rel="nofollow noopener"
                    className="text-[#cc0000] font-bold hover:underline"
                  >
                    {item.text}
                  </a>
                ) : (
                  <span className="text-[#cc0000] font-bold">
                    {item.text}{" "}
                    {item.subLinks && (
                      <span className="inline-flex">
                        {"("}
                        {item.subLinks.map((sub, j) => (
                          <span key={j}>
                            <a
                              href={sub.href}
                              target={sub.target || "_self"}
                              rel="nofollow noopener"
                              className="text-[#cc0000] hover:underline underline decoration-1"
                            >
                              {sub.label}
                            </a>
                            {j < item.subLinks.length - 1 && (
                              <span className="mx-0.5 text-[#cc0000]">/</span>
                            )}
                          </span>
                        ))}
                        {")"}
                      </span>
                    )}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}