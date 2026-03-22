const quickLinks = [
  {
    label: "E-Ticketing",
    href: "https://irctc.co.in",
    target: "_blank",
    orange: false,
  },
  {
    label: "Train Time Table",
    href: "https://indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,1,304,366,537,3143",
    target: "_blank",
    orange: false,
  },
  {
    label: "Indian Railways / भारतीय रेल (पत्रिका)",
    href: "HindiMagazine.html",
    target: "_blank",
    orange: false,
  },
  {
    label: "PNR Status",
    href: "https://indianrail.gov.in/pnr_Enq.html",
    target: "_blank",
    orange: true,
  },
  {
    label: "Railway Tenders",
    href: "https://ireps.gov.in/",
    target: "_blank",
    orange: true,
  },
  {
    label: "Bhasha Sangam App",
    href: "https://indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,1,304,366,535,2645",
    target: "_blank",
    orange: true,
  },
  {
    label: "Divyangjan facilities in Zonal Railways",
    href: "https://indianrailways.gov.in/railwayboard/divyang/index.jsp",
    target: "_blank",
    orange: false,
  },
  {
    label: "Rail Drishti",
    href: "https://raildrishti.indianrailways.gov.in/raildrishti/raildrishtiv3/",
    target: "_blank",
    orange: false,
  },
  {
    label: "Rail Madad",
    href: "https://railmadad.indianrailways.gov.in/madad/final/home.jsp",
    target: "_blank",
    orange: false,
  },
];

export default function QuickLinksGrid() {
  return (
    <div className="mt-2 grid grid-cols-3 w-full border-t border-l border-white/20">
      {quickLinks.map((item, i) => (
        <a
          key={i}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center text-center text-white font-bold 
            text-[5px] md:text-[14px] px-1 py-1.5 md:py-3 
            border-r border-b border-white/30 transition-colors leading-tight
            ${item.orange ? "bg-[#f5a623]" : "bg-[#1c6e9e]"}`}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}