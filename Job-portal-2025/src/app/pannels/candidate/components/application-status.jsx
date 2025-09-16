// Route: /candidate/status

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadScript } from "../../../../globals/constants";
import { api } from "../../../../utils/api";
import CanPostedJobs from "./can-posted-jobs";

function CanStatusPage() {
	const navigate = useNavigate();
	const [applications, setApplications] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState('applications');

	useEffect(() => {
		loadScript("js/custom.js");
		fetchApplications();
	}, []);

	const fetchApplications = async () => {
		try {
			const response = await api.getCandidateApplications();
			if (response.success) {
				setApplications(response.applications || response.data || []);
			}
		} catch (error) {
			console.error('Error fetching applications:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="wt-admin-right-page-header clearfix">
				<h2>Job Applications</h2>
				<div className="twm-tabs-style-2" style={{marginTop: '20px'}}>
					<ul className="nav nav-tabs" role="tablist" style={{borderBottom: '2px solid #e9ecef'}}>
						<li className="nav-item">
							<button 
								className={`nav-link ${activeTab === 'applications' ? 'active' : ''}`}
								onClick={() => setActiveTab('applications')}
								style={{
									border: 'none',
									background: 'none',
									padding: '12px 24px',
									borderBottom: activeTab === 'applications' ? '3px solid #2a6310' : '3px solid transparent',
									color: activeTab === 'applications' ? '#2a6310' : '#666',
									fontWeight: activeTab === 'applications' ? '600' : '400',
									cursor: 'pointer'
								}}
							>
								My Applications
							</button>
						</li>
						<li className="nav-item">
							<button 
								className={`nav-link ${activeTab === 'jobs' ? 'active' : ''}`}
								onClick={() => setActiveTab('jobs')}
								style={{
									border: 'none',
									background: 'none',
									padding: '12px 24px',
									borderBottom: activeTab === 'jobs' ? '3px solid #2a6310' : '3px solid transparent',
									color: activeTab === 'jobs' ? '#2a6310' : '#666',
									fontWeight: activeTab === 'jobs' ? '600' : '400',
									cursor: 'pointer'
								}}
							>
								Posted Jobs
							</button>
						</li>
					</ul>
				</div>
			</div>
			
			<div className="tab-content">
				{activeTab === 'applications' && (
					<div className="twm-pro-view-chart-wrap">
						<div className="col-lg-12 col-md-12 mb-4">
							<div className="panel panel-default site-bg-white">
								<div className="panel-body wt-panel-body">
									<div className="twm-D_table p-a20 table-responsive">
										<table className="table table-bordered">
											<thead>
												<tr>
													<th>Date</th>
													<th>Company</th>
													<th>Position</th>
													<th>Round 1</th>
													<th>Round 2</th>
													<th>Round 3</th>
												</tr>
											</thead>

											<tbody>
												{loading ? (
													<tr>
														<td colSpan="6" className="text-center">Loading applications...</td>
													</tr>
												) : applications.length === 0 ? (
													<tr>
														<td colSpan="6" className="text-center">No applications found</td>
													</tr>
												) : (
													applications.map((app, index) => (
														<tr key={index}>
															<td>{new Date(app.createdAt || app.appliedAt).toLocaleDateString()}</td>
															<td>
																<div className="twm-DT-candidates-list">
																	<div className="twm-mid-content">
																		<a href="#" className="twm-job-title">
																			<h4>{app.employerId?.companyName || app.job?.company?.name || 'Company'}</h4>
																			<p className="twm-candidate-address">
																				<i className="feather-map-pin" /> {app.jobId?.location || app.job?.location || 'Location'}
																			</p>
																		</a>
																	</div>
																</div>
															</td>
															<td>{app.jobId?.title || app.job?.title || 'Position'}</td>
															<td>
																<div className="twm-jobs-category">
																	<span className="twm-bg-green">
																		Already Applied
																	</span>
																</div>
															</td>
															<td>
																<div className="twm-jobs-category">
																	<span className="twm-bg-golden">-</span>
																</div>
															</td>
															<td>
																<div className="twm-jobs-category">
																	<span className="twm-bg-golden">-</span>
																</div>
															</td>
														</tr>
													))
												)}

											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				
				{activeTab === 'jobs' && (
					<CanPostedJobs />
				)}
			</div>
		</>
	);
}

export default CanStatusPage;
