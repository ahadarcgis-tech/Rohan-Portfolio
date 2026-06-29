import React, { useEffect, useState } from 'react';
import './App.css';
import { ContentProvider } from './context/ContentContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

function AppRouter() {
  const [route, setRoute] = useState(window.location.hash);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const goToPortfolio = () => {
    window.location.hash = '';
    setRoute('');
  };

  const goToAdmin = () => {
    window.location.hash = '#admin';
    setRoute('#admin');
  };

  // Admin routes
  if (route === '#admin') {
    if (!isAuthenticated) {
      return <AdminLogin onBack={goToPortfolio} />;
    }
    return <AdminDashboard onBack={goToPortfolio} />;
  }

  // Portfolio
  return <Portfolio onAdminClick={goToAdmin} />;
}

function Portfolio({ onAdminClick }) {
  // Smooth scroll behavior for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        const href = target.getAttribute('href');
        // Skip admin link
        if (href === '#admin') return;
        e.preventDefault();
        if (href === '#') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="app-wrapper">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
      </main>
      <Contact />
      <Footer />
      {/* Subtle admin link in corner */}
      <button
        onClick={onAdminClick}
        style={{
          position: 'fixed',
          bottom: '16px',
          left: '16px',
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          background: 'rgba(15, 30, 60, 0.6)',
          border: '1px solid rgba(59, 130, 246, 0.12)',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          zIndex: 50,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          transition: 'border-color 0.2s, color 0.2s',
          opacity: 0.5,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.5'; e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.12)'; }}
        title="Admin Panel"
        aria-label="Open admin panel"
      >
        ⚙
      </button>
    </div>
  );
}

function App() {
  return (
    <ContentProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ContentProvider>
  );
}

export default App;
