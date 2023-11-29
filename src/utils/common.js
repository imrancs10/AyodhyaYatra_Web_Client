import RegexFormat from "./RegexFormat";

const common = {
    defaultIfEmpty: (input, defaultValue) => {
        if (input === undefined || input === null || input === "")
            return defaultValue;
        return input;
    },
    concatClassIfNotEmpty: (input, concatClass, condition) => {
        return condition ? `${input} ${concatClass}` : input;
    },
    formatTableData: (input, action, rowData) => {
        var returnVal = '';
        if (typeof input === 'boolean') {
            returnVal = input.toString();
            if (action?.replace) {

                for (var key in action.replace) {
                    if (key.toLocaleLowerCase() === returnVal.toLocaleLowerCase())
                        returnVal = action.replace[key];
                }
            }
            return returnVal;
        }
        if (action?.replace) {

            for (var key1 in action.replace) {
                if (key1.toLocaleLowerCase() === input.toLocaleLowerCase())
                    input = action.replace[key1];
            }
            return input;
        }

        if (typeof input === 'number') {
            returnVal = input.toString();
            if (action?.decimal) {
                returnVal = parseFloat(input).toFixed(2);
            }
            if (action?.currency) {
                returnVal = returnVal + ' ' + action.currency
            }
            return returnVal;
        }

        if (typeof input !== 'string')
            return input;

        if (action?.image) {
            if (input === undefined || input === "")
                return "No Image";
            return <img style={{ height: "40px", width: "40px", cursor: "pointer" }} alt="default" src={process.env.REACT_APP_API_URL + input} data-bs-toggle="modal" data-bs-target="#table-image-viewer"></img>
        }
        if (input === common.defaultDate) {
            return returnVal
        }
        if (input.match(RegexFormat.dateTimeRegex) !== null)
            return common.getHtmlDate(input.match(RegexFormat.dateRegex)[0], 'ddmmyyyy');
        if (action?.upperCase) {
            if (input !== undefined && input !== "")
                return input.toUpperCase()
            return input;
        }
        return input;
    },
    assignDefaultValue: (sourceObj, targetObj) => {
        if (typeof sourceObj === "object" && typeof targetObj === "object") {
            for (var key in sourceObj) {
                if (targetObj[key] === null || targetObj[key] === undefined || targetObj[key] === "0" || targetObj[key] === "") {
                    switch (typeof sourceObj[key]) {
                        case "number":
                            targetObj[key] = 0;
                            break;
                        case "boolean":
                            targetObj[key] = false;
                            break;
                        default:
                            targetObj[key] = sourceObj[key];
                            break;
                    }
                }
            }
        }
        return targetObj;
    },
    getLastDateOfMonth: (month, year) => {
        let currentDate = new Date();
        month = typeof month === "number" ? month + 1 : currentDate.getMonth() + 2;
        year = typeof year === "number" ? year : currentDate.getFullYear();
        if (month > 12) {
            month = 1;
            year += 1;
        }
        let lastDateOfMonth = new Date(`${year}-${month}-01`).setDate(0);
        return new Date(lastDateOfMonth).toDateString();
    },
    getFirstDateOfMonth: (month, year) => {
        let currentDate = new Date();
        month = typeof month === "number" ? month : currentDate.getMonth();
        year = typeof year === "number" ? year : currentDate.getFullYear();
        return new Date(`${year}-${month + 1}-01`).toDateString();
    },
    daysInMonth: (month, year) => {
        return new Date(year, month, 0).getDate();
    },
    getHtmlDate: (date, format = "yyyymmdd") => {
        if (date === undefined || date === null)
            return "";
        if (typeof date !== "object") {
            date = new Date(date);
        }
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var day = (date.getDate()).toString().padStart(2, '0');
        if (format === "yyyymmdd")
            return `${date.getFullYear()}-${month}-${day}`;
        if (format === "ddmmyyyy")
            return `${day}-${month}-${date.getFullYear()}`;

    },
    closePopup: (closeButonId, callback) => {
        closeButonId = closeButonId === undefined || closeButonId === '' ? 'closePopup' : closeButonId;
        const closeButton = document.getElementById(closeButonId);
        closeButton.addEventListener('click', () => {
            if (callback !== undefined && typeof callback === 'function') {
                callback();
            }
        });

        closeButton.click();

    },
    numberRanger: (start, end) => {
        var range = []
        if (isNaN(start) || isNaN(end))
            return range;
        if (end >= start) {
            for (let index = start; index <= end; index++) {
                range.push(index);
            }
        }
        else {
            for (let index = start; index >= end; index--) {
                range.push(index);
            }
        }
        return range;
    },
    numberRangerForDropDown: (start, end) => {
        var range = []
        if (Array.isArray(start)) {
            for (let index = 0; index < start.length; index++) {
                range.push({ id: start[index], value: start[index].toString() });
            }
            return range;
        }
        else {
            if (isNaN(start) || isNaN(end))
                return range;
            for (let index = start; index <= end; index++) {
                range.push({ id: index, value: index.toString() });
            }
            return range;
        }
    },
    monthList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    defaultIfIsNaN: (input, defaultValue = 0) => {
        return isNaN(input) ? defaultValue : input;
    },
    toUpperCase: (e) => {
        e.target.value = e.target.value.toUpperCase();
    },
    throttling: (callback, wait, args) => {
        var timer = setTimeout(() => {
            callback(args);
            timer = undefined;
        }, wait);
        if (timer)
            return;
    },
    debounce: (func, delay, args) => {
        let debounceTimer
        return function () {
            const context = this
            //const args = arguments
            clearTimeout(debounceTimer)
            debounceTimer = setTimeout(() => func.apply(context, args), delay)
        }
    },
    printDecimal: (number) => {
        number = parseFloat(number);
        if (isNaN(number)) return 0.00
        return number.toFixed(2);

    },
    cloneObject: (obj) => {
        if (obj === undefined || obj === null)
            return obj;
        return JSON.parse(JSON.stringify(obj));
    },
    defaultDate: "0001-01-01T00:00:00",
    getDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    defaultImageUrl: "assets/images/default-image.jpg",
    generateMasterDataCode: (value) => {
        return value.toLowerCase().trim().replaceAll(RegexFormat.specialCharectors, "_").replaceAll(RegexFormat.endWithHyphen, '');
    },
    dropdownArray: (array, withId = false) => {
        return array?.map((ele, index) => {
            var id = ele;
            if (withId === true) {
                id = parseInt(id);
                id = isNaN(id) ? index + 1 : id;
            }
            return { id: id, value: ele }
        });
    },
    removeByAttr: function (arr, attr, value) {
        var i = arr.length;
        while (i--) {
            if (arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arguments.length > 2 && arr[i][attr] === value)) {

                arr.splice(i, 1);

            }
        }
        return arr;
    },
    getCurrDate: (isHtml = true) => {
        if (isHtml)
            return common.getHtmlDate(new Date());
        return new Date();
    },
    orderStatusIcon: {
        active: "Active",
        processing: 'bi bi-gear text-info',
        completed: 'bi bi-check2-circle text-warning',
        partiallyDelivered: 'bi bi-circle-fill text-secondary',
        partiallydelivered: 'bi bi-circle-fill text-secondary',
        cancelled: 'bi bi-circle-fill',
        partiallyCancelled: 'bi bi-circle-fill',
        partiallycancelled: 'bi bi-circle-fill',
        "partially cancelled": 'bi bi-circle-fill',
        delivered: 'bi bi-circle-fill text-success',
        deleted: 'bi bi-x-circle',
    },
    addYearInCurrDate: (year) => {
        year = common.defaultIfEmpty(year, 0);
        var curDate = new Date();
        return new Date(curDate.setFullYear(curDate.getFullYear() + year));
    },
    validateContactNo: (contactNo) => {
        if (!contactNo)
            return false;
        if (contactNo.indexOf('+970') === -1 && contactNo.indexOf('+971') === -1)
            return false;
    },
    invoiceNoPadding: (invoiceNo) => {
        return String(invoiceNo).padStart(7, 0);
    },
    contactNoEncoder: (contactNo) => {
        return contactNo?.replace('+', '%2B');
    },
    masterDataTypes: [
        { value: 'Select Type', id: -1 },
        { value: 'Temple', id: 0 },
        { value: 'Yatra', id: 1 },
        { value: 'Ghat', id: 2 },
        { value: 'EducationalInstitute', id: 3 },
        { value: 'Hotel', id: 4 },
        { value: 'Business', id: 5 },
        { value: 'Culture', id: 6 },
        { value: 'Restaurant', id: 7 },
        { value: 'Park', id: 8 },
        { value: 'ATM', id: 9 },
        { value: 'WaterTaxi', id: 14 },
        { value: 'Cruise', id: 15 },
        { value: 'BoatRiding', id: 16 },
        { value: 'Heritage', id: 17 },
        { value: 'GangaAarti', id: 18 },
        { value: 'Industries', id: 19 },
        { value: 'Museum', id: 20 },
        { value: 'Railways', id: 21 },
        { value: 'ShoppingPlaces', id: 22 },
        { value: 'Hospital', id: 23 },
        { value: 'Transport', id: 24 },
        { value: 'Entertainment', id: 25 },
        { value: 'HistoricalPlaces', id: 32 },
        { value: 'ReligiousPlaces', id: 33 }
    ],
    templeTypes: [
        { value: 'Famous Temple', id: 1 },
        { value: 'Temple in Kashi', id: 2 },
    ],
    NewsUpdateEnum: [
        { value: 'News', id: 1 },
        { value: 'Notification', id: 2 },
        { value: 'Document', id: 3 },
        { value: 'Event', id: 4 },
    ],
    doNothing: (e) => {
        e.preventDefault();
    },
    isMobileDevice: () => {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    },
    languageCode:{
        hindi:"hi-IN",
        english:"en-US",
        telugu:'te-IN',
        tamil:'ta-IN'
    }

}
export { common };