import React from 'react'
import BreadCrumb from '../Common/BreadCrumb'
import { useTranslation } from 'react-i18next';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function ContactUs() {
    const { t} = useTranslation();
    return (
        <>
            <div className="wrapper banner-wrapper innerBanner">
                <LazyLoadImage effect='blur' src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
            </div>


            <div className="wrapper bodyWrapper ">
                <div className="container ">
                    <div className="row breadcrumb-outer">
                        <div className="left-content push-left">
                            <div id="breadcam" role="navigation" aria-label="breadcrumb">
                                <ul className="breadcrumbs">
                                    <li><a href="#/" className="home"><span>{t("home")}</span></a></li>
                                    <li><a href="#tourism/">{t("howToReach")}</a></li>
                                    <li className="current">{t("contactUs")}</li></ul>
                            </div>
                        </div>
                    </div>
                    <div id="SkipContent"></div>    
                    <div className="row px-4">
                        <div className="col-12">
                            <h1>{t("contactUs")}</h1>
                        </div>
                    </div>
                    <div className='row px-4'>
                        <div className='col-6'>
                            <div className="wpb_column vc_column_container bggrad" style={{ color: 'White', padding: '20px' }}>
                                <div className="vc_column-inner vc_custom_1516181017591">
                                    <div className="wpb_wrapper">
                                        <div className="gen-list no-border no-bg padding-0 border-radius-none small-icon-list   normal-font ">

                                            <h1>{t("ContactDetails")}</h1>
                                            <div id="post-1520" className="post-1520 page type-page status-publish hentry">
                                                <p>{t("infoEmail")}</p>
                                                <p>{t("queryEmail")}</p>
                                                <p>{t("feedbackInfo")}</p>
                                                <p>{t("contactInfo")}</p>
                                                <div className="clear">
                                                    <p><strong>{t("Office")}</strong> {t("RegionalTouristOffice")}</p>
                                                    <p><strong>{t("Email")}:</strong> {t("infoEmailId")}</p>
                                                    <p><strong>{t("Phone")}:</strong> {t("PhoneNumber")}</p>
                                                    <p><strong>{t("Address")}:</strong> {t("SaanskratikSankul")}</p>
                                                    <p><strong>{t("Pin")}:</strong> {t("PinNumber")}</p>
                                                    <p><strong>{t("Website")}:</strong> <a href="#" className="weburl"> {t("kashiyatraSite")}</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="wpb_column vc_column_container" style={{ marginTop: '10px' }}>
                                <div className="vc_custom_1516181017591">
                                    <div className="wpb_wrapper">
                                        <div className="gen-list no-border no-bg padding-0 border-radius-none small-icon-list info-list-margin  normal-font ">

                                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115408.09799676467!2d82.90870587331447!3d25.320894921568556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db76febcf4d%3A0x68131710853ff0b5!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1683860577365!5m2!1sen!2sin" width="600" height="520" style={{ border: '0' }} allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
