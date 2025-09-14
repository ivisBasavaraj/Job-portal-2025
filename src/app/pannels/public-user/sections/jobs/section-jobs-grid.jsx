import JobZImage from "../../../../common/jobz-img";
import { NavLink, useNavigate } from "react-router-dom";
import { publicUser } from "../../../../../globals/route-names";
import SectionPagination from "../common/section-pagination";
import { useState, useEffect } from "react";
import { isAuthenticated, redirectToLogin } from "../../../../../utils/auth";

function SectionJobsGrid({ filters }) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [appliedJobs, setAppliedJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchJobs();
        checkAppliedJobs();
    }, [filters]);

    const checkAppliedJobs = async () => {
        const token = localStorage.getItem('candidateToken');
        if (token) {
            try {
                const response = await fetch('http://localhost:5000/api/candidate/applications', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (data.success) {
                    const appliedJobIds = data.applications.map(app => app.jobId._id);
                    setAppliedJobs(appliedJobIds);
                }
            } catch (error) {
                console.error('Error checking applied jobs:', error);
            }
        }
    };

    const fetchJobs = async () => {
        try {
            const params = new URLSearchParams();
            if (filters?.keyword) params.append('search', filters.keyword);
            if (filters?.location) params.append('location', filters.location);
            if (filters?.jobTitle) params.append('title', filters.jobTitle);
            if (filters?.employmentType) params.append('employmentType', filters.employmentType);
            if (filters?.jobType?.length > 0) {
                filters.jobType.forEach(type => params.append('jobType', type));
            }
            if (filters?.skills?.length > 0) {
                filters.skills.forEach(skill => params.append('skills', skill));
            }
            
            const url = `http://localhost:5000/api/public/jobs?${params.toString()}`;
            console.log('Fetching jobs from:', url);
            const response = await fetch(url);
            const data = await response.json();
            console.log('Jobs API response:', data);
            console.log('Jobs count:', data.jobs?.length || 0);
            if (data.success) {
                setJobs(data.jobs || data.data || []);
            } else {
                console.error('API returned error:', data.message);
                setJobs([]);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    const handleApplyClick = (jobId) => {
        if (isAuthenticated('candidate')) {
            navigate(`/job-detail/${jobId}`);
        } else {
            redirectToLogin(navigate, `/job-detail/${jobId}`);
        }
    };



    if (loading) {
        return <div className="text-center p-5">Loading jobs...</div>;
    }

    return (
        <>
            <div className="row">
                {jobs.length > 0 ? jobs.map((job) => (
                    <div key={job._id} className="col-lg-6 col-md-12 m-b30">
                        <div className="twm-jobs-grid-style1">
                            <div className="twm-media">
                                {job.employerProfile?.logo ? (
                                    <img src={job.employerProfile.logo} alt="Company Logo" />
                                ) : (
                                    <JobZImage src="images/jobs-company/pic1.jpg" alt="#" />
                                )}
                            </div>

                            <div className="twm-jobs-category green">
                                <span className={`twm-bg-${job.status === 'active' ? 'green' : 'gray'}`}>
                                    {job.status === 'active' ? 'Active' : 'Closed'}
                                </span>
                            </div>

                            <div className="twm-mid-content">
                                <NavLink to={`${publicUser.jobs.DETAIL1}/${job._id}`} className="twm-job-title">
                                    <h4>{job.title}</h4>
                                </NavLink>
                                <div className="twm-job-address">
                                    <i className="feather-map-pin" />
                                    &nbsp;{job.location}
                                </div>
                            </div>

                            <div className="twm-right-content twm-job-right-group">
                                <div className="twm-salary-and-apply mb-2">
                                    <div className="twm-jobs-amount">
                                        {job.salary?.min && job.salary?.max ? 
                                            `₹${job.salary.min/1000}K - ${job.salary.max/1000}K` : 
                                            'Salary not specified'
                                        }
                                    </div>
                                    <span className="vacancy-text">Type: {job.jobType}</span>
                                    {job.requiredSkills && job.requiredSkills.length > 0 && (
                                        <div className="twm-job-skills mt-1">
                                            <small className="text-muted">Skills: {job.requiredSkills.slice(0, 3).join(', ')}{job.requiredSkills.length > 3 ? '...' : ''}</small>
                                        </div>
                                    )}
                                </div>

                                <div className="d-flex align-items-center justify-content-between">
                                    <h6 className="twm-job-address posted-by-company mb-0">
                                        Posted: {new Date(job.createdAt).toLocaleDateString()}
                                    </h6>

                                    <button
                                        onClick={() => handleApplyClick(job._id)}
                                        className={`btn btn-sm ${appliedJobs.includes(job._id) ? 'btn-secondary' : 'apply-now-button'}`}
                                        disabled={appliedJobs.includes(job._id)}
                                    >
                                        {appliedJobs.includes(job._id) ? 'Applied' : 'Apply Now'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-12 text-center p-5">
                        <h5>No jobs found</h5>
                        <p>Please check back later for new opportunities.</p>
                    </div>
                )}
            </div>
            <SectionPagination />
            

        </>
    );
}

export default SectionJobsGrid;