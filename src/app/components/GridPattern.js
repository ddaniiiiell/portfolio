'use client';

import React, { useEffect, useRef } from 'react';

export default function GridPattern() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let mouse = { x: 0, y: 0, active: false };
    let smoothMouse = { x: 0, y: 0 };
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Fixed index coordinates of grid intersections where we render stars
    const starIntersections = [
      { col: 3, row: 2, offset: 0 },
      { col: 7, row: 1, offset: 1.5 },
      { col: 11, row: 4, offset: 3 },
      { col: 4, row: 6, offset: 0.8 },
      { col: 9, row: 7, offset: 2.2 },
      { col: 2, row: 4, offset: 4 },
      { col: 13, row: 3, offset: 1.2 },
      { col: 6, row: 9, offset: 2.8 },
      { col: 10, row: 5, offset: 0.5 },
    ];

    const drawSparkle = (context, cx, cy, radius, opacity) => {
      context.save();
      context.globalAlpha = opacity;
      context.fillStyle = '#e6e4de';
      context.beginPath();
      context.moveTo(cx, cy - radius);
      context.quadraticCurveTo(cx, cy, cx + radius, cy);
      context.quadraticCurveTo(cx, cy, cx, cy + radius);
      context.quadraticCurveTo(cx, cy, cx - radius, cy);
      context.quadraticCurveTo(cx, cy, cx, cy - radius);
      context.closePath();
      context.fill();
      context.restore();
    };

    const animate = () => {
      time += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gridSize = 90; // Spacing of grid lines
      const cols = Math.ceil(canvas.width / gridSize) + 2;
      const rows = Math.ceil(canvas.height / gridSize) + 2;

      // Smooth mouse tracking
      if (mouse.active) {
        smoothMouse.x += (mouse.x - smoothMouse.x) * 0.08;
        smoothMouse.y += (mouse.y - smoothMouse.y) * 0.08;
      } else {
        smoothMouse.x += (canvas.width / 2 - smoothMouse.x) * 0.05;
        smoothMouse.y += (canvas.height / 2 - smoothMouse.y) * 0.05;
      }

      // Generate mesh grid points with gravitational warping vector towards mouse
      const points = [];
      const warpRadius = 260;
      const maxWarp = 28;

      for (let c = -1; c < cols; c++) {
        points[c + 1] = [];
        for (let r = -1; r < rows; r++) {
          const originX = c * gridSize;
          const originY = r * gridSize;

          let wx = originX;
          let wy = originY;

          if (mouse.active) {
            const dx = smoothMouse.x - originX;
            const dy = smoothMouse.y - originY;
            const dist = Math.hypot(dx, dy);

            if (dist < warpRadius) {
              const force = Math.pow(1 - dist / warpRadius, 2) * maxWarp;
              wx = originX + (dx / dist) * force;
              wy = originY + (dy / dist) * force;
            }
          }

          points[c + 1][r + 1] = { x: wx, y: wy };
        }
      }

      // Gently pulse grid opacity
      const gridBaseOpacity = 0.018 + Math.sin(time * 0.5) * 0.004;
      ctx.strokeStyle = '#e6e4de';
      ctx.lineWidth = 1;

      // Draw horizontal grid lines
      for (let r = 0; r < rows; r++) {
        ctx.globalAlpha = gridBaseOpacity;
        ctx.beginPath();
        ctx.moveTo(points[0][r].x, points[0][r].y);
        for (let c = 1; c < cols; c++) {
          ctx.lineTo(points[c][r].x, points[c][r].y);
        }
        ctx.stroke();
      }

      // Draw vertical grid lines
      for (let c = 0; c < cols; c++) {
        ctx.globalAlpha = gridBaseOpacity;
        ctx.beginPath();
        ctx.moveTo(points[c][0].x, points[c][0].y);
        for (let r = 1; r < rows; r++) {
          ctx.lineTo(points[c][r].x, points[c][r].y);
        }
        ctx.stroke();
      }

      // Draw twinkling stars sitting exactly on warped grid intersections
      starIntersections.forEach((star) => {
        const c = star.col;
        const r = star.row;
        if (points[c] && points[c][r]) {
          const pt = points[c][r];
          const pulse = Math.sin(time * 2 + star.offset);
          const opacity = 0.15 + (pulse + 1) * 0.35;
          const starRadius = 5 + (pulse + 1) * 1.5;
          drawSparkle(ctx, pt.x, pt.y, starRadius, opacity);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
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
        zIndex: -2,
      }}
    />
  );
}
