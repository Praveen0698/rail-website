import Image from "next/image";

const ministers = [
  {
    name: "Shri Narendra Modi",
    role: "Honourable Prime Minister of India",
    img: "/modi.png",
  },
  {
    name: "Shri Ashwini Vaishnaw",
    role: "Honourable Minister of Railways",
    img: "/minister1.jpg",
  },
  {
    name: "Shri V. Somanna",
    role: "Honourable Minister of State for Railways",
    img: "/minister2.jpg",
  },
  {
    name: "Shri Ravneet Singh",
    role: "Honourable Minister of State for Railways",
    img: "/minister3.jpg",
  },
];

export default function MinistersSidebar() {
  return (
    <div className="hidden lg:flex flex-col w-[100px] xl:w-[200px] shrink-0 gap-0 border border-gray-200 bg-white shadow-sm self-start">
      {ministers.map((m, i) => (
        <div
          key={i}
          className={`flex flex-col items-center text-center px-3 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${
            i !== ministers.length - 1 ? "border-b border-gray-200" : ""
          }`}
        >
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image
              src={m.img}
              fill
              alt={m.name}
              className="object-contain object-top"
            />
          </div>
          <h3 className="font-semibold text-[12px] xl:text-[13px] mt-2 text-gray-800 leading-tight">
            {m.name}
          </h3>
          <p className="text-[11px] xl:text-[12px] text-gray-500 mt-0.5 leading-tight">
            {m.role}
          </p>
        </div>
      ))}
    </div>
  );
}