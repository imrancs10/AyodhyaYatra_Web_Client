import React from 'react'
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import BreadCrumb from '../Common/BreadCrumb';
import { Link } from 'react-router-dom';

export default function BusTicketingForTourist() {
    const { t } = useTranslation();
    const data = [
        {
            name: t("MakeMyTrip"),
            url: 'https://www.makemytrip.com/',
            image: 'uploads/TripBook/my.jpeg'
        },
        {
            name: t("UPSRTC"),
            url: 'https://upsrtc.up.gov.in/',
            image: 'uploads/TripBook/upsrtc.png'
        },
        {
            name: t("Redbus"),
            url: 'https://www.redbus.in/',
            image: 'uploads/TripBook/redbus.png'
        },
        {
            name: t("OyoRooms"),
            url: 'https://www.oyorooms.com/',
            image: 'uploads/TripBook/oyo.png'
        },
        {
            name: t("Trivago"),
            url: 'https://www.trivago.in/',
            image: 'uploads/TripBook/trivago.png'
        },
        {
            name: t("Agoda"),
            url: 'https://www.agoda.com/',
            image: 'uploads/TripBook/agoda.png'
        },
        {
            name: t("EasyMyTrip"),
            url: 'https://www.easemytrip.com/',
            image: 'uploads/TripBook/easemytrip.png'
        }
    ]
    return (
        <>
            <div className="wrapper banner-wrapper innerBanner">
                <LazyLoadImage effect='blur' src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
            </div>
            <div className='row px-4'>
                <div className='col-12'>
                    <BreadCrumb option={[{ name: 'OnlineBookingServices' }, { name: 'BusTicketBooking' }]} />
                </div>
                <div className='col-12'>
                    <h1>{t("BusTicketBooking")}</h1>
                </div>
            </div>
            <section className="wrapper bodyWrapper">
                <div className="container">
                    <div className="row px-4">
                        {data?.map((ele, index) => {
                            return <>
                                <div className='col-3 mb-3' key={index}>
                                    <Link title={ele.name} href={ele.url} target='_blank'>
                                        <div className='book-item'>
                                            <LazyLoadImage effect='blur' src={ele.image} />
                                            <div className="relatedDistTxt">{ele.name}</div>
                                        </div>
                                    </Link>
                                </div>
                            </>
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}
