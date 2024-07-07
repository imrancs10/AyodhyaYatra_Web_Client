import React,{useState,useEffect} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Api } from '../../../apis/Api';
import { apiUrls } from '../../../apis/ApiUrls';
import { toast } from 'react-toastify';
import { toastMessage } from '../../../constants/ConstantValues';
import { validationMessage } from '../../../constants/validationMessage';
import Label from '../Common/Label';
import ButtonBox from '../Common/ButtonBox';
import Inputbox from '../Common/Inputbox';
import Dropdown from '../Common/Dropdown';
import ErrorLabel from '../Common/ErrorLabel';
import Breadcrumb from '../Common/Breadcrumb';

export default function AddCharity() {
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const charityId = searchParams.get("id");
    const [charityMasterData, setCharityMasterData] = useState([])
    const charityModelTemplate = {
        charityName: "",
        charityType: "",
        charityPurpose: "",
        email: "",
        address: "",
        mobile: "",
        id: 0,
    };
    const [charityModel, setCharityModel] = useState(charityModelTemplate);
    const [isSaving, setIsSaving] = useState(true);
    const [error, setError] = useState();

    const changeHandler = (e) => {
        var { name, type, value } = e.target;
        setCharityModel({ ...charityModel, [name]: value });
    }

    const saveCharityHandler = () => {
        let formError = validateCharity();
        if (Object.keys(formError).length > 0) {
            setError(formError);
            return;
        }
        setError({});
        var model = charityModel;
        model.id = model.id <= 0 ? 0 : model.id;
        setIsSaving(true);
        if (charityModel.id === 0) {
            Api.Put(apiUrls.charityController.addCharity, charityModel)
                .then(res => {
                    setIsSaving(false);
                    if (res.data === true) {
                        toast.success(toastMessage.saveSuccess);
                        setCharityModel({ ...res.data });
                    }
                    else
                        toast.warn(toastMessage.saveError);
                })
                .catch(err => {
                    setIsSaving(false);
                });
        }
        else {
            Api.Post(apiUrls.charityController.updateCharity, charityModel)
                .then(res => {
                    setIsSaving(false);
                    if (res.data === true) {
                        toast.success(toastMessage.updateSuccess);
                    }
                    else
                        toast.warn(toastMessage.updateError);
                });
        }
    }

    useEffect(() => {
        let id = parseInt(charityId);
        if (!isNaN(id) && id > 0) {
            setIsSaving(false);
            Api.Get(apiUrls.charityController.getCharityById + `${id}`)
                .then(res => {
                    setCharityModel({ ...res.data });
                });
        }
        else{
            setIsSaving(true)
        }
    }, [charityId]);

    useEffect(() => {
        Api.Get(apiUrls.charityController.getAllCharityMaster)
            .then(res => {
                setCharityMasterData(res?.data?.data);
            });
    }, []);



    const validateCharity = () => {
        var { charityName,charityType,charityPurpose,email,mobile } = charityModel;
        var err = {};
        if (!charityName || charityName?.length <5) err.charityName = validationMessage.reqCharityName;
        if (!charityPurpose || charityPurpose==="") err.charityPurpose = validationMessage.reqCharityPurpose;
        if (!charityType || charityType==="") err.charityType = validationMessage.reqCharityType;
        if (!email || email==="") err.email = validationMessage.reqCharityEmail;
        if (!mobile || mobile==="") err.mobile = validationMessage.reqCharityMobile;

        return err;
    }
    const resetTempleHandler = () => {
        navigate('/admin/charity/add')
        setCharityModel({ ...charityModelTemplate });
    }

    const breadcrumbOption = {
        title: 'Add Charity',
        items: [
          {
            isActive: false,
            title: "Add Charity",
            icon: "fa-solid fa-gopuram"
          }
        ],
        buttons: [
            {
                text: "Back",
                icon: 'fa-solid fa-arrow-left',
                handler: () => { },
                link: "/admin/charity/details"
              },
          {
            text: "Charity List",
            icon: 'fa-solid fa-gopuram',
            handler: () => { },
            link: "/admin/charity/details"
          }
        ]
      }
    return (
        <>
        <Breadcrumb option={breadcrumbOption}></Breadcrumb>
        <hr/>
            <div className='card'>
                <div className='card-header bg-info text-start fs-9'>Add New Charity</div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                            <Inputbox errorMessage={error?.charityName} labelText="Name" isRequired={true} name="charityName" value={charityModel.charityName} placeholder="Enter name" onChangeHandler={changeHandler} className="form-control-sm" />
                        </div>
                        <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                            <Label text="Select Charity Type" isRequired={true}></Label>
                            <Dropdown data={charityMasterData?.filter(x=>x.dataType==="CharityType")} elementKey="value" name="charityType" value={charityModel.charityType} defaultText="Select charity type" onChange={changeHandler} className="form-control-sm" />
                            <ErrorLabel message={error?.charityType} />
                        </div>

                        <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                            <Label text="Select Charity Purpose" isRequired={true}></Label>
                            <Dropdown data={charityMasterData?.filter(x=>x.dataType==="CharityPurpose")} elementKey="value" name="charityPurpose" value={charityModel.charityPurpose} defaultText="Select charity purpose" onChange={changeHandler} className="form-control-sm" />
                            <ErrorLabel message={error?.charityPurpose} />
                        </div>
                        
                        <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                            <Inputbox errorMessage={error?.email} labelText="Email" isRequired={true} name="email" value={charityModel.email} placeholder="Email" onChangeHandler={changeHandler} className="form-control-sm" />
                        </div>
                        <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                            <Inputbox errorMessage={error?.mobile} labelText="Mobile" isRequired={true} name="mobile" value={charityModel.mobile} placeholder="Mobile Number" onChangeHandler={changeHandler} className="form-control-sm" />
                        </div>
                        <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                            <Inputbox labelText="Address" isRequired={false} name="address" value={charityModel.address} placeholder="Address" onChangeHandler={changeHandler} className="form-control-sm" />
                        </div>
                        <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                            <div className='d-flex justify-content-end my-3'>
                                <ButtonBox onClickHandler={saveCharityHandler} disabled={isSaving} type={!isSaving ? "update" : "save"} text={!isSaving ? "Update" : "Save"} className="btn-sm mx-3"></ButtonBox>
                                <ButtonBox onClickHandler={resetTempleHandler} disabled={isSaving} type="cancel" text="Reset Fields" className="btn-sm"></ButtonBox>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card-footer'></div>
            </div>
        </>
    )
}
