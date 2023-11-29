import React, { useEffect, useState, useRef } from 'react'
import BreadCrumb from '../../Common/BreadCrumb'
import { Link, useSearchParams } from 'react-router-dom';
import { Api } from '../../../../apis/Api';
import { apiUrls } from '../../../../apis/ApiUrls';
import '../../../../../node_modules/react-responsive-carousel/lib/styles/carousel.css'
import { useTranslation } from 'react-i18next';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { common } from '../../../../utils/common';

require('flexslider');
export default function Temple() {
    var Carousel = require('react-responsive-carousel').Carousel;
    const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 })
    const [searchParams] = useSearchParams();
    let templeId = parseInt(searchParams.get("id"));
    if (templeId == undefined || templeId == null || templeId == 0 || isNaN(templeId)) {
        templeId = searchParams.get("TempleId");
    }
    //templeId = isNaN(templeId) ? 0 : templeId;
    const { t, i18n } = useTranslation();
    const langType = i18n.language.split('-')[0];
    let sliderRef = useRef();
    const [templeDetails, setTempleDetails] = useState({});
    const setRef = (ref) => {
        sliderRef = ref;
    };
    useEffect(() => {
        Api.Get(apiUrls.templeController.getTempleByIdOrbarcodeId + `/${templeId}`)
            .then(res => {
                setTempleDetails(res.data);
            });
        //Get User Current location lat,lng
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function success(position) {
                setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
            });
        }
    }, [templeId]);


    return (
        <>
            <div className="wrapper banner-wrapper innerBanner">
                <LazyLoadImage effect='blur' src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
            </div>

            <section className="wrapper bodyWrapper">
                <div className="container">

                    <div className='row px-4'>
                        <div className='col-12'>
                            <BreadCrumb option={[{ name: t('temple') }, { name: templeDetails[`${langType}Name`] }]}></BreadCrumb>
                        </div>
                        <div className='col-12'>
                            <h1 className='inner-heading-title'>{templeDetails[`${langType}Name`]} {t('temple')}</h1>
                        </div>
                    </div>
                    <div className="row px-4">
                        <div className="col-12">
                            <div className="show-category inner-heading-title px-3">
                                <strong>{t('Category')}</strong>
                                <em className="fa fa-angle-right"></em>
                                <span>{t('religious')}</span></div>
                        </div>
                        <div className="col-6">
                            <p className='text-justify'>{templeDetails[`${langType}Description`]}</p>
                            <h2 className="heading3 text-dark">{t('ContactDetails')}</h2>
                            <p><strong>{t('Address')} </strong> {t('RegionalTouristOffice')} </p>
                            <p>
                                <strong>{t('Website')} </strong>
                                <a href={templeDetails?.templeURL}
                                    className="word-break">{templeDetails?.templeURL !== "" && templeDetails?.templeURL !== undefined ? templeDetails?.templeURL : t('ThisTempledoesnothavewebsite')}</a>
                            </p>
                            <p>
                                <strong>{t('location')}: </strong>
                                <a href={`https://www.google.com/maps/dir/${templeDetails?.latitude} N,${templeDetails?.longitude} E`} target="_blank"><i
                                    className="fa fa-location-arrow"></i> {t('map')}</a>
                            </p>
                            <br />
                            <div className='row py-4'>
                                <div className='col-12'>
                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <Link className="btn btn-warning" to='/TouristGuideByMap?showFull=1'>{t('tgbm')}</Link>
                                        <Link className="btn btn-success" to={`/Temple360Gallery?id=${templeId}`}>{t('360Gallery')}</Link>
                                        <Link className="btn btn-primary" to={`/VideoGallery?id=${templeId}`}>{t('360VideoGallery')}</Link>
                                        <Link className="btn btn-danger" target='_blank' to={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${templeDetails?.latitude},${templeDetails?.longitude}`}><i className="fa fa-location-arrow"></i> {t('navigate')}</Link>


                                    </div>
                                </div>
                            </div>
                            <p>
                                <h2 className="heading3 text-dark">{t('PhotoGallery')}</h2>
                            </p>
                            <div id="photoGallery4 clearfix">
                                <div className="galleryMeta clearfix">

                                </div>
                                <div id="slider" className="flexslider single-turistplc-glry" ref={setRef}>
                                    {templeDetails?.images?.length === 0 && <div className='no-temple-image'>
                                        {t('Templeimagesarenotavailable')}
                                    </div>}
                                    {templeDetails?.images?.length > 0 && <Carousel
                                        showArrows={true}
                                        infiniteLoop={true}
                                        showThumbs={false}
                                        stopOnHover={true}
                                        swipeable={true}
                                        interval={parseInt(process.env.REACT_APP_CAROUSEL_INTERVAL)}
                                        autoPlay={true}>
                                        {templeDetails?.images?.map((res, index) => {
                                            return <div key={index} style={{ display: 'block' }}>
                                                <LazyLoadImage effect='blur' style={{ height: '300px' }} src={`${process.env.REACT_APP_BASE_URL}/api/${res?.filePath}`} />
                                                <div className="slide-caption">
                                                    {templeDetails[`${langType}Name`]}
                                                </div>
                                            </div>
                                        })
                                        }
                                    </Carousel>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className='text-center'>
                                <h4>{t('howToReach')}:</h4>
                            </div>
                            <div className="separator5"></div>
                            <div className="reachContainer clearfix">
                                <div className="iconContainer">
                                    <span className="icon-aeroplane iconColor"></span>
                                </div>
                                <div className="txtContainer">
                                    <h4 className='inner-heading-title'>{t('byAir')}</h4>
                                    <p style={{ textAlign: 'justify' }}>{t('byAirDetail')}</p>
                                </div>
                            </div>
                            <div className="reachContainer clearfix">
                                <div className="iconContainer">
                                    <span className="icon-train iconColor2"></span>
                                </div>
                                <div className="txtContainer">
                                    <h4 className='inner-heading-title'>{t('byTrain')}</h4>
                                    <p style={{ textAlign: 'justify' }}>{t('byTrainDetail')}</p>
                                </div>
                            </div>
                            <div className="reachContainer clearfix">
                                <div className="iconContainer">
                                    <span className="icon-bus iconColor3"></span>
                                </div>
                                <div className="txtContainer">
                                    <h4 className='inner-heading-title'>{t('byRoad')}</h4>
                                    <p style={{ textAlign: 'justify' }}>{t('byRoadDetail')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
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
