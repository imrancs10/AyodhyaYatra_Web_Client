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
import Breadcrumb from '../Common/Breadcrumb'

export default function AddAttractionType() {
    let navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const attractionTypeId = searchParams.get("Id");
    const attractionTypeTemplate = {
        name: "",
        hiName: "",
        teName: "",
        taName: "",
        code: "",
        description:'',
        id: 0
    };
    const [attractionTypeModel, setAttractionTypeModel] = useState(attractionTypeTemplate);
    const [isSaving, setIsSaving] = useState(true);
    const [error, setError] = useState();
    const changeHandler = (e) => {
        var { name, value } = e.target;
        var model = attractionTypeModel;
        if (name === 'name') {
            model.code = value?.toLowerCase()?.replace(" ", "_")
        }
        setAttractionTypeModel({ ...attractionTypeModel, [name]: value?.trim() });
    }   

    const saveTempleHandler = () => {

        let formError = validateTemple();
        if (Object.keys(formError).length > 0) {
            setError(formError);
            return;
        }
        setError({});
        if (attractionTypeModel.id === 0) {
            Api.Put(apiUrls.masterAttractionsController.AddAttractionType, attractionTypeModel)
                .then(res => {
                    setIsSaving(true);
                    if (res.data > 0) {
                        toast.success(toastMessage.saveSuccess);
                        resetTempleHandler();
                    }
                    else
                        toast.warn(toastMessage.saveError);
                }).catch(err=>{
                    toast.warn(err?.response?.data?.message);
                })
        }
        else {
            Api.Post(apiUrls.masterAttractionsController.updateAttractionType, attractionTypeModel)
                .then(res => {
                    setIsSaving(false);
                    if (res.data===true ){
                        toast.success(toastMessage.updateSuccess);
                    }
                    else
                        toast.warn(toastMessage.updateError);
                })
        }
    }

    useEffect(() => {
        let id = parseInt(attractionTypeId);
        if (!isNaN(id) && id > 0) {
            Api.Get(`${apiUrls.masterAttractionsController.getAttractionTypeById}${attractionTypeId}`)
                .then(res => {
                    setAttractionTypeModel({ ...res.data });
                    setIsSaving(false);
                });
        }
    }, [attractionTypeId]);

    const validateTemple = () => {
        var { name, code } = attractionTypeModel;
        var err = {};
        if (!name || name === "") err.name = validationMessage.enReqAttractionTypeName;
        if (!code || code === "") err.code = validationMessage.enReqAttractionTypeCode;
        return err;
    }
    const resetTempleHandler = () => {
        navigate('/admin/attraction/type/add')
        setAttractionTypeModel({ ...attractionTypeTemplate });
    }
    const breadcrumbOption = {
        title: 'Attraction Type',
        items: [
            {
                isActive: false,
                title: "Attraction Type Details",
                icon: "fa-solid fa-gopuram"
            }
        ],
        buttons: [
            {
                text: "Back",
                icon: 'fa-solid fa-arrow-left',
                handler: () => { },
                link: "/admin/attraction/type/details"
              },
            {
                text: "Attraction Type List",
                icon: 'fa-solid fa-gopuram',
                handler: () => { },
                link: "/admin/attraction/type/details"
            }
        ]
    }
    return (
        <>
            <Breadcrumb option={breadcrumbOption}></Breadcrumb>
            <hr />
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div className='card'>
                            <div className='card-header bg-info text-start fs-9'>Add Attraction Type</div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <Inputbox errorMessage={error?.name} labelText="Eng. Name" isRequired={true} name="name" value={attractionTypeModel.name} placeholder="Please enter name" onChangeHandler={changeHandler} className="form-control-sm" />
                                    </div>
                                    <div className='col-12'>
                                        <Inputbox  labelText="Hindi Name" isRequired={true} name="hiName" value={attractionTypeModel.hiName} placeholder="Please enter name in hindi" onChangeHandler={changeHandler} className="form-control-sm" />
                                    </div>
                                    <div className='col-12'>
                                        <Inputbox  labelText="Tamil Name" isRequired={true} name="taName" value={attractionTypeModel.taName} placeholder="Please enter name in tamil " onChangeHandler={changeHandler} className="form-control-sm" />
                                    </div>
                                    <div className='col-12'>
                                        <Inputbox  labelText="Telugu Name" isRequired={true} name="teName" value={attractionTypeModel.teName} placeholder="Please enter name tegulu" onChangeHandler={changeHandler} className="form-control-sm" />
                                    </div>
                                    <div className='col-12'>
                                        <Inputbox  labelText="Description" isRequired={true} name="description" value={attractionTypeModel.description} placeholder="Please enter description" onChangeHandler={changeHandler} className="form-control-sm" />
                                    </div>
                                    <div className='col-12'>
                                        <Inputbox errorMessage={error?.code} labelText="Code" isRequired={true} name="code" value={attractionTypeModel.code} placeholder="Please enter code" onChangeHandler={changeHandler} className="form-control-sm" />
                                    </div>
                                    <div className='col-12'>
                                    {attractionTypeModel.id > 0 && <>
                                            <div>
                                                <FormHeader heaterText='Image Upload'></FormHeader>
                                            </div>
                                            <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                                                <FileUpload disable={isSaving} moduleName={fileUploadModuleName.MasterAttractionType} moduleId={attractionTypeModel.id} fileType='image'></FileUpload>
                                            </div>
                                        </>}
                                    </div>
                                </div>
                            </div>
                            <div className='card-footer text-end'>
                                <ButtonBox className="btn-sm" type={isSaving ? "save" : "update"} onClickHandler={saveTempleHandler} />
                                <ButtonBox className="btn-sm" type="Reset" onClickHandler={resetTempleHandler} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
