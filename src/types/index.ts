export interface ProfileData {
  name: string;
  brandName?: string;
  founderName: string;
  founderTitle: string;
  attribution: string;
  displayName: string;
  title: string;
  subtitle: string;
  bio: string;
  education: string;
  location: string;
  avatar: string;
  status: string;
  email: string;
  phone: string;
  whatsapp: string;
  whatsappNumber: string;
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
    whatsapp: string;
  };
  stats: { label: string; value: string }[];
}

export interface HeroData {
  brandName: string;
  tagline: string;
  eyebrow: string;
  description: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  showParticles: boolean;
  show3DCore: boolean;
  availabilityText: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  clientType: string;
  technologies: string[];
  liveUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  published?: boolean;
  order?: number;
  image?: string;
  accentColor: string;
  mockupTheme: 'dark-navy' | 'deep-emerald' | 'royal-indigo' | 'slate-cyan' | 'obsidian';
  stats?: { label: string; value: string }[];
  keyFeatures: string[];
}

export interface Service {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  detailedDescription: string;
  technologies: string[];
  icon: string;
  visible?: boolean;
  order?: number;
  deliverables: string[];
  idealFor: string;
}

export interface SkillItem {
  id?: string;
  name: string;
  category?: 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'TOOLS';
  tag: string;
  icon: string;
  description: string;
}

export interface SkillCategory {
  category: 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'TOOLS';
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface WorkingProcessStep {
  step: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tasks: string[];
  deliverable: string;
}

export interface WhyChooseMeReason {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefit: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  organization: string;
  avatar?: string;
  quote: string;
  rating: number;
  visible: boolean;
  projectRef?: string;
}

export interface ContactEnquiry {
  id: string;
  fullName: string;
  email: string;
  organization?: string;
  websiteType: string;
  budget?: string;
  description: string;
  status: 'new' | 'read' | 'completed';
  createdAt: string;
}

export interface WebsiteSettings {
  siteTitle: string;
  seoDescription: string;
  logoText: string;
  logoSubtitle: string;
  primaryColor: string;
  accentColor: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  footerText: string;
  copyrightText: string;
}

export interface PortfolioData {
  profile: ProfileData;
  hero: HeroData;
  projects: Project[];
  services: Service[];
  skills: SkillItem[];
  process: WorkingProcessStep[];
  whyChooseUs: WhyChooseMeReason[];
  testimonials: Testimonial[];
  settings: WebsiteSettings;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  organization: string;
  websiteType: string;
  budget: string;
  description: string;
}
