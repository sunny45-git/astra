import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  siteTitle: { type: String, default: 'ASTRA — Founded by Sunny Pendela | Premium Digital Experiences' },
  metaDescription: { type: String, default: 'ASTRA — Founded by Sunny Pendela. Premium 3D freelance web developer portfolio and bespoke full-stack digital solutions provider.' },
  keywords: { type: String, default: 'ASTRA, Sunny Pendela, 3D Web Developer, React, Three.js, Portfolio, Full-Stack' },
  logoText: { type: String, default: 'ASTRA' },
  footerTagline: { type: String, default: 'Ideas Beyond Limits. Founded by Sunny Pendela.' },
  enableSoundEffects: { type: Boolean, default: false },
  enable3DScene: { type: Boolean, default: true },
  contactEmail: { type: String, default: 'contact@astra.dev' },
  whatsappDirect: { type: String, default: '919876543210' },
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);

