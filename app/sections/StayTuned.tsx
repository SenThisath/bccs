import FuzzyText from "@/components/FuzzyText";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const StayTuned: React.FC = () => {
    return (
        <div className="relative bg-black text-white h-screen w-full flex flex-col justify-center items-center px-4 md:px-0">
            <div className="w-40 h-16 relative flex items-center justify-center">
                <Image
                    src="/logo2.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                />
            </div>

            <div className="text-center space-y-4 md:space-y-6">
                <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase flex items-center justify-center flex-col">
                    <FuzzyText baseIntensity={0.2}>
                        Coming
                    </FuzzyText>
                    <FuzzyText baseIntensity={0.2}>
                        Soon
                    </FuzzyText>
                </p>
            </div>

            {/* Footer */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[95%] flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 px-2 md:px-4 py-2 text-sm sm:text-base">
                {/* Year */}
                <div className="text-center mb-2 md:mb-0">@2025</div>

                {/* Social Media Links */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {[
                        {
                            name: "FaceBook",
                            link: "https://web.facebook.com/teambccs",
                        },
                        {
                            name: "Instagram",
                            link: "https://www.instagram.com/teambccs/",
                        },
                        {
                            name: "LinkedIn",
                            link: "https://www.linkedin.com/company/teambccs/",
                        },
                        {
                            name: "WhatsApp",
                            link: "https://whatsapp.com/channel/0029ValqqeV9hXFBFpk5N02o",
                        },
                    ].map((link) => (
                        <div
                            key={link.name}
                            className="flex items-center gap-1 md:gap-1.5"
                        >
                            <a href={link.link} className="hover:underline">
                                {link.name}
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
