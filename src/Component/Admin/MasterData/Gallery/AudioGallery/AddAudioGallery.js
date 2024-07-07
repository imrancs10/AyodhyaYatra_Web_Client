import React, { useState, useEffect } from 'react'
import Label from '../../../Common/Label'
import Dropdown from '../../../Common/Dropdown'
import ErrorLabel from '../../../Common/ErrorLabel'
import Inputbox from '../../../Common/Inputbox'
import FormHeader from '../../../Common/FormHeader'
import FileUpload from '../../../Common/FileUpload'
import Divider from '../../../Common/Divider'
import ButtonBox from '../../../Common/ButtonBox'
import DatePicker from '../../../Common/DatePicker'
import { Api } from '../../../../../apis/Api'
import { apiUrls } from '../../../../../apis/ApiUrls'
import { toast } from 'react-toastify'
import { toastMessage } from '../../../../../constants/ConstantValues'
import { validationMessage } from '../../../../../constants/validationMessage'
import { fileUploadModuleName } from '../../../../../constants/enums';
import { useSearchParams, useNavigate } from 'react-router-dom'
import { common } from '../../../../../utils/common'
import Breadcrumb from '../../../Common/Breadcrumb'

export default function AddAudioGallery() {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const editaudioGalleryId = searchParams.get("audioGalleryId");
  const audioGalleryModelTemplate = {
    enName: "",
    hiName: "",
    taName: "",
    teName: "",
    id: 0,
  };
  const [audioGalleryModel, setAudioGalleryModel] = useState(audioGalleryModelTemplate);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState();

  const changeHandler = (e) => {
    var { name, type, value } = e.target;
    if (type === 'select-one') {
      value = parseInt(value);
    }
    setAudioGalleryModel({ ...audioGalleryModel, [name]: value });
  }

  const saveAudioGalleryHandler = () => {
    let formError = validateAudioGallery();
    if (Object.keys(formError).length > 0) {
      setError(formError);
      return;
    }
    setError({});
    var model = audioGalleryModel;
    model.id = model.id === -1 ? 0 : model.id;
    setIsSaving(true);
    if (audioGalleryModel.id === 0) {
      Api.Put(apiUrls.galleryController.addAudioGallery, audioGalleryModel)
        .then(res => {
          setIsSaving(false);
          if (res.data?.id > 0) {
            toast.success(toastMessage.saveSuccess);
            setAudioGalleryModel({ ...res.data });
          }
          else
            toast.warn(toastMessage.saveError);
        })
        .catch(err => {
          setIsSaving(false);
        });
    }
    else {
      Api.Post(apiUrls.galleryController.updateAudioGallery, audioGalleryModel)
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
    let id = parseInt(editaudioGalleryId);
    if (!isNaN(id) && id > 0) {
      Api.Get(apiUrls.galleryController.getAudioGalleryById + `/${id}`)
        .then(res => {
          setAudioGalleryModel({ ...res.data });
        });
    }
  }, [editaudioGalleryId]);

  const validateAudioGallery = () => {
    var { enName, id } = audioGalleryModel;
    var err = {};
    if (id === -1 || id > 0) {
      if (!enName || enName.length < 6)
        err.enName = validationMessage.reqNewsUpdateEn;
    }
    return err;
  }
  const resetAudioGalleryHandler = () => {
    navigate('/admin/master/photoalbum/add')
    setAudioGalleryModel({ ...audioGalleryModelTemplate });
  } 
  const breadcrumbOption = {
    title: 'Add Audio Gallery',
    items: [
      {
        isActive: false,
        title: "Add Audio Gallery",
        icon: "fa-solid fa-gopuram"
      }
    ],
    buttons: [{
      text: "Back",
      icon: 'fa-solid fa-arrow-left',
      handler: () => { },
      link: '/admin/master/audiogallery/detail'
    },
    {
      text: "Audio Album List",
      icon: 'fa-solid fa-gopuram',
      handler: () => { },
      link: '/admin/master/audiogallery/detail'
    }
    ]
  }
  return (
    <>
     <Breadcrumb option={breadcrumbOption}></Breadcrumb>
     <hr/>
      <div className='card'>
        <div className='card-header bg-info text-start fs-9'>Add Audio Gallery</div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.enName} labelText="Name (Eng.)" isRequired={true} name="enName" value={audioGalleryModel.enName} placeholder="Enter Title" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.hiName} labelText="Name (हिंदी)" isRequired={false} name="hiName" value={audioGalleryModel.hiName} placeholder="हिंदी में दर्ज करें" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.taName} labelText="Name (Tamil)" isRequired={false} name="taName" value={audioGalleryModel.taName} placeholder="Enter Title" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.teName} labelText="Name (telugu)" isRequired={false} name="teName" value={audioGalleryModel.teName} placeholder="Enter Title" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <div className='d-flex justify-content-end my-3'>
                <ButtonBox onClickHandler={saveAudioGalleryHandler} disabled={isSaving} type={audioGalleryModel?.id > 0 ? "update" : "save"} text={audioGalleryModel?.id > 0 ? "Update" : "Save"} className="btn-sm mx-3"></ButtonBox>
                <ButtonBox onClickHandler={resetAudioGalleryHandler} disabled={isSaving} type="cancel" text="Reset Fields" className="btn-sm"></ButtonBox>
              </div>
            </div>
            <Divider></Divider>
            {audioGalleryModel.id > 0 && <section>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Audio Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.AudioGallery} moduleId={audioGalleryModel.id} fileType='audio'></FileUpload>
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
