import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const StayTuned = () => {
    return (
        <div className="relative bg-black text-white h-screen w-full flex flex-col justify-center items-center">
            <div className="w-45 h-20 relative overflow-hidden flex items-center justify-center">
                <Image
                    src="/logo2.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                />
            </div>

            <div className="text-center space-y-6">
                <p className="text-7xl md:text-9xl font-extrabold uppercase leading-30">
                    Coming <br /> Soon
                </p>
            </div>

            {/* Footer */}
            <div className="absolute w-[95%] bottom-5 left-1/2 -translate-x-1/2 flex items-center justify-between px-4 py-2">
                <div className="flex gap-5">
                    {["FaceBook", "Instagram"].map((link) => (
                        <div key={link} className="flex gap-0.5">
                            <a href="#" className="hover:underline">
                                {link}
                            </a>
                            <ArrowUpRight />
                        </div>
                    ))}
                </div>
                <div>@2025</div>
                <div className="flex gap-5">
                    {["LinkedIn", "WhatsApp"].map((link) => (
                        <div key={link} className="flex gap-0.5">
                            <a href="#" className="hover:underline">
                                {link}
                            </a>
                            <ArrowUpRight />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StayTuned;
