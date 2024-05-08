import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Breadcrumb from '../Common/Breadcrumb'
import TableView from '../tables/TableView'
import { headerFormat } from '../../../utils/tableHeaderFormat'
import { Api } from '../../../apis/Api';
import { apiUrls } from '../../../apis/ApiUrls';
import { toast } from 'react-toastify';
import { toastMessage } from '../../../constants/ConstantValues';

export default function TempleDetails() {
  let navigate = useNavigate();
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const breadcrumbOption = {
    title: 'Attractions',
    items: [
      {
        isActive: false,
        title: "Attraction Details",
        icon: "fa-solid fa-gopuram"
      }
    ],
    buttons: [
      {
        text: "Add Attraction",
        icon: 'fa-solid fa-gopuram',
        handler: () => { },
        link: "/admin/attraction/add"
      }
    ]
  }

  const handleSearch = (searchTerm) => {

    Api.Get(apiUrls.templeController.searchTemple + `?pageNo=${pageNo}&pageSize=${pageSize}&searchTerm=${searchTerm}`)
      .then(res => {
        tableOptionTemplet.data = res.data.data;
        tableOptionTemplet.totalRecords = res.data.totalCount;
        setTableOption({ ...tableOptionTemplet });
      });
  }

  const handleDelete = (id) => {
    Api.Delete(apiUrls.templeController.deleteTemple + `/${id}`)
      .then(res => {
        if (res.data > 0) {
          toast.success(toastMessage.deleteSuccess);
        }
        else toast.warn(toastMessage.deleteError);
      });
  }
  const tableOptionTemplet = {
    headers: headerFormat.attractionDetails,
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
          navigate("/admin/attraction/add?id=" + id);
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
    Api.Get(apiUrls.masterAttractionsController.getAllAttractions + `?pageNo=${pageNo}&pageSize=${pageSize}`)
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
      <div className="modal" tabindex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">Save changes</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
