import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  shortDescription: { type: String, default: '' },
  fullDescription: { type: String, default: '' },
  clientType: { type: String, default: '' },
  technologies: [{ type: String }],
  liveUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  order: { type: Number, default: 1 },
  image: { type: String, default: '' },
  accentColor: { type: String, default: '#00f5ff' },
  mockupTheme: { type: String, default: 'dark-navy' },
  stats: [{
    label: String,
    value: String,
  }],
  keyFeatures: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);

