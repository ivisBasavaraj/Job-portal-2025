const mongoose = require('mongoose');

const candidateProfileSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  dateOfBirth: { type: Date },
  location: { type: String },
  bio: { type: String },
  resume: { type: String }, // Base64 encoded document
  profilePicture: { type: String }, // Base64 encoded image
  resumeHeadline: { type: String },
  profileSummary: { type: String },
  gender: { type: String },
  fatherName: { type: String },
  motherName: { type: String },
  residentialAddress: { type: String },
  permanentAddress: { type: String },
  correspondenceAddress: { type: String },
  education: [{
    degreeName: String,
    collegeName: String,
    passYear: String,
    percentage: String,
    marksheet: String // Base64 encoded document
  }],
  experience: [{
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String,
    current: { type: Boolean, default: false }
  }],
  skills: [String],
  expectedSalary: { type: Number },
  jobPreferences: {
    jobType: { type: String, enum: ['full-time', 'part-time', 'contract', 'internship'] },
    preferredLocations: [String],
    remoteWork: { type: Boolean, default: false }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CandidateProfile', candidateProfileSchema);