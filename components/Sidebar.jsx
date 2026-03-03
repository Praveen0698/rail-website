export default function Sidebar() {
  const menu = [
    "Notifications (CENs)",
    "Notices",
    "Results & Cutoffs",
    "Panels",
    "Public Disclosure of Marks",
    "Scheduled Programmes",
  ];

  return (
    <div className="w-[280px] bg-[#1c4a80] text-white">
      {menu.map((item, index) => (
        <div
          key={index}
          className="px-6 py-5 border-b border-blue-700 hover:bg-[#163a63] cursor-pointer"
        >
          {item}
        </div>
      ))}
    </div>
  );
}