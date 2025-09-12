import JobZImage from "../../../../common/jobz-img";
import { NavLink } from "react-router-dom";
import { publicUser } from "../../../../../globals/route-names";
import SectionPagination from "../common/section-pagination";
import { useState, useEffect } from "react";

function SectionJobsList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/public/jobs');
            const data = await response.json();
            if (data.success) {
                setJobs(data.jobs);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center p-5">Loading jobs...</div>;
    }

    return (
        <>
            <div>
                <div className="twm-jobs-list-wrap">
                    <ul>
                        {jobs.length > 0 ? jobs.map((job) => (
                            <li key={job._id}>
                                <div className="twm-jobs-list-style1 mb-5">
                                    <div className="twm-media">
                                        <JobZImage src="images/jobs-company/pic1.jpg" alt="#" />
                                    </div>
                                    <div className="twm-mid-content">
                                        <NavLink to={`${publicUser.jobs.DETAIL1}/${job._id}`} className="twm-job-title">
                                            <h4>{job.title}<span className="twm-job-post-duration">/ {new Date(job.createdAt).toLocaleDateString()}</span></h4>
                                        </NavLink>
                                        <p className="twm-job-address">{job.location}</p>
                                        <span className="twm-job-websites site-text-primary">{job.jobType}</span>
                                    </div>
                                    <div className="twm-right-content">
                                        <div className="twm-jobs-category green">
                                            <span className={`twm-bg-${job.status === 'active' ? 'green' : 'gray'}`}>
                                                {job.status === 'active' ? 'Active' : 'Closed'}
                                            </span>
                                        </div>
                                        <div className="twm-jobs-amount">
                                            {job.salary?.min && job.salary?.max ? 
                                                `₹${job.salary.min} - ₹${job.salary.max}` : 
                                                'Salary not specified'
                                            }
                                        </div>
                                        <NavLink to={`${publicUser.jobs.DETAIL1}/${job._id}`} className="twm-jobs-browse site-text-primary">Browse Job</NavLink>
                                    </div>
                                </div>
                            </li>
                        )) : (
                            <li>
                                <div className="text-center p-5">
                                    <h5>No jobs found</h5>
                                    <p>Please check back later for new opportunities.</p>
                                </div>
                            </li>
                        )}
                        <li>
                            <div className="twm-jobs-list-style1 mb-5">
                                <div className="twm-media">
                                    <JobZImage src="images/jobs-company/pic2.jpg" alt="#" />
                                </div>
                                <div className="twm-mid-content">
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                        <h4>Sr. Rolling Stock Technician<span className="twm-job-post-duration">/ 15 days ago</span></h4>
                                    </NavLink>
                                    <p className="twm-job-address">1363-1385 Sunset Blvd Los Angeles, CA 90026, USA</p>
                                    <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a>
                                </div>
                                <div className="twm-right-content">
                                    <div className="twm-jobs-category green"><span className="twm-bg-brown">Intership</span></div>
                                    <div className="twm-jobs-amount">₹2500 <span>/ Month</span></div>
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Browse Job</NavLink>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="twm-jobs-list-style1 mb-5">
                                <div className="twm-media">
                                    <JobZImage src="images/jobs-company/pic3.jpg" alt="#" />
                                </div>
                                <div className="twm-mid-content">
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                        <h4 className="twm-job-title">IT Department Manager<span className="twm-job-post-duration"> / 6 Month ago</span></h4>
                                    </NavLink>
                                    <p className="twm-job-address">1363-1385 Sunset Blvd Los Angeles, CA 90026, USA</p>
                                    <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a>
                                </div>
                                <div className="twm-right-content">
                                    <div className="twm-jobs-category green"><span className="twm-bg-purple">Fulltime</span></div>
                                    <div className="twm-jobs-amount">₹2500 <span>/ Month</span></div>
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Browse Job</NavLink>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="twm-jobs-list-style1 mb-5">
                                <div className="twm-media">
                                    <JobZImage src="images/jobs-company/pic4.jpg" alt="#" />
                                </div>
                                <div className="twm-mid-content">
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                        <h4 className="twm-job-title">Art Production Specialist   <span className="twm-job-post-duration">/ 2 days ago</span></h4>
                                    </NavLink>
                                    <p className="twm-job-address">1363-1385 Sunset Blvd Los Angeles, CA 90026, USA</p>
                                    <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a>
                                </div>
                                <div className="twm-right-content">
                                    <div className="twm-jobs-category green"><span className="twm-bg-sky">Freelancer</span></div>
                                    <div className="twm-jobs-amount">₹1500 <span>/ Month</span></div>
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Browse Job</NavLink>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="twm-jobs-list-style1 mb-5">
                                <div className="twm-media">
                                    <JobZImage src="images/jobs-company/pic5.jpg" alt="#" />
                                </div>
                                <div className="twm-mid-content">
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                        <h4 className="twm-job-title">Recreation &amp; Fitness Worker   <span className="twm-job-post-duration">/ 1 days ago</span></h4>
                                    </NavLink>
                                    <p className="twm-job-address">1363-1385 Sunset Blvd Los Angeles, CA 90026, USA</p>
                                    <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a>
                                </div>
                                <div className="twm-right-content">
                                    <div className="twm-jobs-category green"><span className="twm-bg-golden">Temporary</span></div>
                                    <div className="twm-jobs-amount">₹800 <span>/ Month</span></div>
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Browse Job</NavLink>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="twm-jobs-list-style1 mb-5">
                                <div className="twm-media">
                                    <JobZImage src="images/jobs-company/pic1.jpg" alt="#" />
                                </div>
                                <div className="twm-mid-content">
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                        <h4>Senior Web Designer<span className="twm-job-post-duration">/ 1 days ago</span></h4>
                                    </NavLink>
                                    <p className="twm-job-address">1363-1385 Sunset Blvd Los Angeles, CA 90026, USA</p>
                                    <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a>
                                </div>
                                <div className="twm-right-content">
                                    <div className="twm-jobs-category green"><span className="twm-bg-green">New</span></div>
                                    <div className="twm-jobs-amount">₹1000 <span>/ Month</span></div>
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Browse Job</NavLink>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="twm-jobs-list-style1 mb-5">
                                <div className="twm-media">
                                    <JobZImage src="images/jobs-company/pic2.jpg" alt="#" />
                                </div>
                                <div className="twm-mid-content">
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                        <h4>Sr. Rolling Stock Technician<span className="twm-job-post-duration">/ 15 days ago</span></h4>
                                    </NavLink>
                                    <p className="twm-job-address">1363-1385 Sunset Blvd Los Angeles, CA 90026, USA</p>
                                    <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a>
                                </div>
                                <div className="twm-right-content">
                                    <div className="twm-jobs-category green"><span className="twm-bg-brown">Intership</span></div>
                                    <div className="twm-jobs-amount">₹1500 <span>/ Month</span></div>
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Browse Job</NavLink>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="twm-jobs-list-style1 mb-5">
                                <div className="twm-media">
                                    <JobZImage src="images/jobs-company/pic3.jpg" alt="#" />
                                </div>
                                <div className="twm-mid-content">
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                        <h4 className="twm-job-title">IT Department Manager<span className="twm-job-post-duration"> / 6 Month ago</span></h4>
                                    </NavLink>
                                    <p className="twm-job-address">1363-1385 Sunset Blvd Los Angeles, CA 90026, USA</p>
                                    <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a>
                                </div>
                                <div className="twm-right-content">
                                    <div className="twm-jobs-category green"><span className="twm-bg-purple">Fulltime</span></div>
                                    <div className="twm-jobs-amount">₹2500 <span>/ Month</span></div>
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Browse Job</NavLink>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="twm-jobs-list-style1 mb-5">
                                <div className="twm-media">
                                    <JobZImage src="images/jobs-company/pic4.jpg" alt="#" />
                                </div>
                                <div className="twm-mid-content">
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                        <h4 className="twm-job-title">Art Production Specialist   <span className="twm-job-post-duration">/ 2 days ago</span></h4>
                                    </NavLink>
                                    <p className="twm-job-address">1363-1385 Sunset Blvd Los Angeles, CA 90026, USA</p>
                                    <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a>
                                </div>
                                <div className="twm-right-content">
                                    <div className="twm-jobs-category green"><span className="twm-bg-sky">Freelancer</span></div>
                                    <div className="twm-jobs-amount">₹3000 <span>/ Month</span></div>
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Browse Job</NavLink>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="twm-jobs-list-style1 mb-5">
                                <div className="twm-media">
                                    <JobZImage src="images/jobs-company/pic1.jpg" alt="#" />
                                </div>
                                <div className="twm-mid-content">
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                        <h4>Senior Web Designer<span className="twm-job-post-duration">/ 1 days ago</span></h4>
                                    </NavLink>
                                    <p className="twm-job-address">1363-1385 Sunset Blvd Los Angeles, CA 90026, USA</p>
                                    <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a>
                                </div>
                                <div className="twm-right-content">
                                    <div className="twm-jobs-category green"><span className="twm-bg-green">New</span></div>
                                    <div className="twm-jobs-amount">₹2000 <span>/ Month</span></div>
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Browse Job</NavLink>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="twm-jobs-list-style1 mb-5">
                                <div className="twm-media">
                                    <JobZImage src="images/jobs-company/pic2.jpg" alt="#" />
                                </div>
                                <div className="twm-mid-content">
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                        <h4>Sr. Rolling Stock Technician<span className="twm-job-post-duration">/ 15 days ago</span></h4>
                                    </NavLink>
                                    <p className="twm-job-address">1363-1385 Sunset Blvd Los Angeles, CA 90026, USA</p>
                                    <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a>
                                </div>
                                <div className="twm-right-content">
                                    <div className="twm-jobs-category green"><span className="twm-bg-brown">Intership</span></div>
                                    <div className="twm-jobs-amount">₹2000 <span>/ Month</span></div>
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Browse Job</NavLink>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="twm-jobs-list-style1 mb-5">
                                <div className="twm-media">
                                    <JobZImage src="images/jobs-company/pic3.jpg" alt="#" />
                                </div>
                                <div className="twm-mid-content">
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                        <h4 className="twm-job-title">IT Department Manager<span className="twm-job-post-duration"> / 6 Month ago</span></h4>
                                    </NavLink>
                                    <p className="twm-job-address">1363-1385 Sunset Blvd Los Angeles, CA 90026, USA</p>
                                    <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a>
                                </div>
                                <div className="twm-right-content">
                                    <div className="twm-jobs-category green"><span className="twm-bg-purple">Fulltime</span></div>
                                    <div className="twm-jobs-amount">₹1800 <span>/ Month</span></div>
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Browse Job</NavLink>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="twm-jobs-list-style1 mb-5">
                                <div className="twm-media">
                                    <JobZImage src="images/jobs-company/pic4.jpg" alt="#" />
                                </div>
                                <div className="twm-mid-content">
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                        <h4 className="twm-job-title">Art Production Specialist   <span className="twm-job-post-duration">/ 2 days ago</span></h4>
                                    </NavLink>
                                    <p className="twm-job-address">1363-1385 Sunset Blvd Los Angeles, CA 90026, USA</p>
                                    <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a>
                                </div>
                                <div className="twm-right-content">
                                    <div className="twm-jobs-category green"><span className="twm-bg-sky">Freelancer</span></div>
                                    <div className="twm-jobs-amount">₹1000 <span>/ Month</span></div>
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Browse Job</NavLink>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="twm-jobs-list-style1 mb-5">
                                <div className="twm-media">
                                    <JobZImage src="images/jobs-company/pic5.jpg" alt="#" />
                                </div>
                                <div className="twm-mid-content">
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                        <h4 className="twm-job-title">Recreation &amp; Fitness Worker   <span className="twm-job-post-duration">/ 1 days ago</span></h4>
                                    </NavLink>
                                    <p className="twm-job-address">1363-1385 Sunset Blvd Los Angeles, CA 90026, USA</p>
                                    <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a>
                                </div>
                                <div className="twm-right-content">
                                    <div className="twm-jobs-category green"><span className="twm-bg-golden">Temporary</span></div>
                                    <div className="twm-jobs-amount">₹1000 <span>/ Month</span></div>
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Browse Job</NavLink>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="twm-jobs-list-style1 mb-5">
                                <div className="twm-media">
                                    <JobZImage src="images/jobs-company/pic1.jpg" alt="#" />
                                </div>
                                <div className="twm-mid-content">
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                        <h4>Senior Web Designer<span className="twm-job-post-duration">/ 1 days ago</span></h4>
                                    </NavLink>
                                    <p className="twm-job-address">1363-1385 Sunset Blvd Los Angeles, CA 90026, USA</p>
                                    <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a>
                                </div>
                                <div className="twm-right-content">
                                    <div className="twm-jobs-category green"><span className="twm-bg-green">New</span></div>
                                    <div className="twm-jobs-amount">₹1000 <span>/ Month</span></div>
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Browse Job</NavLink>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="twm-jobs-list-style1 mb-5">
                                <div className="twm-media">
                                    <JobZImage src="images/jobs-company/pic2.jpg" alt="#" />
                                </div>
                                <div className="twm-mid-content">
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                        <h4>Sr. Rolling Stock Technician<span className="twm-job-post-duration">/ 15 days ago</span></h4>
                                    </NavLink>
                                    <p className="twm-job-address">1363-1385 Sunset Blvd Los Angeles, CA 90026, USA</p>
                                    <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a>
                                </div>
                                <div className="twm-right-content">
                                    <div className="twm-jobs-category green"><span className="twm-bg-brown">Intership</span></div>
                                    <div className="twm-jobs-amount">₹1000 <span>/ Month</span></div>
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Browse Job</NavLink>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="twm-jobs-list-style1 mb-5">
                                <div className="twm-media">
                                    <JobZImage src="images/jobs-company/pic3.jpg" alt="#" />
                                </div>
                                <div className="twm-mid-content">
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                        <h4 className="twm-job-title">IT Department Manager<span className="twm-job-post-duration"> / 6 Month ago</span></h4>
                                    </NavLink>
                                    <p className="twm-job-address">1363-1385 Sunset Blvd Los Angeles, CA 90026, USA</p>
                                    <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a>
                                </div>
                                <div className="twm-right-content">
                                    <div className="twm-jobs-category green"><span className="twm-bg-purple">Fulltime</span></div>
                                    <div className="twm-jobs-amount">₹1000 <span>/ Month</span></div>
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Browse Job</NavLink>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="twm-jobs-list-style1 mb-5">
                                <div className="twm-media">
                                    <JobZImage src="images/jobs-company/pic4.jpg" alt="#" />
                                </div>
                                <div className="twm-mid-content">
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
                                        <h4 className="twm-job-title">Art Production Specialist   <span className="twm-job-post-duration">/ 2 days ago</span></h4>
                                    </NavLink>
                                    <p className="twm-job-address">1363-1385 Sunset Blvd Los Angeles, CA 90026, USA</p>
                                    <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a>
                                </div>
                                <div className="twm-right-content">
                                    <div className="twm-jobs-category green"><span className="twm-bg-sky">Freelancer</span></div>
                                    <div className="twm-jobs-amount">₹1000 <span>/ Month</span></div>
                                    <NavLink to={publicUser.jobs.DETAIL1} className="twm-jobs-browse site-text-primary">Browse Job</NavLink>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <SectionPagination />
            </div>

        </>
    )
}

export default SectionJobsList;