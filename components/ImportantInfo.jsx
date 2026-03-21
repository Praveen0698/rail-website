"use client";

const importantLinks = [
  { text: "Gati-Shakti Cargo Terminal (GCT) Application", href: "https://www.fois.indianrail.gov.in/RailSAHAY/index.jsp" },
  { text: "ENVIRONMENT CONSERVATION: View(42.0 MB)", href: "#", hasIcon: true },
  { text: "Reforms in Indian Railways", href: "#" },
  { text: "State-wise Achievement Booklets", href: "#" },
  { text: "Anubhav Portal for Retired Employees", href: "#" },
];

export default function SocialSection() {
  return (
    <div className="w-full bg-white overflow-hidden px-1 py-2">
      <div className="flex flex-row items-stretch w-full gap-0.5 flex-nowrap">
        
        {/* Section 1: Facebook 
            - Width: 32% on mobile to match Image 2
            - Scale: 0.6 on mobile to stop the "zoomed-in" look
        */}
        <div className="flex-[0.36] md:flex-[0.29] min-w-0 border border-gray-300 bg-white overflow-hidden">
          <div className="h-50 md:h-100 w-full relative">
            <div className="absolute inset-0 origin-top-left scale-[0.4] md:scale-100 w-[167%] md:w-[120%] h-[167%] md:h-full">
               <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FRailMinIndia&tabs=timeline&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false"
                className="border-none w-full h-full"
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                title="Facebook"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Important Information 
            - Width: 34% on mobile (narrower center box like Image 2)
        */}
        <div className="flex-[0.48] min-w-0 border border-gray-300 rounded-lg md:rounded-xl shadow-sm bg-white overflow-hidden px-1">
          <div className="p-1 md:p-4">
            <h2 className="text-center font-bold text-black mb-1 md:mb-3 text-[7px] md:text-[20px]" 
                style={{ fontFamily: 'Arial, sans-serif' }}>
              Important Information
            </h2>

            <ul className="list-none p-0 m-0">
              {importantLinks.map((item, i) => (
                <li key={i} className="mb-0.5 flex items-start leading-none">
                  <span className="text-blue-800 mr-1 font-bold text-[7px] md:text-[16px]">•</span>
                  <a
                    href={item.href}
                    className="text-[#0000CC] font-bold hover:underline text-[5px] md:text-[13px]"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    {item.text}
                    {item.hasIcon && <span className="ml-0.5 text-[4px] md:text-[11px]">📄</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 3: Twitter 
            - Width: 34% on mobile
        */}
        <div className="flex-[0.28] min-w-0 flex items-center justify-center px-0.5 md:px-2">
          <a
            href="https://twitter.com/RailMinIndia"
            target="_blank"
            className="w-full border border-gray-300 rounded-full bg-white text-[#4b3085] font-bold shadow-sm py-1 md:py-1.5 text-[6px] md:text-[13px] text-center"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}
          >
            Tweets by RailMinIndia
          </a>
        </div>

      </div>
    </div>
  );
}