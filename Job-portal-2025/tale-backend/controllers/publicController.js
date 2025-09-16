const Job = require('../models/Job');
const Blog = require('../models/Blog');
const Contact = require('../models/Contact');
const Testimonial = require('../models/Testimonial');
const Partner = require('../models/Partner');
const FAQ = require('../models/FAQ');

// Job Controllers
exports.getJobs = async (req, res) => {
  try {
    const { location, jobType, category, search, title, employerId, employmentType, skills, page = 1, limit = 10 } = req.query;
    
    let query = { status: 'active' };
    
    if (employerId) query.employerId = employerId;
    if (title) query.title = new RegExp(title, 'i');
    if (location) query.location = new RegExp(location, 'i');
    if (jobType) {
      if (Array.isArray(jobType)) {
        query.jobType = { $in: jobType };
      } else {
        query.jobType = jobType;
      }
    }
    if (category) query.category = category;
    if (employmentType) query.employmentType = employmentType;
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { requiredSkills: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    if (skills) {
      const skillsArray = Array.isArray(skills) ? skills : [skills];
      query.requiredSkills = { $in: skillsArray.map(skill => new RegExp(skill, 'i')) };
    }

    const jobs = await Job.find(query)
      .populate({
        path: 'employerId',
        select: 'companyName status isApproved',
        match: { status: 'active', isApproved: true }
      })
      .sort({ createdAt: -1 });
    
    const approvedJobs = jobs.filter(job => job.employerId); 
    
    const EmployerProfile = require('../models/EmployerProfile');
    const jobsWithProfiles = await Promise.all(
      approvedJobs.map(async (job) => {
        const employerProfile = await EmployerProfile.findOne({ employerId: job.employerId._id });
        return {
          ...job.toObject(),
          employerProfile: employerProfile
        };
      })
    );
    
    res.json({
      success: true,
      jobs: jobsWithProfiles,
      total: jobsWithProfiles.length
    });
  } catch (error) {
    console.error('Error in getJobs:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('employerId', 'companyName email phone');
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Get employer profile for logo and cover image
    const EmployerProfile = require('../models/EmployerProfile');
    const employerProfile = await EmployerProfile.findOne({ employerId: job.employerId._id });
    
    // Add profile data to job object
    const jobWithProfile = {
      ...job.toObject(),
      employerProfile: employerProfile
    };

    res.json({ success: true, job: jobWithProfile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchJobs = async (req, res) => {
  try {
    const { q, location, jobType } = req.query;
    
    let query = { status: 'active' };
    
    if (q) {
      query.$or = [
        { title: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
        { skills: { $in: [new RegExp(q, 'i')] } }
      ];
    }
    
    if (location) query.location = new RegExp(location, 'i');
    if (jobType) query.jobType = jobType;

    const jobs = await Job.find(query)
      .populate({
        path: 'employerId',
        select: 'companyName status isApproved',
        match: { status: 'active', isApproved: true }
      })
      .sort({ createdAt: -1 });

    // Filter out jobs where employer is not approved
    const filteredJobs = jobs.filter(job => job.employerId);

    res.json({ success: true, jobs: filteredJobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Blog Controllers
exports.getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    
    let query = { isPublished: true };
    if (category) query.category = category;
    
    const blogs = await Blog.find(query)
      .populate('author', 'name')
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findOne({ 
      $or: [{ _id: req.params.id }, { slug: req.params.id }],
      isPublished: true 
    }).populate('author', 'name');
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    blog.views += 1;
    await blog.save();

    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Contact Controller
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    const contact = await Contact.create({
      name, email, phone, subject, message
    });

    res.status(201).json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      contact 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Content Controllers
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });
    res.json({ success: true, testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPartners = async (req, res) => {
  try {
    const partners = await Partner.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });
    res.json({ success: true, partners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFAQs = async (req, res) => {
  try {
    const { category } = req.query;
    let query = { isActive: true };
    if (category) query.category = category;
    
    const faqs = await FAQ.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Public stats for homepage (no auth)
exports.getPublicStats = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments({ status: { $in: ['active', 'pending', 'closed', 'draft'] } });
    const totalEmployers = await require('../models/Employer').countDocuments();
    const totalApplications = await require('../models/Application').countDocuments();

    res.json({
      success: true,
      stats: {
        totalJobs,
        totalEmployers,
        totalApplications,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getEmployerProfile = async (req, res) => {
  try {
    const EmployerProfile = require('../models/EmployerProfile');
    const Employer = require('../models/Employer');
    
    let profile = await EmployerProfile.findOne({ employerId: req.params.id })
      .populate('employerId', 'name email phone companyName');
    
    // If no profile exists, create basic profile from employer data
    if (!profile) {
      const employer = await Employer.findById(req.params.id);
      if (!employer) {
        return res.status(404).json({ success: false, message: 'Employer not found' });
      }
      
      profile = {
        employerId: employer,
        companyName: employer.companyName,
        email: employer.email,
        phone: employer.phone,
        description: 'No company description available.'
      };
    }

    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getEmployers = async (req, res) => {
  try {
    const Employer = require('../models/Employer');
    const employers = await Employer.find({ status: 'active', isApproved: true }).select('-password');
    
    res.json({ success: true, employers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};