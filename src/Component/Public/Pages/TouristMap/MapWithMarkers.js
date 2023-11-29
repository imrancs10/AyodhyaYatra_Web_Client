import React from 'react'
import GoogleMapReact from 'google-map-react';
import MarkerInfoWindow from './MarkerInfoWindow';
import { renderToString } from 'react-dom/server'

export default function MapWithMarkers({ data }) {
    //callScript();
    const AnyReactComponent = ({ text }) => <div style={greatPlaceStyle}>{text}</div>;
    const defaultProps = {
        center: { lat: parseFloat(process.env.REACT_APP_GOOGLE_MAP_CENTER_POSITION_LAT), lng: parseFloat(process.env.REACT_APP_GOOGLE_MAP_CENTER_POSITION_LNG) },
        zoom: 15
    };
    const handleApiLoaded = (map, maps) => {
        var infowindow;
        infowindow = new google.maps.InfoWindow();
        var user_Current_Lat, user_Current_Lng;
        //Get User Current Location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function success(position) {
                var configLat = parseFloat(process.env.REACT_APP_GOOGLE_MAP_USER_CURRENT_LOC_LAT);
                var configLng = parseFloat(process.env.REACT_APP_GOOGLE_MAP_USER_CURRENT_LOC_LNG);
                var isFromConfig = process.env.REACT_APP_GOOGLE_MAP_USER_CURRENT_LOC_FROM_CONFIG;
                if (isFromConfig?.toLocaleLowerCase() === "true") {
                    user_Current_Lat = configLat;
                    user_Current_Lng = configLng;
                }
                else {
                    user_Current_Lat = position.coords.latitude;
                    user_Current_Lng = position.coords.longitude;
                }
                createMarker({ lat: user_Current_Lat, lng: user_Current_Lng }, undefined, markerIcons.current_location, map, infowindow);
                data?.map((res, index) => {
                    var latLng = { lat: parseFloat(res.latitude), lng: parseFloat(res?.longitude) }
                    return createMarker(latLng, res, markerIcons.temple, index, user_Current_Lat, user_Current_Lng);
        
                });
        
            });
        } else {
            data?.map((res, index) => {
                var latLng = { lat: parseFloat(res.latitude), lng: parseFloat(res?.longitude) }
                return createMarker(latLng, res, markerIcons.temple, index, user_Current_Lat, user_Current_Lng);
    
            });
    
            console.log("Geolocation not supported");
        }
        const createMarker = (latlng, data, url, index, user_Current_Lat, user_Current_Lng) => {
            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                icon: url,//"http://www.google.com/mapfiles/marker_yellow.png",
                title: data?.enName ?? '',
                label: {
                    text: data?.sequenceNo ?? `${index + 1}`,
                    color: 'black'
                },
                zIndex: 100000000000000
            });
            if (data !== undefined) {
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent(renderToString(<MarkerInfoWindow title={(data?.sequenceNo === undefined ? "" : data?.sequenceNo + " - ") + data?.enName} desc={data?.enDescription} lat={data?.latitude} lng={data?.longitude} images={data?.images} currLat={user_Current_Lat} currLng={user_Current_Lng}></MarkerInfoWindow>));
                    infowindow.open(map, marker);
                });
            }
        }
      


    };
    const createMapOptions=(maps) =>{
        return {
         // panControl: false,
          mapTypeControl: true,
          //scrollwheel: false,
          //styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
        }
      }
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact options={createMapOptions}
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
                defaultCenter={data[0] === undefined ? defaultProps.center : { lat: parseFloat(data[0]?.latitude), lng: parseFloat(data[0]?.longitude) }}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >

            </GoogleMapReact>
        </div>
    );
}
const K_WIDTH = 40;
const K_HEIGHT = 40;
const greatPlaceStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

    border: '5px solid #f44336',
    borderRadius: K_HEIGHT,
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    padding: 4,
    zIndex: 100000000000
};


const loadScript = (src) =>
    new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"`)) return resolve()
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = (err) => reject(err)
        document.body.appendChild(script)
    });

const callScript = () => {
    const src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCNA3lxRwq-kie-4fKPwzsO3FFcdHdUwDQ&callback=initMap`
    loadScript(src)
        .then(() => {
            /*global google*/
            // console.log("Load script google: ", google)
        })
        .catch(console.error)
}

const markerIcons = {
    temple: "https://kashiyatra.com/uploads/location_marker.png",
    default: "https://kashiyatra.com/uploads/location_marker.png",
    current_location: 'uploads/current_location.png',
    yatraStartEnd: 'uploads/startend_location.png'
}