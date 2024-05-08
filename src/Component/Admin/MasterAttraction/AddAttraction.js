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
import QRCode from "react-qr-code";
import { useReactToPrint } from 'react-to-print';
import Breadcrumb from '../Common/Breadcrumb'

export default function AddAttraction() {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const editAttractionId = searchParams.get("id");
  const [attractionTypeList, setAttractionTypeList] = useState([]);
  const attractionModelTemplate = {
    attractionTypeId:0,
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
    attractionCategoryId: 0,
    attractionURL: "",
    attraction360DegreeVideoURL: '',
  };
  const [attractionModel, setAttractionModel] = useState(attractionModelTemplate);
  const [isSaving, setIsSaving] = useState(true);
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
    if (attractionModel.id === 0) {
      Api.Put(apiUrls.masterAttractionsController.AddAttraction, attractionModel)
        .then(res => {
          setIsSaving(false);
          debugger;
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
      Api.Post(apiUrls.masterAttractionsController.AddAttraction, attractionModel)
        .then(res => {
          debugger;
          setIsSaving(false);
          if (res.data?.id > 0) {
            toast.success(toastMessage.updateSuccess);
            setIsSaving(false)
          }
          else
            toast.warn(toastMessage.updateError);
        }).catch(err => {
          setIsSaving(false);
        });;
    }
  }

  useEffect(() => {
    let id = parseInt(editAttractionId);
    if (!isNaN(id) && id > 0) {
      Api.Get(apiUrls.masterAttractionsController.getAttractionById + `/${id}`)
        .then(res => {
          setAttractionModel({ ...res.data });
          setIsSaving(false);
        });
    }
  }, [editAttractionId]);

  useEffect(() => {
    if (attractionModel?.id > 0) {
      Api.Get(apiUrls.masterAttractionsController.getAttractionById + `/${attractionModel.id}`)
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
    var { enName, enDescription, latitude, longitude, sequenceNo, id,attractionTypeId } = attractionModel;
    var err = {};
      if (!sequenceNo || sequenceNo === "") err.sequenceNo = validationMessage.reqSequenceNumber;
      if (!attractionTypeId || attractionTypeId<=0) err.attractionTypeId = validationMessage.enReqMasterAttractionTypeId;
   
      if (!enName || enName.length < 6) err.enName = validationMessage.reqAttractionNameEn;
      if (!enDescription || enDescription.length < 6) err.enDescription = validationMessage.reqAttractionDescEn;
      if (!latitude || latitude.length < 6) err.latitude = validationMessage.reqAttractionLatitude;
      if (!longitude || longitude.length < 6) err.longitude = validationMessage.reqAttractionLongitude;
    return err;
  }
  const resetAttractionHandler = () => {
    navigate('/admin/attraction/add')
    setAttractionModel({ ...attractionModelTemplate });
  }
  const downloadQr = () => {

    const svgElem = document.getElementById('attractionQrCode')
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
  const breadcrumbOption = {
    title: 'Add Attractions',
    items: [
      {
        isActive: false,
        title: "Attraction Details",
        icon: "fa-solid fa-gopuram"
      }
    ],
    buttons: [
      {
        text: "Add Attraction",
        icon: 'fa-solid fa-gopuram',
        handler: () => { },
        link: "/admin/attraction"
      }
    ]
  }
  return (
    <>
    
    <Breadcrumb option={breadcrumbOption}></Breadcrumb>
      <div className='card'>
        <div className='card-header bg-info text-start fs-9'>Add Attraction</div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Attraction Type" isRequired={true}></Label>
              <Dropdown data={attractionTypeList} name="attractionTypeId" text="name" value={attractionModel.attractionTypeId} defaultText="Select Attraction Type" onChange={changeHandler} className="form-control-sm" />
              <ErrorLabel message={error?.attractionTypeId} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.sequenceNo} labelText="sequence No" disabled={attractionModel.id > 0 && editAttractionId === 0} isRequired={true} name="sequenceNo" value={attractionModel.sequenceNo} placeholder="Enter sequence number" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.enName} labelText="Name (Eng.)" disabled={attractionModel.id > 0 && editAttractionId === 0} isRequired={true} name="enName" value={attractionModel.enName} placeholder="Enter attraction name" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.hiName} labelText="Name (हिंदी)" isRequired={false} disabled={attractionModel.id > 0 && editAttractionId === 0} name="hiName" value={attractionModel.hiName} placeholder="मंदिर का नाम हिंदी में दर्ज करें" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.taName} labelText="Name (Tamil)" isRequired={false}  disabled={attractionModel.id > 0 && editAttractionId === 0} name="taName" value={attractionModel.taName} placeholder="Enter attraction name" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.teName} labelText="Name (Telugu)" isRequired={false}  disabled={attractionModel.id > 0 && editAttractionId === 0} name="teName" value={attractionModel.teName} placeholder="Enter attraction name" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.latitude} labelText="Latitude" isRequired={true} disabled={attractionModel.id > 0 && editAttractionId === 0} name="latitude" value={attractionModel.latitude} placeholder="Enter Latitude (25.3109° N)" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.longitude} labelText="Longitude" isRequired={true} disabled={attractionModel.id > 0 && editAttractionId === 0} name="longitude" value={attractionModel.longitude} placeholder="Enter Longitude (83.0107° E)" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (Eng.)" isRequired={true}></Label>
              <textarea name="enDescription" value={attractionModel.enDescription} disabled={attractionModel.id > 0 && editAttractionId === 0} rows={4} style={{ resize: 'none' }} placeholder="Enter Description in English" onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.enDescription} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (हिंदी)" isRequired={false}></Label>
              <textarea name="hiDescription" value={attractionModel.hiDescription} disabled={attractionModel.id > 0 && editAttractionId === 0} rows={4} style={{ resize: 'none' }} placeholder="हिंदी में विवरण दर्ज करें" onChange={changeHandler} className=" form-control form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (Tamil)" isRequired={false}></Label>
              <textarea name="taDescription" value={attractionModel.taDescription} isRequired={false}  disabled={attractionModel.id > 0 && editAttractionId === 0} rows={4} style={{ resize: 'none' }} placeholder="Enter Description in Tamil" onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.taDescription} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (Telugu)" isRequired={false}></Label>
              <textarea name="teDescription" value={attractionModel.teDescription} isRequired={false}  disabled={attractionModel.id > 0 && editAttractionId === 0} rows={4} style={{ resize: 'none' }} placeholder="Enter Description in Telugu" onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.teDescription} />
            </div>
            {/* <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.attractionURL} labelText="Attraction URL (Eng.)" isRequired={true} name="attractionURL" value={attractionModel.attractionURL} placeholder="Enter attraction URL" onChangeHandler={changeHandler} className="form-control-sm" />
            </div> */}
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.attraction360DegreeVideoURL} labelText="360 Degree Video Url"  disabled={attractionModel.id > 0 && editAttractionId === 0} name="attraction360DegreeVideoURL" value={attractionModel.attraction360DegreeVideoURL} placeholder="www.google.com" onChangeHandler={changeHandler} className="form-control-sm" />
              <HelpText text="Use comma(,) for multiple url"/>
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <div className='d-flex justify-content-end my-3'>
                <ButtonBox onClickHandler={saveAttractionHandler}  type={attractionModel?.id > 0 ? "update" : "save"} text={attractionModel?.id > 0 ? "Update" : "Save"} className="btn-sm mx-3"></ButtonBox>
                <ButtonBox onClickHandler={resetAttractionHandler}  type="cancel" text="Reset Fields" className="btn-sm"></ButtonBox>
              </div>
            </div>
            <Divider></Divider>
            {attractionModel.id > 0 && <section>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Image Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.attraction} moduleId={attractionModel.id} fileType='image'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Barcode Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.attraction} moduleId={attractionModel.id} fileType='barcode'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Audio Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.attraction} moduleId={attractionModel.id} fileType="audio"></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Video Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.attraction} moduleId={attractionModel.id} fileType='video'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='360 Degree Image Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.attraction} moduleId={attractionModel.id} fileType='360degreeimage'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='QR Code'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <div style={{ background: 'white', padding: '16px',width:'100%',textAlign:'center' }} ref={componentRef}>
                  <h6 style={{color:'black',textAlign:'center'}}>Attraction Name : {attractionModel.enName} - {attractionModel.hiName}</h6>
                  <h6 style={{color:'black',textAlign:'center'}}>Attraction ID : {attractionModel.id}</h6>
                  <h6 style={{color:'black',textAlign:'center'}}>Attraction Sequence : {attractionModel.sequenceNo}</h6>
                  <QRCode 
                  id="attractionQrCode" 
                  value={`${window.location.origin}/#/QrLanding?type=attraction&id=${attractionModel.id}`} 
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
