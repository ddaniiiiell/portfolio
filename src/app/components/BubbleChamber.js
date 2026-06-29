'use client';

import React, { useEffect, useRef, useState } from 'react';

// Generates a mathematically perfect circular logarithmic spiral path shifted to the right (out of the way of text)
const generateLogSpiralPath = () => {
  const cx = 580; // Center X shifted to the right
  const cy = 320; // Center Y
  let path = "M 580,0 L 580,100 ";
  
  const r0 = 200; // Starting radius at start of spiral relative to (580, 320)
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
  const [dotPos, setDotPos] = useState({ x: 580, y: 0, opacity: 0, size: 6.5 });

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    let animationId;
    const activeDuration = 4000; // 4 seconds of decay travel
    const idleDuration = 2000; // 2 seconds of pause before regenerating
    const totalDuration = activeDuration + idleDuration;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const elapsedCycle = elapsed % totalDuration;

      if (elapsedCycle < activeDuration) {
        const progress = elapsedCycle / activeDuration;
        const totalLength = path.getTotalLength();
        const currentLength = progress * totalLength;

        try {
          const point = path.getPointAtLength(currentLength);
          
          // Slower decay scaling (retains size/brightness longer, then drops off near the core)
          const size = 6.5 * Math.pow(1 - progress, 0.4); 
          const opacity = Math.pow(1 - progress, 0.6);

          setDotPos({
            x: point.x,
            y: point.y,
            opacity: opacity,
            size: Math.max(0.5, size),
          });
        } catch (e) {
          // Fallback
        }
      } else {
        // Fade out completely during the idle period
        setDotPos((prev) => ({ ...prev, opacity: 0 }));
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
        opacity: 1,
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

        {/* Glowing Decaying Particle Dot - Outer Halo (Soft/Wide Glow) */}
        <circle 
          cx={dotPos.x} 
          cy={dotPos.y} 
          r={dotPos.size * 1.8} 
          fill="currentColor" 
          filter="url(#glow-particle)"
          style={{
            opacity: dotPos.opacity * 0.35,
            transition: 'opacity 0.05s ease',
          }}
        />

        {/* Glowing Decaying Particle Dot - Mid Glow (Medium intensity) */}
        <circle 
          cx={dotPos.x} 
          cy={dotPos.y} 
          r={dotPos.size * 1.0} 
          fill="currentColor" 
          filter="url(#glow-particle)"
          style={{
            opacity: dotPos.opacity * 0.75,
            transition: 'opacity 0.05s ease',
          }}
        />

        {/* Glowing Decaying Particle Dot - Inner Core (High-intensity Center) */}
        <circle 
          cx={dotPos.x} 
          cy={dotPos.y} 
          r={dotPos.size * 0.4} 
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
