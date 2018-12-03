/**
 * @file: utility function
 * @author: lisen04@baidu.com
 * @date: 2014-05-21
 * */

var utils = {};

utils.without = function (array, val) {
    let len = array.length;
    for (let i = len - 1; i >= 0; i--) {
        let v = array[i];
        if (v === val) {
            array.splice(i, 1);
        }
    }
    return array;
};

utils.isObject = function (obj) {
    return typeof obj === 'object' && !obj.length;
};

// 转换location.hash参数为当前页面的hashObj
utils.parseHash = function (hash) {
    hash || (hash = window.location.hash);
    hash = hash.replace('#!/', '');
    var params;
    var nparams = {};
    params = hash.split('&');
    params.forEach(function (value) {
        var obj = value.split('=');
        var key = obj[0];
        var val = obj[1];
        if (val) {
            nparams[key] = val;
        }
    });
    return nparams;
};

utils.getURLParam = function (name) {
    // 构造一个含有目标参数的正则表达式对象
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    // 匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    if (r) {
        return unescape(r[2]);
    }
    // 返回参数值
    return null;
};

utils.timestamp = function () {
    return new Date().getTime();
};

// 操作cookie
utils.setCookie = function (name, value, expires, path, domain, secure) {
    // set time, it's in milliseconds
    var today = new Date();
    today.setTime(today.getTime());
    var expireDate;
    if (Number.isNumber(expires)) {
        expires = expires * 1000 * 60 * 60 * 24;
        expireDate = new Date(today.getTime() + (expires));

    }
    if (utils.isObject(expires)) {
        expireDate = expires;
    }
    var expireDateStr = expireDate.toGMTString();
    document.cookie = name + '=' + encodeURIComponent(value)
    + ((expires) ? ';expires=' + expireDateStr : '')
    + ((path) ? ';path=' + path : '')
    + ((domain) ? ';domain=' + domain : '') + ((secure) ? ';secure' : '');
};
utils.getCookie = function (checkName) {
    // first we'll split this cookie up into name/value pairs
    // note: document.cookie only returns name=value, not the other components
    var allCookies = document.cookie.split(';');
    var aTempCookie = '';
    var cookieName = '';
    var cookieValue = '';
    var bCookieFound = false; // set boolean t/f default f
    for (var i = 0; i < allCookies.length; i++) {
        // now we'll split apart each name=value pair
        aTempCookie = allCookies[i].split('=');
        // and trim left/right whitespace while we're at it
        cookieName = aTempCookie[0].replace(/^\s+|\s+$/g, '');
        // if the extracted name matches passed checkName
        if (cookieName === checkName) {
            bCookieFound = true;
            // we need to handle case where cookie has no value but exists (no = sign, that is):
            if (aTempCookie.length > 1) {
                cookieValue = decodeURIComponent(aTempCookie[1].replace(/^\s+|\s+$/g, ''));
            }
            // note that in cases where cookie is initialized but no value, null is returned
            return cookieValue;
            // break;
        }
        aTempCookie = null;
        cookieName = '';
    }
    if (!bCookieFound) {
        return null;
    }
};
utils.deleteCookie = function (name, path, domain) {
    if (this.getCookie(name)) {
        document.cookie = name + '='
        + ((path) ? ';path=' + path : '')
        + ((domain) ? ';domain=' + domain : '')
        + ';expires=Thu Jan 01 1970 08:00:00 GMT+0800';
    }
};
utils.appendCookie = function (name, value, expires, path, domain, secure) {
    if (name === null || name === undefined || value === null || value === undefined) {
        return -1;
    }
    var oldcookievalue = this.getCookie(name) === null ? '' + value : this.getCookie(name) + '' + value;
    this.setCookie(name, oldcookievalue, expires, path, domain, secure);
};

/*
 * @desc: 流量单位转换
 * @params: size 流量单位
 * @params: pow 几次幂
 * */
utils.parseSize = function (size, pow, fixed) {
    var _number = 0;
    var unit = 'B';
    var bytes = 1024;
    fixed || (fixed = 0);
    // _size是去除单位的size，并不是原始字节数目
    if (!pow) {
        pow = 0;
        if (size >= Math.pow(bytes, 3)) {
            pow = 3;
        }
        else {
            if (size >= Math.pow(bytes, 2) && size < Math.pow(bytes, 3)) {
                pow = 2;
            }
            else {
                if (size >= bytes && size < Math.pow(bytes, 2)) {
                    pow = 1;
                }
            }
        }
    }
    switch (pow) {
        case 3:
            unit = 'G';
            break;
        case 2:
            unit = 'M';
            break;
        case 1:
            unit = 'K';
            break;
    }
    _number = size / Math.pow(bytes, pow);

    return {
        size: size,
        _number: _number,
        unit: unit,
        pow: pow,
        html: _number.toFixed(fixed) + unit

    };
    /* eslint-enable fecs-camelcase */
};

function fromISO (date) {
    if (typeof date === 'string') {
        var s = date;
        var D = new Date('2011-06-02T09:34:29+02:00');
        if (!D || +D !== 1307000069000) {
            var day;
            var tz;
            var rx = /^(\d{4}\-\d\d\-\d\d([tT ][\d:\.]*)?)([zZ]|([+\-])(\d\d):(\d\d))?$/;
            var p = rx.exec(s) || [];
            if (p[1]) {
                day = p[1].split(/\D/);
                for (var i = 0, L = day.length; i < L; i++) {
                    day[i] = parseInt(day[i], 10) || 0;
                }
                day[1] -= 1;
                day = new Date(Date.UTC.apply(Date, day));
                if (!day.getDate()) {
                    return NaN;
                }
                if (p[5]) {
                    tz = (parseInt(p[5], 10) * 60);
                    if (p[6]) {
                        tz += parseInt(p[6], 10);
                    }
                    if (p[4] === '+') {
                        tz *= -1;
                    }
                    if (tz) {
                        day.setUTCMinutes(day.getUTCMinutes() + tz);
                    }
                }
                return day;
            }
            return NaN;
        }
        return new Date(s);
    }
    if (Number.isInteger(date)) {
        return new Date(date) || new Date();
    }
    return date || new Date();
};
utils.formatDate =  function(date, formatter) {
    date = fromISO(date);
    if (!formatter) {
        formatter = 'yyyy-mm-dd';
    }
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 1).toString();
    var day = date.getDate().toString();
    var hour = date.getHours().toString();
    var minute = date.getMinutes().toString();
    var second = date.getSeconds().toString();

    var yearMarker = formatter.replace(/[^y|Y]/g, '');
    if (yearMarker.length > 1) {
        if (yearMarker.length === 2) {
            year = year.substring(2, 4);
        }
    }
    else {
        year = '';
    }

    var monthMarker = formatter.replace(/[^m|M]/g, '');
    if (monthMarker.length > 1) {
        if (month.length === 1) {
            month = '0' + month;
        }
    }
    else {
        month = '';
    }
    var dayMarker = formatter.replace(/[^d|D]/g, '');
    if (dayMarker.length > 1) {
        if (day.length === 1) {
            day = '0' + day;
        }
    }
    else {
        day = '';
    }

    var hourMarker = formatter.replace(/[^h|H]/g, '');
    if (hourMarker.length > 1) {
        if (hour.length === 1) {
            hour = '0' + hour;
        }
    }
    else {
        hour = '';
    }

    var minuteMarker = formatter.replace(/[^n|N]/g, '');
    if (minuteMarker.length > 1) {
        if (minute.length === 1) {
            minute = '0' + minute;
        }
    }
    else {
        minute = '';
    }

    var secondMarker = formatter.replace(/[^s|S]/g, '');
    if (secondMarker.length > 1) {
        if (second.length === 1) {
            second = '0' + second;
        }
    }
    else {
        second = '';
    }

    var ret = formatter.replace(yearMarker, year)
    .replace(monthMarker, month)
    .replace(dayMarker, day)
    .replace(hourMarker, hour)
    .replace(minuteMarker, minute)
    .replace(secondMarker, second);

    return ret;
}

module.exports = utils;

