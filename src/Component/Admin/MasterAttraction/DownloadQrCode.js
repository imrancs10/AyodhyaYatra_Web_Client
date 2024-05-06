import React, { useState, useEffect, useRef } from 'react'
import Breadcrumb from '../Common/Breadcrumb'
import Label from '../Common/Label'
import Dropdown from '../Common/Dropdown'
import ErrorLabel from '../Common/ErrorLabel'
import { Api } from '../../../apis/Api'
import { apiUrls } from '../../../apis/ApiUrls'
import ButtonBox from '../Common/ButtonBox'
import { useReactToPrint } from 'react-to-print';

export default function DownloadQrCode() {
    const filterModelTemplet = {
        yatraId: 0,
        templeId: 0
    };
    const [filterModel, setFilterModel] = useState(filterModelTemplet)
    const [yatraList, setYatraList] = useState([]);
    const [templeList, setTempleList] = useState([]);
    const [error, setError] = useState({});

    useEffect(() => {
        Api.Get(apiUrls.masterDataController.getYatras)
            .then(res => {
                setYatraList(res.data);
            })
    }, [])
    useEffect(() => {
        Api.Get(apiUrls.templeController.getTempleByYatraId + filterModel.yatraId)
            .then(res => {
                setTempleList([{ id: -2, enName: "All Temple" }, ...res.data]);
            })
    }, [filterModel.yatraId])

    const breadcrumbOption = {
        title: ' ',
        items: [
            {
                isActive: false,
                title: "Temple Details",
                icon: "fa-solid fa-gopuram"
            },
            {
                isActive: false,
                title: "Download QR",
                icon: "fa-solid fa-qrcode"
            }
        ],
        buttons: [
        ]
    }
    const changeHandler = (e) => {
        var { type, name, value } = e.target;
        if (type === 'select-one') {
            value = parseInt(value);
        }
        setFilterModel({ ...filterModel, [name]: value });
    }
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const getPrintTempleList = () => {
        if (filterModel.templeId === -2)
            return templeList;
        else
            return templeList.filter(x => x.id === filterModel.templeId);
    }
    return (
        <>
            <Breadcrumb option={breadcrumbOption} />
            <div className='card'>
                <div className='card-header bg-info text-start fs-9'>Download QR</div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                            <Label text="Yatra" isRequired={true}></Label>
                            <Dropdown data={yatraList} name="yatraId" value={filterModel.yatraId} elementKey="id" text="enName" defaultText="Select Yatra" onChange={changeHandler} className="form-control-sm" />
                            <ErrorLabel message={error?.yatraId} />
                        </div>
                        <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                            <Label text="Temple" isRequired={true}></Label>
                            <Dropdown data={templeList} name="templeId" addNa={true} value={filterModel.templeId} elementKey="id" text="enName" defaultText="Select Yatra" onChange={changeHandler} className="form-control-sm" />
                            <ErrorLabel message={error?.templeId} />
                        </div>
                        <div className='col-sm-12 col-md-6 offset-md-3 text-end my-4'>
                            <ButtonBox type="go" onClickHandler={handlePrint} text="Print QR Code"></ButtonBox>
                        </div>
                    </div>
                </div>
            </div>
         <div className='d-none'>
         <div className='print-multiple-qr' ref={componentRef}>
                {
                    getPrintTempleList()?.map((ele, ind) => {
                        if(ele?.id===-2)
                        return
                        else
                        return <div className='multiple-qr-item' key={ind} >
                            <div style={{ textAlign: 'center' }}>
                            <h6 style={{ color: 'black', textAlign: 'center' }}>Temple Name : {ele?.enName} - {ele?.hiName}</h6>
                            <h6 style={{ color: 'black', textAlign: 'center' }}>Temple ID : {ele?.id}</h6>
                            <h6 style={{ color: 'black', textAlign: 'center',marginBottom:'30px' }}>Temple Sequence : {ele?.sequenceNo}</h6>
                            {/* <QRCode
                                id="templeQrCode"
                                value={`${window.location.origin}/#/QrLanding?type=temple&id=${ele?.id}`}
                                title={ele?.enName}
                                style={{height:600, maxWidth: "100%", width: "100%" }}
                            /> */}
                        </div>
                        </div>
                    })
                }

            </div>
         </div>
        </>
    )
}
