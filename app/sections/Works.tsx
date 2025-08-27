"use client";

import GlassSurface from "@/components/LiquidGlass";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useEffect } from "react";

gsap.registerPlugin(CustomEase);

const Works = () => {
    useEffect(() => {
        const totalSlides = 7;
        let currentSlide = 1;
        let isAnimating = false;
        let scrollAllowed = true;
        let lastScrollTime = 0;

        const slideTitles = [
            "Field Unit",
            "Astral Convergence",
            "Eclipse Core",
            "Luminous",
            "Serenity",
            "Nebula Point",
            "Horizon",
        ];

        const slideDescriptions = [
            "Concept Art",
            "Soundscape",
            "Experimental Film",
            "Editorial",
            "Music Video",
            "VFX",
            "Set Design",
        ];

        function createSlide(slideNumber: number, direction: string) {
            const slide = document.createElement("div");
            slide.className = "slide";
            slide.setAttribute("data-slide", "new"); // Mark as new for identification

            const slideBgImg = document.createElement("div");
            slideBgImg.className = "slide-bg-img";

            const img = document.createElement("img");
            img.src = `https://picsum.photos/400/600?random=${slideNumber}`;
            slideBgImg.appendChild(img);
            slide.appendChild(slideBgImg);

            if (direction === "down") {
                slideBgImg.style.clipPath =
                    "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
            } else {
                slideBgImg.style.clipPath =
                    "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
            }

            return slide;
        }

        function createMainImageWrapper(
            slideNumber: number,
            direction: string
        ) {
            const wrapper = document.createElement("div");
            wrapper.className = "slide-main-img-wrapper";
            wrapper.setAttribute("data-wrapper", "new"); // Mark as new for identification

            const img = document.createElement("img");
            img.src = `https://picsum.photos/400/600?random=${slideNumber}`;
            wrapper.appendChild(img);

            if (direction === "down") {
                wrapper.style.clipPath =
                    "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
            } else {
                wrapper.style.clipPath =
                    "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
            }

            return wrapper;
        }

        function createTextElements(slideNumber: number, direction: string) {
            const newTitle = document.createElement("h1");
            newTitle.textContent = slideTitles[slideNumber - 1];
            newTitle.setAttribute("data-title", "new"); // Mark as new
            gsap.set(newTitle, { y: direction === "down" ? 50 : -50 });

            const newDescription = document.createElement("p");
            newDescription.textContent = slideDescriptions[slideNumber - 1];
            newDescription.setAttribute("data-description", "new"); // Mark as new
            gsap.set(newDescription, { y: direction === "down" ? 20 : -20 });

            const newCounter = document.createElement("p");
            newCounter.textContent = slideNumber.toString();
            newCounter.setAttribute("data-counter", "new"); // Mark as new
            gsap.set(newCounter, { y: direction === "down" ? 18 : -18 });

            return { newTitle, newDescription, newCounter };
        }

        function animateSlide(direction: string) {
            if (isAnimating || !scrollAllowed) return;
            isAnimating = true;
            scrollAllowed = false;

            const slider = document.querySelector(".slider");
            const mainImageContainer =
                document.querySelector(".slide-main-img");
            const titleContainer = document.querySelector(".slide-title");
            const descriptionContainer =
                document.querySelector(".slide-description");
            const counterContainer = document.querySelector(".count");

            // Get current elements (ones without data attributes or with data="current")
            const currentSliderElement =
                slider?.querySelector(".slide:not([data-slide='new'])") ||
                slider?.querySelector(".slide");
            const currentMainWrapper =
                mainImageContainer?.querySelector(
                    ".slide-main-img-wrapper:not([data-wrapper='new'])"
                ) ||
                mainImageContainer?.querySelector(".slide-main-img-wrapper");
            const currentTitle =
                titleContainer?.querySelector("h1:not([data-title='new'])") ||
                titleContainer?.querySelector("h1");
            const currentDescription =
                descriptionContainer?.querySelector(
                    "p:not([data-description='new'])"
                ) || descriptionContainer?.querySelector("p");
            const currentCounter =
                counterContainer?.querySelector(
                    "p:not([data-counter='new'])"
                ) || counterContainer?.querySelector("p");

            if (direction === "down") {
                currentSlide =
                    currentSlide === totalSlides ? 1 : currentSlide + 1;
            } else {
                currentSlide =
                    currentSlide === 1 ? totalSlides : currentSlide - 1;
            }

            const newSlide = createSlide(currentSlide, direction);
            const newMainWrapper = createMainImageWrapper(
                currentSlide,
                direction
            );
            const { newTitle, newDescription, newCounter } = createTextElements(
                currentSlide,
                direction
            );

            slider?.appendChild(newSlide);
            mainImageContainer?.appendChild(newMainWrapper);
            titleContainer?.appendChild(newTitle);
            descriptionContainer?.appendChild(newDescription);
            counterContainer?.appendChild(newCounter);

            gsap.set(newMainWrapper.querySelector("img"), {
                y: direction === "down" ? "-50%" : "50%",
            });

            const tl = gsap.timeline({
                onComplete: () => {
                    // Remove old elements
                    if (currentSliderElement) currentSliderElement.remove();
                    if (currentMainWrapper) currentMainWrapper.remove();
                    if (currentTitle) currentTitle.remove();
                    if (currentDescription) currentDescription.remove();
                    if (currentCounter) currentCounter.remove();

                    // Update data attributes for new elements to mark them as current
                    newSlide.removeAttribute("data-slide");
                    newMainWrapper.removeAttribute("data-wrapper");
                    newTitle.removeAttribute("data-title");
                    newDescription.removeAttribute("data-description");
                    newCounter.removeAttribute("data-counter");

                    isAnimating = false;
                    setTimeout(() => {
                        scrollAllowed = true;
                        lastScrollTime = Date.now();
                    }, 100);
                },
            });

            tl.to(
                newSlide.querySelector(".slide-bg-img"),
                {
                    clipPath:
                        direction === "down"
                            ? "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
                            : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: 1.25,
                    ease: CustomEase.create("", ".87, 0, .13, 1"),
                },
                0
            )
                .to(
                    currentSliderElement?.querySelector("img") ?? [],
                    {
                        scale: 1.5,
                        duration: 1.25,
                        ease: CustomEase.create("", ".87, 0, .13, 1"),
                    },
                    0
                )
                .to(
                    newMainWrapper,
                    {
                        clipPath:
                            direction === "down"
                                ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                                : "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                        duration: 1.25,
                        ease: CustomEase.create("", ".87, 0, .13, 1"),
                    },
                    0
                )
                .to(
                    currentMainWrapper?.querySelector("img") ?? [],
                    {
                        y: direction === "down" ? "50%" : "-50%",
                        duration: 1.25,
                        ease: CustomEase.create("", ".87, 0, .13, 1"),
                    },
                    0
                )
                .to(
                    newMainWrapper.querySelector("img"),
                    {
                        y: "0%",
                        duration: 1.25,
                        ease: CustomEase.create("", ".87, 0, .13, 1"),
                    },
                    0
                )
                .to(
                    currentTitle ? currentTitle : [],
                    {
                        y: direction === "down" ? -50 : 50,
                        duration: 1.25,
                        ease: CustomEase.create("", ".87, 0, .13, 1"),
                    },
                    0
                )
                .to(
                    newTitle,
                    {
                        y: 0,
                        duration: 1.25,
                        ease: CustomEase.create("", ".87, 0, .13, 1"),
                    },
                    0
                )
                .to(
                    currentDescription ? currentDescription : [],
                    {
                        y: direction === "down" ? -20 : 20,
                        duration: 1.25,
                        ease: CustomEase.create("", ".87, 0, .13, 1"),
                    },
                    0
                )
                .to(
                    newDescription,
                    {
                        y: 0,
                        duration: 1.25,
                        ease: CustomEase.create("", ".87, 0, .13, 1"),
                    },
                    0
                )
                .to(
                    currentCounter ? currentCounter : [],
                    {
                        y: direction === "down" ? -18 : 18,
                        duration: 1.25,
                        ease: CustomEase.create("", ".87, 0, .13, 1"),
                    },
                    0
                )
                .to(
                    newCounter,
                    {
                        y: 0,
                        duration: 1.25,
                        ease: CustomEase.create("", ".87, 0, .13, 1"),
                    },
                    0
                );
        }

        function handleScroll(direction: string) {
            const now = Date.now();
            if (isAnimating || !scrollAllowed) return;
            if (now - lastScrollTime < 1000) return;
            lastScrollTime = now;
            animateSlide(direction);
        }

        function handleButtonClick(direction: string) {
            if (isAnimating || !scrollAllowed) return;
            animateSlide(direction);
        }

        // ---- Event handlers ----
        interface WheelHandlerEvent extends WheelEvent {
            deltaY: number;
        }

        const wheelHandler = (e: WheelHandlerEvent) => {
            e.preventDefault();
            const direction: "down" | "up" = e.deltaY > 0 ? "down" : "up";
            handleScroll(direction);
        };

        let touchStartY = 0;
        let isTouchActive = false;

        interface TouchStartEvent extends TouchEvent {
            touches: TouchList;
        }

        const touchStartHandler = (e: TouchStartEvent) => {
            touchStartY = e.touches[0].clientY;
            isTouchActive = true;
        };

        interface TouchMoveEvent extends TouchEvent {
            touches: TouchList;
        }

        const touchMoveHandler = (e: TouchMoveEvent) => {
            e.preventDefault();
            if (!isTouchActive || isAnimating || !scrollAllowed) return;
            const touchCurrentY: number = e.touches[0].clientY;
            const difference: number = touchStartY - touchCurrentY;
            if (Math.abs(difference) > 10) {
                isTouchActive = false;
                const direction: "down" | "up" = difference > 0 ? "down" : "up";
                handleScroll(direction);
            }
        };

        const touchEndHandler = () => {
            isTouchActive = false;
        };

        // ---- Mouse drag handlers ----
        let mouseStartX = 0;
        let isMouseDragging = false;
        let hasMouseMoved = false;

        const mouseDownHandler = (e: Event) => {
            const mouseEvent = e as MouseEvent;
            if (isAnimating || !scrollAllowed) return;
            mouseStartX = mouseEvent.clientX;
            isMouseDragging = true;
            hasMouseMoved = false;
            mouseEvent.preventDefault();
        };

        interface MouseMoveHandlerEvent extends MouseEvent {
            clientX: number;
        }

        const mouseMoveHandler = (e: MouseMoveHandlerEvent) => {
            if (!isMouseDragging) return;
            const difference: number = e.clientX - mouseStartX;
            if (Math.abs(difference) > 5) {
                hasMouseMoved = true;
            }
        };

        interface MouseUpHandlerEvent extends MouseEvent {
            clientX: number;
        }

        const mouseUpHandler = (e: MouseUpHandlerEvent) => {
            if (!isMouseDragging || !hasMouseMoved) {
                isMouseDragging = false;
                return;
            }

            const difference: number = e.clientX - mouseStartX;
            if (Math.abs(difference) > 50) {
                // Minimum drag distance
                const direction: "up" | "down" = difference > 0 ? "up" : "down"; // Right drag = previous, Left drag = next
                handleScroll(direction);
            }

            isMouseDragging = false;
            hasMouseMoved = false;
        };

        // ---- Button click handlers ----
        const prevButtonHandler = () => handleButtonClick("up");
        const nextButtonHandler = () => handleButtonClick("down");

        // ---- Attach listeners ----
        window.addEventListener("wheel", wheelHandler, { passive: false });
        window.addEventListener("touchstart", touchStartHandler, {
            passive: false,
        });
        window.addEventListener("touchmove", touchMoveHandler, {
            passive: false,
        });
        window.addEventListener("touchend", touchEndHandler);

        // Mouse drag listeners
        const slider = document.querySelector(".slider");
        slider?.addEventListener("mousedown", mouseDownHandler);
        window.addEventListener("mousemove", mouseMoveHandler);
        window.addEventListener("mouseup", mouseUpHandler);

        // Button listeners
        const prevButton = document.getElementById("prev-btn");
        const nextButton = document.getElementById("next-btn");
        prevButton?.addEventListener("click", prevButtonHandler);
        nextButton?.addEventListener("click", nextButtonHandler);

        // ---- Init first text/counter ----
        const titleContainer = document.querySelector(".slide-title");
        const descriptionContainer =
            document.querySelector(".slide-description");
        const counterContainer = document.querySelector(".count");

        // Clear any existing content first
        if (titleContainer) titleContainer.innerHTML = "";
        if (descriptionContainer) descriptionContainer.innerHTML = "";
        if (counterContainer) counterContainer.innerHTML = "";

        const { newTitle, newDescription, newCounter } = createTextElements(
            1,
            "down"
        );

        // Remove the "new" data attributes since these are the initial elements
        newTitle.removeAttribute("data-title");
        newDescription.removeAttribute("data-description");
        newCounter.removeAttribute("data-counter");

        titleContainer?.appendChild(newTitle);
        descriptionContainer?.appendChild(newDescription);
        counterContainer?.appendChild(newCounter);

        // Set initial positions to 0
        gsap.set([newTitle, newDescription, newCounter], { y: 0 });

        // ---- Cleanup ----
        return () => {
            window.removeEventListener("wheel", wheelHandler);
            window.removeEventListener("touchstart", touchStartHandler);
            window.removeEventListener("touchmove", touchMoveHandler);
            window.removeEventListener("touchend", touchEndHandler);

            // Remove mouse drag listeners
            const slider = document.querySelector(".slider");
            slider?.removeEventListener("mousedown", mouseDownHandler);
            window.removeEventListener("mousemove", mouseMoveHandler);
            window.removeEventListener("mouseup", mouseUpHandler);

            // Remove button listeners
            const prevButton = document.getElementById("prev-btn");
            const nextButton = document.getElementById("next-btn");
            prevButton?.removeEventListener("click", prevButtonHandler);
            nextButton?.removeEventListener("click", nextButtonHandler);
        };
    }, []);

    return (
        <div className="relative">
            <footer>
                <p>All Projects</p>
                <div className="slider-counter">
                    <div className="count"></div>
                    <p>/</p>
                    <p>7</p>
                </div>
            </footer>

            <div
                id="prev-btn"
                style={{ userSelect: "none" }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white transition-all duration-300 hover:scale-110"
            >
                <GlassSurface className="p-2 rounded-full">
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15 18L9 12L15 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </GlassSurface>
            </div>

            <div
                id="next-btn"
                style={{ userSelect: "none" }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white transition-all duration-300 hover:scale-110"
            >
                <GlassSurface className="p-2 rounded-full">
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9 18L15 12L9 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </GlassSurface>
            </div>

            <div
                className="slider"
                style={{ cursor: "grab", userSelect: "none" }}
            >
                <div className="slide">
                    <div className="slide-bg-img">
                        <img src="https://picsum.photos/400/600?random=1" />
                    </div>
                </div>
                <div className="slide-main-img">
                    <div className="slide-main-img-wrapper">
                        <img src="https://picsum.photos/400/600?random=1" />
                    </div>
                </div>
                <div className="slide-copy">
                    <div className="slide-title"></div>
                    <div className="slide-description"></div>
                </div>
            </div>
        </div>
    );
};

export default Works;
