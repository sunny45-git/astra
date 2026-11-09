import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: { type: String, default: 'ASTRA' },
  brandName: { type: String, default: 'ASTRA' },
  founderName: { type: String, default: 'Sunny Pendela' },
  founderTitle: { type: String, default: 'Founder & Principal Web Architect' },
  attribution: { type: String, default: 'Founded by Sunny Pendela' },
  displayName: { type: String, default: 'Sunny Pendela' },
  title: { type: String, default: 'Founder & Lead Architect' },
  subtitle: { type: String, default: 'Architecting high-performance 3D websites, bespoke digital platforms, and full-stack web applications.' },
  bio: { type: String, default: '' },
  education: { type: String, default: 'B.Tech in Computer Science & Engineering' },
  location: { type: String, default: 'Hyderabad, India / Available Globally' },
  avatar: { type: String, default: '/astra-avatar.png' },
  status: { type: String, default: 'Available for Q1 / Q2 Projects' },
  email: { type: String, default: 'contact@astra.dev' },
  phone: { type: String, default: '+91 98765 43210' },
  whatsapp: { type: String, default: '+91 98765 43210' },
  whatsappNumber: { type: String, default: '919876543210' },
  socials: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
  },
  stats: [{
    label: String,
    value: String,
  }],
}, { timestamps: true });

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
