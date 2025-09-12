# Job Portal Backend Integration Guide

## Setup Instructions

### 1. Prerequisites
- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- Git

### 2. Backend Setup
1. Open terminal in project root
2. Run: `start-backend.bat` (Windows) or follow manual steps below:

#### Manual Backend Setup:
```bash
cd tale-backend
npm install
npm run create-admin
npm run add-sample-data
npm run dev
```

### 3. Frontend Setup
1. Open new terminal in project root
2. Run: `start-frontend.bat` (Windows) or:
```bash
npm install
npm start
```

## Backend Features Already Integrated

### Authentication System
- ✅ Candidate Registration/Login
- ✅ Employer Registration/Login  
- ✅ Admin Login
- ✅ JWT Token Management
- ✅ Protected Routes

### API Endpoints Available

#### Public APIs
- `GET /api/public/jobs` - Get all jobs
- `GET /api/public/jobs/:id` - Get job by ID
- `GET /api/public/companies` - Get companies
- `GET /api/public/blogs` - Get blogs
- `POST /api/public/contact` - Submit contact form
- `GET /api/public/stats` - Get public statistics

#### Candidate APIs (Protected)
- `POST /api/candidate/register` - Register candidate
- `POST /api/candidate/login` - Login candidate
- `GET /api/candidate/profile` - Get profile
- `PUT /api/candidate/profile` - Update profile
- `GET /api/candidate/dashboard` - Get dashboard data
- `POST /api/candidate/apply/:jobId` - Apply for job
- `GET /api/candidate/applications` - Get applications
- `POST /api/candidate/upload-resume` - Upload resume

#### Employer APIs (Protected)
- `POST /api/employer/register` - Register employer
- `POST /api/employer/login` - Login employer
- `GET /api/employer/profile` - Get profile
- `PUT /api/employer/profile` - Update profile
- `GET /api/employer/dashboard` - Get dashboard data
- `POST /api/employer/jobs` - Post new job
- `GET /api/employer/jobs` - Get employer jobs
- `PUT /api/employer/jobs/:id` - Update job
- `DELETE /api/employer/jobs/:id` - Delete job
- `GET /api/employer/jobs/:id/applications` - Get job applications

#### Admin APIs (Protected)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/dashboard/stats` - Get admin statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/candidates` - Get all candidates
- `GET /api/admin/employers` - Get all employers
- `GET /api/admin/jobs` - Get all jobs

## Database Models

### Candidate
- Personal Information
- Contact Details
- Skills & Experience
- Resume/CV
- Applications History

### Employer
- Company Information
- Contact Details
- Posted Jobs
- Company Profile

### Job
- Job Details
- Requirements
- Company Information
- Application Status
- Salary & Benefits

### Application
- Candidate Information
- Job Applied For
- Application Status
- Application Date

## Frontend Integration Status

### ✅ Completed Integrations
1. **Authentication System**
   - Login/Register forms connected
   - JWT token management
   - User state management with Context API
   - Protected route handling

2. **API Utility Functions**
   - Comprehensive API methods
   - Error handling
   - Token management

### 🔄 Components Ready for Backend Integration

#### Candidate Dashboard Components
- `can-dashboard.jsx` - Dashboard overview
- `can-profile.jsx` - Profile management
- `can-resume.jsx` - Resume management
- `can-applied-jobs.jsx` - Applied jobs list
- `can-saved-jobs.jsx` - Saved jobs

#### Employer Dashboard Components
- `emp-dashboard.jsx` - Dashboard overview
- `emp-post-job.jsx` - Job posting form
- `emp-posted-jobs.jsx` - Posted jobs management
- `emp-candidates.jsx` - Candidate management
- `emp-company-profile.jsx` - Company profile

#### Admin Dashboard Components
- `admin-dashboard.jsx` - Admin overview
- `admin-candidates.jsx` - Candidate management
- `admin-jobs.jsx` - Job management
- `adminEmployerDetails.jsx` - Employer details

#### Public Components
- Job listings and search
- Company listings
- Blog system
- Contact forms

## Usage Examples

### Using API in Components
```javascript
import { api } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

// In a component
const { user, userType } = useAuth();

// Get candidate dashboard data
const dashboardData = await api.getCandidateProfile();

// Post a new job (employer)
const jobData = await api.postJob({
  title: 'Software Developer',
  description: 'Job description...',
  // ... other fields
});

// Apply for a job (candidate)
const application = await api.applyForJob(jobId, {
  coverLetter: 'Cover letter text...'
});
```

### Authentication Usage
```javascript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, userType, login, logout, isAuthenticated } = useAuth();
  
  if (!isAuthenticated()) {
    return <LoginForm />;
  }
  
  return <Dashboard user={user} userType={userType} />;
}
```

## Next Steps for Full Integration

1. **Update Dashboard Components**
   - Connect dashboard components to fetch real data
   - Implement CRUD operations for jobs, profiles, etc.

2. **File Upload Integration**
   - Resume upload functionality
   - Company logo upload
   - Profile picture upload

3. **Real-time Features**
   - Job application notifications
   - Message system
   - Live chat functionality

4. **Search & Filtering**
   - Advanced job search
   - Candidate filtering
   - Location-based search

5. **Email Integration**
   - Welcome emails
   - Application confirmations
   - Password reset emails

## Environment Configuration

### Backend (.env file in tale-backend/)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tale_jobportal
JWT_SECRET=tale_jwt_secret_key_2024
JWT_EXPIRE=30d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## Testing the Integration

1. Start both backend and frontend servers
2. Register as a candidate or employer
3. Login and access dashboard
4. Test CRUD operations
5. Verify data persistence in MongoDB

## Troubleshooting

### Common Issues
1. **CORS Errors**: Backend already configured for CORS
2. **MongoDB Connection**: Ensure MongoDB is running
3. **Port Conflicts**: Backend runs on 5000, frontend on 3000
4. **Token Issues**: Check localStorage for tokens

### Debug Tips
- Check browser console for errors
- Monitor network tab for API calls
- Verify MongoDB data using MongoDB Compass
- Check backend logs for server errors