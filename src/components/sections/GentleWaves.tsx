import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './GentleWaves.css';

interface GentleWavesProps {
  accentColor?: { r: number; g: number; b: number } | null;
}

// Adapted GentleWaves animation with Binder color scheme
// Colors adapt to theme: clear background (white/black) with teal accents
// Can use custom accent color for specific pages
export const GentleWaves = ({ accentColor }: GentleWavesProps) => {
  const { theme } = useTheme();
  
  // Default teal colors if no accent color provided
  const defaultAccent = { r: 0, g: 152, b: 177 }; // --accent
  const defaultAccentLight = { r: 174, g: 222, b: 230 }; // --accent-light
  const defaultVeryLightBlue = { r: 150, g: 239, b: 255 }; // --very-light-blue
  
  // Use custom accent color or default
  const accent = accentColor || defaultAccent;
  const accentLight = accentColor 
    ? { r: Math.min(255, accentColor.r + 80), g: Math.min(255, accentColor.g + 40), b: Math.min(255, accentColor.b + 30) }
    : defaultAccentLight;
  const veryLightBlue = accentColor
    ? { r: Math.min(255, accentColor.r + 60), g: Math.min(255, accentColor.g + 50), b: Math.min(255, accentColor.b + 20) }
    : defaultVeryLightBlue;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
  const particles = useRef([]);
  const time = useRef(0);

  // Initialize canvas and handle resizing
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        // Make canvas fill the viewport
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        setDimensions({ width, height });
        canvas.width = width;
        canvas.height = height;
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const { width, height } = dimensions;
      
      // Clear background - adapts to theme (white for light, black for dark)
      const bgColor = theme === 'dark' ? '#1B1B1B' : '#FFFFFF';
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
      
      // Update time
      time.current += 0.005;
      
      // The underlying structure reveals itself
      // Using teal accent colors with low opacity, adapting to theme
      // Only show grid in light mode
      if (theme === 'light') {
        const gridColor = `rgba(${accent.r}, ${accent.g}, ${accent.b}, 0.08)`;
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 0.3;
        
        // Each line finds its own path
        for (let y = 0; y < height; y += 40) {
          const offsetY = 5 * Math.sin(time.current + y * 0.01);  // Natural movement
          
          ctx.beginPath();
          ctx.moveTo(0, y + offsetY);
          ctx.lineTo(width, y + offsetY);
          ctx.stroke();
        }
        
        // Vertical lines with subtle wave
        for (let x = 0; x < width; x += 40) {
          const offsetX = 5 * Math.sin(time.current + x * 0.01);
          
          ctx.beginPath();
          ctx.moveTo(x + offsetX, 0);
          ctx.lineTo(x + offsetX, height);
          ctx.stroke();
        }
      }
      
      // Long horizontal flowing lines - using teal accent colors
      const numHorizontalLines = 30;
      
      for (let i = 0; i < numHorizontalLines; i++) {
        const yPos = (i / numHorizontalLines) * height;
        const amplitude = 40 + 20 * Math.sin(time.current * 0.2 + i * 0.1);
        const frequency = 0.008 + 0.004 * Math.sin(time.current * 0.1 + i * 0.05);
        const speed = time.current * (0.5 + 0.3 * Math.sin(i * 0.1));
        const thickness = 0.8 + 0.6 * Math.sin(time.current + i * 0.2);
        const baseOpacity = theme === 'dark' ? 0.2 : 0.12;
        const opacity = baseOpacity + 0.1 * Math.abs(Math.sin(time.current * 0.3 + i * 0.15));
        
        ctx.beginPath();
        ctx.lineWidth = thickness;
        // Using accent color (custom or default teal) with varying opacity, adapting to theme
        ctx.strokeStyle = `rgba(${accent.r}, ${accent.g}, ${accent.b}, ${opacity})`;
        
        // Draw a flowing line
        for (let x = 0; x < width; x += 2) {
          const y = yPos + amplitude * Math.sin(x * frequency + speed);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      }
      
      // Long diagonal flowing lines - "crossing patterns"
      const numDiagonalLines = 35;
      
      for (let i = 0; i < numDiagonalLines; i++) {
        const offset = (i / numDiagonalLines) * width * 2 - width * 0.5;
        const amplitude = 30 + 20 * Math.cos(time.current * 0.25 + i * 0.1);
        const frequency = 0.01 + 0.005 * Math.sin(time.current * 0.15 + i * 0.08);
        const phase = time.current * (0.3 + 0.2 * Math.sin(i * 0.1));
        const thickness = 0.7 + 0.5 * Math.sin(time.current + i * 0.25);
        const baseOpacity = theme === 'dark' ? 0.15 : 0.1;
        const opacity = baseOpacity + 0.08 * Math.abs(Math.sin(time.current * 0.2 + i * 0.1));
        
        ctx.beginPath();
        ctx.lineWidth = thickness;
        // Using accent-light color (custom or default) for diagonal lines, adapting to theme
        ctx.strokeStyle = `rgba(${accentLight.r}, ${accentLight.g}, ${accentLight.b}, ${opacity})`;
        
        // Draw diagonal flowing line
        const steps = 100;
        for (let j = 0; j <= steps; j++) {
          const progress = j / steps;
          const x = offset + progress * width;
          const y = progress * height + amplitude * Math.sin(progress * 8 + phase);
          
          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      }
      
      // Long vertical flowing lines
      const numVerticalLines = 25;
      
      for (let i = 0; i < numVerticalLines; i++) {
        const xPos = (i / numVerticalLines) * width;
        const amplitude = 35 + 15 * Math.sin(time.current * 0.15 + i * 0.12);
        const frequency = 0.009 + 0.004 * Math.cos(time.current * 0.12 + i * 0.07);
        const speed = time.current * (0.4 + 0.25 * Math.cos(i * 0.15));
        const thickness = 0.6 + 0.4 * Math.sin(time.current + i * 0.3);
        const baseOpacity = theme === 'dark' ? 0.13 : 0.09;
        const opacity = baseOpacity + 0.07 * Math.abs(Math.sin(time.current * 0.25 + i * 0.18));
        
        ctx.beginPath();
        ctx.lineWidth = thickness;
        // Using very-light-blue color (custom or default) for vertical lines, adapting to theme
        ctx.strokeStyle = `rgba(${veryLightBlue.r}, ${veryLightBlue.g}, ${veryLightBlue.b}, ${opacity})`;
        
        // Draw a flowing vertical line
        for (let y = 0; y < height; y += 2) {
          const x = xPos + amplitude * Math.sin(y * frequency + speed);
          
          if (y === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      }
      
      // Request next frame
      requestIdRef.current = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
        requestIdRef.current = null;
      }
      
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      
      particles.current = [];
      time.current = 0;
    };
  }, [dimensions, theme, accent.r, accent.g, accent.b, accentLight.r, accentLight.g, accentLight.b, veryLightBlue.r, veryLightBlue.g, veryLightBlue.b]);
  
  return (
    <div className="gentle-waves-container">
      <canvas 
        ref={canvasRef} 
        width={dimensions.width} 
        height={dimensions.height}
        className="gentle-waves-canvas"
      />
    </div>
  );
};

export const GentleWavesPage = () => {
  return (
    <section id="gentle-waves" className="gentle-waves-section">
      <GentleWaves />
      {/* Content can be added here if needed */}
      <div className="gentle-waves-content">
        {/* Placeholder for any content you want to overlay */}
      </div>
    </section>
  );
};

