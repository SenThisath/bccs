import { SplitTextHeading } from "./SplitText";

const Heading = ({ title, desc }: { title: string; desc: string }) => {
    return (
        <div
            className="
                min-h-[50vh]  
                md:h-screen   
                flex flex-col items-center justify-center gap-5 
                px-4 py-16   
                bg-white text-black
            "
        >
            <SplitTextHeading
                text={title}
                className="
                    uppercase
                    text-[clamp(2rem,12vw,12.35em)] 
                    leading-[0.90] 
                    w-full 
                    text-center 
                    font-[Impact] 
                    font-normal
                    break-words
                "
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="words, chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                textAlign="center"
            />

            <div className="flex items-center justify-center">
                <SplitTextHeading
                    text={desc}
                    className="max-w-[600px] text-center"
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="lines"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    textAlign="center"
                />
            </div>
        </div>
    );
};

export default Heading;
