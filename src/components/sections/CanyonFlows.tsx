import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './CanyonFlows.css';

// Adapted CanyonMultiLayerFlows animation with Binder color scheme
interface CanyonMultiLayerFlowsProps {
  accentColor?: { r: number; g: number; b: number } | null;
}

// Particles flow naturally downward with teal accents, adapting to theme
// Can use custom accent color for specific pages
export const CanyonMultiLayerFlows = ({ accentColor }: CanyonMultiLayerFlowsProps) => {
  const { theme } = useTheme();
  
  // Default teal colors if no accent color provided
  const defaultTeal = { r: 0, g: 152, b: 177 }; // --accent
  
  // Use custom accent color or default
  const tealColor = accentColor || defaultTeal;
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    const PARTICLE_COUNT = 20000; // Reduced particle count for softer look
    const WALL_LAYERS = 8;
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      side: number;
      layer: number;
      initialY: number;
      drift: number;
      speed: number;
      brightness: number;
    }> = [];

    // Create particles - balanced between fullness and emptiness
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Determine wall side (-1 or 1) and layer
      const side = Math.random() < 0.5 ? -1 : 1;
      const layer = Math.floor(Math.random() * WALL_LAYERS);
      const y = Math.random() * height;
      
      const centerX = width / 2;

      // Create multiple wave functions for complex undulations
      const wavePhase1 = y * 0.008;
      const wavePhase2 = y * 0.03;
      const wavePhase3 = y * 0.05;

      const baseWave = Math.sin(wavePhase1) * 50;
      const secondaryWave = Math.sin(wavePhase2 * 2 + layer * 0.5) * 25;
      const tertiaryWave = Math.sin(wavePhase3 * 3 + layer * 1.2) * 12;

      const combinedWave = baseWave + secondaryWave + tertiaryWave;
      const layerDepth = layer * 15;
      const wallThickness = 20 + layer * 8;
      
      // Separate particles more - each side further from center
      // Left side goes to left third, right side goes to right third
      const separationDistance = width * 0.33; // 33% of screen width from center (more separation)
      const baseX = centerX + side * (separationDistance + combinedWave + layerDepth);
      const offsetX = (Math.random() - 0.5) * wallThickness;

      particles.push({
        x: baseX + offsetX,
        y: y,
        z: (layer - WALL_LAYERS / 2) * 20 + (Math.random() - 0.5) * 15,
        side: side,
        layer: layer,
        initialY: y,
        drift: Math.random() * Math.PI * 2,
        speed: 0.1 + layer * 0.02,
        brightness: 0.7 + Math.random() * 0.3,
      });
    }

    let time = 0;

    function animate() {
      time += 0.016;

      // Update dimensions if canvas was resized
      const currentWidth = canvas.width;
      const currentHeight = canvas.height;
      
      // Clear with subtle persistence - adapt to theme
      const bgColor = theme === 'dark' ? 'rgba(27, 27, 27, 0.05)' : 'rgba(255, 255, 255, 0.05)';
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, currentWidth, currentHeight);
      
      const centerX = currentWidth / 2;

      // Sort particles by z-depth for proper layering
      particles.sort((a, b) => a.z - b.z);

      particles.forEach((particle) => {
        // Calculate complex wave position
        const wavePhase1 = particle.y * 0.008 + time * 0.05;
        const wavePhase2 = particle.y * 0.03 + time * 0.1 + particle.layer * 0.5;
        const wavePhase3 = particle.y * 0.05 + time * 0.15 + particle.layer * 1.2;

        const baseWave = Math.sin(wavePhase1) * 50;
        const secondaryWave = Math.sin(wavePhase2 * 2) * 25;
        const tertiaryWave = Math.sin(wavePhase3 * 3) * 12;

        const combinedWave = baseWave + secondaryWave + tertiaryWave;
        const layerDepth = particle.layer * 15;
        const wallThickness = 20 + particle.layer * 8;

        // Calculate target position with layer offset - more separation
        const separationDistance = currentWidth * 0.33; // 33% of screen width from center (more separation)
        const targetX = centerX + particle.side * (separationDistance + combinedWave + layerDepth);
        const layerDrift =
          Math.sin(particle.drift + time * 0.5 + particle.layer * 0.3) * wallThickness * 0.5;

        // Smooth movement
        particle.x = particle.x * 0.92 + (targetX + layerDrift) * 0.08;
        particle.y += particle.speed;

        // Add depth oscillation
        particle.z += Math.sin(time * 0.4 + particle.drift + particle.layer * 0.8) * 0.2;

        // Reset at bottom - detachment after completion
        if (particle.y > currentHeight + 30) {
          particle.y = -30;
          particle.drift = Math.random() * Math.PI * 2;
        }

        // Draw with layer-based effects - using Binder teal colors
        const depthFactor = (particle.z + WALL_LAYERS * 10) / (WALL_LAYERS * 20);
        const opacity = 0.25 + depthFactor * 0.15;
        const size = 0.3 + depthFactor * 0.3;

        // Use accent color (custom or default teal) instead of grayscale
        // Adapt brightness based on theme and layer
        let r: number, g: number, b: number;
        
        if (theme === 'dark') {
          // Dark theme: use lighter colors
          const layerBrightness = particle.layer * 8;
          r = Math.min(255, tealColor.r + layerBrightness);
          g = Math.min(255, tealColor.g + particle.layer * 5 + particle.brightness * 20);
          b = Math.min(255, tealColor.b + particle.layer * 8 + particle.brightness * 30);
        } else {
          // Light theme: use darker colors for contrast
          const layerDarkness = particle.layer * 3;
          r = Math.max(0, tealColor.r - layerDarkness);
          g = Math.max(0, tealColor.g - layerDarkness - particle.brightness * 10);
          b = Math.max(0, tealColor.b - particle.layer * 5 - particle.brightness * 15);
        }

        if (opacity > 0 && size > 0) {
          // Layer-based glow - using teal colors
          if (particle.layer < 3) {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, size * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.1})`;
            ctx.fill();
          }

          // Main particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.fill();
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      particles.length = 0;
    };
  }, [theme, tealColor.r, tealColor.g, tealColor.b]);

  return (
    <div className="canyon-flows-container">
      <canvas ref={canvasRef} className="canyon-flows-canvas" />
    </div>
  );
};

export const CanyonFlowsPage = () => {
  return (
    <section id="canyon-flows" className="canyon-flows-section">
      <CanyonMultiLayerFlows />
      {/* Content can be added here if needed */}
      <div className="canyon-flows-content">
        {/* Placeholder for any content you want to overlay */}
      </div>
    </section>
  );
};

