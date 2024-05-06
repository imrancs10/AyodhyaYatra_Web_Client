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
      <div className="container-fluid p-0">
        <h1 className="h3 mb-3"><strong>Admin</strong> Dashboard</h1>
        <div className="row">
          <div className="col-xl-6 col-xxl-5 d-flex">
            <div className="w-100">
              <div className="row">
                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col mt-0">
                          <h5 className="card-title">No. of Yatra's</h5>
                        </div>

                        <div className="col-auto">
                          <div className="stat text-primary">
                            <i className="align-middle" data-feather="truck"></i>
                          </div>
                        </div>
                      </div>
                      <h1 className="mt-1 mb-3">{dashboardCount?.yatraCount}</h1>
                      {/* <div className="mb-0">
                        <span className="text-danger"> <i className="mdi mdi-arrow-bottom-right"></i>  </span>
                        <span className="text-muted">Since last week</span>
                      </div> */}
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col mt-0">
                          <h5 className="card-title">Monthly Visitors</h5>
                        </div>

                        <div className="col-auto">
                          <div className="stat text-primary">
                            <i className="align-middle" data-feather="users"></i>
                          </div>
                        </div>
                      </div>
                      <h1 className="mt-1 mb-3">14,212</h1>
                      {/* <div className="mb-0">
                        <span className="text-success"> <i className="mdi mdi-arrow-bottom-right"></i> </span>
                        <span className="text-muted">Since last week</span>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col mt-0">
                          <h5 className="card-title">No. of Temples</h5>
                        </div>

                        <div className="col-auto">
                          <div className="stat text-primary">
                            <i className="align-middle" data-feather="activity"></i>
                          </div>
                        </div>
                      </div>
                      <h1 className="mt-1 mb-3">{dashboardCount?.templeCount}</h1>
                      {/* <div className="mb-0">
                        <span className="text-success"> <i className="mdi mdi-arrow-bottom-right"></i>  </span>
                        <span className="text-muted">Since last week</span>
                      </div> */}
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col mt-0">
                          <h5 className="card-title">Registrations</h5>
                        </div>

                        <div className="col-auto">
                          <div className="stat text-primary">
                            <i className="align-middle" data-feather="shopping-cart"></i>
                          </div>
                        </div>
                      </div>
                      <h1 className="mt-1 mb-3">{dashboardCount?.registrationCount}</h1>
                      {/* <div className="mb-0">
                        <span className="text-danger"> <i className="mdi mdi-arrow-bottom-right"></i>  </span>
                        <span className="text-muted">Since last week</span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-xxl-7">
            <div className="card flex-fill w-100">
              <div className="card-header">

                <h5 className="card-title mb-0">Recent Movement</h5>
              </div>
              <div className="card-body py-3">
                <div className="chart chart-sm">
                  <canvas id="chartjs-dashboard-line"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>



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
