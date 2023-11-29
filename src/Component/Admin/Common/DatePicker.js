import { common } from '../../../utils/common'
import ErrorLabel from './ErrorLabel'
import Label from './Label'
import React, { useRef, useState } from 'react';

export default function DatePicker({ labelText, isRequired, name, labelTextHelp, id, className, onChangeHandler, errorMessage, showError, showLabel, value, disabled,
    labelFontSize, overrideClass, onChangeHandlerData, style, onBlur, title, disableTitle }) {
    labelText = common.defaultIfEmpty(labelText, "Label1");
    isRequired = common.defaultIfEmpty(isRequired, false);
    name = common.defaultIfEmpty(name, "name1");
    id = common.defaultIfEmpty(id, "textbox1");
    className = common.defaultIfEmpty(className, '');
    onChangeHandler = common.defaultIfEmpty(onChangeHandler, () => { });
    onBlur = common.defaultIfEmpty(onBlur, () => { });
    onChangeHandlerData = common.defaultIfEmpty(onChangeHandlerData, undefined);
    errorMessage = common.defaultIfEmpty(errorMessage, undefined);
    showError = common.defaultIfEmpty(showError, true);
    showLabel = common.defaultIfEmpty(showLabel, true);
    value = common.defaultIfEmpty(value, "");
    disabled = common.defaultIfEmpty(disabled, false);
    labelFontSize = common.defaultIfEmpty(labelFontSize, "12px");
    overrideClass = common.defaultIfEmpty(overrideClass, false);
    labelTextHelp = common.defaultIfEmpty(labelTextHelp, "");
    disableTitle = common.defaultIfEmpty(disableTitle, true);
    title = common.defaultIfEmpty(title, "");
    style = common.defaultIfEmpty(style, {});
    return (
        <>
            {showLabel && <Label text={labelText} helpText={labelTextHelp} fontSize={labelFontSize} isRequired={isRequired}></Label>}
            <input
                onChange={e => onChangeHandler(e, onChangeHandlerData)}
                name={name}
                value={value}
                type="date"
                id={id}
                className={overrideClass ? className : "form-control " + className}
                disabled={disabled ? "disabled" : ""}
                style={style}
                onBlur={e => onBlur(e)}
                data-toggle={disableTitle?"": "tooltip"}
                title={title}
            />
            {showError && <ErrorLabel message={errorMessage}></ErrorLabel>}
        </>
    )
}
