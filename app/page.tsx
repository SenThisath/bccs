"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Hero from "./sections/Hero";
import { LeaderBoard } from "./sections/LeaderBoard";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import Header from "./sections/Header";
import ContactUs from "./sections/ContactUs";
import Featured from "./sections/Featured";
import About from "./sections/About";
import Works from "./sections/Works";
import Heading from "@/components/Heading";
import { Achievements } from "./sections/Achievements";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function LoadingAnimation() {
    const [count, setCount] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const containerRef = useRef(null);
    const loadingBarRef = useRef(null);
    const countRef = useRef(null);
    const contentRef = useRef(null);

    // Loading animation
    useGSAP(
        () => {
            if (!loadingBarRef.current || !containerRef.current) return;
            const tl = gsap.timeline();

            tl.to(
                {},
                {
                    duration: 3,
                    ease: "none",
                    onUpdate: function () {
                        const progress = Math.floor(this.progress() * 100);
                        setCount(progress);
                    },
                }
            )
                .to(
                    loadingBarRef.current,
                    {
                        width: "100%",
                        duration: 3,
                        ease: "none",
                    },
                    0
                )
                .to({}, { duration: 0.3 })
                .to((loadingBarRef.current as HTMLElement).parentElement, {
                    rotation: 90,
                    scale: 900,
                    transformOrigin: "center",
                    duration: 1.5,
                    ease: "power4.inOut",
                })
                .to(
                    countRef.current,
                    {
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.out",
                    },
                    "-=1.2"
                )
                .call(() => setShowContent(true));
        },
        { scope: containerRef }
    );

    useEffect(() => {
        const lenis = new Lenis();
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    }, []);
    return (
        <div className={`${!showContent && "h-screen overflow-hidden"}`}>
            <>
                <div
                    ref={containerRef}
                    className={`fixed inset-0 bg-black z-50 transition-opacity duration-1000 ${
                        showContent
                            ? "opacity-0 pointer-events-none"
                            : "opacity-100"
                    }`}
                >
                    {/* Counter */}
                    <div
                        ref={countRef}
                        className="absolute bottom-8 left-8 text-6xl font-light tracking-wider text-white"
                        style={{ fontFamily: "Arial, sans-serif" }}
                    >
                        {count.toString().padStart(3, "0")}
                    </div>

                    {/* Loading Bar Container */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="w-48 h-1 bg-gray-700 relative overflow-hidden">
                            <div
                                ref={loadingBarRef}
                                className="h-full bg-white"
                                style={{ width: "0%" }}
                            />
                        </div>
                    </div>

                    {/* Grid Pattern Background */}
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="w-full h-full"
                            style={{
                                backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
                                backgroundSize: "30px 30px",
                            }}
                        />
                    </div>
                </div>

                {showContent && (
                    <div
                        className="w-full h-full overflow-hidden"
                        ref={contentRef}
                    >
                        <Header />
                        <Hero />
                        <div id="inFocus">
                            <Heading
                                title="In Focus"
                                desc="
Discover fresh perspectives and thought-provoking ideas that shape the future. Our insights bring clarity, knowledge, and inspiration to help you stay ahead.
"
                            />
                        </div>

                        <Featured />

                        <div></div>

                        <Heading
                            title="Our Story"
                            desc="We are a team driven by passion, purpose, and innovation. Learn more about our journey, our values, and the people who make everything possible.
"
                        />

                        <About />

                        <Heading
                            title="Showcase"
                            desc="Our work speaks through impact. Explore the projects, solutions, and initiatives that bring our vision to life and create meaningful change."
                        />

                        <Works />

                        <Heading
                            title="Goals Reached"
                            desc="Every milestone reflects our commitment and hard work. From small victories to major recognitions, we celebrate progress that defines our growth.
"
                        />

                        <Achievements />

                        <Heading
                            title="Hall of fame
"
                            desc="Excellence deserves recognition. Our leaderboard showcases the top performers and innovators who set the standard and inspire others to rise.
"
                        />

                        <LeaderBoard />
                        <ContactUs />
                    </div>
                )}
            </>
        </div>

    );
}
