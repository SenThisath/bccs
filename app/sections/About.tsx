import { ScrollReveal } from "@/components/ScrollReveal";
import React from "react";

const About = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 sm:px-6 md:px-8">
            <div className="w-full max-w-4xl mx-auto text-center py-8 sm:py-12 md:py-16">
                <ScrollReveal
                    baseOpacity={0.1}
                    enableBlur={true}
                    baseRotation={10}
                    blurStrength={20}
                    containerClassName="text-white"
                    textClassName="text-sm sm:text-xl md:text-4xl lg:text-5xl leading-relaxed"
                >
                    The BCCS is a hub for young tech enthusiasts, offering
                    workshops, competitions, and projects that build technical
                    skills, foster creativity, and inspire innovation within the
                    school community.
                </ScrollReveal>
            </div>
        </div>
    );
};

export default About;
