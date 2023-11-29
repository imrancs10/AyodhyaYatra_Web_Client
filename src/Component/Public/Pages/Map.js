import React from 'react'
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
export default function Map() {
    const { t, i18n } = useTranslation();
    return (
        <>
            <div className="wrapper banner-wrapper innerBanner">
                <LazyLoadImage effect='blur' src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
            </div>
            <section className="wrapper bodyWrapper" >
                <div className="container">
                    <div className="row breadcrumb-outer">
                        <div className="left-content push-left">
                            <div id="breadcam" role="navigation" aria-label="breadcrumb">
                                <ul className="breadcrumbs"><li><a href="#" className="home"><span>{t("home")}</span></a></li> <li><a href="#">{t("quickLinks")}</a></li><li className="current">{t("map")}</li></ul>            </div>
                        </div>
                        {/* <div className="right-content push-right">
            <div className="printShare">
                <ul className="">
                    <li><a href="#" id="print" title="Print Page Content" aria-label="Print Page Content"><span className="icon-printer"></span> <span className="off-css">Print</span></a></li>
                    <li>
                                                <span className="share-text"><em className="icon-share"></em><span className="off-css">Share</span></span>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/sharer/sharer.php?u=#gallery/sveep-2023/&t=SVEEP-2023"
                           onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                           target="_blank" title="Share on Facebook" aria-label="Facebook that opens in a new window"><span className="icon-facebook"></span><span className="off-css">Facebook</span></a>
                    </li>
                    <li>
                        <a href="https://twitter.com/share?url=#gallery/sveep-2023/&via=TWITTER_HANDLE&text=SVEEP-2023"
                           onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                           target="_blank" title="Share on Twitter" aria-label="Twitter that opens in a new window"><span className="icon-twitter"></span><span className="off-css">Twitter</span></a>
                    </li>
                </ul>
            </div>
        </div> */}
                    </div>
                    <div id="SkipContent"></div>
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-8">
                                    <h1>{t("map")}</h1>
                                </div>
                                <div className="col-4 textRight">
                                    <div className="viewSwicther"> <a href="#" className="thumbs-view-btn" aria-label="Grid View" title="Grid View"><span className="icon-thumbs-view"></span></a> <a href="#" className="thumbs-list-view-btn" aria-label="List View" title="List View"><span className="icon-list-view"></span></a> </div>
                                </div>

                            </div>

                            <div className="single-glry-discription">
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div id="photoGallery6" className="">
                                        <div className="separator10"></div>
                                        <div className="row thumbs_view">
                                            <div className="col-4 photoGallery6Item fancyShare tourist-plc-glry">
                                                <a data-alt="Img 1" href="uploads/Map/map2.jpg" className="fancybox" rel="gallery" title="Omkareshwar Parikrama" alt="Img 1">
                                                    <LazyLoadImage effect='blur' src="uploads/Map/map2.jpg" alt="Img 1" />
                                                </a>
                                                <div className="photoGallery6ItemCaption">
                                                    <div className="photoGallery6ItemCaptionContent">
                                                        <a data-alt="Img 1" href="uploads/Map/map2.jpg" className="fancybox" rel="gallery1" title="Omkareshwar Parikrama">
                                                            <span className="icon-zoom-in"><strong className="tcon">View Image</strong></span>
                                                        </a>
                                                        <span>Omkareshwar Parikrama</span>
                                                        <div className="socialBox">
                                                            <ul>
                                                                <li><span className="share-text share-on-gallery"><em className="icon-share"></em></span></li>
                                                                <li>
                                                                    <a href="https://www.facebook.com/sharer/sharer.php?u=#gallery/sveep-2023/&t=1"
                                                                        onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                                        target="_blank" aria-label="Facebook opens a new window" title="Share on Facebook"><span className="icon-facebook" style={{ color: 'blue', fontSize: 'large' }}></span><span className="off-css">Share on Facebook</span></a>
                                                                </li>
                                                                <li>
                                                                    <a href="https://twitter.com/share?url=#gallery/sveep-2023/&via=TWITTER_HANDLE&text=1"
                                                                        onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                                        target="_blank" aria-label="Twitter opens a new window" title="Share on Twitter"><span className="icon-twitter" style={{ color: 'skyblue', fontSize: 'large' }}></span><span className="off-css">Share on Twitter</span></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="hide fancySocial clearfix">
                                                            <div className="socialBox">
                                                                <ul>
                                                                    <li>
                                                                        <a href="https://www.facebook.com/sharer/sharer.php?u=#gallery/sveep-2023/&t=1"
                                                                            onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                                            target="_blank" title="Share on Facebook"><span className="icon-facebook" style={{ color: 'blue', fontSize: 'large' }}></span><span className="off-css">Share on Facebook</span></a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="https://twitter.com/share?url=#gallery/sveep-2023/&via=TWITTER_HANDLE&text=1"
                                                                            onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                                            target="_blank" title="Share on Twitter"><span className="icon-twitter" style={{ color: 'skyblue', fontSize: 'large' }}></span><span className="off-css">Share on Twitter</span></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--<div className="gallery-descriptions single-img-imgDesp">-->
              <!--</div>--> */}
                                            </div>

                                            <div className="col-4 photoGallery6Item fancyShare tourist-plc-glry">
                                                <a data-alt="Img 1" href="uploads/Map/map4.jpg" className="fancybox" rel="gallery" title="Kedareshwar Parikrama" alt="Img 1">
                                                    <LazyLoadImage effect='blur' src="uploads/Map/map4.jpg" alt="Img 1" />
                                                </a>
                                                <div className="photoGallery6ItemCaption">
                                                    <div className="photoGallery6ItemCaptionContent">
                                                        <a data-alt="Img 1" href="uploads/Map/map4.jpg" className="fancybox" rel="gallery1" title="Kedareshwar Parikrama">
                                                            <span className="icon-zoom-in"><strong className="tcon">View Image</strong></span>
                                                        </a>
                                                        <span>Kedareshwar Parikrama</span>
                                                        <div className="socialBox">
                                                            <ul>
                                                                <li><span className="share-text share-on-gallery"><em className="icon-share"></em></span></li>
                                                                <li>
                                                                    <a href="https://www.facebook.com/sharer/sharer.php?u=#gallery/sveep-2023/&t=1"
                                                                        onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                                        target="_blank" aria-label="Facebook opens a new window" title="Share on Facebook"><span className="icon-facebook" style={{ color: 'blue', fontSize: 'large' }}></span><span className="off-css">Share on Facebook</span></a>
                                                                </li>
                                                                <li>
                                                                    <a href="https://twitter.com/share?url=#gallery/sveep-2023/&via=TWITTER_HANDLE&text=1"
                                                                        onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                                        target="_blank" aria-label="Twitter opens a new window" title="Share on Twitter"><span className="icon-twitter" style={{ color: 'skyblue', fontSize: 'large' }}></span><span className="off-css">Share on Twitter</span></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="hide fancySocial clearfix">
                                                            <div className="socialBox">
                                                                <ul>
                                                                    <li>
                                                                        <a href="https://www.facebook.com/sharer/sharer.php?u=#gallery/sveep-2023/&t=1"
                                                                            onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                                            target="_blank" title="Share on Facebook"><span className="icon-facebook" style={{ color: 'blue', fontSize: 'large' }}></span><span className="off-css">Share on Facebook</span></a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="https://twitter.com/share?url=#gallery/sveep-2023/&via=TWITTER_HANDLE&text=1"
                                                                            onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                                            target="_blank" title="Share on Twitter"><span className="icon-twitter" style={{ color: 'skyblue', fontSize: 'large' }}></span><span className="off-css">Share on Twitter</span></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--<div className="gallery-descriptions single-img-imgDesp">-->
              <!--</div>--> */}
                                            </div>
                                            <div className="col-4 photoGallery6Item fancyShare tourist-plc-glry">
                                                <a data-alt="Img 1" href="uploads/Map/map5.jpg" className="fancybox" rel="gallery" title="Kashi Parikrama" alt="Img 1">
                                                    <LazyLoadImage effect='blur' src="uploads/Map/map5.jpg" alt="Img 1" />
                                                </a>
                                                <div className="photoGallery6ItemCaption">
                                                    <div className="photoGallery6ItemCaptionContent">
                                                        <a data-alt="Img 1" href="uploads/Map/map5.jpg" className="fancybox" rel="gallery1" title="Kashi Parikrama">
                                                            <span className="icon-zoom-in"><strong className="tcon">View Image</strong></span>
                                                        </a>
                                                        <span>Kashi Parikrama</span>
                                                        <div className="socialBox">
                                                            <ul>
                                                                <li><span className="share-text share-on-gallery"><em className="icon-share"></em></span></li>
                                                                <li>
                                                                    <a href="https://www.facebook.com/sharer/sharer.php?u=#gallery/sveep-2023/&t=1"
                                                                        onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                                        target="_blank" aria-label="Facebook opens a new window" title="Share on Facebook"><span className="icon-facebook" style={{ color: 'blue', fontSize: 'large' }}></span><span className="off-css">Share on Facebook</span></a>
                                                                </li>
                                                                <li>
                                                                    <a href="https://twitter.com/share?url=#gallery/sveep-2023/&via=TWITTER_HANDLE&text=1"
                                                                        onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                                        target="_blank" aria-label="Twitter opens a new window" title="Share on Twitter"><span className="icon-twitter" style={{ color: 'blue', fontSize: 'large' }}></span><span className="off-css">Share on Twitter</span></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="hide fancySocial clearfix">
                                                            <div className="socialBox">
                                                                <ul>
                                                                    <li>
                                                                        <a href="https://www.facebook.com/sharer/sharer.php?u=#gallery/sveep-2023/&t=1"
                                                                            onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                                            target="_blank" title="Share on Facebook"><span className="icon-facebook" style={{ color: 'blue', fontSize: 'large' }}></span><span className="off-css">Share on Facebook</span></a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="https://twitter.com/share?url=#gallery/sveep-2023/&via=TWITTER_HANDLE&text=1"
                                                                            onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                                            target="_blank" title="Share on Twitter"><span className="icon-twitter" style={{ color: 'skyblue', fontSize: 'large' }}></span><span className="off-css">Share on Twitter</span></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--<div className="gallery-descriptions single-img-imgDesp">-->
              <!--</div>--> */}
                                            </div>
                                            <div className="col-4 photoGallery6Item fancyShare tourist-plc-glry">
                                                <a data-alt="Img 1" href="uploads/Map/map1.jpg" className="fancybox" rel="gallery" title="Kashi Kshetra" alt="Img 1">
                                                    <LazyLoadImage effect='blur' src="uploads/Map/map1.jpg" alt="Img 1" />
                                                </a>
                                                <div className="photoGallery6ItemCaption">
                                                    <div className="photoGallery6ItemCaptionContent">
                                                        <a data-alt="Img 1" href="uploads/Map/map1.jpg" className="fancybox" rel="gallery1" title="Kashi Kshetra">
                                                            <span className="icon-zoom-in"><strong className="tcon">View Image</strong></span>
                                                        </a>
                                                        <span>Kashi Kshetra</span>
                                                        <div className="socialBox">
                                                            <ul>
                                                                <li><span className="share-text share-on-gallery"><em className="icon-share"></em></span></li>
                                                                <li>
                                                                    <a href="https://www.facebook.com/sharer/sharer.php?u=#gallery/sveep-2023/&t=1"
                                                                        onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                                        target="_blank" aria-label="Facebook opens a new window" title="Share on Facebook"><span className="icon-facebook" style={{ color: 'blue', fontSize: 'large' }}></span><span className="off-css">Share on Facebook</span></a>
                                                                </li>
                                                                <li>
                                                                    <a href="https://twitter.com/share?url=#gallery/sveep-2023/&via=TWITTER_HANDLE&text=1"
                                                                        onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                                        target="_blank" aria-label="Twitter opens a new window" title="Share on Twitter"><span className="icon-twitter" style={{ color: 'skyblue' }}></span><span className="off-css">Share on Twitter</span></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="hide fancySocial clearfix">
                                                            <div className="socialBox">
                                                                <ul>
                                                                    <li>
                                                                        <a href="https://www.facebook.com/sharer/sharer.php?u=#gallery/sveep-2023/&t=1"
                                                                            onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                                            target="_blank" title="Share on Facebook"><span className="icon-facebook" style={{ color: 'blue', fontSize: 'large' }} ></span><span className="off-css">Share on Facebook</span></a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="https://twitter.com/share?url=#gallery/sveep-2023/&via=TWITTER_HANDLE&text=1"
                                                                            onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                                            target="_blank" title="Share on Twitter"><span className="icon-twitter" style={{ color: 'skyblue', fontSize: 'large' }}></span><span className="off-css">Share on Twitter</span></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--<div className="gallery-descriptions single-img-imgDesp">-->
              <!--</div>--> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="separator50"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
