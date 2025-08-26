
import { useState, useEffect, useCallback, useMemo } from "react";

interface LetterState {
    char: string;
    isMatrix: boolean;
    isSpace: boolean;
}

interface MatrixTextProps {
    text?: string;
    className?: string;
    initialDelay?: number;
    letterAnimationDuration?: number;
    letterInterval?: number;
    maxWidth?: string;
    fontSize?: string;
    lineHeight?: string;
}

export const MatrixText = ({
    text = "The Bandaranayaka College Computer Society (BCCS) is driven by a passion for technology and innovation, managing the school's computer labs, organising major events with professional backscreening, coordinating activities, and maintaining the college's digital presence across the website and social platforms, while nurturing technology-savvy students to lead in the digital future.",
    className = "",
    initialDelay = 200,
    letterAnimationDuration = 500,
    letterInterval = 50,
    maxWidth = "100%",
    fontSize = "text-3xl",
    lineHeight = "leading-relaxed",
}: MatrixTextProps) => {
    const [letters, setLetters] = useState<LetterState[]>(() =>
        text.split("").map((char) => ({
            char,
            isMatrix: false,
            isSpace: char === " ",
        }))
    );
    const [isAnimating, setIsAnimating] = useState(false);

    const getRandomChar = useCallback(
        () => (Math.random() > 0.5 ? "1" : "0"),
        []
    );

    const animateLetter = useCallback(
        (index: number) => {
            if (index >= text.length) return;

            requestAnimationFrame(() => {
                setLetters((prev) => {
                    const newLetters = [...prev];
                    if (!newLetters[index].isSpace) {
                        newLetters[index] = {
                            ...newLetters[index],
                            char: getRandomChar(),
                            isMatrix: true,
                        };
                    }
                    return newLetters;
                });

                setTimeout(() => {
                    setLetters((prev) => {
                        const newLetters = [...prev];
                        newLetters[index] = {
                            ...newLetters[index],
                            char: text[index],
                            isMatrix: false,
                        };
                        return newLetters;
                    });
                }, letterAnimationDuration);
            });
        },
        [getRandomChar, text, letterAnimationDuration]
    );

    const startAnimation = useCallback(() => {
        if (isAnimating) return;

        setIsAnimating(true);
        let currentIndex = 0;

        const animate = () => {
            if (currentIndex >= text.length) {
                setIsAnimating(false);
                return;
            }

            animateLetter(currentIndex);
            currentIndex++;
            setTimeout(animate, letterInterval);
        };

        animate();
    }, [animateLetter, text, isAnimating, letterInterval]);

    useEffect(() => {
        const timer = setTimeout(startAnimation, initialDelay);
        return () => clearTimeout(timer);
    }, [startAnimation, initialDelay]);

    return (
        <div className={`w-full ${className}`}>
            <div 
                className={`font-mono ${fontSize} ${lineHeight} text-black dark:text-white break-words`}
                style={{ 
                    maxWidth,
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word'
                }}
            >
                {letters.map((letter, index) => (
                    <span
                        key={`${index}-${letter.char}`}
                        className={`inline transition-all duration-100 ${
                            letter.isMatrix 
                                ? 'text-green-400 drop-shadow-[0_0_4px_rgba(34,197,94,0.5)]' 
                                : ''
                        }`}
                        style={{
                            fontVariantNumeric: "tabular-nums",
                        }}
                    >
                        {letter.isSpace ? " " : letter.char}
                    </span>
                ))}
            </div>
        </div>
    );
};