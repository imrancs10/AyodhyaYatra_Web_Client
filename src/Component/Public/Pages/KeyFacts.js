import React from 'react'
import { common } from '../../../utils/common'
import { useTranslation } from 'react-i18next';
export default function KeyFacts() {
    const { t, i18n } = useTranslation();
  return (
    <>
    <div className="wrapper banner-wrapper innerBanner">
        <img src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
    </div>

    <div className="wrapper bodyWrapper " >
        <div className="container ">
            <div className="row breadcrumb-outer">
                <div className="left-content push-left">
                    <div id="breadcam" role="navigation" aria-label="breadcrumb">
                        <ul className="breadcrumbs"><li><a href="#" className="home"><span>{t("home")}</span></a></li><li><a href="#about-district/">{t("aboutKashiYatra")}</a></li> <li className="current">{t("keyFacts")}</li></ul>            </div>
                </div>
                <div className="right-content push-right">                           
                    {/* <div className="printShare">
        <ul className="">
            <li><a href="#" id="print" title="Print Page Content" aria-label="Print Page Content"><span className="icon-printer"></span> <span className="off-css">Print</span></a></li>
            <li>
                                        <span className="share-text"><em className="icon-share"></em><span className="off-css">Share</span></span>
            </li>
            <li>
                <a href="https://www.facebook.com/sharer/sharer.php?u=#history/&t=History"
                   onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                   target="_blank" title="Share on Facebook" aria-label="Facebook that opens in a new window"><span className="icon-facebook"></span><span className="off-css">Facebook</span></a>
            </li>
            <li>
                <a href="https://twitter.com/share?url=#history/&via=TWITTER_HANDLE&text=History"
                   onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                   target="_blank" title="Share on Twitter" aria-label="Twitter that opens in a new window"><span className="icon-twitter"></span><span className="off-css">Twitter</span></a>
            </li>
        </ul>
    </div> */}
                </div>
            </div>
            <div id="SkipContent"></div>

            <div className="row">
                <div className="row">
                    <div className="col-8">
                        <h1>{t("keyFacts")}</h1>                                
                    </div>
                    <div className="col-4">
                        <div className="viewSwicther right-content desktopElement">
                            <a href onClick={e=>common.doNothing(e)} className="thumbs-view-btn"><span className="icon-thumbs-view"></span></a>
                            <a href onClick={e=>common.doNothing(e)} className="thumbs-list-view-btn"><span className="icon-list-view"></span></a>
                        </div>
                    </div>
                </div>
                <div className="innerwrap ashta-bharav">
                    <div className="container">
                        <div className="col-md-12">
                            <div className="row">
                            {/* <p>Varanasi, or Benaras, (also known as Kashi) is one of the oldest living cities in the world. Varanasi`s Prominence in Hindu mythology is virtually unrevealed. Mark Twain, the English author and literature, who was enthralled by the legend and sanctity of Benaras, once wrote :
                            “Benaras is older than history, older than tradition, older even than legend and looks twice as old as all of them put together”.</p> */}
                                {/* <p><img className="alignright size-full wp-image-445 img-responsive imgborder" src="/wp-content/uploads/2018/05/kashi-ghat.jpg" alt="" srcset="http://pawanpath.up.gov.in/wp-content/uploads/2018/05/kashi-ghat.jpg 436w, http://pawanpath.up.gov.in/wp-content/uploads/2018/05/kashi-ghat-220x300.jpg 220w" sizes="(max-width: 436px) 100vw, 436px" width="436" height="594"/></p> */}
                                <ul className="list">
                                    <li>{t("p1keyFacts")}</li>
                                    <li>{t("p2keyFacts")}</li>
                                    <li>{t("p3keyFacts")}</li>
                                    <li>{t("p4keyFacts")}</li>
                                    <li>{t("p5keyFacts")}</li>
                                    <li>{t("p6keyFacts")}</li>
                                    <li>{t("p7keyFacts")}</li>
                                    <li>{t("p8keyFacts")} </li>
                                    <li>{t("p9keyFacts")}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container fullwidth-section">
                        <div className="clearfix"></div>
                        <div className="col-md-12">
                            <div className="row">
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
