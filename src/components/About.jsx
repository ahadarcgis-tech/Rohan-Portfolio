import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Globe, Users, BarChart3 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const iconMap = [TrendingUp, Globe, Users, BarChart3];

const About = () => {
  const { content } = useContent();
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">About Me</span>
          <h2 className="section-title text-5xl" style={{ marginBottom: 'var(--spacing-xl)' }}>
            Bridging Human Needs<br />
            <span className="gradient-text">& Technical Implementation</span>
          </h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="about-description">{content.about.paragraph1}</p>
            <p className="about-description">{content.about.paragraph2}</p>
            <p className="about-description">{content.about.paragraph3}</p>
          </motion.div>

          <motion.div
            className="about-stats"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {content.about.stats.map((stat, index) => {
              const Icon = iconMap[index] || BarChart3;
              return (
                <motion.div
                  key={stat.label}
                  className="glass-card stat-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <Icon size={20} style={{ color: 'var(--accent)', marginBottom: '0.5rem' }} />
                  <div className="stat-value">
                    {stat.value}
                    {stat.suffix && <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>{stat.suffix}</span>}
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
