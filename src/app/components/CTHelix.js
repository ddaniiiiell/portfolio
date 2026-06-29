'use client';

import React, { useEffect, useState } from 'react';

export default function CTHelix({ horizontal = false }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let animationId;
    const animate = () => {
      setOffset((prev) => (prev + 1.2) % 360);
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  const rings = 8;
  const height = horizontal ? 120 : 320;
  const width = horizontal ? 360 : 200;

  // Generate helical paths
  const points = 60;
  const helixPath1 = [];
  const helixPath2 = [];

  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const angle = t * Math.PI * 6 + (offset * Math.PI) / 180; // 3 full turns
    
    let x, y;
    if (horizontal) {
      x = t * width;
      y = Math.sin(angle) * (height / 2.8) + height / 2;
    } else {
      y = t * height;
      x = Math.sin(angle) * (width / 2.5) + width / 2;
    }
    
    if (i === 0) {
      helixPath1.push(`M ${x} ${y}`);
      helixPath2.push(`M ${horizontal ? x : width - x} ${horizontal ? height - y : y}`);
    } else {
      helixPath1.push(`L ${x} ${y}`);
      helixPath2.push(`L ${horizontal ? x : width - x} ${horizontal ? height - y : y}`);
    }
  }

  // Scanning laser beam coordinate
  const scanLinePos = (Math.sin((offset * Math.PI) / 90) + 1) * ((horizontal ? width : height) / 2);

  return (
    <div 
      className="ct-helix-container" 
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        opacity: 0.85,
        filter: 'drop-shadow(0 0 15px rgba(230, 228, 222, 0.1))',
      }}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Scanner Gantry Rings (Back section of rings for depth) */}
        {Array.from({ length: rings }).map((_, idx) => {
          const pos = (idx / (rings - 1)) * (horizontal ? width : height);
          return (
            <ellipse 
              key={`ring-back-${idx}`}
              cx={horizontal ? pos : width / 2} 
              cy={horizontal ? height / 2 : pos} 
              rx={horizontal ? 12 : width / 2.5} 
              ry={horizontal ? height / 2.8 : 12} 
              stroke="var(--border-color)" 
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Helical Particle Beam 1 (Back strands - lower opacity) */}
        <path 
          d={helixPath1.join(' ')} 
          stroke="var(--text-muted)" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          opacity="0.3"
        />

        {/* Helical Particle Beam 2 (Front strands - higher opacity) */}
        <path 
          d={helixPath2.join(' ')} 
          stroke="var(--accent-primary)" 
          strokeWidth="2" 
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Scanner Gantry Rings (Front section of rings) */}
        {Array.from({ length: rings }).map((_, idx) => {
          const pos = (idx / (rings - 1)) * (horizontal ? width : height);
          return horizontal ? (
            <path 
              key={`ring-front-${idx}`}
              d={`M ${pos} ${height / 2 - height / 2.8} A 12 ${height / 2.8} 0 0 0 ${pos} ${height / 2 + height / 2.8}`}
              stroke="var(--accent-secondary)" 
              strokeWidth="1.5"
              opacity="0.4"
            />
          ) : (
            <path 
              key={`ring-front-${idx}`}
              d={`M ${width / 2 - width / 2.5} ${pos} A ${width / 2.5} 12 0 0 0 ${width / 2 + width / 2.5} ${pos}`}
              stroke="var(--accent-secondary)" 
              strokeWidth="1.5"
              opacity="0.4"
            />
          );
        })}

        {/* CT Scanning Laser Plane Detector */}
        <line 
          x1={horizontal ? scanLinePos : 0} 
          y1={horizontal ? 0 : scanLinePos} 
          x2={horizontal ? scanLinePos : width} 
          y2={horizontal ? height : scanLinePos} 
          stroke="var(--accent-primary)" 
          strokeWidth="1.5"
          opacity="0.75"
        />
        
        {/* Glowing detector nodes */}
        <circle 
          cx={horizontal ? scanLinePos : width / 2} 
          cy={horizontal ? height / 2 : scanLinePos} 
          r={3} 
          fill="var(--accent-primary)" 
        />
      </svg>
    </div>
  );
}
