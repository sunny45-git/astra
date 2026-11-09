import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  brandName: { type: String, default: 'ASTRA' },
  tagline: { type: String, default: 'Ideas Beyond Limits.' },
  eyebrow: { type: String, default: 'PREMIUM DIGITAL EXPERIENCES & WEB ARCHITECTURE' },
  description: { type: String, default: '' },
  ctaPrimaryText: { type: String, default: 'Explore My Work' },
  ctaPrimaryLink: { type: String, default: '#projects' },
  ctaSecondaryText: { type: String, default: "Let's Collaborate" },
  ctaSecondaryLink: { type: String, default: '#contact' },
  showParticles: { type: Boolean, default: true },
  show3DCore: { type: Boolean, default: true },
  availabilityText: { type: String, default: 'Available for Q1 / Q2 Projects' },
}, { timestamps: true });

export default mongoose.models.Hero || mongoose.model('Hero', HeroSchema);

