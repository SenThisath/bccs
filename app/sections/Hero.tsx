"use client";

import { useGSAP } from "@gsap/react";
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
    const lineWrapperTops = ["top-[25%]", "top-[75%]"];

    const socialIcons = [
        { name: "FaceBook", url: "#", icon: FaFacebook },
        { name: "Instagram", url: "#", icon: FaInstagram },
        { name: "LinkedIn", url: "#", icon: FaLinkedin },
        { name: "WhatsApp", url: "#", icon: FaWhatsapp },
    ];

    return (
        <>
            <GlobalStylesAndKeyframes />
            <section className="relative h-screen flex items-center justify-center bg-black text-white font-sans overflow-hidden p-8 sm:p-16">
                {/* Animated Background Lines */}
                {/* <div className="absolute inset-0 w-full h-full overflow-hidden z-[1]">
                    {lineWrapperTops.map((topClass, index) => (
                        <div
                            key={index}
                            className={`absolute w-full h-[100px] ${topClass}`}
                        >
                            <div className="w-full h-0.5 relative overflow-hidden">
                                <div
                                    className={`absolute top-0 w-full h-full animate-[lineMove_4s_linear_infinite] ${
                                        index % 2 !== 0
                                            ? "[animation-direction:reverse] [animation-delay:2s]"
                                            : ""
                                    }`}
                                    style={{
                                        background:
                                            "linear-gradient(90deg, transparent 0%, black 20%, white 50%, black 80%, transparent 100%)",
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div> */}

                <div className="relative w-full min-h-screen flex flex-col justify-between items-center z-20">
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
                    <div className="w-[98%] absolute bottom-10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {socialIcons.map((icon) => {
                                return <icon.icon key={icon.name} size={20} />;
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

const GlobalStylesAndKeyframes = () => (
    <style jsx global>{`
        @keyframes gradientShift {
            0% {
                filter: hue-rotate(0deg);
            }
            100% {
                filter: hue-rotate(30deg);
            }
        }
        @keyframes lineMove {
            0% {
                transform: translateX(-100%);
            }
            100% {
                transform: translateX(100%);
            }
        }
        @keyframes cornerLineAnimation {
            0% {
                stroke-dashoffset: 0;
            }
            25% {
                stroke-dashoffset: 100;
            }
            50% {
                stroke-dashoffset: 200;
            }
            75% {
                stroke-dashoffset: 300;
            }
            100% {
                stroke-dashoffset: 400;
            }
        }
    */
    `}</style>
);

export default Hero;
