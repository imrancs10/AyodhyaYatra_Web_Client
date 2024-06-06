import React, { useState, useEffect } from 'react'
import Label from '../Common/Label'
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
import Breadcrumb from '../Common/Breadcrumb'

export default function AddMasterData() {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const editMasterDataId = searchParams.get("Id");
  const masterDataModelTemplate = {
    enName: "",
    hiName: "",
    taName: "",
    teName: "",
    enDescription: "",
    hiDescription: "",
    taescription: "",
    teDescription: "",
    id: 0,
    latitude: "",
    longitude: "",
    masterDataType: 0,
  };
  const [masterDataModel, setMasterDataModel] = useState(masterDataModelTemplate);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState();
  const changeHandler = (e) => {
    var { name, type, value } = e.target;
    if (type === 'select-one') {
      value = parseInt(value);
    }
    setMasterDataModel({ ...masterDataModel, [name]: value });
  }

  const saveMasterDataHandler = () => {

    let formError = validateTemple();
    if (Object.keys(formError).length > 0) {
      setError(formError);
      return;
    }
    setError({});
    var model = masterDataModel;

    model.id = model.id === -1 ? 0 : model.id;
    setIsSaving(true);
    if (masterDataModel.id === 0) {
      Api.Put(apiUrls.masterDataController.addMasterData, masterDataModel)
        .then(res => {
          setIsSaving(false);
          if (res.data > 0) {
            toast.success(toastMessage.saveSuccess);
            setMasterDataModel({ ...res.data });
          }
          else
            toast.warn(toastMessage.saveError);
        })
        .catch(err => {
          setIsSaving(false);
        });
    }
    else {
      Api.Post(apiUrls.masterDataController.updateMasterData, masterDataModel)
        .then(res => {
          setIsSaving(false);
          if (res.data > 0) {
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
    let id = parseInt(editMasterDataId);
    if (!isNaN(id) && id > 0) {
      Api.Get(apiUrls.masterDataController.getMasterDataById + `${id}`)
        .then(res => {
          setMasterDataModel({ ...res.data });
        });
    }
  }, [editMasterDataId]);

  useEffect(() => {
    if (masterDataModel?.id > 0) {
      Api.Get(apiUrls.masterDataController.getMasterDataById + `${masterDataModel.id}`)
        .then(res => {
          var modal = masterDataModel;
          modal = res.data;
          modal.yatraId = masterDataModel.yatraId;
          modal.padavId = masterDataModel.padavId;
          modal.sequenceNo = masterDataModel.sequenceNo;
          setMasterDataModel({ ...modal });
        });
    }
  }, [masterDataModel.id]);



  const validateTemple = () => {
    var { enName, enDescription, latitude, longitude, masterDataType, id } = masterDataModel;
    var err = {};
    if (!enName || enName.length < 6) err.enName = validationMessage.reqMasterDataNameEn;
    if (!masterDataType || masterDataType < 1) err.masterDataType = validationMessage.reqMasterDataType;
    if (!enDescription || enDescription.length < 6) err.enDescription = validationMessage.reqTempleDescEn;
    if (!latitude || latitude.length < 6) err.latitude = validationMessage.reqTempleLatitude;
    if (!longitude || longitude.length < 6) err.longitude = validationMessage.reqTempleLongitude;

    return err;
  }
  const resetTempleHandler = () => {
    navigate('/admin/masterdara/master/add')
    setMasterDataModel({ ...masterDataModelTemplate });
  }

  const getMasterDataTypeText = () => {
    var data = common.masterDataTypes.find(x => x.id === masterDataModel.masterDataType);
    return data === undefined ? "" : data.value;
  }

  const breadcrumbOption = {
    title: 'Master Data',
    items: [
      {
        isActive: false,
        title: "Master Data Details",
        icon: "fa-solid fa-gopuram"
      }
    ],
    buttons: [
      {
        text: "Master Data Details",
        icon: 'fa-solid fa-gopuram',
        handler: () => { },
        link: "/admin/master/data/detail"
      }
    ]
  }
  return (
    <>
     <Breadcrumb option={breadcrumbOption}></Breadcrumb>
     <hr></hr>
      <div className='card'>
        <div className='card-header bg-info text-start fs-9'>Add master data</div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Master Data Type" isRequired={true}></Label>
              <Dropdown data={common.masterDataTypes.filter(x => x.id > 1)} name="masterDataType" value={masterDataModel.masterDataType} defaultText="Select Master Data Type" onChange={changeHandler} className="form-control-sm" />
              <ErrorLabel message={error?.masterDataType} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.enName} labelText="Name (Eng.)" disabled={masterDataModel.id > 0 && editMasterDataId === 0} isRequired={true} name="enName" value={masterDataModel.enName} placeholder={`Enter ${getMasterDataTypeText()} name`} onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.hiName} labelText="Name (हिंदी)" isRequired={false} disabled={masterDataModel.id > 0 && editMasterDataId === 0} name="hiName" value={masterDataModel.hiName} placeholder="मास्टर डेटा का नाम हिंदी में दर्ज करें" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.taName} labelText="Name (Tamil)" disabled={masterDataModel.id > 0 && editMasterDataId === 0} isRequired={false} name="taName" value={masterDataModel.taName} placeholder={`Enter ${getMasterDataTypeText()} name`} onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.teName} labelText="Name (Telugu)" disabled={masterDataModel.id > 0 && editMasterDataId === 0} isRequired={false} name="teName" value={masterDataModel.teName} placeholder={`Enter ${getMasterDataTypeText()} name`} onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.latitude} labelText="Latitude" isRequired={true} disabled={masterDataModel.id > 0 && editMasterDataId === 0} name="latitude" value={masterDataModel.latitude} placeholder="Enter Latitude (25.3109° N)" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.longitude} labelText="Longitude" isRequired={true} disabled={masterDataModel.id > 0 && editMasterDataId === 0} name="longitude" value={masterDataModel.longitude} placeholder="Enter Longitude (83.0107° E)" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (Eng.)" isRequired={true}></Label>
              <textarea name="enDescription" value={masterDataModel.enDescription} disabled={masterDataModel.id > 0 && editMasterDataId === 0} rows={4} style={{ resize: 'none' }} placeholder={`Enter ${getMasterDataTypeText()} Description`} onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.enDescription} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (हिंदी)" isRequired={false}></Label>
              <textarea name="hiDescription" value={masterDataModel.hiDescription} disabled={masterDataModel.id > 0 && editMasterDataId === 0} rows={4} style={{ resize: 'none' }} placeholder="हिंदी में विवरण दर्ज करें" onChange={changeHandler} className=" form-control form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (Tamil)" isRequired={false}></Label>
              <textarea name="taDescription" value={masterDataModel.taDescription} disabled={masterDataModel.id > 0 && editMasterDataId === 0} rows={4} style={{ resize: 'none' }} placeholder={`Enter ${getMasterDataTypeText()} Description`} onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.taDescription} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (Telugu)" isRequired={false}></Label>
              <textarea name="teDescription" value={masterDataModel.teDescription} disabled={masterDataModel.id > 0 && editMasterDataId === 0} rows={4} style={{ resize: 'none' }} placeholder={`Enter ${getMasterDataTypeText()} Description`} onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.teDescription} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <div className='d-flex justify-content-end my-3'>
                <ButtonBox onClickHandler={saveMasterDataHandler} disabled={isSaving} type={masterDataModel?.id > 0 ? "update" : "save"} text={masterDataModel?.id > 0 ? "Update" : "Save"} className="btn-sm mx-3"></ButtonBox>
                <ButtonBox onClickHandler={resetTempleHandler} disabled={isSaving} type="cancel" text="Reset Fields" className="btn-sm"></ButtonBox>
              </div>
            </div>
            <Divider></Divider>
            {masterDataModel.id > 0 && <section>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Image Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={masterDataModel.masterDataType} moduleId={masterDataModel.id} fileType='image'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Barcode Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={masterDataModel.masterDataType} moduleId={masterDataModel.id} fileType='barcode'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Audio Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={masterDataModel.masterDataType} moduleId={masterDataModel.id} fileType="audio"></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Video Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={masterDataModel.masterDataType} moduleId={masterDataModel.id} fileType='video'></FileUpload>
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
