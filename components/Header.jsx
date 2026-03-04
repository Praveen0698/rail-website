import Image from "next/image";

export default function Header() {
  return (
       <div className="bg-white border-b border-gray-200">
      <div className="min-w-full px-3 md:px-6 py-3 md:py-1 flex flex-row justify-between items-center">

        {/* Left Section */}
        <div className="flex items-center gap-2 md:gap-3">
          <Image
            src="/indian-blue.png"
            width={50}
            height={50}
            alt="Indian Railways Logo"
            priority
            className="w-[50px] h-[50px] md:w-[75px] md:h-[75px]"
          />
          <div>
            <h1 className="text-[14px] md:text-[26px] font-extrabold tracking-wide text-[#1a1a2e] leading-tight">
              GOVERNMENT OF
              <span className="md:hidden"> INDIA</span>
              <span className="hidden md:inline"> INDIA</span>
            </h1>
            <p className="text-[10px] md:text-[13px] text-gray-500 tracking-[0.1em] md:tracking-[0.2em] font-medium mt-0.5">
              MINISTRY OF RAILWAYS
            </p>
          </div>
        </div>

        {/* Center: Language Toggle - hidden on mobile (shown in topbar instead) */}
        <div className="hidden md:flex flex-col self-start items-center leading-tight text-[#3a3a9a] font-bold select-none cursor-pointer">
          <span className="text-[15px]">अ</span>
          <span className="text-[12px] font-normal">A</span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* International Year of Cooperatives 2025 */}
          <Image
            src="/irctc2025.jpeg"
            width={70}
            height={70}
            alt="International Year of Cooperatives 2025"
            priority
            className="w-17 h-17 md:w-30 md:h-20 xl:w-35 xl:h-25 object-contain"
          />

          {/* Ashoka Emblem */}
          <Image
            src="/emblemBlack.png"
            width={40}
            height={50}
            alt="Ashoka Emblem"
            priority
            className="w-12 h-14 md:w-20 md:h-15 xl:w-30 xl:h-25 object-contain"
          />
        </div>

      </div>
    </div>
  );
}