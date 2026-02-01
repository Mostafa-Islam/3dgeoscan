import React, { useEffect, useRef } from 'react'

export default function PolymeshCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const cursor = cursorRef.current;

        // Safety check: ensure elements exist before running logic
        if (!canvas || !cursor) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Configuration
        const THEME_COLOR = '241, 90, 39'; // #F15A27
        const MAX_CONNECT_DISTANCE = 100;

        // Types for our animation state
        interface MousePosition {
            x: number;
            y: number;
        }

        let particles: Particle[] = [];
        let animationFrameId: number;
        let mouse: MousePosition = { x: -100, y: -100 };

        // --- Particle Class ---
        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            life: number;
            decay: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 1.0;
                this.vy = (Math.random() - 0.5) * 1.0;
                this.size = Math.random() * 1.5 + 1;

                // DECREASED GLOW: Starts at 0.5 instead of 0.9
                this.life = 0.5;
                this.decay = Math.random() * 0.015 + 0.01;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life -= this.decay;
            }

            draw(context: CanvasRenderingContext2D) {
                context.fillStyle = `rgba(${THEME_COLOR}, ${this.life})`;
                context.beginPath();
                context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                context.fill();
            }
        }

        // --- Resize Handler ---
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // --- Mouse Move Handler ---
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            // Move the glowing cursor div
            if (cursor) {
                cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                cursor.style.opacity = '1';
            }

            // Spawn particles
            for (let i = 0; i < 2; i++) {
                particles.push(new Particle(mouse.x, mouse.y));
            }
        };

        // --- Mouse Leave Handler ---
        const handleMouseLeave = () => {
            if (cursor) cursor.style.opacity = '0';
        };

        // --- Animation Loop ---
        const animate = () => {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();

                if (particles[i].life <= 0) {
                    particles.splice(i, 1);
                    i--;
                    continue;
                }

                particles[i].draw(ctx);

                // Draw Connections
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < MAX_CONNECT_DISTANCE) {
                        ctx.beginPath();
                        const opacity =
                            (1 - distance / MAX_CONNECT_DISTANCE) * particles[i].life * 0.35;

                        ctx.strokeStyle = `rgba(${THEME_COLOR}, ${opacity})`;
                        ctx.lineWidth = 0.4;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        // --- Event Listeners & Init ---
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        handleResize();
        animate();

        // --- Cleanup ---
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);
    return (
        <>
            {/* Glowing Cursor Element */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-9999 opacity-0 transition-opacity duration-300 blur-[10px]"
                style={{
                    boxShadow: '0 0 15px 3px rgba(241, 90, 39, 0.5)',
                    marginTop: '-13px',
                    marginLeft: '-13px',
                }}
            />

            {/* Canvas for Trails */}
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full pointer-events-none z-9998"
            />
        </>
    )
}
