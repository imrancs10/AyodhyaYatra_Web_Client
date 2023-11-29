import React from 'react'
import { ReactPhotoSphereViewer, AutorotatePlugin, GalleryPlugin,GyroscopePlugin,CompassPlugin,StereoPlugin } from 'react-photo-sphere-viewer';
export default function Viewer360({ imagePath, caption, description }) {
  
  const plugins = [
    [StereoPlugin],
    [CompassPlugin],
    [GyroscopePlugin],
    [GalleryPlugin,{
      items: imagePath,
      visibleOnLoad: true,
    }],
    [AutorotatePlugin,
      {
        autostartDelay: 1000,
        autorotateSpeed: '3rpm',
        autorotatePitch: '5deg',
      }
    ]
  ];
  const photoSphereRef = React.useRef();
  const handleClick = () => {
    photoSphereRef.current.animate({
      latitude: 0,
      longitude: 0,
      zoom: 55,
      speed: '10rpm',
      caption: caption,
      description: description,
    });
  }
  return (
    <>
    {
    imagePath?.length>0 && <ReactPhotoSphereViewer 
    ref={photoSphereRef} 
    plugins={plugins} 
    littlePlanet={true}
    touchmoveTwoFingers= {true}
    mousewheelCtrlKey= {true}
    src={imagePath[0]?.panorama}
    height={'100vh'} 
    width={"100%"} 
    onClick={handleClick}></ReactPhotoSphereViewer>}
    </>
    
  )
}
