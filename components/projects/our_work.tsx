"use client";

import { useState, useRef } from "react";

export default function OurWork() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleMove = (clientX: number) => {
        if (!containerRef.current || !isDragging.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        setSliderPosition(Math.min(Math.max(percentage, 0), 100));
    };

    const handleMouseDown = () => {
        isDragging.current = true;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        handleMove(e.clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        handleMove(e.touches[0].clientX);
    };

    return (
        <section className="min-h-screen bg-white py-20 snap-start flex items-center">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-sm font-bold text-orange-500 mb-4 block">Our Work</span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Measured. Modeled. <span className="text-orange-500">Delivered.</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore how we've helped clients across industries capture reality with precision 3D
                        scanning technology.
                    </p>
                </div>

                {/* Image Comparison Slider Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
                    
                    {/* Before/After Slider Container */}
                    <div 
                        ref={containerRef}
                        className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden cursor-ew-resize select-none"
                        onMouseMove={handleMouseMove}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchMove={handleTouchMove}
                        onTouchStart={handleMouseDown}
                        onTouchEnd={handleMouseUp}
                    >
                        {/* ========== BEFORE IMAGE (Left Side) ========== */}
                        {/* Put your BEFORE image here - this shows on the LEFT */}
                        <div className="absolute inset-0">
                            <img 
                                src="/images/before-image.png"  // <-- CHANGE THIS: Your before image path
                                alt="Before - Original scan"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* ========== AFTER IMAGE (Right Side) ========== */}
                        {/* Put your AFTER image here - this shows on the RIGHT */}
                        <div 
                            className="absolute inset-0"
                            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                        >
                            <img 
                                src="/images/3d-service.png"  // <-- CHANGE THIS: Your after image path
                                alt="After - 3D model"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Slider Handle */}
                        <div 
                            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                        >
                            {/* Slider Circle Button */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                <svg className="w-5 h-5 text-gray-600 -ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Project Details */}
                    <div className="mt-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Location or Project Details</h3>
                        <p className="text-gray-600 mb-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                            ullamco laboris nisi ut aliquip ex ea commodo consequat
                        </p>

                        {/* Project Tags */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full text-sm">
                                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span><strong>Location:</strong> Location name</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full text-sm">
                                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <span><strong>Industry:</strong> Industry type</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full text-sm">
                                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span><strong>Accuracy:</strong> ±5mm</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full text-sm">
                                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <span><strong>Deliverables:</strong> CAD + Clash Detection</span>
                            </div>
                        </div>

                        {/* Challenge & Solution Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Challenge Card */}
                            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-gray-300">
                                <h4 className="font-bold text-gray-900 mb-3">Challenge</h4>
                                <p className="text-gray-600 text-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>

                            {/* Solution Card */}
                            <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
                                <h4 className="font-bold text-orange-500 mb-3">Solution</h4>
                                <p className="text-gray-600 text-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}