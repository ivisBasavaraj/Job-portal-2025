const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
  location: { type: String, required: true },
  salary: { type: String },
  jobType: { type: String, enum: ['full-time', 'part-time', 'contract', 'internship', 'internship-(paid)', 'internship-(unpaid)', 'work-from-home'], required: true },
  vacancies: { type: Number },
  applicationLimit: { type: Number },
  education: { type: String },
  backlogsAllowed: { type: Boolean, default: false },
  requiredSkills: [String],
  experienceLevel: { type: String, enum: ['freshers', 'minimum', 'both', 'entry', 'mid', 'senior', 'executive'] },
  minExperience: { type: Number, default: 0 },
  interviewRoundsCount: { type: Number },
  interviewRoundTypes: {
    technical: { type: Boolean, default: false },
    managerial: { type: Boolean, default: false },
    nonTechnical: { type: Boolean, default: false },
    final: { type: Boolean, default: false },
    hr: { type: Boolean, default: false }
  },
  offerLetterDate: { type: Date },
  transportation: {
    oneWay: { type: Boolean, default: false },
    twoWay: { type: Boolean, default: false },
    noCab: { type: Boolean, default: false }
  },
  status: { type: String, enum: ['active', 'closed', 'draft', 'pending'], default: 'pending' },
  applicationCount: { type: Number, default: 0 }
}, {
  timestamps: true
});

jobSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Job', jobSchema);