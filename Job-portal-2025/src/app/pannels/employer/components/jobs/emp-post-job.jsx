
import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { employer, empRoute, publicUser } from "../../../../../globals/route-names";

export default function EmpPostJob({ onNext }) {
	const { id } = useParams();
	const isEditMode = Boolean(id);
	const [formData, setFormData] = useState({
		jobTitle: "",
		jobLocation: "",
		jobType: "",
		netSalary: "",
		ctc: "",
		vacancies: "",
		applicationLimit: "",
		jobDescription: "",
		education: "", // dropdown
		backlogsAllowed: false,
		requiredSkills: [],
		skillInput: "",
		experienceLevel: "freshers", // 'freshers' | 'minimum'
		minExperience: "",
		interviewRoundsCount: "",
		interviewRoundTypes: {
			technical: false,
			managerial: false,
			nonTechnical: false,
			final: false,
			hr: false,
		},
		offerLetterDate: "",
		joiningDate: "",
		transportation: {
			oneWay: false,
			twoWay: false,
			noCab: false,
		},
		interviewMode: {
			faceToFace: false,
			phone: false,
			videoCall: false,
			documentVerification: false,
		},
	});

	/* Helpers */
	const update = (patch) => setFormData((s) => ({ ...s, ...patch }));

	useEffect(() => {
		if (isEditMode) {
			fetchJobData();
		}
	}, [id, isEditMode]);

	const fetchJobData = async () => {
		try {
			const token = localStorage.getItem('employerToken');
			const response = await fetch('http://localhost:5000/api/employer/jobs', {
				headers: { 'Authorization': `Bearer ${token}` }
			});
			const data = await response.json();
			if (data.success) {
				const job = data.jobs.find(j => j._id === id);
				if (job) {
					setFormData({
						jobTitle: job.title || '',
						jobLocation: job.location || '',
						jobType: job.jobType || '',
						ctc: job.salary || '',
						netSalary: '',
						vacancies: job.vacancies || '',
						applicationLimit: job.applicationLimit || '',
						jobDescription: job.description || '',
						education: job.education || '',
						backlogsAllowed: job.backlogsAllowed || false,
						requiredSkills: job.requiredSkills || [],
						experienceLevel: job.experienceLevel || 'freshers',
						minExperience: job.minExperience || '',
						interviewRoundsCount: job.interviewRoundsCount || '',
						interviewRoundTypes: job.interviewRoundTypes || {
							technical: false,
							managerial: false,
							nonTechnical: false,
							final: false,
							hr: false,
						},
						offerLetterDate: job.offerLetterDate ? job.offerLetterDate.split('T')[0] : '',
						transportation: job.transportation || {
							oneWay: false,
							twoWay: false,
							noCab: false,
						},
						skillInput: '',
						joiningDate: '',
						interviewMode: {
							faceToFace: false,
							phone: false,
							videoCall: false,
							documentVerification: false,
						}
					});
				}
			}
		} catch (error) {
			console.error('Error fetching job data:', error);
		}
	};

	/* Skills logic */
	const addSkill = () => {
		const v = formData.skillInput.trim();
		if (!v) return;
		if (formData.requiredSkills.includes(v)) {
			update({ skillInput: "" });
			return;
		}
		update({
			requiredSkills: [...formData.requiredSkills, v],
			skillInput: "",
		});
	};
	const removeSkill = (skill) =>
		update({
			requiredSkills: formData.requiredSkills.filter((s) => s !== skill),
		});

	/* Toggle nested checkbox groups */
	const toggleNested = (group, key) =>
		setFormData((s) => ({
			...s,
			[group]: { ...s[group], [key]: !s[group][key] },
		}));

	const submitNext = async () => {
		try {
			const token = localStorage.getItem('employerToken');
			if (!token) {
				alert('Please login first');
				return;
			}

			const jobData = {
				title: formData.jobTitle,
				location: formData.jobLocation,
				jobType: formData.jobType.toLowerCase().replace(/\s+/g, '-'),
				salary: formData.ctc || formData.netSalary,
				vacancies: parseInt(formData.vacancies) || 0,
				applicationLimit: parseInt(formData.applicationLimit) || 0,
				description: formData.jobDescription || 'Job description to be updated',
				requiredSkills: formData.requiredSkills,
				experienceLevel: formData.experienceLevel,
				minExperience: formData.minExperience ? parseInt(formData.minExperience) : 0,
				education: formData.education,
				backlogsAllowed: formData.backlogsAllowed,
				interviewRoundsCount: parseInt(formData.interviewRoundsCount) || 0,
				interviewRoundTypes: formData.interviewRoundTypes,
				offerLetterDate: formData.offerLetterDate || null,
				transportation: formData.transportation
			};

			const url = isEditMode 
				? `http://localhost:5000/api/employer/jobs/${id}`
				: 'http://localhost:5000/api/employer/jobs';
			
			const method = isEditMode ? 'PUT' : 'POST';

			const response = await fetch(url, {
				method: method,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify(jobData)
			});

			if (response.ok) {
				const data = await response.json();
				alert(isEditMode ? 'Job updated successfully!' : 'Job posted successfully!');
				window.location.href = '/employer/manage-jobs';
			} else {
				const error = await response.json();
				alert(error.message || `Failed to ${isEditMode ? 'update' : 'post'} job`);
			}
		} catch (error) {
			console.error('Error posting job:', error);
			alert('Failed to post job. Please try again.');
		}
	};

	/* Inline style objects */
	const page = {
		padding: 20,
		maxWidth: 1100,
		margin: "10px auto",
		fontFamily: "Inter, Arial, sans-serif",
	};
	const card = {
		background: "#fff",
		padding: 20,
		borderRadius: 8,
		boxShadow: "0 0 0 1px rgba(15,23,42,0.03)",
	};
	const heading = {
		margin: 0,
		marginBottom: 6,
		fontSize: 18,
		color: "#111827",
	};
	const sub = { color: "#6b7280", marginBottom: 12, fontSize: 13 };
	const progressWrap = {
		display: "flex",
		alignItems: "center",
		gap: 12,
		marginBottom: 18,
	};
	const progressBar = {
		flex: 1,
		height: 8,
		background: "#f3f4f6",
		borderRadius: 6,
		position: "relative",
		overflow: "hidden",
	};
	const progressFill = {
		position: "absolute",
		left: 0,
		top: 0,
		bottom: 0,
		width: "33%",
		background: "#0f172a",
	};
	const stepCircle = (active) => ({
		width: 28,
		height: 28,
		borderRadius: "50%",
		background: active ? "#0f172a" : "#fff",
		color: active ? "#fff" : "#6b7280",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		border: active ? "none" : "1px solid #e5e7eb",
		fontSize: 13,
		fontWeight: 600,
	});

	const grid = {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gap: 16,
		alignItems: "start",
	};
	const fullRow = { gridColumn: "1 / -1" };
	const label = {
		display: "block",
		fontSize: 13,
		color: "#374151",
		marginBottom: 6,
	};
	const input = {
		width: "100%",
		padding: "10px 12px",
		borderRadius: 8,
		border: "1px solid #e6eef6",
		background: "#f6fbff",
		outline: "none",
		fontSize: 14,
		boxSizing: "border-box",
	};
	const smallInput = { ...input, width: 180 };
	const plusBtn = {
		marginLeft: 8,
		width: 38,
		height: 38,
		borderRadius: 8,
		border: "none",
		background: "#0f172a",
		color: "#fff",
		cursor: "pointer",
		fontSize: 20,
		lineHeight: 1,
	};
	const chip = {
		padding: "6px 10px",
		background: "#eef2ff",
		borderRadius: 999,
		display: "inline-flex",
		gap: 8,
		alignItems: "center",
		fontSize: 13,
	};
	const chipX = {
		marginLeft: 6,
		cursor: "pointer",
		color: "#ef4444",
		fontWeight: 700,
	};

	return (
		<div style={page}>
			{/* Card */}
			<div style={card}>
				<h3 style={{ marginTop: 0, marginBottom: 14, fontSize: 16 }}>
					{isEditMode ? 'Edit Job Information' : 'Job Information'}
				</h3>

				<div style={grid}>
					{/* Row 1 */}
					<div>
						<label style={label}>Job Title / Designation *</label>
						<input
							style={input}
							placeholder="e.g., Senior Software Engineer"
							value={formData.jobTitle}
							onChange={(e) => update({ jobTitle: e.target.value })}
						/>
					</div>

					<div>
						<label style={label}>Job Type *</label>
						<select
							style={{ ...input, appearance: "none", backgroundImage: "none" }}
							value={formData.jobType}
							onChange={(e) => update({ jobType: e.target.value })}
						>
							<option value="" selected disabled>Select Job Type</option>
							<option>Full-Time</option>
							<option>Part-Time</option>
							<option>Internship (Paid)</option>
							<option>Internship (Unpaid)</option>
							<option>Work From Home</option>
							<option>Contract</option>
						</select>
					</div>

					{/* Row 2 */}
					<div>
						<label style={label}>Job Location *</label>
						<input
							style={input}
							placeholder="e.g., Bangalore, Mumbai, Remote"
							value={formData.jobLocation}
							onChange={(e) => update({ jobLocation: e.target.value })}
						/>
					</div>

					<div>
						<label style={label}>CTC (Annual)</label>
						<input
							style={input}
							placeholder="e.g., 8 L.P.A"
							value={formData.ctc}
							onChange={(e) => update({ ctc: e.target.value })}
						/>
					</div>

					{/* Row 3 */}
					<div>
						<label style={label}>Net Salary (Monthly)</label>
						<input
							style={input}
							placeholder="e.g., ₹50,000"
							value={formData.netSalary}
							onChange={(e) => update({ netSalary: e.target.value })}
						/>
					</div>

					<div>
						<label style={label}>Number of Vacancies *</label>
						<input
							style={input}
							type="number"
							placeholder="e.g., 5"
							value={formData.vacancies}
							onChange={(e) => update({ vacancies: e.target.value })}
						/>
					</div>

					<div>
						<label style={label}>Application Limit *</label>
						<input
							style={input}
							type="number"
							placeholder="e.g., 100"
							value={formData.applicationLimit}
							onChange={(e) => update({ applicationLimit: e.target.value })}
						/>
					</div>

					{/* Row 4 */}
					<div>
						<label style={label}>Are Backlogs Allowed?</label>
						<select
							style={{ ...input, appearance: "none" }}
							value={formData.backlogsAllowed ? "Yes" : "No"}
							onChange={(e) =>
								update({ backlogsAllowed: e.target.value === "Yes" })
							}
						>
							<option value="No">No</option>
							<option value="Yes">Yes</option>
						</select>
					</div>

					<div>
						<label style={label}>Required Educational Background *</label>
						<select
							style={{ ...input, appearance: "none" }}
							value={formData.education}
							onChange={(e) => update({ education: e.target.value })}
						>
							<option value="" selected disabled>
								Select Education Level
							</option>
							<option value="Any">Any</option>
							<option value="B.Tech">B.Tech</option>
							<option value="M.Tech">M.Tech</option>
							<option value="B.Sc">B.Sc</option>
							<option value="M.Sc">M.Sc</option>
							<option value="MBA">MBA</option>
						</select>
					</div>

					{/* Skills (full width) */}
					<div style={fullRow}>
						<label style={label}>Required Skills</label>
						<div style={{ display: "flex", alignItems: "center" }}>
							<input
								style={{ ...input, marginBottom: 0 }}
								placeholder="Add a skill (e.g., React, Java, Python)"
								value={formData.skillInput}
								onChange={(e) => update({ skillInput: e.target.value })}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										addSkill();
									}
								}}
							/>
							<button
								type="button"
								onClick={addSkill}
								style={plusBtn}
								aria-label="Add skill"
								title="Add skill"
							>
								+
							</button>
						</div>

						{/* chips */}
						<div
							style={{
								marginTop: 10,
								display: "flex",
								gap: 8,
								flexWrap: "wrap",
							}}
						>
							{formData.requiredSkills.map((s, i) => (
								<div key={i} style={chip}>
									<span>{s}</span>
									<span style={chipX} onClick={() => removeSkill(s)}>
										×
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Experience & Rounds */}
					<div>
						<label style={label}>Experience Level</label>
						<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
							<label style={{ fontSize: 14, color: "#374151" }}>
								<input
									type="radio"
									name="experience"
									checked={formData.experienceLevel === "freshers"}
									onChange={() =>
										update({ experienceLevel: "freshers", minExperience: "" })
									}
								/>{" "}
								Fresher
							</label>

							<label style={{ fontSize: 14, color: "#374151" }}>
								<input
									type="radio"
									name="experience"
									checked={formData.experienceLevel === "minimum"}
									onChange={() => update({ experienceLevel: "minimum" })}
								/>{" "}
								Experienced
							</label>

							<label style={{ fontSize: 14, color: "#374151" }}>
								<input
									type="radio"
									name="both"
									checked={formData.experienceLevel === "both"}
									onChange={() =>
										update({ experienceLevel: "both", minExperience: "" })
									}
								/>{" "}
								Both
							</label>

							{formData.experienceLevel === "minimum" && (
								<input
									style={{ ...smallInput, marginLeft: 8 }}
									type="number"
									placeholder="Years"
									value={formData.minExperience}
									onChange={(e) => update({ minExperience: e.target.value })}
								/>
							)}
						</div>
					</div>

					<div>
						<label style={label}>Number of Interview Rounds *</label>
						<input
							style={input}
							type="number"
							placeholder="e.g., 3"
							value={formData.interviewRoundsCount}
							onChange={(e) => update({ interviewRoundsCount: e.target.value })}
						/>
					</div>

					{/* Interview Round Types - full row */}
					<div style={fullRow}>
						<label style={label}>Interview Round Types</label>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(2, 1fr)",
								gap: 8,
							}}
						>
							<label style={{ display: "flex", alignItems: "center", gap: 8 }}>
								<input
									type="checkbox"
									checked={formData.interviewRoundTypes.technical}
									onChange={() =>
										toggleNested("interviewRoundTypes", "technical")
									}
								/>
								Technical
							</label>

							<label style={{ display: "flex", alignItems: "center", gap: 8 }}>
								<input
									type="checkbox"
									checked={formData.interviewRoundTypes.nonTechnical}
									onChange={() =>
										toggleNested("interviewRoundTypes", "nonTechnical")
									}
								/>
								Non-Technical
							</label>

							<label style={{ display: "flex", alignItems: "center", gap: 8 }}>
								<input
									type="checkbox"
									checked={formData.interviewRoundTypes.managerial}
									onChange={() =>
										toggleNested("interviewRoundTypes", "managerial")
									}
								/>
								Managerial Round
							</label>

							<label style={{ display: "flex", alignItems: "center", gap: 8 }}>
								<input
									type="checkbox"
									checked={formData.interviewRoundTypes.final}
									onChange={() => toggleNested("interviewRoundTypes", "final")}
								/>
								Final Round
							</label>

							<label style={{ display: "flex", alignItems: "center", gap: 8 }}>
								<input
									type="checkbox"
									checked={formData.interviewRoundTypes.hr}
									onChange={() => toggleNested("interviewRoundTypes", "hr")}
								/>
								HR Round
							</label>
						</div>
					</div>

					{/* Dates */}
					<div>
						<label style={label}>Offer Letter Release Date *</label>
						<input
							style={input}
							type="date"
							value={formData.offerLetterDate}
							onChange={(e) => update({ offerLetterDate: e.target.value })}
							placeholder="dd/mm/yyyy"
						/>
					</div>
					
					{/* Job Description */}
					<div style={fullRow}>
						<label style={label}>Job Description *</label>
						<textarea 
							style={{...input, minHeight: '100px'}} 
							value={formData.jobDescription}
							onChange={(e) => update({ jobDescription: e.target.value })}
							placeholder="Enter detailed job description..."
						/>
					</div>

					{/* Candidate Transportation & Interview Facility (full row) */}
					<div style={fullRow}>
						<h4 style={{ margin: "12px 0", fontSize: 15 }}>
							Candidate Transportation Options
						</h4>

						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr 1fr",
								gap: 16,
							}}
						>
							<div>
								<label style={{ display: "block" }}>
									<input
										type="checkbox"
										checked={formData.transportation.oneWay}
										onChange={() => toggleNested("transportation", "oneWay")}
									/>{" "}
									One-way Cab
								</label>

								<label style={{ display: "block" }}>
									<input
										type="checkbox"
										checked={formData.transportation.twoWay}
										onChange={() => toggleNested("transportation", "twoWay")}
									/>{" "}
									Two-way Cab
								</label>

								<label style={{ display: "block" }}>
									<input
										type="checkbox"
										checked={formData.transportation.noCab}
										onChange={() => toggleNested("transportation", "noCab")}
									/>{" "}
									No Cab
								</label>
							</div>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", justifyContent: "space-between", marginTop: 22 }}>
					<NavLink to={empRoute(employer.MANAGE_JOBS)}>
						<button
						style={{
							background: "#0f172a",
							color: "#fff",
							border: "none",
							padding: "10px 18px",
							borderRadius: 8,
							cursor: "pointer",
							}}
						>
							Back
						</button>
					</NavLink>
					
					<button
						onClick={submitNext}
						style={{
							background: "#0f172a",
							color: "#fff",
							border: "none",
							padding: "10px 18px",
							borderRadius: 8,
							cursor: "pointer",
						}}
					>
						{isEditMode ? 'Update Job' : 'Next'}
					</button>
				</div>
			</div>
		</div>
	);
}

