'use client';

import React, { useEffect, useRef } from 'react';

export default function MouseTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let lastMousePos = { x: 0, y: 0 };
    let hasMoved = false;

    // Resize canvas to cover screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.size = Math.random() * 8 + 6; // Star size
        this.maxLife = 40 + Math.random() * 20; // Frames of life
        this.life = this.maxLife;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
      }

      draw(context) {
        const opacity = this.life / this.maxLife;
        const outerRadius = this.size;

        context.save();
        context.globalAlpha = opacity;
        // Warm minimalist cream color matching --accent-primary
        context.fillStyle = '#e6e4de';
        context.beginPath();
        // Draw a curved 4-pointed sparkle star
        context.moveTo(this.x, this.y - outerRadius);
        context.quadraticCurveTo(this.x, this.y, this.x + outerRadius, this.y);
        context.quadraticCurveTo(this.x, this.y, this.x, this.y + outerRadius);
        context.quadraticCurveTo(this.x, this.y, this.x - outerRadius, this.y);
        context.quadraticCurveTo(this.x, this.y, this.x, this.y - outerRadius);
        context.closePath();
        context.fill();
        context.restore();
      }
    }

    const onMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // Only spawn if mouse has moved a bit to prevent spawning hundreds at one spot
      const dist = Math.hypot(x - lastMousePos.x, y - lastMousePos.y);
      if (dist > 8) {
        particles.push(new Particle(x, y));
        lastMousePos = { x, y };
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        p.update();
        p.draw(ctx);
      });

      // Filter out dead particles
      particles = particles.filter((p) => p.life > 0);

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
