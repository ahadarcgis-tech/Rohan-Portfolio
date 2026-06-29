import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, ArrowDown } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Hero = () => {
  const { content } = useContent();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame;
    let dots = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    const initDots = () => {
      dots = [];
      const spacing = 80;
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          dots.push({
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 20,
            baseOpacity: Math.random() * 0.3 + 0.05,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot) => {
        const opacity = dot.baseOpacity + Math.sin(time * 0.001 + dot.phase) * 0.1;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      animFrame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    animFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <section className="hero-section" id="hero">
      <div className="hero-bg">
        <canvas ref={canvasRef} className="hero-grid-canvas" />
        <div className="hero-gradient-orb hero-gradient-orb-1" />
        <div className="hero-gradient-orb hero-gradient-orb-2" />
      </div>

      <div className="container">
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="hero-badge-dot" />
            <span>{content.hero.badge}</span>
          </motion.div>

          <motion.h1
            className="hero-title text-7xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {content.hero.titleLine1}<br />
            <span className="accent">{content.hero.titleLine2}</span><br />
            {content.hero.titleLine3}
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {content.hero.subtitle}
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-outline">
              <Mail size={16} />
              Get in Touch
            </a>
          </motion.div>

          <motion.div
            className="hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className="hero-meta-item">
              <MapPin size={16} />
              <span>{content.hero.location}</span>
            </div>
            <div className="hero-meta-item">
              <span style={{ color: 'var(--accent-light)', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>{content.hero.affiliation}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
