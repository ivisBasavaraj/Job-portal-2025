const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
  status: { 
    type: String, 
    enum: ['pending', 'shortlisted', 'interviewed', 'hired', 'rejected'], 
    default: 'pending' 
  },
  coverLetter: { type: String },
  resume: { type: String },
  notes: { type: String },
  appliedAt: { type: Date, default: Date.now },
  statusHistory: [{
    status: String,
    changedAt: { type: Date, default: Date.now },
    changedBy: { type: mongoose.Schema.Types.ObjectId, refPath: 'statusHistory.changedByModel' },
    changedByModel: { type: String, enum: ['Employer', 'Admin'] },
    notes: String
  }]
}, {
  timestamps: true
});

applicationSchema.index({ candidateId: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);