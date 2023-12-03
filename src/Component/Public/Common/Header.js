import React, { useRef, useState, useEffect } from 'react'
import HeaderMenu from './HeaderMenu'
import { common } from '../../../utils/common';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Header() {
    const { t, i18n } = useTranslation();
    const [count, setCount] = useState(0);
    const [langDisplayIndex, setLangDisplayIndex] = useState(0);
    const langCode = ['en', 'hi', 'ta', 'te'];
    const overflowMenuRef = useRef();
    const menuWrapperRef = useRef();
    const moreMenuCloseClick = (e) => {
        e.preventDefault();
        var menu = overflowMenuRef.current;
        menu.style.right = "-300px";
    }
    const toggleMenuClick = (e) => {
        e.preventDefault();
        var menu = menuWrapperRef.current;
        var currState = menu.style.display;
        if (common.isMobileDevice()) {
            if (currState === 'none')
                menu.style.display = "block";
            else
                menu.style.display = "none";
        }
    }

    const getSelectedLang = (code) => {
        if (code === "en")
            return "English"
        else if (code === "hi")
            return "हिन्दी"
        else if (code === "ta")
            return "தமிழ் (Tamil)"
        else if (code === "te")
            return "తెలుగు (Telugu)"
        else
            return "English"

    }

    useEffect(() => {

        //Implementing the setInterval method
        const interval = setInterval(() => {
            setLangDisplayIndex(langDisplayIndex + 1);
        }, 3000);

        //Clearing the interval
        return () => clearInterval(interval);
    }, [langDisplayIndex]);
    return (
        <header>
            <section id="topBar1" className="wrapper make-accessible-header">
                <div className="container">
                    <div aria-label="Primary">
                        <div id="accessibility">
                            <ul id="accessibilityMenu">
                                <li><a href="#SkipContent" className="skip-to-content" title={t("skipToContent")}><span className="icon-skip-to-main responsive-show"></span><strong className="responsive-hide">{t("skipToContent")}</strong></a></li>
                                <li>
                                    <a lang="grt" href="https://up.gov.in/" target='_blank' aria-label="Government of Uttar Pradesh" title="Government of Uttar Pradesh">
                                        <b>{t("upGov")}</b>
                                    </a>
                                </li>
                                <li className="searchbox">
                                    <a href="#" title="Site Search" aria-label="Site Search" role="button" data-toggle="dropdown">
                                        <LazyLoadImage effect='blur' className="show-con" src="content/themes/district-theme-2/images/search-icon.png" title="Search Icon" alt="Search Icon" />
                                    </a>
                                    <div className="goiSearch">
                                        <form onSubmit={e => () => { }} action="#" method="get">
                                            <label htmlFor="search" className="hide">Search</label>
                                            <input type="hidden" readOnly={true} id="csrf_nonce" name="csrf_nonce" value="890d58e023" />
                                            <input type="hidden" readOnly={true} name="_wp_http_referer" value="/" />
                                            <input type="search" title="Enter Text" name="s" id="search" value="" onChange={e => () => { }} />
                                            <button type="submit" title="Search"><small className="tcon">Search</small><span className="icon-search" aria-hidden="true"></span></button>
                                        </form>
                                    </div>
                                </li>
                                <li>
                                    <a href="#" title="Social Media Links" className="show-social-links" role="button" data-toggle="dropdown">
                                        <LazyLoadImage effect='blur' className="show-con" src="content/themes/district-theme-2/images/social-icon.png" title="Social Icon" alt="Social Icon" />
                                        <span className="off-css">Social Media Links</span>
                                    </a>
                                    <ul className="socialIcons">
                                        <li>
                                            <a href="https://www.facebook.com/people/Uttar-Pradesh-State-Tourism-Development-Corporation-Ltd/100086977891416/" target="_blank" aria-label="Facebook | External site that opens in a new window">
                                                <LazyLoadImage effect='blur' src="content/themes/district-theme-2/images/ico-facebook.png" title="Facebook | External site that opens in a new window" alt="Facebook, External Link that opens in a new window" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://twitter.com/UPSTDCUp" target="_blank" aria-label="Twitter | External site that opens in a new window">
                                                <LazyLoadImage effect='blur' src="content/themes/district-theme-2/images/ico-twitter.png" title="Twitter | External site that opens in a new window" alt="Twitter | External site that opens in a new window" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.youtube.com/@KASHIYATRAA" target="_blank" aria-label="Youtube | External site that opens in a new window">
                                                <LazyLoadImage effect='blur' src="content/themes/district-theme-2/images/ico-youtube.png" title="Youtube | External site that opens in a new window" alt="Youtube | External site that opens in a new window" />
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#/SiteMap" title="Sitemap">
                                        <LazyLoadImage effect='blur' className="show-con" src="content/themes/district-theme-2/images/sitemap-icon.png" title="Sitemap Icon" alt="Sitemap Icon" />
                                        <span className="off-css">Site Map</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" title="Accessibility Links" aria-label="Accessibility Links" className="accessible-icon" role="button" data-toggle="dropdown">
                                        <LazyLoadImage effect='blur' className="show-con" src="content/themes/district-theme-2/images/accessibility.png" title="Accessibility Icon" alt="Accessibility Icon" />
                                        <span className="off-css">Accessibility Links</span>
                                    </a>
                                    <ul className="accessiblelinks textSizing">
                                        <li className="fontSizeEvent">
                                            <a data-selected-text="selected" data-event-type="increase" href="#" data-label="Font Size Increase" aria-label="Font Size Increase" title="Font Size Increase" area-label="Font Size Increase">
                                                <span aria-hidden="true">A+</span>
                                                <span className="off-css">Font Size Increase</span>
                                            </a>
                                        </li>
                                        <li className="fontSizeEvent">
                                            <a data-selected-text="selected" data-event-type="normal" href="#" data-label="Normal Font" aria-label="Normal Font - Selected" title="Normal Font - selected" area-label="Normal Font - selected" className="link-selected">
                                                <span aria-hidden="true">A</span>
                                                <span className="off-css"> Normal Font - Selected</span>
                                            </a>
                                        </li>
                                        <li className="fontSizeEvent">
                                            <a data-selected-text="selected" data-event-type="decrease" href="#" data-label="Font Size Decrease" aria-label="Font Size Decrease" title="Font Size Decrease" area-label="Font Size Decrease">
                                                <span aria-hidden="true">A-</span>
                                                <span className="off-css"> Font Size Decrease</span>
                                            </a>
                                        </li>
                                        <li className="highContrast dark tog-con">
                                            <a href="#" aria-label="High Contrast" title="High Contrast">
                                                <span aria-hidden="true">A</span>
                                                <span className="tcon">High Contrast</span>
                                            </a>
                                        </li>
                                        <li className="highContrast light">
                                            <a className="" href="#" aria-label="Normal Contrast - Selected" title="Normal Contrast - Selected">
                                                <span aria-hidden="true">A</span>
                                                <span className="tcon">Normal Contrast - Selected</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" onClick={e => { common.doNothing(e) }} className="change-language link-selected" aria-label="English - Selected" title="English - Selected" role="button" data-toggle="dropdown">
                                        {
                                            getSelectedLang(langCode[langDisplayIndex % 4])
                                        }
                                    </a>
                                    <ul className="socialIcons select-lang">
                                        <li className="lang-item lang-item-134 lang-item-hi mFocus">
                                            <a lang="en" hrefLang="en-US" onClick={e => { common.doNothing(e); i18n.changeLanguage("en-US") }} href="#" aria-label="English" title="English">English</a>
                                        </li>
                                        <li className="lang-item lang-item-134 lang-item-hi mFocus">
                                            <a lang="hi" hrefLang="hi-IN" onClick={e => { common.doNothing(e); i18n.changeLanguage("hi-IN") }} href="#" aria-label="हिन्दी" title="हिन्दी">हिन्दी</a>
                                        </li>
                                        <li className="lang-item lang-item-134 lang-item-hi mFocus">
                                            <a lang="ta" hrefLang="ta-IN" onClick={e => { common.doNothing(e); i18n.changeLanguage("ta-IN") }} href="#" aria-label="தமிழ் (Tamil)" title="தமிழ் (Tamil)">தமிழ் (Tamil)</a>
                                        </li>
                                        <li className="lang-item lang-item-134 lang-item-hi mFocus">
                                            <a lang="te" hrefLang="te-IN" onClick={e => { common.doNothing(e); i18n.changeLanguage("te-IN") }} href="#" aria-label="తెలుగు (Telugu)" title="తెలుగు (Telugu)">తెలుగు (Telugu)</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#/admin/login" target='_blank' className="link-selected" title={t("login")}>
                                        <span aria-hidden="true">{t("login")}</span>
                                        <span className="off-css">{t("login")}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="wrapper header-wrapper">
                <div className="container header-container">
                    <div className="logo">
                        <a href="index.html" title="Go to home" className="emblem" rel="home">
                            <LazyLoadImage effect='blur' className="site_logo" height="100" id="logo" src="uploads/logo.png" alt="Ayodhya Yatra Logo" />
                            <div className="logo-text hidden">
                                <strong lang="grt" className="site_name_regional">अयोध्या यात्रा</strong>
                                <h1 className="site_name_english">{t("kashiYatra")}</h1>
                            </div>
                        </a>
                    </div>
                    <div className="header-right clearfix">
                        <div className="right-content clearfix">
                            <div className="float-element">
                                <a aria-label="Govt. of UP - External site that opens in a new window" href="https://www.uptourism.gov.in/" target="_blank" title="Govt of UP" onClick={e => () => { alert(t('redirectAlert')) }} rel="noopener noreferrer">
                                    <LazyLoadImage effect='blur' className="sw-logo" height="95" src="uploads/uplogo.png" alt="Govt. of UP" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <a className="menuToggle" onClick={e => toggleMenuClick(e)} href="#" aria-label="Mobile Menu">
                        <span className="icon-menu"></span>
                        <span className="tcon">{t("toggleMenu")}</span>
                    </a>
                </div>
            </section>
            <section className="menuWrapper" ref={menuWrapperRef}>
                <div className="menuMoreText hide"></div>
                <div className="container">
                    <HeaderMenu overflowMenuRef={overflowMenuRef} menuContainerClickEvent={toggleMenuClick}></HeaderMenu>
                </div>
            </section>
            <div className="clearfix"></div>
            <div id="overflowMenu" ref={overflowMenuRef} style={{ boxShadow: '-3px 3px 13px 0px gray' }}>
                <div className="ofMenu">
                    <ul>
                        <li onClick={e => moreMenuCloseClick(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2837">
                            <Link to="/ContactUs">{t("contactUs")}</Link>
                        </li>
                        <li onClick={e => moreMenuCloseClick(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2837">
                            <Link to="/Directory">{t("directory")}</Link>
                        </li>
                        <li onClick={e => moreMenuCloseClick(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2837">
                            <Link to="/Helpline">{t("helpline")}</Link>
                        </li>
                        <li onClick={e => moreMenuCloseClick(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2837">
                            <Link to="/Feedback">{t("feedback")}</Link>
                        </li>
                        <li onClick={e => moreMenuCloseClick(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2837">
                            <Link to="/NewsEvents">{t("newsEvents")}</Link>
                        </li>
                    </ul>
                </div>
                <a title="Close" onClick={e => moreMenuCloseClick(e)} href="#" className="closeMenu">
                    <span className="icon-close" aria-hidden="true"></span> {t("close")}
                </a>
            </div>
        </header>
    )
}
