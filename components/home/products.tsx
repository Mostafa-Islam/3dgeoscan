'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { products } from '@/constants/products';

export default function Products() {
    // Brand color for consistency
    const brandColorClass = 'text-orange-600';
    const brandBgClass = 'bg-[#E55C24]';

    // Animation state
    const [isTransitioning, setIsTransitioning] = useState(false);


    const router = useRouter();

    // State for carousel
    const [currentIndex, setCurrentIndex] = useState(0);

    // Navigation handlers
    const handleNext = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
            setIsTransitioning(false);
        }, 600);
    };

    const handlePrev = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
            setIsTransitioning(false);
        }, 600);
    };

    const handleDotClick = (index: number) => {
        if (index !== currentIndex) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex(index);
                setIsTransitioning(false);
            }, 600);
        }
    };

    const currentProduct = products[currentIndex];

    return (
        // Kept original Section & Container classes
        <section id='products' className="h-screen snap-start flex items-center bg-white pt-[80px]">
            <div className="max-w-7xl mx-auto px-4 w-full">

                {/* Section Heading */}
                <h2 className="text-center text-4xl lg:text-5xl sm:text-2xl font-bold text-gray-900 mb-12 leading-tight">
                    Our Products
                </h2>

                {/* Carousel Main Content Area - Refactored for 2-Column Layout */}
                <div className="relative flex items-center">

                    {/* Left Navigation Arrow */}
                    <button onClick={handlePrev} aria-label="Previous" className="hidden md:block absolute -left-12 lg:-left-16 z-20 p-2 text-gray-400 cursor-pointer hover:text-gray-800 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    {/* Main Grid Content: Changed from 3 columns to 2 columns */}
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full min-h-[450px] transition-all duration-600 ease-in-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                        }`}>

                        {/* --- Column 1: Product Image (Card Style) --- */}
                        <div className="relative w-full aspect-square max-h-[450px] bg-gray-50 rounded-[40px] flex items-center justify-center p-8">
                            <img
                                key={currentProduct.id}
                                src={currentProduct.productImage}
                                alt={currentProduct.title}
                                className="w-full h-auto object-contain max-h-full drop-shadow-xl z-10"
                            />
                        </div>

                        {/* --- Column 2: Product Details --- */}
                        <div className="flex flex-col justify-center h-full">

                            {/* Title & Logos */}
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">{currentProduct.title}</h3>

                            {/* Simple Logo/Badge placeholder row */}
                            <div className="flex items-center gap-4 mb-6">
                                {currentProduct.logos.map((logo, i) => (
                                    <span key={i} className="font-bold text-gray-700 text-sm tracking-widest uppercase border border-gray-300 px-2 py-1 rounded">
                                        {logo}
                                    </span>
                                ))}
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed mb-8">
                                {currentProduct.description}
                            </p>

                            {/* Two-Column List Section (Package & Software) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                                {/* Package Includes */}
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3">Package Includes</h4>
                                    <ul className="space-y-2">
                                        {currentProduct.packageIncludes.map((item, idx) => (
                                            <li key={idx} className="flex items-start text-sm text-gray-600">
                                                <span className={`${brandColorClass} mr-2`}>•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Software */}
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3">Software</h4>
                                    <p className="text-sm text-gray-600">
                                        {currentProduct.software}
                                    </p>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className='flex gap-4'>
                                <button className={`${brandBgClass} text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition cursor-pointer`}>
                                    Get a Quote
                                </button>

                                <button
                                    onClick={() => router.push(`/products/${currentProduct.slug}`)}
                                    className={`${brandBgClass} text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition`}
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Navigation Arrow */}
                    <button onClick={handleNext} aria-label="Next" className="hidden md:block absolute -right-12 lg:-right-16 z-20 p-2 text-gray-400 cursor-pointer hover:text-gray-800 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>

                {/* Bottom Pagination Dots */}
                <div className="flex justify-center items-center gap-3 mt-10">
                    {products.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`w-3 h-3 rounded-full transition ${currentIndex === index
                                ? brandBgClass
                                : 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};