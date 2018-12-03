'use strict';

console.log(111)

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
export default function(date, formatter) {
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
