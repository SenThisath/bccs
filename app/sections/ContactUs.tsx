"use client";
import { useEffect, useState } from "react";
import ImageTrail from "@/components/ImageTrail";

const ContactUs = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000); // update every second

        return () => clearInterval(timer); // cleanup on unmount
    }, []);

    const formattedDate = currentDate.toLocaleDateString("en-CA"); // YYYY-MM-DD
    const formattedTime = currentDate.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }); // HH:MM:SS

    return (
        <section
            className="relative min-h-screen flex flex-col w-full items-center bg-white text-black font-sans overflow-hidden p-4 md:p-6 lg:p-8"
            id="contact"
        >
            <div className="w-12 h-12 md:w-16 md:h-16">
                <div className="w-full h-full rounded-full flex items-center justify-center text-xs">
                    <img src={"/logo.png"} />
                </div>
            </div>
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-0 md:flex-nowrap mt-5">
                <div className="hidden md:block pr-8 text-sm lg:text-base">
                    {formattedDate}
                </div>
                <div className="hidden md:block flex-1 h-px bg-black"></div>

                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 px-0 md:px-8 whitespace-nowrap uppercase text-xs md:text-sm">
                    <div className="bg-gray-500 text-white px-4 md:px-8 py-2 md:py-2 rounded-full">
                        email@team.bccs.official@gmail.com
                    </div>
                    <div className="bg-black text-white px-4 md:px-8 py-2 md:py-2 rounded-full">
                        Contact Us
                    </div>
                </div>

                <div className="hidden md:block flex-1 h-px bg-black" />
                <div className="hidden md:block pl-8 text-sm lg:text-base">
                    {formattedTime}
                </div>
            </div>

            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-64 md:h-80 lg:h-96 uppercase">
                <ImageTrail
                    items={[
                        "/tempuz.jpg",
                        "/algortithm.jpg",
                        "/sync.jpg",
                        "/Sagacious.jpg",
                        "xban.jpg",
                    ]}
                    variant={1}
                    className="absolute inset-0 pointer-events-auto"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[15rem] 2xl:text-[18rem] font-bold leading-none text-center">
                        Contact
                    </h1>
                </div>
            </div>

            <div className="absolute bottom-3 md:bottom-5 flex flex-col gap-6 md:gap-10 items-center w-[95%] max-w-7xl uppercase text-xs md:text-sm">
                {/* First row - responsive grid */}
                <div className="flex flex-wrap items-center justify-center md:justify-around w-full gap-4 md:gap-0">
                    <div>Innovate</div> <div>Connect</div> <div>Learn</div>
                    <div>Lead</div>
                </div>
                {/* Social links - responsive layout */}
                <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 sm:gap-0">
                    <h1 className="cursor-pointer hover:opacity-70 transition-opacity">
                        Instagram
                    </h1>
                    <div className="hidden sm:block w-full h-px bg-black mx-4 md:mx-8" />
                    <h1 className="cursor-pointer hover:opacity-70 transition-opacity">
                        Linkedin
                    </h1>
                    <div className="hidden sm:block w-full h-px bg-black mx-4 md:mx-8" />
                    <h1 className="cursor-pointer hover:opacity-70 transition-opacity">
                        Facebook
                    </h1>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
