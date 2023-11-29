import React from 'react'
import BreadCrumb from '../Common/BreadCrumb'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'react-i18next';
export default function Prayagraj() {
	const { t, i18n } = useTranslation();
	return (
		<>
			<div className="wrapper banner-wrapper innerBanner">
				<LazyLoadImage effect='blur' src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
			</div>

			<section className="wrapper bodyWrapper" >
				<div className="container">
					<div className='row px-4'>
						<div className='col-12'>
							<BreadCrumb option={[{ name: t('tourism'), link: '#tourism/' }, { name: t('touristPlaces'), link: '#tourist-places/' }, { name: t('prayagraj') }]}></BreadCrumb>
						</div>
					</div>
					<div className='row px-4'>
						<div className="col-12">
							<h1 className='inner-heading-title'>{t('prayagraj')}</h1>
						</div>
					</div>
					<div className='row px-4'>
						<div className="col-12">
							<div className="show-category">
								<strong>{t('category')}</strong>
								<em className="fa fa-angle-right"></em>
								<span>{t('nearByDistrict')}</span></div>
						</div>
					</div>
					<div className="row px-4">
						<div className="col-6">
							<p style={{ textAlign: 'justify' }}><b>{t('prayagraj')}</b> {t('prayagrajp1')}</p>
							<h2 className="heading3 text-dark">{t('ContactDetails')}</h2>
							<p><strong>{t('Email')} </strong> <span className="word-break">abc[at]email[dot]com</span> </p>
							<p><strong>{t('Address')}: </strong> {t('prayagrajadd')}</p>  
							<p><strong>{t('Website')} </strong> <a href="https://prayagraj.nic.in/" className="word-break">https://prayagraj.nic.in/ </a></p>
							<p><strong>{t('location')}: </strong> <a href="https://www.google.com/maps/dir//27.1750 ° N,78.0422 ° E" target="_blank"><i className="fa fa-location-arrow"></i> {t('map')}</a></p>
							<p>
                                <h2 className="heading3 text-dark">{t('PhotoGallery')}</h2>
                            </p>
						<div id="photoGallery4 clearfix">
								<div className="galleryMeta clearfix">
									<h2 className="pull-left heading3">{t('Photo Gallery')}</h2>

									<div className="pull-right textRight"> <a aria-label="View All Photos" title="View All Photos" href="#" className="btn btn-default btn-sm uppercase">{t('viewAll')} <span className="icon-right-caret"></span></a> </div>

								</div>
								<div id="slider" className="flexslider single-turistplc-glry">
									<ul className="slides">
										<li> <LazyLoadImage effect='blur' src="https://cdn.s3waas.gov.in/s3cd00692c3bfe59267d5ecfac5310286c/uploads/2018/02/2018022173.jpg" alt="Sangam" />
											<div className="slide-caption">
											{t('prayagraj')}
											</div>
										</li>
										
									</ul>
								</div>
								<div id="carousel" className="flexslider">
									<ul className="slides" aria-hidden="true">
										<li> <LazyLoadImage effect='blur' src="https://cdn.s3waas.gov.in/s3cd00692c3bfe59267d5ecfac5310286c/uploads/2018/02/2018022173.jpg" alt="Sangam" /> </li>
									</ul>
								</div>

							</div>

						</div>

						<div className="col-6">
							<div className='text-center'>
                                <h4>{t('howToReach')}:</h4>
                            </div>
							<div className="separator5"></div>
							<div className="reachContainer clearfix">
								<div className="iconContainer">
									<span className="icon-aeroplane iconColor"></span>
								</div>
								<div className="txtContainer">
									<h4 className='inner-heading-title'>{t('byAir')}</h4>
                                    <p style={{ textAlign: 'justify' }}>{t('byAirDetail')}</p>
								</div>
							</div>
							<div className="reachContainer clearfix">
								<div className="iconContainer">
									<span className="icon-train iconColor2"></span>
								</div>
								<div className="txtContainer">
									<h4 className='inner-heading-title'>{t('byTrain')}</h4>
                                    <p style={{ textAlign: 'justify' }}>{t('byTrainDetail')}</p>
								</div>
							</div>
							<div className="reachContainer clearfix">
								<div className="iconContainer">
									<span className="icon-bus iconColor3"></span>
								</div>
								<div className="txtContainer">
									<h4 className='inner-heading-title'>{t('byRoad')}</h4>
                                    <p style={{ textAlign: 'justify' }}>{t('byRoadDetail')}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
