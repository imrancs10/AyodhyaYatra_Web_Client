import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../Common/BreadCrumb'
import { Link } from 'react-router-dom';
import { Api } from '../../../../apis/Api';
import { apiUrls } from '../../../../apis/ApiUrls';
import { common } from '../../../../utils/common';
import i18next, { t, i18n } from 'i18next';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function PhotoGallery() {
    const langType = i18next.language;
    const [viewType, setViewType] = useState('grid');
    const [albumData, setAlbumData] = useState([])
    let photoGalleryDetailURL = "/PhotoGalleryImage?photoAlbumId="
    useEffect(() => {
        Api.Get(apiUrls.galleryController.getPhotoAlbum)
            .then(res => {
                setAlbumData([...res.data]);
            });
    }, []);
    return (
        <>
            <div className="wrapper banner-wrapper innerBanner">
                <LazyLoadImage effect='blur' src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
            </div>
            <section className="wrapper bodyWrapper" >
                <div className="container">
                    <BreadCrumb option={[{ name: 'photoGallery' }]} />
                    <div className="head-section">
                        <h2>{t('photoGallery')}</h2>
                        <div className="viewSwicther right-content">
                            <a href="#" onClick={e => { setViewType("grid"); common.doNothing(e); }} className="thumbs-view-btn" aria-label={t('gridView')} title={t('gridView')}>
                                <span className="icon-thumbs-view"></span>
                            </a>
                            <a href="#" onClick={e => { setViewType("list"); common.doNothing(e); }} className="thumbs-list-view-btn" aria-label={t('listView')} title={t('listView')}>
                                <span className="icon-list-view"></span>
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        {
                            albumData?.map((res, index) => {
                                return <>
                                  <div className='col-4'  key={index}>
                                  <div id="photoGallery5">
                                        <div className="photoGallery4Inner equal-height thumbs_view">
                                            <div className="photoGallery4Items" style={{ height: "43social midea done0px" }}>
                                                <div className="photoGallery4ItemsImage">
                                                    <Link to={photoGalleryDetailURL + res?.id} title="View Gallery" aria-label="View Gallery" >
                                                        <LazyLoadImage effect='blur' style={{ width: '100%', height: '350px' }} src={process.env.REACT_APP_API_URL + res?.images[0]?.filePath} alt={res?.enName} />
                                                        <div className="directoryIcon"> <span className="icon-folder-directory"></span>
                                                            <div className="directoryIconText"> {t('viewGallery')}  </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="photoGallery4ItemsCaption"> {langType === common.languageCode.english ? res?.enName : res?.hiName}  </div>
                                            </div>
                                        </div>
                                    </div>
                                  </div>
                                </>
                            })
                        }

                    </div>
                </div>
            </section >
        </>
    )
}
