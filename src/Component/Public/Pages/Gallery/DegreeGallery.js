import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../Common/BreadCrumb'
import { Link, useSearchParams } from 'react-router-dom';
import { Api } from '../../../../apis/Api';
import { apiUrls } from '../../../../apis/ApiUrls';
import { common } from '../../../../utils/common';
import i18next, { t, i18n } from 'i18next';

export default function DegreeGallery() {
  const langType = i18next.language;
  const [viewType, setViewType] = useState('list');
  const [ThreeSixtyDegreeGalaryData, setThreeSixtyDegreeGalaryData] = useState([])
  useEffect(() => {
    Api.Get(apiUrls.galleryController.get360DegreeGallery)
      .then(res => {
        setThreeSixtyDegreeGalaryData([...res.data]);
      });
  }, []);
  return (
    <>
      <div className="wrapper banner-wrapper innerBanner">
        <img src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
      </div>

      <section className="wrapper bodyWrapper">
        <div className="container">
          <BreadCrumb option={[{ name: 'mediaGallery' }, { name: '360Gallery' }]}></BreadCrumb>
          <div className="head-section">
            <h2>{t('360Gallery')}</h2>
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
            <div className="">
              <div className="separator20"></div>
              <div className="row videoGallery" >
                {
                  ThreeSixtyDegreeGalaryData?.map((res, index) => {
                    return (res?.videoUrl != "" || res?.images?.length > 0) &&
                      <div key={index} className={viewType === 'grid' ? "col-4" : "col-12"}>
                        <div className="" style={{ maxWidth: viewType === 'grid' ? '40vw' : '99%', border: '1px solid antiquewhite', borderRadius: '10px', background: 'antiquewhite', marginBottom: '10px', padding: '10px', boxShadow: '4px 6px 6px #afafaf' }}>
                          {
                            res?.videoUrl?.trim() != "" && <div className="">
                              <iframe style={{ width: '100%' }} height={viewType === 'grid' ? "315" : '415'} src={res?.videoUrl}
                                title={langType === common.languageCode.english ? res?.enName : res?.hiName} frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen="true"></iframe>
                            </div>
                          }
                          {
                            res?.videoUrl.trim() == "" && <div className="imageThumb">
                              <video width="525" height="315" controls >
                                <source src={process.env.REACT_APP_API_URL + res?.images[0]?.filePath} type="video/mp4" /> </video>
                            </div>
                          }
                        </div>
                      </div>
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
