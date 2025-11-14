import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Test.css';

interface PathData {
  d: string;
  style: string;
  index: number;
  x: number;
  y: number;
}

export const Test = () => {
  const [paths, setPaths] = useState<PathData[]>([]);

  useEffect(() => {
    // Load and parse the SVG file
    fetch('/DotMatrix1.svg')
      .then((response) => response.text())
      .then((svgText) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const pathElements = svgDoc.querySelectorAll('path');
        
        const pathsArray = Array.from(pathElements).map((path, index) => {
          const d = path.getAttribute('d') || '';
          // Extract X and Y coordinates from path data (format: "Mx,yL...")
          const match = d.match(/M([\d.]+),([\d.]+)/);
          const x = match ? parseFloat(match[1]) : 0;
          const y = match ? parseFloat(match[2]) : 0;
          
          return {
            d,
            style: path.getAttribute('style') || '',
            index,
            x,
            y,
          };
        });
        
        setPaths(pathsArray);
      })
      .catch((error) => {
        console.error('Error loading SVG:', error);
      });
  }, []);

  // Generate ultra-smooth wave animation based on X position
  const getAnimationProps = (pathData: PathData) => {
    const { x, y } = pathData;
    
    // Normalize X position (0 to 440 based on viewBox)
    const normalizedX = x / 440;
    
    // Wave parameters - optimized for maximum fluidity
    const waveAmplitude = 10;
    const waveFrequency = 1.0;
    const waveSpeed = 0.6; // Slower for more fluid motion
    
    // Calculate phase offset based on X position (creates wave from left to right)
    const phaseOffset = normalizedX * Math.PI * 2 * waveFrequency;
    
    // Add slight variation based on Y position for more organic feel
    const yVariation = 1 + (y / 174) * 0.1;
    const amplitude = waveAmplitude * yVariation;
    
    // Create ultra-smooth continuous wave animation with many keyframes
    const steps = 120; // Very high number of steps for ultra-smooth animation
    
    const keyframes = Array.from({ length: steps + 1 }, (_, i) => {
      const progress = i / steps;
      const angle = phaseOffset + progress * Math.PI * 2;
      return Math.sin(angle) * amplitude;
    });
    
    return {
      initial: { y: 0 },
      animate: {
        y: keyframes,
      },
      transition: {
        duration: 8 / waveSpeed, // Longer duration for smoother motion
        repeat: Infinity,
        ease: [0.43, 0.13, 0.23, 0.96], // Very smooth easing curve
        // Delay creates wave propagation from left to right
        delay: normalizedX * 0.6,
      },
    };
  };

  return (
    <div className="test-page">
      <div className="test-container">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 440 174"
          xmlns="http://www.w3.org/2000/svg"
          className="dot-matrix-svg"
        >
          {paths.map((path) => (
            <motion.path
              key={path.index}
              d={path.d}
              style={{ fillRule: 'nonzero' }}
              {...getAnimationProps(path)}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};
