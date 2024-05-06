import React, { useState, useEffect, useRef } from 'react'
import Label from '../Common/Label'
import HelpText from '../Common/HelpText'
import Dropdown from '../Common/Dropdown'
import ErrorLabel from '../Common/ErrorLabel'
import Inputbox from '../Common/Inputbox'
import FormHeader from '../Common/FormHeader'
import FileUpload from '../Common/FileUpload'
import Divider from '../Common/Divider'
import ButtonBox from '../Common/ButtonBox'
import { Api } from '../../../apis/Api'
import { apiUrls } from '../../../apis/ApiUrls'
import { toast } from 'react-toastify'
import { toastMessage } from '../../../constants/ConstantValues'
import { validationMessage } from '../../../constants/validationMessage'
import { fileUploadModuleName } from '../../../constants/enums';
import { useSearchParams, useNavigate } from 'react-router-dom'
import { common } from '../../../utils/common'
import QRCode from "react-qr-code";
import { useReactToPrint } from 'react-to-print';

export default function AddAttraction() {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const editTempleId = searchParams.get("templeId");
  const [attractionTypeList, setAttractionTypeList] = useState([]);
  const attractionModelTemplate = {
    masterAttractionTypeId:0,
    enName: "",
    hiName: "",
    taName: "",
    teName: "",
    enDescription: "",
    hiDescription: "",
    taDescription: "",
    teDescription: "",
    id: 0,
    latitude: "",
    longitude: "",
    sequenceNo: "",
    templeCategoryId: 0,
    templeURL: "",
    temple360DegreeVideoURL: '',
  };
  const [attractionModel, setAttractionModel] = useState(attractionModelTemplate);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState();
  const changeHandler = (e) => {
    var { name, type, value } = e.target;
    if (type === 'select-one') {
      value = parseInt(value);
    }
    setAttractionModel({ ...attractionModel, [name]: value });
  }

  const saveAttractionHandler = () => {

    let formError = validateAttraction();
    if (Object.keys(formError).length > 0) {
      setError(formError);
      return;
    }
    setError({});
    var model = attractionModel;
    if (model.yatraId === -1) {
      model.padavId = null;
      model.sequenceNo = null;
    }

    model.id = model.id === -1 ? 0 : model.id;
    if (model.yatraId === -1) {
      model.sequenceNo = "";
    }
    setIsSaving(true);
    if (attractionModel.id === 0) {
      Api.Put(apiUrls.templeController.AddTemple, attractionModel)
        .then(res => {
          setIsSaving(false);
          if (res.data?.id > 0) {
            toast.success(toastMessage.saveSuccess);
            setAttractionModel({ ...res.data });
          }
          else
            toast.warn(toastMessage.saveError);
        })
        .catch(err => {
          setIsSaving(false);
        });
    }
    else {
      Api.Post(apiUrls.templeController.AddTemple, attractionModel)
        .then(res => {
          setIsSaving(false);
          if (res.data?.id > 0) {
            toast.success(toastMessage.updateSuccess);
          }
          else
            toast.warn(toastMessage.updateError);
        }).catch(err => {
          setIsSaving(false);
        });;
    }
  }

  useEffect(() => {
    let id = parseInt(editTempleId);
    if (!isNaN(id) && id > 0) {
      Api.Get(apiUrls.templeController.getTempleById + `/${id}`)
        .then(res => {
          setAttractionModel({ ...res.data });
        });
    }
  }, [editTempleId]);

  useEffect(() => {
    if (attractionModel?.id > 0) {
      Api.Get(apiUrls.templeController.getTempleById + `/${attractionModel.id}`)
        .then(res => {
          var modal = attractionModel;
          modal = res.data;
          modal.yatraId = attractionModel.yatraId;
          modal.padavId = attractionModel.padavId;
          modal.sequenceNo = attractionModel.sequenceNo;
          setAttractionModel({ ...modal });
        });
    }
  }, [attractionModel.id]);

  useEffect(() => {
    Api.Get(apiUrls.masterAttractionsController.getAllAttractionTypes+'?pageNo=1&pageSize=10000')
      .then(res => {
        setAttractionTypeList(res.data.data);
      })
  }, [])



  const validateAttraction = () => {
    var { enName, enDescription, latitude, longitude, yatraId, padavId, sequenceNo, id } = attractionModel;
    var err = {};
    if (!yatraId || yatraId === 0) err.yatraId = validationMessage.reqYatraName;
    if (yatraId > 0) {
      if (!padavId || padavId === 0) err.padavId = validationMessage.reqPadavName;
      if (!sequenceNo || sequenceNo === "") err.sequenceNo = validationMessage.reqSequenceNumber;
    }
    if (id === 0) {
      err.id = validationMessage.reqTempleSelect;
    }
    if (id === -1 || id > 0) {
      if (!enName || enName.length < 6) err.enName = validationMessage.reqTempleNameEn;
      if (!enDescription || enDescription.length < 6) err.enDescription = validationMessage.reqTempleDescEn;
      if (!latitude || latitude.length < 6) err.latitude = validationMessage.reqTempleLatitude;
      if (!longitude || longitude.length < 6) err.longitude = validationMessage.reqTempleLongitude;
    }
    return err;
  }
  const resetTempleHandler = () => {
    navigate('/admin/attraction/add')
    setAttractionModel({ ...attractionModelTemplate });
  }
  const downloadQr = () => {

    const svgElem = document.getElementById('templeQrCode')
    const serializer = new XMLSerializer();
    let svgData = serializer.serializeToString(svgElem);
    svgData = '<?xml version="1.0" standalone="no"?>\r\n' + svgData;
    const svgBlob = new Blob([svgData], {
      type: 'image/svg+xml;charset=utf-8',
    });
    let DOMURL = window.URL || window.webkitURL || window;
    const url = DOMURL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const domRect = svgElem.getBBox();
      canvas.width = 500;
      canvas.height = 500;
      ctx.drawImage(img, 0, 0, 500, 500);
      DOMURL.revokeObjectURL(url);

      const imgURI = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');

      download(imgURI);
    };
    img.onerror = (e) => {
      console.error('Image not loaded', e);
    };

    img.src = url;
  }
  const download = (href) => {
    let download = document.createElement('a');
    download.href = href;
    download.download = `${attractionModel.enName}.png`;
    download.click();
    download.remove();
  }
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <div className='card'>
        <div className='card-header bg-info text-start fs-9'>Add Temple</div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Temple Type" isRequired={true}></Label>
              <Dropdown data={attractionTypeList} name="templeCategoryId" text="name" value={attractionModel.templeCategoryId} defaultText="Select Temple Type" onChange={changeHandler} className="form-control-sm" />
              <ErrorLabel message={error?.templeCategoryId} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.enName} labelText="Name (Eng.)" disabled={attractionModel.id > 0 && editTempleId === 0} isRequired={true} name="enName" value={attractionModel.enName} placeholder="Enter temple name" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.hiName} labelText="Name (हिंदी)" isRequired={false} disabled={attractionModel.id > 0 && editTempleId === 0} name="hiName" value={attractionModel.hiName} placeholder="मंदिर का नाम हिंदी में दर्ज करें" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.taName} labelText="Name (Tamil)" isRequired={false}  disabled={attractionModel.id > 0 && editTempleId === 0} name="taName" value={attractionModel.taName} placeholder="Enter temple name" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.teName} labelText="Name (Telugu)" isRequired={false}  disabled={attractionModel.id > 0 && editTempleId === 0} name="teName" value={attractionModel.teName} placeholder="Enter temple name" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.latitude} labelText="Latitude" isRequired={true} disabled={attractionModel.id > 0 && editTempleId === 0} name="latitude" value={attractionModel.latitude} placeholder="Enter Latitude (25.3109° N)" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.longitude} labelText="Longitude" isRequired={true} disabled={attractionModel.id > 0 && editTempleId === 0} name="longitude" value={attractionModel.longitude} placeholder="Enter Longitude (83.0107° E)" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (Eng.)" isRequired={true}></Label>
              <textarea name="enDescription" value={attractionModel.enDescription} disabled={attractionModel.id > 0 && editTempleId === 0} rows={4} style={{ resize: 'none' }} placeholder="Enter Description in English" onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.enDescription} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (हिंदी)" isRequired={false}></Label>
              <textarea name="hiDescription" value={attractionModel.hiDescription} disabled={attractionModel.id > 0 && editTempleId === 0} rows={4} style={{ resize: 'none' }} placeholder="हिंदी में विवरण दर्ज करें" onChange={changeHandler} className=" form-control form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (Tamil)" isRequired={false}></Label>
              <textarea name="taDescription" value={attractionModel.taDescription} isRequired={false}  disabled={attractionModel.id > 0 && editTempleId === 0} rows={4} style={{ resize: 'none' }} placeholder="Enter Description in Tamil" onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.taDescription} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (Telugu)" isRequired={false}></Label>
              <textarea name="teDescription" value={attractionModel.teDescription} isRequired={false}  disabled={attractionModel.id > 0 && editTempleId === 0} rows={4} style={{ resize: 'none' }} placeholder="Enter Description in Telugu" onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.teDescription} />
            </div>
            {/* <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.templeURL} labelText="Temple URL (Eng.)" isRequired={true} name="templeURL" value={attractionModel.templeURL} placeholder="Enter temple URL" onChangeHandler={changeHandler} className="form-control-sm" />
            </div> */}
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.temple360DegreeVideoURL} labelText="360 Degree Video Url" isRequired={true} disabled={attractionModel.id > 0 && editTempleId === 0} name="temple360DegreeVideoURL" value={attractionModel.temple360DegreeVideoURL} placeholder="www.google.com" onChangeHandler={changeHandler} className="form-control-sm" />
              <HelpText text="Use comma(,) for multiple url"/>
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <div className='d-flex justify-content-end my-3'>
                <ButtonBox onClickHandler={saveAttractionHandler} disabled={isSaving} type={attractionModel?.id > 0 ? "update" : "save"} text={attractionModel?.id > 0 ? "Update" : "Save"} className="btn-sm mx-3"></ButtonBox>
                <ButtonBox onClickHandler={resetTempleHandler} disabled={isSaving} type="cancel" text="Reset Fields" className="btn-sm"></ButtonBox>
              </div>
            </div>
            <Divider></Divider>
            {attractionModel.id > 0 && <section>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Image Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.temple} moduleId={attractionModel.id} fileType='image'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Barcode Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.temple} moduleId={attractionModel.id} fileType='barcode'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Audio Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.temple} moduleId={attractionModel.id} fileType="audio"></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Video Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.temple} moduleId={attractionModel.id} fileType='video'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='360 Degree Image Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.temple} moduleId={attractionModel.id} fileType='360degreeimage'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='QR Code'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <div style={{ background: 'white', padding: '16px',width:'100%',textAlign:'center' }} ref={componentRef}>
                  <h6 style={{color:'black',textAlign:'center'}}>Temple Name : {attractionModel.enName} - {attractionModel.hiName}</h6>
                  <h6 style={{color:'black',textAlign:'center'}}>Temple ID : {attractionModel.id}</h6>
                  <h6 style={{color:'black',textAlign:'center'}}>Temple Sequence : {attractionModel.sequenceNo}</h6>
                  <QRCode 
                  id="templeQrCode" 
                  value={`${window.location.origin}/#/QrLanding?type=temple&id=${attractionModel.id}`} 
                  title={attractionModel.enName}
                  />
               
                </div>
                <button className='btn btn-sm btn-primary' onClick={e => downloadQr()}> Download QR Code</button>   
                <button className='btn btn-sm btn-success' onClick={handlePrint}> Print QR Code</button>
              </div>
            </section>
            }
          </div>
        </div>
        <div className='card-footer'></div>
      </div>
    </>
  )
}
