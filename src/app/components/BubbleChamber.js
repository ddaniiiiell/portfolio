'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function BubbleChamber() {
  const pathRef = useRef(null);
  const [dotPos, setDotPos] = useState({ x: 400, y: 0, opacity: 0, size: 6 });

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

  // Standard vertical entry that curls into a decay spiral
  const pathData = "M 400,0 L 400,150 C 400,220 620,220 620,340 C 620,460 180,460 180,340 C 180,240 550,240 550,340 C 550,410 260,410 260,340 C 260,290 480,290 480,340 C 480,380 320,380 320,340 C 320,310 420,310 420,340";

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
        opacity: 0.22,
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
            <feGaussianBlur stdDeviation="3" result="blur" />
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
          opacity="0.35"
        />

        {/* Dotted path details next to it for depth */}
        <path 
          d="M 405,0 L 405,140" 
          stroke="currentColor" 
          strokeWidth="0.8" 
          strokeDasharray="4 8"
          opacity="0.25"
        />

        {/* Glowing Decaying Particle Dot */}
        <circle 
          cx={dotPos.x} 
          cy={dotPos.y} 
          r={dotPos.size} 
          fill="currentColor" 
          filter="url(#glow-particle)"
          style={{
            opacity: dotPos.opacity,
            transition: 'opacity 0.05s ease',
          }}
        />
      </svg>
    </div>
  );
}
