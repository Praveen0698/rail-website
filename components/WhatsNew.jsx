const newsItems = [
  { text: "Rail Tech Portal", link: "#" },
  { text: "INDIAN RAILWAYS - Trains At A Glance - 2025", link: "#" },
  { text: "RailOne - Official Indian Railways Super App! ( Android/ IOS )", link: "#" },
  { text: "Rail Rajbhasha Journal 142nd Issue : View(13.8 MB)", link: "#" },
  { text: "Payment of Productivity Linked Bonus (PLB) to all eligible non-gazetted Railway employees for the financial year 2024-25", link: "#" },
  { text: "Hindi Divasa message of Honourable Railway Minister", link: "#" },
  { text: "AIZAWL ON THE RAIL MAP TURNING DREAMS INTO REALITY ( Hindi , English )", link: "#" },
  { text: "Train in the Valley of Kashmir ( Hindi , English )", link: "#" },
  { text: "Children Rescued by RPF", link: "#" },
  { text: "Ek Bharat Sanskriti Sangam", link: "#" },
  { text: "Suggestions for Amrit Bharat Stations/ Suggest how your station should be?", link: "#" },
  { text: "New Standard Signages for Railway Stations on IR : View(15.3 MB)", link: "#" },
  { text: "SPECIAL CAMPAIGN 2.0 ACHIEVEMENTS AND BEST PRACTICES OF MINISTRY OF RAILWAYS", link: "#" },
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
              <a
                href={item.link}
                className="text-[#cc0000] font-bold text-[11px] md:text-[14px] hover:underline block"
              >
                • {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}