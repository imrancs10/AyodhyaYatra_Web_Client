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

export default function AddPhotoGallery() {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const editphotoGalleryId = searchParams.get("photoGalleryId");
  const photoGalleryModelTemplate = {
    enName: "",
    hiName: "",
    teName: "",
    taName: "",
    photoAlbumId:0,
    id: 0,
  };
  const [photoGalleryModel, setphotoGalleryModel] = useState(photoGalleryModelTemplate);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState();
  const [photoAlbumList, setPhotoAlbumList] = useState([]);

  useEffect(() => {
    Api.Get(apiUrls.galleryController.getPhotoAlbum)
      .then(res => {
        setPhotoAlbumList(res.data);
      })
  }, [])

  const changeHandler = (e) => {
    var { name, type, value } = e.target;
    if (type === 'select-one') {
      value = parseInt(value);
    }
    setphotoGalleryModel({ ...photoGalleryModel, [name]: value });
  }

  const savePhotoGalleryHandler = () => {
    let formError = validatePhotoGallery();
    if (Object.keys(formError).length > 0) {
      setError(formError);
      return;
    }
    setError({});
    var model = photoGalleryModel;
    model.id = model.id === -1 ? 0 : model.id;
    setIsSaving(true);
    if (photoGalleryModel.id === 0) {
      Api.Put(apiUrls.galleryController.addPhotoGallery, photoGalleryModel)
        .then(res => {
          setIsSaving(false);
          if (res.data?.id > 0) {
            toast.success(toastMessage.saveSuccess);
            setphotoGalleryModel({ ...res.data });
          }
          else
            toast.warn(toastMessage.saveError);
        })
        .catch(err => {
          setIsSaving(false);
        });
    }
    else {
      Api.Post(apiUrls.galleryController.updatePhotoGallery, photoGalleryModel)
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
    let id = parseInt(editphotoGalleryId);
    if (!isNaN(id) && id > 0) {
      Api.Get(apiUrls.galleryController.getPhotoGalleryById + `/${id}`)
        .then(res => {
          setphotoGalleryModel({ ...res.data });
        });
    }
  }, [editphotoGalleryId]);

  const validatePhotoGallery = () => {
    var { enName, id } = photoGalleryModel;
    var err = {};
    // if (!yatraId || yatraId === 0) err.yatraId = validationMessage.reqYatraName;
    // if (yatraId > 0) {
    //   if (!photoGalleryId || photoGalleryId === 0) err.photoGalleryId = validationMessage.reqPadavName;
    //   if (!sequenceNo || sequenceNo === "") err.sequenceNo = validationMessage.reqSequenceNumber;
    // }
    // if (id === 0) {
    //   err.id = validationMessage.reqTempleSelect;
    // }
    if (id === -1 || id > 0) {
      if (!enName || enName.length < 6) err.enName = validationMessage.reqNewsUpdateEn;
      // if (!enDescription || enDescription.length < 6) err.enDescription = validationMessage.reqTempleDescEn;
      // if (!latitude || latitude.length < 6) err.latitude = validationMessage.reqTempleLatitude;
      // if (!longitude || longitude.length < 6) err.longitude = validationMessage.reqTempleLongitude;
    }
    return err;
  }
  const resetPhotoGalleryHandler = () => {
    navigate('/admin/master/photoalbum/add')
    setphotoGalleryModel({ ...photoGalleryModelTemplate });
  }
  return (
    <>
      <div className='card'>
        <div className='card-header bg-info text-start fs-9'>Add Photo Gallery</div>
        <div className='card-body'>
          <div className='row'>
          <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Photo Album" isRequired={true}></Label>
              <Dropdown data={photoAlbumList} addNA={true} name="photoAlbumId" value={photoGalleryModel.photoAlbumId} elementKey="id" text="enName" defaultText="Select Album" onChange={changeHandler} className="form-control-sm" />
              <ErrorLabel message={error?.photoAlbumId} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.enName} labelText="Name (Eng.)" isRequired={true} name="enName" value={photoGalleryModel.enName} placeholder="Enter Title" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.hiName} labelText="Name (हिंदी)" isRequired={false} name="hiName" value={photoGalleryModel.hiName} placeholder="हिंदी में दर्ज करें" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.enName} labelText="Name (Tamil)" isRequired={false} name="taName" value={photoGalleryModel.taName} placeholder="Enter Title" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.enName} labelText="Name (telugu)" isRequired={false} name="teName" value={photoGalleryModel.teName} placeholder="Enter Title" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <div className='d-flex justify-content-end my-3'>
                <ButtonBox onClickHandler={savePhotoGalleryHandler} disabled={isSaving} type={photoGalleryModel?.id > 0 ? "update" : "save"} text={photoGalleryModel?.id > 0 ? "Update" : "Save"} className="btn-sm mx-3"></ButtonBox>
                <ButtonBox onClickHandler={resetPhotoGalleryHandler} disabled={isSaving} type="cancel" text="Reset Fields" className="btn-sm"></ButtonBox>
              </div>
            </div>
            <Divider></Divider>
            {photoGalleryModel.id > 0 && <section>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Image Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.PhotoGallery} moduleId={photoGalleryModel.id} fileType='image'></FileUpload>
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
