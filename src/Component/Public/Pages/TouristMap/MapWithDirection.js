import React from 'react';
import GoogleMapReact from 'google-map-react';
import MarkerInfoWindow from './MarkerInfoWindow';
import { renderToString } from 'react-dom/server'
import RenderMap from './RenderMap';

export default function MapWithDirection({ templeData }) {
    var stations = templeData?.map(res => {
        return { lat: parseFloat(res.latitude), lng: parseFloat(res.longitude), name: res?.sequenceNo, data: res }
    });
    stations = stations.sort((a, b) => {
        return parseInt(b.name.substr(b.name.indexOf('-'), b.name.length)) - parseInt(a.name.substr(a.name.indexOf('-'), a.name.length))
    });
    callScript();
    //const google = window.google;
    if (stations === undefined)
        return;
    const apiIsLoaded = (map, maps) => {
        var src = document.querySelector(`script[src="${src}"`)?.length;
        var bounds = new google.maps.LatLngBounds();
        var service = new google.maps.DirectionsService;
        var infowindow = new google.maps.InfoWindow();
        var user_Current_Lat, user_Current_Lng;
        // const directionsRenderer = new google.maps.DirectionsRenderer({
        //     suppressMarkers: false,
        //     markerOptions: {
        //         icon: markerIcons.temple,
        //     }
        // });
        // Zoom and center map automatically by stations (each station will be in visible map area)
        var lngs = stations.map(function (station) { return station.lat; });
        var lats = stations.map(function (station) { return station.lng; });
        map.fitBounds({
            west: Math.min.apply(null, lngs),
            east: Math.max.apply(null, lngs),
            north: Math.min.apply(null, lats),
            south: Math.max.apply(null, lats),
        });

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
            }, error);
        } else {
            console.log("Geolocation not supported");
        }
        // Divide route to several parts because max stations limit is 25 (23 waypoints + 1 origin + 1 destination)
        for (var i = 0, parts = [], max = 25 - 1; i < stations.length; i = i + max)
            parts.push(stations.slice(i, i + max + 1));

        // Service callback to process service results
        var service_callback = function (response, status) {
            if (status != 'OK') {
                console.log('Directions request failed due to ' + status);
                return;
            }
            // Show stations on the map as markers
            for (var i = 0; i < stations.length; i++) {
                if (i === 0 || i === stations?.length - 1) {
                    createMarker({ lat: stations[i]?.lat, lng: stations[i]?.lng }, stations[i]?.data, markerIcons.yatraStartEnd, map, infowindow,user_Current_Lat,user_Current_Lng);
                }
                else {
                    createMarker({ lat: stations[i]?.lat, lng: stations[i]?.lng }, stations[i]?.data, markerIcons.temple, map, infowindow,user_Current_Lat,user_Current_Lng);
                }
            }

            var renderer = new google.maps.DirectionsRenderer;
            renderer.setMap(map);
            renderer.setOptions({ suppressMarkers: true, preserveViewport: true });
            renderer.setDirections(response);
        };

        // Send requests to service to get route (for stations count <= 25 only one request will be sent)
        for (var i = 0; i < parts.length; i++) {
            // Waypoints does not include first station (origin) and last station (destination)
            var waypoints = [];
            for (var j = 1; j < parts[i].length - 1; j++)
                waypoints.push({ location: parts[i][j], stopover: false });
            // Service options
            var service_options = {
                origin: parts[i][0],
                destination: parts[i][parts[i].length - 1],
                waypoints: waypoints,
                travelMode: 'WALKING'
            };

            //Map Center Code
            var pt;
            if(stations?.length>0 && stations?.length<3)
            {
               pt = new google.maps.LatLng(stations[0]?.lat, stations[0]?.lng);
            }
            else{
              var midIndex= Math.floor(stations?.length/2);
              pt = new google.maps.LatLng(stations[midIndex]?.lat, stations[midIndex]?.lng);
            }
           
            map.setCenter(pt);
            map.setZoom(13);
            // Send request
            service.route(service_options, service_callback);
        }
    };


    return (
        <>
            <RenderMap onGoogleApiLoaded={apiIsLoaded} />
        </>
    )
}

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

const createMarker = (latlng, data, url, map, infowindow,user_Current_Lat,user_Current_Lng) => {
        var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: url,//"http://www.google.com/mapfiles/marker_yellow.png",
        title: data?.enName,
        label: data?.sequenceNo,
        zIndex: 100000000000000
    });
    if (data !== undefined) {
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(renderToString(<MarkerInfoWindow lat={latlng.lat} lng={latlng.lng} title={data?.sequenceNo + '-' + data?.enName} desc={data?.enDescription} link={data?.id} images={data?.images} currLat={user_Current_Lat} currLng={user_Current_Lng}></MarkerInfoWindow>));
            infowindow.open(map, marker);
        });
    }
}





function error() {
    console.log("Unable to retrieve your location");
}