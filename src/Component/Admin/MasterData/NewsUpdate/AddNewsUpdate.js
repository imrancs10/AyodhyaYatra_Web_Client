import React, { useState, useEffect } from 'react'
import Label from '../../Common/Label'
import Dropdown from '../../Common/Dropdown'
import ErrorLabel from '../../Common/ErrorLabel'
import Inputbox from '../../Common/Inputbox'
import FormHeader from '../../Common/FormHeader'
import FileUpload from '../../Common/FileUpload'
import Divider from '../../Common/Divider'
import ButtonBox from '../../Common/ButtonBox'
import DatePicker from '../../Common/DatePicker'
import { Api } from '../../../../apis/Api'
import { apiUrls } from '../../../../apis/ApiUrls'
import { toast } from 'react-toastify'
import { toastMessage } from '../../../../constants/ConstantValues'
import { validationMessage } from '../../../../constants/validationMessage'
import { fileUploadModuleName } from '../../../../constants/enums';
import { useSearchParams, useNavigate } from 'react-router-dom'
import { common } from '../../../../utils/common'

export default function AddNewsUpdate() {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const editnewsUpdateId = searchParams.get("newsUpdateId");
  const newsUpdateModelTemplate = {
    enTitle: "",
    hiTitle: "",
    enDescription: "",
    hiDescription: "",
    taTitle: "",
    teTitle: "",
    taDescription: "",
    teDescription: "",
    webUrl: "",
    masterDataType: 26,
    newsUpdateType: "",
    masterDataTypeName: "NewsUpdate",
    newsUpdateTypeName: "",
    eventDate: "",
    id: 0,
  };
  const [newsUpdateModel, setnewsUpdateModel] = useState(newsUpdateModelTemplate);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState();
  // const [padavList, setPadavList] = useState([]);
  const [newsUpdateTypeList, setNewsUpdateTypeList] = useState([]);
  // const [templeList, setTempleList] = useState([]);

  const changeHandler = (e) => {
    var { name, type, value } = e.target;
    if (type === 'select-one') {
      value = parseInt(value);
    }
    setnewsUpdateModel({ ...newsUpdateModel, [name]: value });
  }

  const saveNewsUpdateHandler = () => {
    let formError = validateNewsUpdate();
    if (Object.keys(formError).length > 0) {
      setError(formError);
      return;
    }
    setError({});
    var model = newsUpdateModel;
    model.id = model.id === -1 ? 0 : model.id;
    newsUpdateModel.eventDate = newsUpdateModel.eventDate ? newsUpdateModel.eventDate : "";
    setIsSaving(true);
    if (newsUpdateModel.id === 0) {
      Api.Put(apiUrls.newsUpdateController.addNewsUpdate, newsUpdateModel)
        .then(res => {
          setIsSaving(false);
          if (res.data?.id > 0) {
            toast.success(toastMessage.saveSuccess);
            setnewsUpdateModel({ ...res.data });
          }
          else
            toast.warn(toastMessage.saveError);
        })
        .catch(err => {
          setIsSaving(false);
        });
    }
    else {
      Api.Post(apiUrls.newsUpdateController.updateNewsUpdate, newsUpdateModel)
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
    let id = parseInt(editnewsUpdateId);
    if (!isNaN(id) && id > 0) {
      Api.Get(apiUrls.newsUpdateController.getNewsUpdateyId + `/${id}`)
        .then(res => {
          setnewsUpdateModel({ ...res.data });
        });
    }
  }, [editnewsUpdateId]);

  // useEffect(() => {
  //   var apiList = [];
  //   apiList.push();
  //   apiList.push(Api.Get(apiUrls.masterDataController.getYatras));
  //   apiList.push(Api.Get(apiUrls.templeController.getTemples));
  //   Api.MultiCall(apiList)
  //     .then(res => {
  //       setNewsUpdateTypeList(res[0].data);
  //       setTempleList(res[1].data.data);
  //     });
  // }, []);

  useEffect(() => {
    Api.Get(apiUrls.masterDataController.getYatras)
      .then(res => {
        setNewsUpdateTypeList(res.data);
      })
  }, [])

  // useEffect(() => {
  //   Api.Get(apiUrls.masterDataController.getPadavByYatraId+`/${newsUpdateModel.yatraId}`)
  //   .then(res=>{
  //     setPadavList(res.data);
  //   })
  // }, [newsUpdateModel.yatraId])



  const validateNewsUpdate = () => {
    var { enTitle, id } = newsUpdateModel;
    var err = {};
    // if (!yatraId || yatraId === 0) err.yatraId = validationMessage.reqYatraName;
    // if (yatraId > 0) {
    //   if (!newsUpdateId || newsUpdateId === 0) err.newsUpdateId = validationMessage.reqPadavName;
    //   if (!sequenceNo || sequenceNo === "") err.sequenceNo = validationMessage.reqSequenceNumber;
    // }
    // if (id === 0) {
    //   err.id = validationMessage.reqTempleSelect;
    // }
    if (id === -1 || id > 0) {
      if (!enTitle || enTitle.length < 6) err.enTitle = validationMessage.reqNewsUpdateEn;
      // if (!enDescription || enDescription.length < 6) err.enDescription = validationMessage.reqTempleDescEn;
      // if (!latitude || latitude.length < 6) err.latitude = validationMessage.reqTempleLatitude;
      // if (!longitude || longitude.length < 6) err.longitude = validationMessage.reqTempleLongitude;
    }
    return err;
  }
  const resetTempleHandler = () => {
    navigate('/admin/master/newsupdate/add')
    setnewsUpdateModel({ ...newsUpdateModelTemplate });
  }
  return (
    <>
      <div className='card'>
        <div className='card-header bg-info text-start fs-9'>Add News Update</div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Select Type" isRequired={true}></Label>
              <Dropdown data={common.NewsUpdateEnum} name="newsUpdateType" value={newsUpdateModel.newsUpdateType} defaultText="Select Type" onChange={changeHandler} className="form-control-sm" />
              <ErrorLabel message={error?.masterDataType} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.enTitle} labelText="Name (Eng.)" isRequired={true} name="enTitle" value={newsUpdateModel.enTitle} placeholder="Enter Title" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.hiTitle} labelText="Name (हिंदी)" isRequired={false} name="hiTitle" value={newsUpdateModel.hiTitle} placeholder="हिंदी में दर्ज करें" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.taTitle} labelText="Name (Tamil)" isRequired={false} name="taTitle" value={newsUpdateModel.taTitle} placeholder="Enter Title" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.teTitle} labelText="Name (telugu)" isRequired={false} name="teTitle" value={newsUpdateModel.teTitle} placeholder="Enter Title" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (Eng.)" isRequired={true}></Label>
              <textarea name="enDescription" value={newsUpdateModel.enDescription} rows={4} style={{ resize: 'none' }} placeholder="Enter Description in English" onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.enDescription} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (हिंदी)" isRequired={false}></Label>
              <textarea name="hiDescription" value={newsUpdateModel.hiDescription} rows={4} style={{ resize: 'none' }} placeholder="हिंदी में विवरण दर्ज करें" onChange={changeHandler} className=" form-control form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (Tamil)" isRequired={false}></Label>
              <textarea name="taDescription" value={newsUpdateModel.taDescription} rows={4} style={{ resize: 'none' }} placeholder="Enter Description in Tamil" onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.enDescription} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (telugu)" isRequired={false}></Label>
              <textarea name="teDescription" value={newsUpdateModel.teDescription} rows={4} style={{ resize: 'none' }} placeholder="Enter Description in telugu" onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.enDescription} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.webUrl} labelText="Web Url" isRequired={false} name="webUrl" value={newsUpdateModel.webUrl} placeholder="Enter Web URL" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <DatePicker errorMessage={error?.eventDate} labelText="Event Date" isRequired={false} name="eventDate" value={common.getHtmlDate(newsUpdateModel.eventDate, 'yyyymmdd')} onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <div className='d-flex justify-content-end my-3'>
                <ButtonBox onClickHandler={saveNewsUpdateHandler} disabled={isSaving} type={newsUpdateModel?.id > 0 ? "update" : "save"} text={newsUpdateModel?.id > 0 ? "Update" : "Save"} className="btn-sm mx-3"></ButtonBox>
                <ButtonBox onClickHandler={resetTempleHandler} disabled={isSaving} type="cancel" text="Reset Fields" className="btn-sm"></ButtonBox>
              </div>
            </div>
            <Divider></Divider>
            {newsUpdateModel.id > 0 && <section>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Image Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.NewsUpdate} moduleId={newsUpdateModel.id} fileType='image'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Barcode Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.NewsUpdate} moduleId={newsUpdateModel.id} fileType='barcode'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Audio Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.NewsUpdate} moduleId={newsUpdateModel.id} fileType="audio"></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Video Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.NewsUpdate} moduleId={newsUpdateModel.id} fileType='video'></FileUpload>
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
