"use client"


import React, { useRef, useEffect, } from "react";

interface BinaryBackgroundProps {
    speed?: number;
    fontSize?: number;
    color?: string;
    backgroundColor?: string;
    density?: number;
    fadeOpacity?: number;
    direction?: "down" | "up" | "left" | "right" | "diagonal";
    characters?: string;
    className?: string;
}

export function BinaryBackground({
    speed = 1,
    fontSize = 16,
    color = "#00ff00",
    backgroundColor = "#0C0C0C",
    density = 0.95,
    fadeOpacity = 0.05,
    direction = "down",
    characters = "01",
    className = "",
}: BinaryBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Set background
        canvas.style.background = backgroundColor;

        const chars = characters.split("");
        const drops: number[] = [];
        const columnCount = Math.floor(canvas.width / fontSize);

        // Initialize drops
        for (let i = 0; i < columnCount; i++) {
            drops[i] = Math.random() * -100;
        }

        const draw = () => {
            // Create fade effect
            ctx.fillStyle = `rgba(0, 0, 0, ${fadeOpacity})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Set text properties
            ctx.fillStyle = color;
            ctx.font = `${fontSize}px monospace`;
            ctx.textAlign = "center";

            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];

                let x: number, y: number;

                switch (direction) {
                    case "down":
                        x = i * fontSize + fontSize / 2;
                        y = drops[i] * fontSize;
                        break;
                    case "up":
                        x = i * fontSize + fontSize / 2;
                        y = canvas.height - drops[i] * fontSize;
                        break;
                    case "right":
                        x = drops[i] * fontSize;
                        y = i * fontSize + fontSize / 2;
                        break;
                    case "left":
                        x = canvas.width - drops[i] * fontSize;
                        y = i * fontSize + fontSize / 2;
                        break;
                    case "diagonal":
                        x = drops[i] * fontSize;
                        y = drops[i] * fontSize;
                        break;
                    default:
                        x = i * fontSize + fontSize / 2;
                        y = drops[i] * fontSize;
                }

                ctx.fillText(char, x, y);

                // Reset drop when it goes off screen
                const shouldReset =
                    direction === "down"
                        ? drops[i] * fontSize > canvas.height &&
                          Math.random() > density
                        : direction === "up"
                        ? drops[i] * fontSize > canvas.height &&
                          Math.random() > density
                        : direction === "right"
                        ? drops[i] * fontSize > canvas.width &&
                          Math.random() > density
                        : direction === "left"
                        ? drops[i] * fontSize > canvas.width &&
                          Math.random() > density
                        : drops[i] * fontSize >
                              Math.max(canvas.width, canvas.height) &&
                          Math.random() > density;

                if (shouldReset) {
                    drops[i] = 0;
                }

                drops[i] += speed;
            }
        };

        const animate = () => {
            draw();
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [
        speed,
        fontSize,
        color,
        backgroundColor,
        density,
        fadeOpacity,
        direction,
        characters,
    ]);

    return (
        <canvas
            ref={canvasRef}
            className={`w-full h-full block ${className}`}
            style={{ background: backgroundColor }}
        />
    );
}
