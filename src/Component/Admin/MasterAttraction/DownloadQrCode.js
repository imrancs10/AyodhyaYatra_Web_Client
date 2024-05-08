import React, { useState, useEffect, useRef } from 'react'
import Breadcrumb from '../Common/Breadcrumb'
import Label from '../Common/Label'
import Dropdown from '../Common/Dropdown'
import ErrorLabel from '../Common/ErrorLabel'
import { Api } from '../../../apis/Api'
import { apiUrls } from '../../../apis/ApiUrls'
import ButtonBox from '../Common/ButtonBox'
import { useReactToPrint } from 'react-to-print';
import QRCode from 'react-qr-code'
import { defaultQueryParams } from '../../../constants/ConstantValues'

export default function DownloadQrCode() {
    const filterModelAttractiont = {
        primaryFilterId: 0,
        secondaryFilterId: 0,
        filterBy: 0
    };
    const [filterModel, setFilterModel] = useState(filterModelAttractiont)
    const [yatraList, setYatraList] = useState([]);
    const [attractionTypeList, setAttractionTypeList] = useState([]);
    const [attractionList, setAttractionList] = useState([]);
    const [primaryFilter, setPrimaryFilter] = useState([]);
    const [secondaryFilter, setSecondaryFilter] = useState([])
    const [error, setError] = useState({});
    const filterByList = [{ id: 1, value: 'Yatra' }, { id: 2, value: 'Attraction Type' }, { id: 2, value: 'Attraction' }]

    useEffect(() => {
        var apiList = [];
        apiList.push(Api.Get(apiUrls.masterDataController.getYatras));
        apiList.push(apiUrls.masterAttractionsController.getAllAttractionTypes + defaultQueryParams.paging)
        apiList.push(Api.Get(apiUrls.masterAttractionsController.getAllAttractions + defaultQueryParams.paging))
        Api.MultiCall(apiList)
            .then(res => {
                setYatraList(res[0].data);
                setAttractionTypeList(res[1].data?.data);
                setAttractionList([{ id: 0, enName: "All Attraction" }, ...res[2].data?.data]);
            })
    }, []);

    const breadcrumbOption = {
        title: ' ',
        items: [
            {
                isActive: false,
                title: "Attraction Details",
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

    useEffect(() => {
        if (filterModel.filterBy === 1) {
            // Api.Get(`${apiUrls.attractionYatraMapperController.getByYatraId}?yatraId=${}`)
            // setPrimaryFilter(yatraList);
            // s
        }
    }, [filterModel.filterBy])

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
    const getPrintAttractionList = () => {
        if (filterModel.attractionId === -2)
            return attractionList;
        else
            return attractionList.filter(x => x.id === filterModel.attractionId);
    }
    return (
        <>
            <Breadcrumb option={breadcrumbOption} />
            <hr />

            <div className='card'>
                <div className='card-header bg-info text-start fs-9'>Download QR</div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                            <Label text="Filter By" isRequired={true}></Label>
                            <Dropdown data={filterByList} name="filterBy" value={filterModel.filterBy} elementKey="id" text="value" defaultText="Select Filter" onChange={changeHandler} className="form-control-sm" />
                            <ErrorLabel message={error?.filterBy} />
                        </div>
                        <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                            <Label text="Yatra" isRequired={true}></Label>
                            <Dropdown data={yatraList} name="yatraId" value={filterModel.yatraId} elementKey="id" text="enName" defaultText="Select Yatra" onChange={changeHandler} className="form-control-sm" />
                            <ErrorLabel message={error?.yatraId} />
                        </div>
                        <div className='col-sm-12 col-md-6 offset-md-3 text-start'>
                            <Label text="Attraction" isRequired={true}></Label>
                            <Dropdown data={attractionList} name="attractionId" addNa={true} value={filterModel.attractionId} elementKey="id" text="enName" defaultText="Select Yatra" onChange={changeHandler} className="form-control-sm" />
                            <ErrorLabel message={error?.attractionId} />
                        </div>
                        <div className='col-sm-12 col-md-6 offset-md-3 text-end my-4'>
                            <ButtonBox type="go" onClickHandler={handlePrint} text="Print QR Code"></ButtonBox>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d'>
                <div className='print-multiple-qr' ref={componentRef}>
                    {
                        getPrintAttractionList()?.map((ele, ind) => {
                            if (ele?.id === -2)
                                return
                            else
                                return <div className='multiple-qr-item' key={ind} >
                                    <div style={{ textAlign: 'center' }}>
                                        <h6 style={{ color: 'black', textAlign: 'center' }}>Attraction Name : {ele?.enName} - {ele?.hiName}</h6>
                                        <h6 style={{ color: 'black', textAlign: 'center' }}>Attraction ID : {ele?.id}</h6>
                                        <h6 style={{ color: 'black', textAlign: 'center', marginBottom: '30px' }}>Attraction Attraction : {ele?.sequenceNo}</h6>
                                        <QRCode
                                            id="attractionQrCode"
                                            value={`${window.location.origin}/#/QrLanding?type=attraction&id=${ele?.id}`}
                                            title={ele?.enName}
                                            style={{ height: 600, maxWidth: "100%", width: "100%" }}
                                        />
                                    </div>
                                </div>
                        })
                    }

                </div>
            </div>
        </>
    )
}
