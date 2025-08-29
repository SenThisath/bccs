import { ScrollReveal } from "@/components/ScrollReveal";
import React from "react";

const About = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
            <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
                <ScrollReveal
                    baseOpacity={10}
                    enableBlur={true}
                    baseRotation={10}
                    blurStrength={20}
                    containerClassName="text-white"
                    textClassName="text-lg sm:text-xl md:text-6xl leading-relaxed"
                >
                    The Bandaranayake College Computer Society (BCCS) is a hub
                    for young tech enthusiasts, offering workshops,
                    competitions, and projects that build technical skills,
                    foster creativity, and inspire innovation within the school
                    community.
                </ScrollReveal>
            </div>
        </div>
    );
};

export default About;
