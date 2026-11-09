import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientRole: { type: String, default: '' },
  clientOrganization: { type: String, default: '' },
  clientAvatar: { type: String, default: '' },
  content: { type: String, required: true },
  rating: { type: Number, default: 5 },
  visible: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);

