import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Contact = () => {
  const { content } = useContent();
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <motion.div
          className="contact-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Get in Touch</span>
          <h2 className="contact-heading">
            Let's Create Something<br />
            <span className="gradient-text">Extraordinary Together</span>
          </h2>
          <p className="contact-desc">
            {content.contact.description}
          </p>

          <div className="contact-links">
            <a href={`mailto:${content.contact.email}`} className="contact-link">
              <Mail size={16} />
              {content.contact.email}
            </a>
            <a href={`tel:${content.contact.phone.replace(/[\s-]/g, '')}`} className="contact-link">
              <Phone size={16} />
              {content.contact.phone}
            </a>
            <a href={content.contact.linkedinUrl} className="contact-link">
              <ExternalLink size={16} />
              {content.contact.linkedinLabel}
            </a>
            <div className="contact-link" style={{ cursor: 'default' }}>
              <MapPin size={16} />
              {content.contact.location}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
