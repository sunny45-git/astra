export const defaultData = {
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

  projects: [
    {
      id: "gandra-sathyanarayana-rao",
      title: "Gandra Sathyanarayana Rao Portfolio",
      category: "Public Representative Portfolio",
      shortDescription: "A dignified, high-performance official portal designed to showcase public initiatives, constituency leadership, and citizen engagement.",
      fullDescription: "A comprehensive public representative digital platform engineered with high accessibility, multilingual readiness, media galleries, press release integration, and community feedback channels. Built to convey gravitas, transparency, and accessible communication with constituents.",
      clientType: "Public Leader & Representative",
      technologies: ["React", "Tailwind CSS", "JavaScript", "Node.js", "Express.js"],
      liveUrl: "https://gandrasathyanarayanarao.example.com",
      githubUrl: "https://github.com/sunnypendela/gsr-portfolio",
      featured: true,
      published: true,
      order: 1,
      image: "",
      accentColor: "#00f5ff",
      mockupTheme: "dark-navy",
      stats: [
        { label: "Target Audience", value: "Constituents & Media" },
        { label: "Design Style", value: "Dignified Public Portal" },
        { label: "Key Focus", value: "High Readability & Trust" }
      ],
      keyFeatures: [
        "Dynamic initiative showcase and developmental track records",
        "Official press releases, speeches, and video gallery integration",
        "Constituency grievance and citizen contact routing",
        "High-speed loading with responsive layout across all mobile devices",
        "Bilingual-ready content structure"
      ]
    },
    {
      id: "gandra-venkata-ramana-reddy",
      title: "Gandra Venkata Ramana Reddy Portfolio",
      category: "Public Representative Portfolio",
      shortDescription: "An authoritative digital presence highlighting legislative milestones, constituency welfare projects, and social outreach programs.",
      fullDescription: "Tailored specifically for modern political communication, this platform delivers an authoritative presentation of public service records, constituency progress reports, news updates, and event schedules with deep visual impact and flawless responsiveness.",
      clientType: "Legislative Representative & Public Figure",
      technologies: ["React", "Tailwind CSS", "JavaScript", "Responsive Design"],
      liveUrl: "https://gandravenkataramanareddy.example.com",
      githubUrl: "https://github.com/sunnypendela/gvrr-portal",
      featured: true,
      published: true,
      order: 2,
      image: "",
      accentColor: "#3b82f6",
      mockupTheme: "royal-indigo",
      stats: [
        { label: "Architecture", value: "Component Driven" },
        { label: "Mobile Score", value: "99/100" },
        { label: "Media Engine", value: "HD Gallery" }
      ],
      keyFeatures: [
        "Chronological timeline of social initiatives and public milestones",
        "Interactive constituency map and community welfare index",
        "Press room with downloadable media kits and high-resolution photography",
        "Direct citizen grievance and appointment request interface",
        "Zero-dependency lightweight animation stack"
      ]
    },
    {
      id: "madhu-sudhana-chary",
      title: "Madhu Sudhana Chary Website",
      category: "Personal Portfolio",
      shortDescription: "An executive personal website capturing professional legacy, leadership philosophy, public speeches, and key achievements.",
      fullDescription: "Designed to reflect an esteemed career in leadership and public service. The site emphasizes biographical depth, archival media, keynote address archives, and thought leadership articles with a clean, distinguished typography hierarchy.",
      clientType: "Distinguished Leader / Personal Identity",
      technologies: ["React", "Tailwind CSS", "JavaScript", "HTML5", "CSS3"],
      liveUrl: "https://madhusudhanachary.example.com",
      githubUrl: "https://github.com/sunnypendela/msc-legacy",
      featured: true,
      published: true,
      order: 3,
      image: "",
      accentColor: "#8b5cf6",
      mockupTheme: "obsidian",
      stats: [
        { label: "Experience", value: "Legacy Archive" },
        { label: "Aesthetics", value: "Executive Glass" },
        { label: "Load Time", value: "< 0.9s" }
      ],
      keyFeatures: [
        "Curated historical timeline of public office and key milestones",
        "Keynote addresses, video archives, and interview transcripts",
        "Clean reader-first typography for essays and statements",
        "Seamless mobile experience for senior audiences with customizable font sizing",
        "Direct office liaison contact gateway"
      ]
    },
    {
      id: "basanthi-foundation",
      title: "BASANTHI FOUNDATION",
      category: "Foundation Website",
      shortDescription: "An inspiring NGO & non-profit platform engineered to amplify social causes, showcase donor impact, and drive community contributions.",
      fullDescription: "A humanitarian foundation platform focused on empathy, visual storytelling, and verifiable social impact. Includes educational support programs, healthcare camp chronicles, donation inquiry workflows, and volunteer registration portals.",
      clientType: "Non-Governmental Organization / Trust",
      technologies: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      liveUrl: "https://basanthifoundation.example.com",
      githubUrl: "https://github.com/sunnypendela/basanthi-trust",
      featured: true,
      published: true,
      order: 4,
      image: "",
      accentColor: "#10b981",
      mockupTheme: "deep-emerald",
      stats: [
        { label: "Mission Focus", value: "Social Welfare" },
        { label: "Engagement", value: "Volunteer Portal" },
        { label: "Transparency", value: "Impact Metrics" }
      ],
      keyFeatures: [
        "Real-time impact statistics (beneficiaries served, camps conducted)",
        "Dedicated mission portals: Education, Healthcare & Rural Empowerment",
        "Donor trust transparency section with annual impact reports",
        "Interactive volunteer registration and event sign-up system",
        "Secure inquiry processing for corporate CSR partnerships"
      ]
    },
    {
      id: "premium-advocate-portfolio",
      title: "Premium Advocate Portfolio Demo",
      category: "Legal Professional Website",
      shortDescription: "A sophisticated, high-credibility digital practice portal for legal counsel, senior advocates, and law chambers.",
      fullDescription: "Created to help legal professionals stand out with poise, discretion, and profound authority. Features case domains (Corporate, Civil, Criminal, Constitutional), client consultation scheduling, publication archives, and high-trust confidential communication conduits.",
      clientType: "Advocate & Legal Chamber",
      technologies: ["React", "Tailwind CSS", "JavaScript", "Three.js"],
      liveUrl: "https://advocate-portfolio-demo.example.com",
      githubUrl: "https://github.com/sunnypendela/lex-advocate",
      featured: true,
      published: true,
      order: 5,
      image: "",
      accentColor: "#38bdf8",
      mockupTheme: "slate-cyan",
      stats: [
        { label: "Practice Areas", value: "Multi-Disciplinary" },
        { label: "Client Intake", value: "Confidential Form" },
        { label: "Typography", value: "Legal Editorial" }
      ],
      keyFeatures: [
        "Structured practice domain modules with precedent overviews",
        "Confidential consultation intake form with client case summary",
        "Legal publications, landmark case commentary, and articles blog",
        "Chambers profile, associate directory, and court credentials",
        "Dark glassmorphic aesthetic conveying prestige and modern competence"
      ]
    }
  ],

  services: [
    {
      id: "personal-portfolio",
      title: "Personal Portfolio Websites",
      category: "Personal Brand & Identity",
      shortDescription: "Signature digital portfolios that present your personal brand, thought leadership, achievements, and career milestones with unforgettable visual distinction.",
      detailedDescription: "Designed for leaders, creatives, executives, and high-impact consultants who require a digital showcase that matches their real-world prestige. Features fluid glassmorphic styling, bespoke typography, and conversion-optimized enquiry flows.",
      technologies: ["React", "Tailwind CSS", "Three.js", "Framer Motion", "SEO"],
      icon: "UserCheck",
      visible: true,
      order: 1,
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
      visible: true,
      order: 2,
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
      technologies: ["React", "Express.js", "Media Galleries", "Grievance Routing"],
      icon: "Landmark",
      visible: true,
      order: 3,
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
      visible: true,
      order: 4,
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
      visible: true,
      order: 5,
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
      visible: true,
      order: 6,
      deliverables: [
        "Custom REST API architecture",
        "MongoDB schema design & optimization",
        "Role-based secure authentication & authorization",
        "Real-time interactive dashboard components",
        "Production deployment and environment configuration"
      ],
      idealFor: "Businesses requiring custom internal tools, portals, or dynamic workflows"
    }
  ],

  skills: [
    { id: "html5", name: "HTML5", category: "FRONTEND", tag: "Semantic Web & SEO", icon: "FileCode2", description: "Modern semantic structure, SEO metadata, web accessibility (a11y), and clean DOM organization." },
    { id: "css3", name: "CSS3", category: "FRONTEND", tag: "Styling & Responsive Layouts", icon: "Palette", description: "Modern CSS Grid, Flexbox, glassmorphic styling, custom properties, and fluid typography." },
    { id: "javascript", name: "JavaScript", category: "FRONTEND", tag: "Core & Modern ES6+", icon: "Code", description: "Asynchronous programming, DOM manipulation, promises, fetch API, and component logic." },
    { id: "react", name: "React", category: "FRONTEND", tag: "Component Architecture", icon: "Atom", description: "Reusable component design, state hooks, custom hooks, virtual DOM performance, and ecosystem integration." },
    { id: "tailwind", name: "Tailwind CSS", category: "FRONTEND", tag: "Utility-First Design", icon: "Layers", description: "Design systems, dark mode palettes, custom utility extensions, and rapid responsive interfaces." },
    { id: "threejs", name: "Three.js / R3F", category: "FRONTEND", tag: "Interactive 3D Web", icon: "Sparkles", description: "3D scenes, shaders, materials, performance optimization, and WebGL rendering." },

    { id: "nodejs", name: "Node.js", category: "BACKEND", tag: "JavaScript Runtime", icon: "Server", description: "Event-driven, asynchronous I/O server runtime powering fast API backends and microservices." },
    { id: "express", name: "Express.js", category: "BACKEND", tag: "Web Framework", icon: "Terminal", description: "RESTful API route structuring, middleware pipelines, error handling, and CORS configuration." },

    { id: "mongodb", name: "MongoDB", category: "DATABASE", tag: "NoSQL Document DB", icon: "Database", description: "Document-oriented data modeling, Mongoose ORM schema validation, indexing, and CRUD query aggregation." },

    { id: "git", name: "Git", category: "TOOLS", tag: "Version Control", icon: "GitBranch", description: "Branching strategies, commit history hygiene, conflict resolution, and version tagging." },
    { id: "github", name: "GitHub", category: "TOOLS", tag: "Code Repository & CI/CD", icon: "Github", description: "Remote repositories, code reviews, collaborative pull requests, and automated deployment triggers." },
    { id: "vscode", name: "VS Code", category: "TOOLS", tag: "Primary IDE", icon: "Laptop", description: "Modern development environment with linting, code formatting, debugging, and extension toolchains." }
  ],

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

  testimonials: [
    {
      id: "test-1",
      clientName: "Adv. Rajesh V. Sharma",
      clientRole: "Senior Advocate & Managing Partner",
      organization: "Sharma & Associates Law Chambers",
      avatar: "",
      quote: "ASTRA built an authoritative, high-prestige digital portal for our law chambers that immediately commanded respect from corporate clients. The confidential intake workflows and typography exceeded our highest expectations.",
      rating: 5,
      visible: true,
      projectRef: "Legal Chamber Practice Portal"
    },
    {
      id: "test-2",
      clientName: "K. Mohan Rao",
      clientRole: "Director of Public Affairs",
      organization: "Civic Leadership Initiative",
      avatar: "",
      quote: "The constituency portal developed by ASTRA transformed how our leadership communicates public progress and grievance handling. It effortlessly withstood heavy traffic during public announcements without a single slowdown.",
      rating: 5,
      visible: true,
      projectRef: "Constituency Public Portal"
    },
    {
      id: "test-3",
      clientName: "Dr. Ananya Sen",
      clientRole: "Managing Trustee",
      organization: "Basanthi Foundation Trust",
      avatar: "",
      quote: "Our philanthropic foundation needed a platform that conveyed transparency, empathy, and measurable impact to donors. ASTRA delivered a stunning, emotionally resonant website that increased volunteer signups significantly.",
      rating: 5,
      visible: true,
      projectRef: "BASANTHI FOUNDATION"
    }
  ],

  enquiries: [
    {
      id: "enq-1",
      fullName: "Praveen Kumar",
      email: "praveen.k@corporateventures.in",
      organization: "Corporate Ventures Group",
      websiteType: "Business & Corporate Websites",
      budget: "Enterprise / Multi-Page Platform",
      description: "We are looking to completely redesign our corporate web presence with bespoke 3D brand elements and an interactive client portal.",
      status: "new",
      createdAt: "2026-11-08T14:32:00Z"
    },
    {
      id: "enq-2",
      fullName: "Adv. Sunita Deshmukh",
      email: "chambers@deshmukhlegal.com",
      organization: "Deshmukh Legal Chambers",
      websiteType: "Advocate & Legal Websites",
      budget: "Standard Tier (Foundation / Portfolio)",
      description: "Need an authoritative website showcasing our practice areas in Constitutional law and corporate arbitration with consultation scheduling.",
      status: "read",
      createdAt: "2026-11-07T09:15:00Z"
    }
  ],

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

