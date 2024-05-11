import React, { useEffect, useState, useRef } from 'react'
import { Api } from '../../apis/Api';
import { apiUrls } from '../../apis/ApiUrls';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function AdDashboard() {
  const [feedbackDetails, setFeedbackDetails] = useState({});
  const [dashboardCount, setDashboardCount] = useState({});
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
  return (
    <>
      <h1 className="h3 mb-3 text-center"><strong>Admin</strong> Dashboard</h1>
      <div class="row">
        <div class="col-3">
          <div class="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
            <div class="card-header text-white bg-primary"><h5 class="card-title">No. of Yatra's</h5></div>
            <div class="card-body text-center">
              <h1>{dashboardCount?.yatraCount}</h1>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
            <div class="card-header text-white bg-warning"><h5 class="card-title">Monthly Visitors</h5></div>
            <div class="card-body text-center">
              <h1>{dashboardCount?.monthlyVisitorCounts?.length > 0 ? dashboardCount?.monthlyVisitorCounts[0].count : 0}</h1>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
            <div class="card-header text-white bg-info"><h5 class="card-title">Registrations</h5></div>
            <div class="card-body text-center">
              <h1>{dashboardCount?.registrationCount}</h1>
            </div>
          </div>
        </div>
        {dashboardCount?.attractionCounts?.map(res => {
          return <div class="col-3">
            <div class="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
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
          <div className="col-12 col-lg-8 col-xxl-9 d-flex">
            <div className="card flex-fill">
              <div className="card-header">

                <h5 className="card-title mb-0">Latest Feedback</h5>
              </div>
              <table className="table table-hover my-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className="d-none d-xl-table-cell">Email Id</th>
                    <th className="d-none d-xl-table-cell">Contact Number</th>
                    <th className="d-none d-xl-table-cell">Address</th>
                    <th className="d-none d-md-table-cell">Comment</th>
                    <th className="d-none d-md-table-cell">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbackDetails?.length > 0 && feedbackDetails?.map((res, index) => {
                    return <tr>
                      <td>{res?.name}</td>
                      <td className="d-none d-xl-table-cell">{res?.emailId}</td>
                      <td className='d-none d-xl-table-cell'>{res?.contactNumber}</td>
                      <td className="d-none d-md-table-cell">{res?.address}</td>
                      <td className="d-none d-md-table-cell">{res?.feedbackComment}</td>
                      <td className="d-none d-md-table-cell">{res?.createdAt}</td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-12 col-lg-4 col-xxl-3 d-flex">
            <div className="card flex-fill w-100">
              <div className="card-header">

                <h5 className="card-title mb-0">Monthly Visitors</h5>
              </div>
              <div className="card-body d-flex w-100">
                <div className="align-self-center chart chart-lg">
                  <canvas id="chartjs-dashboard-bar"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
