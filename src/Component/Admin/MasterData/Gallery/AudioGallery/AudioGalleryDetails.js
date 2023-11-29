import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Breadcrumb from '../../../Common/Breadcrumb'
import TableView from '../../../tables/TableView'
import { Api } from '../../../../../apis/Api';
import { apiUrls } from '../../../../../apis/ApiUrls';
import Dropdown from '../../../Common/Dropdown';
import ButtonBox from '../../../Common/ButtonBox';
import { headerFormat } from '../../../../../utils/tableHeaderFormat'
import { toast } from 'react-toastify';
import { toastMessage } from '../../../../../constants/ConstantValues'

export default function AudioGalleryDetails() {
  let navigate = useNavigate();
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const breadcrumbOption = {
    title: 'Master-Audio Gallery',
    items: [
      {
        isActive: false,
        title: "Master-Audio Gallery",
        icon: "fa-solid fa-gopuram"
      }
    ],
    buttons: [
      {
        text: "Add Audio Gallery",
        icon: 'fa-solid fa-gopuram',
        handler: () => { },
        link: "/admin/master/audiogallery/add"
      }
    ]
  }
  const handleSearch = (searchTerm) => {

  }
  const handleDelete = (id) => {
    Api.Get(apiUrls.galleryController.deleteAudiogGallery + `?id=${id}`)
      .then(res => {
        if (res.data > 0) {
          toast.success(toastMessage.deleteSuccess);
        }
        else toast.warn(toastMessage.deleteError);
      });
  }

  const tableOptionTemplet = {
    headers: headerFormat.AudioGalleryDetails,
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
          navigate("/admin/master/audiogallery/add?audioGalleryId=" + id);
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
    Api.Get(apiUrls.galleryController.getAudioGallery + `?pageNo=${pageNo}&pageSize=${pageSize}`)
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
