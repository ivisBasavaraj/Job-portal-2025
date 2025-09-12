# Backend-Frontend Connection Documentation

## Architecture Overview

**Frontend**: React.js (Port 3000)  
**Backend**: Node.js/Express (Port 5000)  
**Database**: MongoDB  
**Authentication**: JWT Tokens

## Connection Flow

```
Frontend (React) ←→ API Layer ←→ Backend (Express) ←→ Database (MongoDB)
```

## API Configuration

### Base URL
```javascript
const API_BASE_URL = 'http://localhost:5000/api'
```

### CORS Setup
```javascript
// Backend: server.js
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

## Authentication System

### Token Storage
- **Candidate**: `candidateToken` + `candidateUser`
- **Employer**: `employerToken` + `employerUser`  
- **Admin**: `adminToken` + `adminUser`

### Auth Headers
```javascript
const getAuthHeaders = (userType) => {
  const token = localStorage.getItem(`${userType}Token`);
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
};
```

### JWT Middleware
```javascript
// Backend: middlewares/auth.js
const auth = (roles = []) => {
  return async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Role-based access control
  };
};
```

## API Endpoints

### Public Routes (`/api/public`)
- `GET /jobs` - Job listings
- `GET /jobs/:id` - Job details
- `GET /companies` - Company listings
- `POST /contact` - Contact form

### Candidate Routes (`/api/candidate`)
- `POST /register` - Registration
- `POST /login` - Authentication
- `GET /profile` - Profile data
- `PUT /profile` - Update profile
- `POST /apply/:jobId` - Job application

### Employer Routes (`/api/employer`)
- `POST /register` - Registration
- `POST /login` - Authentication
- `GET /dashboard/stats` - Dashboard data
- `POST /jobs` - Create job
- `GET /jobs` - Employer's jobs

### Admin Routes (`/api/admin`)
- `POST /login` - Admin login
- `GET /dashboard/stats` - Admin stats
- `GET /candidates` - All candidates
- `GET /employers` - All employers
- `DELETE /jobs/:id` - Delete job

## Frontend Integration

### API Service Layer
```javascript
// src/utils/api.js
export const api = {
  candidateLogin: (data) => 
    fetch(`${API_BASE_URL}/candidate/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
  
  getCandidateProfile: () =>
    fetch(`${API_BASE_URL}/candidate/profile`, {
      headers: getAuthHeaders('candidate')
    }).then(res => res.json())
};
```

### Auth Context
```javascript
// src/contexts/AuthContext.js
const login = async (credentials, type) => {
  const response = await api[`${type}Login`](credentials);
  if (response.success) {
    localStorage.setItem(`${type}Token`, response.token);
    localStorage.setItem(`${type}User`, JSON.stringify(response[type]));
    setUser(response[type]);
    setUserType(type);
  }
};
```

## Data Flow Examples

### User Login
1. Frontend form submission → `api.candidateLogin()`
2. Backend validates credentials → JWT token generated
3. Token stored in localStorage
4. Subsequent requests include token in headers

### Job Application
1. Frontend → `api.applyForJob(jobId, data)`
2. Backend auth middleware validates token
3. Application saved to database
4. Response sent back to frontend

### File Uploads
```javascript
// Frontend: FormData for file uploads
const formData = new FormData();
formData.append('resume', file);

// Backend: Multer middleware + Base64 storage
app.use('/upload', upload.single('resume'));
```

## Error Handling

### Frontend
```javascript
try {
  const response = await api.candidateLogin(data);
  if (!response.success) {
    setError(response.message);
  }
} catch (error) {
  setError('Network error occurred');
}
```

### Backend
```javascript
// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
};
```

## Security Features

- **Helmet**: Security headers
- **Rate Limiting**: 1000 requests per 15 minutes
- **CORS**: Restricted to localhost:3000
- **JWT**: Secure token-based authentication
- **Password Hashing**: bcryptjs
- **Input Validation**: express-validator

## Development Setup

### Start Backend
```bash
cd tale-backend
npm install
npm run dev  # Port 5000
```

### Start Frontend
```bash
npm install
npm start    # Port 3000
```

### Environment Variables
```env
# tale-backend/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=your_jwt_secret
```

## Key Integration Points

1. **Authentication Flow**: JWT tokens stored in localStorage
2. **API Communication**: Fetch API with proper headers
3. **Role-based Access**: Different routes for candidate/employer/admin
4. **File Handling**: Base64 encoding for database storage
5. **Error Management**: Consistent error responses across API
6. **State Management**: React Context for auth state