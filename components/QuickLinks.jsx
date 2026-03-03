const quickLinks = [
  { label: "E-Ticketing", orange: false },
  { label: "Train Time Table", orange: false },
  { label: "Indian Railways (Magazine)", orange: false },
  { label: "PNR Status", orange: true },
  { label: "Railway Tenders", orange: true },
  { label: "Bhasha Sangam App", orange: true },
  { label: "Divyangjan facilities in Zonal Railways", orange: false },
  { label: "Rail Drishti", orange: false },
  { label: "Rail Madad", orange: false },
];

export default function QuickLinksGrid() {
  return (
    <div className="mt-4 grid grid-cols-3 border border-gray-300">
      {quickLinks.map((item, i) => (
        <a
          key={i}
          href="#"
          className={`flex items-center justify-center text-center text-white font-bold text-[11px] md:text-[13px] lg:text-[14px] px-2 py-4 md:py-5 border border-white/20 hover:brightness-110 transition-all leading-snug
            ${item.orange ? "bg-[#f5a623]" : "bg-[#1c6e9e]"}`}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}