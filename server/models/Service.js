import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, default: 'Specialized Solution' },
  shortDescription: { type: String, default: '' },
  detailedDescription: { type: String, default: '' },
  technologies: [{ type: String }],
  icon: { type: String, default: 'Cpu' },
  visible: { type: Boolean, default: true },
  order: { type: Number, default: 1 },
  deliverables: [{ type: String }],
  idealFor: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);

