"use client";

import gsap from "gsap";
import React, { useEffect } from "react";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

const Works = () => {
    const sliderContent = [
        { name: "Serene Space", img: "https://picsum.photos/400/600?random=1" },
        { name: "Gentle Horizon", img: "https://picsum.photos/400/600?random=2" },
        { name: "Quiet Flow", img: "https://picsum.photos/400/600?random=3" },
        { name: "Ethereal Light", img: "https://picsum.photos/400/600?random=4" },
        { name: "Calm Drift", img: "https://picsum.photos/400/600?random=5" },
        { name: "Subtle Balance", img: "https://picsum.photos/400/600?random=6" },
    ];

    useEffect(() => {
        CustomEase.create(
            "hop",
            "M0,0 CO.488, 0.02 0.467, 0.286 0.5, 0.5 0.532, 0.712 0.58, 1 1, 1"
        );
        
        const slider = document.querySelector(".slider");
        const sliderTitle = document.querySelector(".slider-title");
        const sliderCounter = document.querySelector(".slider-counter p span:first-child");
        const sliderItems = document.querySelector(".slider-items");
        const sliderPreview = document.querySelector(".slider-preview");
        const totalSlides = sliderContent.length;
        let activeSlideIndex = 1;
        let isAnimating = false;
        
        const clipPath = {
            closed: "polygon(25% 30%, 75% 30%, 75% 70%, 25% 70%) ",
            open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        };
        
        const slidePositions = {
            prev: { left: "15%", rotation: -90 },
            active: { left: "50%", rotation: 0 },
            next: { left: "85%", rotation: 90 },
        };

        function splitTextIntoSpans(element) {
            if (element) {
                element.innerHTML = element.innerText
                    .split("")
                    .map(char => `<span>${char === " " ? "&nbsp;" : char}</span>`)
                    .join("");
            }
        }

        function createAndAnimateTitle(content, direction) {
            const existingTitles = sliderTitle?.querySelectorAll("h1");
            existingTitles?.forEach((title) => title.remove());

            const newTitle = document.createElement("h1");
            newTitle.innerText = content.name;
            sliderTitle?.appendChild(newTitle);
            splitTextIntoSpans(newTitle);

            const yOffset = direction === "next" ? 60 : -60;
            gsap.set(newTitle.querySelectorAll("span"), { y: yOffset });
            gsap.to(newTitle.querySelectorAll("span"), {
                y: 0,
                duration: 1.25,
                stagger: 0.02,
                ease: "hop",
                delay: 0.25,
            });
        }

        function createSlide(content, className) {
            const slide = document.createElement("div");
            slide.className = `slider-container ${className}`;
            slide.innerHTML = `
                <div class="slide-img">
                    <img src="${content.img}" alt="${content.name}" />
                </div>
            `;
            return slide;
        }

        function getSlideIndex(increment) {
            return (
                ((activeSlideIndex + increment - 1 + totalSlides) % totalSlides) + 1
            );
        }

        function updateCounterAndHightLight(index) {
            if (sliderCounter) {
                sliderCounter.textContent = index;
            }
            sliderItems?.querySelectorAll("p").forEach((item, i) => {
                item.classList.toggle("activeItem", i === index - 1);
            });
        }

        function updatePreviewImage(content) {
            const existingImages = sliderPreview?.querySelectorAll("img");
            existingImages?.forEach((img) => img.remove());

            const newImage = document.createElement("img");
            newImage.src = content.img;
            newImage.alt = content.name;

            sliderPreview?.appendChild(newImage);

            gsap.fromTo(
                newImage,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.inOut",
                }
            );
        }

        function animateSlide(slide, props) {
            gsap.to(slide, { 
                left: props.left,
                rotation: props.rotation,
                clipPath: props.clipPath,
                duration: 2, 
                ease: "hop" 
            });
            gsap.to(slide.querySelectorAll(".slide-img"), {
                rotation: -props.rotation,
                duration: 2,
                ease: "hop",
            });
        }

        function transitionSlides(direction) {
            if (isAnimating) return;
            isAnimating = true;

            const [outgoingPos, incomingPos] =
                direction === "next" ? ["prev", "next"] : ["next", "prev"];
            const outgoingSlide = slider.querySelector(`.${outgoingPos}`);
            const activeSlide = slider.querySelector(`.active`);
            const incomingSlide = slider.querySelector(`.${incomingPos}`);

            animateSlide(incomingSlide, {
                ...slidePositions.active,
                clipPath: clipPath.open,
            });
            animateSlide(activeSlide, {
                ...slidePositions[outgoingPos],
                clipPath: clipPath.closed,
            });
            gsap.to(outgoingSlide, {
                scale: 0,
                opacity: 0,
                duration: 2,
                ease: "hop",
            });

            const newSlideIndex = getSlideIndex(direction === "next" ? 2 : -2);
            const newSlide = createSlide(
                sliderContent[newSlideIndex - 1],
                incomingPos
            );

            slider?.appendChild(newSlide);

            // Fixed positioning - ensure proper centering
            gsap.set(newSlide, {
                left: slidePositions[incomingPos].left,
                top: "50%",
                xPercent: -50,
                yPercent: -50,
                rotation: slidePositions[incomingPos].rotation,
                scale: 0,
                opacity: 0,
                clipPath: clipPath.closed,
            });

            gsap.to(newSlide, {
                scale: 1,
                opacity: 1,
                duration: 2,
                ease: "hop",
            });

            const newActiveIndex = getSlideIndex(direction === "next" ? 1 : -1);

            createAndAnimateTitle(sliderContent[newActiveIndex - 1], direction);
            updatePreviewImage(sliderContent[newActiveIndex - 1]);
            setTimeout(() => updateCounterAndHightLight(newActiveIndex), 1000);

            function updateAllSlideImages() {
                const prevIndex = getSlideIndex(-1);
                const activeIndex = activeSlideIndex;
                const nextIndex = getSlideIndex(1);

                const prevSlide = slider.querySelector(".prev .slide-img img");
                if (prevSlide) {
                    prevSlide.src = sliderContent[prevIndex - 1].img;
                    prevSlide.alt = sliderContent[prevIndex - 1].name;
                }

                const activeSlideImg = slider.querySelector(".active .slide-img img");
                if (activeSlideImg) {
                    activeSlideImg.src = sliderContent[activeIndex - 1].img;
                    activeSlideImg.alt = sliderContent[activeIndex - 1].name;
                }

                const nextSlide = slider.querySelector(".next .slide-img img");
                if (nextSlide) {
                    nextSlide.src = sliderContent[nextIndex - 1].img;
                    nextSlide.alt = sliderContent[nextIndex - 1].name;
                }
            }

            setTimeout(() => {
                outgoingSlide?.remove();
                activeSlide.className = `slider-container ${outgoingPos}`;
                incomingSlide.className = `slider-container active`;
                newSlide.className = `slider-container ${incomingPos}`;
                activeSlideIndex = newActiveIndex;

                updateAllSlideImages();
                isAnimating = false;
            }, 2000);
        }

        slider?.addEventListener("click", (e) => {
            const clickedSlide = e.target.closest(".slider-container");
            if (clickedSlide && !isAnimating) {
                transitionSlides(
                    clickedSlide.classList.contains("next") ? "next" : "prev"
                );
            }
        });

        // Fixed initial setup - ensure all slides are properly centered
        Object.entries(slidePositions).forEach(([key, value]) => {
            gsap.set(`.slider-container.${key}`, {
                left: value.left,
                top: "50%",
                xPercent: -50,
                yPercent: -50,
                rotation: value.rotation,
                clipPath: key === "active" ? clipPath.open : clipPath.closed,
            });
            if (key !== "active") {
                gsap.set(`.slider-container.${key} .slide-img`, {
                    rotation: -value.rotation,
                });
            }
        });

        const initialTitle = sliderTitle?.querySelector("h1");
        splitTextIntoSpans(initialTitle);
        gsap.fromTo(
            initialTitle?.querySelectorAll("span") || [],
            { y: 60 },
            { y: 0, duration: 1, stagger: 0.02, ease: "hop" }
        );

        updateCounterAndHightLight(activeSlideIndex);

        sliderItems?.querySelectorAll("p").forEach((item, index) => {
            item.addEventListener("click", () => {
                if (index + 1 !== activeSlideIndex && !isAnimating) {
                    transitionSlides(
                        index + 1 > activeSlideIndex ? "next" : "prev"
                    );
                }
            });
        });
    }, []);

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
        }}>
            <style jsx>{`
                .slider {
                    position: relative;
                    width: 80vw;
                    height: 80vh;
                    overflow: hidden;
                }

                .slider-container {
                    position: absolute;
                    width: 30%;
                    height: 70%;
                    background-color: #000;
                    cursor: pointer;
                    will-change: transform, opacity, clip-path;
                    z-index: 2;
                }

                .slide-img {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    will-change: transform;
                    overflow: hidden;
                }

                .slide-img img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transform: scale(1);
                    opacity: 0.75;
                    will-change: transform;
                    animation: pan 20s linear infinite;
                }

                .slider-title {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 25%;
                    height: 25%;
                    text-align: center;
                    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
                    pointer-events: none;
                    z-index: 10;
                }

                .slider-title h1 {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    font-size: 50px;
                    font-weight: 500;
                    margin: 0;
                }

                .slider-title h1 span {
                    position: relative;
                    display: inline-block;
                    transform: translateY(50px);
                    will-change: transform;
                }

                .slider-counter {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: 10rem;
                    text-align: center;
                    z-index: 2;
                }

                .slider-counter p {
                    display: flex;
                    gap: 1em;
                    justify-content: center;
                    color: #fff;
                    margin: 0;
                }

                .slider-items {
                    position: absolute;
                    left: 2.5em;
                    bottom: 10rem;
                    z-index: 2;
                }

                .slider-items p {
                    transition: 0.5s color;
                    color: #666;
                    cursor: pointer;
                    margin: 0.5rem 0;
                }

                .slider-items p:hover {
                    color: #ccc;
                }

                .slider-items p.activeItem {
                    color: #fff;
                }

                .slider-preview {
                    position: absolute;
                    top: 25%;
                    left: 50%;
                    transform: translate(-50%);
                    width: 75%;
                    margin: 0 auto;
                    height: 100%;
                    z-index: 0;
                    opacity: 0;
                    overflow: hidden;
                }

                .slider-preview img {
                    position: absolute;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    animation: pan 20s linear infinite;
                }

                @keyframes pan {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.25);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
            `}</style>
            
            <div className="slider">
                <div className="slider-container prev">
                    <div className="slide-img">
                        <img
                            src={sliderContent[5].img}
                            alt={sliderContent[5].name}
                        />
                    </div>
                </div>
                <div className="slider-container active">
                    <div className="slide-img">
                        <img
                            src={sliderContent[0].img}
                            alt={sliderContent[0].name}
                        />
                    </div>
                </div>
                <div className="slider-container next">
                    <div className="slide-img">
                        <img
                            src={sliderContent[1].img}
                            alt={sliderContent[1].name}
                        />
                    </div>
                </div>

                <div className="slider-title">
                    <h1>{sliderContent[0].name}</h1>
                </div>

                <div className="slider-counter">
                    <p>
                        <span>1</span>
                        <span>/</span>
                        <span>{sliderContent.length}</span>
                    </p>
                </div>

                <div className="slider-items">
                    {sliderContent.map((item, index) => (
                        <p
                            key={index}
                            className={index === 0 ? "activeItem" : ""}
                        >
                            {item.name}
                        </p>
                    ))}
                </div>
                <div className="slider-preview">
                    <img
                        src={sliderContent[0].img}
                        alt={sliderContent[0].name}
                    />
                </div>
            </div>
        </div>
    );
};

export default Works;