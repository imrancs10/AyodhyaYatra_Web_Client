import React from 'react'
import { common } from '../../../utils/common'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function VaranasiFuture() {
    return (
        <>
            <div className="wrapper banner-wrapper innerBanner">
                <LazyLoadImage effect='blur' src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
            </div>

            <section className="wrapper bodyWrapper">
                <div className="container">
                    <div className="row breadcrumb-outer">
                        <div className="left-content push-left">
                            <div id="breadcam" role="navigation" aria-label="breadcrumb">
                                <ul className="breadcrumbs"><li><a href="#/" className="home"><span>Home</span></a></li><li><a href="#">About Kashi Yatra</a></li> <li className="current">Varanasi Future</li></ul>
                            </div>
                        </div>
                    </div>
                    <div id="SkipContent"></div>
                    <div className="row">
                        <div className="row">
                            <div className="col-8">
                                <h1>Varanasi Future </h1>
                            </div>
                            <div className="col-4">
                                <div className="viewSwicther right-content desktopElement">
                                    <a href onClick={e => common.doNothing(e)} className="thumbs-view-btn"><span className="icon-thumbs-view"></span></a>
                                    <a href onClick={e => common.doNothing(e)} className="thumbs-list-view-btn"><span className="icon-list-view"></span></a>
                                </div>
                            </div>
                            <div className="col-12">
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                {/* <!--==================Paragraph with image start here=======================--> */}
                                <div>
                                    <div className="pull-right sample-img-cntr"><LazyLoadImage effect='blur' decoding="async" src="/Uploads/VaranasiFuture1.jpg" alt="sample Image" style={{ width: '500px', height: '400px' }} /></div>
                                    <p style={{ textAlign: 'justify' }}>Smart Cities Mission envisions developing an area within 100 cities (Varanasi being one of them) in the country as model areas based on an area development plan, which is expected to have a rub-off effect on other parts of the city and nearby cities and towns. The mission was launched by Prime Minister Narendra Modi on June 25, 2015. To provide for the aspirations and needs of the citizens, urban planners ideally aim at developing the entire urban eco-system, which is represented by the four pillars of comprehensive development-institutional, physical, social and economic infrastructure. This can be a long term goal and cities can work towards developing such comprehensive infrastructure incrementally, adding on layers of ‘smartness’.</p>

                                    <p style={{ textAlign: 'justify' }}>
                                        After the implementation of Master Plan-2031 in Banaras, which is developing as the gateway of Eastern India, the expansion of the city will also be stamped. In Master Plan 2031, there is a preparation to develop facilities from Raja Talab to Padav and from Dafi to Ring Road according to the city's vision. In the master plan 2031, the government is preparing to develop facilities according to the city's vision from Raja Talab to Padav and Dafi to Ring Road in Varanasi.
                                    </p>
                                    <p style={{ textAlign: 'justify' }}>
                                        In the coming 10 years, according to the development of the city, in the exercise of providing facilities, along with drinking water and sewer pipeline, road network is also being included in the master plan. Builders will get new opportunities for residential colonies on Ring Road, Babatpur Road, Rajatalab to Dafi and Mohansarai to Baulia and other new roads.
                                    </p>
                                    <div className="pull-right sample-img-cntr"><LazyLoadImage effect='blur' decoding="async" src="/Uploads/VaranasiFuture2.jpg" alt="sample Image" style={{ width: '500px', height: '400px' }} /></div>
                                    <p style={{ textAlign: 'justify' }}>
                                        With this, the planned development of the city is expected to gain momentum. At present, the objections and suggestions received from the public on the draft master plan are being disposed of. It is expected that it will be implemented soon. In fact, special attention has been given to residential schemes in the master plan being prepared by the Development Authority, adjusting the projects developed in the last eight years. The phase of beautification is going on in Kashi, the city of Shiva, both the government and the administration are engaged in the rejuvenation of Kashi at the grassroots level. After the Kashi Vishwanath Temple and the Ghats, it is the turn of the Panchkosi Marg to be rejuvenated. A new development project has been prepared for the 70 kilometer long Panchkosi road. Devotees do the Panchkosi Yatra of about 70 km barefoot. There are five stages of the Panchkosi Yatra in Kashi (Kandwa, Bhimchandi, Rameshwar, Pancho Pandavas, Kapildhara). There is a rule of one night's rest in the journey of five days. Apart from this, there are temples, ponds, ponds and Yatri Niwas on the religious route. By beautifying these places, a platform will be created to provide new opportunities for employment and development. This will also help a lot to the travelers and businessmen.
                                    </p>
                                    <p style={{ textAlign: 'justify' }}>
                                        All the religious places in Panchkosi Parikrama are on the right side. Jyotirlingakar Parikrama Path (Panchkosi Yatra) of Kashi has special recognition in Sanatan Dharma. The state government is going to beautify the temples, kunds and Yatri Niwas to give an international look to the Panchkosi Parikrama of Kashi. The Yogi Adityanath government of Uttar Pradesh is also planning many events throughout the year. With the development of Panchkosi road of about 70 kilometers, new employment and business opportunities will also be available.
                                    </p>
                                    <p style={{ textAlign: 'justify' }}>
                                        There are 108 main temples, 44 dharamshalas (travellers' shelters or night rest places) and kunds during the Panchkosi Yatra. All these places will be renovated. Landscaping will be done in open spaces and gardens, shelters with seating for pilgrims will be developed. Signage will be put up for the devotees on the Panchkosi route, so that along with identifying the correct route, they can get complete information related to them. Devotees coming from outside will get information about the Panchkosi route as soon as they come to Varanasi, at the railway station and bus stop and other places, for this there is a plan to make a toll free number. Under the Panchkosi Yatra Path scheme, there will be an initiative to conserve all the temples with high architectural and archaeological value. A heritage management plan will be prepared for the Panchkosi Yatra and a walking route will be developed.
                                    </p>
                                </div>
                                <div className="col-12">
                                    <div className="colspexp-container">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
            </section>

        </>
    )
}

