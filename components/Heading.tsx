import { SplitTextHeading } from "./SplitText";

const Heading = ({ title, desc }: { title: string; desc: string }) => {
    return (
        <div className="h-screen flex items-center flex-col justify-center gap-5 bg-white text-black">
            <SplitTextHeading
                text={title}
                className="
        uppercase
        text-[clamp(2rem,12vw,12.35em)] 
        leading-[0.77] 
        w-full 
        text-center 
        font-[Impact] 
        font-normal 
      "
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
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
