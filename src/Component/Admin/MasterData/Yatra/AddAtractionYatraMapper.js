import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Api } from '../../../../apis/Api'
import { apiUrls } from '../../../../apis/ApiUrls'
import { toastMessage } from '../../../../constants/ConstantValues'
import { validationMessage } from '../../../../constants/validationMessage'
import Label from '../../Common/Label'
import Dropdown from '../../Common/Dropdown'
import ErrorLabel from '../../Common/ErrorLabel'
import Inputbox from '../../Common/Inputbox'
import ButtonBox from '../../Common/ButtonBox'
import Breadcrumb from '../../Common/Breadcrumb'

export default function AddAtractionYatraMapper() {
    let navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [yatraList, setYatraList] = useState([]);
    const [attractionList, setAttractionList] = useState([]);
    const attractionTypeId = searchParams.get("Id");
    const mapperTemplate = {
        displayOrder: 0,
        id: 0,
        yatraId: 0,
        masterAttractionId: 0
    };
    const [mapperModel, setMapperModel] = useState(mapperTemplate);
    const [isSaving, setIsSaving] = useState(true);
    const [error, setError] = useState();
    const changeHandler = (e) => {
        var { name, value, type } = e.target;
        var model = mapperModel;
        if (type === 'select-one' || type === 'number') {
            value = parseInt(value);
        }
        setMapperModel({ ...mapperModel, [name]: value });
    }

    const saveMapperHandler = () => {
        let formError = validateTemple();
        if (Object.keys(formError).length > 0) {
            setError(formError);
            return;
        }
        setError({});
        if (mapperModel.id === 0) {
            Api.Put(apiUrls.attractionYatraMapperController.add, mapperModel)
                .then(res => {
                    setIsSaving(true);
                    if (res.data > 0) {
                        toast.success(toastMessage.saveSuccess);
                        resetMapperHandler();
                    }
                    else
                        toast.warn(toastMessage.saveError);
                }).catch(err => {
                    toast.warn(err?.response?.data?.message);
                })
        }
        else {
            Api.Post(apiUrls.attractionYatraMapperController.update, mapperModel)
                .then(res => {
                    setIsSaving(false);
                    if (res.data === true) {
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
            Api.Get(`${apiUrls.attractionYatraMapperController.getById}${attractionTypeId}`)
                .then(res => {
                    setMapperModel({ ...res.data });
                    setIsSaving(false);
                });
        }
    }, [attractionTypeId]);

    const validateTemple = () => {
        var { yatraId, masterAttractionId } = mapperModel;
        var err = {};
        if (!yatraId || yatraId < 1) err.yatraId = validationMessage.reqYatraEn;
        if (!masterAttractionId || masterAttractionId < 1) err.masterAttractionId = validationMessage.reqAttractionSelect;
        return err;
    }
    const resetMapperHandler = () => {
        navigate('/admin/yatra/attraction/mapper/add')
        setMapperModel({ ...mapperTemplate });
    }
    const breadcrumbOption = {
        title: 'Add Attraction & Yatra Mapper',
        items: [
            {
                isActive: false,
                title: "Attraction & Yatra Mapper Details",
                icon: "fa-solid fa-gopuram"
            }
        ],
        buttons: [
            {
                text: "Attraction & Yatra Mapper List",
                icon: 'fa-solid fa-gopuram',
                handler: () => { },
                link: "admin/yatra/attraction/mapper"
            }
        ]
    }

    useEffect(() => {
        var apiList = [];
        apiList.push(Api.Get(apiUrls.masterDataController.getYatras + '?pageNo=1&pageSize=10000'))
        apiList.push(Api.Get(apiUrls.masterAttractionsController.getAllAttractions + '?pageNo=1&pageSize=10000'))
        Api.MultiCall(apiList)
            .then(res => {
                setYatraList(res[0].data);
                setAttractionList(res[1].data?.data);
            })
    }, [])

    return (
        <>
            <Breadcrumb option={breadcrumbOption}></Breadcrumb>
            <hr />
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div className='card'>
                            <div className='card-header bg-info text-start fs-9'>Add Attraction & Yatra Mapper</div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <Label text="Yatra" isRequired={true}></Label>
                                        <Dropdown data={yatraList} name="yatraId" text="enName" value={mapperModel.yatraId} defaultText="Select Yatra" onChange={changeHandler} className="form-control-sm" />
                                        <ErrorLabel message={error?.yatraId} />
                                    </div>
                                    <div className='col-12'>
                                        <Label text="Attraction" isRequired={true}></Label>
                                        <Dropdown data={attractionList} name="masterAttractionId" text="enName" value={mapperModel.masterAttractionId} defaultText="Select Attraction" onChange={changeHandler} className="form-control-sm" />
                                        <ErrorLabel message={error?.masterAttractionId} />
                                    </div>
                                    <div className='col-12'>
                                        <Inputbox errorMessage={error?.displayOrder} labelText="Display Order" isRequired={true} name="displayOrder" value={mapperModel.displayOrder} placeholder="Please enter name" onChangeHandler={changeHandler} className="form-control-sm" />
                                    </div>
                                </div>
                            </div>
                            <div className='card-footer text-end'>
                                <ButtonBox className="btn-sm" type={isSaving ? "save" : "update"} onClickHandler={saveMapperHandler} />
                                <ButtonBox className="btn-sm" type="Reset" onClickHandler={resetMapperHandler} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
