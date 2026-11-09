import express from 'express';
import { db } from '../config/db.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Apply auth middleware to all routes in this router
router.use(authenticateAdmin);

// ==========================================
// OVERVIEW STATS
// ==========================================
router.get('/stats', (req, res) => {
  const projects = db.getProjects();
  const services = db.getServices();
  const enquiries = db.getEnquiries();
  const testimonials = db.getTestimonials();

  const publishedProjects = projects.filter((p) => p.published !== false).length;
  const draftProjects = projects.filter((p) => p.published === false).length;

  const newEnquiries = enquiries.filter((e) => e.status === 'new').length;
  const readEnquiries = enquiries.filter((e) => e.status === 'read').length;
  const completedEnquiries = enquiries.filter((e) => e.status === 'completed').length;

  return res.json({
    success: true,
    stats: {
      totalProjects: projects.length,
      publishedProjects,
      draftProjects,
      totalServices: services.length,
      totalEnquiries: enquiries.length,
      newEnquiries,
      readEnquiries,
      completedEnquiries,
      totalTestimonials: testimonials.length,
    },
  });
});

// ==========================================
// MODULE A: PROFILE MANAGEMENT
// ==========================================
router.get('/profile', (req, res) => {
  res.json({ success: true, profile: db.getProfile() });
});

router.put('/profile', (req, res) => {
  const updated = db.setProfile(req.body);
  res.json({ success: true, message: 'Profile updated successfully.', profile: updated });
});

// ==========================================
// MODULE B: HERO MANAGEMENT
// ==========================================
router.get('/hero', (req, res) => {
  res.json({ success: true, hero: db.getHero() });
});

router.put('/hero', (req, res) => {
  const updated = db.setHero(req.body);
  res.json({ success: true, message: 'Hero section configuration updated.', hero: updated });
});

// ==========================================
// MODULE C: PROJECT MANAGEMENT
// ==========================================
router.get('/projects', (req, res) => {
  res.json({ success: true, projects: db.getProjects() });
});

router.post('/projects', (req, res) => {
  const newProject = db.saveProject(req.body);
  res.status(201).json({ success: true, message: 'Project created successfully.', project: newProject });
});

router.put('/projects/:id', (req, res) => {
  const updated = db.saveProject({ ...req.body, id: req.params.id });
  res.json({ success: true, message: 'Project updated successfully.', project: updated });
});

router.delete('/projects/:id', (req, res) => {
  db.deleteProject(req.params.id);
  res.json({ success: true, message: 'Project deleted successfully.' });
});

// ==========================================
// MODULE D: SERVICES MANAGEMENT
// ==========================================
router.get('/services', (req, res) => {
  res.json({ success: true, services: db.getServices() });
});

router.post('/services', (req, res) => {
  const newService = db.saveService(req.body);
  res.status(201).json({ success: true, message: 'Service created successfully.', service: newService });
});

router.put('/services/:id', (req, res) => {
  const updated = db.saveService({ ...req.body, id: req.params.id });
  res.json({ success: true, message: 'Service updated successfully.', service: updated });
});

router.delete('/services/:id', (req, res) => {
  db.deleteService(req.params.id);
  res.json({ success: true, message: 'Service deleted successfully.' });
});

// ==========================================
// MODULE E: SKILLS MANAGEMENT
// ==========================================
router.get('/skills', (req, res) => {
  res.json({ success: true, skills: db.getSkills() });
});

router.post('/skills', (req, res) => {
  const newSkill = db.saveSkill(req.body);
  res.status(201).json({ success: true, message: 'Skill created successfully.', skill: newSkill });
});

router.put('/skills/:id', (req, res) => {
  const updated = db.saveSkill({ ...req.body, id: req.params.id });
  res.json({ success: true, message: 'Skill updated successfully.', skill: updated });
});

router.delete('/skills/:id', (req, res) => {
  db.deleteSkill(req.params.id);
  res.json({ success: true, message: 'Skill deleted successfully.' });
});

// ==========================================
// MODULE F: TESTIMONIALS MANAGEMENT
// ==========================================
router.get('/testimonials', (req, res) => {
  res.json({ success: true, testimonials: db.getTestimonials() });
});

router.post('/testimonials', (req, res) => {
  const newTestimonial = db.saveTestimonial(req.body);
  res.status(201).json({ success: true, message: 'Testimonial added successfully.', testimonial: newTestimonial });
});

router.put('/testimonials/:id', (req, res) => {
  const updated = db.saveTestimonial({ ...req.body, id: req.params.id });
  res.json({ success: true, message: 'Testimonial updated successfully.', testimonial: updated });
});

router.delete('/testimonials/:id', (req, res) => {
  db.deleteTestimonial(req.params.id);
  res.json({ success: true, message: 'Testimonial deleted successfully.' });
});

// ==========================================
// MODULE G: CONTACT ENQUIRIES MANAGEMENT
// ==========================================
router.get('/enquiries', (req, res) => {
  res.json({ success: true, enquiries: db.getEnquiries() });
});

router.patch('/enquiries/:id/status', (req, res) => {
  const { status } = req.body;
  if (!['new', 'read', 'completed'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Status must be new, read, or completed.' });
  }
  const updated = db.updateEnquiryStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Enquiry not found.' });
  }
  res.json({ success: true, message: 'Enquiry status updated.', enquiry: updated });
});

router.delete('/enquiries/:id', (req, res) => {
  db.deleteEnquiry(req.params.id);
  res.json({ success: true, message: 'Enquiry deleted successfully.' });
});

// ==========================================
// MODULE H: WEBSITE SETTINGS
// ==========================================
router.get('/settings', (req, res) => {
  res.json({ success: true, settings: db.getSettings() });
});

router.put('/settings', (req, res) => {
  const updated = db.setSettings(req.body);
  res.json({ success: true, message: 'Website settings updated successfully.', settings: updated });
});

// ==========================================
// PROTECTED FILE/IMAGE UPLOAD
// ==========================================
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded.' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      message: 'Image uploaded successfully.',
      fileUrl,
      filename: req.file.filename,
    });
  } catch (err) {
    console.error('File upload error:', err);
    res.status(500).json({ success: false, message: 'Failed to process file upload.' });
  }
});

export default router;

