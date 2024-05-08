import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Breadcrumb from '../../Common/Breadcrumb'
import TableView from '../../tables/TableView'
import { Api } from '../../../../apis/Api';
import { apiUrls } from '../../../../apis/ApiUrls';
import Dropdown from '../../Common/Dropdown';
import ButtonBox from '../../Common/ButtonBox';
import { headerFormat } from '../../../../utils/tableHeaderFormat'

export default function YatraDetail() {
  let navigate = useNavigate();
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const breadcrumbOption = {
    title: 'Master-Yatra',
    items: [
      {
        isActive: false,
        title: "Master-Yatra",
        icon: "fa-solid fa-gopuram"
      }
    ],
    buttons: [
      {
        text: "Add Yatra",
        icon: 'fa-solid fa-gopuram',
        handler: () => { },
        link: "/admin/master/yatra/add"
      }
    ]
  }

  const handleSearch=()=>{

  }
  const handleDelete=()=>{
    
  }
  const tableOptionTemplet = {
    headers: headerFormat.YatraDetails,
    data: [],
    totalRecords: 0,
    pageSize: pageSize,
    pageNo: pageNo,
    setPageNo: setPageNo,
    setPageSize: setPageSize,
    searchHandler: handleSearch,
    actions: {
      view: {
        handler: (id) => {
          navigate("/admin/master/yatra/add?yatraId=" + id);
        }
      },
      popupModelId: "",
      delete: {
        handler: handleDelete
      },
      showEdit: false
    }
  }
  useEffect(() => {
    Api.Get(apiUrls.masterDataController.getYatras + `?pageNo=${pageNo}&pageSize=${pageSize}`)
      .then(res => {
        tableOptionTemplet.data = res.data;
        tableOptionTemplet.totalRecords = res.data.length;
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
