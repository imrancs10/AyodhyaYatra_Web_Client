import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Sankatmochan() {
	return (
		<>
			<div className="wrapper banner-wrapper innerBanner">
				<LazyLoadImage effect='blur' src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
			</div>

			<section className="wrapper bodyWrapper" >
				<div className="container">
					<div className="row breadcrumb-outer">
						<div className="left-content push-left">
							<div id="breadcam" role="navigation" aria-label="breadcrumb">
								<ul className="breadcrumbs"><li><a href="#" className="home"><span>Home</span></a></li> <li><a href="#tourism/">Tourism</a></li><li><a href="#tourist-places/" ><span>Tourist Places</span></a></li> <li className="current">Sankat Mochan Temple</li></ul>            </div>
						</div>
						{/* <div className="right-content push-right">
            <div className="printShare">
                <ul className="">
                    <li><a href="#" id="print" title="Print Page Content" aria-label="Print Page Content"><span className="icon-printer"></span> <span className="off-css">Print</span></a></li>
                    <li>
                                                <span className="share-text"><em className="icon-share"></em><span className="off-css">Share</span></span>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/sharer/sharer.php?u=#tourist-place/sarnath/&t=SARNATH"
                           onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                           target="_blank" title="Share on Facebook" aria-label="Facebook that opens in a new window"><span className="icon-facebook"></span><span className="off-css">Facebook</span></a>
                    </li>
                    <li>
                        <a href="https://twitter.com/share?url=#tourist-place/sarnath/&via=TWITTER_HANDLE&text=SARNATH"
                           onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                           target="_blank" title="Share on Twitter" aria-label="Twitter that opens in a new window"><span className="icon-twitter"></span><span className="off-css">Twitter</span></a>
                    </li>
                </ul>
            </div>
        </div> */}
					</div>
					<div id="SkipContent"></div>
					<div className="row">
						<div className="">

							<div className="heading-single-direc-btn">
								<div className="col-12">
									<h1>Sankat Mochan Temple</h1>
								</div>
							</div>
							<div className="col-12">
								<div className="show-category"><strong>Category</strong> <em className="fa fa-angle-right"></em> <span>Religious Temple</span></div>
							</div>
							<div className="col-6">
								<p><b>Sankat Mochan Hanuman Temple</b> is a Hindu temple in Varanasi, Uttar Pradesh, India and is dedicated to the Hindu God Hanuman. The temple was established by famous Hindu preacher and poet saint Sri Goswami Tulsidas in the early 16th century and is situated on the banks of the Assi river. The deity was named "Sankat Mochan" meaning the "reliever from troubles.</p>


								<h2 className="heading3">Contact Details</h2>                                                                                                                                                              <p><strong>Email: </strong> <span className="word-break">abc[at]email[dot]com</span> </p>                                                                                                                            <p><strong>Address: </strong> 3rd Floor, Dummy Building, Dummy Road, Dummy Nagar, Varanasi, Uttar Pradesh. </p>                                                                                                                            <p><strong>Website URL: </strong> <a href="https://www.uptourism.gov.in/en/post/sankat-mochan-temple" className="word-break">https://www.uptourism.gov.in/en/post/sankat-mochan-temple </a></p>                                                                                                                            <p><strong>Location: </strong> <a href="https://www.google.com/maps/dir//27.1750 ° N,78.0422 ° E" target="_blank"><i className="fa fa-location-arrow"></i> Map</a></p>



								<div id="photoGallery4">
									<div className="galleryMeta clearfix">
										<h2 className="pull-left heading3">Photo Gallery</h2>

										<div className="pull-right textRight"> <a aria-label="View All Photos" title="View All Photos" href="#gallery/sarnath/" className="btn btn-default btn-sm uppercase">View All <span className="icon-right-caret"></span></a> </div>

									</div>
									<div id="slider" className="flexslider single-turistplc-glry">
										<ul className="slides">
											<li> <LazyLoadImage effect='blur' src="https://www.tourmyindia.com/states/uttarpradesh/images/sankat-mochan-temple-varanasi.jpg " />
												<div className="slide-caption">
													संकट मोचन मंदिर
												</div>
											</li>
											<li> <LazyLoadImage effect='blur' src="https://cdn.s3waas.gov.in/s36da37dd3139aa4d9aa55b8d237ec5d4a/uploads/bfi_thumb/2018080898-olw9kk9px4amsm3fqcuxyycqey4y3f1yy7rwymdnka.gif " />
												<div className="slide-caption">
													धमेख स्तूप										</div>
											</li>
											<li> <LazyLoadImage effect='blur' src="https://cdn.s3waas.gov.in/s36da37dd3139aa4d9aa55b8d237ec5d4a/uploads/bfi_thumb/2018080841-olw9kk9px4amsm3fqcuxyycqey4y3f1yy7rwymdnka.jpg " />
												<div className="slide-caption">
													लार्ड बुद्धा										</div>
											</li>

										</ul>
									</div>
									<div id="carousel" className="flexslider">
										<ul className="slides" aria-hidden="true">
											<li> <LazyLoadImage effect='blur' src="https://cdn.s3waas.gov.in/s36da37dd3139aa4d9aa55b8d237ec5d4a/uploads/bfi_thumb/2018080846-olw9kk9ibgou75x8q0uno7zvsjtnfqhtbu5c490gk4.gif" alt="Temple1" /> </li>
											<li> <LazyLoadImage effect='blur' src="https://cdn.s3waas.gov.in/s36da37dd3139aa4d9aa55b8d237ec5d4a/uploads/bfi_thumb/2018080898-olw9kk9ibgou75x8q0uno7zvsjtnfqhtbu5c490gk4.gif" alt="Dhamek Stup" /> </li>
											<li> <LazyLoadImage effect='blur' src="https://cdn.s3waas.gov.in/s36da37dd3139aa4d9aa55b8d237ec5d4a/uploads/bfi_thumb/2018080841-olw9kk9ibgou75x8q0uno7zvsjtnfqhtbu5c490gk4.jpg" alt="Lord Budha1" /> </li>
										</ul>
									</div>

								</div>

							</div>

							<div className="col-6">
								<h3>How to Reach:</h3>
								<div className="separator5"></div>
								<div className="reachContainer clearfix">
									<div className="iconContainer">
										<span className="icon-aeroplane iconColor"></span>
									</div>
									<div className="txtContainer">
										<h4>By Air </h4>
										<p>
											The nearest airport to Sankat Mochan Temple lies at Varanasi - the cultural capital of India. Varanasi Airport at Babatpur is located about 30 km from Sarnath.

											It is one of the important domestic airports in India. Almost all public and private airlines in India operate regular flights to and from Varanasi. From Varanasi you can avail direct flights to cities like Delhi, Mumbai, Khajuraho, and others. You can also board flight from Kathmandu to reach Varanasi.
										</p>
									</div>
								</div>
								<div className="reachContainer clearfix">
									<div className="iconContainer">
										<span className="icon-train iconColor2"></span>
									</div>
									<div className="txtContainer">
										<h4>By Train </h4>
										<p>Sankat Mochan Temple has a railway station of its own, which is connected to Varanasi and Gorakhpur by passenger trains. The nearest railhead to Sarnath is at Varanasi too, which is one of the major railway junctions in the region. Varanasi railway station is connected to the rest of India by a large number of important trains. There are train links from Varanasi to various cities within Uttar Pradesh as well as cities in other parts of India like New Delhi, Mumbai, Kolkata, Agra, Lucknow, Bangalore and Ahmedabad, to name a few.</p>
									</div>
								</div>
								<div className="reachContainer clearfix">
									<div className="iconContainer">
										<span className="icon-bus iconColor3"></span>
									</div>
									<div className="txtContainer">
										<h4>By Road </h4>
										<p>Sankat Mochan Temple in Uttar Pradesh is well connected with other parts of the state by decent roadways. The nearest mega terminus from Sarnath lies at Varanasi, about 10 km downtown from Sarnath. Varanasi is well connected by bus with major cities like Lucknow, Bareilly, Kanpur, Allahabad, Agra and Mathura. Regular buses run by Uttar Pradesh State Road Transport Corporation as well as private operators ply from Varanasi to these destinations. Hence, Sarnath is easily accessible by road from Varanasi and other major destinations in Northern India.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
