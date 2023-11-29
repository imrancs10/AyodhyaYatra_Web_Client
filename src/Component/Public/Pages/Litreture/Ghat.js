import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import BreadCrumb from '../../Common/BreadCrumb'
import { Api } from '../../../../apis/Api';
import { apiUrls } from '../../../../apis/ApiUrls';
import '../../../../../node_modules/react-responsive-carousel/lib/styles/carousel.css'
import { common } from '../../../../utils/common';
import { useTranslation } from 'react-i18next';
import GalleryTile from '../../Common/GalleryTile';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';


export default function Ghat() {
    const [ghatData, setGhatData] = useState([]);
    const [selectGhatData, setSelectGhatData] = useState({});
    const [bannerPath, setBannerPath] = useState("uploads/kashi0.jpg");
    const [readMoreId, setReadMoreId] = useState(0);
    const [searchParams] = useSearchParams();
    const { t, i18n } = useTranslation();
    let ghatId = parseInt(searchParams.get("id"));
    ghatId = isNaN(ghatId) ? 0 : ghatId;
    var Carousel = require('react-responsive-carousel').Carousel;
    const langType = i18n.language.split('-')[0];
    useEffect(() => {
        Api.Get(apiUrls.masterDataController.getMasterData + `?masterDataType=2`)
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
        if (ghat !== undefined) {
            setSelectGhatData({ ...ghat });
        }
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

                        <BreadCrumb option={[{ name: t('ghat') }, { name: selectGhatData[`${langType}Name`] }]}></BreadCrumb>
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
                                        <h3 className='text-dark'>{t('listOfGhatInVaranasi')}</h3>
                                        <hr />
                                        <ol className="list" style={{ textAlign: 'left' }}>
                                            {
                                                ghatData?.map((res, index) => {
                                                    return <li className={res?.id === selectGhatData?.id ? 'ghat-list active' : "ghat-list"} onClick={e => ChangeGhat(res?.id)} key={index}>{i18n.language === "hi-IN" ? res.hiName : res.enName}</li>
                                                })
                                            }
                                        </ol>
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
                            <h2>{t('GhatsinVaranasi')}</h2>
                        </div>
                        <div className="vc_row-full-width vc_clearfix"></div>
                    </div>

                </div>

            </section>
            <div className='row'>
                {
                    ghatData?.map((res, index) => {
                        return <GalleryTile onClickHandler={ChangeGhat} data={res} category="ghat" link={`#/TouristGuideDetails?masterDataId=${res?.id}`} key={index} moveTopOnClick={true} scrollPosition={500}/>
                    })
                }
            </div>
        </>
    )
}
