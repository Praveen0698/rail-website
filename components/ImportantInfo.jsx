"use client";

const importantLinks = [
  { text: "Gati-Shakti Cargo Terminal (GCT) Application", href: "#" },
  { text: "ENVIRONMENT CONSERVATION: A Way of Life for Indian Railways : View(42.0 MB)", href: "#", hasIcon: true },
  { text: "Reforms in Indian Railways", href: "#" },
  { text: "State-wise Achievement Booklets for the period from 2014 to 31.03.2024", href: "#" },
  { text: "Anubhav Portal for Retired Employees", href: "#" },
];

export default function SocialSection() {
  return (
    <div className="w-full mt-4">
      <div className="flex flex-col md:flex-row items-stretch border-0 border-gray-200  ">

        {/* Column 1: Facebook */}
        <div className="w-full md:w-[320px] shrink-0 border-0 md:border-b-0 md:border-r border-gray-200 bg-white overflow-hidden rounded-lg">
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FRailMinIndia&tabs=timeline&width=300&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            height="500"
            // width="full"
            style={{ border: "none", overflow: "hidden", display: "block", width: "100%" }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="Ministry of Railways Facebook"
          />
        </div>

        {/* Column 2: Important Information */}
        <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200 bg-white px-4 md:px-6 py-4 md:py-5">
          <h2 className="text-[18px] md:text-[22px] font-bold text-center text-gray-900 mb-4">
            Important Information
          </h2>
          <ul className="space-y-3">
            {importantLinks.map((item, i) => (
              <li key={i} className="flex items-start gap-1">
                <span className="text-blue-800 font-bold text-[13px] md:text-[14px] mt-0.5 shrink-0">•</span>
                <a href={item.href} className="text-blue-800 font-bold text-[12px] md:text-[14px] hover:underline leading-snug">
                  {item.text}
                  {item.hasIcon && <span className="inline-block ml-1 text-[11px]">📄</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Twitter */}
        <div className="w-full md:w-[280px] shrink-0 bg-white overflow-hidden">
          <div className="border border-gray-200 m-2" style={{ height: "496px" }}>
            <a
              href="https://twitter.com/RailMinIndia"
              target="_blank"
              rel="noreferrer"
              className="block text-center text-blue-700 font-bold text-[13px] py-2 px-3 border-b border-gray-200 hover:underline bg-white"
            >
              Tweets by RailMinIndia
            </a>
            <div style={{ height: "456px", overflow: "hidden" }}>
              <a
                className="twitter-timeline"
                data-height="456"
                data-theme="light"
                data-chrome="noheader nofooter noborders transparent"
                href="https://twitter.com/RailMinIndia"
              />
            </div>
          </div>
          <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
        </div>

      </div>
    </div>
  );
}