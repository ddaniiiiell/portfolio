'use client';

import React, { useEffect, useState } from 'react';

export default function CTHelix() {
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
  const height = 320;
  const width = 200;

  // Generate helical paths
  const points = 60;
  const helixPath1 = [];
  const helixPath2 = [];

  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const y = t * height;
    const angle = t * Math.PI * 6 + (offset * Math.PI) / 180; // 3 full turns
    const x = Math.sin(angle) * (width / 2.5) + width / 2;
    
    // Add 3D perspective depth by scaling x radius slightly and adding a depth effect
    const z = Math.cos(angle);
    
    if (i === 0) {
      helixPath1.push(`M ${x} ${y}`);
      helixPath2.push(`M ${width - x} ${y}`);
    } else {
      helixPath1.push(`L ${x} ${y}`);
      helixPath2.push(`L ${width - x} ${y}`);
    }
  }

  // Scanning laser beam Y coordinate
  const scanLineY = (Math.sin((offset * Math.PI) / 90) + 1) * (height / 2);

  return (
    <div 
      className="ct-helix-container" 
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        opacity: 0.8,
        filter: 'drop-shadow(0 0 15px rgba(230, 228, 222, 0.1))',
      }}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Scanner Gantry Rings (Back section of rings for depth) */}
        {Array.from({ length: rings }).map((_, idx) => {
          const y = (idx / (rings - 1)) * height;
          return (
            <ellipse 
              key={`ring-back-${idx}`}
              cx={width / 2} 
              cy={y} 
              rx={width / 2.5} 
              ry={12} 
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
          const y = (idx / (rings - 1)) * height;
          return (
            <path 
              key={`ring-front-${idx}`}
              d={`M ${width / 2 - width / 2.5} ${y} A ${width / 2.5} 12 0 0 0 ${width / 2 + width / 2.5} ${y}`}
              stroke="var(--accent-secondary)" 
              strokeWidth="1.5"
              opacity="0.4"
            />
          );
        })}

        {/* CT Scanning Laser Plane Detector */}
        <line 
          x1={0} 
          y1={scanLineY} 
          x2={width} 
          y2={scanLineY} 
          stroke="var(--accent-primary)" 
          strokeWidth="1.5"
          opacity="0.75"
        />
        
        {/* Glowing detector nodes */}
        <circle cx={width / 2} cy={scanLineY} r={3} fill="var(--accent-primary)" />
        <circle cx={width / 2 - width / 2.5} cy={scanLineY} r={2} fill="var(--accent-primary)" />
        <circle cx={width / 2 + width / 2.5} cy={scanLineY} r={2} fill="var(--accent-primary)" />
      </svg>
    </div>
  );
}
