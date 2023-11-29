import React from 'react'
import { Link } from 'react-router-dom'

export default function SiteMap() {
    return (
        <>
            <section className="hero-slider">
                <div className="wrapper banner-wrapper innerBanner">
                    <img src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
                </div>
                <div className="pr-15 pl-15">
                    <div className="row">
                        <div className="col-lg-12 w_content pt-20 mt-0"><br></br>
                            <h2 className="w-bgph center">Sitemap</h2>
                            <hr></hr>
                            <div className="clr"></div>
                            <div className="panel-body">
                                <ul className="sitemap">
                                    <li>
                                        <Link to="#" style={{ color: 'black', fontWeight: '600' }}>Home</Link>
                                        <ul>
                                            <li>
                                                <Link to="#" style={{ color: '#d61111', fontWeight: '600' }}>About Kashi Yatra</Link>
                                                <ul>
                                                    <li><Link to="/AboutKashiYatra">Overview & Concepts</Link></li>
                                                    <li><Link to="/PersonalityOfVaranasi">Personality of Varanasi</Link></li>
                                                    <li><Link to="/VaranasiFuture">Varanasi Future</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="" style={{ color: '#d61111', fontWeight: '600' }}>Yatra in Kashi</Link>
                                                <ul>
                                                    <li><Link to="/yatras?id=12">Antargrihi Parikrama Yatra</Link>
                                                    <ul>
                                                        <li><Link to="/yatras?id=17">Vishveshvara Antargrihi Yatra</Link></li>
                                                        <li><Link to="/yatras?id=18">Kedareshvara Antargrihi Yatra</Link></li>
                                                        <li><Link to="/yatras?id=19">Omkareshvara Antargrihi Yatra</Link></li>                                                        
                                                    </ul>
                                                    </li>
                                                    <li><Link to="/yatras?id=13">Buddha Circuit Yatra</Link></li>
                                                    <li><Link to="/yatras?id=14">Jain Circuit Yatra</Link></li>
                                                    <li><Link to="/yatras?id=11">Panchkoshi Yatra</Link></li>
                                                    <li><Link to="/yatras?id=15">Pawan Path Yatra</Link>
                                                    <ul>
                                                        <li><Link to="/yatras?id=1">Kashi Bhairav Yatra</Link></li>
                                                        <li><Link to="/yatras?id=2">Nav Gauri Yatra</Link></li>
                                                        <li><Link to="/yatras?id=3">Nav Durga Yatra</Link></li> 
                                                        <li><Link to="/yatras?id=4">Kashi Mein Char Dham Yatra</Link></li>
                                                        <li><Link to="/yatras?id=5">Dwadash Jyotirlinga Yatra</Link></li>
                                                        <li><Link to="/yatras?id=6">Dwadash Aditya Yatra</Link></li> 
                                                        <li><Link to="/yatras?id=7">Ashta Vinayak Yatra</Link></li>
                                                        <li><Link to="/yatras?id=8">Ashta Pradhan Vinayak Yatra</Link></li>
                                                        <li><Link to="/yatras?id=9">Ekadash Vinayak Yatra</Link></li> 
                                                        <li><Link to="/yatras?id=10">Kashi Vishnu Yatra</Link></li>                                                                                                                
                                                    </ul>
                                                    </li>
                                                </ul>

                                            </li>
                                            <li>
                                                <Link to="" style={{ color: '#d61111', fontWeight: '600' }}>Other Attraction</Link>
                                                <ul>
                                                    <li><Link to="/ghat">Ghat</Link></li>
                                                    <li><Link to="/Heritage">Heritage</Link></li>
                                                    <li><Link to="/GangaAarti">Ganga Aarti</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="" style={{ color: '#d61111', fontWeight: '600' }}>Tourist Guide</Link>
                                                <ul>
                                                    <li><Link to="/TouristGuide?masterDataType=17&heading=Historical and Religious Places">Historical &amp; Religious Places</Link></li>
                                                    <li><Link to="/TouristGuide?masterDataType=2&masterDataType=18&heading=Ghat and Ganga Aarti">Ghat &amp; Ganga Aarti</Link></li>
                                                    <li><Link to="/TouristGuide?masterDataType=22&masterDataType=25&masterDataType=8&heading=Entertainment and Shopping Places">Entertainment &amp; Shopping Places</Link></li>
                                                    <li><Link to="/TouristGuide?masterDataType=3&heading=Educational Institutions">Educational Institutions</Link></li>
                                                    <li><Link to="/TouristGuide?masterDataType=23&heading=Hospitals in Kashi">Hospitals in Kashi</Link></li>
                                                    <li><Link to="/TouristGuide?masterDataType=19&masterDataType=5&heading=Industries and Business Houses">Industries &amp; Business Houses</Link></li>
                                                    <li><Link to="/TouristGuide?masterDataType=4&masterDataType=7&heading=Hotels, Resorts and Restaurants">Hotels, Resorts &amp; Restaurants</Link></li>
                                                    <li><Link to="/TouristGuide?masterDataType=6&masterDataType=20&heading=Culture and Museums">Culture &amp; Museums</Link></li>
                                                    <li><Link to="/TouristGuide?masterDataType=21&masterDataType=24&heading=Railway and Transports">Railway &amp; Transports</Link></li>
                                                </ul>
                                            </li>

                                            <li>
                                                <Link to="/TouristGuideByMap?showFull=1" style={{ color: '#d61111', fontWeight: '600' }}>Tourist Guide by Map</Link>
                                            </li>

                                            <li>
                                                <Link to="" style={{ color: '#d61111', fontWeight: '600' }}>Online Booking</Link>
                                                <ul>
                                                    <li><Link to="/OnlineReligiousYatra">Online Religious Yatra</Link></li>
                                                    <li><Link to="/BusTicketingForTourist">Bus ticketing for tourist</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="" style={{ color: '#d61111', fontWeight: '600' }}>Gallery</Link>
                                                <ul>
                                                    <li><Link to="/PhotoGallery">Photo  Gallery</Link></li>
                                                    <li><Link to="/AudioGallery">Audio  Gallery</Link></li>
                                                    <li><Link to="/VideoGallery">Video  Gallery</Link></li>
                                                    <li><Link to="/DegreeGallery">360 degree Gallery</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="" style={{ color: '#d61111', fontWeight: '600' }}>More</Link>
                                                <ul>
                                                    <li><Link to="/ContactUs">Contact Us</Link></li>
                                                    <li><Link to="/Directory">Directory</Link></li>
                                                    <li><Link to="/Helpline">Helpline</Link></li>
                                                    <li><Link to="/Feedback">Feedback</Link></li>
                                                    <li><Link to="/NewsEvents">News &amp; Events</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="" style={{ color: '#d61111', fontWeight: '600' }}>Others Link</Link>
                                                <ul>
                                                    <li><Link to="/FAQ">FAQs</Link></li>
                                                    <li><Link to="/DosDonts">DOs &amp; Don’ts</Link></li>
                                                    <li><Link to="/Map">Map</Link></li>
                                                    <li><Link to="/History">History</Link></li>
                                                    <li><Link to="/KeyFacts">Key Facts</Link></li>
                                                    <li><Link to="/Demography">Demography</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="" style={{ color: '#d61111', fontWeight: '600' }}> Policy</Link>
                                                <ul>
                                                    <li><Link to="/Disclaimer">Disclaimer</Link></li>
                                                    <li><Link to="/TermsConditions">Terms &amp; Conditions</Link></li>
                                                    <li><Link to="/PrivacyPolicy">Privacy Policy</Link></li>
                                                    <li><Link to="/HyperlinkPolicy">Hyperlink Policy</Link></li>
                                                    <li><Link to="/CopyrightPolicy">Copyright Policy</Link></li>

                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
