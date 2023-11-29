import React from 'react'
import { Link } from 'react-router-dom'

export default function MarkerInfoWindow({ title, desc, images, link, lat, lng, currLat, currLng }) {
   return (
        <>
            <div className='row'>
                <div className='col-12' style={{display:'flex'}}>
                    <h6 style={{ width: '50%' }}>{title ?? ''}</h6>  
                    <a target='_blank' href={`https://www.google.com/maps/dir/?api=1&origin=${currLat},${currLng}&destination=${lat},${lng}`}>Navigate : 
                    <img alt='Navigate Icon' src='uploads/navigate_icon.png' style={{width:'32px'}}></img> 
                    </a>
                  
                </div>
                <div className='col-12'>
                    <p>{desc ?? ''}</p>
                </div>
                {link > 0 && <div className='col-12' style={{ marginBottom: '10px' }}>
                    <a href={`${process.env.REACT_APP_BASE_URL}/#/temple?id=${link}`} target='_blank' style={{ color: 'blue' }}>click here to see temple detail</a>
                </div>}
                <div className='col-12' style={{ height: '100px', overflowX: 'auto', overflowY: 'hidden' }}>
                    {
                        images?.map((res, index) => {
                            return <img key={index} style={imageStyle} src={`${process.env.REACT_APP_API_URL}${res.filePath}`} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

const imageStyle = {
    width: '100px',
    height: '100px',
    border: '2px solid black',
    borderRadius: '15%',
    marginRight: '10px'
}
