import React, { useEffect, useState, useRef } from 'react'
import BreadCrumb from '../../Common/BreadCrumb'
import { Link, useSearchParams } from 'react-router-dom';
import { Api } from '../../../../apis/Api';
import { apiUrls } from '../../../../apis/ApiUrls';
import '../../../../../node_modules/react-responsive-carousel/lib/styles/carousel.css'
import { common } from '../../../../utils/common';
import { useTranslation } from 'react-i18next';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import GalleryTile from '../../Common/GalleryTile';

export default function PadavDetails() {
    var Carousel = require('react-responsive-carousel').Carousel;
    const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 })
    const [searchParams] = useSearchParams();
    let padavId = parseInt(searchParams.get("padavId"));
    padavId = isNaN(padavId) ? 0 : padavId;
    const [padavDetails, setPadavDetails] = useState({});
    const [templeDetails, setTempleDetails] = useState([])
    const { t, i18n } = useTranslation();
const langType=i18n.language.split('-')[0];
    useEffect(() => {
        var apiList = [];
        apiList.push(Api.Get(apiUrls.masterDataController.getPadavById + `/${padavId}`));
        apiList.push(Api.Get(apiUrls.templeController.getTempleByPadavId + `${padavId}`))
        Api.MultiCall(apiList)
            .then(res => {
                setPadavDetails(res[0].data);
                setTempleDetails(res[1].data);
            });
             //Get User Current location lat,lng
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function success(position) {
                setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
            });
        }
    }, [padavId]);

    const getSliderData = (setOf) => {
        setOf = setOf ?? 3;
        var newData = [];
        var newDataIndex = -1;
        for (let index = 0; index < templeDetails?.length; index++) {
            if (index % setOf === 0 || newDataIndex === -1) {
                newDataIndex++;
                newData[newDataIndex] = [];
            }
            newData[newDataIndex].push(templeDetails[index]);
        }
        return newData;
    }

    return (
        <>
            <div className="wrapper banner-wrapper innerBanner">
                <LazyLoadImage effect='blur' src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
            </div>
            <div className='row px-4'>
                <div className='col-12'>
                    <BreadCrumb option={[{ name: t("Padav") }, { name: padavDetails[`${langType}YatraName`] }, { name: padavDetails[`${langType}PadavName`] }]}></BreadCrumb>
                </div>
                <div className="col-12">
                    <h1 className='inner-heading-title'>{padavDetails[`${langType}PadavName`]}</h1>
                </div>
            </div>

            <section className="wrapper bodyWrapper">
                <div className="container">

                    <div id="SkipContent"></div>
                    <div className="row">
                        <div className="">
                            <div className="heading-single-direc-btn">

                            </div>
                            <div className="col-12">
                                <div className="show-category inner-heading-title px-3">
                                    <strong>{t('Category')}</strong>
                                    <em className="fa fa-angle-right"></em>
                                    <span>{t('Padav')}</span></div>
                            </div>
                            <div className="col-12">
                                <p className='text-justify'>{i18n.language === "hi-IN" ? padavDetails?.hiDescription : padavDetails?.enDescription}</p>
                                <br />
                            </div>
                            <div className='col-12'>
                                <div className="vc_row-full-width vc_clearfix"></div>
                                <div id="photoGallery4 clearfix">
                                    <div className="galleryMeta clearfix">
                                        <h2 className="pull-left heading3 text-dark">{t('PhotoGallery')}</h2>
                                    </div>
                                    <div id="slider" className="flexslider single-turistplc-glry">

                                        <Carousel
                                            showArrows={true}
                                            infiniteLoop={true}
                                            showThumbs={false}
                                            stopOnHover={true}
                                            swipeable={true}
                                            interval={parseInt(process.env.REACT_APP_CAROUSEL_INTERVAL)}
                                            autoPlay={true}>
                                            {
                                                getSliderData(3).map((res, index) => {
                                                    return <div key={index} style={{ width: '100%', overflowX: 'auto', overflowY: 'hidden', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                        {
                                                            res.map((inRes, InIndex) => {
                                                                return <GalleryTile 
                                                                data={inRes} 
                                                                link={`/temple?id=${inRes.id}`} 
                                                                key={InIndex}   
                                                                category="temple" 
                                                                imageHeight="250px"
                                                                imageWidth='100%'  
                                                                tileWidth='90%'
                                                                activateLink={true}
                                                                buttons={[
                                                                    {
                                                                        link: `/TouristGuideByMap?showFull=1`, text: "tgbm"
                                                                    },
                                                                    {
                                                                        link: `/Temple360Gallery?id=${inRes?.id}`, text: "360Gallery"
                                                                    },
                                                                    {
                                                                        link: `/VideoGallery?id=${inRes?.id}`, text: "360VideoGallery"
                                                                    },
                                                                    {
                                                                      target:'_blank',  link: `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${inRes?.latitude},${inRes?.longitude}`, text: "Navigate"
                                                                    }
                                                                ]}></GalleryTile>
                                                                // return <div key={InIndex} className="photoGallery4Items">
                                                                //     <a title="Click here to see more details" href onClick={e => common.doNothing(e)} className="photoImgContainer">
                                                                //         <LazyLoadImage effect='blur' className="img-responsive img-height" src={process.env.REACT_APP_API_URL + inRes?.images[0]?.filePath} alt={inRes?.enName} draggable="false" />
                                                                //     </a>
                                                                //     <div className="photoTxtContainer">
                                                                //         <a title="Click here to see more details" href onClick={e => common.doNothing(e)} className="txtHeading"><center><Link to={`/temple?id=${inRes.id}`}>{i18n.language === "hi-IN" ? inRes?.hiName : inRes?.enName}</Link></center></a>
                                                                //         <div className="show-category" href onClick={e => common.doNothing(e)}><strong>{t('Category')}</strong> <em className="fa fa-angle-right"></em> <span>{t('ReligiousTemple')}</span></div>

                                                                //         <p style={{ padding: '0 8px', textAlign: 'justify' }}>{i18n.language === "hi-IN" ? inRes?.hiDescription.substr(0, 150) : inRes?.enDescription.substr(0, 150)} ....<Link to={`/temple?id=${inRes.id}`}>{t('readMore')}</Link></p>
                                                                //         <div className="shareGalleryContainer clearfix">
                                                                //             <p style={{ marginLeft: '10%', marginRight: '10%' }}>
                                                                //                 <Link to="/TouristGuideByMap?showFull=1">
                                                                //                     <button className="btn btn-block uppercase btn-primary btn-black" href="touristGuidebyMap.html"><span className="icon-map-location"></span> {t('tgbm')}</button>
                                                                //                 </Link>
                                                                //                 <Link to="/TouristGuideByMap?showFull=1">
                                                                //                     <button className="btn btn-block uppercase btn-primary btn-black" href onClick={e => common.doNothing(e)}><span className="icon-supply"></span> {t('360Gallery')}</button>
                                                                //                 </Link>
                                                                //             </p>

                                                                //         </div>
                                                                //     </div>
                                                                // </div>
                                                            })
                                                        }
                                                    </div>
                                                })
                                            }
                                        </Carousel>
                                    </div>
                                </div>

                                <div className="vc_row-full-width vc_clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
