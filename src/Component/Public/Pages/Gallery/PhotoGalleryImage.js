import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../Common/BreadCrumb'
import { useSearchParams } from 'react-router-dom';
import { Api } from '../../../../apis/Api';
import { apiUrls } from '../../../../apis/ApiUrls';
import { common } from '../../../../utils/common';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import i18next, { t} from 'i18next';

export default function PhotoGalleryImage() {
  const langType=i18next.language;
  const [viewType, setViewType] = useState('grid');
  const [photoGalaryData, setPhotoGalaryData] = useState([])
  const [searchParams] = useSearchParams();
  const photoAlbumId = searchParams.get("photoAlbumId");
  let id = parseInt(photoAlbumId);
  useEffect(() => {
    Api.Get(apiUrls.galleryController.getPhotoGalleryByAlbumId + `/${id}`)
      .then(res => {
        setPhotoGalaryData([...res.data]);
      });
  }, []);
  return (
    <>
      <div className="wrapper banner-wrapper innerBanner">
        <LazyLoadImage effect='blur' src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
      </div>
      <section className="wrapper bodyWrapper" >
        <div className="container">
          <BreadCrumb option={[{ name: 'photoGallery',link:"/photoGallery" },{ name: 'kashiYatra' }]} />
          <div className="head-section">
            <h2>{t('kashiYatra')}</h2>
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
            <div className="col-12">
              <div className="single-glry-discription">
              </div>

              <div className="row">
                <div className="col-12">
                  <div id="photoGallery6" className="">
                    <div className="separator10"></div>
                    <div className="row thumbs_view">
                      {
                        photoGalaryData?.map((res, index) => {
                          return <div  key={index} className="col-4 photoGallery6Item fancyShare tourist-plc-glry">
                            <a data-alt={res?.enName} href={process.env.REACT_APP_API_URL + res?.images[0]?.filePath} className="fancybox" rel="gallery">
                              <LazyLoadImage effect='blur' style={{ width: '100%', height: '350px' }} src={process.env.REACT_APP_API_URL + res?.images[0]?.filePath} alt={res?.enName} />
                            </a>
                            <div className="photoGallery6ItemCaption">
                              <div className="photoGallery6ItemCaptionContent">
                                <a data-alt={res?.enName} href={process.env.REACT_APP_API_URL + res?.images[0]?.filePath} className="fancybox" rel="gallery1" >
                                  <span className="icon-zoom-in"><strong className="tcon">{t('viewImage')}</strong></span>
                                </a>
                                <span>{langType===common.languageCode.english? res?.enName:res?.hiName}</span>                               
                              </div>
                            </div>
                          </div>
                        })
                      }
                    </div>
                  </div>
                  <div className="separator50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
