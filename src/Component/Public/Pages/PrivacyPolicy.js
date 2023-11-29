import React from 'react'
import { useTranslation } from 'react-i18next';
export default function PrivacyPolicy() {
    const { t, i18n } = useTranslation();
  return (
    <>
    <div className="wrapper banner-wrapper innerBanner">
            <img src="content/themes/district-theme/images/innerBanner.jpg" alt=""/>
        </div>

        <section className="wrapper bodyWrapper">
            <div className="container">
                <div className="row breadcrumb-outer">
                    <div className="left-content push-left">
                        <div id="breadcam" role="navigation" aria-label="breadcrumb">
                            <ul className="breadcrumbs"><li><a href="#/" className="home"><span>{t("home")}</span></a></li><li><a href="#">{t("policy")}</a></li> <li className="current">{t("privacyPolicy")}</li></ul>
                        </div>
                    </div>
                    {/* <div className="right-content push-right">
                        <div className="printShare">
                            <ul className="">
                                <li><a href="#" id="print" title="Print Page Content" aria-label="Print Page Content"><span className="icon-printer"></span> <span className="off-css">Print</span></a></li>
                                <li>
                                    <span className="share-text"><em className="icon-share"></em><span className="off-css">Share</span></span>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/sharer/sharer.php?u=#/audio-gallery-page/&t=Audio+Gallery"
                                       onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                       target="_blank" title="Share on Facebook" aria-label="Facebook that opens in a new window"><span className="icon-facebook"></span><span className="off-css">Facebook</span></a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/share?url=#/audio-gallery-page/&via=TWITTER_HANDLE&text=Audio+Gallery"
                                       onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                       target="_blank" title="Share on Twitter" aria-label="Twitter that opens in a new window"><span className="icon-twitter"></span><span className="off-css">Twitter</span></a>
                                </li>
                            </ul>
                        </div>
                    </div> */}
                </div>
                <div id="SkipContent"></div>
                <div className="row">
                    <div className="row">
                        <div className="col-8">
                            <h1>{t("privacyPolicy")} </h1>
                        </div>
                        <div className="col-4">
                            <div className="viewSwicther right-content desktopElement">
                                <a href="javascript:void(0);" className="thumbs-view-btn"><span className="icon-thumbs-view"></span></a>
                                <a href="javascript:void(0);" className="thumbs-list-view-btn"><span className="icon-list-view"></span></a>
                            </div>
                        </div>
                        <div className="col-12">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {/* <!--==================Paragraph with image start here=======================--> */}
                            <div>
                                <div>
                                    <hr />
                                    <h4>{t("general")}</h4>
                                    <p style={{textAlign:'justify'}}>
                                    {t("p1general")}
                                    </p>
                                    <hr />
                                    <h4>{t("informationcollectedandstoredautomatically")}</h4>
                                    <p style={{textAlign:'justify'}}>
                                    {t("p1informationcollectedandstoredautomatically")}
                                        <ul className="list">
                                            <li> {t("p2informationcollectedandstoredautomatically")}</li>
                                            <li> {t("p3informationcollectedandstoredautomatically")}</li>
                                            <li> {t("p4informationcollectedandstoredautomatically")}</li>
                                            <li> {t("p5informationcollectedandstoredautomatically")}</li>
                                            <li> {t("p6informationcollectedandstoredautomatically")}</li>
                                        </ul>   
                                            <p> {t("p7informationcollectedandstoredautomatically")}</p>
                                        
                                    </p>
                                    <hr />
                                    <h4>{t("sitevisitdata")}</h4>
                                    <p style={{textAlign:'justify'}}>
                                    {t("p1sitevisitdata")}<br/>

                                        <p> {t("p2sitevisitdata")}</p>
                                    </p>
                                    <hr />
                                    <h4>{t("cookies")}</h4>
                                    <p style={{textAlign:'justify'}}>
                                    {t("p1cookies")}<br/>

                                        <p> {t("p2cookies")}</p>
                                    </p>
                                    <hr />
                                    <h4>{t("ifyousenduspersonalinformation")}</h4>
                                    <p style={{textAlign:'justify'}}>
                                    {t("p1ifyousenduspersonalinformation")}<br/>

                                       <p> {t("p2ifyousenduspersonalinformation")}</p>
                                    </p>
                                    <hr />
                                    <h4>{t("siteSecurity")}</h4>
                                    <p style={{textAlign:'justify'}}>
                                    {t("p1siteSecurity")}
                                    </p>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="colspexp-container">

                                </div>
                            </div>
                            {/* <p><!--=====================Paragraph with image end here==========================--> */}
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        </section>
    </>
  )
}
