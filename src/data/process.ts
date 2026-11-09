import { WorkingProcessStep } from '../types';

export const processSteps: WorkingProcessStep[] = [
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
    title: "LAUNCH",
    subtitle: "Testing, Optimization & Deployment",
    description: "Thorough quality assurance, performance tuning, and seamless production deployment to reliable hosting with SSL and domain configuration.",
    tasks: [
      "Lighthouse performance, SEO, and accessibility audit",
      "Mobile and tablet responsive fine-tuning",
      "Domain DNS connection, SSL certificates, and hosting setup",
      "Client handover walkthrough and post-launch documentation"
    ],
    deliverable: "Live Production Website & Handover Documentation"
  }
];

