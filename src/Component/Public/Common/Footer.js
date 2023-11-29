import { Link } from 'react-router-dom'
import React from 'react'
import { common } from '../../../utils/common'
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function () {
    const { t, i18n } = useTranslation();
    return (

        <footer id="footer2" className="footer-home">
            <div className="container">
                <div className="footerMenu">
                    <div className="wpb_column vc_column_container vc_col-sm-3">
                        <div className="vc_column-inner ">
                            <div className="wpb_wrapper">
                                <div className="gen-list no-border no-bg padding-0 border-radius-none default-list important-links-three  normal-font ">
                                    <h2 className="heading3">{t("aboutKashi")}</h2>
                                    <ul className="f-link">
                                        <li className="">
                                            <Link to='/History'>{t("history")}</Link>
                                        </li>                                      
                                        <li className="">
                                            <Link to='/KeyFacts'>{t("keyFacts")}</Link>
                                        </li>
                                        <li className="">
                                            <Link to='https://upstdc.co.in/website/default.aspx' target='_blank'>{t("upstdcPortal")}</Link>
                                        </li>
                                        <li className="">
                                            <Link to='/Demography'>{t("demography")}</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wpb_column vc_column_container vc_col-sm-3">
                        <div className="vc_column-inner ">
                            <div className="wpb_wrapper">
                                <div className="gen-list no-border no-bg padding-0 border-radius-none default-list important-links-three  normal-font ">
                                    <h2 className="heading3">{t("policies")}</h2>
                                    <ul className="f-link">
                                        <li className="">
                                            <Link to='/TermsConditions'>{t("termAndConditions")}</Link>
                                        </li>
                                        <li className="">
                                            <Link to='/CopyrightPolicy'>{t("copyrightPolicy")}</Link>
                                        </li>
                                        <li className="">
                                            <Link to='/PrivacyPolicy'>{t("privacyPolicy")}</Link>
                                        </li>
                                        {/* <li className="">
                                    <a className="" href="/HyperlinkingPolicy">Hyperlinking Policy</a>
                                </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wpb_column vc_column_container vc_col-sm-3">
                        <div className="vc_column-inner ">
                            <div className="wpb_wrapper">
                                <div className="gen-list no-border no-bg padding-0 border-radius-none default-list important-links-three  normal-font ">
                                    <h2 className="heading3">{t("followsUs")}</h2>
                                    <ul className="f-link">
                                        <li className="">
                                            <Link to='https://www.facebook.com/people/Uttar-Pradesh-State-Tourism-Development-Corporation-Ltd/100086977891416/' target='_blank'>{t("facebook")}</Link>
                                        </li>
                                        <li className="">
                                            <Link to='https://twitter.com/UPSTDCUp' target='_blank'>{t("twitter")}</Link>
                                        </li>
                                        <li className="">
                                            <Link to='https://www.youtube.com/@KASHIYATRAA' target='_blank'>{t("youtube")}</Link>
                                        </li>
                                        <li className="">
                                            <Link to='https://z-p42.www.instagram.com/accounts/login/?next=/explore/tags/upstdc/' target='_blank'>{t("instagram")}</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wpb_column vc_column_container vc_col-sm-3">
                        <div className="vc_column-inner ">
                            <div className="wpb_wrapper">
                                <div className="gen-list no-border no-bg padding-0 border-radius-none default-list important-links-three  normal-font ">
                                    <h2 className="heading3">{t("quickLinks")}</h2>
                                    <ul className="f-link">
                                        <li className="">
                                            <Link to='/Helpline'>{t("emergencyServices")}</Link>
                                        </li>
                                        <li className="">
                                            <Link to='/FAQ'>{t("faqs")}</Link>
                                        </li>
                                        <li className="">
                                            <Link to='/DosDonts'>{t("dosAndDont")}</Link>
                                        </li>
                                        <li className="">
                                            <Link to='/Map'>{t("map")}</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footerMenu" style={{ marginTop: '12%' }}>
                    {/* <ul id="menu-footer-en" className="menu">
                <li id="menu-item-2501" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2501"><a href="javascript:void(0);">Website Policies</a></li>
                <li id="menu-item-2503" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2503"><a href="Helpline.html">Help</a></li>
                <li id="menu-item-2506" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2506"><a href="ContactUs.html">Contact Us</a></li>
            </ul>  */}
        </div>  
         <div className="copyRights">
         <div className="pd-bottom5 color-white ctnt-ownd-dis">{t("downloadOurMobileApp")} : <span>
                                    <a href='/mobileApp/android/kashiyatra.apk'>
                                        <LazyLoadImage effect='blur' style={{ width: '32px', height: '32px' }} src='/mobileApp/android.png' />
                                    </a>
                                </span>
                                    <span>
                                        <a href="https://apps.apple.com/in/app/kashi-yatra/id6450551365" target="_blank" download>
                                            <LazyLoadImage effect='blur' style={{ width: '32px', height: '32px' }} src='/mobileApp/ios.png' />
                                        </a>
                                    </span>
                                </div>

                    <div className="pd-bottom5 color-white ctnt-ownd-dis">{t("footer1")}</div>
                    <div className="copyRightsText">
                        <p><a href="http://spit-tech.com/" target="_blank">{t("footer2")}</a> <br /><a href="https://uptourism.gov.in/" target="_blank" aria-label="This is the Official Web Portal of Kashi Yatra (Varanasi), Department of Tourism, Uttar Pradesh" title="Department of Tourism &amp; Uttar Pradesh" rel="noopener noreferrer">{t("footer3")}</a></p>
                        <p>{t("lastUpdate")}: <strong>{process.env.REACT_APP_LAST_UPDATED}</strong>
                        </p>
                        <p>
                            <strong>{t("visitorCounter")}</strong>
                            <span>
                                <a href="" onClick={e => common.doNothing(e)} title={t("visitorCounter")}>
                                    <LazyLoadImage effect='blur' src="https://counter10.optistats.ovh/private/freecounterstat.php?c=xxuh14fwucbch82smcd7asjxzdxj5mxe" border="0" title={t("visitorCounter")} alt={t("visitorCounter")} />
                                </a>
                            </span>
                        </p>
                    </div>
                    {/* <!--<div className="copyRightsLogos"> <a href="http://www.digitalindia.gov.in/"><LazyLoadImage effect='blur' src="#/wp-content/themes/district-theme-3/images/digitalIndia.png" alt="Digital India opens a new window"></a>--> <!-- <a href="#" className="stqc-logo"><LazyLoadImage effect='blur' src="/common_utility/images/STQC-approved.png"  alt="STQC"></a> --> <!--</div>--> */}
                </div>

            </div>


        </footer>
    )
}