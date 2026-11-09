import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['frontend', 'backend', 'database', 'tools'], 
    default: 'frontend' 
  },
  proficiency: { type: Number, default: 90 },
  icon: { type: String, default: 'Code' },
  featured: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);

