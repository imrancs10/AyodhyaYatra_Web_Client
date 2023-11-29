import React,{useEffect} from 'react'
import { common } from '../../../../utils/common'
import GoogleMapReact from 'google-map-react';

export default function ({
    style,
    center = {
        lat: parseFloat(process.env.REACT_APP_GOOGLE_MAP_CENTER_POSITION_LAT),
        lng: parseFloat(process.env.REACT_APP_GOOGLE_MAP_CENTER_POSITION_LNG)
    },
    zoom = 11,
    onGoogleApiLoaded
})
 {
    useEffect(() => {
      
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                    center.lat= position.coords.latitude;
                    center.lng= position.coords.longitude;
            });
        }
    }, [])
    
    style = common.defaultIfEmpty(style, {
        height: '400px',
        width: '100%',
    });
   const createMapOptions=(maps) =>{
        return {
         // panControl: false,
          mapTypeControl: true,
          //scrollwheel: false,
          //styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
        }
      }
    return (
        <>
            <div style={style}>
                <GoogleMapReact options={createMapOptions}
                    bootstrapURLKeys={{
                        key: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
                    }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => onGoogleApiLoaded(map, maps)}
                />
            </div>
        </>
    )
}
