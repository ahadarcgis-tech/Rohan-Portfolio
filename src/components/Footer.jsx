import React from 'react';
import { useContent } from '../context/ContentContext';

const Footer = () => {
  const { content } = useContent();
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} {content.footer.name}. All rights reserved.
        </p>
        <div className="footer-links">
          <a href="#" className="footer-link">LinkedIn</a>
          <a href={`mailto:${content.contact.email}`} className="footer-link">Email</a>
          <a href="#hero" className="footer-link">Back to Top</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
