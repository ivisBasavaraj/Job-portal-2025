import React, { useState, useEffect } from 'react';
import CountUp from "react-countup";

function EmpDashboardPage() {
    const [stats, setStats] = useState({
        totalJobs: 0,
        activeJobs: 0,
        totalApplications: 0,
        shortlisted: 0
    });
    const [employer, setEmployer] = useState({ companyName: 'Loading...', logo: null });
    const [recentActivities] = useState([
        { id: 1, type: 'application', candidate: 'John Smith', position: 'Frontend Developer', time: '30 minutes ago', icon: 'fa-paper-plane' },
        { id: 2, type: 'shortlisted', candidate: 'Sarah Johnson', position: 'React Developer', time: '2 hours ago', icon: 'fa-star' },
        { id: 3, type: 'expiring', position: 'Full Stack Developer', time: 'Expires in 2 days', icon: 'fa-clock' }
    ]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('employerToken');
            if (!token) {
                console.log('No employer token found');
                return;
            }

            const [statsResponse, profileResponse] = await Promise.all([
                fetch('http://localhost:5000/api/employer/dashboard/stats', {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch('http://localhost:5000/api/employer/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);
            
            const statsData = await statsResponse.json();
            const profileData = await profileResponse.json();
            
            if (statsResponse.ok && statsData.success) {
                setStats({
                    totalJobs: statsData.stats.totalJobs || 0,
                    activeJobs: statsData.stats.activeJobs || 0,
                    totalApplications: statsData.stats.totalApplications || 0,
                    shortlisted: statsData.stats.shortlisted || 0
                });
            }
            
            if (profileResponse.ok && profileData.success) {
                setEmployer({ 
                    companyName: profileData.profile.companyName || 'Company', 
                    logo: profileData.profile.logo 
                });
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'application': return 'fa-paper-plane';
            case 'shortlisted': return 'fa-star';
            case 'expiring': return 'fa-clock';
            default: return 'fa-info-circle';
        }
    };

    const getActivityColor = (type) => {
        switch (type) {
            case 'application': return '#007bff';
            case 'shortlisted': return '#28a745';
            case 'expiring': return '#ffc107';
            default: return '#6c757d';
        }
    };

    return (
        <div className="twm-right-section-panel" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '2rem' }}>
            {/* Header Section */}
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ color: '#2c3e50', marginBottom: '0.5rem', fontSize: '1.8rem', fontWeight: '600' }}>
                        Welcome back! 👋
                    </h2>
                    <p style={{ color: '#6c757d', margin: 0 }}>Here's an overview of your recruitment activities today.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={employer.logo || 'images/user-avtar/pic4.jpg'} alt="Company Logo" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                        <h4 style={{ margin: 0, color: '#2c3e50', fontSize: '1.1rem' }}>{employer.companyName}</h4>
                        <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>Employer</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="row mb-4">
                <div className="col-lg-4 col-md-6 mb-3">
                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderLeft: '4px solid #007bff' }}>
                        <div className="d-flex align-items-center">
                            <div style={{ backgroundColor: '#e3f2fd', padding: '12px', borderRadius: '50%', marginRight: '1rem' }}>
                                <i className="fa fa-briefcase" style={{ color: '#007bff', fontSize: '1.2rem' }}></i>
                            </div>
                            <div>
                                <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '2rem', fontWeight: '700' }}>
                                    <CountUp end={stats.totalJobs} duration={2} />
                                </h3>
                                <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>Jobs Posted</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-3">
                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderLeft: '4px solid #ffc107' }}>
                        <div className="d-flex align-items-center">
                            <div style={{ backgroundColor: '#fff8e1', padding: '12px', borderRadius: '50%', marginRight: '1rem' }}>
                                <i className="fa fa-paper-plane" style={{ color: '#ffc107', fontSize: '1.2rem' }}></i>
                            </div>
                            <div>
                                <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '2rem', fontWeight: '700' }}>
                                    <CountUp end={stats.totalApplications} duration={2} />
                                </h3>
                                <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>Applications Received</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-3">
                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderLeft: '4px solid #28a745' }}>
                        <div className="d-flex align-items-center">
                            <div style={{ backgroundColor: '#e8f5e8', padding: '12px', borderRadius: '50%', marginRight: '1rem' }}>
                                <i className="fa fa-star" style={{ color: '#28a745', fontSize: '1.2rem' }}></i>
                            </div>
                            <div>
                                <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '2rem', fontWeight: '700' }}>
                                    <CountUp end={stats.shortlisted} duration={2} />
                                </h3>
                                <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>Shortlisted Candidates</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {/* Job Posting Status Widget */}
                <div className="col-lg-6 mb-4">
                    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', height: '100%' }}>
                        <h4 style={{ color: '#2c3e50', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '600' }}>
                            Job Posting Status
                        </h4>
                        
                        <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span style={{ color: '#2c3e50', fontSize: '0.9rem', fontWeight: '500' }}>Active Jobs</span>
                                <span style={{ color: '#28a745', fontSize: '1.1rem', fontWeight: '600' }}>{stats.activeJobs}</span>
                            </div>
                            <div style={{ backgroundColor: '#e9ecef', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ backgroundColor: '#28a745', height: '100%', width: `${stats.totalJobs > 0 ? (stats.activeJobs / stats.totalJobs) * 100 : 0}%`, borderRadius: '4px' }}></div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span style={{ color: '#2c3e50', fontSize: '0.9rem', fontWeight: '500' }}>Expired Jobs</span>
                                <span style={{ color: '#dc3545', fontSize: '1.1rem', fontWeight: '600' }}>{stats.totalJobs - stats.activeJobs}</span>
                            </div>
                            <div style={{ backgroundColor: '#e9ecef', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ backgroundColor: '#dc3545', height: '100%', width: `${stats.totalJobs > 0 ? ((stats.totalJobs - stats.activeJobs) / stats.totalJobs) * 100 : 0}%`, borderRadius: '4px' }}></div>
                            </div>
                        </div>

                        <button className="btn w-100 mt-3" style={{ backgroundColor: '#FF6B00', color: 'white', border: 'none', borderRadius: '8px', padding: '0.75rem', fontSize: '0.9rem', fontWeight: '500' }} onClick={() => window.location.href = '/employer/post-job'}>
                            <i className="fa fa-plus" style={{ marginRight: '0.5rem' }}></i>
                            Post New Job
                        </button>
                    </div>
                </div>

                {/* Recent Activity Feed */}
                <div className="col-lg-6 mb-4">
                    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', height: '100%' }}>
                        <h4 style={{ color: '#2c3e50', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '600' }}>
                            Recent Activity
                        </h4>
                        
                        <div>
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="d-flex align-items-center mb-3 pb-3" style={{ borderBottom: '1px solid #e9ecef' }}>
                                    <div style={{ backgroundColor: `${getActivityColor(activity.type)}20`, padding: '8px', borderRadius: '50%', marginRight: '1rem', minWidth: '40px', textAlign: 'center' }}>
                                        <i className={`fa ${getActivityIcon(activity.type)}`} style={{ color: getActivityColor(activity.type), fontSize: '0.9rem' }}></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <p style={{ margin: 0, color: '#2c3e50', fontSize: '0.9rem', fontWeight: '500' }}>
                                            {activity.type === 'application' && '📨 New Application Received'}
                                            {activity.type === 'shortlisted' && '⭐ Candidate Shortlisted'}
                                            {activity.type === 'expiring' && '⏳ Job Posting Expiring Soon'}
                                        </p>
                                        <p style={{ margin: 0, color: '#6c757d', fontSize: '0.8rem' }}>
                                            {activity.candidate ? `${activity.candidate} - ${activity.position}` : activity.position}
                                        </p>
                                        <small style={{ color: '#adb5bd' }}>{activity.time}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <button className="btn w-100 mt-3" style={{ backgroundColor: 'transparent', color: '#FF6B00', border: '1px solid #FF6B00', borderRadius: '8px', padding: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>
                            View All Activity
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmpDashboardPage;