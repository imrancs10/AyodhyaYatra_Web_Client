import React from 'react'
import { common } from '../../../utils/common'
import { useTranslation } from 'react-i18next';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import BreadCrumb from '../Common/BreadCrumb';
export default function PersonalityOfVaranasi() {
    const { t, i18n } = useTranslation();
    return (
        <>
            <div className="wrapper banner-wrapper innerBanner">
                <LazyLoadImage effect='blur' src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
            </div>
            <div className='row'>
                <div className='col-12 px-4'>
                    <BreadCrumb option={[{ name: "aboutKashiYatra" }, { name: "personalityOfVaranasi" }]} />
                </div>
            </div>
            <section className="wrapper bodyWrapper">
                <div className="container">
                    <div className="row px-4">
                        <div className="col-12">
                            <div>
                                <h4>1.	{t("lalBahadurShastri")}</h4>
                                <div className="pull-right sample-img-cntr"><LazyLoadImage effect='blur' decoding="async" src="/uploads/lal bahadur shastri.jpg" alt="sample Image" style={{ width: '250px', height: '150px' }} /></div>
                                <p style={{ textAlign: 'justify' }}>{t("p1lalBahadurShastri")}</p>
                            </div>
                            <div className="col-12">
                                <div className="colspexp-container">

                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row px-4">
                        <div className="col-12">
                            <div>

                                <h4>2.	{t("santKabirDas")}</h4>
                                <div className="pull-right sample-img-cntr"><LazyLoadImage effect='blur' decoding="async" src="uploads/sant_kabirdas.jpg" alt="sample Image" style={{ width: '250px', height: '150px' }} /></div>
                                <p style={{ textAlign: 'justify' }}>{t("p1santKabirDas")}</p>
                            </div>
                            <div className="col-12">
                                <div className="colspexp-container">

                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row px-4">
                        <div className="col-12">
                            <div>

                                <h4>3.	{t("ustadBismillahKhan")}</h4>
                                <div className="pull-right sample-img-cntr"><LazyLoadImage effect='blur' decoding="async" src="uploads/ustaad bismillah khan.jpg" alt="sample Image" style={{ width: '250px', height: '150px' }} /></div>
                                <p style={{ textAlign: 'justify' }}>{t("p1ustadBismillahKhan")}</p>
                            </div>
                            <div className="col-12">
                                <div className="colspexp-container">

                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row px-4">
                        <div className="col-12">
                            <div>
                                <h4>4.	{t("raniLakshmibai")}</h4>
                                <div className="pull-right sample-img-cntr"><LazyLoadImage effect='blur' decoding="async" src="uploads/RaniLakshmiBai.jpg" alt="sample Image" style={{ width: '250px', height: '150px' }} /></div>
                                <p style={{ textAlign: 'justify' }}>{t("p1raniLakshmibai")}</p>
                            </div>
                            <div className="col-12">
                                <div className="colspexp-container">

                                </div>
                            </div> </div>
                    </div>
                </div>
            </section>
        </>
    )
}
