"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Project {
    id: number;
    title: string;
    client: string;
    year: string;
    category: string;
    description: string;
    image: string;
    color: string;
    accent: string;
}

interface MouseVelocity {
    x: number;
    y: number;
}

interface MousePosition {
    x: number;
    y: number;
}

export const Achievements = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [mouseVelocity, setMouseVelocity] = useState<MouseVelocity>({
        x: 0,
        y: 0,
    });
    const [lastMousePos, setLastMousePos] = useState<MousePosition>({
        x: 0,
        y: 0,
    });
    const containerRef = useRef<HTMLDivElement>(null);
    const waveRef = useRef<HTMLDivElement>(null);
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);
    const noiseRef = useRef<HTMLDivElement>(null);

    const projects: Project[] = [
        {
            id: 1,
            title: "Aspect",
            client: "Tesla Neural",
            year: "2025",
            category: "AI Consciousness",
            description:
                "The first ever dedicated ict competition in bandaranayake college gampaha was launched officially, By the principal of bandaranayake college",
            image: "/Aspect.png",
            color: "#00f5ff",
            accent: "#7209b7",
        },
        {
            id: 2,
            title: "XBan-24",
            client: "Meta Reality Labs",
            year: "2025",
            category: "XR Interface",
            description:
                "XBan is the flagship event of BCCS, bringing together brilliant minds to showcase creativity, technology, and problem-solving skills.",
            image: "/xban.jpg",
            color: "#ff006e",
            accent: "#8338ec",
        },
    ];

    // Advanced mouse tracking with velocity
    useEffect(() => {
        let animationId: number;

        const updateMouseVelocity = () => {
            setMouseVelocity((prev) => ({
                x: prev.x * 0.8,
                y: prev.y * 0.8,
            }));
            animationId = requestAnimationFrame(updateMouseVelocity);
        };

        updateMouseVelocity();

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            setMouseVelocity({
                x: (clientX - lastMousePos.x) * 0.1,
                y: (clientY - lastMousePos.y) * 0.1,
            });

            setLastMousePos({ x: clientX, y: clientY });

            // Distortion effect on elements
            const distortionElements =
                document.querySelectorAll(".distort-on-hover");
            distortionElements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distance = Math.sqrt(
                    Math.pow(clientX - centerX, 2) +
                        Math.pow(clientY - centerY, 2)
                );
                const maxDistance = 200;
                const force = Math.max(0, 1 - distance / maxDistance);

                gsap.to(el, {
                    skewX: (clientX - centerX) * force * 0.01,
                    skewY: (clientY - centerY) * force * 0.01,
                    scaleX: 1 + force * 0.05,
                    scaleY: 1 - force * 0.02,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, [lastMousePos]);

    // Noise animation
    useEffect(() => {
        if (!noiseRef.current) return;

        const animateNoise = () => {
            gsap.to(noiseRef.current, {
                opacity: 0.02 + Math.random() * 0.01,
                duration: 0.1,
                ease: "none",
                onComplete: animateNoise,
            });
        };

        animateNoise();
    }, []);

    // Wave distortion animation
    useEffect(() => {
        if (!waveRef.current) return;

        gsap.to(waveRef.current, {
            rotation: 360,
            duration: 20,
            ease: "none",
            repeat: -1,
        });
    }, []);

    // Experimental slide transition
    const quantumTransition = (
        newIndex: number,
        direction: "next" | "prev" = "next"
    ) => {
        if (isAnimating || newIndex === currentIndex || !containerRef.current)
            return;

        setIsAnimating(true);

        const currentSlide = containerRef.current.querySelector(
            `[data-slide="${currentIndex}"]`
        ) as HTMLElement;
        const nextSlide = containerRef.current.querySelector(
            `[data-slide="${newIndex}"]`
        ) as HTMLElement;

        if (!currentSlide || !nextSlide) {
            setIsAnimating(false);
            return;
        }

        // Master timeline
        const masterTl = gsap.timeline({
            onComplete: () => {
                setCurrentIndex(newIndex);
                setIsAnimating(false);

                // Reset all slides
                gsap.set(".slide-panel", {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    filter: "none",
                    scale: 1,
                    opacity: (i: number, el: Element) =>
                        el.getAttribute("data-slide") == newIndex.toString()
                            ? 1
                            : 0,
                    zIndex: (i: number, el: Element) =>
                        el.getAttribute("data-slide") == newIndex.toString()
                            ? 10
                            : 1,
                });
            },
        });

        // Liquid morphing transition
        masterTl.to(
            currentSlide,
            {
                clipPath:
                    direction === "next"
                        ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
                        : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
                duration: 1,
                ease: "power4.inOut",
            },
            0.2
        );

        // Glitch effect
        masterTl.to(
            currentSlide,
            {
                filter: "hue-rotate(180deg) saturate(200%) contrast(150%)",
                duration: 0.1,
                repeat: 5,
                yoyo: true,
                ease: "none",
            },
            0.5
        );

        // Next slide entrance with glitch birth
        gsap.set(nextSlide, {
            opacity: 1,
            zIndex: 10,
            clipPath:
                direction === "next"
                    ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
                    : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
            filter: "brightness(0) contrast(200%)",
            scale: 1.1,
        });

        masterTl.to(
            nextSlide,
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                filter: "none",
                scale: 1,
                duration: 1.2,
                ease: "power4.out",
            },
            0.4
        );

        // Text emergence with quantum effect
        const nextTexts = nextSlide.querySelectorAll(".quantum-text");
        gsap.set(nextTexts, {
            opacity: 0,
            y: 100,
            rotationX: 90,
            filter: "blur(20px)",
        });

        masterTl.to(
            nextTexts,
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                filter: "blur(0px)",
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(2)",
            },
            0.8
        );

        // Screen distortion wave
        masterTl
            .fromTo(
                ".screen-distortion",
                {
                    scaleY: 0,
                    opacity: 1,
                },
                {
                    scaleY: 1,
                    duration: 0.6,
                    ease: "power3.out",
                },
                0.2
            )
            .to(
                ".screen-distortion",
                {
                    scaleY: 0,
                    duration: 0.4,
                    ease: "power3.in",
                },
                0.8
            );
    };

    const handleNavigation = (direction: "next" | "prev") => {
        let newIndex: number;
        if (direction === "next") {
            newIndex = (currentIndex + 1) % projects.length;
        } else {
            newIndex =
                currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
        }
        quantumTransition(newIndex, direction);
    };

    const handleDotClick = (index: number) => {
        if (index !== currentIndex && !isAnimating) {
            const direction: "next" | "prev" =
                index > currentIndex ? "next" : "prev";
            quantumTransition(index, direction);
        }
    };

    // Auto-advance
    useEffect(() => {
        const startAutoplay = () => {
            autoplayRef.current = setInterval(() => {
                if (!isAnimating) {
                    handleNavigation("next");
                }
            }, 8000);
        };

        startAutoplay();
        return () => {
            if (autoplayRef.current) {
                clearInterval(autoplayRef.current);
            }
        };
    }, [currentIndex, isAnimating]);

    // Initialize
    useEffect(() => {
        if (containerRef.current) {
            const slides =
                containerRef.current.querySelectorAll("[data-slide]");
            slides.forEach((slide, index) => {
                if (index === 0) {
                    gsap.set(slide, { opacity: 1, zIndex: 10 });
                } else {
                    gsap.set(slide, { opacity: 0, zIndex: 1 });
                }
            });
        }
    }, []);

    const currentProject = projects[currentIndex];

    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden bg-black"
        >
            {/* Noise Texture */}
            <div
                ref={noiseRef}
                className="absolute inset-0 opacity-[0.02] pointer-events-none z-50"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    mixBlendMode: "overlay",
                }}
            />

            {/* Screen Distortion Effect */}
            <div
                className="screen-distortion absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 pointer-events-none z-40"
                style={{ transform: "scaleY(0)", transformOrigin: "center" }}
            />

            {/* Quantum Wave Background */}
            <div
                ref={waveRef}
                className="absolute inset-0 opacity-5"
                style={{
                    background: `conic-gradient(from 0deg at 50% 50%, ${currentProject.color}40, transparent, ${currentProject.accent}40, transparent)`,
                    filter: "blur(100px)",
                }}
            />

            {/* Main Slides Container */}
            <div className="relative w-full h-full">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        data-slide={index}
                        className="slide-panel absolute inset-0"
                    >
                        {/* Background Image with Advanced Effects */}
                        <div className="absolute inset-0">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                                style={{
                                    filter: `hue-rotate(${
                                        mouseVelocity.x * 2
                                    }deg) saturate(${
                                        120 + mouseVelocity.y
                                    }%) brightness(${
                                        90 + Math.abs(mouseVelocity.x) * 2
                                    }%)`,
                                }}
                            />
                            <div
                                className="absolute inset-0 mix-blend-overlay"
                                style={{
                                    background: `linear-gradient(${
                                        45 + mouseVelocity.x
                                    }deg, ${project.color}60, transparent, ${
                                        project.accent
                                    }60)`,
                                }}
                            />
                            <div className="absolute inset-0 bg-black/50" />
                        </div>

                        {/* Content Grid */}
                        <div className="relative z-10 h-full flex items-center">
                            <div className="w-full max-w-7xl mx-auto px-12 grid grid-cols-12 gap-8 items-center">
                                {/* Left Content */}
                                <div className="col-span-6 space-y-12">
                                    {/* Main Title */}
                                    <div className="quantum-text">
                                        <h1 className="text-[clamp(4rem,12vw,8rem)] font-black text-white leading-none tracking-tighter distort-on-hover">
                                            {project.title
                                                .split("")
                                                .map((letter, i) => (
                                                    <span
                                                        key={i}
                                                        className="inline-block transition-all duration-300"
                                                        style={{
                                                            transform: `translateY(${
                                                                Math.sin(
                                                                    Date.now() *
                                                                        0.001 +
                                                                        i
                                                                ) * 2
                                                            }px) rotateZ(${
                                                                mouseVelocity.x *
                                                                0.1
                                                            }deg)`,
                                                            color: `hsl(${
                                                                (Date.now() *
                                                                    0.01 +
                                                                    i * 10) %
                                                                360
                                                            }, 70%, 90%)`,
                                                        }}
                                                    >
                                                        {letter}
                                                    </span>
                                                ))}
                                        </h1>
                                    </div>

                                    {/* Description */}
                                    <div className="quantum-text distort-on-hover max-w-lg space-y-6">
                                        <p className="text-xl text-white/80 font-light leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* CTA */}
                                    <div className="quantum-text">
                                        <button className="group distort-on-hover relative flex items-center gap-6 text-white text-lg font-light tracking-wider">
                                            <div
                                                className="w-16 h-16 border border-white/30 flex items-center justify-center transition-all duration-500 group-hover:border-white group-hover:scale-110"
                                                style={{
                                                    clipPath:
                                                        "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                                                }}
                                            >
                                                <div className="w-4 h-4 bg-white transform group-hover:rotate-45 transition-transform duration-300" />
                                            </div>
                                            <span className="group-hover:tracking-widest transition-all duration-500">
                                                EXPLORE PROJECT
                                            </span>
                                            <div className="absolute -bottom-1 left-20 w-0 h-px bg-white group-hover:w-32 transition-all duration-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quantum Navigation */}
            <div className="absolute bottom-12 left-12 z-30 flex items-center gap-8">
                {projects.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        disabled={isAnimating}
                        className={`relative transition-all duration-500 ${
                            index === currentIndex ? "w-16 h-1" : "w-8 h-1"
                        }`}
                    >
                        <div
                            className={`w-full h-full transition-all duration-500 ${
                                index === currentIndex
                                    ? "bg-white"
                                    : "bg-white/20 hover:bg-white/50"
                            }`}
                            style={{
                                background:
                                    index === currentIndex
                                        ? `linear-gradient(90deg, ${currentProject.color}, white, ${currentProject.accent})`
                                        : undefined,
                                filter:
                                    index === currentIndex
                                        ? "blur(0.5px)"
                                        : "none",
                            }}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};
