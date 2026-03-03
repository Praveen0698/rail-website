import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-[#1c5a85] text-white mt-12 py-6">
      <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Image src="/india-gov.png" width={100} height={40} alt="india" />
          <Image src="/make-in-india.png" width={100} height={40} alt="make" />
        </div>

        <div className="text-sm text-center">
          Copyright © 2011 Centre For Railway Information Systems.
        </div>
      </div>
    </div>
  );
}