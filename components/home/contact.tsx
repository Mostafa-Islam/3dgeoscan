'use client';

export default function Contact() {
    return (
        <section id="contact" className="h-screen snap-start flex items-center justify-center bg-white pt-[80px] relative">
            <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url('./images/contact-bg.png')" }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
            </div>
            
            <div className="relative z-10 text-center px-6">
                <h2 className="text-4xl lg:text-5xl sm:text-3xl font-bold text-white mb-8 leading-tight">
                    DISCOVER YOUR PROJECT
                </h2>
                
                <button className="w-[189px] h-[48px] rounded-[300px] p-[10px] gap-[10px] flex items-center justify-center bg-[#2C2C31] text-white font-semibold hover:bg-[#3C3C41] transition-colors duration-300 mx-auto">
                    Contact Us
                </button>
            </div>
        </section>
    );
}