import { Service } from '../types';

export const servicesData: Service[] = [
  {
    id: "personal-portfolio",
    title: "Personal Portfolio Websites",
    category: "Personal Brand & Identity",
    shortDescription: "Signature digital portfolios that present your personal brand, thought leadership, achievements, and career milestones with unforgettable visual distinction.",
    detailedDescription: "Designed for leaders, creatives, executives, and high-impact consultants who require a digital showcase that matches their real-world prestige. Features fluid glassmorphic styling, bespoke typography, and conversion-optimized enquiry flows.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Responsive Design", "SEO"],
    icon: "UserCheck",
    deliverables: [
      "Custom brand-aligned visual design",
      "Interactive case study presentations",
      "Mobile-optimized fluid layouts",
      "Search-engine optimized structure",
      "Direct consultation enquiry integration"
    ],
    idealFor: "Industry Leaders, Consultants, Founders & Creative Professionals"
  },
  {
    id: "advocate-legal",
    title: "Advocate & Legal Websites",
    category: "Legal Counsel & Law Chambers",
    shortDescription: "Authoritative, dignified web platforms tailored for senior advocates, legal counsel, and law firms to establish immense trust and credibility.",
    detailedDescription: "A specialized legal practice presence designed with utmost professionalism and discretion. Clear categorization of practice areas, client intake workflows, landmark case notes, and confidential booking mechanisms that comply with industry ethics.",
    technologies: ["React", "Tailwind CSS", "Confidential Forms", "Semantic HTML", "Security"],
    icon: "Scale",
    deliverables: [
      "Practice areas and precedent overviews",
      "Confidential client appointment booking",
      "Publications & legal commentary blog",
      "Chamber associates & credentials display",
      "High-speed SSL secure architecture"
    ],
    idealFor: "Senior Advocates, Legal Firms, Arbitrators & Corporate Attorneys"
  },
  {
    id: "political-public",
    title: "Political & Public Representative Websites",
    category: "Civic & Constituency Portals",
    shortDescription: "High-visibility official websites for public representatives and community leaders to communicate achievements, constituency updates, and citizen initiatives.",
    detailedDescription: "Engineered to withstand high traffic spikes during public campaigns while maintaining absolute clarity. Includes citizen grievance capture, press media rooms, developmental track records, speech archives, and multilingual readiness.",
    technologies: ["React", "Express.js", "Media Galleries", "Constituency Grievance Routing"],
    icon: "Landmark",
    deliverables: [
      "Chronological achievement timeline",
      "Citizen grievance & feedback portal",
      "Official press releases & speeches repository",
      "High-resolution media & video gallery",
      "Multilingual font & layout support"
    ],
    idealFor: "MLAs, MPs, Civic Leaders, Public Figures & Policy Makers"
  },
  {
    id: "business-corporate",
    title: "Business & Corporate Websites",
    category: "Commercial & Enterprise",
    shortDescription: "Modern corporate websites engineered to convert enterprise clients, establish market authority, and present services with pristine clarity.",
    detailedDescription: "Transform your company's online value proposition. Fast-loading, structured corporate pages built with interactive service matrices, team profiles, lead generation funnels, and seamless CRM integrations.",
    technologies: ["React", "Node.js", "Tailwind CSS", "Form Automations", "Analytics"],
    icon: "Building2",
    deliverables: [
      "Enterprise service catalogue & solutions matrix",
      "High-converting B2B inquiry funnels",
      "Company philosophy & executive leadership showcase",
      "Google Analytics & event tracking setup",
      "Ultra-fast performance (<1s page load)"
    ],
    idealFor: "B2B Companies, Service Firms, Consultancies & Growing Startups"
  },
  {
    id: "foundation-ngo",
    title: "Foundation & NGO Websites",
    category: "Non-Profit & Social Impact",
    shortDescription: "Heartfelt, transparent platforms for non-profit organizations and trusts to highlight humanitarian impact, attract donors, and coordinate volunteers.",
    detailedDescription: "Built with visual storytelling at the core. Showcase beneficiary statistics, verified social projects, volunteer onboarding workflows, and transparent donation inquiry systems that build public confidence.",
    technologies: ["React", "Tailwind CSS", "Impact Visualizers", "Volunteer Portals"],
    icon: "HeartHandshake",
    deliverables: [
      "Interactive social impact statistics dashboard",
      "Mission pillars: Education, Health & Relief stories",
      "Volunteer onboarding and event management",
      "Donor trust & financial transparency reports",
      "Mobile-friendly community outreach pages"
    ],
    idealFor: "Charitable Trusts, Philanthropic Foundations & Non-Profit Organizations"
  },
  {
    id: "fullstack-applications",
    title: "Full-Stack Web Applications",
    category: "Custom Web Software",
    shortDescription: "End-to-end web applications with custom backends, scalable databases, authenticated dashboards, and interactive user experiences.",
    detailedDescription: "From dynamic administration portals to bespoke client management tools. Cleanly architected using Node.js, Express.js, MongoDB, and React with secure RESTful APIs and responsive frontends.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth"],
    icon: "Cpu",
    deliverables: [
      "Custom REST API architecture",
      "MongoDB schema design & optimization",
      "Role-based secure authentication & authorization",
      "Real-time interactive dashboard components",
      "Production deployment and environment configuration"
    ],
    idealFor: "Businesses requiring custom internal tools, portals, or dynamic workflows"
  }
];

