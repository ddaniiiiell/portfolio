'use client';

import React from 'react';

export default function BubbleChamber() {
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
        opacity: 0.18,
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
        {/* Track 1: Particle Pair Production (Classic V-split decay spirals) */}
        <path 
          className="chamber-track track-pair-incoming"
          d="M 400 0 L 400 200" 
          stroke="currentColor" 
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        
        {/* Positive particle spiral (curling left) */}
        <path 
          className="chamber-track track-spiral-left"
          d="M 400 200 C 400 240, 360 280, 320 280 C 270 280, 260 230, 280 200 C 300 170, 330 190, 330 210 C 330 230, 310 240, 300 230 C 290 220, 295 205, 310 205" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeLinecap="round"
        />

        {/* Negative particle spiral (curling right) */}
        <path 
          className="chamber-track track-spiral-right"
          d="M 400 200 C 400 240, 440 280, 480 280 C 530 280, 540 230, 520 200 C 500 170, 470 190, 470 210 C 470 230, 490 240, 500 230 C 510 220, 505 205, 490 205" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeLinecap="round"
        />

        {/* Track 2: High energy particle knock-on electron track (delta ray) */}
        <path 
          className="chamber-track track-delta"
          d="M 150 0 C 180 150, 220 300, 280 480" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          opacity="0.7"
        />
        {/* Branching electron spiral */}
        <path 
          className="chamber-track track-delta-spiral"
          d="M 200 220 C 190 250, 160 260, 140 240 C 120 220, 130 180, 160 180 C 180 180, 190 200, 180 215 C 170 225, 160 220, 160 210" 
          stroke="currentColor" 
          strokeWidth="0.8"
        />

        {/* Track 3: Slow decaying curved particle */}
        <path 
          className="chamber-track track-slow-curve"
          d="M 650 50 C 600 200, 500 350, 320 450" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeDasharray="8 2"
        />
      </svg>
    </div>
  );
}
