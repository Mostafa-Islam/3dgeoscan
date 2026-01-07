'use client';

export default function Solutions() {
    return (
        <section id="vision" className="h-screen snap-start flex items-center bg-white pt-[80px]">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <span className="lg:text-sm font-bold text-orange-500 mb-8">Vision</span>
                <h2 className="text-4xl lg:text-5xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                    Providing solutions across industries
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                    Providing our clients with the latest 3D technologies
                     through valued quality products and services.
                </p>

                <div className="w-full rounded-2xl overflow-hidden max-h-[500px] lg:max-h-[500px]">
                    <img
                        src="./images/vision.jpg"
                        alt="Solutions"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}