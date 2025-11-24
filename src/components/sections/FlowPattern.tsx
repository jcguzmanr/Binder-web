import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './FlowPattern.css';

// Adapted FlowingPattern animation with Binder color scheme
interface FlowingPatternProps {
  accentColor?: { r: number; g: number; b: number } | null;
}

// Points flow together in unity with teal accents, adapting to theme
// Can use custom accent color for specific pages
export const FlowingPattern = ({ accentColor }: FlowingPatternProps) => {
  const { theme } = useTheme();
  
  // Default teal colors if no accent color provided
  const defaultAccent = { r: 0, g: 152, b: 177 }; // --accent
  const defaultAccentLight = { r: 174, g: 222, b: 230 }; // --accent-light
  
  // Use custom accent color or default
  const accent = accentColor || defaultAccent;
  const accentLight = accentColor
    ? { r: Math.min(255, accentColor.r + 80), g: Math.min(255, accentColor.g + 40), b: Math.min(255, accentColor.b + 30) }
    : defaultAccentLight;
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check if this is being used as a background (inside .background-renderer)
    // Use a small delay to ensure DOM is ready
    const checkIfBackground = () => {
      return canvas.closest('.background-renderer') !== null;
    };
    
    const isBackground = checkIfBackground();

    // Make canvas responsive - fill viewport
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const updateDimensions = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    let time = 0;
    let mouseX = width / 2;
    let mouseY = height / 2;

    // Create points that seek oneness through flow
    const flowPoints: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      angle: number;
      phase: number;
      noiseOffset: number;
    }> = [];
    
    const gridSize = 8;

    // Initialize flow points
    for (let x = gridSize / 2; x < width; x += gridSize) {
      for (let y = gridSize / 2; y < height; y += gridSize) {
        flowPoints.push({
          x,
          y,
          vx: 0,
          vy: 0,
          angle: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2,
          noiseOffset: Math.random() * 1000,
        });
      }
    }

    // Mouse handling - use window coordinates when used as background
    const handleMouseMove = (e: MouseEvent) => {
      if (isBackground) {
        // When used as background, use window coordinates directly
        mouseX = e.clientX;
        mouseY = e.clientY;
      } else {
        // When used as standalone page, use canvas-relative coordinates
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      }
    };

    // Listen to window mousemove when used as background, canvas when standalone
    if (isBackground) {
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      canvas.addEventListener('mousemove', handleMouseMove);
    }

    // Perlin-like noise function
    function noise(x: number, y: number, t: number) {
      const sin1 = Math.sin(x * 0.01 + t);
      const sin2 = Math.sin(y * 0.01 + t * 0.8);
      const sin3 = Math.sin((x + y) * 0.005 + t * 1.2);
      return (sin1 + sin2 + sin3) / 3;
    }

    // Animation loop
    let animationFrameId: number;

    function animate() {
      if (!canvas || !ctx) return;
      
      const currentWidth = canvas.width;
      const currentHeight = canvas.height;
      
      // Clear with slight transparency for trailing effect - adapt to theme
      const bgColor = theme === 'dark' 
        ? 'rgba(27, 27, 27, 0.15)' 
        : 'rgba(255, 255, 255, 0.15)';
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, currentWidth, currentHeight);

      time += 0.005;

      // Points move with humble integrity toward unity
      flowPoints.forEach((point) => {
        // Calculate noise-based flow
        const noiseValue = noise(point.x, point.y, time);
        const angle = noiseValue * Math.PI * 4;

        // Mouse influence
        const dx = mouseX - point.x;
        const dy = mouseY - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const pushFactor = (1 - dist / 150) * 0.5;
          point.vx += (dx / dist) * pushFactor;
          point.vy += (dy / dist) * pushFactor;
        }

        // Flow field influence
        point.vx += Math.cos(angle) * 0.1;
        point.vy += Math.sin(angle) * 0.1;

        // Damping
        point.vx *= 0.95;
        point.vy *= 0.95;

        // Update position for next frame
        const nextX = point.x + point.vx;
        const nextY = point.y + point.vy;

        // Draw line
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(nextX, nextY);

        // Gradient based on speed - using Binder teal colors
        const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy);
        const alpha = Math.min(0.4, speed * 3); // Reduced from 0.6 to 0.4 and speed multiplier from 5 to 3

        // Use Binder teal colors instead of gray
        // Adapt color intensity based on theme
        if (theme === 'dark') {
          // Dark theme: use lighter teal for visibility
          ctx.strokeStyle = `rgba(174, 222, 230, ${alpha})`; // accent-light
        } else {
          // Light theme: use darker teal for contrast
          ctx.strokeStyle = `rgba(0, 152, 177, ${alpha})`; // accent
        }
        
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw a small dot at the point - more transparent
        ctx.beginPath();
        ctx.arc(point.x, point.y, 0.5, 0, Math.PI * 2);
        
        if (theme === 'dark') {
          ctx.fillStyle = `rgba(${accentLight.r}, ${accentLight.g}, ${accentLight.b}, ${alpha * 0.3})`;
        } else {
          ctx.fillStyle = `rgba(${accent.r}, ${accent.g}, ${accent.b}, ${alpha * 0.3})`;
        }
        
        ctx.fill();

        // Reset position to grid when it goes off screen
        if (nextX < 0) point.x = currentWidth;
        if (nextX > currentWidth) point.x = 0;
        if (nextY < 0) point.y = currentHeight;
        if (nextY > currentHeight) point.y = 0;

        // Return to original position slowly
        point.x +=
          point.x % gridSize === gridSize / 2
            ? 0
            : (gridSize / 2 - (point.x % gridSize)) * 0.01;
        point.y +=
          point.y % gridSize === gridSize / 2
            ? 0
            : (gridSize / 2 - (point.y % gridSize)) * 0.01;
      });

      // Add noise texture overlay to make points less textual
      const imageData = ctx.getImageData(0, 0, currentWidth, currentHeight);
      const data = imageData.data;
      const noiseIntensity = 8; // Adjust noise intensity (0-255)
      
      for (let i = 0; i < data.length; i += 4) {
        // Add random noise to RGB channels
        const noiseValue = (Math.random() - 0.5) * noiseIntensity;
        data[i] = Math.max(0, Math.min(255, data[i] + noiseValue));     // R
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noiseValue)); // G
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noiseValue)); // B
        // Alpha channel stays the same
      }
      
      ctx.putImageData(imageData, 0, 0);

      // Add radial gradient fade from center to make center lighter
      const centerX = currentWidth / 2;
      const centerY = currentHeight / 2;
      const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
      
      if (theme === 'dark') {
        // Dark theme: fade to darker/transparent in center
        gradient.addColorStop(0, 'rgba(27, 27, 27, 0.6)'); // More opaque in center
        gradient.addColorStop(0.3, 'rgba(27, 27, 27, 0.3)');
        gradient.addColorStop(0.6, 'rgba(27, 27, 27, 0.1)');
        gradient.addColorStop(1, 'rgba(27, 27, 27, 0)'); // Transparent at edges
      } else {
        // Light theme: fade to white/transparent in center
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)'); // More opaque in center
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent at edges
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, currentWidth, currentHeight);

      animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      // Remove the appropriate event listener
      if (isBackground) {
        window.removeEventListener('mousemove', handleMouseMove);
      } else {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
      
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateDimensions);

      // Clear canvas context
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      // Clear flowPoints array to prevent memory leaks
      flowPoints.length = 0;
    };
  }, [theme, accent.r, accent.g, accent.b, accentLight.r, accentLight.g, accentLight.b]);

  return (
    <div className="flowing-pattern-container">
      <canvas ref={canvasRef} className="flowing-pattern-canvas" />
    </div>
  );
};

export const FlowPatternPage = () => {
  return (
    <section id="flow-pattern" className="flow-pattern-section">
      <FlowingPattern />
      {/* Content can be added here if needed */}
      <div className="flow-pattern-content">
        {/* Placeholder for any content you want to overlay */}
      </div>
    </section>
  );
};


