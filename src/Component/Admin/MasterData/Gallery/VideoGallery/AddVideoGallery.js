import React, { useState, useEffect } from 'react'
import Inputbox from '../../../Common/Inputbox'
import FormHeader from '../../../Common/FormHeader'
import FileUpload from '../../../Common/FileUpload'
import Divider from '../../../Common/Divider'
import ButtonBox from '../../../Common/ButtonBox'
import { Api } from '../../../../../apis/Api'
import { apiUrls } from '../../../../../apis/ApiUrls'
import { toast } from 'react-toastify'
import { toastMessage } from '../../../../../constants/ConstantValues'
import { validationMessage } from '../../../../../constants/validationMessage'
import { fileUploadModuleName } from '../../../../../constants/enums';
import { useSearchParams, useNavigate } from 'react-router-dom'
import Breadcrumb from '../../../Common/Breadcrumb';

export default function AddVideoGallery() {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const editvideoGalleryId = searchParams.get("videoGalleryId");
  const videoGalleryModelTemplate = {
    enName: "",
    hiName: "",
    taName: "",
    teName: "",
    videoUrl: "",
    id: 0,
  };
  const [videoGalleryModel, setvideoGalleryModel] = useState(videoGalleryModelTemplate);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState();

  const changeHandler = (e) => {
    var { name, type, value } = e.target;
    if (type === 'select-one') {
      value = parseInt(value);
    }
    setvideoGalleryModel({ ...videoGalleryModel, [name]: value });
  }

  const saveVideoGalleryHandler = () => {
    let formError = validateVideoGallery();
    if (Object.keys(formError).length > 0) {
      setError(formError);
      return;
    }
    setError({});
    var model = videoGalleryModel;
    model.id = model.id === -1 ? 0 : model.id;
    setIsSaving(true);
    if (videoGalleryModel.id === 0) {
      Api.Put(apiUrls.galleryController.addVideoGallery, videoGalleryModel)
        .then(res => {
          setIsSaving(false);
          if (res.data?.id > 0) {
            toast.success(toastMessage.saveSuccess);
            setvideoGalleryModel({ ...res.data });
          }
          else
            toast.warn(toastMessage.saveError);
        })
        .catch(err => {
          setIsSaving(false);
        });
    }
    else {
      Api.Post(apiUrls.galleryController.updateVideoGallery, videoGalleryModel)
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
    let id = parseInt(editvideoGalleryId);
    if (!isNaN(id) && id > 0) {
      Api.Get(apiUrls.galleryController.getVideoGalleryById + `/${id}`)
        .then(res => {
          setvideoGalleryModel({ ...res.data });
        });
    }
  }, [editvideoGalleryId]);

  const validateVideoGallery = () => {
    var { enName, id } = videoGalleryModel;
    var err = {};
    if (id === -1 || id > 0) {
      if (!enName || enName.length < 6) err.enName = validationMessage.reqNewsUpdateEn;
    }
    return err;
  }
  const resetVideoGalleryHandler = () => {
    navigate('/admin/master/videogallery/add')
    setvideoGalleryModel({ ...videoGalleryModelTemplate });
  }
  const breadcrumbOption = {
    title: 'Add Video Gallery',
    items: [
      {
        isActive: false,
        title: "Add Video Gallery",
        icon: "fa-solid fa-gopuram"
      }
    ],
    buttons: [{
      text: "Back",
      icon: 'fa-solid fa-arrow-left',
      handler: () => { },
      link: '/admin/master/videogallery/detail'
    },
    {
      text: "Video Album List",
      icon: 'fa-solid fa-gopuram',
      handler: () => { },
      link: '/admin/master/videogallery/detail'
    }
    ]
  }
  return (
    <> 
    <Breadcrumb option={breadcrumbOption}></Breadcrumb>
     <hr/>
      <div className='card'>
        <div className='card-header bg-info text-start fs-9'>Add Video Gallery</div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.enName} labelText="Name (Eng.)" isRequired={true} name="enName" value={videoGalleryModel.enName} placeholder="Enter Title" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.hiName} labelText="Name (हिंदी)" isRequired={false} name="hiName" value={videoGalleryModel.hiName} placeholder="हिंदी में दर्ज करें" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.taName} labelText="Name (Tamil)" isRequired={false} name="taName" value={videoGalleryModel.taName} placeholder="Enter Title" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.teName} labelText="Name (telugu)" isRequired={false} name="teName" value={videoGalleryModel.teName} placeholder="Enter Title" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            {
              videoGalleryModel.id > 0 && videoGalleryModel?.images?.length == 0 && <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <Inputbox errorMessage={error?.videoUrl} labelText="Video URL" isRequired={false} name="videoUrl" value={videoGalleryModel.videoUrl} placeholder="Enter Video URL" onChangeHandler={changeHandler} className="form-control-sm" />
              </div>
            }
            {
              videoGalleryModel.id == 0 && <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <Inputbox errorMessage={error?.videoUrl} labelText="Video URL" isRequired={false} name="videoUrl" value={videoGalleryModel.videoUrl} placeholder="Enter Video URL" onChangeHandler={changeHandler} className="form-control-sm" />
              </div>
            }
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <div className='d-flex justify-content-end my-3'>
                <ButtonBox onClickHandler={saveVideoGalleryHandler} disabled={isSaving} type={videoGalleryModel?.id > 0 ? "update" : "save"} text={videoGalleryModel?.id > 0 ? "Update" : "Save"} className="btn-sm mx-3"></ButtonBox>
                <ButtonBox onClickHandler={resetVideoGalleryHandler} disabled={isSaving} type="cancel" text="Reset Fields" className="btn-sm"></ButtonBox>
              </div>
            </div>
            <Divider></Divider>
            {videoGalleryModel.id > 0 && videoGalleryModel.videoUrl.trim() == "" && <section>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Video Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.VideoGallery} moduleId={videoGalleryModel.id} fileType='video'></FileUpload>
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
