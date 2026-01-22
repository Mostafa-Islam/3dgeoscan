"use client";

import { useEffect, useState, useRef } from "react";

// --- 1. Custom Hook: allowReEntry = true ---
function useIsInView(ref: React.RefObject<HTMLElement | null>) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state whenever visibility changes (In OR Out)
        setIntersecting(entry.isIntersecting);
      },
      { threshold: 0.3 } 
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [ref]);

  return isIntersecting;
}

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  unit?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({ 
  end, 
  duration = 2000, 
  unit = "",
  suffix = "", 
  className = "" 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false); 
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useIsInView(ref);

  useEffect(() => {
    // CASE 1: Scroll OUT -> Reset everything
    if (!inView) {
      setCount(0);
      setIsCompleted(false); // <--- This fixes your issue
      return;
    }

    // CASE 2: Scroll IN -> Start Animation
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
        setIsCompleted(true); // Trigger the "pop" only at the end
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className={`tabular-nums flex items-baseline ${className}`}>
      {count.toLocaleString()}
      {unit
        && <span className={`text-gray-900 transition-all duration-500 ease-out
          ${isCompleted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'}`
        }>{unit}</span>
      }
      {suffix && (
        <span 
          className={`
            ml-1 text-[#F36F21] inline-block origin-center transition-all duration-500 ease-out
            ${isCompleted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'}
          `}
        >
          {suffix}
        </span>
      )}
    </span>
  );
}