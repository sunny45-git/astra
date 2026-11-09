import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PortfolioData } from '../types';

interface PortfolioContextType {
  data: PortfolioData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Initial fallback seed data to guarantee zero loading lag
const fallbackData: PortfolioData = {
  profile: {
    name: "ASTRA",
    brandName: "ASTRA",
    founderName: "Sunny Pendela",
    founderTitle: "Founder & Principal Web Architect",
    attribution: "Founded by Sunny Pendela",
    displayName: "Sunny Pendela",
    title: "Founder & Lead Full-Stack Architect",
    subtitle: "Architecting high-performance 3D websites, civic platforms, and bespoke web applications.",
    bio: "I am Sunny Pendela, the founder and lead full-stack developer behind ASTRA. I engineer bespoke, high-performance digital platforms and immersive 3D web experiences tailored for elected public representatives, senior advocates, charitable foundations, and growth-oriented organizations. My mission is to translate complex organizational requirements into authoritative, memorable digital platforms that inspire trust and drive results.",
    education: "B.Tech in Computer Science & Engineering",
    location: "Hyderabad, India / Available Globally",
    avatar: "/astra-avatar.png",
    status: "Available for Q1 / Q2 Projects",
    email: "contact@astra.dev",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    whatsappNumber: "919876543210",
    socials: {
      github: "https://github.com/sunnypendela",
      linkedin: "https://linkedin.com/in/sunnypendela",
      twitter: "https://twitter.com/sunnypendela",
      whatsapp: "https://wa.me/919876543210?text=Hello%20Sunny,%20I'd%20like%20to%20discuss%20an%20ASTRA%20project",
    },
    stats: [
      { label: "Specialized Domains", value: "6+" },
      { label: "Modern Web Stack", value: "100%" },
      { label: "Mobile First & Fast", value: "<1.2s" },
      { label: "Client Direct Focus", value: "1-on-1" },
    ],
  },
  hero: {
    brandName: "ASTRA",
    tagline: "Ideas Beyond Limits.",
    eyebrow: "PREMIUM DIGITAL EXPERIENCES & WEB ARCHITECTURE",
    description: "I build world-class digital experiences and high-performance web applications that help ambitious leaders, legal practices, and organizations dominate their digital space.",
    ctaPrimaryText: "Explore My Work",
    ctaPrimaryLink: "#projects",
    ctaSecondaryText: "Let's Collaborate",
    ctaSecondaryLink: "#contact",
    showParticles: true,
    show3DCore: true,
    availabilityText: "Available for Q1/Q2 Projects",
  },
  projects: [],
  services: [],
  skills: [],
  process: [
    {
      step: "01",
      number: "Phase 01",
      title: "DISCOVER",
      subtitle: "Understanding Purpose & Audience",
      description: "Every great website starts with clarity. I dive deep into your organization's mission, target visitors, key objectives, and aesthetic preferences.",
      tasks: [
        "In-depth consultation call or brief review",
        "Analyzing target audience, competitors & industry benchmarks",
        "Defining website scope, structure, and functional requirements",
        "Aligning on timelines, milestones, and deliverable targets"
      ],
      deliverable: "Project Roadmap & Architecture Outline"
    },
    {
      step: "02",
      number: "Phase 02",
      title: "DESIGN",
      subtitle: "Visual Identity & Architecture",
      description: "Translating concepts into a cohesive design language. I craft an immersive, brand-aligned visual identity featuring refined typography, palettes, and interactive prototypes.",
      tasks: [
        "Establishing design system (colors, typography, glassmorphism)",
        "High-fidelity UI wireframes and desktop/mobile layouts",
        "Interactive component previews and animation choreography",
        "Iterative feedback cycle and design sign-off"
      ],
      deliverable: "Polished UI System & Layout Prototypes"
    },
    {
      step: "03",
      number: "Phase 03",
      title: "DEVELOP",
      subtitle: "Clean Code & Interactive Polish",
      description: "Bringing the design to life with clean, modular, and maintainable code. Building responsive components, smooth animations, and solid backend integrations.",
      tasks: [
        "Modular React component engineering with Tailwind CSS",
        "3D canvas integration and smooth interaction tuning",
        "Form validation, API endpoints, and database wiring",
        "Cross-browser testing across Chrome, Safari, Firefox, and Edge"
      ],
      deliverable: "Fully Functional Interactive Website Build"
    },
    {
      step: "04",
      number: "Phase 04",
      title: "TEST",
      subtitle: "Rigorous QA & Performance Tuning",
      description: "Testing across multiple device viewports, verifying all touch ergonomics, validating security headers, and optimizing load speeds to sub-second thresholds.",
      tasks: [
        "Cross-device responsive stress testing (Desktop, iPad, Android, iPhone)",
        "Lighthouse performance, SEO, and accessibility benchmarks",
        "Form validation and anti-spam verification",
        "Code minification, asset compression, and lazy loading tests"
      ],
      deliverable: "Verified Production-Ready Build & Audit Report"
    },
    {
      step: "05",
      number: "Phase 05",
      title: "LAUNCH",
      subtitle: "Deployment, SSL & Handover",
      description: "Thorough production deployment to reliable hosting with SSL and custom domain DNS configuration, followed by seamless administrative handover.",
      tasks: [
        "Domain DNS routing, SSL certificates, and hosting deployment",
        "Admin dashboard access handover and credentials setup",
        "Post-launch verification and analytics integration",
        "Ongoing support and documentation walkthrough"
      ],
      deliverable: "Live Production Website & Handover Documentation"
    }
  ],
  whyChooseUs: [
    {
      id: "custom-design",
      title: "Premium Custom Design",
      description: "Every website is created from scratch with a distinct aesthetic identity. No generic cookie-cutter templates or bloated page-builder themes.",
      icon: "Sparkles",
      benefit: "Stand out distinctly from competitors with bespoke visual prestige."
    },
    {
      id: "responsive-dev",
      title: "Responsive Development",
      description: "Flawless rendering and intuitive ergonomics across every screen size—from smartphones and iPads to widescreen desktop displays.",
      icon: "Smartphone",
      benefit: "Never lose a visitor due to broken mobile layouts or unreadable text."
    },
    {
      id: "modern-tech",
      title: "Modern Technologies",
      description: "Engineered using battle-tested modern tools like React, Vite, Tailwind CSS, and Three.js for longevity and maintainability.",
      icon: "Cpu",
      benefit: "Clean, modular code that scales effortlessly as your organization grows."
    },
    {
      id: "backend-integration",
      title: "Backend Integration",
      description: "Full-stack capabilities connecting modern frontends with custom Node.js and Express APIs, secure databases, and third-party integrations.",
      icon: "Network",
      benefit: "Real functional capabilities beyond superficial visual mockups."
    },
    {
      id: "performance-optimization",
      title: "Performance Optimization",
      description: "Sub-second load times, lightweight bundle sizes, optimized assets, and best-practice caching for maximum visitor retention.",
      icon: "Zap",
      benefit: "Higher Google rankings, lower bounce rates, and immediate engagement."
    },
    {
      id: "direct-communication",
      title: "Direct Communication",
      description: "You work directly with the developer building your project. No account managers, bureaucratic delays, or lost-in-translation requirements.",
      icon: "MessageSquare",
      benefit: "Fast turnaround, transparent feedback loops, and agility."
    },
    {
      id: "ongoing-support",
      title: "Ongoing Support",
      description: "Committed post-launch guidance, bug warranties, content updates, and deployment support so your digital presence always stays fresh.",
      icon: "ShieldCheck",
      benefit: "Complete peace of mind knowing your website is cared for long after launch."
    }
  ],
  testimonials: [],
  settings: {
    siteTitle: "ASTRA | Premium Digital Experiences & 3D Web Solutions",
    seoDescription: "Ideas Beyond Limits. Award-winning bespoke 3D websites, civic platforms, legal portals, and full-stack web applications by ASTRA.",
    logoText: "ASTRA",
    logoSubtitle: "DIGITAL ARCHITECT",
    primaryColor: "#00f5ff",
    accentColor: "#8b5cf6",
    contactEmail: "contact@astra.dev",
    contactPhone: "+91 98765 43210",
    whatsappNumber: "919876543210",
    footerText: "Ideas Beyond Limits. Architecting immersive digital experiences for leaders, advocates, and forward-thinking enterprises.",
    copyrightText: "ASTRA. All rights reserved."
  }
};

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(fallbackData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/public/data');
      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
        setError(null);
      }
    } catch (err: any) {
      console.warn('Could not connect to live backend API, using local persistent dataset:', err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, isLoading, error, refetch: fetchData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

