import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const StayTuned: React.FC = () => {
  return (
    <div className="relative bg-black text-white h-screen w-full flex flex-col justify-center items-center px-4 md:px-0">
      {/* Logo */}
      <div className="w-24 h-24 md:w-36 md:h-36 relative overflow-hidden flex items-center justify-center mb-6">
        <Image
          src="/logo2.png"
          alt="Logo"
          fill
          className="object-contain"
        />
      </div>

      {/* Main Text */}
      <div className="text-center space-y-4 md:space-y-6">
        <p className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase leading-tight md:leading-tight">
          Coming <br /> Soon
        </p>
      </div>

      {/* Footer */}
      <div className="absolute w-[95%] bottom-5 left-1/2 -translate-x-1/2 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 px-2 md:px-4 py-2 text-sm sm:text-base">
        {/* Left Links */}
        <div className="flex gap-3 md:gap-5 flex-wrap justify-center">
          {["FaceBook", "Instagram"].map((link) => (
            <div key={link} className="flex gap-1 md:gap-1.5 items-center">
              <a href="#" className="hover:underline">
                {link}
              </a>
              <ArrowUpRight size={16} />
            </div>
          ))}
        </div>

        {/* Center Year */}
        <div className="text-center">@2025</div>

        {/* Right Links */}
        <div className="flex gap-3 md:gap-5 flex-wrap justify-center">
          {["LinkedIn", "WhatsApp"].map((link) => (
            <div key={link} className="flex gap-1 md:gap-1.5 items-center">
              <a href="#" className="hover:underline">
                {link}
              </a>
              <ArrowUpRight size={16} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StayTuned;
