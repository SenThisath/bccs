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
import { SplitTextHeading } from "@/components/SplitText";
import Achievements from "./sections/Achievements";
import Featured from "./sections/Featured";
import About from "./sections/About";
import Works from "./sections/Works";
import StayTuned from "./sections/StayTuned";

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
                .to(loadingBarRef.current.parentElement, {
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
                            <div className="h-screen flex items-center flex-col justify-center gap-5 bg-white text-black">
                                <SplitTextHeading
                                    text="Featured Insights"
                                    className="
    uppercase
    text-[clamp(2rem,12vw,12.35em)] 
    leading-[0.77] 
    w-full 
    text-center 
    font-[Impact] 
    font-normal 
  "
                                    delay={100}
                                    duration={0.6}
                                    ease="power3.out"
                                    splitType="chars"
                                    from={{ opacity: 0, y: 40 }}
                                    to={{ opacity: 1, y: 0 }}
                                    threshold={0.1}
                                    textAlign="center"
                                />

                                <div className="flex items-center justify-center">
                                    <SplitTextHeading
                                        text="Welcome to Insights &amp; Opinions, a microcosm
                                of shared thought where industry experts, guest
                                writers, and our in-house team share insights on
                                fan culture and engagement in the digital era."
                                        className="max-w-[600px] text-center"
                                        delay={100}
                                        duration={0.6}
                                        ease="power3.out"
                                        splitType="lines"
                                        from={{ opacity: 0, y: 40 }}
                                        to={{ opacity: 1, y: 0 }}
                                        threshold={0.1}
                                        textAlign="center"
                                    />
                                </div>
                            </div>
                            <Featured />
                            <div className="h-screen flex items-center flex-col justify-center gap-5 bg-white text-black">
                                <SplitTextHeading
                                    text="who we are"
                                    className="
    uppercase
    text-[clamp(2rem,12vw,12.35em)] 
    leading-[0.77] 
    w-full 
    text-center
    font-[Impact] 
        font-normal 
  "
                                    delay={100}
                                    duration={0.6}
                                    ease="power3.out"
                                    splitType="chars"
                                    from={{ opacity: 0, y: 40 }}
                                    to={{ opacity: 1, y: 0 }}
                                    threshold={0.1}
                                    textAlign="center"
                                />

                                <div className="flex items-center justify-center">
                                    <SplitTextHeading
                                        text="Welcome to Insights &amp; Opinions, a microcosm
                                of shared thought where industry experts, guest
                                writers, and our in-house team share insights on
                                fan culture and engagement in the digital era."
                                        className="max-w-[600px] text-center"
                                        delay={100}
                                        duration={0.6}
                                        ease="power3.out"
                                        splitType="lines"
                                        from={{ opacity: 0, y: 40 }}
                                        to={{ opacity: 1, y: 0 }}
                                        threshold={0.1}
                                        textAlign="center"
                                    />
                                </div>
                            </div>
                            <About />
                            <div className="h-screen flex items-center flex-col justify-center gap-5 bg-white text-black">
                                <SplitTextHeading
                                    text="works"
                                    className="
    uppercase
    text-[clamp(2rem,12vw,12.35em)] 
    leading-[0.77] 
    w-full 
    text-center 
    font-[Impact] 
    font-normal 
  "
                                    delay={100}
                                    duration={0.6}
                                    ease="power3.out"
                                    splitType="chars"
                                    from={{ opacity: 0, y: 40 }}
                                    to={{ opacity: 1, y: 0 }}
                                    threshold={0.1}
                                    textAlign="center"
                                />

                                <div className="flex items-center justify-center">
                                    <p className="max-w-[600px] text-center">
                                        Welcome to Insights &amp; Opinions, a
                                        microcosm of shared thought where
                                        industry experts, guest writers, and our
                                        in-house team share insights on fan
                                        culture and engagement in the digital
                                        era.
                                    </p>
                                </div>
                            </div>
                            <Works />
                            <div className="h-screen flex items-center flex-col justify-center gap-5 bg-white text-black">
                                <SplitTextHeading
                                    text="achievements"
                                    className="
    uppercase
    text-[clamp(2rem,12vw,12.35em)] 
    leading-[0.77] 
    w-full 
    text-center 
    font-[Impact] 
    font-normal 
  "
                                    delay={100}
                                    duration={0.6}
                                    ease="power3.out"
                                    splitType="chars"
                                    from={{ opacity: 0, y: 40 }}
                                    to={{ opacity: 1, y: 0 }}
                                    threshold={0.1}
                                    textAlign="center"
                                />

                                <div className="flex items-center justify-center">
                                    <SplitTextHeading
                                        text="Welcome to Insights &amp; Opinions, a microcosm
                                of shared thought where industry experts, guest
                                writers, and our in-house team share insights on
                                fan culture and engagement in the digital era."
                                        className="max-w-[600px] text-center"
                                        delay={100}
                                        duration={0.6}
                                        ease="power3.out"
                                        splitType="lines"
                                        from={{ opacity: 0, y: 40 }}
                                        to={{ opacity: 1, y: 0 }}
                                        threshold={0.1}
                                        textAlign="center"
                                    />
                                </div>
                            </div>
                            <Achievements />
                            <div className="h-screen flex items-center flex-col justify-center gap-5 bg-black text-white">
                                <SplitTextHeading
                                    text="leaderboard"
                                    className="
    uppercase
    text-[clamp(2rem,12vw,12.35em)] 
    leading-[0.77] 
    w-full 
    text-center 
    font-[Impact] 
    font-normal 
  "
                                    delay={100}
                                    duration={0.6}
                                    ease="power3.out"
                                    splitType="chars"
                                    from={{ opacity: 0, y: 40 }}
                                    to={{ opacity: 1, y: 0 }}
                                    threshold={0.1}
                                    textAlign="center"
                                />

                                <div className="flex items-center justify-center">
                                    <p className="max-w-[600px] text-center">
                                        Welcome to Insights &amp; Opinions, a
                                        microcosm of shared thought where
                                        industry experts, guest writers, and our
                                        in-house team share insights on fan
                                        culture and engagement in the digital
                                        era.
                                    </p>
                                </div>
                            </div>
                            <LeaderBoard />
                            <ContactUs />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
