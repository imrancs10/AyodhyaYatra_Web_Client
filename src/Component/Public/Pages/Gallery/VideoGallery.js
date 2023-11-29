import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../Common/BreadCrumb'
import { useSearchParams } from 'react-router-dom';
import { Api } from '../../../../apis/Api';
import { apiUrls } from '../../../../apis/ApiUrls';
import { common } from '../../../../utils/common';
import i18next, { t } from 'i18next';

export default function VideoGallery() {
  const langType = i18next.language;
  const [searchParams] = useSearchParams();
  const [viewType, setViewType] = useState('grid');
  const [videoGalaryData, setVideoGalaryData] = useState([])
  let id = parseInt(searchParams.get("id"));
  id = isNaN(id) ? 0 : id;
  useEffect(() => {
    var url = id === 0 ? apiUrls.templeController.getTemples+'?pageSize=20' : apiUrls.templeController.getTempleById + '/' + id;
    Api.Get(url)
      .then(res => {
        if (id === 0) {
          setVideoGalaryData([...res.data.data ]);
        } else
          setVideoGalaryData([res.data]);

        if (res?.data?.temple360DegreeVideoURL?.trim()?.length > 1 || res?.data?.data[0]?.temple360DegreeVideoURL?.trim()?.length > 1) {
          setViewType("list");
        }
        else
          setViewType("grid");
      });
  }, []);
  return (
    <>
      <div className="wrapper banner-wrapper innerBanner">
        <img src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
      </div>

      <section className="wrapper bodyWrapper">
        <div className="container">
          <BreadCrumb option={[{ name: 'mediaGallery' }, { name: 'videoGallery' }]} />
          <div className="head-section">
            <h2>{t('videoGallery')}</h2>
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
              videoGalaryData?.map((ele, ind) => {
                if(ele?.temple360DegreeVideoURL==="" || ele?.temple360DegreeVideoURL?.toLowerCase()?.indexOf("kashiyatra")>-1)
                return ""
                return ele?.temple360DegreeVideoURL?.split(',')?.map((res, index) => {
                  return <div key={index} className={viewType === 'grid' ? "col-4" : "col-12"}>
                    <div className="" style={{ maxWidth: viewType === 'grid' ? '40vw' : '99%', border: '1px solid antiquewhite', borderRadius: '10px', background: 'antiquewhite', marginBottom: '10px', padding: '10px', boxShadow: '4px 6px 6px #afafaf' }}>
                      {
                        res?.videoUrl?.trim() != "" && <div className="imageThumb">
                          <iframe style={{ width: '100%' }} height={viewType === 'grid' ? "315" : '415'} src={res?.trim()}
                            title={langType === common.languageCode.english ? videoGalaryData?.enName : videoGalaryData?.hiName} frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen></iframe>
                        </div>
                      }
                      {
                        res?.videoUrl?.trim() == "" && <div className="imageThumb">
                          <video width="525" height="315" controls >
                            <source src={process.env.REACT_APP_API_URL + res?.images[0]?.filePath} type="video/mp4" /> </video>
                        </div>
                      }
                    </div>
                  </div>


                })
              })

            }
          </div>
        </div>
      </section >
    </>
  )
}
