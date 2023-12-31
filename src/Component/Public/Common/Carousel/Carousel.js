import React, { Children, useState, useRef,useEffect } from 'react'
import './carousel.css'

export default function Carousel({ children }) {
    
  const timerRef = useRef();
    const [carouselIndex, setCarouselIndex] = useState(0);
    const carouselInterval = 1000;
    const autoPlay = () => {
        timerRef.current = setInterval(() => {
            setCarouselIndex(carouselIndex < children?.length ? carouselIndex + 1 : 0);
          }, carouselInterval);
       
    }
     useEffect(() => () => clearInterval(timerRef.current), []);
     const origCount = () => {
        clearInterval(timerRef.current);
      };
    return (
        <>
            <div className='carousel-container'>
                <div className='items'>
                    <ul onMouseOut={autoPlay} onMouseOver={origCount} style={{ transform: `translate3d(-${((carouselIndex>=children?.length?0:carouselIndex) * 100)}%,0,0)` }}>
                        {
                            Children.map(children, (ele, index) => {
                                return <li key={index} className={`item ${(carouselIndex>=children?.length?0:carouselIndex) === index ? "active" : ""}`}>
                                    {ele}
                                </li>
                            })
                        }
                    </ul>
                    <div className='carousel-dots'>
                        {
                            Children.map(children, (ele, index) => {
                                return <span key={index} onClick={e => setCarouselIndex(index)} className={`dot-item ${(carouselIndex>=children?.length?0:carouselIndex) === index ? "active" : ""}`}></span>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
