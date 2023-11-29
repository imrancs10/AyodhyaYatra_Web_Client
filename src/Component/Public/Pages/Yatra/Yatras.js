import React, { useEffect, useState, useRef } from 'react'
import BreadCrumb from '../../Common/BreadCrumb'
import { Link, useSearchParams } from 'react-router-dom';
import { Api } from '../../../../apis/Api';
import { apiUrls } from '../../../../apis/ApiUrls';
import '../../../../../node_modules/react-responsive-carousel/lib/styles/carousel.css'
import { common } from '../../../../utils/common';
import { useTranslation } from 'react-i18next';
import GalleryTile from '../../Common/GalleryTile';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Yatras() {
    var Carousel = require('react-responsive-carousel').Carousel;
    const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 })

    const sliderRef = useRef();
    const { t, i18n } = useTranslation();
    const selectedLang = i18n.language?.split('-')[0];
    const [searchParams] = useSearchParams();
    let yatraId = parseInt(searchParams.get("id"));
    yatraId = isNaN(yatraId) ? 0 : yatraId;

    const [templeList, setTempleList] = useState([]);
    const [yatraImage, setYatraImage] = useState([]);
    const [yatraDetails, setYatraDetails] = useState({});
    const [padavList, setPadavList] = useState([]);
    useEffect(() => {
        let apiList = [];
        apiList.push(Api.Get(apiUrls.templeController.getTempleByYatraId + yatraId + '?includeAllChildYatraTemple=true'));
        apiList.push(Api.Get(apiUrls.fileUploadController.getImageByModNameModId + `?moduleName=1&moduleId=${yatraId}&imageType=banner`));
        apiList.push(Api.Get(apiUrls.masterDataController.getPadavByYatraId + `/${yatraId}`));
        Api.MultiCall(apiList)
            .then(res => {
                setTempleList(res[0].data);
                setYatraImage(res[1].data);
                setYatraDetails(res[0].data[0]?.yatra);
                setPadavList(res[2].data);
            });
        //Get User Current location lat,lng
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function success(position) {
                setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
            });
        }
    }, [yatraId]);

    const hasPadav = () => {
        return padavList?.length > 0 && padavList[0]?.enPadavName?.toLowerCase() !== 'na';
    }
    const getSliderData = (setOf) => {
        setOf = setOf ?? 3;
        var data = (hasPadav() ? padavList.filter(x => x?.enPadavName?.toLowerCase() !== 'na') : templeList);
        var newData = [];
        var newDataIndex = -1;
        for (let index = 0; index < data.length; index++) {
            if (index % setOf === 0 || newDataIndex === -1) {
                newDataIndex++;
                newData[newDataIndex] = [];
            }
            newData[newDataIndex].push(data[index]);
        }
        return newData;
    }
    const getFirstTempleImage = () => {
        var data = (hasPadav() ? padavList : templeList);
        if (data?.length > 0) {
            return process.env.REACT_APP_API_URL + data[0]?.images[0]?.filePath;
        }
        return 'uploads\\2018\\01\\04.jpg'
    }

    const getHeading = () => {
        if (hasPadav()) {
            if (selectedLang === 'hi') {
                return <h2 className='inner-heading-title'>{padavList[0]?.hiYatraName + " " + t("Padavunder")}</h2>
            }
            else if (selectedLang === "en-US") {
                return <h2 className='inner-heading-title'>{t("Padavunder") + " " + padavList[0]?.enYatraName}</h2>
            }
            else return <h2 className='inner-heading-title'>{t("Padavunder") + " " + padavList[0]?.enYatraName}</h2>
        }
        else {
            if (selectedLang === 'hi') {
                return <h2 className='inner-heading-title'>{yatraDetails?.hiName + " " + t("Templesunder")}</h2>
            }
            else if (selectedLang === "en-US") {
                return <h2 className='inner-heading-title'>{t("Templesunder") + " " + yatraDetails?.enName}</h2>
            }
            else return <h2 className='inner-heading-title'>{t("Templesunder") + " " + yatraDetails?.enName}</h2>
        }
    }
    return (
        <>
            <div className="container">
                <div className="banner-section-box">
                    <LazyLoadImage effect='blur' width="100%" style={{ marginTop: '10px', maxHeight: '300px' }} height="auto" src={process.env.REACT_APP_API_URL + yatraImage[0]?.filePath} alt="" />
                    {/* <!--     </div> <div className="inbanner-Ashta"><div className="banner-inner-new"></div>--> */}

                    <BreadCrumb option={[{ name: t("yatraInKashi") }, { name: yatraDetails[`${selectedLang}Name`] }]}></BreadCrumb>
                    <div id="SkipContent" tabindex="-1"></div>

                    <div className="inbanner-Ashta-bottom" id="row-content">
                        <div className="container">
                            <h2 className="inner-heading-title mb-3" id="section2">
                                <span>
                                    {yatraDetails[`${selectedLang}Name`]}
                                </span>
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="innerwrap ashta-bharav">
                    <div className="container">
                        <div className="col-md-12">
                            <div className="row">
                                <div className='col-9'>
                                    <p style={{ textAlign: 'justify' }}>
                                        {hasPadav() ? padavList[0][`${selectedLang}Description`] : yatraDetails[`${selectedLang}Description`]}
                                    </p>
                                    {
                                        hasPadav() && <>
                                            <h6 style={{ marginLeft: '40px' }} className="inner-heading-title text-start mb-3" id="section2">
                                                <span>
                                                    {t('ListofPadavin', { yatraName: hasPadav() ? padavList[0][`${selectedLang}YatraName`] : yatraDetails[`${selectedLang}YatraName`] })}
                                                </span>
                                            </h6>
                                            <ul style={{ marginLeft: '40px' }}>
                                                {padavList?.map((res, index) => {
                                                    if (res?.enPadavName?.toLowerCase() !== 'na') {
                                                        return <li className='text-start' key={index}>
                                                            <Link to={`/padavdetails?padavId=${res.id}`}>
                                                                {res[`${selectedLang}PadavName`]}
                                                            </Link>
                                                        </li>
                                                    }
                                                    return;
                                                })}
                                            </ul>
                                        </>
                                    }
                                </div>
                                <div className='col-3'>
                                    <LazyLoadImage effect='blur' style={{ borderRadius: '16%', width: '200px', height: '200px', border: '4px solid #ff9c05', boxShadow: '3px 4px 15px 8px gray' }}
                                        alt='Yatra Banner'
                                        src={getFirstTempleImage()}></LazyLoadImage>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="pphead">
                            {getHeading()}
                        </div>
                        <div className="vc_row-full-width vc_clearfix"></div>
                        <Carousel
                            showArrows={true}
                            infiniteLoop={true}
                            showThumbs={true}
                            stopOnHover={true}
                            swipeable={true}
                            showStatus={true}
                            useKeyboardArrows={true}
                            selectedItem={0}
                            interval={parseInt(process.env.REACT_APP_CAROUSEL_INTERVAL)}
                            autoPlay={true}>
                            {
                                getSliderData(3).map((res, index) => {
                                    if (res?.enPadavName?.toLowerCase() !== 'na') {
                                        return <div key={index} style={{ width: '100%', height: '650px', overflowX: 'auto', overflowY: 'hidden', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            {
                                                res.map((inRes, InIndex) => {
                                                    return <GalleryTile
                                                        link={hasPadav() ? `/padavDetails?padavId=${inRes.id}` : `/temple?id=${inRes.id}`}
                                                        category={hasPadav() ? "padav" : "temple"}
                                                        imageHeight="250px"
                                                        imageWidth='100%'
                                                        activateLink={true}
                                                        data={inRes} key={InIndex}
                                                        tileWidth='90%'
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
                                                })
                                            }
                                        </div>
                                    }
                                    return
                                })
                            }
                        </Carousel>
                        <div className="vc_row-full-width vc_clearfix"></div>
                    </div>
                </div>
            </div>
        </>
    )
}
