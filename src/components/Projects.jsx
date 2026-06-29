import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Projects = () => {
  const { content } = useContent();
  return (
    <section className="section" id="projects">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Selected Work</span>
          <h2 className="section-title text-5xl" style={{ marginBottom: 'var(--spacing-md)' }}>
            Design & Visualization<br />
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle" style={{ marginBottom: 'var(--spacing-xl)' }}>
            Academic projects showcasing spatial design thinking, data integration, and community-centered research.
          </p>
        </motion.div>

        <div className="projects-grid">
          {content.projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="glass-card-static project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="project-image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-image-overlay" />
              </div>

              <div className="project-content">
                <div className="project-role-badge">{project.role}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-context">{project.context}</p>
                <div className="project-bullets">
                  {project.bullets.map((bullet, i) => (
                    <p key={i} className="project-bullet">{bullet}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
