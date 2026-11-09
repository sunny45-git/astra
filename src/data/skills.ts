import { SkillCategory } from '../types';

export const skillsData: SkillCategory[] = [
  {
    category: "FRONTEND",
    title: "Frontend Development",
    description: "Crafting fluid, pixel-accurate, and accessible user interfaces that balance high aesthetic polish with rapid rendering performance.",
    skills: [
      {
        name: "HTML5",
        tag: "Semantic Architecture",
        icon: "FileCode2",
        description: "Modern semantic structure, SEO metadata, web accessibility (a11y), and clean DOM organization."
      },
      {
        name: "CSS3",
        tag: "Styling & Responsive Layouts",
        icon: "Palette",
        description: "Modern CSS Grid, Flexbox, glassmorphic styling, custom properties, and fluid typography."
      },
      {
        name: "JavaScript",
        tag: "Core & Modern ES6+",
        icon: "Code",
        description: "Asynchronous programming, DOM manipulation, promises, fetch API, and component logic."
      },
      {
        name: "React",
        tag: "Component Architecture",
        icon: "Atom",
        description: "Reusable component design, state hooks, custom hooks, virtual DOM performance, and ecosystem integration."
      },
      {
        name: "Tailwind CSS",
        tag: "Utility-First Design",
        icon: "Layers",
        description: "Design systems, dark mode palettes, custom utility extensions, and rapid responsive interfaces."
      }
    ]
  },
  {
    category: "BACKEND",
    title: "Backend Engineering",
    description: "Building robust, scalable server-side systems and RESTful API architectures with clean routing and validation.",
    skills: [
      {
        name: "Node.js",
        tag: "JavaScript Runtime",
        icon: "Server",
        description: "Event-driven, asynchronous I/O server runtime powering fast API backends and microservices."
      },
      {
        name: "Express.js",
        tag: "Web Framework",
        icon: "Terminal",
        description: "RESTful API route structuring, middleware pipelines, error handling, and CORS configuration."
      }
    ]
  },
  {
    category: "DATABASE",
    title: "Database Management",
    description: "Designing efficient NoSQL data models and document schemas tailored for performance and data consistency.",
    skills: [
      {
        name: "MongoDB",
        tag: "NoSQL Database",
        icon: "Database",
        description: "Document-oriented data modeling, Mongoose ORM schema validation, indexing, and CRUD query aggregation."
      }
    ]
  },
  {
    category: "TOOLS",
    title: "Development Tools & Workflow",
    description: "Employing version control, collaborative code repositories, and modern IDE workflows for clean code delivery.",
    skills: [
      {
        name: "Git",
        tag: "Version Control",
        icon: "GitBranch",
        description: "Branching strategies, commit history hygiene, conflict resolution, and version tagging."
      },
      {
        name: "GitHub",
        tag: "Code Repository & CI/CD",
        icon: "Github",
        description: "Remote repositories, code reviews, collaborative pull requests, and automated deployment triggers."
      },
      {
        name: "VS Code",
        tag: "Primary IDE",
        icon: "Laptop",
        description: "Modern development environment with linting, code formatting, debugging, and extension toolchains."
      }
    ]
  }
];

