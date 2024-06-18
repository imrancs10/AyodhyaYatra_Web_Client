import React, { useEffect, useState, useRef } from 'react'
import { Api } from '../../apis/Api';
import { apiUrls } from '../../apis/ApiUrls';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { headerFormat } from '../../utils/tableHeaderFormat';
import TableView from './tables/TableView';

export default function AdDashboard() {
  const [feedbackDetails, setFeedbackDetails] = useState({});
  const [dashboardCount, setDashboardCount] = useState({});
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  useEffect(() => {
    Api.Get(apiUrls.feedbackController.getFeedback)
      .then(res => {
        setFeedbackDetails(res.data.slice(0, 10));
      });
  }, []);
  useEffect(() => {
    Api.Get(apiUrls.feedbackController.getDashboardCount)
      .then(res => {
        setDashboardCount(res.data);
      });
  }, []);
  const tableOptionTemplet = {
    headers: headerFormat.visitorDetails,
    data: [],
    totalRecords: 0,
    pageSize: pageSize,
    pageNo: pageNo,
    setPageNo: setPageNo,
    setPageSize: setPageSize,
    showTableTop: false,
    showAction: false
  }
  const [tableOption, setTableOption] = useState(tableOptionTemplet);
  useEffect(() => {
    Api.Get(apiUrls.visitorContrller.getVisitor + `?pageNo=${pageNo}&pageSize=${pageSize}`)
      .then(res => {
        tableOptionTemplet.data = res.data;
        tableOptionTemplet.totalRecords = res.data?.length;
        setTableOption({ ...tableOptionTemplet });
      });
  }, [pageNo, pageSize])
  return (
    <>
      <h1 className="h3 mb-3 text-center"><strong>Admin</strong> Dashboard</h1>
      <div class="row">
        <div class="col-3">
          <div class="card bg-light mb-3">
            <div class="card-header text-white bg-primary"><h5 class="card-title">No. of Yatra's</h5></div>
            <div class="card-body text-center">
              <h1>{dashboardCount?.yatraCount??0}</h1>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="card bg-light mb-3">
            <div class="card-header text-white bg-warning"><h5 class="card-title">Monthly Visitors</h5></div>
            <div class="card-body text-center">
              <h1>{dashboardCount?.monthlyVisitorCounts?.length > 0 ? dashboardCount?.monthlyVisitorCounts[0].count : 0}</h1>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="card bg-light mb-3">
            <div class="card-header text-white bg-info"><h5 class="card-title">Registrations</h5></div>
            <div class="card-body text-center">
              <h1>{dashboardCount?.registrationCount??0}</h1>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="card bg-light mb-3">
            <div class="card-header text-white bg-info"><h5 class="card-title">Charity</h5></div>
            <div class="card-body text-center">
              <h1>{dashboardCount?.charityCount??0}</h1>
            </div>
          </div>
        </div>
        {dashboardCount?.attractionCounts?.map(res => {
          return <div class="col-3">
            <div class="card bg-light mb-3">
              <div class="card-header text-white bg-success"> <h5 class="card-title">{res?.attractionType}</h5></div>
              <div class="card-body text-center">
                <h1>{res?.count}</h1>
              </div>
            </div>
          </div>
        })}

      </div>
      <div className="container-fluid p-0">
        <div className="row">
          <div style={{background:"white"}} className="col-12">
            <h5 className="card-title mb-0">Visitors</h5>
            <hr />
            <TableView option={tableOption} />
          </div>
        </div>

      </div>
    </>
  )
}
