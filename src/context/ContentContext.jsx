import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ============================================
// DEFAULT CONTENT — All editable portfolio data
// ============================================

const defaultContent = {
  hero: {
    badge: 'Available for Research Collaboration',
    titleLine1: 'Data Visualization',
    titleLine2: '& User-Centered',
    titleLine3: 'Design.',
    subtitle:
      'Analytical and design-minded Urban Planning student leveraging spatial data, GIS, and civic research to create impactful digital solutions.',
    location: 'Chattogram, Bangladesh',
    affiliation: 'CUET · Urban & Regional Planning',
  },
  about: {
    paragraph1:
      'I am an analytical and design-minded Urban Planning student transitioning into digital visualization and user-centered design. My academic journey at the Chittagong University of Engineering and Technology has equipped me with a unique blend of spatial thinking and community-focused research methodologies.',
    paragraph2:
      'Experienced in translating complex datasets into clear, visual mapping solutions using GIS and Google Earth Engine, I bring a perspective that bridges the gap between raw data and meaningful human experiences. My work in community-centered design projects has honed my ability to conduct stakeholder research — skills that directly mirror UX research methodologies.',
    paragraph3:
      "I'm passionate about applying these data-driven and empathetic design principles to web and digital interfaces, civic technology, and data visualization platforms.",
    stats: [
      { value: '3.49', suffix: '/4.00', label: 'CGPA at CUET' },
      { value: 'GIS', suffix: '', label: 'Spatial Analysis Expert' },
      { value: 'UX', suffix: '', label: 'Community Research' },
      { value: 'Data', suffix: '', label: 'Visualization Specialist' },
    ],
  },
  skills: [
    {
      title: 'Data Visualization & Mapping',
      tools: ['ArcGIS', 'Google Earth Engine', 'Spatial Data Analysis', 'Remote Sensing'],
    },
    {
      title: 'Drafting & Structural Design',
      tools: ['AutoCAD', 'Spatial Mapping', 'Landscape Design', 'Site Planning'],
    },
    {
      title: 'User & Community Research',
      tools: ['Survey Design', 'Quantitative Analysis', 'Stakeholder Research', 'Community-Centered Development'],
    },
    {
      title: 'Analytics & Productivity',
      tools: ['SPSS', 'Advanced Excel', 'Technical Report Writing', 'Statistical Analysis'],
    },
    {
      title: 'Collaboration & Leadership',
      tools: ['Multidisciplinary Collaboration', 'Time Management', 'Attention to Detail', 'Academic Research'],
    },
  ],
  projects: [
    {
      id: 1,
      title: 'Echoes of Nature — Ashkar Dighi',
      role: 'Spatial Designer / Researcher',
      context: 'Academic Design Project',
      image: '/images/echoes-of-nature.png',
      bullets: [
        'Executed a community-centered landscape design for Ashkar Dighi, focusing on the end-user experience of public spaces.',
        'Applied qualitative and quantitative survey research to gather stakeholder requirements, directly mirroring UX research methodologies.',
        'Translated community needs into actionable design frameworks using AutoCAD and spatial mapping.',
      ],
    },
    {
      id: 2,
      title: 'Land Suitability for Rubber Cultivation',
      role: 'GIS Data Analyst',
      context: 'Course Project — Level 4, Term 1',
      image: '/images/gis-rubber-map.png',
      bullets: [
        'Engineered a visual land-use strategy mapping project for the Chittagong District.',
        'Processed and integrated complex datasets — soil, slope, climate, and land-use — into a unified, visually digestible format.',
        'Utilized overlay weighted methods in GIS to create an intuitive suitability map, demonstrating strong capability in visual data communication.',
      ],
    },
  ],
  education: [
    {
      degree: 'B.Sc. in Urban and Regional Planning',
      school: 'Chittagong University of Engineering and Technology (CUET)',
      gpa: 'CGPA: 3.49 / 4.00',
      note: 'Up to 6th Semester',
      isMain: true,
    },
    {
      degree: 'Higher Secondary Certificate (HSC) — Science',
      school: 'Govt. Hazi Mohammad Mohsin College',
      gpa: 'GPA: 5.00 / 5.00',
      note: '',
      isMain: false,
    },
    {
      degree: 'Secondary School Certificate (SSC) — Science',
      school: 'Ispahani Public School & College',
      gpa: 'GPA: 5.00 / 5.00',
      note: '',
      isMain: false,
    },
  ],
  contact: {
    email: 'u2105013@student.cuet.ac.bd',
    phone: '+880 1764-629970',
    linkedinLabel: 'LinkedIn Profile',
    linkedinUrl: '#',
    location: 'Chattogram, Bangladesh',
    description:
      'Open to research collaborations, academic partnerships, and opportunities in civic technology, data visualization, and user-centered design.',
  },
  footer: {
    name: 'Muhtasib Mahmood Rohan',
  },
};

// ============================================
// CONTEXT
// ============================================

const ContentContext = createContext(null);

const STORAGE_KEY = 'portfolio_content';

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Deep merge with defaults to handle new fields
        return deepMerge(defaultContent, parsed);
      }
    } catch (e) {
      console.warn('Failed to load saved content:', e);
    }
    return defaultContent;
  });

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.warn('Failed to save content:', e);
    }
  }, [content]);

  const updateSection = useCallback((section, data) => {
    setContent((prev) => ({
      ...prev,
      [section]: typeof data === 'function' ? data(prev[section]) : data,
    }));
  }, []);

  const resetContent = useCallback(() => {
    setContent(defaultContent);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const resetSection = useCallback((section) => {
    setContent((prev) => ({
      ...prev,
      [section]: defaultContent[section],
    }));
  }, []);

  return (
    <ContentContext.Provider value={{ content, updateSection, resetContent, resetSection, defaultContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within a ContentProvider');
  return ctx;
}

// ============================================
// UTILITIES
// ============================================

function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

export default ContentContext;
