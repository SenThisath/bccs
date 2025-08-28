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
import Achievements from "./sections/Achievements";
import Featured from "./sections/Featured";
import About from "./sections/About";
import Works from "./sections/Works";
import StayTuned from "./sections/StayTuned";
import Heading from "@/components/Heading";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function LoadingAnimation() {
    const [count, setCount] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const containerRef = useRef(null);
    const loadingBarRef = useRef(null);
    const countRef = useRef(null);
    const contentRef = useRef(null);

    const stayTuned = false;

    // Loading animation
    useGSAP(
        () => {
            if (!stayTuned) return; // skip loader entirely

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
        if (!loadingBarRef.current || !containerRef.current) return;
        const lenis = new Lenis();
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    }, []);

    return (
        <div className={`${!showContent && "h-screen overflow-hidden"}`}>
            {!stayTuned ? (
                <StayTuned />
            ) : (
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
                            <Heading
                                title="Featured Insights"
                                desc="Welcome to Insights &amp; Opinions, a microcosm
                                of shared thought where industry experts, guest
                                writers, and our in-house team share insights on
                                fan culture and engagement in the digital era."
                            />

                            <Featured />

                            <Heading
                                title="who we are"
                                desc="Welcome to Insights &amp; Opinions, a microcosm
                                of shared thought where industry experts, guest
                                writers, and our in-house team share insights on
                                fan culture and engagement in the digital era."
                            />

                            {/* <About /> */}

                            <Heading
                                title="works"
                                desc="Welcome to Insights &amp; Opinions, a
                                        microcosm of shared thought where
                                        industry experts, guest writers, and our
                                        in-house team share insights on fan
                                        culture and engagement in the digital
                                        era."
                            />

                            <Works />

                            <Heading
                                title="achievements"
                                desc="Welcome to Insights &amp; Opinions, a microcosm
                                of shared thought where industry experts, guest
                                writers, and our in-house team share insights on
                                fan culture and engagement in the digital era."
                            />

                            <Achievements />

                            <Heading
                                title="leaderboard"
                                desc=" Welcome to Insights &amp; Opinions, a
                                        microcosm of shared thought where
                                        industry experts, guest writers, and our
                                        in-house team share insights on fan
                                        culture and engagement in the digital
                                        era."
                            />

                            <LeaderBoard />
                            <ContactUs />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
