import { Link } from 'react-router-dom'
import '../../../../../node_modules/react-responsive-carousel/lib/styles/carousel.css'
import React, { useState, useEffect } from 'react'
import $ from 'jquery';
import { Api } from '../../../../apis/Api';
import { apiUrls } from '../../../../apis/ApiUrls';
import { common } from '../../../../utils/common';
import { useTranslation } from 'react-i18next';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
window.jQuery = window.$ = $;
export default function Home() {
    const { t, i18n } = useTranslation();
    const langType = i18n.language.split('-')[0];
    var Carousel = require('react-responsive-carousel').Carousel;
    const [newsUpdateData, setNewsUpdateData] = useState([]);

    useEffect(() => {
        Api.Get(apiUrls.newsUpdateController.getNewsUpdate)
            .then(res => {
                //setNewsUpdateData(res.data);
            });
    }, []);

    const getEventsData = (all) => {
        if (all === true)
            return newsUpdateData?.filter(x => x?.newsUpdateTypeName?.toLowerCase() === 'event');
        else
            return newsUpdateData?.filter(x => x?.newsUpdateTypeName?.toLowerCase() === 'event' && new Date(x?.eventDate) >= new Date());
    }

    $(document).ready(function () {
        $(".tabassign1").easyResponsiveTabs({
            type: "default",
            width: "auto",
            fit: !0,
            tabidentify: "hor_1",
            activate: function (e) {
                var t = $(this),
                    i = $("#nested-tabInfo"),
                    o = $("span", i);
                o.text(t.text());
                i.show();
            }
        })

        if ($(window).innerWidth() >= 640) {
            $('h2.resp-accordion').remove()
        }

        //=========================
        $('.thumb-bottom-scroll').flexslider({
            animation: "fade",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            sync: ".thumb-bottom-crucel"
        });

        $('.thumb-bottom-crucel').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            itemWidth: 210,
            asNavFor: ".thumb-bottom-scroll"
        });
        //=========================

        $('.thumb-bottom').flexslider({
            animation: "fade",
            pausePlay: true,
            pauseText: "",
            playText: "",
            controlNav: "thumbnails",
            start: function (slider) {
                $('body').removeClass('loading');
            }
        });
        //=========================
        $('.no-thumb , .basic_slider').flexslider({
            animation: "slide",
            controlNav: false,
            start: function (slider) {
                $('body').removeClass('loading');
            }
        });
        //=========================
        $('.thumb-right').flexslider({
            animation: "fade",
            pausePlay: true,
            pauseText: "",
            playText: "",
            controlNav: "thumbnails",
            start: function (slider) {
                $('body').removeClass('loading');

            }
        });
        //=========================
        $('.thumb-left').flexslider({
            animation: "fade",
            pausePlay: true,
            pauseText: "",
            playText: "",
            controlNav: "thumbnails",
            start: function (slider) {
                $('body').removeClass('loading');
            }
        });

        //=========================

        //Main slider components start
        $(".full-cntrl-center-caption-blank").flexslider({
            animation: "slide",
            directionNav: true,
            prevText: "Previous",
            nextText: "<span className='hide'>Next</span>",
            prevText: "<span className='hide'>Previous</span>",
            pausePlay: true,
            pauseText: "<span className='hide'>Pause</span>",
            playText: "<span className='hide'>Play</span>",
            controlNav: true
        });
        $('.photo-glry-cntr .flex-direction-nav').remove();

        $("#footerScrollbar").flexslider({
            animation: "slide",
            animationLoop: true,
            itemWidth: 201,
            minItems: 2,
            slideshow: 1,
            move: 1,
            controlNav: false,
            pausePlay: true,
            prevText: "<span className='hide'>Previous</span>",
            nextText: "<span className='hide'>Next</span>",
            pauseText: "<span className='hide'>Pause</span>",
            playText: "<span className='hide'>Play</span>",
        });


        $('.home-slider').flexslider({
            animation: ($('body').hasClass('rtl')) ? "fade" : "slide",
            directionNav: true,
            prevText: "<span className='hide'>Previous</span>",
            nextText: "<span className='hide'>Next</span>",
            pausePlay: true,
            pauseText: "<span className='hide'>Pause</span>",
            playText: "<span className='hide'>Play</span>",
            controlNav: false,
            start: function (slider) {
                $('body').find('.flexslider').resize();
                if (slider.count == 1) {
                    slider.pausePlay.parent().remove();
                }
                $('.home-slider ul.slides li.clone a').each(function () {
                    $(this).replaceWith($(this).html());
                })
            }
        })
    });



    // forward/Back controls
    const plusSlides = (n) => {
        SlideShow((slidePosition += n));
    }

    //  images controls
    const currentSlide = (n) => {
        SlideShow((slidePosition = n));
    }

    const SlideShow = (n) => {
        var i;
        var slides = document.getElementsByClassName("carousel-box");
        var circles = document.getElementsByClassName("dot");
        if (slides.length === 0)
            return;
        if (n > slides.length) {
            slidePosition = 1;
        }
        if (n < 1) {
            slidePosition = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < circles.length; i++) {
            circles[i].className = circles[i].className.replace(" dot--fill", "");
        }
        slides[slidePosition - 1].style.display = "block";
        circles[slidePosition - 1].className += " dot--fill";
    }
    var slidePosition = 1;
    SlideShow(slidePosition);

    const toggleTabs = (e, tabId, contentContainerClass) => {
        e.preventDefault();
        e.target.parentElement.parentElement.childNodes.forEach(res => {
            res.classList.remove('resp-tab-active')
        });
        e.target.parentElement.classList.add('resp-tab-active');

        var containers = document.querySelectorAll(`.${contentContainerClass} .resp-tab-content`);

        containers.forEach(res => {
            res.classList.remove('resp-tab-content-active');
        });
        document.getElementById(tabId).classList.add('resp-tab-content-active');

    }

    const horzontalToggleTabs = (e, tabId, contentContainerClass) => {
        e.preventDefault();
        e.target.parentElement.parentElement.parentElement.childNodes.forEach(res => {
            res.classList.remove('vc_active')
        });
        e.target.parentElement.parentElement.classList.add('vc_active');

        var containers = document.querySelectorAll(`.${contentContainerClass} .vc_tta-panel`);

        containers.forEach(res => {
            res.classList.remove('vc_active');
        });
        document.getElementById(tabId).classList.add('vc_active');

    }

    return (
        <main>
            <div className="wrapper bodyWrapper no_padding">
                <div className="container home-2">
                    <div id="SkipContent" tabIndex="-1"></div>
                    <div className="row" id="row-content" style={{ margin: 0 }}>
                        <div className='col-12'>
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
                                <div>
                                    <LazyLoadImage effect='blur' src="uploads/03.jpg" />
                                    <p className="heading3 legend">{t("welcomToKashi")}</p>
                                </div>
                                <div>
                                    <LazyLoadImage effect='blur' src="uploads/02.jpg" />
                                    <p className="heading3 legend">{t("welcomToKashi")}</p>
                                </div>
                                <div>
                                    <LazyLoadImage effect='blur' src="uploads/01.jpg" />
                                    <p className="heading3 legend">{t("welcomToKashi")}</p>
                                </div>
                                <div>
                                    <LazyLoadImage effect='blur' src="uploads/03.jpg" />
                                    <p className="heading3 legend">{t("welcomToKashi")}</p>
                                </div>
                                <div>
                                    <LazyLoadImage effect='blur' src="uploads/02.jpg" />
                                    <p className="heading3 legend">{t("welcomToKashi")}</p>
                                </div>
                                <div>
                                    <LazyLoadImage effect='blur' src="uploads/01.jpg" />
                                    <p className="heading3 legend">{t("welcomToKashi")}</p>
                                </div>
                            </Carousel>
                        </div>
                        <div className="col-12">
                            <div id="post-3371" className="post-3371 page type-page status-publish hentry">


                                <div className="vc_row-full-width vc_clearfix"></div>

                                <div className="vc_row wpb_row vc_row-fluid" style={{ marginTop: '2em' }}>
                                    <div className="wpb_column vc_column_container vc_col-sm-8">
                                        <div className="vc_column-inner vc_custom_1516181017591">
                                            <div className="wpb_wrapper">
                                                <div className="gen-list no-border no-bg padding-0 border-radius-none small-icon-list info-list-margin  normal-font ">
                                                    <h2 className='text-start'>{t("overviewOfKashi")} </h2>
                                                    <ul>
                                                        <p style={{ textAlign: 'justify' }}>
                                                            {t("overviewOfKashiDetails")}
                                                        </p>
                                                        <p>
                                                            <button className="btn btn-block uppercase btn-primary btn-black"><Link to='/AboutKashiYatra'>{t("readMore")} </Link></button>
                                                        </p>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wpb_column vc_column_container vc_col-sm-4">
                                        <div className="vc_column-inner vc_custom_1516181017591">
                                            <div className="wpb_wrapper">
                                                <div className="gen-list no-border no-bg padding-0 border-radius-none small-icon-list info-list-margin  normal-font ">
                                                    <div className="box boxBorder">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <LazyLoadImage effect='blur' decoding="async" className="poststyle2" src="uploads/pm.jpg" alt="" />
                                                            </div>
                                                            <div className="col-6">
                                                                <h5 className='text-start' style={{ whiteSpace: 'nowrap' }}>{t("shri")}  {t("pmName")} </h5>
                                                                <p className='text-start'>
                                                                    {t("honble")}  {t("prime")}  {t("minister")} , {t("india")}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="hr"> </div>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <LazyLoadImage effect='blur' decoding="async" className="poststyle2" src="uploads/cm.jpg" alt="" />
                                                            </div>
                                                            <div className="col-6">
                                                                <h5 className='text-start' style={{ whiteSpace: 'nowrap' }}>{t("shri")}  {t("cmName")}  </h5>
                                                                <p className='text-start'>
                                                                    {t("honble")}  {t("chief")}  {t("minister")} , {t("uttarPradesh")}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <iframe width="700" height="450" src="https://www.airpano.com/embed.php?3D=india_varanasi" frameBorder="0" marginHeight="0" marginWidth="0" scrolling="no" framespacing="0" allowFullScreen> </iframe>
                                <div className="vc_row wpb_row vc_row-fluid">
                                    <div className="wpb_column vc_column_container vc_col-sm-3">
                                        <div className="vc_column-inner ">
                                            <div className="wpb_wrapper">
                                                <div className="wpb_raw_code wpb_content_element wpb_raw_html vc_custom_1517553215754">
                                                    <div className="wpb_wrapper">
                                                        <div className="tourist-guide tourist-guideee cover-box" style={{ width: '100%' }}>
                                                            <h3 style={{ color: "black" }}> {t("touristGuide")}</h3>
                                                            <div className="tourist-guideContainer clearfix" style={{ border: '2px solid #ccc', height: '304px', overflow: 'hidden' }}>
                                                                <div className="tourContainerLeft">
                                                                    <ul className="list-style-arrow-long text-start">
                                                                        <li><Link to="/TouristGuideByMap?showFull=1">{t("howToReach")}</Link></li>
                                                                        <li><a href="#">{t("accomodation")}</a></li>
                                                                        <li><a href="#">{t("placesOfInterest")}</a></li>
                                                                        <li><a href="#">{t("adventures")}</a></li>
                                                                        <li><a href="#">{t("tourist")} {t("packages")}</a></li>
                                                                        <li><a href="#">{t("tourist")} {t("places")}</a></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="tourContainerRight">
                                                                    <iframe sandbox="allow-scripts allow-popups allow-forms allow-same-origin " src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115408.23982810127!2d82.92106861019738!3d25.320746099847305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db76febcf4d%3A0x68131710853ff0b5!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1681876759490!5m2!1sen!2sin" height="450" style={{ border: '0' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="District Map"></iframe>
                                                                    {/* <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d70074.39256812217!2d88.33573408092118!3d22.62276305366848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1492088230288" width="100%" height="300" frameborder="0" style={{border:0" allowFullScreen=""></iframe> --> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div><div className="find-services-tab wpb_column vc_column_container vc_col-sm-6">
                                        <div className="vc_column-inner vc_custom_1516181007844">
                                            <div className="wpb_wrapper">
                                                <h2 className="heading3" style={{ color: "black" }}>{t("find")} {t("services")}</h2>
                                                <div className="tabassign1 gen-tab tab-vertical no-bg " style={{ display: 'block', width: '100%', margin: '0px' }}>
                                                    <ul className="resp-tabs-list hor_1">
                                                        <li data-tab-id="certificates" className="resp-tab-item hor_1 resp-tab-active" aria-controls="hor_1_tab_item-0" role="tab" style={{ backgroundColor: 'white', borderColor: 'rgb(193, 193, 193)' }}>
                                                            <a href="#attractions" onClick={e => toggleTabs(e, 'attractions', 'find-serivce')}>
                                                                <span className="icon-certificate"></span>{t("tourist")} {t("attractions")}
                                                            </a>
                                                        </li>
                                                        <li data-tab-id="supply" className="resp-tab-item hor_1" aria-controls="hor_1_tab_item-1" role="tab" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
                                                            <a href="#services" onClick={e => toggleTabs(e, 'services', 'find-serivce')}><span className="icon-supply"></span>{t("book")} {t("services")}</a>
                                                        </li>
                                                        <li data-tab-id="magisterial" className="resp-tab-item hor_1" aria-controls="hor_1_tab_item-2" role="tab" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
                                                            <a href="#nearby" onClick={e => toggleTabs(e, 'nearby', 'find-serivce')}><span className="icon-magisterial"></span>{t("nearby")} {t("places")}</a>
                                                        </li>
                                                    </ul>
                                                    <div className="find-serivce resp-tabs-container hor_1" style={{ borderColor: 'rgb(193, 193, 193)' }}>
                                                        <div id="attractions" className="resp-tab-content hor_1 resp-tab-content-active" aria-labelledby="hor_1_tab_item-0">
                                                            {/* <!--h4></h4--> */}
                                                            <ul className="list-style">
                                                                <li><Link to='/TouristGuideDetails?masterDataId=17'>{t("kashi")} {t("vishwanath")} {t("temple")}</Link></li>
                                                                <li><Link to='/TouristGuideDetails?masterDataId=19'>{t("banarasHindu")} {t("university")}</Link></li>
                                                                <li><Link to='/TouristGuideDetails?masterDataId=18'>{t("sarnath")}</Link></li>
                                                                <li><Link to='/TouristGuide?masterDataType=2&masterDataType=18&heading=Ghat%20and%20Ganga%20Aarti'>{t("ghatsOfKashi")}</Link></li>
                                                                <li><Link to='/temple?id=591'>{t("sankatmochan")}  {t("temple")}</Link></li>
                                                            </ul>
                                                        </div>
                                                        <div id="services" className="resp-tab-content hor_1" aria-labelledby="hor_1_tab_item-1" style={{ borderColor: 'rgb(193, 193, 193)' }}>
                                                            {/* <!--h4></h4--> */}
                                                            <ul className="list-style">
                                                                <li><Link to='https://www.upstdc.co.in/Booking/HotelBooking' target='_blank'>{t("book")} {t("hotel")}</Link></li>
                                                                <li><Link to='https://www.makemytrip.com/car-rental/varanasi-city-cabs.html' target='_blank'>{t("rentACab")}</Link></li>
                                                                <li><Link to='https://booknaav.com/' target='_blank'>{t("boat")} {t("safari")}</Link></li>
                                                            </ul>
                                                        </div>
                                                        <div id="nearby" className="resp-tab-content hor_1" aria-labelledby="hor_1_tab_item-2" style={{ borderColor: 'rgb(193, 193, 193)' }}>
                                                            {/* <!--h4></h4--> */}
                                                            <ul className="list-style">
                                                                <li><Link to='/Mirzapur'>{t("mirzapur")}</Link></li>
                                                                <li><Link to='/Prayagraj'>{t("prayagraj")}</Link></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wpb_column vc_column_container vc_col-sm-3">
                                        <div className="vc_column-inner vc_custom_1516181017591">
                                            <div className="wpb_wrapper">
                                                <div className="gen-list no-border no-bg padding-0 border-radius-none small-icon-list info-list-margin  normal-font ">
                                                    <h2 className="heading3" style={{ color: 'black' }}>{t("information")}</h2>
                                                    <ul>
                                                        <li className="  ">
                                                            <a href="/BusTicketingForTourist">
                                                                <span className="list-icon green-bg icon-phone border-radius-round"></span>
                                                                <div className="list-text">
                                                                    <li>
                                                                        <Link to='/BusTicketingForTourist'> {t("book")} {t("tour")} {t("services")}</Link>
                                                                    </li>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li className="  ">
                                                            <a href="#">
                                                                <span className="list-icon orange-bg icon-identy border-radius-round"></span>
                                                                <div className="list-text">
                                                                    <li>
                                                                        <Link to='/FamousTemple'>{t("famous")} {t("temple")}</Link>
                                                                    </li>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li className="  ">
                                                            <a href="#">
                                                                <span className="list-icon blue-bg icon-support border-radius-round"></span>
                                                                <div className="list-text">
                                                                    <li>
                                                                        <Link to='https://prayagsamagam.com/boat-rides-in-varanasi/' target='_blank'>{t("book")} {t("boat")} {t("ride")}</Link>
                                                                    </li>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li className="  ">
                                                            <a href="https://varanasi.nic.in/police/" target='_blank'>
                                                                <span className="list-icon gray-bg icon-identy border-radius-round"></span>
                                                                <div className="list-text">{t("police")} {t("stations")} {t("list")}</div>
                                                            </a>
                                                        </li>
                                                        <li className="  ">
                                                            <a href="https://varanasi.nic.in/public-utility-category/hospitals/" target='_blank'>
                                                                <span className="list-icon red-bg icon-hospitals border-radius-round"></span>
                                                                <div className="list-text">{t("hospitals")} {t("list")}</div>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="vc_row wpb_row vc_row-fluid vc_custom_1516183865331 vc_row-o-equal-height vc_row-flex">
                                    <div className="news-notificaton-tab wpb_column vc_column_container vc_col-sm-6 vc_col-has-fill">
                                        <div className="vc_column-inner vc_custom_1499335980740">
                                            <div className="wpb_wrapper">
                                                <div className="vc_tta-container" data-vc-action="collapse">
                                                    <div className="vc_general vc_tta vc_tta-tabs vc_tta-color-grey vc_tta-style-modern vc_tta-shape-square vc_tta-o-shape-group vc_tta-o-no-fill vc_tta-tabs-position-top vc_tta-controls-align-left">
                                                        <div className="vc_tta-tabs-container">
                                                            <ul className="vc_tta-tabs-list" role="tablist">
                                                                <li className="vc_tta-tab vc_active" data-vc-tab="">
                                                                    <a href="#news" onClick={e => horzontalToggleTabs(e, 'news', 'news-events')} data-vc-tabs="" data-vc-container=".vc_tta" role="tab" aria-controls="news" aria-selected="true">
                                                                        <i className="vc_tta-icon fa fa-newspaper-o"></i>
                                                                        <span className="vc_tta-title-text">{t("news")}</span></a>
                                                                </li>
                                                                <li className="vc_tta-tab" data-vc-tab="">
                                                                    <a href="#notification" onClick={e => horzontalToggleTabs(e, 'notification', 'news-events')} data-vc-tabs="" data-vc-container=".vc_tta" role="tab" aria-controls="notification" aria-selected="false">
                                                                        <i className="vc_tta-icon fa fa-bell-o"></i>
                                                                        <span className="vc_tta-title-text">{t("notification")}</span>
                                                                    </a>
                                                                </li>
                                                                <li className="vc_tta-tab" data-vc-tab="">
                                                                    <a href="#documents" onClick={e => horzontalToggleTabs(e, 'documents', 'news-events', 'vc_active')} data-vc-tabs="" data-vc-container=".vc_tta" role="tab" aria-controls="documents" aria-selected="false">
                                                                        <i className="vc_tta-icon fa fa-file-text-o"></i>
                                                                        <span className="vc_tta-title-text">{t("documents")}</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="vc_tta-panels-container">
                                                            <div className="vc_tta-panels news-events">
                                                                <div className="vc_tta-panel vc_active" id="news" data-vc-content=".vc_tta-panel-body" role="tabpanel">
                                                                    <div className="vc_tta-panel-heading">
                                                                        <h4 className="vc_tta-panel-title">
                                                                            <a href="#documents" data-vc-accordion="" data-vc-container=".vc_tta-container">
                                                                                <i className="vc_tta-icon fa fa-file-text-o"></i>
                                                                                <span className="vc_tta-title-text">{t("news")}</span>
                                                                            </a>
                                                                        </h4>
                                                                    </div>
                                                                    <div className="vc_tta-panel-body">
                                                                        <div className="content-view gen-list  no-border no-bg  padding-0 border-radius-none default-list ">
                                                                            <ul className='text-start'>
                                                                                {newsUpdateData?.filter(x => x?.newsUpdateTypeName?.toLowerCase() === 'notification').length === 0 && <li>No New News</li>}
                                                                                {
                                                                                    newsUpdateData?.filter(x => x?.newsUpdateTypeName?.toLowerCase() === 'news').map((ele, index) => {
                                                                                        if (index > 9)
                                                                                            return;
                                                                                        return <li key={index} style={{ cursor: 'pointer' }}>
                                                                                            <Link to={ele?.webUrl} target='_blank'>{ele[`${langType}Title`]}</Link>
                                                                                        </li>
                                                                                    })
                                                                                }
                                                                                {newsUpdateData?.filter(x => x?.newsUpdateTypeName?.toLowerCase() === 'notification').length > 10 && <li style={{ listStyle: 'none' }}>
                                                                                    <Link to="#/newsEvents" className='btn btn-sm btn-secondary'>{t("readMore")}  {t("news")}...</Link>
                                                                                </li>
                                                                                }
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="vc_tta-panel" id="notification" data-vc-content=".vc_tta-panel-body" role="tabpanel">
                                                                    <div className="vc_tta-panel-heading">
                                                                        <h4 className="vc_tta-panel-title">
                                                                            <a href="#notification" data-vc-accordion="" data-vc-container=".vc_tta-container">
                                                                                <i className="vc_tta-icon fa fa-bell-o"></i>
                                                                                <span className="vc_tta-title-text">{t("notification")}</span>
                                                                            </a>
                                                                        </h4>
                                                                    </div>
                                                                    <div className="vc_tta-panel-body">
                                                                        <div className="gen-list  no-border no-bg  padding-0 border-radius-none default-list ">
                                                                            <ul className="nopostfound" data-found="false">
                                                                                {newsUpdateData?.filter(x => x?.newsUpdateTypeName?.toLowerCase() === 'notification').length === 0 && <li>No new notifications
                                                                                </li>}
                                                                                {
                                                                                    newsUpdateData?.filter(x => x?.newsUpdateTypeName?.toLowerCase() === 'notification').map((ele, index) => {
                                                                                        if (index > 9)
                                                                                            return;
                                                                                        return <li key={index} style={{ cursor: 'pointer' }}>
                                                                                            <Link to={ele?.webUrl} target='_blank'>{ele[`${langType}Title`]}</Link>
                                                                                        </li>
                                                                                    })
                                                                                }
                                                                                {newsUpdateData?.filter(x => x?.newsUpdateTypeName?.toLowerCase() === 'notification').length > 10 && <li style={{ listStyle: 'none' }}>
                                                                                    <Link to="#/newsEvents" className='btn btn-sm btn-secondary'> {t("showAll")} {t("notifications")}...</Link>
                                                                                </li>
                                                                                }
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="vc_tta-panel" id="documents" data-vc-content=".vc_tta-panel-body" role="tabpanel">
                                                                    <div className="vc_tta-panel-heading">
                                                                        <h4 className="vc_tta-panel-title">
                                                                            <a href="#documents" data-vc-accordion="" data-vc-container=".vc_tta-container">
                                                                                <i className="vc_tta-icon fa fa-file-text-o"></i>
                                                                                <span className="vc_tta-title-text">{t("documents")}</span>
                                                                            </a>
                                                                        </h4>
                                                                    </div>
                                                                    <div className="vc_tta-panel-body">
                                                                        <div className="content-view gen-list  no-border no-bg  padding-0 border-radius-none default-list ">
                                                                            <ul>
                                                                                {newsUpdateData?.filter(x => x?.newsUpdateTypeName?.toLowerCase() === 'notification').length === 0 && <li>No new documents</li>}
                                                                                {
                                                                                    newsUpdateData?.filter(x => x?.newsUpdateTypeName?.toLowerCase() === 'document').map((ele, index) => {
                                                                                        if (index > 9)
                                                                                            return;
                                                                                        return <li key={index} style={{ cursor: 'pointer' }}>
                                                                                            <Link to={ele?.webUrl?.indexOf('http') === -1 ? (window.location.href) + ele?.webUrl : ele?.webUrl} target='_blank'>{ele[`${langType}Title`]}</Link>
                                                                                        </li>
                                                                                    })
                                                                                }
                                                                                {newsUpdateData?.filter(x => x?.newsUpdateTypeName?.toLowerCase() === 'notification').length > 10 && <li style={{ listStyle: 'none' }}>
                                                                                    <Link to="#" className='btn btn-sm btn-secondary'>{t("viewAll")}  {t("documents")}...</Link>
                                                                                </li>
                                                                                }
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wpb_column vc_column_container vc_col-sm-6">
                                        <div className="vc_column-inner ">
                                            <div className="wpb_wrapper" style={{ marginTop: '35px' }}>
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
                                                    <div>
                                                        <LazyLoadImage effect='blur' src="uploads/2018/01/01.jpg" />
                                                        <p className="heading3 legend">{t("welcomToKashi")}</p>
                                                    </div>
                                                    <div>
                                                        <LazyLoadImage effect='blur' src="uploads/2018/01/02.jpg" />
                                                        <p className="heading3 legend">{t("welcomToKashi")}</p>
                                                    </div>
                                                    <div>
                                                        <LazyLoadImage effect='blur' src="uploads/2018/01/03.jpg" />
                                                        <p className="heading3 legend">{t("welcomToKashi")}</p>
                                                    </div>
                                                </Carousel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div data-vc-full-width="true" data-vc-full-width-init="true" className="fest_event_slider vc_row wpb_row vc_row-fluid themtwo-public-utility vc_custom_1516181837339 vc_row-has-fill"
                                    style={{ position: 'relative', boxSizing: 'borderBox' }}>
                                    <div className="wpb_column vc_column_container vc_col-sm-12">
                                        <div className="vc_column-inner vc_custom_1514961350587">
                                            <div className="wpb_wrapper">
                                                <h2 className="heading3">{t("upcomingFestivalEvents")} </h2>
                                                <div className="carousel-container1">
                                                    {
                                                        (getEventsData()?.length === 0 ? getEventsData(true) : getEventsData()).map((ele, index) => {
                                                            return <div key={index} className="carousel-box" style={{ display: index === 0 ? 'block' : 'none' }}>
                                                                <div className="carousel1">
                                                                    <LazyLoadImage effect='blur' className="imgcarousell" src={process.env.REACT_APP_API_URL + ele?.images[0]?.filePath} alt="Foto-1" />
                                                                    <div className="testimonial text-start">
                                                                        <p className="testimonial-job">{ele[`${langType}Title`]}</p>
                                                                        <p className="testimonial-text">
                                                                            Date : {common.getHtmlDate(ele?.eventDate)}
                                                                        </p>
                                                                        <p className="testimonial-author">
                                                                            {ele[`${langType}Description`]}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        })
                                                    }

                                                    <button className="btn1 btn1--left" onClick={e => plusSlides(-1)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                                        </svg>
                                                    </button>
                                                    <button className="btn1 btn1--right" onClick={e => plusSlides(1)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                                        </svg>
                                                    </button>
                                                    <div className="dots">
                                                        {(getEventsData().length === 0 ? getEventsData(true) : getEventsData()).map((ele, index) => {
                                                            return <span key={index} className={index === 0 ? "dot dot-fill" : "dot dot-fill"} onClick={e => currentSlide(index + 1)}></span>
                                                        })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="vc_row-full-width vc_clearfix"></div>
                                <div data-vc-full-width="true" data-vc-full-width-init="true"
                                    className="vc_row wpb_row vc_row-fluid themtwo-public-utility vc_custom_1516181837339 vc_row-has-fill"
                                    style={{ position: 'relative' }}>
                                    <div className="wpb_column vc_column_container vc_col-sm-5">
                                        <div className="vc_column-inner vc_custom_1514961350587">
                                            <div className="wpb_wrapper">
                                                <h2 className="heading3">{t("public")} {t("utilities")}</h2>
                                                <div className="gen-list no-bg no-border normal-font fore-color-white col-two padding-0 statistics-box-list ">
                                                    <ul className='text-start'>
                                                        <li className="border-radius-none blue-bg">
                                                            <a href="public-utility-category/banks/index.html" title={t("temple")}>
                                                                <span className="list-icon">190+</span>
                                                                <div className="list-text"> {t("temple")}</div>
                                                            </a>
                                                        </li>
                                                        <li className="border-radius-none green-bg">
                                                            <a href="public-utility-category/colleges/index.html" title={t("hotel")}>
                                                                <span className="list-icon">50+</span>
                                                                <div className="list-text">{t("hotel")}</div>
                                                            </a>
                                                        </li>
                                                        <li className="border-radius-none red-bg">
                                                            <a href="public-utility-category/electricity/index.html" title={t("tentCity")}>
                                                                <span className="list-icon">100+</span>
                                                                <div className="list-text">{t("tentCity")}</div>
                                                            </a>
                                                        </li>
                                                        <li className="border-radius-none orange-bg">
                                                            <a href="public-utility-category/hospitals/index.html" title={t("hospitals")}>
                                                                <span className="list-icon">50+</span>
                                                                <div className="list-text">{t("hospitals")}</div>
                                                            </a>
                                                        </li>
                                                        <li className="border-radius-none gray-bg">
                                                            <a href="public-utility-category/municipality/index.html" title={t("ghats")}>
                                                                <span className="list-icon">30+</span>
                                                                <div className="list-text">{t("ghats")}</div>
                                                            </a>
                                                        </li>
                                                        <li className="border-radius-none blue-bg">
                                                            <a href="public-utility-category/ngos/index.html" title={t("ngos")}>
                                                                <span className="list-icon">70+</span>
                                                                <div className="list-text">{t("ngos")}</div>
                                                            </a>
                                                        </li>
                                                        <li className="border-radius-none blue-bg">
                                                            <a href="public-utility-category/postal/index.html" title={t("dailyVisitors")}>
                                                                <span className="list-icon">3000+</span>
                                                                <div className="list-text">{t("dailyVisitors")}</div>
                                                            </a>
                                                        </li>
                                                        <li className="border-radius-none green-bg">
                                                            <a href="public-utility-category/schools/index.html" title={t("schools")}>
                                                                <span className="list-icon">50+</span>
                                                                <div className="list-text">{t("schools")}</div>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wpb_column vc_column_container vc_col-sm-2">
                                        <div className="vc_column-inner vc_custom_1514959655019">
                                            <div className="wpb_wrapper">
                                                <div className="gen-list no-border no-bg padding-0 border-radius-none arrow-list   normal-font fore-color-white">
                                                    <h2 className="heading3">{t("importantLinks")}</h2>
                                                    <ul className='text-start'>
                                                        <li className="border-radius-none gray-bg">
                                                            <a href="https://varanasi.nic.in/" target='_blank'>
                                                                <span className="list-icon -bg  border-radius-round"></span>
                                                                <div className="text-dark" style={{ color: 'black !important' }}>{t("varanasi")}  {t("districtWebsite")}</div>
                                                            </a>
                                                        </li>
                                                        <li className="border-radius-none gray-bg">
                                                            <a href="https://nnvns.org.in/" target='_blank'>
                                                                <span className="list-icon -bg  border-radius-round"></span>
                                                                <div className="text-dark" style={{ color: 'black !important' }}> {t("nagarNigam")} {t("varanasi")}</div>
                                                            </a>
                                                        </li>
                                                        <li className="border-radius-none gray-bg">
                                                            <a href="https://www.bhu.ac.in/Site/Home/1_2_16_Main-Site" target='_blank'>
                                                                <span className="list-icon -bg  border-radius-round"></span>
                                                                <div className="text-dark" style={{ color: 'black !important' }}>{t("bhu")}</div>
                                                            </a>
                                                        </li>
                                                        <li className="border-radius-none gray-bg">
                                                            <a href="https://varanasi.nic.in/service-category/grievance/" target='_blank'>
                                                                <span className="list-icon -bg  border-radius-round"></span>
                                                                <div className="text-dark" style={{ color: 'black !important' }}>{t("public")} {t("grievance")}</div>
                                                            </a>
                                                        </li>

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div><div className="wpb_column vc_column_container vc_col-sm-5">
                                        <div className="vc_column-inner vc_custom_1514961396430">
                                            <div className="wpb_wrapper">
                                                <div className="gen-list no-border no-bg padding-0 border-radius-none iconTop-textBottom-box-list helpline-numbers  normal-font fore-color-white">
                                                    <h2 className="heading3">{t("helpline")} {t("numbers")}</h2>
                                                    <div className='row' style={{ padding: 0, margin: 0 }}>
                                                        <div className='' style={{ padding: 0, margin: 0 }}>
                                                            <ul>
                                                                <li className="blue-bg  border-radius-none">
                                                                    <div className="list-anchor">
                                                                        <span className="list-icon blue-bg icon-accommodation border-radius-round"></span>

                                                                        <div className="list-text">
                                                                            {t("police")}<br /><span>112</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="green-bg  border-radius-none">
                                                                    <div className="list-anchor">
                                                                        <span className="list-icon blue-bg icon-accommodation border-radius-round"></span>

                                                                        <div className="list-text">
                                                                            {t("child")} {t("helpline")}<br /><span>1098</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="red-bg  border-radius-none">
                                                                    <div className="list-anchor">
                                                                        <span className="list-icon blue-bg icon-accommodation border-radius-round"></span>

                                                                        <div className="list-text">
                                                                            {t("women")} {t("helpline")}<br /><span>1090</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="orange-bg  border-radius-none">
                                                                    <div className="list-anchor">
                                                                        <span className="list-icon blue-bg icon-accommodation border-radius-round"></span>

                                                                        <div className="list-text">
                                                                            {t("ambulance")}<br /><span>108</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="vc_row-full-width vc_clearfix"></div>
                                <div className="vc_row-full-width vc_clearfix"></div>
                                {/* <div data-vc-full-width="true" data-vc-full-width-init="true" className="vc_row wpb_row vc_row-fluid vc_custom_1516190885782 vc_row-has-fill" style={{ position: 'relative', left: '-28.5833px', boxSizing: 'border-box', width: '1263px', paddingLeft: '28.5833px', paddingRight: '28.2567px' }}>
                                    <div className="wpb_column vc_column_container vc_col-sm-12">
                                        <div className="vc_column-inner ">
                                            <div className="wpb_wrapper">
                                                <div className="gen-list no-border no-bg padding-0 border-radius-none iconTop-textBottom-list large-circle  normal-font ">
                                                    <ul>
                                                        <li className="  ">
                                                            <div className="list-anchor">
                                                                <LazyLoadImage effect='blur' src="uploads/Icon/temple.png" style={{ margin: '10px' }} alt="" />
                                                                <div className="list-text"><b>Temples:</b> 3,000+</div>
                                                            </div>
                                                        </li>
                                                        <li className="  ">
                                                            <div className="list-anchor">
                                                                <LazyLoadImage effect='blur' src="uploads/Icon/hotel.png" style={{ margin: '10px' }} alt="" />
                                                                <div className="list-text"><b>Hotels:</b> 1800+</div>
                                                            </div>
                                                        </li>
                                                        <li className="  ">
                                                            <div className="list-anchor">
                                                                <LazyLoadImage effect='blur' src="uploads/Icon/tent.png" style={{ margin: '10px' }} alt="" />
                                                                <div className="list-text"><b>Tent City:</b> 1500+ Tents</div>
                                                            </div>
                                                        </li>
                                                        <li className="  ">
                                                            <div className="list-anchor">
                                                                <LazyLoadImage effect='blur' src="uploads/Icon/visitor.png" style={{ margin: '10px' }} alt="" />
                                                                <div className="list-text"><b>Daily Visiors:</b> 10000+</div>
                                                            </div>
                                                        </li>
                                                        <li className="  ">
                                                            <div className="list-anchor">
                                                                <LazyLoadImage effect='blur' src="uploads/Icon/ghat.png" style={{ margin: '10px' }} alt="" />
                                                                <div className="list-text"><b>Ghats:</b> 30+ </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>*/}
                                <div className="vc_row-full-width vc_clearfix"></div>
                                <div data-vc-full-width="true" data-vc-full-width-init="true" data-vc-stretch-content="true" className="vc_row wpb_row vc_row-fluid vc_row-no-padding" style={{ position: 'relative', left: '-28.5833px', boxSizing: 'border-box', width: '1263px' }}>
                                    <div className="wpb_column vc_column_container vc_col-sm-12">
                                        <div className="vc_column-inner vc_custom_1499931344939">
                                            <div className="wpb_wrapper">
                                                <section id="footerScrollbarWrapper" className="footerlogocarousel withbg withborder" aria-label="Other Important Links">
                                                    <div className="footerlogocarousel-outer item-count-8">
                                                        <div id="footerScrollbar" className="flexslider">
                                                            <div className="flex-viewport" style={{ overflow: 'hidden', position: 'relative' }}>
                                                                <ul className="slides" aria-label="Important Sites" style={{ width: '1600%', transitionDuration: '0.6s', transform: 'translate3d(-402px, 0px, 0px)' }}>
                                                                    <li style={{ width: '201px', float: 'left', display: 'block' }}>
                                                                        <a href="https://data.gov.in/" target="_blank" title="Open Government Data (OGD)  Platform India" onClick={e => alert('You are being redirected to an external website. Please note that District Preview Template cannot be held responsible for external websites content &amp; privacy policies.')} aria-label="https://data.gov.in/ - External site that opens in a new window" rel="noopener noreferrer">
                                                                            <LazyLoadImage effect='blur' src="master/uploads/2017/04/2017053014.png" alt="data.gov.in" draggable="false" />
                                                                        </a>
                                                                    </li>
                                                                    <li style={{ width: '200.333px', float: 'left', display: 'block' }}>
                                                                        <a href="https://incredibleindia.org/" target="_blank" title="Incredible India" onClick={e => alert('You are being redirected to an external website. Please note that District Preview Template cannot be held responsible for external websites content &amp; privacy policies.')} aria-label="https://incredibleindia.org/ - External site that opens in a new window" rel="noopener noreferrer">
                                                                            <LazyLoadImage effect='blur' src="master/uploads/2017/04/2017053094.png" alt="Incredible India Site" draggable="false" />
                                                                        </a>
                                                                    </li>
                                                                    <li style={{ width: '200.333px', float: 'left', display: 'block' }}>
                                                                        <a href="http://www.makeinindia.com/home" target="_blank" title="Make in India" onClick={e => alert('You are being redirected to an external website. Please note that District Preview Template cannot be held responsible for external websites content &amp; privacy policies.')} aria-label="http://www.makeinindia.com/home - External site that opens in a new window" rel="noopener noreferrer">
                                                                            <LazyLoadImage effect='blur' src="master/uploads/2017/04/2017053052.png" alt="make in India" draggable="false" />
                                                                        </a>
                                                                    </li>
                                                                    <li style={{ width: '200.333px', float: 'left', display: 'block' }}>
                                                                        <a href="https://www.mygov.in/" target="_blank" title="My Government" onClick={e => alert('You are being redirected to an external website. Please note that District Preview Template cannot be held responsible for external websites content &amp; privacy policies.')} aria-label="https://www.mygov.in/ - External site that opens in a new window" rel="noopener noreferrer">
                                                                            <LazyLoadImage effect='blur' src="master/uploads/2017/04/2017053017.png" alt="mygov" draggable="false" />
                                                                        </a>
                                                                    </li>
                                                                    <li style={{ width: '200.333px', float: 'left', display: 'block' }}>
                                                                        <a href="https://www.pmnrf.gov.in/" target="_blank" title="Prime Minister’s National Relief Fund" onClick={e => alert('You are being redirected to an external website. Please note that District Preview Template cannot be held responsible for external websites content &amp; privacy policies.')} aria-label="https://www.pmnrf.gov.in/ - External site that opens in a new window" rel="noopener noreferrer">
                                                                            <LazyLoadImage effect='blur' src="master/uploads/2017/04/2017053039.png" alt="PMNRF" draggable="false" />
                                                                        </a>
                                                                    </li>
                                                                    <li style={{ width: '200.333px', float: 'left', display: 'block' }}>
                                                                        <a href="http://www.pmindia.gov.in/en/" target="_blank" title="Prime Minister of India" onClick={e => alert('You are being redirected to an external website. Please note that District Preview Template cannot be held responsible for external websites content &amp; privacy policies.')} aria-label="http://www.pmindia.gov.in/en/ - External site that opens in a new window" rel="noopener noreferrer">
                                                                            <LazyLoadImage effect='blur' src="master/uploads/2017/04/2017110781.png" alt="pmindia" draggable="false" />
                                                                        </a>
                                                                    </li>
                                                                    <li style={{ width: '200.333px', float: 'left', display: 'block' }}>
                                                                        <a href="https://www.india.gov.in/" target="_blank" title="The National Portal of India" onClick={e => alert('You are being redirected to an external website. Please note that District Preview Template cannot be held responsible for external websites content &amp; privacy policies.')} aria-label="https://www.india.gov.in/ - External site that opens in a new window" rel="noopener noreferrer">
                                                                            <LazyLoadImage effect='blur' src="master/uploads/2019/05/2019052293.png" alt="india.gov.in" draggable="false" />
                                                                        </a>
                                                                    </li>
                                                                    <li style={{ width: '200.333px', float: 'left', display: 'block' }}>
                                                                        <a href="http://www.digitalindia.gov.in/" target="_blank" title="Digital India" onClick={e => alert('You are being redirected to an external website. Please note that District Preview Template cannot be held responsible for external websites content &amp; privacy policies.')} aria-label="http://www.digitalindia.gov.in/ - External site that opens in a new window" rel="noopener noreferrer">
                                                                            <LazyLoadImage effect='blur' src="master/uploads/2017/07/2017072418.png" alt="digital-india" draggable="false" />
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <ul className="flex-direction-nav">
                                                                <li>
                                                                    <a className="flex-prev" href="#" title="Previous" aria-label="Previous">
                                                                        <span className="hide">Previous</span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className="flex-next" href="#" title="Next" aria-label="Next">
                                                                        <span className="hide">Next</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                            <div className="flex-pauseplay">
                                                                <a className="flex-pause" href="#" title="Play/Pause" aria-label="Play/Pause">
                                                                    <span className="hide">Pause</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="vc_row-full-width vc_clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </main >
    )
}

