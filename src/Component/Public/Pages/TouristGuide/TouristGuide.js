import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../Common/BreadCrumb'
import { Link, useSearchParams } from 'react-router-dom';
import { Api } from '../../../../apis/Api';
import { apiUrls } from '../../../../apis/ApiUrls';
import { common } from '../../../../utils/common';
import { useTranslation } from 'react-i18next';
import GalleryTile from '../../Common/GalleryTile';
import { t } from 'i18next';

export default function TouristGuide() {
  const [masterData, setMasterData] = useState([])
  const [searchParams] = useSearchParams();
  const [readMoreId, setReadMoreId] = useState(0);
  const { t, i18n } = useTranslation();

  let masterDataTypes = searchParams.getAll("masterDataType");
  let heading = searchParams.getAll("heading");
  useEffect(() => {
    if (masterDataTypes.length === 0)
      return;
    var queryParams = "";
    masterDataTypes.map((res, index) => {
      if (index === 0)
        queryParams += `masterDataType=${res}`;
      else
        queryParams += `&masterDataType=${res}`;
    });
    Api.Get(apiUrls.masterDataController.getMasterDataByTypes + queryParams)
      .then(res => {
        setMasterData([...res.data]);
      });
  }, [searchParams]);

  const getSeparateHeading = () => {
    if (heading[0] === undefined) return "";
    var headings = heading[0]?.split(" ");
    if(heading[0]==="Hospitals in Kashi")
    return  t('HospitalsInKashi')
    var temp = "";
    headings.forEach(element => {
      temp += t(element?.trim()?.toLowerCase()) + " ";
    });
    return temp;
  }
  return (
    <>
      <div className='p-1'>
        <BreadCrumb option={[{ name: 'touristGuide' }, { name: masterData[0]?.masterDataTypeName?.toLowerCase() }]}></BreadCrumb>
      </div>
      <h4 className='inner-heading-title px-3'>{getSeparateHeading()}</h4>
      <div className='row'>

        {
          masterData?.map((res, index) => {
            return <GalleryTile activateLink={true} data={res} category={res?.masterDataTypeName} link={`/TouristGuideDetails?masterDataId=${res?.id}`} key={index}></GalleryTile>
          })
        }
      </div>
    </>
  )
}
