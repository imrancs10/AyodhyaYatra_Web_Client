import React from 'react'
import { Link } from 'react-router-dom'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function AdSideMenu() {
    const toggleMenu = (e) => {
        var allLis = document.getElementsByClassName('sidebar-item');
        for (let index = 0; index < allLis.length; index++) {
            allLis[index].classList.remove('active');
        }
        allLis = document.getElementsByClassName('sidebar-sub-nav');
        for (let index = 0; index < allLis.length; index++) {
            allLis[index].classList.remove('active');
        }
        if (e.target.parentElement.classList.contains('sidebar-item')) {
            e.target.parentElement.classList.add('active');
            if (e.target.parentElement.getElementsByClassName("sidebar-sub-nav").length > 0) {
                var subMenu = e.target.parentElement.getElementsByClassName("sidebar-sub-nav")[0];
                subMenu.classList.add('active');
            }
        }
        else {
            e.target.parentElement.parentElement.classList.add('active');
            if (e.target.parentElement.parentElement.getElementsByClassName("sidebar-sub-nav").length > 0) {
                var subMenu = e.target.parentElement.parentElement.getElementsByClassName("sidebar-sub-nav")[0];
                subMenu.classList.add('active');
            }
        }
    }
    return (
        <>
            <nav id="sidebar" className="sidebar js-sidebar" style={{ marginLeft: '0px' }}>
                <div className="sidebar-content js-simplebar" data-simplebar="init">
                    <div className="simplebar-wrapper" style={{ margin: '0px' }}>
                        <div className="simplebar-height-auto-observer-wrapper">
                            <div className="simplebar-height-auto-observer"></div>
                        </div>
                        <div className="simplebar-mask">
                            <div className="simplebar-offset" style={{ right: '0px', bottom: '0px' }}>
                                <div className="simplebar-content-wrapper" tabIndex="0" role="region" aria-label="scrollable content" style={{ height: '100%', overflow: 'hidden scroll' }}>
                                    <div className="simplebar-content" style={{ padding: '0px' }}>
                                        <a className="sidebar-brand" href="index.html">
                                            <LazyLoadImage effect='blur' src="uploads/logo.png" alt='KashiYatra Logo' style={{ width: '100px', height: 'auto' }} />
                                        </a>
                                        <ul className="sidebar-nav">
                                            <li className="sidebar-header">
                                                Pages
                                            </li>
                                            <li onClick={e => toggleMenu(e)} className="sidebar-item active">
                                                <Link to="/admin/Dashboard" className='sidebar-link'>
                                                    <i className="fa-solid fa-gauge-high"></i>
                                                    <span className="align-middle">Dashboard</span>
                                                </Link>
                                            </li>
                                            <li onClick={e => toggleMenu(e)} className="sidebar-item active">
                                                <Link to="/admin/download/qr" className='sidebar-link'>
                                                    <i className="fa-solid fa-qrcode"></i>
                                                    <span className="align-middle">Download QR</span>
                                                </Link>
                                            </li>
                                            <li onClick={e => toggleMenu(e)} className="sidebar-item">
                                                <Link to="/admin/attraction/details" className='sidebar-link'>
                                                    <i className="fa-solid fa-gopuram"></i>
                                                    <span className="align-middle">Attraction</span>
                                                </Link>
                                            </li>
                                            <li onClick={e => toggleMenu(e)} className="sidebar-item">
                                                <Link to="/admin/yatra/attraction/mapper" className='sidebar-link'>
                                                    <i className="fa-solid fa-gopuram"></i>
                                                    <span className="align-middle">Attraction Yatra Mapper</span>
                                                </Link>
                                            </li>
                                            <li onClick={e => toggleMenu(e)} className="sidebar-item">
                                                <Link to="/admin/feedback/detail" className='sidebar-link'>
                                                    <i className="fa-solid fa-gopuram"></i>
                                                    <span className="align-middle">Feedback</span>
                                                </Link>
                                            </li>
                                            <li onClick={e => toggleMenu(e)} className="sidebar-item">
                                                <Link to="/admin/charity/details" className='sidebar-link'>
                                                    <i className="fa-solid fa-gopuram"></i>
                                                    <span className="align-middle">Charity</span>
                                                </Link>
                                            </li>
                                            <li onClick={e => toggleMenu(e)} className="sidebar-item has-sub">
                                                <Link to="#" className='sidebar-link'>
                                                    <i className="fa-solid fa-gopuram"></i>
                                                    <span className="align-middle">Master</span>
                                                </Link>
                                                <ul className="sidebar-sub-nav">
                                                    <li onClick={e => toggleMenu(e)} className="sidebar-item">
                                                        <Link to="/admin/master/data/detail" className='sidebar-link'>
                                                            <i className="fa-solid fa-gopuram"></i>
                                                            <span className="align-middle">Master | Data</span>
                                                        </Link>
                                                    </li>
                                                    <li onClick={e => toggleMenu(e)} className="sidebar-item">
                                                        <Link to="/admin/attraction/type/details" className='sidebar-link'>
                                                            <i className="fa-solid fa-gopuram"></i>
                                                            <span className="align-middle">Master | Attraction Type</span>
                                                        </Link>
                                                    </li>
                                                    <li onClick={e => toggleMenu(e)} className="sidebar-item">
                                                        <Link to="/admin/master/yatra/detail" className='sidebar-link'>
                                                            <i className="fa-solid fa-gopuram"></i>
                                                            <span className="align-middle">Master | Yatra</span>
                                                        </Link>
                                                    </li>
                                                    <li onClick={e => toggleMenu(e)} className="sidebar-item">
                                                        <Link to="/admin/master/newsupdate/detail" className='sidebar-link'>
                                                            <i className="fa-solid fa-gopuram"></i>
                                                            <span className="align-middle">Master | News Update</span>
                                                        </Link>
                                                    </li>
                                                    <li onClick={e => toggleMenu(e)} className="sidebar-item">
                                                        <Link to="/admin/master/photoalbum/detail" className='sidebar-link'>
                                                            <i className="fa-solid fa-gopuram"></i>
                                                            <span className="align-middle">Master | Photo Album</span>
                                                        </Link>
                                                    </li>
                                                    <li onClick={e => toggleMenu(e)} className="sidebar-item">
                                                        <Link to="/admin/master/photogallery/detail" className='sidebar-link'>
                                                            <i className="fa-solid fa-gopuram"></i>
                                                            <span className="align-middle">Master | Photo Gallery</span>
                                                        </Link>
                                                    </li>
                                                    <li onClick={e => toggleMenu(e)} className="sidebar-item">
                                                        <Link to="/admin/master/audiogallery/detail" className='sidebar-link'>
                                                            <i className="fa-solid fa-gopuram"></i>
                                                            <span className="align-middle">Master | Audio Gallery</span>
                                                        </Link>
                                                    </li>
                                                    <li onClick={e => toggleMenu(e)} className="sidebar-item">
                                                        <Link to="/admin/master/videogallery/detail" className='sidebar-link'>
                                                            <i className="fa-solid fa-gopuram"></i>
                                                            <span className="align-middle">Master | Video Gallery</span>
                                                        </Link>
                                                    </li>
                                                    <li onClick={e => toggleMenu(e)} className="sidebar-item">
                                                        <Link to="/admin/master/360DegreeGallery/detail" className='sidebar-link'>
                                                            <i className="fa-solid fa-gopuram"></i>
                                                            <span className="align-middle">Master | 360 Degree Gallery</span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="simplebar-placeholder" style={{ width: 'auto', height: '707px' }}></div>
                    </div>
                    <div className="simplebar-track simplebar-horizontal" style={{ visibility: 'hidden' }}>
                        <div className="simplebar-scrollbar" style={{ width: '0px', display: 'none' }}></div>
                    </div>
                    <div className="simplebar-track simplebar-vertical" style={{ visibility: 'visible' }}>
                        <div className="simplebar-scrollbar" style={{ height: '89px', transform: 'translate3d(0px, 0px, 0px)', display: 'block' }}>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
