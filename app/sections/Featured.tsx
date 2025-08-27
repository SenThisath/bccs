"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const Featured = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const sliderRef = useRef(null);
    const autoPlayRef = useRef(null);
    const cursorRef = useRef(null);

    const newsData = [
        {
            id: 1,
            category: "TECHNOLOGY",
            title: "Neural Networks Reshape Digital Reality",
            subtitle: "The Dawn of Artificial Consciousness",
            excerpt:
                "Breakthrough developments in quantum-enhanced AI are creating unprecedented possibilities in human-machine collaboration, fundamentally altering our perception of digital consciousness.",
            author: "Dr. Sarah Chen",
            date: "2025.08.27",
            readTime: "8 MIN",
            image: "https://picsum.photos/1200/800?random=1",
        },
        {
            id: 2,
            category: "SCIENCE",
            title: "Quantum Leap in Ocean Conservation",
            subtitle: "Marine Ecosystem Revolution",
            excerpt:
                "Revolutionary bio-engineering techniques are restoring coral reefs at an unprecedented scale, offering new hope for marine biodiversity and climate resilience.",
            author: "Prof. Marina Rodriguez",
            date: "2025.08.26",
            readTime: "6 MIN",
            image: "https://picsum.photos/1200/800?random=2",
        },
        {
            id: 3,
            category: "SPACE",
            title: "Mars Colonization Protocol Activated",
            subtitle: "Humanity's Greatest Journey",
            excerpt:
                "Advanced terraforming technologies and sustainable habitat systems mark the beginning of humanity's multi-planetary future, with the first permanent settlement planned for 2027.",
            author: "Commander Alex Kim",
            date: "2025.08.25",
            readTime: "12 MIN",
            image: "https://picsum.photos/1200/800?random=3",
        },
        {
            id: 4,
            category: "INNOVATION",
            title: "Molecular Computing Breakthrough",
            subtitle: "Beyond Silicon Limitations",
            excerpt:
                "Scientists achieve molecular-level computing that operates at room temperature, promising computational power beyond current quantum systems and revolutionary energy efficiency.",
            author: "Dr. James Wright",
            date: "2025.08.24",
            readTime: "10 MIN",
            image: "https://picsum.photos/1200/800?random=4",
        },
        {
            id: 5,
            category: "FUTURE",
            title: "Global Consciousness Network Launch",
            subtitle: "Connecting Human Minds",
            excerpt:
                "Revolutionary brain-computer interfaces enable direct thought sharing and collective problem-solving, ushering in an era of unprecedented human collaboration and creativity.",
            author: "Dr. Elena Vasquez",
            date: "2025.08.23",
            readTime: "15 MIN",
            image: "https://picsum.photos/1200/800?random=5",
        },
    ];

    // Function to create a slide dynamically
    const createSlide = (news, index, isNew = false) => {
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
            "bg-image w-full h-full bg-cover bg-center scale-110";
        bgImage.style.backgroundImage = `url(${news.image})`;
        bgImage.style.filter = "grayscale(100%)"; // Apply grayscale for black-and-white palette
        bgContainer.appendChild(bgImage);

        const overlay = document.createElement("div");
        overlay.className = "absolute inset-0 bg-black/50"; // Black overlay for contrast
        bgContainer.appendChild(overlay);

        slide.appendChild(bgContainer);

        // Content Wrapper
        const contentWrapper = document.createElement("div");
        contentWrapper.className =
            "content-wrapper relative z-20 h-full flex items-center";

        const contentInner = document.createElement("div");
        contentInner.className = "w-full max-w-7xl mx-auto px-8 lg:px-16";

        const grid = document.createElement("div");
        grid.className = "grid lg:grid-cols-2 gap-16 items-center";

        // Text Content
        const textContent = document.createElement("div");
        textContent.className = "space-y-8";

        // Category and Date
        const header = document.createElement("div");
        header.className = "animate-in";
        const headerInner = document.createElement("div");
        headerInner.className = "flex items-center gap-4 mb-4";
        headerInner.innerHTML = `
            <span class="text-white/80 text-sm font-mono tracking-wider">${news.category}</span>
            <div class="h-px bg-white/40 flex-1"></div>
            <span class="text-white/60 text-sm font-mono">${news.date}</span>
        `;
        header.appendChild(headerInner);
        textContent.appendChild(header);

        // Title
        const title = document.createElement("div");
        title.className = "animate-in";
        const titleInner = document.createElement("h1");
        titleInner.className =
            "text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight mb-4";
        titleInner.innerHTML = news.title
            .split(" ")
            .map(
                (word, i) =>
                    `<span class="inline-block mr-4 mb-2">${word}</span>`
            )
            .join("");
        title.appendChild(titleInner);
        textContent.appendChild(title);

        // Subtitle
        const subtitle = document.createElement("div");
        subtitle.className = "animate-in";
        subtitle.innerHTML = `<h2 class="text-2xl font-light text-white/90 mb-8 tracking-wide">${news.subtitle}</h2>`;
        textContent.appendChild(subtitle);

        // Excerpt
        const excerpt = document.createElement("div");
        excerpt.className = "animate-in";
        excerpt.innerHTML = `<p class="text-lg text-white/80 leading-relaxed max-w-xl font-light">${news.excerpt}</p>`;
        textContent.appendChild(excerpt);

        // Author and Button
        const footer = document.createElement("div");
        footer.className = "animate-in flex items-center gap-8 pt-4";
        footer.innerHTML = `
            <div>
                <p class="text-white font-semibold">${news.author}</p>
                <p class="text-white/60 text-sm font-mono">${news.readTime}</p>
            </div>
            <button class="group bg-white text-black px-8 py-4 font-bold tracking-wider hover:bg-black hover:text-white transition-all duration-500 relative overflow-hidden">
                <span class="relative z-10">EXPLORE</span>
                <div class="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>
        `;
        textContent.appendChild(footer);

        grid.appendChild(textContent);

        // Visual Element
        const visual = document.createElement("div");
        visual.className = "animate-in hidden lg:block";
        visual.innerHTML = `
            <div class="relative">
                <div class="w-96 h-96 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <div class="w-80 h-80 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <div class="w-64 h-64 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                            <div class="text-white text-8xl font-black opacity-20">
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
        const handleMouseMove = (e) => {
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
    const animateSlide = (newIndex, direction = "next") => {
        if (isAnimating || newIndex === currentIndex) return;

        setIsAnimating(true);

        const slider = sliderRef.current;
        const currentSlide = slider.querySelector(
            `[data-slide="${currentIndex}"]:not([data-slide="new"])`
        );
        const newSlide = createSlide(newsData[newIndex], newIndex, true);
        slider.appendChild(newSlide);

        if (!currentSlide) {
            setIsAnimating(false);
            return;
        }

        const isNext = direction === "next";
        const tl = gsap.timeline({
            onComplete: () => {
                // Remove old slide
                if (currentSlide) currentSlide.remove();
                // Update new slide to be the current one
                newSlide.setAttribute("data-slide", String(newIndex));
                setCurrentIndex(newIndex);
                setIsAnimating(false);
            },
        });

        // Ensure next slide content starts hidden
        gsap.set(newSlide.querySelectorAll(".animate-in"), {
            opacity: 0,
            y: isNext ? 100 : -100,
            rotationX: isNext ? 90 : -90,
        });

        // Animate current slide out
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
                    ease: "power3.inOut",
                },
                0
            )
            .to(
                currentSlide.querySelector(".bg-image"),
                {
                    scale: 1.2,
                    filter: "blur(10px)",
                    duration: 0.8,
                    ease: "power3.inOut",
                },
                0
            );

        // Animate new slide in
        tl.fromTo(
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
                ease: "power3.out",
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
                    ease: "power3.out",
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
                    ease: "back.out(1.7)",
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

    const handleSlideClick = (index) => {
        if (index !== currentIndex) {
            const direction = index > currentIndex ? "next" : "prev";
            animateSlide(index, direction);
        }
    };

    // Auto-play
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

    // Initialize first slide
    useEffect(() => {
        if (sliderRef.current) {
            // Clear any existing content
            sliderRef.current.innerHTML = "";
            // Create and append the initial slide
            const initialSlide = createSlide(newsData[0], 0);
            sliderRef.current.appendChild(initialSlide);
            // Ensure initial slide is visible
            gsap.set(initialSlide, { opacity: 1, scale: 1 });
        }

        startAutoPlay();
        return stopAutoPlay;
    }, []);

    return (
        <div className="relative w-full h-screen bg-black">
            {/* Main Slider Container */}
            <div
                ref={sliderRef}
                className="relative w-full h-full"
                onMouseEnter={stopAutoPlay}
                onMouseLeave={startAutoPlay}
            ></div>

            {/* Navigation */}
            <div className="absolute bottom-8 left-8 right-8 z-30">
                <div className="flex justify-between items-end">
                    {/* Slide Thumbnails */}
                    <div className="flex gap-4">
                        {newsData.map((news, index) => (
                            <button
                                key={news.id}
                                onClick={() => handleSlideClick(index)}
                                disabled={isAnimating}
                                className={`group relative overflow-hidden transition-all duration-500 ${
                                    index === currentIndex
                                        ? "w-32 h-20 opacity-100"
                                        : "w-20 h-12 opacity-60 hover:opacity-80"
                                }`}
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

                    {/* Controls */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={handlePrev}
                            disabled={isAnimating}
                            className="w-12 h-12 border border-white/40 text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
                        >
                            ←
                        </button>
                        <div className="text-white font-mono text-lg">
                            {String(currentIndex + 1).padStart(2, "0")} /{" "}
                            {String(newsData.length).padStart(2, "0")}
                        </div>
                        <button
                            onClick={handleNext}
                            disabled={isAnimating}
                            className="w-12 h-12 border border-white/40 text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(180deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default Featured;
