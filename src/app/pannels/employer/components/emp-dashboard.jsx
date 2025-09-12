// MODERN EMPLOYER DASHBOARD

import React, { useState, useEffect } from 'react';
import CountUp from "react-countup";
import "../../common/modern-dashboard.css";

function EmpDashboardPage() {
    const [stats, setStats] = useState({
        totalJobs: 8,
        activeJobs: 5,
        totalApplications: 142,
        shortlisted: 23
    });
    const [employer, setEmployer] = useState({ companyName: 'TechCorp Solutions' });
    const [jobStatus] = useState({
        active: 5,
        expired: 3,
        draft: 2
    });
    const [recentActivities] = useState([
        { id: 1, type: 'application', candidate: 'John Smith', position: 'Frontend Developer', time: '30 minutes ago', icon: 'fa-user-plus' },
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

            const response = await fetch('http://localhost:5000/api/employer/dashboard/stats', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                setStats(prev => ({ ...prev, ...data.stats }));
                setEmployer(data.employer);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
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
        <div className="twm-right-section-panel" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            {/* Welcome Section */}
            <div style={{ padding: '2rem', backgroundColor: 'white', marginBottom: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#2c3e50', marginBottom: '0.5rem', fontSize: '1.8rem', fontWeight: '600' }}>
                    Welcome back, {employer.companyName}! 🏢
                </h2>
                <p style={{ color: '#6c757d', margin: 0 }}>Here's an overview of your recruitment activities today.</p>
            </div>

            {/* Stats Cards */}
            <div className="row mb-4">
                <div className="col-lg-3 col-md-6 mb-3">
                    <div style={{ 
                        backgroundColor: 'white', 
                        padding: '1.5rem', 
                        borderRadius: '12px', 
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        borderLeft: '4px solid #007bff'
                    }}>
                        <div className="d-flex align-items-center">
                            <div style={{ 
                                backgroundColor: '#e3f2fd', 
                                padding: '12px', 
                                borderRadius: '50%', 
                                marginRight: '1rem'
                            }}>
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

                <div className="col-lg-3 col-md-6 mb-3">
                    <div style={{ 
                        backgroundColor: 'white', 
                        padding: '1.5rem', 
                        borderRadius: '12px', 
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        borderLeft: '4px solid #28a745'
                    }}>
                        <div className="d-flex align-items-center">
                            <div style={{ 
                                backgroundColor: '#e8f5e8', 
                                padding: '12px', 
                                borderRadius: '50%', 
                                marginRight: '1rem'
                            }}>
                                <i className="fa fa-paper-plane" style={{ color: '#28a745', fontSize: '1.2rem' }}></i>
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

                <div className="col-lg-3 col-md-6 mb-3">
                    <div style={{ 
                        backgroundColor: 'white', 
                        padding: '1.5rem', 
                        borderRadius: '12px', 
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        borderLeft: '4px solid #ffc107'
                    }}>
                        <div className="d-flex align-items-center">
                            <div style={{ 
                                backgroundColor: '#fff8e1', 
                                padding: '12px', 
                                borderRadius: '50%', 
                                marginRight: '1rem'
                            }}>
                                <i className="fa fa-star" style={{ color: '#ffc107', fontSize: '1.2rem' }}></i>
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

                <div className="col-lg-3 col-md-6 mb-3">
                    <div style={{ 
                        backgroundColor: 'white', 
                        padding: '1.5rem', 
                        borderRadius: '12px', 
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        borderLeft: '4px solid #ff6b35'
                    }}>
                        <div className="d-flex align-items-center">
                            <div style={{ 
                                backgroundColor: '#fff0eb', 
                                padding: '12px', 
                                borderRadius: '50%', 
                                marginRight: '1rem'
                            }}>
                                <i className="fa fa-check-circle" style={{ color: '#ff6b35', fontSize: '1.2rem' }}></i>
                            </div>
                            <div>
                                <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '2rem', fontWeight: '700' }}>
                                    <CountUp end={stats.activeJobs} duration={2} />
                                </h3>
                                <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>Active Jobs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {/* Job Posting Status Widget */}
                <div className="col-lg-6 mb-4">
                    <div style={{ 
                        backgroundColor: 'white', 
                        padding: '2rem', 
                        borderRadius: '12px', 
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        height: '100%'
                    }}>
                        <h4 style={{ color: '#2c3e50', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '600' }}>
                            Job Posting Status
                        </h4>
                        
                        <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span style={{ color: '#2c3e50', fontSize: '0.9rem', fontWeight: '500' }}>Active Jobs</span>
                                <span style={{ color: '#28a745', fontSize: '1.1rem', fontWeight: '600' }}>{jobStatus.active}</span>
                            </div>
                            <div style={{ backgroundColor: '#e9ecef', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ 
                                    backgroundColor: '#28a745', 
                                    height: '100%', 
                                    width: `${(jobStatus.active / (jobStatus.active + jobStatus.expired + jobStatus.draft)) * 100}%`,
                                    borderRadius: '4px'
                                }}></div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span style={{ color: '#2c3e50', fontSize: '0.9rem', fontWeight: '500' }}>Expired Jobs</span>
                                <span style={{ color: '#dc3545', fontSize: '1.1rem', fontWeight: '600' }}>{jobStatus.expired}</span>
                            </div>
                            <div style={{ backgroundColor: '#e9ecef', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ 
                                    backgroundColor: '#dc3545', 
                                    height: '100%', 
                                    width: `${(jobStatus.expired / (jobStatus.active + jobStatus.expired + jobStatus.draft)) * 100}%`,
                                    borderRadius: '4px'
                                }}></div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span style={{ color: '#2c3e50', fontSize: '0.9rem', fontWeight: '500' }}>Draft Jobs</span>
                                <span style={{ color: '#6c757d', fontSize: '1.1rem', fontWeight: '600' }}>{jobStatus.draft}</span>
                            </div>
                            <div style={{ backgroundColor: '#e9ecef', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ 
                                    backgroundColor: '#6c757d', 
                                    height: '100%', 
                                    width: `${(jobStatus.draft / (jobStatus.active + jobStatus.expired + jobStatus.draft)) * 100}%`,
                                    borderRadius: '4px'
                                }}></div>
                            </div>
                        </div>

                        <button 
                            className="btn w-100 mt-3" 
                            style={{ 
                                backgroundColor: '#ff6b35', 
                                color: 'white', 
                                border: 'none',
                                borderRadius: '8px',
                                padding: '0.75rem',
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}
                        >
                            Post New Job
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="col-lg-6 mb-4">
                    <div style={{ 
                        backgroundColor: 'white', 
                        padding: '2rem', 
                        borderRadius: '12px', 
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        height: '100%'
                    }}>
                        <h4 style={{ color: '#2c3e50', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '600' }}>
                            Recent Activity
                        </h4>
                        
                        <div>
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="d-flex align-items-center mb-3 pb-3" style={{ borderBottom: '1px solid #e9ecef' }}>
                                    <div style={{ 
                                        backgroundColor: `${getActivityColor(activity.type)}20`, 
                                        padding: '8px', 
                                        borderRadius: '50%', 
                                        marginRight: '1rem',
                                        minWidth: '40px',
                                        textAlign: 'center'
                                    }}>
                                        <i className={`fa ${activity.icon}`} style={{ color: getActivityColor(activity.type), fontSize: '0.9rem' }}></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <p style={{ margin: 0, color: '#2c3e50', fontSize: '0.9rem', fontWeight: '500' }}>
                                            {activity.type === 'application' && 'New Application Received'}
                                            {activity.type === 'shortlisted' && 'Candidate Shortlisted'}
                                            {activity.type === 'expiring' && 'Job Posting Expiring Soon'}
                                        </p>
                                        <p style={{ margin: 0, color: '#6c757d', fontSize: '0.8rem' }}>
                                            {activity.candidate ? `${activity.candidate} - ${activity.position}` : activity.position}
                                        </p>
                                        <small style={{ color: '#adb5bd' }}>{activity.time}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div style={{ 
                textAlign: 'center', 
                padding: '2rem', 
                color: '#6c757d', 
                fontSize: '0.9rem',
                borderTop: '1px solid #e9ecef',
                marginTop: '2rem'
            }}>
                © 2025 JobZZ · All rights reserved.
            </div>
        </div>
    );
}

export default EmpDashboardPage;