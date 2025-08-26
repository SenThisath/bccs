import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

export interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    ease?: string | ((t: number) => number);
    splitType?: "chars" | "words" | "lines" | "words, chars";
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    threshold?: number;
    rootMargin?: string;
    textAlign?: React.CSSProperties["textAlign"];
    onLetterAnimationComplete?: () => void;
}

export const SplitTextHeading: React.FC<SplitTextProps> = ({
    text,
    className = "",
    delay = 100,
    duration = 0.6,
    ease = "power3.out",
    splitType = "chars",
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = "-100px",
    textAlign = "center",
    onLetterAnimationComplete,
}) => {
    const ref = useRef<HTMLParagraphElement>(null);
    const animationCompletedRef = useRef(false);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined" || !ref.current || !text) return;

        const el = ref.current;

        // Hide the parent element initially to prevent FOUC
        gsap.set(el, { opacity: 0 });

        animationCompletedRef.current = false;

        const absoluteLines = splitType === "lines";
        if (absoluteLines) el.style.position = "relative";

        let splitter: GSAPSplitText;
        try {
            splitter = new GSAPSplitText(el, {
                type: splitType,
                absolute: absoluteLines,
                linesClass: "split-line",
            });
        } catch (error) {
            console.error("Failed to create SplitText:", error);
            return;
        }

        let targets: Element[];
        switch (splitType) {
            case "lines":
                targets = splitter.lines;
                break;
            case "words":
                targets = splitter.words;
                break;
            case "chars":
                targets = splitter.chars;
                break;
            default:
                targets = splitter.chars;
        }

        if (!targets || targets.length === 0) {
            console.warn("No targets found for SplitText animation");
            splitter.revert();
            return;
        }

        targets.forEach((t) => {
            (t as HTMLElement).style.willChange = "transform, opacity";
        });

        // Set initial state for all targets
        gsap.set(targets, { ...from, immediateRender: true, force3D: true });

        // Show the parent container now that children are properly set
        gsap.set(el, { opacity: 1 });
        setIsReady(true);

        const startPct = (1 - threshold) * 100;
        const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(
            rootMargin
        );
        const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
        const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
        const sign =
            marginValue < 0
                ? `-=${Math.abs(marginValue)}${marginUnit}`
                : `+=${marginValue}${marginUnit}`;
        const start = `top ${startPct}%${sign}`;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start,
                end: "bottom 20%", // Define end point
                toggleActions: "play reverse play reverse", // Play on enter, reverse on leave
                once: false, // Allow retriggering
                onToggle: (self) => {
                    scrollTriggerRef.current = self;
                },
            },
            smoothChildTiming: true,
            onComplete: () => {
                animationCompletedRef.current = true;
                gsap.set(targets, {
                    ...to,
                    clearProps: "willChange",
                    immediateRender: true,
                });
                onLetterAnimationComplete?.();
            },
        });

        tl.to(targets, {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
            force3D: true,
        });

        return () => {
            tl.kill();
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }
            gsap.killTweensOf(targets);
            if (splitter) {
                splitter.revert();
            }
        };
    }, [
        text,
        delay,
        duration,
        ease,
        splitType,
        from,
        to,
        threshold,
        rootMargin,
        onLetterAnimationComplete,
    ]);

    return (
        <p
            ref={ref}
            className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
            style={{
                textAlign,
                wordWrap: "break-word",
                visibility: isReady ? "visible" : "hidden", // Prevent layout shift
            }}
        >
            {text}
        </p>
    );
};
