'use client';

import React from 'react';

export default function GridPattern() {
  // Coordinates are exactly at multiples of 10vw and 10vh to sit perfectly on grid lines
  const gridStars = [
    { x: '20vw', y: '30vh', delay: '0s', scale: 0.8 },
    { x: '50vw', y: '10vh', delay: '2s', scale: 1.2 },
    { x: '80vw', y: '40vh', delay: '4s', scale: 0.9 },
    { x: '30vw', y: '70vh', delay: '1.5s', scale: 1.0 },
    { x: '70vw', y: '80vh', delay: '3.5s', scale: 0.7 },
    { x: '10vw', y: '50vh', delay: '5s', scale: 1.1 },
    { x: '90vw', y: '20vh', delay: '2.5s', scale: 0.8 },
    { x: '40vw', y: '90vh', delay: '6s', scale: 1.0 },
    { x: '60vw', y: '60vh', delay: '1.8s', scale: 0.9 },
  ];

  return (
    <div className="grid-overlay">
      {gridStars.map((star, idx) => (
        <div
          key={idx}
          className="grid-star"
          style={{
            position: 'absolute',
            left: star.x,
            top: star.y,
            transform: 'translate(-50%, -50%)',
            animationDelay: star.delay,
          }}
        >
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            style={{ color: 'var(--accent-primary)', display: 'block' }}
          >
            <path 
              d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" 
              fill="currentColor" 
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
