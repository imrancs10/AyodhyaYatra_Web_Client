import React from 'react'
import BreadCrumb from '../Common/BreadCrumb'

export default function HyperlinkingPolicy() {
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
                            <ul className="breadcrumbs"><li><a href="#/" className="home"><span>Home</span></a></li><li><a href="#">Policy</a></li> <li className="current">Hyperlink Policy</li></ul>
                        </div>
                    </div>
                    <div className="right-content push-right">
                        <div className="printShare">
                            <ul className="">
                                <li><a href="#" id="print" title="Print Page Content" aria-label="Print Page Content"><span className="icon-printer"></span> <span className="off-css">Print</span></a></li>
                                <li>
                                    <span className="share-text"><em className="icon-share"></em><span className="off-css">Share</span></span>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/sharer/sharer.php?u=#/audio-gallery-page/&t=Audio+Gallery"
                                       onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                       target="_blank" title="Share on Facebook" aria-label="Facebook that opens in a new window"><span className="icon-facebook"></span><span className="off-css">Facebook</span></a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/share?url=#/audio-gallery-page/&via=TWITTER_HANDLE&text=Audio+Gallery"
                                       onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                                       target="_blank" title="Share on Twitter" aria-label="Twitter that opens in a new window"><span className="icon-twitter"></span><span className="off-css">Twitter</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="SkipContent"></div>
                <div className="row">
                    <div className="row">
                        <div className="col-8">
                            <h1>Hyperlink Policy </h1>
                        </div>
                        <div className="col-4">
                            <div className="viewSwicther right-content desktopElement">
                                <a href="javascript:void(0);" className="thumbs-view-btn"><span className="icon-thumbs-view"></span></a>
                                <a href="javascript:void(0);" className="thumbs-list-view-btn"><span className="icon-list-view"></span></a>
                            </div>
                        </div>
                        <div className="col-12">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {/* <!--==================Paragraph with image start here=======================--> */}
                            <div>
                                <hr />
                                <h4>Links to external websites/portals</h4>
                                <p style={{textAlign:'Justify'}}>
                                    At many places in this website, you shall find links to other websites/portals. These links have been placed on the website for your convenience. UP Tourism is not responsible for the contents and reliability of the linked websites and does not necessarily endorse the views expressed in them. Mere presence of the link or its listing on this website should not be assumed as endorsement of any kind. We cannot guarantee that these links will work all the time and we have no control over availability of linked pages.
                                </p>
                                <hr />
                                <h4>Links to Department of UP Tourism Website by other websites/portals</h4>
                                <p style={{textAlign:'Justify'}}>
                                    Prior permission is required before hyperlinks are directed from any website/portal to this site. Permission for the same, stating the nature of the content on the pages from where the link has to be given and the exact language of the Hyperlink has to be obtained by sending a request to UP Tourism.
                                </p>
                            </div>
                            <div className="col-12">
                                <div className="colspexp-container">

                                </div>
                            </div>
                            {/* <p><!--=====================Paragraph with image end here==========================--> */}
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        </section>
    </>
  )
}
