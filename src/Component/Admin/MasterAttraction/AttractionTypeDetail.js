import React, { useState, useEffect } from 'react'
import Breadcrumb from '../Common/Breadcrumb'
import TableView from '../tables/TableView'
import { Api } from '../../../apis/Api'
import { apiUrls } from '../../../apis/ApiUrls'
import { toastMessage } from '../../../constants/ConstantValues'
import { headerFormat } from '../../../utils/tableHeaderFormat'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function AttractionTypeDetail() {

    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    let navigate = useNavigate();
    const breadcrumbOption = {
        title: 'Temple',
        items: [
            {
                isActive: false,
                title: "Attraction Type Details",
                icon: "fa-solid fa-gopuram"
            }
        ],
        buttons: [
            {
                text: "Add Attraction Type",
                icon: 'fa-solid fa-gopuram',
                handler: () => { },
                link: "/admin/attraction/type/add"
            }
        ]
    }

    const handleSearch = (searchTerm) => {

        Api.Get(apiUrls.masterAttractionsController.searchAttraction + `?pageNo=${pageNo}&pageSize=${pageSize}&searchTerm=${searchTerm}`)
            .then(res => {
                tableOptionTemplet.data = res.data.data;
                tableOptionTemplet.totalRecords = res.data.totalCount;
                setTableOption({ ...tableOptionTemplet });
            });
    }

    const handleDelete = (id) => {
        Api.Delete(apiUrls.masterAttractionsController.deleteAttraction + `/${id}`)
            .then(res => {
                if (res.data > 0) {
                    toast.success(toastMessage.deleteSuccess);
                }
                else toast.warn(toastMessage.deleteError);
            });
    }
    const tableOptionTemplet = {
        headers: headerFormat.attractionTypeDetails,
        data: [],
        totalRecords: 0,
        pageSize: pageSize,
        pageNo: pageNo,
        setPageNo: setPageNo,
        setPageSize: setPageSize,
        searchHandler: handleSearch,
        actions: {
            showView:false,
            popupModelId: "",
            delete: {
                handler: handleDelete
            },
            edit:{
                handler: (id) => {
                    navigate("/admin/attraction/type/add?Id=" + id);
                  },
                  showModel:false
            }
        }
    }

    useEffect(() => {
        Api.Get(apiUrls.masterAttractionsController.getAllAttractionTypes + `?pageNo=${pageNo}&pageSize=${pageSize}`)
            .then(res => {
                tableOptionTemplet.data = res.data.data;
                tableOptionTemplet.totalRecords = res.data.totalCount;
                setTableOption({ ...tableOptionTemplet });
            });
    }, [pageNo, pageSize])

    const [tableOption, setTableOption] = useState(tableOptionTemplet);
    return (
        <>
            <Breadcrumb option={breadcrumbOption}></Breadcrumb>
            <TableView option={tableOption} />
        </>
    )
}
