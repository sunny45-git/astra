import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { defaultData } from './defaultData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'astra_db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-Memory state that is synchronized with disk file & optional MongoDB
let dbState = {
  adminUser: null,
  profile: null,
  hero: null,
  projects: [],
  services: [],
  skills: [],
  process: [],
  whyChooseUs: [],
  testimonials: [],
  enquiries: [],
  settings: null,
};

let isMongoConnected = false;

// Save state to JSON file
export function persistState() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(dbState, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error persisting database state to disk:', err);
  }
}

// Load state from file or seed defaults
export async function initDatabase() {
  const defaultAdminEmail = process.env.ADMIN_EMAIL || 'admin@astra.dev';
  const defaultAdminPassword = process.env.ADMIN_PASSWORD || 'AstraAdmin@2026';

  let loadedFromFile = false;

  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      dbState = { ...dbState, ...parsed };
      loadedFromFile = true;
      console.log('✓ Loaded ASTRA database from disk persistence:', DB_FILE);
    } catch (err) {
      console.error('Failed reading existing db file, seeding fresh defaults:', err);
    }
  }

  if (!loadedFromFile) {
    console.log('⚡ Initializing fresh ASTRA database seed...');
    // Generate initial password hash
    const hashedPassword = await bcrypt.hash(defaultAdminPassword, 10);
    
    dbState = {
      adminUser: {
        id: 'admin_1',
        name: 'ASTRA Administrator',
        email: defaultAdminEmail,
        passwordHash: hashedPassword,
        role: 'superadmin',
        createdAt: new Date().toISOString(),
      },
      profile: defaultData.profile,
      hero: defaultData.hero,
      projects: defaultData.projects,
      services: defaultData.services,
      skills: defaultData.skills,
      process: defaultData.process,
      whyChooseUs: defaultData.whyChooseUs,
      testimonials: defaultData.testimonials,
      enquiries: defaultData.enquiries,
      settings: defaultData.settings,
    };

    persistState();
    console.log(`✓ Initialized Default Admin Account: ${defaultAdminEmail}`);
  }

  // Attempt MongoDB connection if MONGO_URI is set
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 3000,
      });
      isMongoConnected = true;
      console.log('✓ Connected to MongoDB Cluster at:', process.env.MONGO_URI);
    } catch (mongoErr) {
      console.warn('Notice: MongoDB connection failed or timed out. Operating seamlessly with persistent JSON storage engine.');
      isMongoConnected = false;
    }
  } else {
    console.log('ℹ No MONGO_URI specified. Operating with persistent local database engine at server/data/astra_db.json.');
  }

  return dbState;
}

// Accessor methods for collections
export const db = {
  getState: () => dbState,
  
  getAdmin: () => dbState.adminUser,
  setAdmin: (newAdmin) => {
    dbState.adminUser = { ...dbState.adminUser, ...newAdmin };
    persistState();
    return dbState.adminUser;
  },

  getProfile: () => dbState.profile,
  setProfile: (newProfile) => {
    dbState.profile = { ...dbState.profile, ...newProfile };
    persistState();
    return dbState.profile;
  },

  getHero: () => dbState.hero,
  setHero: (newHero) => {
    dbState.hero = { ...dbState.hero, ...newHero };
    persistState();
    return dbState.hero;
  },

  getProjects: () => dbState.projects,
  saveProject: (projectData) => {
    const existingIndex = dbState.projects.findIndex((p) => p.id === projectData.id);
    if (existingIndex >= 0) {
      dbState.projects[existingIndex] = { ...dbState.projects[existingIndex], ...projectData };
    } else {
      const newId = projectData.id || `proj_${Date.now()}`;
      dbState.projects.unshift({ ...projectData, id: newId });
    }
    persistState();
    return projectData;
  },
  deleteProject: (id) => {
    dbState.projects = dbState.projects.filter((p) => p.id !== id);
    persistState();
    return true;
  },

  getServices: () => dbState.services,
  saveService: (serviceData) => {
    const existingIndex = dbState.services.findIndex((s) => s.id === serviceData.id);
    if (existingIndex >= 0) {
      dbState.services[existingIndex] = { ...dbState.services[existingIndex], ...serviceData };
    } else {
      const newId = serviceData.id || `serv_${Date.now()}`;
      dbState.services.push({ ...serviceData, id: newId });
    }
    persistState();
    return serviceData;
  },
  deleteService: (id) => {
    dbState.services = dbState.services.filter((s) => s.id !== id);
    persistState();
    return true;
  },

  getSkills: () => dbState.skills,
  saveSkill: (skillData) => {
    const existingIndex = dbState.skills.findIndex((s) => s.id === skillData.id);
    if (existingIndex >= 0) {
      dbState.skills[existingIndex] = { ...dbState.skills[existingIndex], ...skillData };
    } else {
      const newId = skillData.id || `skill_${Date.now()}`;
      dbState.skills.push({ ...skillData, id: newId });
    }
    persistState();
    return skillData;
  },
  deleteSkill: (id) => {
    dbState.skills = dbState.skills.filter((s) => s.id !== id);
    persistState();
    return true;
  },

  getTestimonials: () => dbState.testimonials,
  saveTestimonial: (testData) => {
    const existingIndex = dbState.testimonials.findIndex((t) => t.id === testData.id);
    if (existingIndex >= 0) {
      dbState.testimonials[existingIndex] = { ...dbState.testimonials[existingIndex], ...testData };
    } else {
      const newId = testData.id || `test_${Date.now()}`;
      dbState.testimonials.push({ ...testData, id: newId });
    }
    persistState();
    return testData;
  },
  deleteTestimonial: (id) => {
    dbState.testimonials = dbState.testimonials.filter((t) => t.id !== id);
    persistState();
    return true;
  },

  getEnquiries: () => dbState.enquiries,
  addEnquiry: (enqData) => {
    const newEnq = {
      ...enqData,
      id: `enq_${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    dbState.enquiries.unshift(newEnq);
    persistState();
    return newEnq;
  },
  updateEnquiryStatus: (id, status) => {
    const target = dbState.enquiries.find((e) => e.id === id);
    if (target) {
      target.status = status;
      persistState();
      return target;
    }
    return null;
  },
  deleteEnquiry: (id) => {
    dbState.enquiries = dbState.enquiries.filter((e) => e.id !== id);
    persistState();
    return true;
  },

  getSettings: () => dbState.settings,
  setSettings: (newSettings) => {
    dbState.settings = { ...dbState.settings, ...newSettings };
    persistState();
    return dbState.settings;
  },
};

