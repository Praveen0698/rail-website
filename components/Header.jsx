import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white w-full border-b border-gray-100 font-sans relative">
      
      {/* Centered Language Toggle: Absolute positioning prevents it from taking up space in the flex row */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-[#2b3990] leading-none cursor-pointer pointer-events-auto">
        <span className="text-[15px] sm:text-[18px] font-bold">अ</span>
        <span className="text-[11px] sm:text-[14px] font-bold -mt-1">A</span>
      </div>

      <div className="max-w-full mx-auto px-2 sm:px-6 md:px-12 flex items-center h-14 sm:h-24 pt-3">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-2 shrink-0">
          <Image
            src="/indian-blue.png" 
            width={72}
            height={72}
            alt="Logo"
            className="w-8 h-8 sm:w-14 md:w-20 md:h-20 object-contain"
          />
          <div className="flex flex-col">
            <h1 className="text-[12px] sm:text-[18px] md:text-[24px] font-black text-black leading-none tracking-tight whitespace-nowrap">
              GOVERNMENT OF INDIA
            </h1>
            <p className="text-[9px] sm:text-[12px] md:text-[16px] text-[#555] font-bold uppercase whitespace-nowrap mt-0.5">
              MINISTRY OF RAILWAYS
            </p>
          </div>
        </div>

        

        {/* Right: Logos pushed to the end using ml-auto */}
        <div className="ml-auto flex items-center gap-2 sm:gap-6 shrink-0">
          {/* 2025 Logo */}
          <div className="flex flex-col items-center">
             <Image
              src="/irctc2025.jpeg" 
              width={100}
              height={100}
              alt="2025"
              className="w-10 h-10 sm:w-20 sm:h-auto object-contain"
            />
          </div>
          
          {/* National Emblem */}
          <div className="flex flex-col items-center">
            <Image
              src="/emblemBlack.png" 
              width={50}
              height={70}
              alt="Emblem"
              className="w-7 h-auto sm:w-10 md:w-12 object-contain"
            />
          </div>
        </div>

      </div>
    </header>
  );
}