'use client';

import FloatingNavbar from '@/components/capsule-navbar';
import AboutSection from '@/components/section/about-section';
import ContactSection from '@/components/section/contact-section';
import Footer from '@/components/section/footer';
import HeroSection from '@/components/section/hero-section';
import ProjectsSection from '@/components/section/projects-section';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import { useState, useEffect } from 'react';


export default function Home() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const { activeSection, scrollToSection } = useSmoothScroll();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-950' : 'bg-white'
    }`}>
      <FloatingNavbar 
        activeSection={activeSection} 
        onNavigate={scrollToSection}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      <main>
        <HeroSection theme={theme} />
        <AboutSection theme={theme} />
        <ProjectsSection theme={theme} />
        <ContactSection theme={theme} />
      </main>
      
      <Footer theme={theme} />
    </div>
  );
}