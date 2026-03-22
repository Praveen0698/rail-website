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
    /*
      Mobile  : w-[68px]   — narrow strip beside carousel
      md      : w-[110px]
      xl      : w-[220px]
    */
    <div className="flex flex-col w-[68px] md:w-[110px] xl:w-[220px] shrink-0 bg-white border-l border-gray-200 self-start">
      {ministers.map((m, i) => (
        <div
          key={i}
          className={`flex flex-col items-center text-center px-0.5 md:px-2 py-1.5 md:py-4 cursor-pointer hover:bg-gray-50 transition-colors ${
            i !== ministers.length - 1 ? "border-b border-gray-200" : ""
          }`}
        >
          {/* Photo */}
          <div className="relative w-full aspect-[7/5] md:aspect-[4/3] overflow-hidden">
            <Image
              src={m.img}
              fill
              alt={m.name}
              className="object-contain object-top"
            />
          </div>

          {/* Name */}
          <h3 className="font-semibold text-[5px] md:text-[11px] xl:text-[13px] mt-0.5 text-gray-800 leading-tight">
            {m.name}
          </h3>

          {/* Role */}
          <p className="text-[5px] md:text-[10px] xl:text-[11px] text-gray-500 mt-0.5 leading-tight">
            {m.role}
          </p>
        </div>
      ))}
    </div>
  );
}