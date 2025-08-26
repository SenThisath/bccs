import ImageTrail from "@/components/ImageTrail";

const ContactUs = () => {
    return (
        <section className="relative h-screen flex flex-col w-full items-center bg-white text-black font-sans overflow-hidden p-4">
            <div className="absolute top-5 flex flex-col gap-5 items-center w-[95%]">
                <div className="w-16 h-16">
                    <img src="/logo.png" alt="" />
                </div>
                <div className="flex items-center justify-between w-full">
                    <div className="pr-8">Time</div>
                    <div className="w-full h-px bg-black"></div>
                    <div className="w-fit flex items-center gap-5 px-8 whitespace-nowrap uppercase">
                        <div className="bg-gray-500 text-white px-8 py-2 rounded-4xl">email@gmail.com</div>
                        <div className="bg-black text-white px-8 py-3 rounded-4xl">Contact Us</div>
                    </div>
                    <div className="w-full h-px bg-black" />
                    <div className="pl-8">Date</div>
                </div>
            </div>

            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-96 uppercase">
                <ImageTrail
                    items={[
                        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
                        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
                        "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=400&fit=crop",
                        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop",
                        "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=400&fit=crop",
                        "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop",
                    ]}
                    variant={1}
                    className="absolute inset-0 pointer-events-auto"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <h1 className="text-[18rem] font-bold leading-none">
                        Contact
                    </h1>
                </div>
            </div>

            <div className="absolute bottom-5 flex flex-col gap-10 items-center w-[95%] uppercase">
                <div className="flex items-center justify-around w-full">
                    <div>Hello</div>
                    <div>Hello</div>
                    <div>Hello</div>
                    <div>Hello</div>
                </div>
                <div className="flex items-center justify-between w-full">
                    <h1>Instagram</h1>
                    <div className="w-full h-px bg-black mx-8" />
                    <h1>Linkedin</h1>
                    <div className="w-full h-px bg-black mx-8" />
                    <h1>FaceBook</h1>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
