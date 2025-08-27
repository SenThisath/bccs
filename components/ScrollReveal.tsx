import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
    children: ReactNode;
    scrollContainerRef?: RefObject<HTMLElement>;
    enableBlur?: boolean;
    baseOpacity?: number;
    baseRotation?: number;
    blurStrength?: number;
    containerClassName?: string;
    textClassName?: string;
    rotationEnd?: string;
    wordAnimationEnd?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    scrollContainerRef,
    enableBlur = true,
    baseOpacity = 0.1,
    baseRotation = 3,
    blurStrength = 4,
    containerClassName = "",
    textClassName = "",
}) => {
    const containerRef = useRef<HTMLHeadingElement>(null);

    const splitText = useMemo(() => {
        const text = typeof children === "string" ? children : "";
        return text.split(/(\s+)/).map((word, index) => {
            if (word.match(/^\s+$/)) return word;
            return (
                <span
                    className="inline-block word text-transparent"
                    style={{
                        WebkitTextStroke: "1px white", // outline
                    }}
                    key={index}
                >
                    {word}
                </span>
            );
        });
    }, [children]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const scroller =
            scrollContainerRef && scrollContainerRef.current
                ? scrollContainerRef.current
                : window;

        const wordElements = el.querySelectorAll<HTMLElement>(".word");

        wordElements.forEach((word) => {
            gsap.fromTo(
                word,
                {
                    opacity: baseOpacity,
                    color: "transparent", // no fill
                    WebkitTextStroke: "1px white", // keep outline
                },
                {
                    opacity: 1,
                    color: "#ffffff", // filled text
                    ease: "power2.inOut",
                    stagger: 2,
                    scrollTrigger: {
                        trigger: word,
                        scroller,
                        start: "top 90%",
                        end: "top 60%",
                        scrub: true,
                    },
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [
        scrollContainerRef,
        enableBlur,
        baseRotation,
        baseOpacity,
        blurStrength,
    ]);

    return (
        <h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
            <p className={`leading-[1.5] ${textClassName} text-[50px] font-polin`}>
                {splitText}
            </p>
        </h2>
    );
};
