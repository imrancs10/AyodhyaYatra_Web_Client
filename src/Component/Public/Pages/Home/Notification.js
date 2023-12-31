import React, { useState,useEffect } from 'react'
import './notification.css'
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Notification({newsUpdateData}) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    
    const { t, i18n } = useTranslation();
    const langType = i18n.language.split('-')[0];
    var Carousel = require('react-responsive-carousel').Carousel;

    const handleMouseOver = (e) => {
        if (e.target.stop)
            e.target.stop();
    };

    const handleMouseOut = (e) => {
        if (e.target.start)
            e.target.start();
    };

    return (
        <>
            <div className='noty row'>
                <div className='noty-item col-sm-12 col-md-6'>
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
                <div className='noty-item col-sm-12 col-md-6'>
                    <div className='panel'>
                        <ul>
                            <li onClick={e => setSelectedIndex(0)} className={selectedIndex === 0 ? 'active' : ''}><i className="fa-solid fa-newspaper"></i> News</li>
                            <li onClick={e => setSelectedIndex(1)} className={selectedIndex === 1 ? 'active' : ''}><i className="fa-solid fa-bullhorn"></i> Notification</li>
                            <li onClick={e => setSelectedIndex(2)} className={selectedIndex === 2 ? 'active' : ''}><i className="fa-solid fa-file-lines"></i> Documents</li>
                        </ul>
                    </div>
                    <div className='panel-data'>
                        {selectedIndex === 0 && <div className='panet-data-item'>
                            <marquee direction="up" height="8%" behavior='scroll' onMouseOver={(e) => { handleMouseOver(e) }} onMouseOut={(e) => { handleMouseOut(e) }} style={{
                                cursor: "pointer",
                            }}>
                                <ul>
                                    <li>
                                        <a href="https://timesofindia.indiatimes.com/city/Ayodhya/7-35-crore-visit-Ayodhya-vishwanath-dham-in-opening-year/articleshow/96211539.cms">
                                            7.35 crore visit Ayodhya Vishwanath Dham in opening year
                                        </a>
                                        <span href="News&amp;Events.html" style={{ textAlign: 'center' }}>
                                            <button className="btn btn-primary">Read More</button>
                                        </span>
                                    </li>
                                    <li>
                                        <a href="https://timesofindia.indiatimes.com/city/Ayodhya/7-35-crore-visit-Ayodhya-vishwanath-dham-in-opening-year/articleshow/96211539.cms">
                                            7.35 crore visit Ayodhya Vishwanath Dham in opening year
                                        </a>
                                        <span href="News&amp;Events.html" style={{ textAlign: 'center' }}>
                                            <button className="btn btn-primary">Read More</button>
                                        </span>
                                    </li>
                                    <li>
                                        <a href="https://timesofindia.indiatimes.com/city/Ayodhya/7-35-crore-visit-Ayodhya-vishwanath-dham-in-opening-year/articleshow/96211539.cms">
                                            7.35 crore visit Ayodhya Vishwanath Dham in opening year
                                        </a>
                                        <span href="News&amp;Events.html" style={{ textAlign: 'center' }}>
                                            <button className="btn btn-primary">Read More</button>
                                        </span>
                                    </li>

                                </ul>
                            </marquee>
                        </div>}
                        {selectedIndex === 1 && <div className='panet-data-item'>
                            <div className="vc_tta-panel-body">
                                <div className="gen-list  no-border no-bg  padding-0 border-radius-none default-list ">
                                    <ul className="nopostfound" data-found="false">
                                        <li>
                                            <a href="https://pages.razorpay.com/pl_KbZyVeQyNQoOFU/view">Visitors now can reserve seat for Ganga Arti</a>
                                        </li>
                                    </ul>
                                </div>
                                <a href="News&amp;Events.html" style={{ textAlign: 'center' }}>
                                    <button className="btn btn-primary">Read More</button>
                                </a>
                            </div>
                        </div>}
                        {selectedIndex === 2 && <div className='panet-data-item'>
                            <div className="content-view gen-list  no-border no-bg  padding-0 border-radius-none default-list ">
                                <ul>
                                    <li>
                                        <a href="uploads\Doc\Pawanpath Detailed.pdf" target="_blank" aria-label="Title of Document will appear here PDF 16 KB - opens in new window">Pawanpath Details</a>

                                    </li>
                                    <li>
                                        <a href="uploads\Doc\Visheshwer Khand..detailed.pdf" target="_blank" aria-label="Title of the Documents 3 PDF  - opens in new window">Vishveswar khand Details</a>

                                    </li>
                                    <li>
                                        <a href="uploads\Doc\Ayodhya-Book-opt.pdf" target="_blank" aria-label="Title of report 1 will appear here PDF  - opens in new window">Ayodhya Book</a>

                                    </li>
                                    <li>
                                        <a href="uploads\Doc\pawan path with script new.pdf" target="_blank" aria-label="Title of the Documents 2 PDF  - opens in new window">Pawanpath of Ayodhya</a>

                                    </li>
                                    <li>
                                        <a href="uploads\Doc\pawan path short.pdf" target="_blank" aria-label="Title of the Documents 1 PDF 16 KB - opens in new window">Pawanpath of Ayodhya in Hindi</a>

                                    </li>
                                </ul>
                            </div>
                            <a href="News&amp;Events.html" style={{ textAlign: 'center' }}>
                                <button className="btn btn-primary">Read More</button>
                            </a>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}
