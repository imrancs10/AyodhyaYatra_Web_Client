import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastMessage } from '../../../../constants/ConstantValues'
import { headerFormat } from '../../../../utils/tableHeaderFormat'
import { Api } from '../../../../apis/Api'
import { apiUrls } from '../../../../apis/ApiUrls'
import Breadcrumb from '../../Common/Breadcrumb'
import TableView from '../../tables/TableView'

export default function AttractionYatraMapper() {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    let navigate = useNavigate();

    const handleSearch = (searchTerm) => {

        Api.Get(apiUrls.attractionYatraMapperController.search + `?pageNo=${pageNo}&pageSize=${pageSize}&searchTerm=${searchTerm}`)
            .then(res => {
                tableOptionTemplet.data = res.data.data;
                tableOptionTemplet.totalRecords = res.data.totalCount;
                setTableOption({ ...tableOptionTemplet });
            });
    }

    const handleDelete = (id) => {
        Api.Delete(apiUrls.attractionYatraMapperController.delete + `/${id}`)
            .then(res => {
                if (res.data > 0) {
                    toast.success(toastMessage.deleteSuccess);
                    handleSearch('all')
                }
                else toast.warn(toastMessage.deleteError);
            });
    }
    const tableOptionTemplet = {
        headers: headerFormat.attractionYatraMapper,
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
                    navigate("/admin/yatra/attraction/mapper/add?Id=" + id);
                  },
                  showModel:false
            }
        }
    }

    useEffect(() => {
        Api.Get(apiUrls.attractionYatraMapperController.getAlls + `?pageNo=${pageNo}&pageSize=${pageSize}`)
            .then(res => {
                tableOptionTemplet.data = res.data.data;
                tableOptionTemplet.totalRecords = res.data.totalCount;
                setTableOption({ ...tableOptionTemplet });
            });
    }, [pageNo, pageSize])

    const [tableOption, setTableOption] = useState(tableOptionTemplet);
    const breadcrumbOption = {
        title: 'Attraction & Yatra Mapper',
        items: [
          {
            isActive: false,
            title: "Yatra Details",
            icon: "fa-solid fa-gopuram"
          }
        ],
        buttons: [
          {
            text: "Map Attraction",
            icon: 'fa-solid fa-gopuram',
            handler: () => { },
            link: "/admin/yatra/attraction/mapper/add"
          }
        ]
      }
    return (
        <>
            <Breadcrumb option={breadcrumbOption}></Breadcrumb>
            <TableView option={tableOption} />
        </>
    )
}