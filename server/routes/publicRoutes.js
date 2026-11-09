import express from 'express';
import { db } from '../config/db.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// GET /api/public/data
// Fetches all dynamic content for the public ASTRA portfolio
router.get('/data', (req, res) => {
  try {
    const profile = db.getProfile();
    const hero = db.getHero();
    const allProjects = db.getProjects();
    const allServices = db.getServices();
    const allSkills = db.getSkills();
    const processSteps = db.getState().process;
    const whyChooseUs = db.getState().whyChooseUs;
    const allTestimonials = db.getTestimonials();
    const settings = db.getSettings();

    // Filter public items
    const publishedProjects = allProjects
      .filter((p) => p.published !== false)
      .sort((a, b) => (a.order || 99) - (b.order || 99));

    const visibleServices = allServices
      .filter((s) => s.visible !== false)
      .sort((a, b) => (a.order || 99) - (b.order || 99));

    const visibleTestimonials = allTestimonials
      .filter((t) => t.visible !== false);

    return res.json({
      success: true,
      data: {
        profile,
        hero,
        projects: publishedProjects,
        services: visibleServices,
        skills: allSkills,
        process: processSteps,
        whyChooseUs,
        testimonials: visibleTestimonials,
        settings,
      },
    });
  } catch (err) {
    console.error('Error fetching public portfolio data:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve portfolio data.',
    });
  }
});

// POST /api/public/contact
// Submits a client enquiry with rate limiting and anti-spam validation
router.post('/contact', contactLimiter, (req, res) => {
  try {
    const { fullName, email, organization, websiteType, budget, description, botField } = req.body;

    // Honeypot bot protection
    if (botField) {
      return res.status(200).json({
        success: true,
        message: 'Your enquiry has been received.',
      });
    }

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Full Name is required.',
      });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.',
      });
    }

    if (!description || description.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a project description of at least 10 characters.',
      });
    }

    const savedEnquiry = db.addEnquiry({
      fullName: fullName.trim(),
      email: email.trim(),
      organization: (organization || '').trim(),
      websiteType: (websiteType || 'General Enquiry').trim(),
      budget: (budget || 'Flexible').trim(),
      description: description.trim(),
    });

    return res.status(201).json({
      success: true,
      message: 'Your enquiry has been received successfully. Astra will review and contact you shortly.',
      enquiryId: savedEnquiry.id,
    });
  } catch (err) {
    console.error('Contact submission error:', err);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while submitting your enquiry.',
    });
  }
});

export default router;

