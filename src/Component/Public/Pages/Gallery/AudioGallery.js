import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../Common/BreadCrumb'
import { Link, useSearchParams } from 'react-router-dom';
import { Api } from '../../../../apis/Api';
import { apiUrls } from '../../../../apis/ApiUrls';
import { common } from '../../../../utils/common';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function AudioGallery() {
    const [audioGalaryData, setAudioGalaryData] = useState([])
    useEffect(() => {
        Api.Get(apiUrls.galleryController.getAudioGallery)
            .then(res => {
                setAudioGalaryData([...res.data]);
            });
    }, []);
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
                                <ul className="breadcrumbs"><li><a href="" className="home"><span>Home</span></a></li> <li><a href="#">Media Gallery</a></li><li><a href=""><span>Audio Gallery</span></a></li> <li className="current">Audio</li></ul>
                            </div>
                        </div>
                    </div>
                    <div id="SkipContent"></div>
                    <div className="row">
                        <div className="row">
                            <div className="col-8">
                                <h1>Audio Gallery</h1>
                            </div>
                            <div className="col-4">
                                <div className="viewSwicther right-content"> <a href="#" className="thumbs-view-btn" aria-label="Grid View" title="Grid View"><span className="icon-thumbs-view"></span></a> <a href="#" className="thumbs-list-view-btn" aria-label="List View" title="List View"><span className="icon-list-view"></span></a> </div>
                            </div>
                            <div>
                                <div className="col-12">
                                </div>
                            </div>
                        </div>
                        {
                            audioGalaryData?.map((res, index) => {
                                return <>
                                    <div className="col-12">
                                        <div className="audio-dtls-cntr">
                                            <div className="col-4">
                                                <LazyLoadImage effect='blur' className="audio-bnr" src="uploads/audio.png" height="160" alt="No Thumbnail" />
                                            </div>
                                            <div className="col-8">
                                                <div className="audio-cntr">
                                                    <div className="spectrum-cntr">
                                                        <LazyLoadImage effect='blur' id="spc-pause" src="uploads/spectrum.png" height="160" width="160" alt="No Image" />
                                                        <LazyLoadImage effect='blur' id="spc-play" style={{ display: 'none' }} src="uploads/spectrum.gif" height="160" width="160" alt="No Image" />
                                                    </div>
                                                    <div className="audio-track-cntr">
                                                        <h2>{res?.enName}</h2>
                                                        <br></br>
                                                        <div className="audio-player">
                                                            <audio title="Sample Audio" id="myAudio" src={process.env.REACT_APP_API_URL + res?.images[0]?.filePath} controls preload="auto"></audio>
                                                        </div>
                                                        {/*<div className="player-btn">
                                                    <a href="javascript:void(0);" onclick="togglePlay()" title="Play" id="play-btn" className="btn btn-gov">Play</a>
                                                    <a title="Read Text" className="btn btn-gov read-text" onclick="showDetails();">Read Text</a> 
                                                    <a href="https://cdn.s3waas.gov.in/master/uploads/2017/11/2018040362.mp3" download="Sample Audio" aria-label="Download Sample Audio 708 KB" className="btn btn-gov" title="Download"> Download (708 KB)</a>
                                                </div>*/}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div id="show-description" style={{ display: 'none', tabindex: '-1' }}>
                                            <div>
                                                <p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#8217;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                            </div>
                                            <div> </div>
                                        </div> */}
                                        </div>
                                    </div>
                                </>
                            })
                        }

                    </div>
                </div>
            </section>
            {/* <script type="text/javascript">
            var myAudio = document.getElementById("myAudio");
            var isPlaying = false;

            function togglePlay() {

                if (isPlaying) {
                    myAudio.pause();
                } else {
                    myAudio.play();
                }
            };
            myAudio.onplaying = function () {
                jQuery("#play-btn").html('Pause');
                jQuery("#spc-pause").hide();
                jQuery("#spc-play").show();
                isPlaying = true;
            };
            myAudio.onpause = function () {
                jQuery("#play-btn").html('Play');
                jQuery("#spc-pause").show();
                jQuery("#spc-play").hide();
                isPlaying = false;
            };
            function showDetails() {
                var x = document.getElementById("show-description");
                if (x.style.display === "none") {
                    x.style.display = "block";
                } else {
                    x.style.display = "none";
                }
            };
        </script> */}
        </>
    )
}
