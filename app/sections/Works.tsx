"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const Works = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const sliderRef = useRef<HTMLDivElement>(null);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
    const cursorRef = useRef(null);

    const newsData = [
        {
            id: 1,
            category: "TECHNOLOGY",
            title: "XBan 2025",
            subtitle: "Where Innovation Meets Imagination",
            excerpt:
                "XBan is the flagship event of BCCS, bringing together brilliant minds to showcase creativity, technology, and problem-solving skills. From competitions to exhibitions, it’s a platform for students to push boundaries, share ideas, and experience the future of tech and innovation.",
            author: "Dr. Sarah Chen",
            date: "2025.08.27",
            readTime: "8 MIN",
            image: "/xban.jpg",
        },
        {
            id: 2,
            category: "SCIENCE",
            title: "Achievement at Sync 2025",
            subtitle: "Proud Winners at Dharmaraja College",
            excerpt:
                "Our team participated in Synz, the prestigious ICT day at Dharmaraja College, Kandy, and secured a notable victory. This photo captures our proud moment, celebrating innovation, teamwork, and excellence in technology.",
            author: "Prof. Marina Rodriguez",
            date: "2025.08.26",
            readTime: "6 MIN",
            image: "algortithm.jpg",
        },
    ];

    const createSlide = (
        news: {
            id: number;
            category: string;
            title: string;
            subtitle: string;
            excerpt: string;
            author: string;
            date: string;
            readTime: string;
            image: string;
        },
        index: number,
        isNew = false
    ) => {
        const slide = document.createElement("div");
        slide.className = `absolute inset-0 ${
            isNew
                ? "opacity-0 scale-120"
                : index === 0
                ? "opacity-100"
                : "opacity-0"
        }`;
        slide.setAttribute("data-slide", isNew ? "new" : String(index));
        slide.style.perspective = "1000px";
        slide.style.zIndex =
            index === currentIndex && !isNew ? "20" : String(index);

        // Background Image with Parallax
        const bgContainer = document.createElement("div");
        bgContainer.className = "absolute inset-0 overflow-hidden";

        const bgImage = document.createElement("div");
        bgImage.className =
            "bg-image w-full h-full bg-cover bg-center scale-110 transition-transform duration-500";
        bgImage.style.backgroundImage = `url(${news.image})`;
        bgImage.style.filter = "grayscale(100%)";
        bgContainer.appendChild(bgImage);

        const overlay = document.createElement("div");
        overlay.className = "absolute inset-0 bg-black/50";
        bgContainer.appendChild(overlay);

        slide.appendChild(bgContainer);

        // Content Wrapper
        const contentWrapper = document.createElement("div");
        contentWrapper.className =
            "content-wrapper relative z-20 h-full flex items-center justify-center pt-10 pb-10 sm:pt-16 sm:pb-16";

        const contentInner = document.createElement("div");
        contentInner.className = "w-full px-4 sm:px-6 lg:px-16 max-w-6xl mx-auto";

        const grid = document.createElement("div");
        grid.className = "grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center";

        // Text Content
        const textContent = document.createElement("div");
        textContent.className = "space-y-4 sm:space-y-6";

        // Category and Date
        const header = document.createElement("div");
        header.className = "animate-in";
        const headerInner = document.createElement("div");
        headerInner.className = "flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3";
        headerInner.innerHTML = `
            <span class="text-white/80 text-xs sm:text-sm font-mono tracking-wider">${news.category}</span>
            <div class="h-px bg-white/40 flex-1"></div>
            <span class="text-white/60 text-xs sm:text-sm font-mono">${news.date}</span>
        `;
        header.appendChild(headerInner);
        textContent.appendChild(header);

        // Title
        const title = document.createElement("div");
        title.className = "animate-in";
        const titleInner = document.createElement("h1");
        titleInner.className =
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-3 sm:mb-4";
        titleInner.innerHTML = news.title
            .split(" ")
            .map(
                (word, i) =>
                    `<span class="inline-block mr-1 sm:mr-2 mb-1 sm:mb-2">${word}</span>`
            )
            .join("");
        title.appendChild(titleInner);
        textContent.appendChild(title);

        // Subtitle
        const subtitle = document.createElement("div");
        subtitle.className = "animate-in";
        subtitle.innerHTML = `<h2 class="text-xl sm:text-2xl font-light text-white/90 mb-4 sm:mb-6 tracking-wide">${news.subtitle}</h2>`;
        textContent.appendChild(subtitle);

        // Excerpt
        const excerpt = document.createElement("div");
        excerpt.className = "animate-in";
        excerpt.innerHTML = `<p class="text-base sm:text-lg text-white/80 leading-relaxed max-w-prose font-light">${news.excerpt}</p>`;
        textContent.appendChild(excerpt);

        grid.appendChild(textContent);

        // Visual Element
        const visual = document.createElement("div");
        visual.className = "animate-in hidden lg:block";
        visual.innerHTML = `
            <div class="relative">
                <div class="w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <div class="w-56 sm:w-72 md:w-80 h-56 sm:h-72 md:h-80 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <div class="w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                            <div class="text-white text-5xl sm:text-6xl md:text-7xl font-black opacity-20">
                                ${String(index + 1).padStart(2, "0")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(visual);

        contentInner.appendChild(grid);
        contentWrapper.appendChild(contentInner);
        slide.appendChild(contentWrapper);

        return slide;
    };

    // Mouse tracking for parallax effects
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            setMousePosition({
                x: (clientX / innerWidth - 0.5) * 2,
                y: (clientY / innerHeight - 0.5) * 2,
            });

            if (cursorRef.current) {
                gsap.to(cursorRef.current, {
                    x: clientX,
                    y: clientY,
                    duration: 0.3,
                    ease: "power2.out",
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Parallax effect for backgrounds
    useEffect(() => {
        if (sliderRef.current) {
            const activeSlide = sliderRef.current.querySelector(
                `[data-slide="${currentIndex}"]:not([data-slide="new"])`
            );
            if (activeSlide) {
                const bgImage = activeSlide.querySelector(".bg-image");
                if (bgImage) {
                    gsap.to(bgImage, {
                        x: mousePosition.x * 20,
                        y: mousePosition.y * 20,
                        duration: 0.5,
                        ease: "power2.out",
                    });
                }
            }
        }
    }, [mousePosition, currentIndex]);

    // Animation for slides
    const animateSlide = (newIndex: number, direction = "next") => {
        if (isAnimating || newIndex === currentIndex) return;

        setIsAnimating(true);

        const slider = sliderRef.current;
        const currentSlide = slider?.querySelector(
            `[data-slide="${currentIndex}"]:not([data-slide="new"])`
        );
        const newSlide = createSlide(newsData[newIndex], newIndex, true);
        slider?.appendChild(newSlide);

        if (!currentSlide) {
            setIsAnimating(false);
            return;
        }

        const isNext = direction === "next";
        const tl = gsap.timeline({
            onComplete: () => {
                if (currentSlide) currentSlide.remove();
                newSlide.setAttribute("data-slide", String(newIndex));
                setCurrentIndex(newIndex);
                setIsAnimating(false);
            },
        });

        gsap.set(newSlide.querySelectorAll(".animate-in"), {
            opacity: 0,
            y: isNext ? 100 : -100,
            rotationX: isNext ? 90 : -90,
        });

        tl.to(
            currentSlide,
            {
                opacity: 0,
                scale: 0.8,
                rotationY: isNext ? -15 : 15,
                duration: 0.8,
                ease: "power3.inOut",
            },
            0
        )
            .to(
                currentSlide.querySelector(".content-wrapper"),
                {
                    y: isNext ? -100 : 100,
                    opacity: 0,
                    duration: 0.6,
                },
                0
            )
            .to(
                currentSlide.querySelector(".bg-image"),
                {
                    scale: 1.2,
                    filter: "blur(10px)",
                    duration: 0.8,
                },
                0
            )
            .fromTo(
                newSlide,
                {
                    opacity: 0,
                    scale: 1.2,
                    rotationY: isNext ? 15 : -15,
                },
                {
                    opacity: 1,
                    scale: 1,
                    rotationY: 0,
                    duration: 1,
                },
                0.3
            )
            .fromTo(
                newSlide.querySelector(".bg-image"),
                { scale: 1.3, filter: "blur(20px)" },
                {
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 1.2,
                },
                0.3
            )
            .to(
                newSlide.querySelectorAll(".animate-in"),
                {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 0.8,
                    stagger: 0.1,
                },
                0.6
            );
    };

    const handleNext = () => {
        const newIndex = (currentIndex + 1) % newsData.length;
        animateSlide(newIndex, "next");
    };

    const handlePrev = () => {
        const newIndex =
            currentIndex === 0 ? newsData.length - 1 : currentIndex - 1;
        animateSlide(newIndex, "prev");
    };

    const handleSlideClick = (index: number) => {
        if (index !== currentIndex) {
            const direction = index > currentIndex ? "next" : "prev";
            animateSlide(index, direction);
        }
    };

    const startAutoPlay = () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        autoPlayRef.current = setInterval(handleNext, 8000);
    };

    const stopAutoPlay = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }
    };

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.innerHTML = "";
            const initialSlide = createSlide(newsData[0], 0);
            sliderRef.current.appendChild(initialSlide);
            gsap.set(initialSlide, { opacity: 1, scale: 1 });
        }

        startAutoPlay();
        return stopAutoPlay;
    }, []);

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            <div
                ref={sliderRef}
                className="relative w-full h-full"
                onMouseEnter={stopAutoPlay}
                onMouseLeave={startAutoPlay}
            ></div>

            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 z-30 flex flex-col sm:flex-row justify-between items-end gap-2 sm:gap-4">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 overflow-x-auto hide-scrollbar">
                    {newsData.map((news, index) => (
                        <button
                            key={news.id}
                            onClick={() => handleSlideClick(index)}
                            disabled={isAnimating}
                            className={`group relative overflow-hidden transition-all duration-500 ${
                                index === currentIndex
                                    ? "w-20 sm:w-24 md:w-32 h-12 sm:h-16 md:h-20 opacity-100"
                                    : "w-16 sm:w-20 md:w-24 h-10 sm:h-12 md:h-16 opacity-60 hover:opacity-80"
                            } min-w-[64px] sm:min-w-[80px]`}
                        >
                            <img
                                src={news.image}
                                alt={news.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-black/50" />
                            <div className="absolute inset-0 border-2 border-white/20 group-hover:border-white/60 transition-all duration-300" />
                            {index === currentIndex && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={isAnimating}
                        className="w-8 sm:w-10 h-8 sm:h-10 border border-white/40 text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
                    >
                        ←
                    </button>
                    <div className="text-white font-mono text-sm sm:text-base">
                        {String(currentIndex + 1).padStart(2, "0")} /{" "}
                        {String(newsData.length).padStart(2, "0")}
                    </div>
                    <button
                        onClick={handleNext}
                        disabled={isAnimating}
                        className="w-8 sm:w-10 h-8 sm:h-10 border border-white/40 text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Works;