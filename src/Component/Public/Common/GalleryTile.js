import React, { useState, useEffect } from 'react'
import { common } from '../../../utils/common'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function GalleryTile({ data, link, category, imageHeight = '350px', imageWidth = '100%', tileHeight = '580px', tileWidth = '100%', onClickHandler, moveTopOnClick = false, scrollPosition, buttons, activateLink = false }) {
    onClickHandler = common.defaultIfEmpty(onClickHandler, () => { })
    buttons = common.defaultIfEmpty(buttons, []);
    const { t, i18n } = useTranslation();
    const [readMore, setReadMore] = useState(false);
    const langType = i18n.language?.split('-')[0];;
    const handleClick = (e) => {
        debugger;
        if (!activateLink) {
            common.doNothing(e);
        }
        onClickHandler(data?.id, data);
        if (moveTopOnClick) {
            window.scrollTo({
                top: scrollPosition ?? 0,
                behavior: "smooth"
            });
        }
    }

    useEffect(() => {
        var slides = document.querySelectorAll('li.slide');
        if (slides?.length > 0) {
            for (let index = 0; index < slides.length; index++) {
                slides[index].classList.remove('previous');
                slides[index].classList.remove('selected');
            }
            slides[slides.length - 1].classList.add('previous');
            slides[0].classList.add('selected');
        }
    }, [data])

    return (
        <>
            <div className='col-sm-12 col-md-4 col-lg-4 my-2 g-5'>
                <div className='temple-card'>
                    <div className="photoGallery4Inner">
                        <div className="photoGallery4Items" style={{ height: tileHeight, width: tileWidth }}>
                            <Link title={data[`${langType}Name`]===undefined?data[`${langType}PadavName`]:data[`${langType}Name`]} to={link} onClick={e => handleClick()} className="photoImgContainer">

                                <div className="flip-box" style={{ width: imageWidth, height: imageHeight }}>
                                    <div className="flip-box-inner" >
                                        <div className={data?.images?.length > 1 ? "flip-box-front" : "flip-box-front1"}>
                                            <LazyLoadImage effect='blur' style={{ width: imageWidth, height: imageHeight }} src={process.env.REACT_APP_API_URL + data?.images[0]?.filePath} alt={[`${langType}Name`]} />
                                        </div>
                                        {data?.images?.length > 1 && <div className="flip-box-back">
                                            <LazyLoadImage effect='blur' style={{ width: imageWidth, height: imageHeight }} src={process.env.REACT_APP_API_URL + data?.images[1]?.filePath} alt={[`${langType}Name`]} />
                                        </div>
                                        }
                                    </div>
                                </div>

                            </Link>
                            <div className="photoTxtContainer">
                                <Link title={data[`${langType}Name`]===undefined?data[`${langType}PadavName`]:data[`${langType}Name`]} onClick={e => { handleClick(e) }} to={link} className="txtHeading">
                                    <center>
                                        <div title={data[`${langType}Name`]===undefined?data[`${langType}PadavName`]:data[`${langType}Name`]}>{data[`${langType}Name`]===undefined?data[`${langType}PadavName`]:data[`${langType}Name`]}</div>
                                    </center>
                                </Link>
                                <div className="show-category">
                                    <strong>{t("category")}</strong>
                                    <em className="fa fa-angle-right"></em>
                                    <span>{t(category?.toLowerCase())}</span>
                                </div>
                                {readMore && <p className='p-3 text-justify' style={{ height: '85px', overflowX: 'hidden' }}>{langType === 'hi-IN' ? data?.hiDescription : data?.enDescription}<button onClick={e => setReadMore(pre => !pre)} className='btn btn-sm btn-secondary'>Read Less.</button></p>}
                                {!readMore && <p className='p-3 text-justify'>{data[`${langType}Description`]?.substr(0, 120)} .... <button onClick={e => setReadMore(pre => !pre)} className='btn btn-sm btn-primary'>Read More.</button></p>}
                                {buttons?.length > 0 && <>
                                    <div className="shareGalleryContainer clearfix my-2">
                                        <p style={{ marginLeft: '10%', marginRight: '10%' }}>
                                            {
                                                buttons?.map(btnEle => {
                                                    return <Link to={btnEle?.link} target={btnEle?.target}>
                                                        <button className="btn btn-block uppercase btn-primary btn-black">
                                                            <span className="icon-map-location"></span>
                                                            {t(btnEle?.text)}
                                                        </button>
                                                    </Link>
                                                })
                                            }
                                        </p>
                                        {/* <span className="icon-share share-align"></span>
                                        <a href="#"
                                            onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                            target="_blank" aria-label="Facebook opens a new window" title="Share on Facebook">
                                            <span className="icon-facebook"></span>
                                            <span className="off-css">Share on Facebook</span>
                                        </a>

                                        <a href="#"
                                            onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                            target="_blank" aria-label="Twitter opens a new window" title="Share on Twitter">
                                            <span className="icon-twitter"></span>
                                            <span className="off-css">Share on Twitter</span>
                                        </a> */}
                                    </div>
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
