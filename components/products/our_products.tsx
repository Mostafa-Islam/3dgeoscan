'use client';

export default function ProductsHero() {
    return (
        <section className="pt-32 pb-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 w-full">
                {/* Page Header */}
                <div className="text-center">
                    {/* Small Label */}
                    <span className="text-[#E55C24] font-medium text-sm md:text-base mb-4 block">
                        Our Products
                    </span>

                    {/* Main Heading */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        End-to-end digital services,{' '}
                        <span className="text-[#E55C24]">simplified.</span>
                    </h1>

                    {/* Description */}
                    <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
                        We use industry-leading FARO 3D scanning technology to deliver precise, reliable, and fast reality capture for any project.
                    </p>
                </div>
            </div>
        </section>
    );
}