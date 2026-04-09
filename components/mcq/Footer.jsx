import Image from "next/image";

const mainLinks = [
  {
    label: "Disclaimer",
    href: "https://indianrailways.gov.in/disclaimer.html",
  },
  {
    label: "Terms & Conditions",
    href: "https://indianrailways.gov.in/terms.html",
  },
  {
    label: "Privacy Policy",
    href: "https://indianrailways.gov.in/privacyPoli.html",
  },
  { label: "Sitemap", href: "https://indianrailways.gov.in/sitemap.html" },
  { label: "Contact Us", href: "https://indianrailways.gov.in/contactUs.html" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a5f8a] text-white w-full font-sans antialiased overflow-hidden">
      {/* Top Border */}
      <div className="border-t border-white/20" />

      {/* Main Container */}
      <div className="w-full px-1.5 sm:px-3 md:px-6 py-2 md:py-3 flex flex-row items-start justify-between gap-1 sm:gap-2">
        {/* --- LEFT SECTION --- */}
        <div className="flex flex-row items-start justify-start md:justify-between gap-1 md:gap-8 shrink-0 max-md:w-[45%]">
          {/* 2×2 Logo Grid */}
          <div className="grid grid-cols-2 gap-x-1 gap-y-1 sm:gap-x-2 sm:gap-y-1.5 md:gap-x-3 md:gap-y-2 w-1/2">
            <a
              href="http://india.gov.in/"
              title="india.govern.in"
              target="_blank"
              rel="nofollow noopener"
            >
              <Image
                src="/india.gov.gif"
                width={100}
                height={44}
                alt="India.govern.in"
                className="h-4 sm:h-5 md:h-10 w-auto object-contain"
              />
            </a>
            <a
              href="http://makeinindia.com"
              title="makeinindia.com"
              target="_blank"
              rel="nofollow noopener"
            >
              <Image
                src="/makeinindia.png"
                width={100}
                height={44}
                alt="makeinindia.com"
                className="h-4 sm:h-5 md:h-10 w-auto object-contain"
              />
            </a>
            <a
              href="http://incredibleindia.org"
              title="incredibleindia"
              target="_blank"
              rel="nofollow noopener"
            >
              <Image
                src="/incredible.png"
                width={120}
                height={44}
                alt="incredibleindia"
                className="h-4 sm:h-5 md:h-10 w-auto object-contain"
              />
            </a>
            <a
              href="https://innovate.mygov.in"
              title="Innovate MyGov"
              target="_blank"
              rel="nofollow noopener"
            >
              <Image
                src="/thumbnail.jpg"
                width={64}
                height={64}
                alt="Innovate MyGov"
                className="h-4 sm:h-5 md:h-10 w-auto object-contain"
              />
            </a>
          </div>

          {/* Last Updated */}
          <div className="text-[6px] sm:text-[7px] lg:text-[13px] font-bold leading-tight whitespace-nowrap pt-0.5 ">
            Last Updated: Thu 6<br />
            <span>Jul 2023</span>
          </div>
        </div>

        {/* --- RIGHT SECTION --- */}
        <div className="flex flex-col items-end text-right min-w-0">
          {/* Links Row */}
          <div className="flex flex-wrap justify-end items-center mb-0.5 md:mb-1 ">
            {mainLinks.map((link, i) => (
              <div key={i} className="flex items-center">
                <a
                  href={link.href}
                  target="_blank"
                  className="text-[6px] sm:text-[6px] lg:text-[13px] font-bold hover:underline whitespace-nowrap"
                >
                  {link.label}
                </a>
                <span className="px-0.5 sm:px-1 md:px-2 text-[7px] sm:text-[7px] md:text-[13px] opacity-70">
                  |
                </span>
              </div>
            ))}
            <a
              href="#"
              className="text-[6px] sm:text-[7px] lg:text-[13px] font-bold hover:underline whitespace-nowrap"
            >
              Facilities for Person with Disability Users
            </a>
          </div>

          {/* Copyright */}
          <p className="text-[5px] sm:text-[6px] lg:text-[12px] font-bold leading-tight opacity-90">
            Copyright @ 2011 Centre For Railway Information Systems. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
