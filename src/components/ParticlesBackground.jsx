// components/ParticlesBackground.jsx
import { useEffect, useRef } from 'react';

function ParticlesBackground() {
  const containerRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const loadParticles = () => {
      if (window.particlesJS && containerRef.current) {
        window.particlesJS(containerRef.current.id, {
          particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: '#60a5fa' },
            shape: { type: 'circle' },
            opacity: { value: 0.6 },
            size: { value: 3, random: true },
            line_linked: {
              enable: true,
              distance: 120,
              color: '#60a5fa',
              opacity: 0.12,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1.5,
              out_mode: 'out',
            },
          },
          interactivity: {
            detect_on: 'window',
            events: {
              onhover: { enable: true, mode: 'repulse' },
            },
            modes: {
              repulse: { distance: 100 },
            },
          },
          retina_detect: true,
        });
      } else {
        setTimeout(loadParticles, 200);
      }
    };

    loadParticles();

    return () => {
      if (window.pJSDom && window.pJSDom.length) {
        window.pJSDom.forEach((p) => p.pJS.fn.vendors.destroypJS());
      }
    };
  }, []);

  return <div id="particles-js" ref={containerRef} className="fixed inset-0 z-0 pointer-events-none opacity-90" />;
}

export default ParticlesBackground;