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
import Breadcrumb from '../../Common/Breadcrumb'

export default function AddYatra() {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const editYatraId = searchParams.get("yatraId");
  const yatraModelTemplate = {
    enName: "",
    hiName: "",
    taName: "",
    teName: "",
    enDescription: "",
    hiDescription: "",
    taDescription: "",
    teDescription: "",
    id: 0,
  };
  const [yatraModel, setyatraModel] = useState(yatraModelTemplate);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState();

  const changeHandler = (e) => {
    var { name, type, value } = e.target;
    if (type === 'select-one') {
      value = parseInt(value);
    }
    setyatraModel({ ...yatraModel, [name]: value });
  }

  const saveYatraHandler = () => {
    let formError = validateYatra();
    if (Object.keys(formError).length > 0) {
      setError(formError);
      return;
    }
    setError({});
    var model = yatraModel;
    model.id = model.id === -1 ? 0 : model.id;
    setIsSaving(true);
    if (yatraModel.id === 0) {
      Api.Put(apiUrls.masterDataController.addYatras, yatraModel)
        .then(res => {
          setIsSaving(false);
          if (res.data?.id > 0) {
            toast.success(toastMessage.saveSuccess);
            setyatraModel({ ...res.data });
          }
          else
            toast.warn(toastMessage.saveError);
        })
        .catch(err => {
          setIsSaving(false);
        });
    }
    else {
      Api.Post(apiUrls.masterDataController.addYatras, yatraModel)
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
    let id = parseInt(editYatraId);
    if (!isNaN(id) && id > 0) {
      Api.Get(apiUrls.masterDataController.getYatraById + `/${id}`)
        .then(res => {
          setyatraModel({ ...res.data });
        });
    }
  }, [editYatraId]);

  const validateYatra = () => {
    var { enName, id, enDescription } = yatraModel;
    var err = {};
    if (id === -1 || id > 0) {
      if (!enName || enName.length < 6) err.enName = validationMessage.reqYatraEn;
      if (!enDescription || enDescription.length < 6) err.enDescription = validationMessage.reqAttractionDescEn;
    }
    return err;
  }
  const resetYatraHandler = () => {
    navigate('/admin/master/yatra/add')
    setyatraModel({ ...yatraModelTemplate });
  }
  const breadcrumbOption = {
    title: 'Add Yatra',
    items: [
      {
        isActive: false,
        title: "Yatra Details",
        icon: "fa-solid fa-gopuram"
      }
    ],
    buttons: [ {
      text: "Back",
      icon: 'fa-solid fa-arrow-left',
      handler: () => { },
      link: "/admin/master/yatra/detail"
    },
      {
        text: "Yatra List",
        icon: 'fa-solid fa-gopuram',
        handler: () => { },
        link: "/admin/master/yatra/detail"
      }
    ]
  }
  return (
    <>
      <Breadcrumb option={breadcrumbOption}></Breadcrumb>
      <hr />
      <div className='card'>
        <div className='card-header bg-info text-start fs-9'>Add Yatra</div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.enName} labelText="Name (Eng.)" isRequired={true} name="enName" value={yatraModel.enName} placeholder="Enter yatra name" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.hiName} labelText="Name (हिंदी)" isRequired={false} name="hiName" value={yatraModel.hiName} placeholder="यात्रा का नाम हिंदी में दर्ज करें" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.taName} labelText="Name (Tamil)" isRequired={false} name="taName" value={yatraModel.taName} placeholder="Enter yatra name" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Inputbox errorMessage={error?.teName} labelText="Name (Telugu)" isRequired={false} name="teName" value={yatraModel.teName} placeholder="Enter yatra name" onChangeHandler={changeHandler} className="form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (Eng.)" isRequired={true}></Label>
              <textarea name="enDescription" value={yatraModel.enDescription} rows={4} style={{ resize: 'none' }} placeholder="Enter Description in English" onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.enDescription} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (हिंदी)" isRequired={false}></Label>
              <textarea name="hiDescription" value={yatraModel.hiDescription} rows={4} style={{ resize: 'none' }} placeholder="हिंदी में विवरण दर्ज करें" onChange={changeHandler} className=" form-control form-control-sm" />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (Tamil)" isRequired={false}></Label>
              <textarea name="taDescription" value={yatraModel.taDescription} rows={4} style={{ resize: 'none' }} placeholder="Enter Description in Tamil" onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.taDescription} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <Label text="Description (Telugu)" isRequired={false}></Label>
              <textarea name="teDescription" value={yatraModel.teDescription} rows={4} style={{ resize: 'none' }} placeholder="Enter Description in Telugu" onChange={changeHandler} className=" form-control form-control-sm" />
              <ErrorLabel message={error?.teDescription} />
            </div>
            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
              <div className='d-flex justify-content-end my-3'>
                <ButtonBox onClickHandler={saveYatraHandler} disabled={isSaving} type={yatraModel?.id > 0 ? "update" : "save"} text={yatraModel?.id > 0 ? "Update" : "Save"} className="btn-sm mx-3"></ButtonBox>
                <ButtonBox onClickHandler={resetYatraHandler} disabled={isSaving} type="cancel" text="Reset Fields" className="btn-sm"></ButtonBox>
              </div>
            </div>
            <Divider></Divider>
            {yatraModel.id > 0 && <section>

              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Image Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.Yatra} moduleId={yatraModel.id} fileType='image'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Audio Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.Yatra} moduleId={yatraModel.id} fileType="audio"></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Video Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.Yatra} moduleId={yatraModel.id} fileType='video'></FileUpload>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FormHeader heaterText='Banner Upload'></FormHeader>
              </div>
              <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.Yatra} moduleId={yatraModel.id} fileType='banner'></FileUpload>
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
