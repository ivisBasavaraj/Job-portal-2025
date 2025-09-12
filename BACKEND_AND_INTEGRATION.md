# Backend and Frontend Integration Guide

## Overview

- **Frontend**: React (port 3000)
- **Backend**: Node.js/Express (port 5000)
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT (role-based: candidate, employer, admin)
- **Uploads**: Multer memory storage, stored as Base64 in DB
- **Security**: Helmet, CORS, Rate Limiting
- **Base API URL**: `http://localhost:5000/api`

---

## Environment and Setup

1. Backend setup
   - Create `tale-backend/.env`:
     ```env
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/jobportal
     JWT_SECRET=your_secret
     JWT_EXPIRE=7d
     ```
   - Run:
     ```bash
     cd tale-backend
     npm install
     npm run dev
     ```
2. Frontend setup
   - In project root:
     ```bash
     npm install
     npm start
     ```

---

## Server Bootstrapping

### File: `tale-backend/server.js`

- Security: Helmet (with CORP), CORS (origin: http://localhost:3000, credentials: true)
- Rate limiting: 1000 req/15 min per IP
- Parsers: JSON (10MB), URL-encoded
- Routes mounted under `/api/*`:
  - `/api/public`, `/api/candidate`, `/api/employer`, `/api/admin`, `/api/notifications`
- Healthcheck: `GET /health`
- Global error handler + 404 handler

---

## Database Connection

### File: `tale-backend/config/database.js`

- Connects with `mongoose.connect(process.env.MONGODB_URI)`
- Logs success; exits on failure

---

## Middleware

### Auth (role-based)

- File: `tale-backend/middlewares/auth.js`
- Validates `Authorization: Bearer <token>`
- Decodes JWT → loads user by role (`Candidate`, `Employer`, `Admin`)
- Enforces allowed roles via `auth(['admin'|'employer'|'candidate'])`
- Attaches `req.user`, `req.userRole`

### Error Handler

- File: `tale-backend/middlewares/errorHandler.js`
- Handles Mongoose validation, duplicate keys (11000), cast errors; default 500

### Validation Wrapper

- File: `tale-backend/middlewares/validation.js`
- Uses `express-validator` and returns 400 with error details when invalid

### Uploads (Multer → Base64)

- File: `tale-backend/middlewares/upload.js`
- Memory storage; limits 5MB
- Type restrictions:
  - `resume`: PDF/DOC
  - `document`: PDF/Image
  - others: Image only
- `fileToBase64(file)` returns `data:<mime>;base64,<data>` string

---

## Routes and Controllers

### Public Routes

- File: `tale-backend/routes/public.js`
- Controller: `tale-backend/controllers/publicController.js`

Endpoints:
- `GET /api/public/jobs`
  - Filters: `location`, `jobType` (string/array), `category`, `title`, `employmentType`, `skills`, `search`, `page`, `limit`, `employerId`
  - Only approved employers; includes employer profile data
- `GET /api/public/jobs/search` with `q`, `location`, `jobType`
- `GET /api/public/jobs/:id` → job + employer profile
- `GET /api/public/blogs`, `GET /api/public/blogs/:id`
- `POST /api/public/contact` with `{ name, email, phone?, subject?, message }`
- `GET /api/public/testimonials`, `/partners`, `/faqs`
- `GET /api/public/stats` → totals: jobs, employers, applications
- `GET /api/public/employers`, `GET /api/public/employers/:id`

Common success response:
```json
{ "success": true, ... }
```

### Candidate Routes

- File: `tale-backend/routes/candidate.js`
- Controller: `tale-backend/controllers/candidateController.js`
- Protected with: `auth(['candidate'])` (except auth and reset endpoints)

Auth:
- `POST /api/candidate/register` → `{ token, candidate }`
- `POST /api/candidate/login` → `{ token, candidate }`

Password (public):
- `POST /api/candidate/password/reset`
- `POST /api/candidate/password/confirm-reset`

Protected:
- `GET /api/candidate/profile`
- `PUT /api/candidate/profile` (JSON or multipart with `profilePicture`)
- `POST /api/candidate/upload-resume` (file: `resume`)
- `POST /api/candidate/upload-marksheet` (file: `marksheet`)
- `GET /api/candidate/dashboard`, `GET /api/candidate/dashboard/stats`
- Apply:
  - `POST /api/candidate/jobs/:jobId/apply` OR
  - `POST /api/candidate/applications` with `{ jobId, coverLetter? }`
- Applications:
  - `GET /api/candidate/applications`
  - `GET /api/candidate/applications/:applicationId/status`
- Messaging:
  - `POST /api/candidate/messages` with `{ receiverId, message }`
  - `GET /api/candidate/messages/:conversationId`
- Change password:
  - `PUT /api/candidate/password/change` with `{ currentPassword, newPassword }`

### Employer Routes

- File: `tale-backend/routes/employer.js`
- Controller: `tale-backend/controllers/employerController.js`, `employerPasswordController.js`
- Protected with: `auth(['employer'])` (except auth and reset)

Auth:
- `POST /api/employer/register` → `{ token, employer }`
- `POST /api/employer/login` → `{ token, employer }`

Password (public):
- `POST /api/employer/password/reset`
- `POST /api/employer/password/confirm-reset`

Protected:
- `GET /api/employer/profile`
- `PUT /api/employer/profile`
- Uploads:
  - `POST /api/employer/profile/logo` (file: `logo`)
  - `POST /api/employer/profile/cover` (file: `cover`)
  - `POST /api/employer/profile/document` (file: `document`, body: `{ fieldName }`)
- Jobs:
  - `GET /api/employer/jobs`
  - `POST /api/employer/jobs` (requires `req.user.isApproved === true`)
  - `PUT /api/employer/jobs/:jobId`
  - `DELETE /api/employer/jobs/:jobId`
- Applications:
  - `GET /api/employer/applications`
  - `GET /api/employer/applications/:applicationId`
  - `PUT /api/employer/applications/:applicationId/status` with `{ status, notes? }`
- Messaging:
  - `POST /api/employer/messages` with `{ receiverId, message }`
  - `GET /api/employer/messages/:conversationId`
- Dashboard:
  - `GET /api/employer/dashboard/stats`
- Subscription:
  - `POST /api/employer/subscription` with `{ plan, paymentData }`
  - `GET /api/employer/subscription`
  - `PUT /api/employer/subscription`

### Admin Routes

- File: `tale-backend/routes/admin.js`
- Controller: `tale-backend/controllers/adminController.js`
- Protected with: `auth(['admin'])`

Auth:
- `POST /api/admin/login` → `{ token, admin }`

Protected:
- Dashboard:
  - `GET /api/admin/dashboard/stats`
- Users:
  - `GET /api/admin/users?type=candidates|employers&page=&limit=`
  - `DELETE /api/admin/users/:userType/:userId`
  - `PUT /api/admin/users/:userType/:userId`
- Jobs:
  - `GET /api/admin/jobs?status=active|pending|closed&page=&limit=`
  - `DELETE /api/admin/jobs/:id`
  - `PUT /api/admin/jobs/:jobId/approve`
  - `PUT /api/admin/jobs/:jobId/reject`
- Employers:
  - `GET /api/admin/employers?status=&page=&limit=`
  - `GET /api/admin/employer-profile/:id`
  - `PUT /api/admin/employer-profile/:id`
  - `PUT /api/admin/employers/:id/status` with `{ status?, isApproved? }`
  - `GET /api/admin/download-document/:employerId/:documentType`
  - `DELETE /api/admin/employers/:id`
- Candidates:
  - `GET /api/admin/candidates?page=&limit=`
  - `GET /api/admin/registered-candidates?page=&limit=`
  - `DELETE /api/admin/candidates/:id`
- Content:
  - `POST /api/admin/content/:type` where `type` in `blog|testimonial|faq|partner`
  - `PUT /api/admin/content/:type/:contentId`
  - `DELETE /api/admin/content/:type/:contentId`
- Contacts:
  - `GET /api/admin/contacts`
  - `DELETE /api/admin/contacts/:contactId`
- Applications:
  - `GET /api/admin/applications`
- Site Settings:
  - `GET /api/admin/settings`
  - `PUT /api/admin/settings` (multipart: fields `{ logo, favicon }`)

### Notifications

- Routes: `tale-backend/routes/notifications.js`
- Controller: `tale-backend/controllers/notificationController.js`

Endpoints:
- `GET /api/notifications/:role` → list by role with pagination, includes `unreadCount`
- `PATCH /api/notifications/:id/read` → mark one as read
- `PATCH /api/notifications/:role/read-all` → mark all read for role
- `POST /api/notifications/test` → creates a test notification

Creation:
- `createNotification({ title, message, type, role, relatedId?, createdBy })` is used in:
  - Employer creates job → notify candidates
  - Employer updates profile → notify admin
  - Admin updates employer status → notify employer

---

## Authentication Model

- JWT payload: `{ id, role }`
- Header: `Authorization: Bearer <token>`
- Token: `jwt.sign({ id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRE })`
- LocalStorage keys:
  - `candidateToken`, `employerToken`, `adminToken`
  - `candidateUser`, `employerUser`, `adminUser`

---



---

## Frontend Integration

### API Module

- File: `src/utils/api.js`
- Base URL: `const API_BASE_URL = 'http://localhost:5000/api'`
- Helper: `getAuthHeaders(userType)` reads token and sets `Authorization`

Mappings (examples):
- Public:
  - `getJobs(params) → GET /public/jobs`
  - `getJobById(id) → GET /public/jobs/:id`
  - `getBlogs(params) → GET /public/blogs`
  - `submitContact(data) → POST /public/contact`
  - `getPublicStats() → GET /public/stats`
- Candidate:
  - `candidateRegister(data) → POST /candidate/register`
  - `candidateLogin(data) → POST /candidate/login`
  - `getCandidateProfile() → GET /candidate/profile`
  - `updateCandidateProfile(data) → PUT /candidate/profile` (JSON or FormData)
  - `getCandidateDashboard() → GET /candidate/dashboard`
  - `applyForJob(jobId, data)` → Prefer `POST /candidate/jobs/${jobId}/apply` or use `POST /candidate/applications` with `{ jobId }`
  - `getCandidateApplications() → GET /candidate/applications`
  - `uploadResume(formData) → POST /candidate/upload-resume`
- Employer:
  - `employerRegister(data) → POST /employer/register`
  - `employerLogin(data) → POST /employer/login`
  - `getEmployerProfile() → GET /employer/profile`
  - `updateEmployerProfile(data) → PUT /employer/profile`
  - `getEmployerDashboard() → GET /employer/dashboard/stats`
  - `postJob(jobData) → POST /employer/jobs`
  - `getEmployerJobs() → GET /employer/jobs`
  - `updateJob(jobId, jobData) → PUT /employer/jobs/:jobId`
  - `deleteJob(jobId) → DELETE /employer/jobs/:jobId`
  - `getJobApplications(jobId)` → Backend route missing; use `/employer/applications` and filter client-side or add route
- Admin:
  - `adminLogin(data) → POST /admin/login`
  - `getAdminStats() → GET /admin/dashboard/stats`
  - `getAdminUsers(params) → GET /admin/users`
  - `getAllCandidates(params) → GET /admin/candidates`
  - `getAllEmployers(params) → GET /admin/employers`
  - `getAllJobs(params) → GET /admin/jobs`
  - `deleteCandidate(id) → DELETE /admin/candidates/:id`
  - `updateEmployerStatus(id, status) → PUT /admin/employers/:id/status`
  - `deleteEmployer(id) → DELETE /admin/employers/:id`
  - `adminDeleteJob(jobId) → DELETE /admin/jobs/:jobId`
  - `getRegisteredCandidates(params) → GET /admin/registered-candidates`

### Auth Context

- File: `src/contexts/AuthContext.js`
- On login, calls respective login API, stores `<type>Token` and `<type>User`, sets `user` & `userType`
- On load, restores `user` from localStorage if a token exists
- Logout clears all tokens and users

---

## Response Shapes

- Success:
```json
{ "success": true, ... }
```
- Validation error:
```json
{ "success": false, "message": "Validation failed", "errors": [ { "msg": "...", "param": "email" } ] }
```
- Auth missing/invalid:
```json
{ "success": false, "message": "No token, authorization denied" }
```
- General server error:
```json
{ "success": false, "message": "Server Error" }
```

---

## Security & Limits

- Helmet with CORP for cross-origin images
- CORS restricted to `http://localhost:3000`
- Rate limiting: 1000 requests / 15 minutes / IP
- JSON body limit: 10MB

---

## Typical Flows

1. Candidate login
   - Frontend: `api.candidateLogin({ email, password })`
   - Saves `candidateToken`, `candidateUser`
   - Authenticated calls include `Authorization: Bearer <token>`

2. Employer posts a job
   - Requires `isApproved === true`
   - Frontend: `api.postJob(jobData)` → creates job and notifies candidates

3. Apply to a job
   - Frontend: `api.applyForJob(jobId, { coverLetter })`
   - Backend saves `Application`, increments job’s `applicationCount`

4. Upload resume/profile picture
   - `POST /candidate/upload-resume` or `PUT /candidate/profile` with `profilePicture` as `FormData`

---

## Gaps or Mismatches (Actionable)

- Frontend `applyForJob → /candidate/apply/:jobId` does not match backend `POST /candidate/jobs/:jobId/apply`.
  - Fix frontend to `POST /candidate/jobs/${jobId}/apply`, or use `POST /candidate/applications` with `{ jobId }`.
- Frontend `getJobApplications(jobId) → /employer/jobs/:jobId/applications` endpoint not present in backend.
  - Use `GET /employer/applications` and filter client-side, or add a backend route.

---

## Base URLs

- Healthcheck: `GET /health`
- Public: `/api/public/*`
- Candidate: `/api/candidate/*`
- Employer: `/api/employer/*`
- Admin: `/api/admin/*`
- Notifications: `/api/notifications/*`

---

## Notes

- This guide reflects current repository routes and controllers.
- If you want, we can align any mismatched frontend paths or add missing backend endpoints next.