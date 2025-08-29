"use client";

import GlassSurface from "@/components/LiquidGlass";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { X, AlignRight } from "lucide-react";

const Header = () => {
    const [active, setActive] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const timelineRef = useRef<GSAPTimeline | null>(null);
    const lastScrollY = useRef(0);

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

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                // Show button when scrolled down
                setShowButton(true);
            } else {
                // Show navbar when at top
                setShowButton(false);
                // Close menu if it's open when returning to top
                if (active) setActive(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [active]);

    // Function to handle menu item clicks
    const handleMenuItemClick = (link: string) => {
        setActive(false); // Close the menu

        // Navigate to the link after a small delay to allow menu to close
        setTimeout(() => {
            if (link === "#") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                const element = document.querySelector(link);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }
        }, 100);
    };

    return (
        <div className="fixed top-0 left-0 w-full z-[100]">
            {/* Full Navbar - shown at top */}
            <GlassSurface
                className={`hidden md:flex fixed top-5 rounded-full left-1/2 -translate-x-1/2 w-[55%] z-[110] px-4 py-2 ${
                    showButton
                        ? "opacity-0 -translate-y-full pointer-events-none"
                        : "opacity-100 translate-y-0"
                } flex justify-center`}
            >
                <div className="flex justify-between items-center max-w-6xl w-full mx-auto text-white">
                    <div className="hidden md:flex items-center justify-around w-full capitalize">
                        <a href="#">Home</a>
                        <a href="#inFocus">In Focus</a>
                        <a href="#ourStory">Our Story</a>
                        <a href="#goalsReached">Projects</a>
                        <a href="#showcase">Showcase</a>
                        <a href="#fallOfFame">Driving Force</a>
                        <a href="#contact">Contact</a>
                    </div>
                </div>
            </GlassSurface>

            <div
                className={`fixed top-5 right-4 z-[110] transition-all duration-300 ease-in-out ${
                    showButton
                        ? "opacity-100 translate-y-0"
                        : "md:opacity-0 md:-translate-y-full md:pointer-events-none"
                }`}
            >
                <GlassSurface
                    onClick={() => setActive(!active)}
                    className="px-4 py-2 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border"
                >
                    {active ? <X /> : <AlignRight />}
                </GlassSurface>
            </div>

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

            {/* Overlay menu - FIXED: Removed pointer-events-none and added proper click handlers */}
            <div
                className={`fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center text-white px-20 py-40 z-[95] ${
                    active ? "pointer-events-auto" : "pointer-events-none"
                }`}
            >
                {/* Multiple menu items */}
                {[
                    { name: "Home", link: "#" },
                    { name: "In Focus", link: "#inFocus" },
                    { name: "Our Story", link: "#ourStory" },
                    {
                        name: "Projects",
                        link: "#goalsReached",
                    },
                    { name: "Showcase", link: "#showcase" },
                    { name: "Driving Force", link: "#fallOfFame" },
                    { name: "Contact", link: "#contact" },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="menu-item flex w-full p-4 cursor-pointer opacity-0 transition duration-300 hover:bg-white/10"
                        onClick={() => handleMenuItemClick(item.link)}
                    >
                        <div className="flex-3 menu-item-name flex justify-center">
                            <p className="font-[PP Formula] text-[3.6vw] text-center">
                                {item.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Header;
