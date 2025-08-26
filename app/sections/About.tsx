"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GlassSurface from "@/components/LiquidGlass";
import { BinaryBackground } from "@/components/BinaryBackground";
import Image from "next/image";
import TextType from "@/components/TextType";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const About = () => {
    const containerRef = useRef<HTMLElement>(null);

    return (
        <section ref={containerRef} className="bg-white">
            <div>
                <div className="scroll-section vertical-section overflow-hidden">
                    <div className="wrapper h-screen">
                        <div
                            role="list"
                            className="list flex justify-start items-center h-full relative p-1"
                        >
                            <div className="item w-screen h-full flex items-center justify-center absolute inset-0 shadow-lg overflow-hidden sm:flex-row flex-col bg-black"></div>

                            <div className="item w-screen h-full flex items-center justify-center absolute inset-0 shadow-lg overflow-hidden sm:flex-row flex-col bg-black"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Horizontal scroll section */}
            {/* <div className="scroll-section horizontal-section overflow-hidden">
                <div className="wrapper h-screen">
                    <div
                        role="list"
                        className="list flex justify-start items-center h-full relative p-1"
                    >
                        <div className="item w-screen h-full flex absolute inset-0 shadow-lg overflow-hidden sm:flex-row flex-col bg-white">
                            <div className="item_number text-xl h-12 w-12 mb-2 rounded-full bg-black text-white flex items-center justify-center font-normal absolute top-24 left-12 z-10 sm:text-xl text-xs sm:top-24 top-6">
                                1
                            </div>
                            <div className="item_content text-gray-800 flex flex-col justify-center items-start p-12 relative sm:w-1/2 w-full sm:h-full h-1/2 z-10 sm:p-12 p-0">
                                <h2 className="heading sm:text-5xl text-4xl font-bold mb-4 text-gray-800">
                                    Horizontal First
                                </h2>
                                <p className="text-gray-600">
                                    This is the first horizontal scroll item.
                                </p>
                            </div>
                            <div
                                className="item_media sm:w-1/2 w-full sm:h-full h-1/2 object-cover"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                                }}
                            />
                        </div>

                        <div className="item w-screen h-full flex absolute inset-0 shadow-lg overflow-hidden sm:flex-row flex-col bg-black">
                            <div className="item_number text-xl h-12 w-12 mb-2 rounded-full bg-white text-black flex items-center justify-center font-normal absolute top-24 left-12 z-10 sm:text-xl text-xs sm:top-24 top-6">
                                2
                            </div>
                            <div className="item_content text-white flex flex-col justify-center items-start p-12 relative sm:w-1/2 w-full sm:h-full h-1/2 z-10 sm:p-12 p-0">
                                <h2 className="heading sm:text-5xl text-4xl font-bold mb-4 text-white">
                                    Horizontal Second
                                </h2>
                                <p className="text-gray-300">
                                    This is the second horizontal scroll item.
                                </p>
                            </div>
                            <div
                                className="item_media sm:w-1/2 w-full sm:h-full h-1/2 object-cover"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                                }}
                            />
                        </div>

                        <div className="item w-screen h-full flex absolute inset-0 shadow-lg overflow-hidden sm:flex-row flex-col bg-white">
                            <div className="item_number text-xl h-12 w-12 mb-2 rounded-full bg-black text-white flex items-center justify-center font-normal absolute top-24 left-12 z-10 sm:text-xl text-xs sm:top-24 top-6">
                                3
                            </div>
                            <div className="item_content text-gray-800 flex flex-col justify-center items-start p-12 relative sm:w-1/2 w-full sm:h-full h-1/2 z-10 sm:p-12 p-0">
                                <h2 className="heading sm:text-5xl text-4xl font-bold mb-4 text-gray-800">
                                    Horizontal Third
                                </h2>
                                <p className="text-gray-600">
                                    This is the third horizontal scroll item.
                                </p>
                            </div>
                            <div
                                className="item_media sm:w-1/2 w-full sm:h-full h-1/2 object-cover"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                                }}
                            />
                        </div>

                        <div className="item w-screen h-full flex absolute inset-0 shadow-lg overflow-hidden sm:flex-row flex-col bg-black">
                            <div className="item_number text-xl h-12 w-12 mb-2 rounded-full bg-white text-black flex items-center justify-center font-normal absolute top-24 left-12 z-10 sm:text-xl text-xs sm:top-24 top-6">
                                4
                            </div>
                            <div className="item_content text-white flex flex-col justify-center items-start p-12 relative sm:w-1/2 w-full sm:h-full h-1/2 z-10 sm:p-12 p-0">
                                <h2 className="heading sm:text-5xl text-4xl font-bold mb-4 text-white">
                                    Horizontal Fourth
                                </h2>
                                <p className="text-gray-300">
                                    This is the fourth horizontal scroll item.
                                </p>
                            </div>
                            <div
                                className="item_media sm:w-1/2 w-full sm:h-full h-1/2 object-cover"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #e0c3fc 0%, #9bb5ff 100%)",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div> */}
        </section>
    );
};
