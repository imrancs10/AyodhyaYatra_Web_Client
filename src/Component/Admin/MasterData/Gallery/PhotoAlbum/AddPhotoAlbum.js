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

export default function AddPhotoAlbum() {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const editphotoAlbumId = searchParams.get("photoAlbumId");
  const photoAlbumModelTemplate = {
    enName: "",
    hiName: "",
    teName: "",
    taName: "",
    id: 0,
  };
  const [photoAlbumModel, setphotoAlbumModel] = useState(photoAlbumModelTemplate);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState();

  const changeHandler = (e) => {
    var { name, type, value } = e.target;
    if (type === 'select-one') {
      value = parseInt(value);
    }
    setphotoAlbumModel({ ...photoAlbumModel, [name]: value });
  }

  const savePhotoAlbumHandler = () => {
    let formError = validatePhotoAlbum();
    if (Object.keys(formError).length > 0) {
      setError(formError);
      return;
    }
    setError({});
    var model = photoAlbumModel;
    model.id = model.id === -1 ? 0 : model.id;
    setIsSaving(true);
    if (photoAlbumModel.id === 0) {
      Api.Put(apiUrls.galleryController.addPhotoAlbum, photoAlbumModel)
        .then(res => {
          setIsSaving(false);
          if (res.data?.id > 0) {
            toast.success(toastMessage.saveSuccess);
            setphotoAlbumModel({ ...res.data });
          }
          else
            toast.warn(toastMessage.saveError);
        })
        .catch(err => {
          setIsSaving(false);
        });
    }
    else {
      Api.Post(apiUrls.galleryController.updatePhotoAlbum, photoAlbumModel)
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
    let id = parseInt(editphotoAlbumId);
    if (!isNaN(id) && id > 0) {
      Api.Get(apiUrls.galleryController.getPhotoAlbumById + `/${id}`)
        .then(res => {
          setphotoAlbumModel({ ...res.data });
        });
    }
  }, [editphotoAlbumId]);

  const validatePhotoAlbum = () => {
    var { enName, id } = photoAlbumModel;
    var err = {};
    // if (!yatraId || yatraId === 0) err.yatraId = validationMessage.reqYatraName;
    // if (yatraId > 0) {
    //   if (!photoAlbumId || photoAlbumId === 0) err.photoAlbumId = validationMessage.reqPadavName;
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
  const resetPhotoAlbumHandler = () => {
    navigate('/admin/master/photoalbum/add')
    setphotoAlbumModel({ ...photoAlbumModelTemplate });
  }
  return (
    <>
      <div className='card'>
        <div className='card-header bg-info text-start fs-9'>Add Photo Album</div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.enName} labelText="Name (Eng.)" isRequired={true} name="enName" value={photoAlbumModel.enName} placeholder="Enter Title" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.hiName} labelText="Name (हिंदी)" isRequired={false} name="hiName" value={photoAlbumModel.hiName} placeholder="हिंदी में दर्ज करें" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.taName} labelText="Name (Tamil)" isRequired={false} name="taName" value={photoAlbumModel.taName} placeholder="Enter Title" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.teName} labelText="Name (telugu)" isRequired={false} name="teName" value={photoAlbumModel.teName} placeholder="Enter Title" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <div className='d-flex justify-content-end my-3'>
                <ButtonBox onClickHandler={savePhotoAlbumHandler} disabled={isSaving} type={photoAlbumModel?.id > 0 ? "update" : "save"} text={photoAlbumModel?.id > 0 ? "Update" : "Save"} className="btn-sm mx-3"></ButtonBox>
                <ButtonBox onClickHandler={resetPhotoAlbumHandler} disabled={isSaving} type="cancel" text="Reset Fields" className="btn-sm"></ButtonBox>
              </div>
            </div>
            <Divider></Divider>
            {photoAlbumModel.id > 0 && <section>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Image Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.PhotoAlbum} moduleId={photoAlbumModel.id} fileType='image'></FileUpload>
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
