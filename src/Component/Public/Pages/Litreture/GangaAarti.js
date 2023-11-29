import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import BreadCrumb from '../../Common/BreadCrumb'
import { Api } from '../../../../apis/Api';
import { apiUrls } from '../../../../apis/ApiUrls';
import { common } from '../../../../utils/common';
import '../../../../../node_modules/react-responsive-carousel/lib/styles/carousel.css'
import { useTranslation } from 'react-i18next';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function GangaAarti() {
    var Carousel = require('react-responsive-carousel').Carousel;
    const [ghatData, setGhatData] = useState([]);
    const [selectGhatData, setSelectGhatData] = useState({});
    const [bannerPath, setBannerPath] = useState("uploads/05.jpg");
    const [searchParams] = useSearchParams();
    const { t, i18n } = useTranslation();
    let ghatId = parseInt(searchParams.get("id"));
    ghatId = isNaN(ghatId) ? 0 : ghatId;

    const langType = i18n.language.split('-')[0];
    useEffect(() => {
        Api.Get(apiUrls.masterDataController.getMasterData + `?masterDataType=18`)
            .then(res => {
                setGhatData(res.data);
                if (res.data.length > 0) {
                    let banner = res.data[0].images.filter(x => x.imageType?.toLowerCase() === 'banner');
                    if (banner.length > 0) {
                        setBannerPath(banner[0].filePath);
                    }
                }
                var ghat = {};
                if (ghatId > 0) {
                    ghat = res.data?.find(x => x.id === ghatId);
                }
                else {
                    ghat = res.data[0];
                }
                setSelectGhatData(ghat);
            });
    }, []);

    const ChangeGhat = (id) => {
        var ghat = ghatData?.find(x => x.id === id);
        if (ghat !== undefined)
            setSelectGhatData({ ...ghat });
    }

    return (
        <>
            <section className="wrapper bodyWrapper">
                <div className="container">
                    <div className="banner-section-box">
                        <LazyLoadImage effect='blur' width="100%" height="auto" src={bannerPath} className="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" srcSet="uploads/kashi0.jpg" sizes="(max-width: 1366px) 100vw, 1366px" />
                    </div>
                    <div className="inbanner-Ashta">
                        <div className="banner-inner-new"></div>

                        <BreadCrumb option={[{ name: t('gangaAarti') }, { name: selectGhatData[`${langType}Name`] }]}></BreadCrumb>
                        <div id="SkipContent"></div>

                        <div className="inbanner-Ashta-bottom">
                            <div className="container">
                                <h2 className="inner-heading-title" id="section2">
                                    <span>
                                        {selectGhatData[`${langType}Name`]}
                                    </span>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="innerwrap ashta-bharav">
                        <div className="container">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className='col-6'>
                                        <p style={{ textAlign: 'justify' }}> {selectGhatData[`${langType}Description`]}</p>
                                        <h3 className='text-dark'>{t('listOfArtiInVaranasi')}</h3>
                                        <hr />
                                        <ul className="list" style={{ textAlign: 'left' }}>
                                            {
                                                ghatData?.map((res, index) => {
                                                    return <li key={index}>{selectGhatData[`${langType}Name`]}</li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className='col-6'>
                                        <div>
                                            <Carousel
                                                showArrows={true}
                                                infiniteLoop={true}
                                                showThumbs={false}
                                                stopOnHover={true}
                                                swipeable={true}
                                                autoPlay={true}
                                                interval={parseInt(process.env.REACT_APP_CAROUSEL_INTERVAL)}

                                            // onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}
                                            >
                                                {
                                                    selectGhatData?.images?.map((res, index) => {
                                                        return <div key={index}>
                                                            <LazyLoadImage effect='blur' style={{ height: '310px', width: '100%' }} src={process.env.REACT_APP_API_URL + res?.filePath} />
                                                            <p className="heading3 legend">{selectGhatData[`${langType}Name`]} </p>
                                                        </div>
                                                    })
                                                }
                                            </Carousel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="post-3371" className="post-3371 page type-page status-publish hentry">
                        <div className="pphead mt-3">
                            <h2>{t('GangaAartiinVaranasi')}</h2>
                        </div>
                        <div className="vc_row-full-width vc_clearfix"></div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="row thumbs_view" id="photoGallery5">
                                <div className="photoGallery4Inner equal-height thumbs_view touristContainer ">
                                    {
                                        ghatData?.map((ele, index) => {
                                            return <div key={index} onClick={e => ChangeGhat(ele.id)} className="photoGallery4Items" style={{ maxHeight: '400px' }}>
                                                <a title={ele?.enName} href="#" onClick={e => common.doNothing(e)} className="photoImgContainer">
                                                    <LazyLoadImage effect='blur' className="img-responsive ghat-img-responsive" src={process.env.REACT_APP_API_URL + ele?.images[0]?.filePath} alt={ele[`${langType}Name`]} />
                                                </a>
                                                <div className="photoTxtContainer">
                                                    <a title={ele?.enName} href="#" onClick={e => common.doNothing(e)} className="txtHeading">{ele[`${langType}Name`]}</a>
                                                    <div className="show-category">
                                                        <strong>{t('Category')}</strong>
                                                        <em className="fa fa-angle-right"></em>
                                                        <span>{t('gangaAarti')}</span>
                                                    </div>
                                                    <p>{selectGhatData[`${langType}Description`]}... {t('readMore')}</p>
                                                    <div className="shareGalleryContainer clearfix">
                                                        <span className="icon-share share-align"></span>

                                                        <a href="https://www.facebook.com/sharer/sharer.php?u=https://varanasi.nic.in/tourist-place/sarnath/&t=SARNATH"
                                                            onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                            target="_blank" aria-label="Facebook opens a new window" title="Share on Facebook"><span className="icon-facebook"></span><span className="off-css">Share on Facebook</span></a>

                                                        <a href="https://twitter.com/share?url=https://varanasi.nic.in/tourist-place/sarnath/&via=TWITTER_HANDLE&text=SARNATH"
                                                            onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                                            target="_blank" aria-label="Twitter opens a new window" title="Share on Twitter"><span className="icon-twitter"></span><span className="off-css">Share on Twitter</span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}