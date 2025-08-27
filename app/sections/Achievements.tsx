"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const Achievements = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Create renderer
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            preserveDrawingBuffer: true,
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000); // Pure black
        renderer.setClearColor(0x000000, 1.0); // Ensure renderer clear color is also black

        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        );
        camera.position.z = 5;

        // Use only ambient light for consistent, even lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
        scene.add(ambientLight);

        const settings = {
            wheelSensitivity: 0.008,
            touchSensitivity: 0.008,
            momentumMultiplier: 1.0,
            smoothing: 0.08,
            slideLerp: 0.1,
            distortionDecay: 0.98,
            maxDistortion: 0.5,
            distortionSensitivity: 0.05,
            distortionSmoothing: 0.15,
        };

        const slideWidth = 3.0;
        const slideHeight = 1.8;
        const gap = 0.2;
        const slideCount = 8;
        const bufferSlides = 3; // Extra slides on each side
        const totalSlides = slideCount + bufferSlides * 2;
        const totalWidth = slideCount * (slideWidth + gap);
        const slideUnit = slideWidth + gap;

        const slides: THREE.Mesh[] = [];
        let currentPosition = 0;
        let targetPosition = 0;
        let isScrolling = false;
        let autoScrollSpeed = 0;
        let lastTime = 0;
        let touchStartX = 0;
        let touchLastX = 0;

        // Mouse drag variables
        let mouseStartX = 0;
        let mouseLastX = 0;
        let isDragging = false;

        let currentDistortionFactor = 0;
        let targetDistortionFactor = 0;
        let peakVelocity = 0;
        const velocityHistory = [0, 0, 0, 0, 0];

        const achievementData = [
            {
                title: "First Steps",
                desc: "Completed first project",
                color: "#FF6B6B",
            },
            {
                title: "Team Player",
                desc: "Collaborated on 5 projects",
                color: "#4ECDC4",
            },
            {
                title: "Innovation",
                desc: "Implemented new solution",
                color: "#45B7D1",
            },
            {
                title: "Leadership",
                desc: "Led successful team",
                color: "#96CEB4",
            },
            { title: "Expert", desc: "Mastered core skills", color: "#FFEAA7" },
            {
                title: "Mentor",
                desc: "Guided 10+ colleagues",
                color: "#DDA0DD",
            },
            {
                title: "Visionary",
                desc: "Shaped product direction",
                color: "#98D8C8",
            },
            {
                title: "Champion",
                desc: "Achieved excellence",
                color: "#F7DC6F",
            },
        ];

        const createSlide = (index:number, achievementIndex:number) => {
            const geometry = new THREE.PlaneGeometry(
                slideWidth,
                slideHeight,
                32,
                18
            );

            const achievement =
                achievementData[achievementIndex % achievementData.length];

            // Create gradient material
            const canvas = document.createElement("canvas");
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
                throw new Error("Failed to get 2D context for achievement slide canvas.");
            }

            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, achievement.color);
            gradient.addColorStop(1, "#1a1a1a");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add border
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 4;
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            // Add title text
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 48px Arial";
            ctx.textAlign = "center";
            ctx.fillText(
                achievement.title,
                canvas.width / 2,
                canvas.height / 2 - 30
            );

            // Add description text
            ctx.font = "32px Arial";
            ctx.fillText(
                achievement.desc,
                canvas.width / 2,
                canvas.height / 2 + 30
            );

            // Add achievement number
            ctx.font = "bold 24px Arial";
            ctx.fillStyle = "rgba(255,255,255,0.7)";
            ctx.textAlign = "left";
            ctx.fillText(`#${achievementIndex + 1}`, 30, 50);

            const texture = new THREE.CanvasTexture(canvas);
            texture.colorSpace = THREE.SRGBColorSpace;

            const material = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide,
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = index * slideUnit;
            mesh.userData = {
                originalVertices: [...geometry.attributes.position.array],
                index,
                achievementIndex,
                achievement,
            };

            scene.add(mesh);
            slides.push(mesh);
        };

        // Create slides with buffer slides on both ends
        for (let i = 0; i < totalSlides; i++) {
            let achievementIndex;
            if (i < bufferSlides) {
                // Left buffer - use last slides
                achievementIndex = (slideCount - bufferSlides + i) % slideCount;
            } else if (i >= slideCount + bufferSlides) {
                // Right buffer - use first slides
                achievementIndex = (i - slideCount - bufferSlides) % slideCount;
            } else {
                // Main slides
                achievementIndex = (i - bufferSlides) % slideCount;
            }
            createSlide(i, achievementIndex);
        }

        // Center slides
        slides.forEach((slide, i) => {
            slide.position.x = (i - bufferSlides) * slideUnit - totalWidth / 2;
            slide.userData.targetX = slide.position.x;
            slide.userData.currentX = slide.position.x;
        });

        const updateCurve = (
            mesh: THREE.Mesh,
            worldPositionX: number,
            distortionFactor: number
        ) => {
            const distortionCenter = new THREE.Vector2(0, 0);
            const distortionRadius = 3.0;
            const maxCurvature = settings.maxDistortion * distortionFactor;
            const positionAttribute = mesh.geometry.attributes.position as THREE.BufferAttribute;
            const originalVertices = mesh.userData.originalVertices as number[];

            for (let i = 0; i < positionAttribute.count; i++) {
            const x = originalVertices[i * 3];
            const y = originalVertices[i * 3 + 1];

            const vertexWorldPosX = worldPositionX + x;
            const distFromCenter = Math.sqrt(
                Math.pow(vertexWorldPosX - distortionCenter.x, 2) +
                Math.pow(y - distortionCenter.y, 2)
            );

            const distortionStrength = Math.max(
                0,
                1 - distFromCenter / distortionRadius
            );

            const curveZ = Math.pow(distortionStrength, 2) * maxCurvature;

            positionAttribute.setZ(i, curveZ);
            }
            positionAttribute.needsUpdate = true;
            mesh.geometry.computeVertexNormals();
        };

        // Smooth distortion interpolation
        const updateDistortion = () => {
            currentDistortionFactor +=
                (targetDistortionFactor - currentDistortionFactor) *
                settings.distortionSmoothing;

            slides.forEach((slide) => {
                updateCurve(slide, slide.position.x, currentDistortionFactor);
            });
        };

        // Event listeners
        interface KeyDownEvent extends KeyboardEvent {
            key: string;
        }

        const handleKeyDown = (e: KeyDownEvent): void => {
            if (e.key === "ArrowLeft") {
            targetPosition += slideUnit;
            targetDistortionFactor = Math.min(
                1.0,
                targetDistortionFactor + 0.3
            );
            } else if (e.key === "ArrowRight") {
            targetPosition -= slideUnit;
            targetDistortionFactor = Math.min(
                1.0,
                targetDistortionFactor + 0.3
            );
            }
        };

        interface WheelEventWithDelta extends WheelEvent {
            deltaY: number;
        }

        const handleWheel = (e: WheelEventWithDelta) => {
            e.preventDefault();
            const wheelStrength: number = Math.abs(e.deltaY * 0.0005);
            targetDistortionFactor = Math.min(
            0.8,
            targetDistortionFactor + wheelStrength
            );
            targetPosition -= e.deltaY * settings.wheelSensitivity;
            isScrolling = true;
            autoScrollSpeed =
            Math.min(Math.abs(e.deltaY) * 0.0002, 0.02) *
            Math.sign(e.deltaY);
            if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
            }
            scrollTimeoutRef.current = setTimeout(() => {
            isScrolling = false;
            }, 200);
        };

        interface TouchStartEvent extends TouchEvent {
            touches: TouchList;
        }

        const handleTouchStart = (e: TouchStartEvent): void => {
            touchStartX = e.touches[0].clientX;
            touchLastX = touchStartX;
            isScrolling = false;
        };

        interface TouchMoveEvent extends TouchEvent {
            touches: TouchList;
        }

        const handleTouchMove = (e: TouchMoveEvent) => {
            e.preventDefault();
            const touchX: number = e.touches[0].clientX;
            const deltaX: number = touchX - touchLastX;
            touchLastX = touchX;

            const touchStrength: number = Math.abs(deltaX) * 0.01;
            targetDistortionFactor = Math.min(
            0.8,
            targetDistortionFactor + touchStrength
            );
            targetPosition -= deltaX * settings.touchSensitivity;
        };

        interface TouchEndEvent extends TouchEvent {
            changedTouches: TouchList;
        }

        interface TouchEndHandler {
            (e: TouchEndEvent): void;
        }

        const handleTouchEnd: TouchEndHandler = (e) => {
            const velocity: number = (touchLastX - touchStartX) * 0.005;
            if (Math.abs(velocity) > 0.5) {
            autoScrollSpeed =
                -velocity * settings.momentumMultiplier * 0.05;
            targetDistortionFactor = Math.min(
                1.0,
                targetDistortionFactor +
                Math.abs(velocity) * 3 * settings.distortionSensitivity
            );
            isScrolling = true;
            setTimeout(() => {
                isScrolling = false;
            }, 800);
            }
        };

        // Mouse drag handlers
        interface MouseDownEvent extends MouseEvent {
            clientX: number;
            preventDefault: () => void;
        }

        const handleMouseDown = (e: MouseDownEvent): void => {
            isDragging = true;
            mouseStartX = e.clientX;
            mouseLastX = mouseStartX;
            canvas.style.cursor = "grabbing";
            e.preventDefault();
        };

        interface MouseMoveEvent extends MouseEvent {
            clientX: number;
        }

        interface HandleMouseMove {
            (e: MouseMoveEvent): void;
        }

        const handleMouseMove: HandleMouseMove = (e) => {
            if (!isDragging) return;

            const mouseX: number = e.clientX;
            const deltaX: number = mouseX - mouseLastX;
            mouseLastX = mouseX;

            const dragStrength: number = Math.abs(deltaX) * 0.01;
            targetDistortionFactor = Math.min(
            0.8,
            targetDistortionFactor + dragStrength
            );
            targetPosition -= deltaX * settings.touchSensitivity;
        };

        interface MouseUpEvent extends MouseEvent {
            clientX: number;
        }

        interface HandleMouseUp {
            (e: MouseUpEvent): void;
        }

        const handleMouseUp: HandleMouseUp = (e) => {
            if (!isDragging) return;

            isDragging = false;
            canvas.style.cursor = "grab";

            const velocity = (mouseLastX - mouseStartX) * 0.005;
            if (Math.abs(velocity) > 0.5) {
            autoScrollSpeed =
                -velocity * settings.momentumMultiplier * 0.05;
            targetDistortionFactor = Math.min(
                1.0,
                targetDistortionFactor +
                Math.abs(velocity) * 3 * settings.distortionSensitivity
            );
            isScrolling = true;
            setTimeout(() => {
                isScrolling = false;
            }, 800);
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            if (isDragging) {
                isDragging = false;
                canvas.style.cursor = "grab";
            }
        };

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        // Add event listeners
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, {
            passive: false,
        });
        window.addEventListener("touchmove", handleTouchMove, {
            passive: false,
        });
        window.addEventListener("touchend", handleTouchEnd);
        window.addEventListener("resize", handleResize);

        // Mouse drag event listeners
        canvas.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        // Set initial cursor style
        canvas.style.cursor = "grab";

        const animate = (time = 0) => {
            requestAnimationFrame(animate);
            const deltaTime = lastTime ? (time - lastTime) / 1000 : 0.016;
            lastTime = time;

            const prevPos = currentPosition;

            if (isScrolling) {
                targetPosition += autoScrollSpeed;
                const speedBasedDecay =
                    0.97 - Math.min(0.06, Math.abs(autoScrollSpeed) * 0.5);
                autoScrollSpeed *= Math.max(0.92, speedBasedDecay);
                if (Math.abs(autoScrollSpeed) < 0.001) autoScrollSpeed = 0;
            }

            currentPosition +=
                (targetPosition - currentPosition) * settings.smoothing;

            const currentVelocity =
                Math.abs(currentPosition - prevPos) / deltaTime;
            velocityHistory.push(currentVelocity);
            velocityHistory.shift();

            const avgVelocity =
                velocityHistory.reduce((a, b) => a + b, 0) /
                velocityHistory.length;

            if (avgVelocity > peakVelocity) {
                peakVelocity = avgVelocity;
            }

            const velocityRatio = avgVelocity / (peakVelocity + 0.001);
            const isDecelerating = velocityRatio < 0.7 && peakVelocity > 0.8;
            peakVelocity *= 0.99;

            const movementDistortion = Math.min(1.0, currentVelocity * 0.1);
            if (currentVelocity > 0.05) {
                targetDistortionFactor = Math.max(
                    targetDistortionFactor,
                    movementDistortion
                );
            }

            if (isDecelerating || avgVelocity < 0.2) {
                const decayRate = isDecelerating
                    ? settings.distortionDecay
                    : settings.distortionDecay * 0.9;
                targetDistortionFactor *= decayRate;
            }

            // Update slide positions without wrapping - use buffer system
            slides.forEach((slide, i) => {
                const baseX =
                    (i - bufferSlides) * slideUnit -
                    currentPosition -
                    totalWidth / 2;

                slide.userData.targetX = baseX;
                slide.userData.currentX +=
                    (slide.userData.targetX - slide.userData.currentX) *
                    settings.slideLerp;
                slide.position.x = slide.userData.currentX;
            });

            // Handle infinite scrolling by repositioning when we reach boundaries
            const maxPosition = totalWidth;
            const minPosition = 0;

            if (currentPosition > maxPosition) {
                currentPosition -= totalWidth;
                targetPosition -= totalWidth;
            } else if (currentPosition < minPosition - totalWidth) {
                currentPosition += totalWidth;
                targetPosition += totalWidth;
            }

            updateDistortion();
            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
            window.removeEventListener("resize", handleResize);

            // Remove mouse drag event listeners
            canvas.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
            // Removed window.scrollTimeout cleanup as it is not defined or used

            // Clean up Three.js resources
            slides.forEach((slide: THREE.Mesh) => {
                scene.remove(slide);
                (slide.geometry as THREE.BufferGeometry).dispose();
                const material = slide.material as THREE.Material;
                material.dispose();
                if ("map" in material && material.map) {
                    (material.map as THREE.Texture).dispose();
                }
            });
            renderer.dispose();
        };
    }, []);

    return (
        <section className="relative h-screen w-full flex items-center justify-center bg-black">
            <canvas ref={canvasRef} className="w-full h-full" />
        </section>
    );
};

export default Achievements;
