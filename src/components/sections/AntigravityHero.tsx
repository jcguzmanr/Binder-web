import { useEffect, useRef } from 'react';
import './AntigravityHero.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  targetAlpha: number;
}

interface AntigravityHeroProps {
  asBackground?: boolean;
}

export const AntigravityHero = ({ asBackground = false }: AntigravityHeroProps = {}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -1000, y: -1000 });
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Observer para detectar cambios de tema
    const themeObserver = new MutationObserver(() => {
      // El draw se actualizará automáticamente en el siguiente frame
    });
    
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      initParticles();
    };

    const initParticles = () => {
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 150);
      particles.current = [];
      
      const marginX = canvas.width * 0.3; // 30% de margen desde los bordes hacia el centro
      const marginY = canvas.height * 0.3; // 30% de margen desde los bordes hacia el centro
      
      for (let i = 0; i < particleCount; i++) {
        let x, y;
        const side = Math.floor(Math.random() * 4); // 0: arriba, 1: derecha, 2: abajo, 3: izquierda
        
        switch (side) {
          case 0: // Borde superior
            x = Math.random() * canvas.width;
            y = Math.random() * marginY;
            break;
          case 1: // Borde derecho
            x = canvas.width - Math.random() * marginX;
            y = Math.random() * canvas.height;
            break;
          case 2: // Borde inferior
            x = Math.random() * canvas.width;
            y = canvas.height - Math.random() * marginY;
            break;
          case 3: // Borde izquierdo
            x = Math.random() * marginX;
            y = Math.random() * canvas.height;
            break;
          default:
            x = Math.random() * canvas.width;
            y = Math.random() * canvas.height;
        }
        
        // Velocidad inicial más suave y orgánica
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.3 + 0.1;
        
        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.4 + 0.1,
          targetAlpha: Math.random() * 0.4 + 0.1
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background: transparent when used as background, gradient when standalone (adapts to theme)
      if (!asBackground) {
        // Default to light mode, check for dark mode
        const theme = document.documentElement.getAttribute('data-theme');
        const isDarkMode = theme === 'dark';
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        if (isDarkMode) {
          gradient.addColorStop(0, '#0a0b10');
          gradient.addColorStop(1, '#1a1c29');
        } else {
          // Light mode (default)
          gradient.addColorStop(0, '#f8f9fa');
          gradient.addColorStop(1, '#e9ecef');
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const centerRadius = Math.min(canvas.width, canvas.height) * 0.3; // Radio del área central prohibida

      // Detectar dark/light mode para adaptar colores (default to light)
      const theme = document.documentElement.getAttribute('data-theme');
      const isDarkMode = theme === 'dark';
      
      // Time-based flow field para movimiento orgánico (similar a Antigravity)
      const time = Date.now() * 0.0002;
      
      // Función de noise mejorada para flujo más orgánico
      const getFlowField = (x: number, y: number, t: number) => {
        // Múltiples octavas de noise para crear flujo más complejo y orgánico
        const scale1 = 0.005;
        const scale2 = 0.012;
        const scale3 = 0.02;
        
        // Primera capa: flujo base suave
        const n1x = Math.sin(x * scale1 + t) * Math.cos(y * scale1 + t * 0.8);
        const n1y = Math.cos(x * scale1 + t * 0.7) * Math.sin(y * scale1 + t);
        
        // Segunda capa: variación media
        const n2x = Math.sin(x * scale2 + t * 1.3) * 0.5;
        const n2y = Math.cos(y * scale2 + t * 1.1) * 0.5;
        
        // Tercera capa: detalles finos
        const n3x = Math.sin(x * scale3 + t * 1.7) * 0.25;
        const n3y = Math.cos(y * scale3 + t * 1.5) * 0.25;
        
        // Combinar capas con rotación para crear flujo circular/espiral
        const angle = Math.atan2(y - centerY, x - centerX);
        const distFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        const spiralFactor = Math.sin(distFromCenter * 0.01 + t * 2) * 0.3;
        
        // Flujo base combinado
        const baseX = (n1x + n2x + n3x) * 0.4;
        const baseY = (n1y + n2y + n3y) * 0.4;
        
        // Añadir componente espiral suave alrededor del centro
        const spiralX = Math.cos(angle + Math.PI / 2) * spiralFactor;
        const spiralY = Math.sin(angle + Math.PI / 2) * spiralFactor;
        
        return {
          x: baseX + spiralX,
          y: baseY + spiralY
        };
      };
      
      particles.current.forEach(p => {
        // Obtener dirección del campo de flujo en la posición actual
        const flow = getFlowField(p.x, p.y, time);
        
        // Aplicar campo de flujo de manera más suave y continua
        p.vx += flow.x * 0.02;
        p.vy += flow.y * 0.02;
        
        // Repulsión del centro para mantener partículas en los bordes (más suave y gradual)
        const dxFromCenter = p.x - centerX;
        const dyFromCenter = p.y - centerY;
        const distFromCenter = Math.sqrt(dxFromCenter * dxFromCenter + dyFromCenter * dyFromCenter);
        
        if (distFromCenter < centerRadius && distFromCenter > 0) {
          // Fuerza más suave que aumenta gradualmente
          const normalizedDist = distFromCenter / centerRadius;
          const force = Math.pow(1 - normalizedDist, 2); // Curva cuadrática para transición suave
          const angle = Math.atan2(dyFromCenter, dxFromCenter);
          // Empujar hacia afuera desde el centro con fuerza suave
          p.vx += Math.cos(angle) * force * 0.12;
          p.vy += Math.sin(angle) * force * 0.12;
        }

        // Mouse interaction (repulsion suave y natural)
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 180;

        if (dist < maxDist && dist > 0) {
          const normalizedDist = dist / maxDist;
          const force = Math.pow(1 - normalizedDist, 1.5); // Curva más suave
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 0.1;
          p.vy += Math.sin(angle) * force * 0.1;
        }

        // Damping más suave para movimiento fluido y continuo
        p.vx *= 0.97;
        p.vy *= 0.97;
        
        // Limitar velocidad máxima para movimiento controlado y natural
        const maxSpeed = 1.8;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Fade pulsing más sutil
        if (Math.abs(p.alpha - p.targetAlpha) < 0.01) {
          p.targetAlpha = Math.random() * 0.3 + 0.1;
        }
        p.alpha += (p.targetAlpha - p.alpha) * 0.03;

        // Wrap around - reiniciar en los bordes opuestos manteniendo el margen y dirección
        const wrapMarginX = canvas.width * 0.3;
        const wrapMarginY = canvas.height * 0.3;
        
        if (p.y < -10) {
          // Si sale por arriba, reiniciar en el borde inferior
          p.y = canvas.height - Math.random() * wrapMarginY;
          p.x = Math.random() * canvas.width;
          // Mantener dirección del flujo pero con variación
          const flow = getFlowField(p.x, p.y, time);
          p.vx = flow.x * 0.5 + (Math.random() - 0.5) * 0.2;
          p.vy = flow.y * 0.5 + (Math.random() - 0.5) * 0.2;
        }
        if (p.y > canvas.height + 10) {
          // Si sale por abajo, reiniciar en el borde superior
          p.y = Math.random() * wrapMarginY;
          p.x = Math.random() * canvas.width;
          const flow = getFlowField(p.x, p.y, time);
          p.vx = flow.x * 0.5 + (Math.random() - 0.5) * 0.2;
          p.vy = flow.y * 0.5 + (Math.random() - 0.5) * 0.2;
        }
        if (p.x < -10) {
          // Si sale por la izquierda, reiniciar en el borde derecho
          p.x = canvas.width - Math.random() * wrapMarginX;
          p.y = Math.random() * canvas.height;
          const flow = getFlowField(p.x, p.y, time);
          p.vx = flow.x * 0.5 + (Math.random() - 0.5) * 0.2;
          p.vy = flow.y * 0.5 + (Math.random() - 0.5) * 0.2;
        }
        if (p.x > canvas.width + 10) {
          // Si sale por la derecha, reiniciar en el borde izquierdo
          p.x = Math.random() * wrapMarginX;
          p.y = Math.random() * canvas.height;
          const flow = getFlowField(p.x, p.y, time);
          p.vx = flow.x * 0.5 + (Math.random() - 0.5) * 0.2;
          p.vy = flow.y * 0.5 + (Math.random() - 0.5) * 0.2;
        }

        // Draw - colores adaptados al tema
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // En dark mode: azul claro, en light mode: azul más oscuro
        const particleR = isDarkMode ? 200 : 48;
        const particleG = isDarkMode ? 220 : 51;
        const particleB = isDarkMode ? 255 : 156;
        ctx.fillStyle = `rgba(${particleR}, ${particleG}, ${particleB}, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connections con gradiente más suave y refinado (similar a Antigravity)
      ctx.lineWidth = 0.4;
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const p1 = particles.current[i];
          const p2 = particles.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Distancia de conexión más amplia pero con opacidad más sutil
          if (dist < 140) {
            // Opacidad que disminuye suavemente con la distancia
            const normalizedDist = dist / 140;
            const opacity = Math.pow(1 - normalizedDist, 2) * 0.12; // Curva cuadrática para transición suave
            
            // Gradiente de color basado en la distancia y posición
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            const distFromCenter = Math.sqrt((midX - centerX) ** 2 + (midY - centerY) ** 2);
            const centerFactor = Math.min(distFromCenter / (Math.min(canvas.width, canvas.height) * 0.5), 1);
            
            // Color más brillante en los bordes, más tenue cerca del centro
            // Adaptar al tema: dark mode más brillante, light mode más tenue
            const baseBrightness = isDarkMode ? 200 : 100;
            const brightness = baseBrightness + centerFactor * (isDarkMode ? 35 : 50);
            const greenOffset = isDarkMode ? 20 : 10;
            const blueValue = isDarkMode ? 255 : 200;
            ctx.strokeStyle = `rgba(${brightness}, ${brightness + greenOffset}, ${blueValue}, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouse.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', resize);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      themeObserver.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [asBackground]);

  return (
    <div className={`antigravity-hero ${asBackground ? 'as-background' : ''}`} ref={containerRef}>
      <canvas ref={canvasRef} />
      {!asBackground && (
        <div className="antigravity-content">
          <h1>Antigravity Auth</h1>
          <p>Experience the weightless authentication flow.</p>
        </div>
      )}
    </div>
  );
};

