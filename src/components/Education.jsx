import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Education = () => {
  const { content } = useContent();
  return (
    <section className="section" id="education">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Education</span>
          <h2 className="section-title text-5xl" style={{ marginBottom: 'var(--spacing-md)' }}>
            Academic Foundation
          </h2>
          <p className="section-subtitle" style={{ marginBottom: 'var(--spacing-xl)' }}>
            A strong academic record in science and engineering, with specialization in urban and regional planning.
          </p>
        </motion.div>

        <div className="education-timeline">
          {content.education.map((item, index) => (
            <motion.div
              key={item.degree}
              className="glass-card education-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <div className={`education-dot${item.isMain ? ' main' : ''}`} />
              <h3 className="education-degree">{item.degree}</h3>
              <p className="education-school">{item.school}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span className="education-gpa">
                  <Award size={14} />
                  {item.gpa}
                </span>
                {item.note && (
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    ({item.note})
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
