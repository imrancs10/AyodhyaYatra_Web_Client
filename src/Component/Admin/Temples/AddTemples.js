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

export default function AddTemples() {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const editTempleId = searchParams.get("templeId");
  const templeModelTemplate = {
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
    padavId: 0,
    yatraId: 0,
    sequenceNo: "",
    templeCategoryId: 0,
    templeURL: "",
    temple360DegreeVideoURL: '',
  };
  const [templeModel, setTempleModel] = useState(templeModelTemplate);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState();
  const [padavList, setPadavList] = useState([]);
  const [yatraList, setYatraList] = useState([]);
  const [templeList, setTempleList] = useState([]);
  const changeHandler = (e) => {
    var { name, type, value } = e.target;
    if (type === 'select-one') {
      value = parseInt(value);
    }
    setTempleModel({ ...templeModel, [name]: value });
  }

  const saveTempleHandler = () => {

    let formError = validateTemple();
    if (Object.keys(formError).length > 0) {
      setError(formError);
      return;
    }
    setError({});
    var model = templeModel;
    if (model.yatraId === -1) {
      model.padavId = null;
      model.sequenceNo = null;
    }

    model.id = model.id === -1 ? 0 : model.id;
    if (model.yatraId === -1) {
      model.sequenceNo = "";
    }
    setIsSaving(true);
    if (templeModel.id === 0) {
      Api.Put(apiUrls.templeController.AddTemple, templeModel)
        .then(res => {
          setIsSaving(false);
          if (res.data?.id > 0) {
            toast.success(toastMessage.saveSuccess);
            setTempleModel({ ...res.data });
          }
          else
            toast.warn(toastMessage.saveError);
        })
        .catch(err => {
          setIsSaving(false);
        });
    }
    else {
      Api.Post(apiUrls.templeController.AddTemple, templeModel)
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
          setTempleModel({ ...res.data });
        });
    }
  }, [editTempleId]);

  useEffect(() => {
    if (templeModel?.id > 0) {
      Api.Get(apiUrls.templeController.getTempleById + `/${templeModel.id}`)
        .then(res => {
          var modal = templeModel;
          modal = res.data;
          modal.yatraId = templeModel.yatraId;
          modal.padavId = templeModel.padavId;
          modal.sequenceNo = templeModel.sequenceNo;
          setTempleModel({ ...modal });
        });
    }
  }, [templeModel.id]);

  useEffect(() => {
    var apiList = [];
    apiList.push();
    apiList.push(Api.Get(apiUrls.masterDataController.getYatras));
    apiList.push(Api.Get(apiUrls.templeController.getTemples));
    Api.MultiCall(apiList)
      .then(res => {
        setYatraList(res[0].data);
        setTempleList(res[1].data.data);
      });
  }, []);

  useEffect(() => {
    Api.Get(apiUrls.masterDataController.getPadavByYatraId + `/${templeModel.yatraId}`)
      .then(res => {
        setPadavList(res.data);
      })
  }, [templeModel.yatraId])



  const validateTemple = () => {
    var { enName, enDescription, latitude, longitude, yatraId, padavId, sequenceNo, id } = templeModel;
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
    navigate('/admin/temple/add')
    setTempleModel({ ...templeModelTemplate });
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
    download.download = `${templeModel.enName}.png`;
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
              <Label text="Yatra" isRequired={true}></Label>
              <Dropdown data={yatraList} addNA={true} name="yatraId" value={templeModel.yatraId} elementKey="id" text="enName" defaultText="Select Yatra" onChange={changeHandler} className="form-control-sm" />
              <ErrorLabel message={error?.yatraId} />
            </div>
            {templeModel.yatraId !== -1 && <>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <Label text="Stage/Padav" isRequired={templeModel.yatraId > 0}></Label>
                <Dropdown data={padavList} name="padavId" value={templeModel.padavId} defaultText="Select Padav" elementKey="id" text="enPadavName" onChange={changeHandler} className="form-control-sm" />
                <ErrorLabel message={error?.padavId} />
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <Inputbox errorMessage={error?.sequenceNo} labelText="Sequence No." isRequired={templeModel.yatraId > 0} name="sequenceNo" value={templeModel.sequenceNo} placeholder="Enter sequence no." onChangeHandler={changeHandler} className="form-control-sm" />
              </div>
            </>
            }
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Temple" isRequired={true}></Label>
              <Dropdown data={templeList} name="id" text="enName" addNA={true} NAText="Add New Temple" value={templeModel.id} defaultText="Select Temple" onChange={changeHandler} className="form-control-sm" />
              <ErrorLabel message={error?.id} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Temple Type" isRequired={true}></Label>
              <Dropdown data={common.templeTypes} name="templeCategoryId" value={templeModel.templeCategoryId} defaultText="Select Temple Type" onChange={changeHandler} className="form-control-sm" />
              <ErrorLabel message={error?.templeCategoryId} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.enName} labelText="Name (Eng.)" disabled={templeModel.id > 0 && editTempleId === 0} isRequired={true} name="enName" value={templeModel.enName} placeholder="Enter temple name" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.hiName} labelText="Name (हिंदी)" isRequired={false} disabled={templeModel.id > 0 && editTempleId === 0} name="hiName" value={templeModel.hiName} placeholder="मंदिर का नाम हिंदी में दर्ज करें" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.taName} labelText="Name (Tamil)" isRequired={false}  disabled={templeModel.id > 0 && editTempleId === 0} isRequired={true} name="taName" value={templeModel.taName} placeholder="Enter temple name" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.teName} labelText="Name (Telugu)" isRequired={false}  disabled={templeModel.id > 0 && editTempleId === 0} isRequired={true} name="teName" value={templeModel.teName} placeholder="Enter temple name" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.latitude} labelText="Latitude" isRequired={true} disabled={templeModel.id > 0 && editTempleId === 0} name="latitude" value={templeModel.latitude} placeholder="Enter Latitude (25.3109° N)" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.longitude} labelText="Longitude" isRequired={true} disabled={templeModel.id > 0 && editTempleId === 0} name="longitude" value={templeModel.longitude} placeholder="Enter Longitude (83.0107° E)" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (Eng.)" isRequired={true}></Label>
              <textarea name="enDescription" value={templeModel.enDescription} disabled={templeModel.id > 0 && editTempleId === 0} rows={4} style={{ resize: 'none' }} placeholder="Enter Description in English" onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.enDescription} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (हिंदी)" isRequired={false}></Label>
              <textarea name="hiDescription" value={templeModel.hiDescription} disabled={templeModel.id > 0 && editTempleId === 0} rows={4} style={{ resize: 'none' }} placeholder="हिंदी में विवरण दर्ज करें" onChange={changeHandler} className=" form-control form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (Tamil)" isRequired={false}></Label>
              <textarea name="taDescription" value={templeModel.taDescription} isRequired={false}  disabled={templeModel.id > 0 && editTempleId === 0} rows={4} style={{ resize: 'none' }} placeholder="Enter Description in Tamil" onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.taDescription} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (Telugu)" isRequired={false}></Label>
              <textarea name="teDescription" value={templeModel.teDescription} isRequired={false}  disabled={templeModel.id > 0 && editTempleId === 0} rows={4} style={{ resize: 'none' }} placeholder="Enter Description in Telugu" onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.teDescription} />
            </div>
            {/* <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.templeURL} labelText="Temple URL (Eng.)" isRequired={true} name="templeURL" value={templeModel.templeURL} placeholder="Enter temple URL" onChangeHandler={changeHandler} className="form-control-sm" />
            </div> */}
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.temple360DegreeVideoURL} labelText="360 Degree Video Url" isRequired={true} disabled={templeModel.id > 0 && editTempleId === 0} name="temple360DegreeVideoURL" value={templeModel.temple360DegreeVideoURL} placeholder="www.google.com" onChangeHandler={changeHandler} className="form-control-sm" />
              <HelpText text="Use comma(,) for multiple url"/>
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <div className='d-flex justify-content-end my-3'>
                <ButtonBox onClickHandler={saveTempleHandler} disabled={isSaving} type={templeModel?.id > 0 ? "update" : "save"} text={templeModel?.id > 0 ? "Update" : "Save"} className="btn-sm mx-3"></ButtonBox>
                <ButtonBox onClickHandler={resetTempleHandler} disabled={isSaving} type="cancel" text="Reset Fields" className="btn-sm"></ButtonBox>
              </div>
            </div>
            <Divider></Divider>
            {templeModel.id > 0 && <section>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Image Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.temple} moduleId={templeModel.id} fileType='image'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Barcode Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.temple} moduleId={templeModel.id} fileType='barcode'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Audio Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.temple} moduleId={templeModel.id} fileType="audio"></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Video Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.temple} moduleId={templeModel.id} fileType='video'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='360 Degree Image Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.temple} moduleId={templeModel.id} fileType='360degreeimage'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='QR Code'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <div style={{ background: 'white', padding: '16px',width:'100%',textAlign:'center' }} ref={componentRef}>
                  <h6 style={{color:'black',textAlign:'center'}}>Temple Name : {templeModel.enName} - {templeModel.hiName}</h6>
                  <h6 style={{color:'black',textAlign:'center'}}>Temple ID : {templeModel.id}</h6>
                  <h6 style={{color:'black',textAlign:'center'}}>Temple Sequence : {templeModel.sequenceNo}</h6>
                  <QRCode 
                  id="templeQrCode" 
                  value={`${window.location.origin}/#/QrLanding?type=temple&id=${templeModel.id}`} 
                  title={templeModel.enName}
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
