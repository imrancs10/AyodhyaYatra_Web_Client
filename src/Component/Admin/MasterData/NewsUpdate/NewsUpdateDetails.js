import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Breadcrumb from '../../Common/Breadcrumb'
import TableView from '../../tables/TableView'
import { Api } from '../../../../apis/Api';
import { apiUrls } from '../../../../apis/ApiUrls';
import Dropdown from '../../Common/Dropdown';
import ButtonBox from '../../Common/ButtonBox';
import { headerFormat } from '../../../../utils/tableHeaderFormat'
import { toast } from 'react-toastify';
import { toastMessage } from '../../../../constants/ConstantValues'

export default function NewsUpdateDetails() {
  let navigate = useNavigate();
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [deleted, setDeleted] = useState(false);
  const breadcrumbOption = {
    title: 'Master-News-Update',
    items: [
      {
        isActive: false,
        title: "Master-News-Update",
        icon: "fa-solid fa-gopuram"
      }
    ],
    buttons: [
      {
        text: "Add News Update",
        icon: 'fa-solid fa-gopuram',
        handler: () => { },
        link: "/admin/master/newsupdate/add"
      }
    ]
  }
  const handleSearch = (searchTerm) => {

  }
  const handleDelete = (id) => {
    Api.Delete(apiUrls.newsUpdateController.deleteNewsUpdate + `?id=${id}`)
      .then(res => {
        if (res.data > 0) {
          toast.success(toastMessage.deleteSuccess);
          setDeleted(true);
        }
        else toast.warn(toastMessage.deleteError);
      });
  }

  const tableOptionTemplet = {
    headers: headerFormat.NewsUpdateDetails,
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
          navigate("/admin/master/newsupdate/add?newsUpdateId=" + id);
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
    Api.Get(apiUrls.newsUpdateController.getNewsUpdate + `?pageNo=${pageNo}&pageSize=${pageSize}`)
      .then(res => {
        tableOptionTemplet.data = res.data;
        tableOptionTemplet.totalRecords = res.data.length;
        setTableOption({ ...tableOptionTemplet });
      });
  }, [pageNo, pageSize, deleted])

  const [tableOption, setTableOption] = useState(tableOptionTemplet);
  return (
    <>
      <Breadcrumb option={breadcrumbOption}></Breadcrumb>
      {/* <div className='d-flex justify-content-end mb-3'>
        <div className='mx-2'>
          <Dropdown className="form-control-sm"></Dropdown>
        </div>
        <div className='mx-2'>
          <ButtonBox type="Add" className="btn-sm"></ButtonBox>
        </div>
      </div> */}
      <TableView option={tableOption} />
    </>
  )
}
