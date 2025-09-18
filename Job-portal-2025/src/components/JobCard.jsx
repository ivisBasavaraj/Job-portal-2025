import { useNavigate } from 'react-router-dom';
import { isAuthenticated, redirectToLogin } from '../utils/auth';

const JobCard = ({ job }) => {
    const navigate = useNavigate();

    const handleApplyClick = () => {
        if (isAuthenticated('candidate')) {
            // User is logged in as candidate, proceed with application
            navigate(`/job-detail/${job._id}`);
        } else {
            // User not logged in, redirect to login
            redirectToLogin(navigate, `/job-detail/${job._id}`);
        }
    };

    const handleViewDetails = () => {
        navigate(`/job-detail/${job._id}`);
    };

    return (
        <div className="job-card">
            <div className="job-header">
                <h3>{job.title}</h3>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px'}}>
                    {job.companyLogo && (
                        <img src={job.companyLogo} alt="Company Logo" style={{width: '24px', height: '24px', objectFit: 'cover', borderRadius: '4px'}} />
                    )}
                    <p style={{margin: 0}}>{job.companyName || job.employerId?.companyName || job.company}</p>
                </div>
                <span>{job.location}</span>
                <div className="posted-by-info" style={{fontSize: '12px', color: '#666', marginTop: '4px'}}>
                    Posted by: {(job.employerId?.employerType === 'consultant' || job.companyName) ? 'Consultancy' : 'Company'}
                </div>
            </div>
            
            <div className="job-details">
                <p>{job.description}</p>
                <div className="job-meta">
                    <span>Salary: {job.salary}</span>
                    <span>Type: {job.jobType || job.type}</span>
                    {job.category && <span>Category: {job.category}</span>}
                </div>
            </div>
            
            <div className="job-actions">
                <button onClick={handleViewDetails} className="btn-view">
                    View Details
                </button>
                <button onClick={handleApplyClick} className="btn-apply">
                    {isAuthenticated('candidate') ? 'Apply Now' : 'Login to Apply'}
                </button>
            </div>
        </div>
    );
};

export default JobCard;