import { ScrollReveal } from "@/components/ScrollReveal";
import React from "react";

const About = () => {
    return (
        <div className="h-full flex items-center justify-center bg-black text-white">
            <div className="w-[95%] h-[80%]">
                <ScrollReveal
                    baseOpacity={10}
                    enableBlur={true}
                    baseRotation={10}
                    blurStrength={20}
                    containerClassName="text-white"
                >
                    When does a man die? When he is hit by a bullet? No! When he
                    suffers a disease? No! When he ate a soup made out of a
                    poisonous mushroom? No! A man dies when he is forgotten!
                </ScrollReveal>
                <ScrollReveal
                    baseOpacity={10}
                    enableBlur={true}
                    baseRotation={10}
                    blurStrength={20}
                    containerClassName="text-white"
                >
                    When does a man die? When he is hit by a bullet? No! When he
                    suffers a disease? No! When he ate a soup made out of a
                    poisonous mushroom? No! A man dies when he is forgotten!
                </ScrollReveal>
            </div>
        </div>
    );
};

export default About;
