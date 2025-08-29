import { ScrollReveal } from "@/components/ScrollReveal";
import React from "react";

const About = () => {
    return (
        <div className="h-screen flex items-center justify-center bg-black text-white text-center">
            <div className="w-[60%] h-[80%]">
                <ScrollReveal
                    baseOpacity={10}
                    enableBlur={true}
                    baseRotation={10}
                    blurStrength={20}
                    containerClassName="text-white"
                >
                    The Bandaranayake College Computer Society is a hub for
                    young innovators and tech enthusiasts, dedicated to
                    exploring the world of computing, programming, and digital
                    creativity. Through workshops, competitions, and
                    collaborative projects, BCCS empowers students to develop
                    their technical skills, stay ahead in modern technology, and
                    inspire innovation within the school community.
                </ScrollReveal>
            </div>
        </div>
    );
};

export default About;
