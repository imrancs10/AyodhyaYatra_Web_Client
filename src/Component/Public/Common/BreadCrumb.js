import React from 'react'
import { common } from '../../../utils/common'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function BreadCrumb({ option }) {
    const { t} = useTranslation();
    option = common.defaultIfEmpty(option, []);
    return (
        <div className="dflex justify-content-between" id="appbreadcrumb" style={{ padding: '4px 0 40px' }}>
            <div className="left-content push-left">
                <div id="breadcam" role="navigation" aria-label="breadcrumb">
                    <ul className="breadcrumbs">
                        <li><a href="#/" className="home"><span>{t("home")}</span></a></li>
                        {
                            option?.map((res, index) => {
                                return <li key={index}>
                                    {
                                        res?.link === undefined  &&   <span>{t(res?.name)}</span>
                                    }
                                    {
                                        res?.link !== undefined && res?.link !== null && res?.link !== "" &&  <Link to={res?.link}>
                                            <span>{t(res?.name)}</span>
                                        </Link>
                                    } 
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="right-content push-right">
                {/* <div className="printShare">
                    <ul className="">
                        <li>
                            <a href="#" id="print" title="Print Page Content" aria-label="Print Page Content">
                                <span className="icon-printer"></span>
                                <span className="off-css">Print</span>
                            </a>
                        </li>
                        <li>
                            <span className="share-text">
                                <em className="icon-share"></em>
                                <span className="off-css">Share</span>
                            </span>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/sharer/sharer.php?u=#/document-category/statistical-report/&amp;t=Statistical+Report" target="_blank" title="Share on Facebook" aria-label="Facebook that opens in a new window" rel="noopener noreferrer">
                                <span className="icon-facebook"></span>
                                <span className="off-css">Facebook</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/share?url=#/document-category/statistical-report/&amp;via=TWITTER_HANDLE&amp;text=Statistical+Report" target="_blank" title="Share on Twitter" aria-label="Twitter that opens in a new window" rel="noopener noreferrer">
                                <span className="icon-twitter"></span>
                                <span className="off-css">Twitter</span>
                            </a>
                        </li>
                    </ul>
                </div> */}
            </div>
        </div>
    )
}
