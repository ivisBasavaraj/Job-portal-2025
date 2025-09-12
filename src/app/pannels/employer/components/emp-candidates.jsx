
import React, { useEffect, useState } from "react";
import JobZImage from "../../../common/jobz-img";
import { loadScript } from "../../../../globals/constants";
import { useNavigate } from "react-router-dom";

function EmpCandidatesPage() {
	const navigate = useNavigate();
	const [applications, setApplications] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadScript("js/custom.js");
		fetchApplications();
	}, []);

	const fetchApplications = async () => {
		try {
			const token = localStorage.getItem('employerToken');
			if (!token) return;

			const response = await fetch('http://localhost:5000/api/employer/applications', {
				headers: { 'Authorization': `Bearer ${token}` }
			});
			
			if (response.ok) {
				const data = await response.json();
				setApplications(data.applications);
			}
		} catch (error) {
			console.error('Error fetching applications:', error);
		} finally {
			setLoading(false);
		}
	};

	const getStatusBadge = (status) => {
		switch (status) {
			case 'pending': return 'twm-bg-yellow';
			case 'shortlisted': return 'twm-bg-purple';
			case 'interviewed': return 'twm-bg-orange';
			case 'hired': return 'twm-bg-green';
			case 'rejected': return 'twm-bg-red';
			default: return 'twm-bg-light-blue';
		}
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		});
	};

	return (
		<>
			<div className="wt-admin-right-page-header clearfix">
				<h2>Applicants Details</h2>
			</div>

			<div className="panel panel-default site-bg-white p-3">
				<div className="panel-heading wt-panel-heading mb-3">
					<h4 className="panel-tittle">
						<i className="far fa-list-alt" /> Job Applications
					</h4>

					<p className="text-muted">Review and manage candidate applications</p>
				</div>

				<div className="panel-body wt-panel-body">
					<div className="mb-3 d-flex justify-content-between align-items-center">
						<input
							type="text"
							className="form-control w-25"
							placeholder="Search Applicants..."
						/>
						<div className="dropdown">
							<button
								className="btn btn-outline-secondary dropdown-toggle"
								type="button"
								data-bs-toggle="dropdown"
							>
								Application Status
							</button>

							<ul className="dropdown-menu">
								<li>
									<a className="dropdown-item" href="#">
										Under Review
									</a>
								</li>

								<li>
									<a className="dropdown-item" href="#">
										Shortlisted
									</a>
								</li>

								<li>
									<a className="dropdown-item" href="#">
										Interview
									</a>
								</li>

								<li>
									<a className="dropdown-item" href="#">
										Pending
									</a>
								</li>
							</ul>
						</div>
					</div>

					{loading ? (
						<div className="text-center py-4">
							<div className="spinner-border" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
					) : (
						<div className="row">
							{applications.length === 0 ? (
								<div className="col-12 text-center py-4">
									<p className="text-muted">No applications received yet.</p>
								</div>
							) : (
								applications.map((application) => (
									<div className="col-lg-6 col-12" key={application._id}>
										<div className="d-flex justify-content-between align-items-center p-3 border rounded mb-3 shadow-sm">
											<div className="d-flex align-items-center gap-3">
												<div
													className="twm-media-pic rounded-circle overflow-hidden"
													style={{ width: "50px", height: "50px" }}
												>
													{application.candidateId?.profilePicture ? (
														<img
															src={application.candidateId.profilePicture}
															alt={application.candidateId?.name || 'Candidate'}
															style={{ width: "50px", height: "50px", objectFit: "cover" }}
														/>
													) : (
														<JobZImage
															src="images/candidates/pic1.jpg"
															alt={application.candidateId?.name || 'Candidate'}
														/>
													)}
												</div>

												<div>
													<h5 className="mb-1">{application.candidateId?.name || 'Unknown'}</h5>
													<p className="mb-0 text-muted">{application.candidateId?.email || 'No email'}</p>
													<small className="text-muted">
														Applied for {application.jobId?.title || 'Unknown Job'}
													</small> <br/>

													<small className="text-muted">
														Submitted {formatDate(application.createdAt)}
													</small> <br/>

													<span className={`badge ${getStatusBadge(application.status)} text-capitalize`}>
														{application.status}
													</span>
												</div>
											</div>

											<div className="d-flex align-items-center gap-3">
												<button
													className="btn btn-outline-primary btn-sm"
													onClick={() => navigate(`/employer/emp-candidate-review/${application._id}`)}
												>
													<i className="fa fa-eye me-1" /> View Details
												</button>
											</div>
										</div>
									</div>
								))
							)}
						</div>
					)}
					
				</div>
			</div>
		</>
	);
}

export default EmpCandidatesPage;
