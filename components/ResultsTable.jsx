import Image from "next/image";

export default function ResultsTable() {
  const rows = [
    {
      date: "24-02-2026",
      subject:
        "CEN RPF 02/2024: RPF/RPSF Zonal Control Contact Number.",
      size: "158.74 KB",
    },
    {
      date: "23-02-2026",
      subject: "CEN RPF 02/2024: Attestation Form.",
      size: "220.69 KB",
    },
    {
      date: "23-02-2026",
      subject: "CEN RPF 02/2024: List of Zone Allotment.",
      size: "7058.08 KB",
    },
  ];

  return (
    <div className="flex-1 bg-white border border-gray-300">
      
      {/* Header */}
      <div className="grid grid-cols-[150px_1fr_150px] bg-[#1c4a80] text-white font-semibold px-6 py-4">
        <div>DATE</div>
        <div>SUBJECT</div>
        <div>VIEW</div>
      </div>

      {rows.map((row, index) => (
        <div
          key={index}
          className="grid grid-cols-[150px_1fr_150px] px-6 py-5 border-b border-gray-200"
        >
          <div>{row.date}</div>
          <div className="font-medium">{row.subject}</div>
          <div className="flex items-center gap-2">
            <Image
              src="/pdf-icon.png"
              width={18}
              height={18}
              alt="pdf"
            />
            <span className="text-blue-700 font-semibold cursor-pointer">
              {row.size}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}