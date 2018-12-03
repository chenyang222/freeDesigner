/**
 * @file: 封装了后端异常自动提示，ajax请求
 * @author: senli
 * @date: 2015-10-16
 *
 * */

import $ from 'jquery';
import _ from 'lodash';

let API = {};
let message = {};
message.TIP = {
    TIP_ID: 'YJS-TIP-1',
    TIP_TITLE_SUCCESS: '成功：',
    TIP_TITLE_WARN: '警告!',
    TIP_TITLE_ERROR: '错误：',
    TIP_CLASS_SUCCESS: 'success',
    TIP_CLASS_WARN: 'warn',
    TIP_CLASS_ERROR: 'error',
    PREVIEW: '效果预览'
};
message.ERRORS = {
    HTTP: {
        304: '请求内容没有改变',
        400: '请求失效',
        401: '未认证的用户请求',
        403: '禁止， 请求未被认证',
        404: '该方法不存在',
        405: '方法未被允许， 不正确的HTTP方法',
        415: '不支持的媒体类型， 响应不是一个有效的JSON格式',
        500: '服务器异常',
        504: '请求超时'
    }
};

function tipErrors(message) {
    if (message) {
        window.alert(message);
    }
}
/*
 * @description: 全局的AJAX封装，错误提示已经封装好了
 *
 * */

/* eslint-disable fecs-camelcase, new-cap */

API.ajax = function (options) {
    let defered = $.Deferred();
    let resolve = defered.resolve;
    let reject = defered.reject;
    let promise = defered.promise;
    options.url || (options.url = '/');
    if (!_.endsWith(options.url, '/') && options.url.length !== 0) {
        options.url += '/';
    }
    options = _.merge({}, {
        type: 'post',
        contentType: 'application/json',
        dataType: 'json',
        data: {},
        success(resp) {
            let success = resp.success;
            let data = resp.data;
            /* eslint-disable fecs-camelcase */
            let pageInfo = resp.page_info;
            // resolve, reject
            if (success) {
                resolve.call({
                    data: data,
                    info: pageInfo,
                    success: success
                });
                options.callback && options.callback();
                return;
            }
            reject();
            tipErrors(resp.message);
        },
        error(err) {
            tipErrors(err.stauts);
        }

    }, options);
    if (options.type.toLowerCase() !== 'get'
        && options.contentType === 'application/json') {
        options.data = JSON.stringify(options.data);
    }
    $.ajax(options);
    return promise();
};
API.get = function (options) {
    options.type = 'get';
    return API.ajax(options);
};

API.post = function (options) {
    return API.ajax(options);
};

API.delete = function (options) {
    options.headers = {
        'X-Http-Method-Override': 'DELETE'
    };
    return API.ajax(options);
};

API.patch = function (options) {
    options.headers = {
        'X-Http-Method-Override': 'PATCH'
    };
    return API.ajax(options);
};

API.put = function (options) {
    options.headers = {
        'X-Http-Method-Override': 'PUT'
    };
    return API.ajax(options);
};

module.exports = API;
