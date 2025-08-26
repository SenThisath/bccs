"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const Header = () => {
    const [active, setActive] = useState(false);
    const timelineRef = useRef<GSAPTimeline | null>(null);

    useEffect(() => {
        const tl = gsap.timeline({ paused: true });

        tl.to(".block", {
            duration: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            stagger: 0.075,
            ease: "power3.inOut",
        });

        tl.to(
            ".menu-title, .menu-item",
            {
                duration: 0.3,
                opacity: 1,
                stagger: 0.05,
            },
            "-=0.5"
        );

        timelineRef.current = tl;
    }, []);

    useEffect(() => {
        if (timelineRef.current) {
            active ? timelineRef.current.play() : timelineRef.current.reverse();
        }
    }, [active]);

    return (
        <div className="fixed top-0 left-0 w-full z-[100]">
            {/* Navbar */}
            <nav className="fixed top-5 left-0 w-full flex justify-between items-center z-[110] px-4">
                <div className="flex-1 toggle-btn">
                    <button
                        onClick={() => setActive(!active)}
                        className="px-4 py-2 bg-white text-black rounded relative z-[120]"
                    >
                        {active ? "Close" : "Menu"}
                    </button>
                </div>
            </nav>

            {/* Overlay blocks */}
            <div
                className={`fixed top-0 left-0 w-screen h-screen flex z-[90] pointer-events-none`}
            >
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex-1 h-full bg-black mr-[-2px] [clip-path:polygon(0_0,100%_0,100%_0,0_0)] block"
                    />
                ))}
            </div>

            {/* Overlay menu */}
            <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center text-white px-20 py-40 z-[95] pointer-events-none">
                <div className="menu-title flex justify-center items-center w-full opacity-0">
                    <p>[Menu]</p>
                </div>
                <div className="menu-item flex w-full p-4 cursor-pointer opacity-0 transition duration-300">
                    <div className="flex-1 menu-item-year">
                        <p>2024</p>
                    </div>
                    <div className="flex-3 menu-item-name flex justify-center">
                        <p className="font-[PP Formula] text-[4vw] text-center">
                            Digital
                        </p>
                    </div>
                    <div className="flex-1 menu-item-link">
                        <a href="">[explore]</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
