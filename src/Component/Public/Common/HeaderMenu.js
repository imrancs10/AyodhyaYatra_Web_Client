import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Api } from '../../../apis/Api'
import { apiUrls } from '../../../apis/ApiUrls'
import { useTranslation } from 'react-i18next';

export default function HeaderMenu({ overflowMenuRef, menuContainerClickEvent }) {

    const { t, i18n } = useTranslation();
    const langType=i18n.language?.split('-')[0];
    const [yatraList, setYatraList] = useState([]);
    useEffect(() => {
        Api.Get(apiUrls.masterDataController.getMasterDataDropdown + "1")
            .then(res => {
                setYatraList([...res.data]);
            }).catch(err=>{
                debugger;
            });
    }, [])

    const moreMenuClick = (e) => {
        e.preventDefault();
        var menu = overflowMenuRef.current;
        menu.style.right = 0;
    }

    const toggleMobileSubMenu = (e) => {
        e.preventDefault();
        document.querySelectorAll('.sub-menu.sub-menu-expand').forEach(res => {
            res.classList.remove('sub-menu-expand');
        })
        e.target.parentElement.parentElement.childNodes.forEach(res => {
            if (res.classList.contains('sub-menu') && res.classList.contains('sub-menu-expand')) {
                res.classList.remove('sub-menu-expand');
            }
            else if (res.classList.contains('sub-menu')) {
                res.classList.add('sub-menu-expand');
            }
        });
    }
    return (
        <>
            <nav className="menu">
                <ul id="menu-header-en" className="nav clearfix" aria-hidden="false">
                    <li id="menu-item-2658" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-2658 active ">
                        {/* <a href="index.html" aria-current="page">Home</a> */}
                        <Link to="">{t("home")}</Link>
                    </li>
                    <li id="menu-item-2486" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-2486 has-sub" aria-haspopup="true" aria-expanded="false">
                        <a href="#">{t("aboutKashiYatra")}<span className="indicator1" onClick={e => toggleMobileSubMenu(e)}></span>
                        </a>
                        <ul className="sub-menu" data-test="true" aria-hidden="false">
                            <li id="menu-item-2736" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2736">
                                <Link to="/AboutKashiYatra">
                                    {t("overviewAndConcepts")}
                                </Link>
                            </li>
                            <li id="menu-item-2739" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2739">
                                <Link to="/PersonalityOfVaranasi">
                                    {t("personalityOfVaranasi")}
                                </Link>
                            </li>
                            <li id="menu-item-2739" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2739">
                                <Link to="/History">
                                    {t("varanasiHistory")}
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li id="menu-item-2752" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-2752 has-sub" aria-haspopup="true" aria-expanded="false">
                        <a href="#">{t("yatraInKashi")}
                            <span className="indicator1" onClick={e => toggleMobileSubMenu(e)}></span></a>
                        <ul className="sub-menu" data-test="true" aria-hidden="false">
                            {
                                yatraList?.filter(x => x.parentId === 0)?.map((p, pIndex) => {
                                    return <li key={pIndex} id="menu-item-2755" onClick={e => yatraList?.filter(x => x.parentId === p.id)?.length === 0 ? menuContainerClickEvent(e) : () => { }} className={"menu-item menu-item-type-post_type menu-item-object-page menu-item-2755 " + (yatraList?.filter(x => x.parentId === p.id)?.length === 0 ? "" : "has-sub")} aria-haspopup="true" aria-expanded="false">
                                        <Link to={"/yatras?id=" + p.id}>
                                            {p[`${langType}Value`]} {yatraList?.filter(x => x.parentId === p.id)?.length > 0 &&  <span className="indicator1" onClick={e => toggleMobileSubMenu(e)}></span> }
                                        </Link>
                                        {yatraList?.filter(x => x.parentId === p.id)?.length > 0 &&
                                            <ul className="sub-menu" data-test="true" aria-hidden="true">
                                                {
                                                    // yatraList?.filter(x => x.parentId === p.id)?.map((c, cIndex) => {
                                                    yatraList?.filter(x => x.parentId === p.id)?.sort((a, b) => a.id - b.id)?.map((c, cIndex) => {
                                                        return <li key={cIndex} onClick={e => menuContainerClickEvent(e)} id="menu-item-2755" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2755">
                                                            <Link to={"/yatras?id=" + c.id}>
                                                            {c[`${langType}Value`]}
                                                            </Link>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        }
                                    </li>
                                })
                            }
                        </ul>
                    </li>
                    <li id="menu-item-2752" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-2752 has-sub" aria-haspopup="true" aria-expanded="false">
                        <a href="#">{t("otherAttraction")} <span className="indicator1" onClick={e => toggleMobileSubMenu(e)} ></span>
                        </a>
                        <ul className="sub-menu" data-test="true" aria-hidden="false">
                            <li id="menu-item-2774" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2774">
                                <Link to='/ghat'>{t("ghat")}</Link>
                            </li>
                            <li id="menu-item-2774" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2774">
                                <Link to='/Heritage'>{t("heritage")}</Link>
                            </li>
                            <li id="menu-item-2774" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2774">
                                <Link to='/GangaAarti'>{t("gangaAarti")}</Link>
                            </li>
                        </ul>
                    </li>
                    <li id="menu-item-2752" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-2752 has-sub" aria-haspopup="true" aria-expanded="false">
                        <a href="#">{t("touristGuide")}
                            <span className="indicator1" onClick={e => toggleMobileSubMenu(e)}></span>
                        </a>
                        <ul className="sub-menu" data-test="true" aria-hidden="true">
                            <li id="menu-item-2755" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2755">
                                <Link to='/TouristGuide?masterDataType=17&heading=Historical and Religious Places'>{t("historical")} &amp; {t("religious")} {t("places")}</Link>
                            </li>
                            <li id="menu-item-2755" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2755">
                                <Link to='/TouristGuide?masterDataType=2&masterDataType=18&heading=Ghat and Ganga Aarti'>{t("ghat")} &amp; {t("gangaAarti")}</Link>
                            </li>
                            <li id="menu-item-2758" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2758">
                                <Link to='/TouristGuide?masterDataType=22&masterDataType=25&masterDataType=8&heading=Entertainment and Shopping Places'>{t("entertainment")} &amp; {t("shopping")} {t("places")}</Link>
                            </li>
                            <li id="menu-item-2758" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2758">
                                <Link to='/TouristGuide?masterDataType=16&masterDataType=15&masterDataType=14&heading=Boat Ride, Cruise and Water Taxi'>{t("boat")} {t("ride")}, {t("cruise")} &amp; {t("waterTaxi")}</Link>
                            </li>
                            <li id="menu-item-2774" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2774">
                                <Link to='/TouristGuide?masterDataType=3&heading=Educational Institutions'>{t("educational")} {t("institutions")}</Link>
                            </li>
                            <li id="menu-item-2774" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2774">
                                <Link to='/TouristGuide?masterDataType=23&heading=Hospitals in Kashi'>{t("hospitals")} {t("inKashi")}</Link>
                            </li>
                            <li id="menu-item-2774" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2774">
                                <Link to='/TouristGuide?masterDataType=19&masterDataType=5&heading=Industries and Business Houses'>{t("industries")} &amp; {t("business")} {t("houses")}</Link>
                            </li>
                            <li id="menu-item-2774" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2774">
                                <Link to='/TouristGuide?masterDataType=4&masterDataType=7&heading=Hotels, Resorts and Restaurants'>{t("hotels")}, {t("resorts")} &amp; {t("restaurants")}</Link>
                            </li>
                            <li id="menu-item-2774" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2774">
                                <Link to='/TouristGuide?masterDataType=6&masterDataType=20&heading=Culture and Museums'>{t("culture")} &amp; {t("museums")}</Link>
                            </li>
                            {/* <li id="menu-item-2774" onClick={e=>menuContainerClickEvent(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2774">
                                <Link to='/TouristGuide?masterDataType=8&masterDataType=9'>Park &amp; ATMs </Link>
                            </li> */}
                            <li id="menu-item-2774" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2774">
                                <Link to='/TouristGuide?masterDataType=21&masterDataType=24&heading=Railway and Transports'>{t("railway")} &amp; {t("transports")}</Link>
                            </li>
                        </ul>
                    </li>
                    <li id="menu-item-2837" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2837">
                        <Link to="/TouristGuideByMap?showFull=1">{t("tgbm")}</Link>
                    </li>
                    <li id="menu-item-2777" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-2777 has-sub" aria-haspopup="true" aria-expanded="false">
                        <a href="#">{t("online")} {t("booking")} <span className="indicator1" onClick={e => toggleMobileSubMenu(e)}></span>
                        </a>
                        <ul className="sub-menu" data-test="true" aria-hidden="true">
                            <li id="menu-item-2789" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2789">
                                <Link to='/OnlineReligiousYatra'>{t("online")} {t("religious")} {t("yatra")}</Link>
                            </li>
                            <li id="menu-item-27230" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-27230">
                                <Link to='/BusTicketingForTourist'>{t("busTicketingForTourist")} </Link>
                            </li>
                        </ul>
                    </li>
                    <li id="menu-item-2786" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-2786 has-sub" aria-haspopup="true" aria-expanded="false">
                        <a href="#">{t("gallery")}<span className="indicator1" onClick={e => toggleMobileSubMenu(e)}></span>
                        </a>
                        <ul className="sub-menu" data-test="true" aria-hidden="true">
                            <li id="menu-item-17989" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-taxonomy menu-item-object-public-utility-category menu-item-17989">
                                <Link to='/PhotoGallery'>{t("photo")}  {t("gallery")}</Link>
                            </li>
                            <li id="menu-item-17990" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-taxonomy menu-item-object-public-utility-category menu-item-17990">
                                <Link to='/AudioGallery'>{t("audio")}  {t("gallery")}</Link>
                            </li>
                            <li id="menu-item-17991" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-taxonomy menu-item-object-public-utility-category menu-item-17991">
                                <Link to='/VideoGallery'>{t("video")}  {t("gallery")}</Link>
                            </li>
                            <li id="menu-item-17991" onClick={e => menuContainerClickEvent(e)} className="menu-item menu-item-type-taxonomy menu-item-object-public-utility-category menu-item-17991">
                                <Link to='/DegreeGallery'>360 {t("degree")} {t("gallery")}</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="moreNav">
                        <a onClick={e => moreMenuClick(e)} href="#" aria-label="More Menu" title="More Menu">
                            <span className="icon-menu" aria-hidden="true"></span>{t("more")}
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}
