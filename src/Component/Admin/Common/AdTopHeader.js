import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../../css/admin.css'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function AdTopHeader({ setCollapse, collapsed, authData }) {
    const nagivate = useNavigate();
    const [localAuthData, setLocalAuthData] = useState({});
    const handleLogout = () => {
        localStorage.setItem(process.env.REACT_APP_STORAGE_KEY, JSON.stringify({}));
        nagivate("/admin/login", { replace: true });
    }
    const toggleCollapsed = (e) => {
        e.preventDefault();
        setCollapse(!collapsed);
    }

    useEffect(() => {
        var storeItem = localStorage.getItem(process.env.REACT_APP_STORAGE_KEY);
        if (storeItem === undefined || storeItem === null || storeItem==="{}") {
            nagivate("/admin/login", { replace: true });
        }
        else{
            setLocalAuthData(JSON.parse(storeItem));
        }
    }, [])

    return (
        <>
            <nav className="navbar navbar-expand navbar-light navbar-bg">
                <a className="sidebar-toggle js-sidebar-toggle" onClick={e => toggleCollapsed(e)}>
                    <i className="hamburger align-self-center"></i>
                </a>

                <div className="navbar-collapse collapse">
                    <ul className="navbar-nav navbar-align">
                        <li className="nav-item dropdown" style={{ listStyle: "none" }}>
                            <a className="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-bs-toggle="dropdown">
                                <LazyLoadImage effect='blur' src="assets/img/avatars/avatar.jpg" className="avatar img-fluid rounded me-1" alt="Charles Hall" /> <span className="text-dark">{(authData?.userResponse?.firstName??localAuthData?.userResponse?.firstName) + " " + (authData?.userResponse?.lastName??localAuthData?.userResponse?.lastName)}</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                                <a style={{ "fontSize": "13px" }} className="dropdown-item" href="/admin/Profile">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user align-middle me-1">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle></svg> Profile</a>
                                <div className="dropdown-divider"></div>
                                <a style={{ "fontSize": "13px" }} className="dropdown-item" onClick={e => handleLogout()}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user align-middle me-1">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle></svg> Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
