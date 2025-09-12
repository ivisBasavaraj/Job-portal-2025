
import JobZImage from "../../../common/jobz-img";
import { NavLink, useLocation } from "react-router-dom";
import { loadScript, setMenuActive } from "../../../../globals/constants";
import { employer, empRoute, publicUser } from "../../../../globals/route-names";
import { useEffect, useState } from "react";
import "../../common/modern-dashboard.css";

function EmpSidebarSection(props) {
    const currentpath = useLocation().pathname;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        loadScript("js/custom.js");
        loadScript("js/emp-sidebar.js");
    });

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <button 
                className="mobile-menu-toggle d-md-none" 
                onClick={toggleMobileMenu}
                style={{ display: 'block' }}
            >
                <i className="fa fa-bars"></i>
            </button>
            
            <nav id="sidebar-admin-wraper" className={`${props.sidebarActive ? "" : "active"} ${isMobileMenuOpen ? "active" : ""}`}>
                <div className="page-logo">
                    <NavLink to={publicUser.INITIAL}><JobZImage id="skin_page_logo" src="images/logo-dark.png" alt="" /></NavLink>
                </div>

                <div className="admin-nav scrollbar-macosx">
                    <ul>
                        <li className={setMenuActive(currentpath, empRoute(employer.DASHBOARD))}>
                            <NavLink to={empRoute(employer.DASHBOARD)}>
                                <i className="fa fa-home" style={{ color: '#ff6b35' }} />
                                <span className="admin-nav-text">Dashboard</span>
                            </NavLink>
                        </li>
                        <li className={setMenuActive(currentpath, empRoute(employer.MANAGE_JOBS))}>
                            <NavLink to={empRoute(employer.MANAGE_JOBS)}>
                                <i className="fa fa-briefcase" style={{ color: '#ff6b35' }} />
                                <span className="admin-nav-text">Job Postings</span>
                            </NavLink>
                        </li>
                        <li className={setMenuActive(currentpath, empRoute(employer.CANDIDATES))}>
                            <NavLink to={empRoute(employer.CANDIDATES)}>
                                <i className="fa fa-users" style={{ color: '#ff6b35' }} />
                                <span className="admin-nav-text">Applications Received</span>
                            </NavLink>
                        </li>
                        <li className={setMenuActive(currentpath, empRoute(employer.PROFILE))}>
                            <NavLink to={empRoute(employer.PROFILE)}>
                                <i className="fa fa-building" style={{ color: '#ff6b35' }} />
                                <span className="admin-nav-text">Company Profile</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="#">
                                <i className="fa fa-user-cog" style={{ color: '#ff6b35' }} />
                                <span className="admin-nav-text">Manage Team</span>
                            </NavLink>
                        </li>
                        <li>
                            <a href="#" data-bs-toggle="modal" data-bs-target="#logout-dash-profile">
                                <i className="fa fa-sign-out-alt" style={{ color: '#dc3545' }} />
                                <span className="admin-nav-text">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default EmpSidebarSection;