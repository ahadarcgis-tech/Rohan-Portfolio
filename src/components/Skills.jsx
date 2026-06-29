import React from 'react';
import { motion } from 'framer-motion';
import { Map, Ruler, UserSearch, LineChart, Handshake } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const iconMap = [Map, Ruler, UserSearch, LineChart, Handshake];

const Skills = () => {
  const { content } = useContent();
  return (
    <section className="section" id="skills">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Technical Skills</span>
          <h2 className="section-title text-5xl" style={{ marginBottom: 'var(--spacing-md)' }}>
            Tools & Methodologies
          </h2>
          <p className="section-subtitle" style={{ marginBottom: 'var(--spacing-xl)' }}>
            A comprehensive toolkit spanning spatial analysis, design, research, and data science.
          </p>
        </motion.div>

        <div className="skills-grid">
          {content.skills.map((skill, index) => {
            const Icon = iconMap[index] || Map;
            return (
              <motion.div
                key={skill.title}
                className="glass-card skill-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="skill-icon-wrapper">
                  <Icon size={22} />
                </div>
                <h3 className="skill-title">{skill.title}</h3>
                <div className="skill-tools">
                  {skill.tools.map((tool) => (
                    <span key={tool} className="tag">{tool}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
