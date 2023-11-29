import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Breadcrumb from '../Common/Breadcrumb'
import TableView from '../tables/TableView'
import { headerFormat } from '../../../utils/tableHeaderFormat'
import { Api } from '../../../apis/Api';
import { apiUrls } from '../../../apis/ApiUrls';
import { toast } from 'react-toastify';
import { toastMessage } from '../../../constants/ConstantValues';
import Dropdown from '../Common/Dropdown';
import { common } from '../../../utils/common';

export default function MasterDataDetails() {
    let navigate = useNavigate();
    const [filterData, setFilterData] = useState({
        masterDataType:9,
    })
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const breadcrumbOption = {
      title: 'Master Data',
      items: [
        {
          isActive: false,
          title: "Master Data Details",
          icon: "fa-solid fa-gopuram"
        }
      ],
      buttons: [
        {
          text: "Add Master Data",
          icon: 'fa-solid fa-gopuram',
          handler: () => { },
          link: "/admin/master/data/add"
        }
      ]
    }
  
    const handleSearch = (searchTerm) => {
      
      Api.Get(apiUrls.masterDataController.searchMasterData + `?pageNo=${pageNo}&pageSize=${pageSize}&searchTerm=${searchTerm}`)
      .then(res => {
        tableOptionTemplet.data = res.data.data;
        tableOptionTemplet.totalRecords = res.data.totalCount;
        setTableOption({ ...tableOptionTemplet });
      });
    }
   const textChange=(e)=>{
    var {name,type,value}=e.target;
    if(type==='select-one')
    {
        value=parseInt(value);
    }
    setFilterData({...filterData,[name]:value});
   }
    const handleDelete = (id) => {
      Api.Get(apiUrls.masterDataController.deleteMasterData + `?id=${id}`)
        .then(res => {
          if (res.data > 0) {
            toast.success(toastMessage.deleteSuccess);
          }
          else toast.warn(toastMessage.deleteError);
        });
    }
    const tableOptionTemplet = {
      headers: headerFormat.masterDataDetails,
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
            navigate("/admin/master/data/add?Id=" + id);
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
      Api.Get(apiUrls.masterDataController.getMasterData + `?pageNo=${pageNo}&pageSize=${pageSize}&masterDataType=${filterData.masterDataType}`)
        .then(res => {
          tableOptionTemplet.data = res.data;
          tableOptionTemplet.totalRecords = res.length;
          setTableOption({ ...tableOptionTemplet });
        });
    }, [pageNo, pageSize,filterData.masterDataType])
  
    const [tableOption, setTableOption] = useState(tableOptionTemplet);
    return (
      <>
        <Breadcrumb option={breadcrumbOption}></Breadcrumb>
        <div>
            <Dropdown data={common.masterDataTypes} name="masterDataType" onChange={textChange} value={filterData.masterDataType} className="form-control-sm"/>
        </div>
        <TableView option={tableOption} />
      </>
    )
}
