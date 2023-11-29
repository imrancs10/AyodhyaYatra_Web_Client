import React, { useEffect, useState, useRef } from 'react'
import BreadCrumb from '../../Common/BreadCrumb'
import { useSearchParams } from 'react-router-dom';
import { Api } from '../../../../apis/Api';
import { apiUrls } from '../../../../apis/ApiUrls';
import '../../../../../node_modules/react-responsive-carousel/lib/styles/carousel.css'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'react-i18next';
import { common } from '../../../../utils/common';

export default function TouristGuideDetails() {
    const { t, i18n } = useTranslation();
    var Carousel = require('react-responsive-carousel').Carousel;
    const langType = i18n.language.split("-")[0];
    const [searchParams] = useSearchParams();
    let masterDataId = parseInt(searchParams.get("masterDataId"));
    masterDataId = isNaN(masterDataId) ? 0 : masterDataId;
    let sliderRef = useRef();
    const [masterDataDetails, setMasterDataDetails] = useState({});
    const setRef = (ref) => {
        sliderRef = ref;
    };
    useEffect(() => {
        Api.Get(apiUrls.masterDataController.getMasterDataById + `${masterDataId}`)
            .then(res => {
                setMasterDataDetails(res.data);
            });
    }, [masterDataId]);


    return (
        <>
            <div className="wrapper banner-wrapper innerBanner">
                <LazyLoadImage effect='blur' src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
            </div>
            <div className='row px-4'>
                <div className='col-12'>
                    <BreadCrumb option={[{ name: masterDataDetails?.masterDataTypeName }, { name: masterDataDetails[`${langType}Name`] }]}></BreadCrumb>
                </div>
                <div className='col-12'>
                    <h1 className='inner-heading-title'>{masterDataDetails[`${langType}Name`]}</h1>
                </div>
            </div>
            <section className="wrapper bodyWrapper">
                <div className="container">
                    <div className="row px-4">
                        <div className="">
                            <div className="col-12">
                                <div className="show-category inner-heading-title px-3">
                                    <strong>{t('category')}</strong>
                                    <em className="fa fa-angle-right"></em>
                                    <span>{t(masterDataDetails?.masterDataTypeName)}</span></div>
                            </div>
                            <div className="col-12">
                                <p className='text-justify'>{masterDataDetails[`${langType}Description`]}</p>
                                <p>
                                    <strong className='p-3'>{t('location')}: </strong>
                                    <a
                                        href={`https://www.google.com/maps/dir/${masterDataDetails?.latitude} N,${masterDataDetails?.longitude} E`} target="_blank"><i
                                            className="fa fa-location-arrow"></i> {t('map')}</a>
                                </p>
                                <br />
                            </div>
                            <div className='col-12'>
                                <div id="photoGallery4 clearfix">
                                    <div className="galleryMeta clearfix">
                                        <h2 className="pull-left heading3 text-dark">{t('photoGallery')}</h2>
                                    </div>
                                    <div id="slider" className="flexslider single-turistplc-glry" ref={setRef}>
                                        {masterDataDetails?.images?.length === 0 && <div className='no-temple-image'>
                                            {masterDataDetails[`${langType}Name`]} {t('imageNotAvailable')}
                                        </div>}
                                        {masterDataDetails?.images?.length > 0 && <Carousel
                                            showArrows={true}
                                            interval={parseInt(process.env.REACT_APP_CAROUSEL_INTERVAL)}
                                            infiniteLoop={true}
                                            showThumbs={false}
                                            stopOnHover={true}
                                            swipeable={true}
                                            autoPlay={true}>
                                            {masterDataDetails?.images?.map((res, index) => {
                                                return <div key={index} style={{ display: 'block' }}>
                                                    <LazyLoadImage effect='blur' style={{ height: '500px' }} src={`${process.env.REACT_APP_BASE_URL}/api/${res?.filePath}`} />
                                                    <div className="slide-caption">
                                                        {masterDataDetails[`${langType}Name`]}
                                                    </div>
                                                </div>
                                            })
                                            }
                                        </Carousel>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

const loadScript = (src) =>
    new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"`)) return resolve()
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = (err) => reject(err)
        document.body.appendChild(script)
    });
const callScript = (url) => {
    const src = url
    loadScript(src)
        .then(() => {
            /*global google*/
            // console.log("Load script google: ", google)
        })
        .catch(console.error)
}
