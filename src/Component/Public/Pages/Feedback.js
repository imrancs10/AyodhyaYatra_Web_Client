import React, { useState, useEffect } from 'react'
import BreadCrumb from '../Common/BreadCrumb'
import { useTranslation } from 'react-i18next';
import { validationMessage } from '../../../constants/validationMessage'
import { Api } from '../../../apis/Api'
import { apiUrls } from '../../../apis/ApiUrls'
import { toast } from 'react-toastify'
import { toastMessage } from '../../../constants/ConstantValues'
import Inputbox from '../../Admin/Common/Inputbox'
import ButtonBox from '../../Admin/Common/ButtonBox'
import Label from '../../Admin/Common/Label'

export default function Feedback() {
    const { t} = useTranslation();
    const feedbackModelTemplate = {
        name: "",
        emailId: "",
        contactNumber: "",
        address: "",
        feedbackComment: "",
        id: 0,
    };
    const [feedbackModel, setfeedbackModel] = useState(feedbackModelTemplate);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState();
    const saveFeedbackHandler = () => {
        let formError = validateFeedback();
        if (Object.keys(formError).length > 0) {
            setError(formError);
            return;
        }
        setError({});
        var model = feedbackModel;
        model.id = model.id === -1 ? 0 : model.id;
        if (feedbackModel.id === 0) {
            Api.Put(apiUrls.feedbackController.addFeedback, feedbackModel)
                .then(res => {
                    setIsSaving(false);
                    if (res.data?.id > 0) {
                        toast.success(toastMessage.saveSuccess);
                        setfeedbackModel({ ...res.data });
                    }
                    else
                        toast.warn(toastMessage.saveError);
                })
                .catch(err => {
                    setIsSaving(false);
                });
        }
    }
    const validateFeedback = () => {
        var { name, id, emailId, contactNumber, feedbackComment } = feedbackModel;
        var err = {};
        if (id === -1 || id > 0) {
            if (!name || name.length < 6) err.name = validationMessage.reqFeedbackName;
            if (!emailId || emailId.length < 6) err.emailId = validationMessage.reqFeedbackEmailId;
            if (!contactNumber || contactNumber.length < 6) err.contactNumber = validationMessage.reqFeedbackContactNumber;
            if (!feedbackComment || feedbackComment.length < 6) err.feedbackComment = validationMessage.reqFeedbackComment;
        }
        return err;
    }
    const changeHandler = (e) => {
        var { name, type, value } = e.target;
        if (type === 'select-one') {
            value = parseInt(value);
        }
        setfeedbackModel({ ...feedbackModel, [name]: value });
    }
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
                                <ul className="breadcrumbs">
                                    <li><a href="#" className="home"><span>{t("home")}</span></a></li>
                                    <li><a href="#tourism/">{t("howToReach")}</a></li> 
                                    <li className="current">{t("feedback")}</li></ul>
                            </div>
                        </div>
                    </div>
                    <div id="SkipContent"></div>

                    <div className="vc_row wpb_row vc_row-fluid" style={{ marginTop: '1em' }}>
                        <div className="wpb_column vc_column_container bggrad vc_col-sm-6" style={{ marginLeft: '300px' }}>
                            <p className="errormsg">
                            </p>
                            <div className="vc_column-inner vc_custom_1516181017591">
                                <div className="wpb_wrapper">
                                    <div className="gen-list no-border no-bg padding-0 border-radius-none small-icon-list info-list-margin  normal-font " style={{ color: 'white' }}>
                                        <h2 style={{ textAlign: 'center' }}>{t("submityourFeedbackForm")}</h2>
                                        <p>{t("p1FeedbackForm")} <br />{t("p2FeedbackForm")}</p>
                                        <div className="col-sm-12">
                                            <div className="row">
                                                <div className="form-group">
                                                    <Inputbox errorMessage={error?.name} labelText={t("txt1Feedback")} isRequired={true} name="name"
                                                        value={feedbackModel.name} placeholder={t("txt1Feedback")} onChangeHandler={changeHandler} className="form-control-sm" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="row">
                                                <div className="form-group">
                                                    <Inputbox errorMessage={error?.emailId} labelText={t("txt2Feedback")} isRequired={true} name="emailId"
                                                        value={feedbackModel.emailId} placeholder={t("txt2Feedback")} onChangeHandler={changeHandler} className="form-control-sm" />
                                              </div>
                                                <p></p>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="row">
                                                <div className="form-group">
                                                    <Inputbox errorMessage={error?.contactNumber} labelText={t("txt3Feedback")} isRequired={true} name="contactNumber"
                                                        value={feedbackModel.contactNumber} placeholder={t("txt3Feedback")} onChangeHandler={changeHandler} className="form-control-sm" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="row">
                                                <div className="form-group">
                                                    <Label text={t("txt4Feedback")} isRequired={false}></Label>
                                                    <textarea name="address" value={feedbackModel.address} rows={4} style={{ resize: 'none' }}
                                                        placeholder={t("txt4Feedback")} onChange={changeHandler} className=" form-control form-control-sm" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="row">
                                                <div className="form-group">
                                                    <Label text={t("txt5Feedback")} isRequired={false}></Label>
                                                    <textarea name="feedbackComment" value={feedbackModel.feedbackComment} rows={4} style={{ resize: 'none' }}
                                                        placeholder={t("txt5Feedback")} onChange={changeHandler} className=" form-control form-control-sm" />
                                                </div>
                                                <p></p>
                                            </div>
                                        </div>
                                        <div id="sendhide">
                                            <div className="col-sm-12 pull-right">
                                                <div className="row">
                                                    <div className="form-group">
                                                        <span id="subbtnshow" >
                                                            <ButtonBox onClickHandler={saveFeedbackHandler} type="save" text={t('submit')} className="btn-sm mx-3"></ButtonBox>
                                                            {/* <input type="submit" name="feedbackbtn" id="feedbackbtn" value="submit" onClickHandler={saveFeedbackHandler} className="btn btn-warning res-reset feedback-reset" /> */}
                                                        </span>
                                                        <ButtonBox type="reset" text={t('reset')} className="btn btn-primary res-reset feedback-reset pull-right" />
                                                        {/* <button type="button" value="" id="verifybtn" className="btn btn-primary verifybtn">{t("btn1Feedback")}</button> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
