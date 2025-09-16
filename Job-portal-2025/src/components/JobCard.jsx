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
                <p>{job.company}</p>
                <span>{job.location}</span>
            </div>
            
            <div className="job-details">
                <p>{job.description}</p>
                <div className="job-meta">
                    <span>Salary: {job.salary}</span>
                    <span>Type: {job.type}</span>
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