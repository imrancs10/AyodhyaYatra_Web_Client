import React, { useState, useEffect } from 'react'
import Label from '../../Common/Label'
import Dropdown from '../../Common/Dropdown'
import ErrorLabel from '../../Common/ErrorLabel'
import Inputbox from '../../Common/Inputbox'
import FormHeader from '../../Common/FormHeader'
import FileUpload from '../../Common/FileUpload'
import Divider from '../../Common/Divider'
import ButtonBox from '../../Common/ButtonBox'
import { Api } from '../../../../apis/Api'
import { apiUrls } from '../../../../apis/ApiUrls'
import { toast } from 'react-toastify'
import { toastMessage } from '../../../../constants/ConstantValues'
import { validationMessage } from '../../../../constants/validationMessage'
import { fileUploadModuleName } from '../../../../constants/enums';
import { useSearchParams, useNavigate } from 'react-router-dom'

export default function AddPadav() {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const editPadavId = searchParams.get("padavId");
  const padavModelTemplate = {
    yatraId: 0,
    enPadavName: "",
    hiPadavName: "",
    enDescription: "",
    hiDescription: "",
    enYatraName: "",
    hiYatraName: "",
    taPadavName: "",
    tePadavName: "",
    taDescription: "",
    teDescription: "",
    taYatraName: "",
    teYatraName: "",
    id: 0,
  };
  const [padavModel, setpadavModel] = useState(padavModelTemplate);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState();
  // const [padavList, setPadavList] = useState([]);
  const [yatraList, setYatraList] = useState([]);
  // const [templeList, setTempleList] = useState([]);

  const changeHandler = (e) => {
    var { name, type, value } = e.target;
    if (type === 'select-one') {
      value = parseInt(value);
    }
    setpadavModel({ ...padavModel, [name]: value });
  }

  const savePadavHandler = () => {
    let formError = validatePadav();
    if (Object.keys(formError).length > 0) {
      setError(formError);
      return;
    }
    setError({});
    var model = padavModel;
    model.id = model.id === -1 ? 0 : model.id;
    setIsSaving(true);
    if (padavModel.id === 0) {
      Api.Put(apiUrls.masterDataController.addPadavs, padavModel)
        .then(res => {
          setIsSaving(false);
          if (res.data?.id > 0) {
            toast.success(toastMessage.saveSuccess);
            setpadavModel({ ...res.data });
          }
          else
            toast.warn(toastMessage.saveError);
        })
        .catch(err => {
          setIsSaving(false);
        });
    }
    else {
      Api.Post(apiUrls.masterDataController.addPadavs, padavModel)
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
    let id = parseInt(editPadavId);
    if (!isNaN(id) && id > 0) {
      Api.Get(apiUrls.masterDataController.getPadavById + `/${id}`)
        .then(res => {
          setpadavModel({ ...res.data });
        });
    }
  }, [editPadavId]);

  // useEffect(() => {
  //   var apiList = [];
  //   apiList.push();
  //   apiList.push(Api.Get(apiUrls.masterDataController.getYatras));
  //   apiList.push(Api.Get(apiUrls.templeController.getTemples));
  //   Api.MultiCall(apiList)
  //     .then(res => {
  //       setYatraList(res[0].data);
  //       setTempleList(res[1].data.data);
  //     });
  // }, []);

  useEffect(() => {
    Api.Get(apiUrls.masterDataController.getYatras)
      .then(res => {
        setYatraList(res.data);
      })
  }, [])

  // useEffect(() => {
  //   Api.Get(apiUrls.masterDataController.getPadavByYatraId+`/${padavModel.yatraId}`)
  //   .then(res=>{
  //     setPadavList(res.data);
  //   })
  // }, [padavModel.yatraId])



  const validatePadav = () => {
    var { enPadavName, id } = padavModel;
    var err = {};
    // if (!yatraId || yatraId === 0) err.yatraId = validationMessage.reqYatraName;
    // if (yatraId > 0) {
    //   if (!padavId || padavId === 0) err.padavId = validationMessage.reqPadavName;
    //   if (!sequenceNo || sequenceNo === "") err.sequenceNo = validationMessage.reqSequenceNumber;
    // }
    // if (id === 0) {
    //   err.id = validationMessage.reqTempleSelect;
    // }
    if (id === -1 || id > 0) {
      if (!enPadavName || enPadavName.length < 6) err.enPadavName = validationMessage.reqPadavEn;
      // if (!enDescription || enDescription.length < 6) err.enDescription = validationMessage.reqTempleDescEn;
      // if (!latitude || latitude.length < 6) err.latitude = validationMessage.reqTempleLatitude;
      // if (!longitude || longitude.length < 6) err.longitude = validationMessage.reqTempleLongitude;
    }
    return err;
  }
  const resetTempleHandler = () => {
    navigate('/admin/master/yatra/add')
    setpadavModel({ ...padavModelTemplate });
  }
  return (
    <>
      <div className='card'>
        <div className='card-header bg-info text-start fs-9'>Add Padav</div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Yatra" isRequired={true}></Label>
              <Dropdown data={yatraList} addNA={true} name="yatraId" value={padavModel.yatraId} elementKey="id" text="enName" defaultText="Select Yatra" onChange={changeHandler} className="form-control-sm" />
              <ErrorLabel message={error?.yatraId} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.enPadavName} labelText="Name (Eng.)" isRequired={true} name="enPadavName" value={padavModel.enPadavName} placeholder="Enter padav name" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.hiPadavName} labelText="Name (हिंदी)" isRequired={false} name="hiPadavName" value={padavModel.hiPadavName} placeholder="पड़ाव का नाम हिंदी में दर्ज करें" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.taPadavName} labelText="Name (Tamil)" isRequired={false} name="taPadavName" value={padavModel.taPadavName} placeholder="Enter padav name" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.tePadavName} labelText="Name (Telugu)" isRequired={false} name="tePadavName" value={padavModel.tePadavName} placeholder="Enter padav name" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (Eng.)" isRequired={true}></Label>
              <textarea name="enDescription" value={padavModel.enDescription} rows={4} style={{ resize: 'none' }} placeholder="Enter Description in English" onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.enDescription} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (हिंदी)" isRequired={false}></Label>
              <textarea name="hiDescription" value={padavModel.hiDescription} rows={4} style={{ resize: 'none' }} placeholder="हिंदी में विवरण दर्ज करें" onChange={changeHandler} className=" form-control form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (Tamil)" isRequired={false}></Label>
              <textarea name="taDescription" value={padavModel.taDescription} rows={4} style={{ resize: 'none' }} placeholder="Enter Description in Tamil" onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.taDescription} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (Telugu)" isRequired={false}></Label>
              <textarea name="teDescription" value={padavModel.teDescription} rows={4} style={{ resize: 'none' }} placeholder="Enter Description in Telugu" onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.teDescription} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <div className='d-flex justify-content-end my-3'>
                <ButtonBox onClickHandler={savePadavHandler} disabled={isSaving} type={padavModel?.id > 0 ? "update" : "save"} text={padavModel?.id > 0 ? "Update" : "Save"} className="btn-sm mx-3"></ButtonBox>
                <ButtonBox onClickHandler={resetTempleHandler} disabled={isSaving} type="cancel" text="Reset Fields" className="btn-sm"></ButtonBox>
              </div>
            </div>
            <Divider></Divider>
            {padavModel.id > 0 && <section>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Image Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.Padav} moduleId={padavModel.id} fileType='image'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Barcode Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.Padav} moduleId={padavModel.id} fileType='barcode'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Audio Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.Padav} moduleId={padavModel.id} fileType="audio"></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Video Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.Padav} moduleId={padavModel.id} fileType='video'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Banner Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.Padav} moduleId={padavModel.id} fileType='banner'></FileUpload>
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
