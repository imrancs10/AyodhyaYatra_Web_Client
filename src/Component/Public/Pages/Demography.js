import React from 'react'
import { useTranslation } from 'react-i18next';
export default function Demography() {
    const { t, i18n } = useTranslation();
  return (
    <>
    <div className="wrapper banner-wrapper innerBanner">
            <img src="content/themes/district-theme/images/innerBanner.jpg" alt=""/>
        </div>

        <section className="wrapper bodyWrapper">
            <div className="container">
                <div className="row breadcrumb-outer">
                    <div className="left-content push-left">
                        <div id="breadcam" role="navigation" aria-label="breadcrumb">
                            <ul className="breadcrumbs"><li><a href="#/" className="home"><span>{t("home")}</span></a></li> <li><a href="#">{t("aboutKashiYatra")}</a></li><li className="current">{t("demography")}</li></ul>
                        </div>
                    </div>
                    {/* <div className="right-content push-right">
                        <div className="printShare">
                            <ul className="">
                                <li><a href="#" id="print" title="Print Page Content" aria-label="Print Page Content"><span className="icon-printer"></span> <span className="off-css">Print</span></a></li>
                                <li>
                                    <span className="share-text"><em className="icon-share"></em><span className="off-css">Share</span></span>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/sharer/sharer.php?u=#/document-category/notification/&t=Notification"
                                       onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                       target="_blank" title="Share on Facebook" aria-label="Facebook that opens in a new window"><span className="icon-facebook"></span><span className="off-css">Facebook</span></a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/share?url=#/document-category/notification/&via=TWITTER_HANDLE&text=Notification"
                                       onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                       target="_blank" title="Share on Twitter" aria-label="Twitter that opens in a new window"><span className="icon-twitter"></span><span className="off-css">Twitter</span></a>
                                </li>
                            </ul>
                        </div>
                    </div> */}
                </div>
                <div id="SkipContent"></div>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                        <div className="col-8">
                                  <h1>{t("demography")} </h1>
                              </div>
                              <div className="col-4">
                                  <div className="viewSwicther right-content desktopElement">
                                      <a href="javascript:void(0);" className="thumbs-view-btn"><span className="icon-thumbs-view"></span></a>
                                      <a href="javascript:void(0);" className="thumbs-list-view-btn"><span className="icon-list-view"></span></a>
                                  </div>
                              </div>
                        </div>
                        <div className="row">                            
                            <div className="col-12">
                                {/* <div className="serviceMainContainer clearfix">
                                    <div className="serviceHeadingCont">
                                        <p>Filter Number by Name</p>
                                    </div>
                                    <div className="serviceSearchContainer clearfix">
                                        <div className="selectsearchContainer">
                                            <div className="field has-addons">
                                                <p className="control is-expanded">
                                                    <select className="input" id="document_category">
                                                        <option value="#/documents/">All</option>
                                                        <option value="#/document-category/annual-report/">Annual Report</option>
                                                        <option value="#/document-category/census/">Census</option>
                                                        <option value="#/document-category/citizen-charter/">Citizen Charter</option>
                                                        <option value="#/document-category/district-profile/">District Profile</option>
                                                        <option value="#/document-category/guidelines/">Guidelines</option>
                                                        <option value="#/document-category/notification/" selected>Notification</option>
                                                        <option value="#/document-category/office-order/">Office Order</option>
                                                        <option value="#/document-category/others/">Others</option>
                                                        <option value="#/document-category/plan-report/">Plan Report</option>
                                                        <option value="#/document-category/statistical-report/">Statistical Report</option>
                                                    </select>
                                                    <script type="text/javascript">
                                                        function pageRedirect()
                                                         {
                                                            let selectBox = document.getElementById("document_category");
                                                            let selectedURL = selectBox.options[selectBox.selectedIndex].value;
                                                            if (selectedURL != window.location) {
                                                                window.location.href = selectedURL
                                                            }
                                                        }
                                                    </script>
                                                </p>
                                                <p className="control">
                                                    <a href="javascript:void(0);" title="Filter" className="button is-info" onclick="pageRedirect()">
                                                        <span className="icon-search"></span> Filter
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="separator30 "></div>
                                <div className="distTableContent">
                                    <table>
                                        {/* <caption>Demography</caption> */}
                                        <thead>
                                            <tr>
                                                <th scope="col">{t("srNo")} </th>
                                                <th scope="col">{t("heading")} </th>
                                                <th scope="col">{t("details")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1.</td>
                                                <td>{t("location")}</td>
                                                <td>  {t("longitude")} 83.0 {t("latitude")}: 25.20     </td>

                                            </tr>
                                            <tr>
                                                <td>2.</td>
                                                <td>{t("geographicalArea")} (2001)</td>
                                                <td>  1535 {t("perSqKm")}     </td>

                                            </tr>
                                            <tr>
                                                <td>3.</td>
                                                <td>{t("population")} (2011)</td>
                                                <td>  3,676,841     </td>

                                            </tr>
                                            <tr>
                                                <td>4.</td>
                                                <td>{t("male")} (2011)</td>
                                                <td>    1,921,857   </td>

                                            </tr>
                                            <tr>
                                                <td>5.</td>
                                                <td>{t("female")} (2011)</td>
                                                <td>  1,754,984     </td>

                                            </tr>
                                            <tr>
                                                <td>6.</td>
                                                <td>{t("rural")} (2011)</td>
                                                <td>  2,079,790     </td>

                                            </tr>
                                            <tr>
                                                <td>7.</td>
                                                <td>{t("urban")}</td>
                                                <td>  1,597,051     </td>

                                            </tr>
                                            <tr>
                                                <td>8.</td>
                                                <td>{t("sexRatio")}</td>
                                                <td>  913     </td>

                                            </tr>
                                            <tr>
                                                <td>9.</td>
                                                <td>{t("populationDensity")}</td>
                                                <td>  2395 {t("perSqKm")}     </td>

                                            </tr>
                                            <tr>
                                                <td>10.</td>
                                                <td>{t("uPTourismCustomerCareNo")}</td>
                                                <td>  0522-4004402     </td>

                                            </tr>
                                            <tr>
                                                <td>11.</td>
                                                <td>{t("literacy")}</td>
                                                <td>  75.60%     </td>

                                            </tr>
                                            <tr>
                                                <td>12.</td>
                                                <td>{t("noofPoliceStations")} </td>
                                                <td>  25     </td>

                                            </tr>                                          
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
