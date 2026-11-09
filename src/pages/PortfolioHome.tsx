import React, { useState } from 'react';
import { CustomCursor } from '../components/common/CustomCursor';
import { Navbar } from '../components/common/Navbar';
import { HeroSection } from '../components/hero/HeroSection';
import { AboutSection } from '../components/about/AboutSection';
import { ServicesSection } from '../components/services/ServicesSection';
import { ProjectsSection } from '../components/projects/ProjectsSection';
import { SkillsSection } from '../components/skills/SkillsSection';
import { WhyChooseMeSection } from '../components/why/WhyChooseMeSection';
import { ProcessSection } from '../components/process/ProcessSection';
import { TestimonialsSection } from '../components/testimonials/TestimonialsSection';
import { ContactSection } from '../components/contact/ContactSection';
import { Footer } from '../components/common/Footer';
import { FloatingWhatsAppButton } from '../components/common/FloatingWhatsAppButton';

export const PortfolioHome: React.FC = () => {
  const [selectedServiceType, setSelectedServiceType] = useState<string>('Personal Portfolio Websites');

  return (
    <div className="relative min-h-screen bg-space-950 text-slate-100 font-sans selection:bg-electric-cyan/25 selection:text-electric-cyan overflow-x-hidden">
      {/* Interactive Desktop Custom Cursor */}
      <CustomCursor />

      {/* Floating Glass Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        {/* 1. Hero — ASTRA brand introduction & 3D Celestial Core */}
        <HeroSection />

        {/* 2. About Me — Personal introduction and development approach */}
        <AboutSection />

        {/* 3. Services — Portfolio, Advocate, Political, Business, NGO, Full-Stack */}
        <ServicesSection onSelectServiceForEnquiry={setSelectedServiceType} />

        {/* 4. Featured Projects — Project images, descriptions, live demo links */}
        <ProjectsSection />

        {/* 5. Skills & Technologies — Editable technology list */}
        <SkillsSection />

        {/* 6. My Process — Discover, Design, Develop, Test, Launch */}
        <ProcessSection />

        {/* 7. Why Choose ASTRA — Key strengths and working approach */}
        <WhyChooseMeSection />

        {/* 8. Testimonials — Genuine client feedback */}
        <TestimonialsSection />

        {/* 9. Contact — Contact form, email, WhatsApp, LinkedIn, GitHub */}
        <ContactSection initialWebsiteType={selectedServiceType} />
      </main>

      {/* Floating Instant WhatsApp Button */}
      <FloatingWhatsAppButton />

      {/* 10. Footer — ASTRA branding and navigation */}
      <Footer />
    </div>
  );
};

