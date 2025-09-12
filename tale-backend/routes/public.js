const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const publicController = require('../controllers/publicController');
const handleValidationErrors = require('../middlewares/validation');

// Job Routes
router.get('/jobs', publicController.getJobs);
router.get('/jobs/search', publicController.searchJobs);
router.get('/jobs/:id', publicController.getJobById);

// Blog Routes
router.get('/blogs', publicController.getBlogs);
router.get('/blogs/:id', publicController.getBlogById);

// Contact Route
router.post('/contact', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').notEmpty().withMessage('Message is required')
], handleValidationErrors, publicController.submitContactForm);

// Content Routes
router.get('/testimonials', publicController.getTestimonials);
router.get('/partners', publicController.getPartners);
router.get('/faqs', publicController.getFAQs);

// Public Stats
router.get('/stats', publicController.getPublicStats);

// Employer Profile
router.get('/employers/:id', publicController.getEmployerProfile);
router.get('/employers', publicController.getEmployers);

module.exports = router;