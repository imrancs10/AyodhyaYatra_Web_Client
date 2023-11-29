import React from 'react'
import { common } from '../../../utils/common'
import { useTranslation } from 'react-i18next';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function History() {
    const { t, i18n } = useTranslation();
  return (
    <>
            <div className="wrapper banner-wrapper innerBanner">
                <LazyLoadImage effect='blur' src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
            </div>

            <section className="wrapper bodyWrapper">
                <div className="container">
                    <div className="row breadcrumb-outer">
                        <div className="left-content push-left">
                            <div id="breadcam" role="navigation" aria-label="breadcrumb">
                                <ul className="breadcrumbs"><li><a href="#/" className="home"><span>{t("home")}</span></a></li><li><a href="#">{t("aboutKashiYatra")}</a></li> <li className="current">{t("history")}</li></ul>
                            </div>
                        </div>
                    </div>
                    <div id="SkipContent"></div>
                    <div className="row">
                        <div className="row px-4">
                            <div className="col-8">
                                <h1>{t("varanasiHistory")} </h1>
                            </div>
                            <div className="col-4">
                                <div className="viewSwicther right-content desktopElement">
                                    <a href onClick={e=>common.doNothing(e)} className="thumbs-view-btn"><span className="icon-thumbs-view"></span></a>
                                    <a href onClick={e=>common.doNothing(e)} className="thumbs-list-view-btn"><span className="icon-list-view"></span></a>
                                </div>
                            </div>
                            <div className="col-12">
                            </div>
                        </div>
                        <div className="row px-4">
                            <div className="col-12">
                                {/* <!--==================Paragraph with image start here=======================--> */}
                                <div>
                                <div className="pull-right sample-img-cntr"><LazyLoadImage effect='blur' decoding="async" src="http://www.kashiyatra.com/uploads/Map/map1.jpg" alt="sample Image" style={{width:'500px', height:'400px'}} /></div>
                                    <p style={{textAlign:'justify'}}>{t("p1varanasiHistory")}</p>
                                    {/* <!--<div className="pull-left sample-img-cntr"><LazyLoadImage effect='blur' decoding="async" src="https://cdn.s3waas.gov.in/master/uploads/2017/04/2017110736.jpg" alt="sample Image" /> <br />
                                 Caption</div>--> */}
                                    <p style={{textAlign:'justify'}}>
                                    {t("p2varanasiHistory")}
                                    </p>
                                    <p style={{textAlign:'justify'}}>
                                    {t("p3varanasiHistory")}
                                    </p>
                                    <p style={{textAlign:'justify'}}>
                                    {t("p4varanasiHistory")}
                                    </p>
                                    <p style={{textAlign:'justify'}}>
                                    {t("p5varanasiHistory")}
                                    </p>
                                </div>
                                <div className="col-12">
                                    <div className="colspexp-container">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
            </section>

        </>
  )
}
