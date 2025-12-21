'use client';

import { useEffect, useRef } from 'react';

const StatsSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Polygon class
    class Polygon {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      sides: number;
      canvasWidth: number;
      canvasHeight: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 60 + 30;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.sides = 3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Wrap around edges
        if (this.x < -this.size) this.x = this.canvasWidth + this.size;
        if (this.x > this.canvasWidth + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = this.canvasHeight + this.size;
        if (this.y > this.canvasHeight + this.size) this.y = -this.size;
      }

      draw(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);
        
        context.beginPath();
        for (let i = 0; i < this.sides; i++) {
          const angle = (Math.PI * 2 * i) / this.sides;
          const x = Math.cos(angle) * this.size;
          const y = Math.sin(angle) * this.size;
          if (i === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }
        context.closePath();
        
        // Fill with orange color
        context.fillStyle = `rgba(180, 100, 50, ${this.opacity})`;
        context.fill();
        
        // Stroke
        context.strokeStyle = `rgba(200, 120, 60, ${this.opacity * 0.5})`;
        context.lineWidth = 1;
        context.stroke();
        
        context.restore();
      }
    }

    // Create polygons
    const polygons: Polygon[] = [];
    for (let i = 0; i < 15; i++) {
      polygons.push(new Polygon(canvas.width, canvas.height));
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = 'rgba(30, 30, 35, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      polygons.forEach(polygon => {
        polygon.update();
        polygon.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // Update polygon canvas dimensions
      polygons.forEach(polygon => {
        polygon.canvasWidth = canvas.width;
        polygon.canvasHeight = canvas.height;
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const stats = [
    { value: '1,234 +', label: 'lorem ipsum' },
    { value: '24,000', label: 'Scanned images' },
    { value: '20 +', label: 'Terabytes of storage' },
    { value: '10 K', label: 'Lorem ipsum dolor' }
  ];

  return (
    <section className="w-full bg-white">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          {/* Left side - Animated background */}
          <div className="relative overflow-hidden bg-gray-900">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
            />
            <div className="relative z-10 flex items-center justify-center h-full p-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center leading-tight">
                Powering innovation with 3D technology
              </h2>
            </div>
          </div>

          {/* Right side - Stats grid */}
          <div className="bg-white p-12 flex items-center">
            <div className="grid grid-cols-2 gap-12 w-full">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;