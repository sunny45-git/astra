import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  projectType: { type: String, default: 'General Enquiry' },
  message: { type: String, required: true },
  budget: { type: String, default: '' },
  timeline: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['new', 'read', 'completed', 'archived'], 
    default: 'new' 
  },
}, { timestamps: true });

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);

