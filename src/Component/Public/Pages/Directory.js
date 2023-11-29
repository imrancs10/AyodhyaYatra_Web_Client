import React from 'react'
import BreadCrumb from '../Common/BreadCrumb'
import { useTranslation } from 'react-i18next';
export default function Directory() {
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
                            <ul className="breadcrumbs"><li><a href="#/" className="home"><span>{t("home")}</span></a></li><li><a href="#tourism/">{t("howToReach")}</a></li> <li className="current">{t("directory")}</li></ul>
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
                                    <a href="https://www.facebook.com/sharer/sharer.php?u=#/document-category/statistical-report/&t=Statistical+Report"
                                       onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                       target="_blank" title="Share on Facebook" aria-label="Facebook that opens in a new window"><span className="icon-facebook"></span><span className="off-css">Facebook</span></a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/share?url=#/document-category/statistical-report/&via=TWITTER_HANDLE&text=Statistical+Report"
                                       onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                       target="_blank" title="Share on Twitter" aria-label="Twitter that opens in a new window"><span className="icon-twitter"></span><span className="off-css">Twitter</span></a>
                                </li>
                            </ul>
                        </div>
                    </div> */}
                </div>
                <div id="SkipContent"></div>
                <div className="row px-4">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-8">
                                <h1>{t("directory")}</h1>
                            </div>
                            <div className="col-4">
                  <div className="viewSwicther right-content"> <a href="#" className="thumbs-view-btn" aria-label="Grid View" title="Grid View"><span className="icon-thumbs-view"></span></a> <a href="#" className="thumbs-list-view-btn" aria-label="List View" title="List View"><span className="icon-list-view"></span></a> </div>
                </div>
                        </div>
                        <div className="row px-4">
                            <div className="col-12">
                                {/* <div className="serviceMainContainer clearfix">
                                    <div className="serviceHeadingCont">
                                        <p>Filter Document category wise</p>
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
                                                        <option value="#/document-category/notification/">Notification</option>
                                                        <option value="#/document-category/office-order/">Office Order</option>
                                                        <option value="#/document-category/others/">Others</option>
                                                        <option value="#/document-category/plan-report/">Plan Report</option>
                                                        <option value="#/document-category/statistical-report/" selected>Statistical Report</option>
                                                    </select>
                                                     <script type="text/javascript">
                                                        function pageRedirect() {
                                                            let selectBox = document.getElementById("document_category");
                                                            let selectedURL = selectBox.options[selectBox.selectedIndex].value;
                                                            if (selectedURL != window.location) {
                                                                window.location.href = selectedURL;
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
                                        {/* <caption>Directory</caption> */}
                                        <thead>
                                            <tr>
                                                <th scope="col">{t("subject")}</th>
                                                <th scope="col">{t("date")}</th>
                                                <th scope="col">{t("view/Download")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{t("staffDirectory")}</td>
                                                <td>16/04/2017</td>
                                                <td>
                                                    <span className="pdf-downloads">
                                                        <a target="_blank" href="https://cdn.s3waas.gov.in/master/uploads/2016/09/document_1481208108.pdf" aria-label="Title of Document will appear here PDF 16 KB - opens in new window" title="Click here to view"> View (16 KB) <span className="icon-pdf pdf-icon"></span></a> <a href="https://cdn.s3waas.gov.in/master/uploads/2016/09/document_1481208108.pdf" download="document_1481208108.pdf" title="Click here to download" className="download" aria-hidden="true"><i className="fa fa-download pdf-download"></i></a>
                                                    </span>
                                                </td>
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
