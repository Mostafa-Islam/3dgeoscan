'use client';

import { useState, useEffect } from 'react';

export default function ScrollIndicator() {
    const [activeSection, setActiveSection] = useState(0);
    const [sections, setSections] = useState<HTMLElement[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Automatically find all sections on the page, excluding hero
        const allSections = document.querySelectorAll('section[id]:not(#hero)');
        setSections(Array.from(allSections) as HTMLElement[]);

        // Check if hero section exists and observe it
        const heroSection = document.querySelector('section#hero');
        
        if (heroSection) {
            const heroObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        // Hide indicator when hero is in view, show when it's not
                        setIsVisible(!entry.isIntersecting);
                    });
                },
                {
                    threshold: 0.1, // Trigger when 10% of hero is visible
                }
            );

            heroObserver.observe(heroSection);
        } else {
            // If no hero section, always show indicator
            setIsVisible(true);
        }

        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
            threshold: 0,
        };

        // Intersection Observer to detect which section is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Array.from(allSections).indexOf(entry.target);
                    if (index !== -1) {
                        setActiveSection(index);
                    }
                }
            });
        }, observerOptions);

        // Observe all sections
        allSections.forEach((section) => observer.observe(section));

        // Cleanup
        return () => {
            allSections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    // Scroll to section when clicking a dot
    const scrollToSection = (index: number) => {
        if (sections[index]) {
            sections[index].scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Don't render if no sections found or if not visible
    if (sections.length === 0 || !isVisible) return null;

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
            {/* Vertical line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] " />

            {/* Navigation dots */}
            {sections.map((section, index) => (
                <button
                    key={section.id}
                    onClick={() => scrollToSection(index)}
                    className="relative group cursor-pointer"
                    aria-label={`Go to ${section.id}`}
                >
                    {/* Dot */}
                    <div
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            activeSection === index
                                ? 'bg-orange-500 scale-150 shadow-lg shadow-orange-500/50'
                                : 'bg-gray-400 hover:bg-orange-300 hover:scale-125'
                        }`}
                    />

                    {/* Tooltip on hover */}
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none capitalize">
                        {section.id}
                    </span>
                </button>
            ))}
        </div>
    );
}