import { Link } from 'react-router-dom';
import { Api } from '../../../apis/Api';
import { apiUrls } from '../../../apis/ApiUrls';
import { common } from '../../../utils/common';
import BreadCrumb from '../Common/BreadCrumb'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function NewsEvents() {
    const { t, i18n } = useTranslation();
    const langType=i18n.language?.split('-')[0];
    const [newsUpdateData, setNewsUpdateData] = useState([]);

    useEffect(() => {
        Api.Get(apiUrls.newsUpdateController.getNewsUpdate)
            .then(res => {
                setNewsUpdateData(res.data);
            });
    }, []);
    return (
        <>
            <div className="wrapper banner-wrapper innerBanner">
                <LazyLoadImage effect='blur' src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
            </div>

            <section className="wrapper bodyWrapper">
                <div className="container">
                    <div className="row breadcrumb-outer">
                        <div className="left-content push-left">
                            {/* <BreadCrumb option={[{ name: "News & Events" ? t("newsandEvents") }]} /> */}
                            <div id="breadcam" role="navigation" aria-label="breadcrumb">
                                <ul className="breadcrumbs">
                                    <li><a href="#/" className="home"><span>{t("home")}</span></a></li>
                                    <li className="current">{t("newsEvents")}</li></ul>
                            </div>
                        </div>
                    </div>
                    <div id="SkipContent"></div>
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-8">
                                    <h1>{t("newsEvents")} </h1>
                                </div>
                            </div>
                            <div className="row thumbs_view list-view">
                                {
                                    newsUpdateData?.filter(x => x?.newsUpdateTypeName?.toLowerCase() === 'event' || x?.newsUpdateTypeName?.toLowerCase() === 'news' || x?.newsUpdateTypeName?.toLowerCase() === 'notification').map((ele, index) => {
                                        return <div key={index} className="col-4">
                                            <div className="pressRelese press-released">
                                                <div className="pressImage">
                                                    <Link to={ele?.webUrl}>
                                                        <LazyLoadImage effect='blur' src={process.env.REACT_APP_API_URL + ele?.images[0]?.filePath} alt="News" />
                                                    </Link>
                                                </div>
                                                <h2 className="heading3">
                                                    {ele?.newsUpdateTypeName?.toUpperCase() === "NEWS" ? t("news") : ele?.newsUpdateTypeName?.toUpperCase() === "EVENT" ? t("event") : t("notification")}
                                                    {/* {ele?.newsUpdateTypeName?.toUpperCase()} */}
                                                </h2>
                                                <h2>
                                                    <a href={ele?.webUrl}>
                                                        {ele[`${langType}Title`]}
                                                    </a>
                                                </h2>
                                                <span className="uppercase text-small">
                                                    <span className="icon-calender"></span>
                                                    <strong>{t('Publishedon')}:</strong> {common.getHtmlDate(ele?.createdAt)}
                                                </span>
                                                <p>
                                                    {ele[`${langType}Description`]}
                                                </p>
                                                {ele?.newsUpdateTypeName?.toUpperCase() === "EVENT" && <span className="uppercase text-small">
                                                    <span className="icon-calender" style={{ paddingRight: '5px' }}></span>
                                                    <strong>Event date:</strong> {common.getHtmlDate(ele?.eventDate)}
                                                </span>}
                                                <a title="View More" href="News&EventsDetailsPage.html" className="btn btn-primary">{t("readMore")}
                                                    <span className="icon-arrow-right" aria-hidden="true"></span>
                                                </a>
                                                {/* <div className="socialBox">
                                                    <ul>
                                                        <li><span className="icon-share share-on-gallery"></span></li>
                                                        <li><a href="https://www.facebook.com/sharer/sharer.php?u=#/dummy-news-4/&t=Dummy+News+4"
                                                            onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                            target="_blank" aria-label="Facebook opens a new window" title="Share on Facebook"><span className="icon-facebook"></span><span className="off-css">Share on Facebook</span></a></li>
                                                        <li>
                                                            <a href="https://twitter.com/share?url=#/dummy-news-4/&via=TWITTER_HANDLE&text=Dummy+News+4"
                                                                onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                                target="_blank" aria-label="Twitter opens a new window" title="Share on Twitter"><span className="icon-twitter"></span><span className="off-css">Share on Twitter</span></a>
                                                        </li>
                                                    </ul>
                                                </div> */}
                                            </div>
                                        </div>
                                    })
                                }

                                {/* <div className="col-4">
                                    <div className="pressRelese press-released">
                                        <div className="pressImage"><a href="#/dummy-news-3/"><LazyLoadImage effect='blur' src="https://cdn.s3waas.gov.in/s3c4ca4238a0b923820dcc509a6f75849b/uploads/bfi_thumb/2017061627-olwce8h19syposrehk8bcmxwdb3c2scya0rau8j9ek.jpg" alt="slider" /></a></div>
                                        <h2 className="heading3"><a href="#/dummy-news-3/">Dummy News 3</a></h2>
                                        <span className="uppercase text-small"><span className="icon-calender"></span> <strong>Published on:</strong> 25/07/2017  </span>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis&#8230;</p>
                                        <a title="View More" href="News&EventsDetailsPage.html" className="btn btn-primary">More <span className="icon-arrow-right" aria-hidden="true"></span></a>
                                        <div className="socialBox">
                                            <ul>

                                                <li><span className="icon-share share-on-gallery"></span></li>
                                                <li><a href="https://www.facebook.com/sharer/sharer.php?u=#/dummy-news-3/&t=Dummy+News+3"
                                                    onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                    target="_blank" aria-label="Facebook opens a new window" title="Share on Facebook"><span className="icon-facebook"></span><span className="off-css">Share on Facebook</span></a></li>
                                                <li>
                                                    <a href="https://twitter.com/share?url=#/dummy-news-3/&via=TWITTER_HANDLE&text=Dummy+News+3"
                                                        onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                        target="_blank" aria-label="Twitter opens a new window" title="Share on Twitter"><span className="icon-twitter"></span><span className="off-css">Share on Twitter</span></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="pressRelese press-released">
                                        <div className="pressImage"><a href="#/dummy-news-2/"><LazyLoadImage effect='blur' src="https://cdn.s3waas.gov.in/s3c4ca4238a0b923820dcc509a6f75849b/uploads/bfi_thumb/2017061633-olwce8h19syposrehk8bcmxwdb3c2scya0rau8j9ek.jpg" alt="3slier3" /></a></div>
                                        <h2 className="heading3"><a href="#/dummy-news-2/">Dummy News 2</a></h2>
                                        <span className="uppercase text-small"><span className="icon-calender"></span> <strong>Published on:</strong> 25/07/2017  </span>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis&#8230;</p>
                                        <a title="View More" href="News&EventsDetailsPage.html" className="btn btn-primary">More <span className="icon-arrow-right" aria-hidden="true"></span></a>
                                        <div className="socialBox">
                                            <ul>

                                                <li><span className="icon-share share-on-gallery"></span></li>
                                                <li><a href="https://www.facebook.com/sharer/sharer.php?u=#/dummy-news-2/&t=Dummy+News+2"
                                                    onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                    target="_blank" aria-label="Facebook opens a new window" title="Share on Facebook"><span className="icon-facebook"></span><span className="off-css">Share on Facebook</span></a></li>
                                                <li>
                                                    <a href="https://twitter.com/share?url=#/dummy-news-2/&via=TWITTER_HANDLE&text=Dummy+News+2"
                                                        onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                        target="_blank" aria-label="Twitter opens a new window" title="Share on Twitter"><span className="icon-twitter"></span><span className="off-css">Share on Twitter</span></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="pressRelese press-released">
                                        <div className="pressImage"><a href="#/dummy-news-1/"><LazyLoadImage effect='blur' src="https://cdn.s3waas.gov.in/s3c4ca4238a0b923820dcc509a6f75849b/uploads/bfi_thumb/2017072488-olwceacpnh1ac0oo6l1khmgtk2u2i6keya29ssgh24.jpg" alt="dfd" /></a></div>
                                        <h2 className="heading3"><a href="#/dummy-news-1/">Dummy News 1</a></h2>
                                        <span className="uppercase text-small"><span className="icon-calender"></span> <strong>Published on:</strong> 25/07/2017  </span>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis&#8230;</p>
                                        <a title="View More" href="News&EventsDetailsPage.html" className="btn btn-primary">More <span className="icon-arrow-right" aria-hidden="true"></span></a>
                                        <div className="socialBox">
                                            <ul>

                                                <li><span className="icon-share share-on-gallery"></span></li>
                                                <li><a href="https://www.facebook.com/sharer/sharer.php?u=#/dummy-news-1/&t=Dummy+News+1"
                                                    onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                    target="_blank" aria-label="Facebook opens a new window" title="Share on Facebook"><span className="icon-facebook"></span><span className="off-css">Share on Facebook</span></a></li>
                                                <li>
                                                    <a href="https://twitter.com/share?url=#/dummy-news-1/&via=TWITTER_HANDLE&text=Dummy+News+1"
                                                        onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                        target="_blank" aria-label="Twitter opens a new window" title="Share on Twitter"><span className="icon-twitter"></span><span className="off-css">Share on Twitter</span></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
