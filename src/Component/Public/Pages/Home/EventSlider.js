import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { common } from '../../../../utils/common'

export default function EventSlider({langType,getEventsData,t}) {
    const data=getEventsData(true);
    const plusSlides = (n) => {
        SlideShow((slidePosition += n));
    }

    //  images controls
    const currentSlide = (n) => {
        SlideShow((slidePosition = n));
    }

    const SlideShow = (n) => {
        var i;
        var slides = document.getElementsByClassName("carousel-box");
        var circles = document.getElementsByClassName("dot");
        if (slides.length === 0)
            return;
        if (n > slides.length) {
            slidePosition = 1;
        }
        if (n < 1) {
            slidePosition = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < circles.length; i++) {
            circles[i].className = circles[i].className.replace(" dot--fill", "");
        }
        slides[slidePosition - 1].style.display = "block";
        circles[slidePosition - 1].className += " dot--fill";
    }
    var slidePosition = 1;
    SlideShow(slidePosition);
  return (
    <>
      <div data-vc-full-width="true" data-vc-full-width-init="true" className="fest_event_slider vc_row wpb_row vc_row-fluid themtwo-public-utility vc_custom_1516181837339 vc_row-has-fill"
                                    style={{ position: 'relative', boxSizing: 'borderBox' }}>
                                    <div className="wpb_column vc_column_container vc_col-sm-12">
                                        <div className="vc_column-inner vc_custom_1514961350587">
                                            <div className="wpb_wrapper">
                                                <h2 className="heading3">{t("upcomingFestivalEvents")} </h2>
                                                <div className="carousel-container1">
                                                    {
                                                        (getEventsData()?.length === 0 ? getEventsData(true) : getEventsData()).map((ele, index) => {
                                                            return <div key={index} className="carousel-box" style={{ display: index === 0 ? 'block' : 'none' }}>
                                                                <div className="carousel1">
                                                                    <LazyLoadImage effect='blur' onError={ (e) =>{e.target.src = 'uploads/ramnagar-ramlila.jpg'}} className="imgcarousell" src={process.env.REACT_APP_API_URL + ele?.images[0]?.filePath} alt={ele[`${langType}Title`]} />
                                                                    <div className="testimonial text-start">
                                                                        <p className="testimonial-job">{ele[`${langType}Title`]}</p>
                                                                        <p className="testimonial-text">
                                                                            Date : {common.getHtmlDate(ele?.eventDate)}
                                                                        </p>
                                                                        <p className="testimonial-author">
                                                                            {ele[`${langType}Description`]}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        })
                                                    }

                                                    <button className="btn1 btn1--left" onClick={e => plusSlides(-1)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                                        </svg>
                                                    </button>
                                                    <button className="btn1 btn1--right" onClick={e => plusSlides(1)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                                        </svg>
                                                    </button>
                                                    <div className="dots">
                                                        {(getEventsData().length === 0 ? getEventsData(true) : getEventsData()).map((ele, index) => {
                                                            return <span key={index} className={index === 0 ? "dot dot-fill" : "dot dot-fill"} onClick={e => currentSlide(index + 1)}></span>
                                                        })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    </>
  )
}
