import Image from "next/image";

const footerLinks = [
  { label: "Disclaimer", href: "https://indianrailways.gov.in/disclaimer.html" },
  { label: "Terms & Conditions", href: "https://indianrailways.gov.in/terms.html" },
  { label: "Privacy Policy", href: "https://indianrailways.gov.in/privacyPoli.html" },
  { label: "Sitemap", href: "https://indianrailways.gov.in/sitemap.html" },
  { label: "Contact Us", href: "https://indianrailways.gov.in/contactUs.html" },
  { label: "Facilities for Person with Disability Users", href: "https://indianrailways.gov.in/FacilitiesPWD.pdf" },
];


export default function Footer() {
  return (
    <footer className="bg-[#1a5f8a] text-white mt-6">
      <div className="border-t-2 border-white/30" />

      <div className="px-4 md:px-8 py-5 flex flex-col md:flex-row items-center gap-4">

        {/* ══ LEFT HALF: 2×2 Logos + Last Updated ══ */}
        <div className="flex flex-row justify-between items-center gap-6 w-full md:w-1/2">

          {/* 2×2 Logo Grid */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-2">
            <a href="http://india.gov.in/" title="india.govern.in" target="_blank" rel="nofollow noopener">
              <Image src="/india.gov.gif" width={120} height={44} alt="India.govern.in" className="h-10 w-auto object-contain" />
            </a>
            <a href="http://makeinindia.com" title="makeinindia.com" target="_blank" rel="nofollow noopener">
              <Image src="/makeinindia.png" width={120} height={44} alt="makeinindia.com" className="h-10 w-auto object-contain" />
            </a>
            <a href="http://incredibleindia.org" title="incredibleindia" target="_blank" rel="nofollow noopener">
              <Image src="/incredible.png" width={120} height={44} alt="incredibleindia" className="h-10 w-auto object-contain" />
            </a>
            <a href="https://innovate.mygov.in" title="incredibleindia" target="_blank" rel="nofollow noopener">
              <Image src="/thumbnail.jpg" width={64} height={64} alt="Innovate MyGov" className="h-10 w-auto object-contain" />
            </a>
          </div>

          {/* Last Updated */}
          <div className="text-[13px] md:text-[15px] font-bold leading-snug">
            Last Updated: Thu 6<br />Jul 2023
          </div>

        </div>

        {/* ══ RIGHT HALF: Links + Copyright ══ */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start md:items-end text-left md:text-right text-[12px] md:text-[13px] xl:text-[15px] leading-relaxed">
          <div className="flex flex-wrap md:justify-end gap-x-1 gap-y-1 mb-1">
            {footerLinks.map((link, i) => (
              <span key={i} className="flex items-center">
                <a href={link.href} target="_blank" rel="nofollow noopener" className="text-white font-semibold hover:underline whitespace-nowrap">
                  {link.label}
                </a>
                {i < footerLinks.length - 1 && (
                  <span className="mx-1 text-white/60">|</span>
                )}
              </span>
            ))}
          </div>
          <p className="text-[11px] md:text-[12px] xl:text-[13px] font-semibold text-white/90">
            Copyright @ 2011 Centre For Railway Information Systems. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}