'use client';

import React, { useEffect, useRef, useState } from 'react';

// Generates a mathematically perfect circular logarithmic spiral path
const generateLogSpiralPath = () => {
  const cx = 400; // Center X
  const cy = 340; // Center Y
  let path = "M 400,0 L 400,120 ";
  
  const r0 = 220; // Starting radius at start of spiral (400, 120) relative to (400, 340)
  const k = 0.125; // Decay rate
  const startAngle = -Math.PI / 2; // Starts pointing straight up
  const points = 240;
  const maxTheta = Math.PI * 6.5; // 3.25 full circular loops
  
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const theta = t * maxTheta;
    const angle = startAngle + theta; // Clockwise spiral
    const r = r0 * Math.exp(-k * theta);
    
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    
    path += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return path;
};

const pathData = generateLogSpiralPath();

export default function BubbleChamber() {
  const pathRef = useRef(null);
  const [dotPos, setDotPos] = useState({ x: 400, y: 0, opacity: 0, size: 6.5 });

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    let animationId;
    const duration = 4000; // 4 seconds to complete travel along path
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration; // 0 to 1

      const totalLength = path.getTotalLength();
      const currentLength = progress * totalLength;
      
      try {
        const point = path.getPointAtLength(currentLength);
        
        // Calculate decay scaling
        // As the particle goes down the path (progress: 0 to 1), it shrinks and fades
        const size = 6.5 * (1 - progress); 
        const opacity = 1 - progress;

        setDotPos({
          x: point.x,
          y: point.y,
          opacity: opacity,
          size: Math.max(0.5, size),
        });
      } catch (e) {
        // Fallback if browser doesn't support getPointAtLength cleanly on initial frame
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div 
      className="bubble-chamber-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: -1,
        opacity: 1, // Opacity is controlled at the element level so the glow isn't dimmed by the container
      }}
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 800 600" 
        preserveAspectRatio="xMidYMid slice" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: 'var(--accent-primary)' }}
      >
        {/* Glow Filter for the decaying particle */}
        <defs>
          <filter id="glow-particle" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Central Decay Spiral Line */}
        <path 
          ref={pathRef}
          d={pathData} 
          stroke="currentColor" 
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.18" // Very faint, subtle background track
        />

        {/* Dotted path details next to it for depth */}
        <path 
          d="M 405,0 L 405,110" 
          stroke="currentColor" 
          strokeWidth="0.8" 
          strokeDasharray="4 8"
          opacity="0.12"
        />

        {/* Glowing Decaying Particle Dot - Outer Halo Glow */}
        <circle 
          cx={dotPos.x} 
          cy={dotPos.y} 
          r={dotPos.size * 1.5} 
          fill="currentColor" 
          filter="url(#glow-particle)"
          style={{
            opacity: dotPos.opacity * 0.7,
            transition: 'opacity 0.05s ease',
          }}
        />

        {/* Glowing Decaying Particle Dot - Inner High-intensity Core */}
        <circle 
          cx={dotPos.x} 
          cy={dotPos.y} 
          r={dotPos.size * 0.6} 
          fill="#ffffff" 
          style={{
            opacity: dotPos.opacity * 0.95,
            transition: 'opacity 0.05s ease',
          }}
        />
      </svg>
    </div>
  );
}
