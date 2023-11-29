import React, { useState, useEffect } from 'react'
import BreadCrumb from '../../Common/BreadCrumb'
import { common } from '../../../../utils/common'
import { Api } from '../../../../apis/Api';
import { apiUrls } from '../../../../apis/ApiUrls';
import MapWithDirection from './MapWithDirection';
import MapWithMarkers from './MapWithMarkers';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function TouristGuideByMap() {
    const { t, i18n } = useTranslation();
    const langType=i18n.language.split('-')[0];
    const templeCategory = [
        { id: 0, value: t('selectName',{name:t('category')}) },
        { id: 1, value: t('famousTemple') },
        { id: 2, value: t('templeIn',{name:t('kashi')}) },
        { id: 15, value: t('selectName',{name:t('pawanPathYatra')})},
        { id: 7, value: t('selectName',{name:t('ashtaVinayakYatra')})}
    ]
    const hotelCategory = [
        { id: 0, value: t('selectName',{name:t('category')}) },
        { id: 1, value: t('fiveStar') },
        { id: 5, value: t('fourStar') },
        { id: 2, value: t('threeStar') },
        { id: 3, value: t('twoStar') },
        { id: 4, value: t('others') }
    ]
    const filterDataTemplet = {
        templeId: -1,
        padavId: 0,
        templeCategoryId: 0,
        yatraId: 0,
        subYatraId: 0,
        hotelCategoryId: 0,
        hotelId: 0,
        masterDataId: -1
    }
    const [filterData, setFilterData] = useState(filterDataTemplet)
    const [searchParams] = useSearchParams();
    let showfullLayout = parseInt(searchParams.get("showFull"));

    showfullLayout = isNaN(showfullLayout) ? 0 : showfullLayout;
    const [selectedMasterDataType, setSelectedMasterDataType] = useState(-1);
    const [selectedMasterData, setSelectedMasterData] = useState(0);
    const [selectedPadav, setSelectedPadav] = useState(0);
    const [masterData, setMasterData] = useState([]);
    const [templeData, setTempleData] = useState([])
    const [yatraData, setYatraData] = useState([])
    const [padavaList, setPadavaList] = useState([]);
    const [markerData, setMarkerData] = useState([]);
    const [directionData, setDirectionData] = useState([]);
    const [showMap, setShowMap] = useState(false);
    const [templeByYatra, setTempleByYatra] = useState([]);
    useEffect(() => {
        if (showfullLayout !== 1) {
            var docHeader = document.getElementsByTagName('header');
            var docFooter = document.getElementsByTagName('footer');
            var breadcrumb = document.getElementById('appbreadcrumb');
            if (docHeader[0] !== undefined) {
                docHeader[0].style.display = 'none';
            }
            if (docFooter[0] !== undefined) {
                docFooter[0].style.display = 'none';
            }
            if (breadcrumb !== undefined) {
                breadcrumb.style.display = 'none';
            }

        }
    }, [])

    useEffect(() => {
        let catId = parseInt(searchParams.get("catId"));
        let subCatId = parseInt(searchParams.get("subCatId"));
        subCatId = isNaN(subCatId) ? -1 : subCatId;
        catId = isNaN(catId) ? 0 : catId;
        if (catId > -1) {
            setSelectedMasterDataType(catId);
        }
        if (subCatId > -1) {
            if (catId == 0)
                onDropdownChange({ target: { name: 'templeCategoryId', value: subCatId?.toString(), type: "select-one" } });
            else if (catId == 1)
                onDropdownChange({ target: { name: 'yatraId', value: subCatId?.toString(), type: "select-one" } });
        }
    }, [searchParams])


    useEffect(() => {

        if (selectedMasterDataType === -1)
            return;
        let subCatId = parseInt(searchParams.get("subCatId"));
        let id = parseInt(searchParams.get("id"));
        subCatId = isNaN(subCatId) ? -1 : subCatId;
        id = isNaN(id) ? -1 : id;
        setShowMap(false);
        setMarkerData([]);
        Api.Get(apiUrls.masterDataController.getMasterDataDropdown + selectedMasterDataType)
            .then(res => {
                setMasterData([...res.data]);
            });
        if (selectedMasterDataType === 0 || selectedMasterDataType === 1) {
            Api.Get(apiUrls.templeController.getTemples + '?pageSize=1000000')
                .then(res => {
                    setTempleData([...res.data.data]);
                    onDropdownChange({ target: { name: 'templeCategoryId', value: subCatId?.toString(), type: "select-one" } });
                    onDropdownChange({ target: { name: 'templeId', value: id?.toString(), type: "select-one" } });
                });
        }
        if (selectedMasterDataType === 1) {
            Api.Get(apiUrls.masterDataController.getMasterDataDropdown + "1")
                .then(res => {
                    setYatraData([...res.data]);
                });
        }
        if (selectedMasterDataType > 1) {
            Api.Get(apiUrls.masterDataController.getMasterData + `?masterDataType=${selectedMasterDataType}`)
                .then(res => {
                    setMasterData([...res.data]);
                });
        }
    }, [selectedMasterDataType]);

    useEffect(() => {
        if (filterData.yatraId > 0) {
            Api.Get(apiUrls.templeController.getTempleByYatraId + filterData.yatraId)
                .then(res => {
                    let pList = [];
                    setTempleByYatra([...res.data]);
                    res.data.map(data => {

                        if (pList.find(x => x.id === data.padavId) === undefined) {
                            pList.push({ id: data.padavId,[`${langType}Value`]: data[`padav${langType[0].toUpperCase()+langType[1]}Name`],  yatraId: data.yatraId });
                        }
                    });
                    setPadavaList([...pList]);
                });
        }
    }, [selectedMasterData, filterData.yatraId]);

    const onDropdownChange = (e) => { 
        setShowMap(false);
        var ddlId = 0;
        var { name, value, type } = e.target;
        if (type === 'select-one') {
            ddlId = parseInt(value);
        }
        if (name === 'masterDataType') {
            setSelectedMasterDataType(parseInt(value));
            setTempleByYatra([]);
            setMarkerData([]);
            setFilterData({ ...filterDataTemplet });

        }
        else if (name === 'yatraId') {
            setSelectedPadav(parseInt(value));
        }
        else if (name === 'masterData') {
            setSelectedMasterData(parseInt(value))
        }
        else if (name === 'padav') {
            setSelectedPadav(parseInt(value));
        }
        var filterModel = filterData;;
        if (name === 'templeCategoryId') {
            filterModel.templeId = -1;
        }
        if (name === 'yatraId') {
            filterModel.subYatraId = 0;
        }
        if (name === 'templeId') {
            if (filterData.templeCategoryId > 0 && filterData.templeCategoryId < 3) {
                setDirectionData([]);
                if (ddlId < 1)
                    setMarkerData([...templeData.filter(x => x.templeCategoryId === filterData.templeCategoryId)]);
                else
                    setMarkerData([...templeData.filter(x => x.id === ddlId)]);
            }
            else {
                setMarkerData([]);
                if (ddlId < 1)
                    setDirectionData([...templeData.filter(x => x.yatraId === filterData.templeCategoryId)])
                else
                    setDirectionData([...templeData.filter(x => x.id === ddlId)])
            }
        }
        if (name === 'subYatraId') {
            setMarkerData([]);
            setDirectionData([]);
            debugger;
            var totalYatras = templeData.filter(x => x.yatraId === ddlId).length;
            var totalSubYatras = yatraData.filter(x => x.parentId === filterData.yatraId).length;
            var isPadavHasNA = padavaList.filter(x => x.yatraId === filterData.yatraId && x.value?.trim().toLowerCase() !== 'na').length > 0;
            if (isPadavHasNA && totalSubYatras === 0)
                setDirectionData([...templeData.filter(x => x.padavId === ddlId)])
            else if (totalYatras > 0)
                setDirectionData([...templeData.filter(x => x.yatraId === ddlId)])
            else if (totalSubYatras === 0 && !isPadavHasNA && ddlId === -1)
                setDirectionData([...templeData.filter(x => x.yatraId === filterData.yatraId)])
            else if (totalSubYatras === 0 && !isPadavHasNA && ddlId > 0) {
                setMarkerData([...templeData.filter(x => x.id === ddlId)]);
                setDirectionData([]);
            }
            else {
                setDirectionData([...templeData.filter(x => x.padavId === ddlId)])
            }
        }
        if (name === 'hotelId') {
            setDirectionData([]);
            setMarkerData([...masterData.filter(x => x.id === ddlId)]);
        }

        if (name === "masterDataId") {
            setDirectionData([]);
            if (ddlId === 0) {
                setMarkerData([...masterData]);
            }
            else
                setMarkerData([...masterData.filter(x => x.id === ddlId)]);
        }
        setFilterData({ ...filterModel, [name]: ddlId });
    }
    return (
        <>
            <BreadCrumb option={[{ name: 'tgbm' }]}></BreadCrumb>
            <div className='px-4'>
                <h4 ></h4>
            </div>
            <div className="row">
                <div className="col-12 text-start">
                    <div className="serviceMainContainer clearfix">
                        <div className="serviceHeadingCont">
                            <p>{t('searchByPlaceName')}</p>
                        </div>
                        <div className="serviceSearchContainer clearfix">
                            <div className="field has-addons">

                                <div className='row'>
                                    <div className='col-2 col-sm-6'>
                                        <select className="form-control" name="masterDataType" onChange={e => onDropdownChange(e)} value={selectedMasterDataType}>
                                            {
                                                common.masterDataTypes.map((res, index) => {
                                                    return <option key={index} value={res.id}>{t(res.value)}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    {selectedMasterDataType === 0 && <><div className='col-4 col-sm-6'>
                                        <select className="input" name="templeCategoryId" onChange={e => onDropdownChange(e)} value={filterData.templeCategoryId}>
                                            {
                                                templeCategory?.map((res, index) => {
                                                    return <option key={index} value={res.id}>{res.value}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                        {filterData.templeCategoryId > 0 && <div className='col-4 col-sm-6'>
                                            <select className="input" name="templeId" onChange={e => onDropdownChange(e)} value={filterData.templeId}>
                                                <option value={-1}>{t('selectName',{name:t('temple')})}</option>
                                                <option value={0}>{t('entireCircuit')}</option>
                                                {
                                                    templeData.filter(x =>
                                                    (filterData.templeCategoryId === 1 || filterData.templeCategoryId === 2 ?
                                                        x.templeCategoryId === filterData.templeCategoryId :
                                                        x.yatraId === filterData.templeCategoryId))?.map((res, index) => {
                                                            return <option key={index} value={res.id}>{res[`${langType}Name`]}</option>
                                                        })
                                                }
                                            </select>
                                        </div>}
                                    </>}

                                    {selectedMasterDataType === 1 && <>
                                        <div className='col-4 col-sm-6'>
                                            <select className="input" name="yatraId" onChange={e => onDropdownChange(e)} value={filterData.yatraId}>
                                                <option value="0">{t('selectName',{name:t('yatra')})}</option>
                                                {
                                                    yatraData.filter(x => x.parentId === 0)?.map((res, index) => {
                                                        return <option key={index} value={res.id}>{res[`${langType}Value`]}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className='col-4 col-sm-6'>
                                            <select className="input" name="subYatraId" onChange={e => onDropdownChange(e)} value={filterData.subYatraId}>
                                                <option value="0">{t('selectName',{name:t('subYatra')})}</option>
                                                {
                                                    yatraData.filter(x => x.parentId === filterData.yatraId).length > 0 && yatraData.filter(x => x.parentId === filterData.yatraId)?.map((res, index) => {
                                                        return <option key={index} value={res.id}>{res[`${langType}Value`]}</option>
                                                    })

                                                }

                                                {
                                                    yatraData.filter(x => x.parentId === filterData.yatraId).length === 0 && padavaList.filter(x => x.yatraId === filterData.yatraId && x.value?.trim().toLowerCase() !== 'na')?.map((res, index) => {
                                                        debugger;
                                                        return <option key={index} value={res.id}>{res[`${langType}Value`]}</option>
                                                    })
                                                }
                                                {
                                                    yatraData.filter(x => x.parentId === filterData.yatraId).length === 0 && padavaList.filter(x => x.yatraId === filterData.yatraId && x.value?.trim().toLowerCase() !== 'na').length === 0 &&
                                                    <>
                                                        <option value={-1}>{t('entireCircuit')}</option>
                                                        {
                                                            templeData.filter(x => x.yatraId === filterData.yatraId)?.map((res, index) => {
                                                                if (res?.enName?.trim().toLowerCase() !== 'na') {
                                                                    return <option key={index} value={res.id}>{res[`${langType}Name`]}</option>
                                                                }
                                                            })
                                                        }
                                                    </>
                                                }
                                            </select>
                                        </div>
                                    </>
                                    }
                                    {selectedMasterDataType === 4 && <>
                                        <div className='col-4 col-sm-6'>
                                            <select className="form-control" name="hotelCategoryId" onChange={e => onDropdownChange(e)} value={filterData.hotelCategoryId}>
                                                {
                                                    hotelCategory?.map((res, index) => {
                                                        return <option key={index} value={res.id}>{res.value}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className='col-4 col-sm-6'>
                                            <select className="form-control" name="hotelId" onChange={e => onDropdownChange(e)} value={filterData.hotelId}>
                                                {
                                                    masterData?.map((res, index) => {
                                                        return <option key={index} value={res.id}>{res[`${langType}Name`]}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </>}
                                    {[0, 1, 4].indexOf(selectedMasterDataType) === -1 &&
                                        <div className='col-4 col-sm-6'>
                                            <select className="form-control" name="masterDataId" onChange={e => onDropdownChange(e)} value={filterData.masterDataId}>
                                                <option value={-1}>{t('selectName',{name:'...'})}</option>
                                                <option value={0}>{t('entireData')}</option>
                                                {
                                                    masterData?.map((res, index) => {
                                                        return <option key={index} value={res.id}>{res[`${langType}Name`]}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    }
                                    <div className='col-2 col-sm-6'>
                                        <button type='button' className='btn btn-dark' onClick={e => setShowMap(pre => !pre)}>{t('submit')}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='separator30'>

                    </div>
                    <div >
                        {((filterData.templeCategoryId > 2 && filterData.templeId === 0) || filterData.subYatraId !== 0) && showMap && directionData?.length > 0 && <MapWithDirection templeData={directionData} padavList={padavaList} selectedPadav={selectedPadav}></MapWithDirection>
                        }
                    </div>
                    <div>
                        {
                            (filterData.templeCategoryId === 2 ||
                                filterData.templeCategoryId === 1 ||
                                filterData.templeId > 0 ||
                                filterData.subYatraId > 0 ||
                                filterData.hotelId > 0 ||
                                filterData.masterDataId > -1) && showMap && markerData?.length > 0 && <MapWithMarkers data={markerData}></MapWithMarkers>}
                    </div>
                </div>
            </div>
        </>
    )
}


