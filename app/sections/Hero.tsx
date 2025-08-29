"use client";

import Image from "next/image";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaWhatsapp,
} from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BinaryBackground } from "@/components/BinaryBackground";
import TextType from "@/components/TextType";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const socialIcons = [
        {
            name: "FaceBook",
            url: "https://web.facebook.com/teambccs",
            icon: FaFacebook,
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/teambccs/",
            icon: FaInstagram,
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/company/teambccs/",
            icon: FaLinkedin,
        },
        {
            name: "WhatsApp",
            url: "https://whatsapp.com/channel/0029ValqqeV9hXFBFpk5N02o",
            icon: FaWhatsapp,
        },
    ];

    return (
        <>
            <section className="relative h-screen flex items-center justify-center bg-black text-white font-sans overflow-hidden p-8 sm:p-16">
                <div className="relative w-full h-full flex flex-col justify-between items-center z-20">
                    <div className="relative flex justify-center items-center flex-1 w-full">
                        <div className="absolute w-full h-1/2 bg-60 z-1 flex items-center justify-center">
                            <BinaryBackground
                                speed={0.5}
                                fontSize={32}
                                color="#fff"
                                density={0.5}
                                fadeOpacity={0.05}
                                direction="right"
                                characters=" 0 1 "
                                className="absolute opacity-7"
                            />

                            <div className="relative flex flex-col items-center justify-center text-center gap-3">
                                <div className="absolute w-[600px] h-[800px] rounded-full bg-white/13 blur-[200px]" />
                                <Image
                                    src="/hash.png"
                                    alt="logo"
                                    width={250}
                                    height={200}
                                    priority
                                />
                                <TextType
                                    text={[
                                        "The Revelution Between",
                                        "One's & Zero's",
                                    ]}
                                    typingSpeed={75}
                                    pauseDuration={1500}
                                    showCursor={true}
                                    cursorCharacter="|"
                                    textColors={["#747474"]}
                                    className="text-sm font-bold bottom-0"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-[98%] absolute bottom-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {socialIcons.map((icon) => {
                                return (
                                    <div key={icon.name}>
                                        <a href={icon.url}>
                                            <icon.icon
                                                key={icon.name}
                                                size={20}
                                            />
                                        </a>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="">
                            <div>Computer Society</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
