import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { Api } from '../../../../apis/Api';
import { apiUrls } from '../../../../apis/ApiUrls';
import BreadCrumb from '../../Common/BreadCrumb';
import Viewer360 from '../../Common/Viewer360'

export default function Temple360Gallery() {
    const [searchParams] = useSearchParams();
    const [imagePath, setImagePath] = useState([]);
    let templeId = parseInt(searchParams.get("id"));
    templeId = isNaN(templeId) ? 0 : templeId;
    useEffect(() => {
        Api.Get(apiUrls.fileUploadController.getImageByModNameModId + `?moduleName=0&moduleId=${templeId}&imageType=360degreeimage`)
            .then(res => {
                var imageData = [];
                res?.data?.map((ele, index) => {
                    imageData.push({
                        id: `pano-${ele?.id}`,
                        name: `Panorama-${index+1}`,
                        panorama: process.env.REACT_APP_API_URL + ele?.filePath,
                        thumbnail: process.env.REACT_APP_API_URL + ele?.thumbPath
                    });
                });
                setImagePath([...imageData]);
            })
    }, [templeId])

    return (
        <>
            <div className='row'>
                <div className='col-12'>
                    <BreadCrumb option={[{ name: "Yatra" }, { name: "Temple" }, { name: "360Gallery" }]}></BreadCrumb>
                    {imagePath?.length > 0 && <Viewer360 imagePath={imagePath}></Viewer360>}
                </div>
            </div>
        </>
    )
}
