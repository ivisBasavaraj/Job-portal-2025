import { NavLink } from "react-router-dom";
import { publicUser } from "../../../../globals/route-names";
import JobZImage from "../../../common/jobz-img";
import SectionRecordsFilter from "../../public-user/sections/common/section-records-filter";
import SectionPagination from "../../public-user/sections/common/section-pagination";
import { useEffect, useState } from "react";
import { loadScript } from "../../../../globals/constants";
import { api } from "../../../../utils/api";

function CanAppliedJobsPage() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const _filterConfig = {
        prefix: "Applied",
        type: "jobs",
        total: applications.length.toString(),
        showRange: false,
        showingUpto: ""
    }

    useEffect(()=>{
        loadScript("js/custom.js")
        fetchApplications();
    }, [])

    const fetchApplications = async () => {
        try {
            const response = await api.getCandidateApplications();
            if (response.success) {
                setApplications(response.data || []);
            }
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
			<>
				<div className="twm-right-section-panel candidate-save-job site-bg-gray">
					{/*Filter Short By*/}
					<SectionRecordsFilter _config={_filterConfig} />

					<div className="twm-jobs-list-wrap">
						{loading ? (
							<div className="text-center p-4">Loading applications...</div>
						) : applications.length === 0 ? (
							<div className="text-center p-4">No applications found</div>
						) : (
							<ul>
								{applications.map((app, index) => (
									<li key={index}>
										<div className="twm-jobs-list-style1 mb-5">
											<div className="twm-media">
												<JobZImage src="images/jobs-company/pic1.jpg" alt="#" />
											</div>
											<div className="twm-mid-content">
												<NavLink
													to={`/jobs/${app.job?._id}`}
													className="twm-job-title"
												>
													<h4>
														{app.job?.title || 'Job Title'}
														<span className="twm-job-post-duration">
															/ {new Date(app.appliedAt).toLocaleDateString()}
														</span>
													</h4>
												</NavLink>
												<p className="twm-candidate-address">
													<i className="feather-map-pin" /> {app.job?.location || 'Location'}
												</p>
												<p className="twm-job-websites site-text-primary">
													{app.job?.company?.name || 'Company Name'}
												</p>
											</div>
											<div className="twm-right-content">
												<div className="twm-jobs-category green">
													<span className={`twm-bg-${app.status === 'pending' ? 'golden' : app.status === 'accepted' ? 'green' : 'red'}`}>
														{app.status || 'Pending'}
													</span>
												</div>
												<div className="twm-jobs-amount">
													{app.job?.salary || 'Not specified'}
												</div>
											</div>
										</div>
									</li>
								))}
							</ul>
						)}
					</div>

					<SectionPagination />
				</div>
			</>
		);
}

export default CanAppliedJobsPage;