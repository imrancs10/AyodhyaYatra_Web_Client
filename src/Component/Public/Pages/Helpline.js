import React from 'react'
import { useTranslation } from 'react-i18next';
export default function Helpline() {
    const { t, i18n } = useTranslation();
    return (
        <>
            <div className="wrapper banner-wrapper innerBanner">
                <img src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
            </div>

            <section className="wrapper bodyWrapper">
                <div className="container">
                    <div className="row breadcrumb-outer">
                        <div className="left-content push-left">
                            <div id="breadcam" role="navigation" aria-label="breadcrumb">
                                <ul className="breadcrumbs"><li><a href="#/" className="home"><span>{t("home")}</span></a></li> <li><a href="#">{t("quickLinks")}</a></li><li className="current">{t("helpline")}</li></ul>
                            </div>
                        </div>
                    </div>
                    <div id="SkipContent"></div>
                    <div className="row px-4">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-8">
                                    <h1>{t("keyCallCenters")} </h1>
                                </div>
                            </div>
                            <div className="row px-4">
                                <div className="col-12">

                                    <div className="separator30 "></div>
                                    <div className="distTableContent">
                                        <table>
                                            {/* <caption>Helpline</caption> */}
                                            <thead>
                                                <tr>
                                                    <th scope="col">{t("srNo")} </th>
                                                    <th scope="col">{t("name")} </th>
                                                    <th scope="col">{t("number")}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1.</td>
                                                    <td>{t("police")}</td>
                                                    <td>
                                                        <a href='tel:112'>112</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2.</td>
                                                    <td>{t("fire")}</td>
                                                    <td>
                                                        <a href='tel:101'>101</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3.</td>
                                                    <td>{t("ambulance")}</td>
                                                    <td>
                                                        <a href='tel:108'>108</a>/<a href='tel:102'>102</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>4.</td>
                                                    <td>{t("Covid-19HelplineNoforUttarPradesh")}</td>
                                                    <td>
                                                        <a href='tel:1800-180-5145'>1800-180-5145</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>5.</td>
                                                    <td>{t("womenHelpline")}</td>
                                                    <td>
                                                        <a href='tel:1090'>1090</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>6.</td>
                                                    <td>{t("childHelpline")}</td>
                                                    <td>
                                                        <a href='tel:1098'>1098</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>7.</td>
                                                    <td>{t("chiefMinisterHelpline")}</td>
                                                    <td>
                                                        <a href='tel:1076'>1076</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>8.</td>
                                                    <td>{t("womenCommissionHelpline")}</td>
                                                    <td>
                                                        <a href='tel:1800-180-5220'>1800-180-5220</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>9.</td>
                                                    <td>{t("uPPowerCorporationLtd.Helpline")}</td>
                                                    <td>
                                                        <a href='tel:1800-180-8752'>1800-180-8752</a>/ <a href='tel:1800-180-1912'>1912</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>10.</td>
                                                    <td>{t("uPTourismCustomerCareNo.")}</td>
                                                    <td>
                                                        <a href='tel:0522-4004402'> 0522-4004402</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>11.</td>
                                                    <td>{t("uPStateRoadTransportCorporation")}</td>
                                                    <td>
                                                        <a href='tel:1800-180-2877'>1800-180-2877</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>12.</td>
                                                    <td>{t("medicalHealth&FamilyWelfareDept.TollFreeNo.")} </td>
                                                    <td>
                                                        <a href='tel:1800-180-5145'>1800-180-5145</a>
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
