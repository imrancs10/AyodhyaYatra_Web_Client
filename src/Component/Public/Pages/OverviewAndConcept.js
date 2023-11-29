import React from 'react'
import { common } from '../../../utils/common'
import { useTranslation } from 'react-i18next';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import BreadCrumb from '../Common/BreadCrumb';
export default function OverviewAndConcept() {
    const { t, i18n } = useTranslation();
    return (
        <>
            <div className="wrapper banner-wrapper innerBanner">
                <LazyLoadImage effect='blur' src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
            </div>
           <div className='row'>
            <div className='col-12 px-4'>
            <BreadCrumb option={[{ name: "aboutKashiYatra" }, { name: "overviewAndConcepts" }]} />
            </div>
           </div>
            <section className="wrapper bodyWrapper">
                <div className="container">
                  

                    <h1>{t("overviewAndConcepts")} </h1>
                    <div className="row">
                            <div className="col-12 px-4">
                                {/* <!--==================Paragraph with image start here=======================--> */}
                                <div>
                                    <div className="pull-right sample-img-cntr">
                                        <LazyLoadImage effect='blur' decoding="async" src="https://cdn.s3waas.gov.in/master/uploads/2017/04/2017110775.jpg" alt="sample Image" />
                                    </div>
                                    <p style={{ textAlign: 'justify' }}>{t("p1ofOverviewAndConcept")}</p>
                                    <p style={{ textAlign: 'justify' }}>
                                        {t("p2ofOverviewAndConcept")}
                                        <ul className="list">
                                            <li>{t("panchkroshiYatra")} {t("ancientPilgrimageRouteofKashiKhand")}</li>
                                            <li>{t("navaDurgaYatra")}</li>
                                            <li>{t("navaGauriYatra")}</li>
                                            <li>{t("kashiBhairavYatra")}</li>
                                            <li>{t("kashiVishnuYatra")}</li>
                                            <li>{t("charDhamYatrainKashi")}</li>
                                            <li>{t("dwadashAdityaYatra")}</li>
                                            <li>{t("twelveJyotirlingYatra")}</li>
                                            <li>{t("eleventhVinayakYatra")}</li>
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                </div>
            </section>
        </>
    )
}
