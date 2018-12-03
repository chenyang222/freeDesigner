/**
 * @file: 静态变量类
 * @author: lisen04@baidu.com
 * @date: 2015-08-26
 */

let constant = {};

/* global url */
constant.URL = {
    PROTOCOL: window.location.protocol,
    HOST: window.location.host,
    PATH_NAME: window.location.pathname,
    SEARCH: window.location.search

};
// 网站URL根路径
constant.URL.ROOT = constant.URL.PROTOCOL + '//' + constant.URL.HOST;
// 网站URL全路径
constant.URL.FULL_PATH = constant.URL.ROOT + constant.URL.PATH_NAME + constant.URL.SEARCH;

constant.API_PATH = '/api';

/* login */
constant.ACCOUNT = {
    URL: constant.API_PATH + '/users/'
};
constant.API =  {
    LOGIN: '/login/',
    LOGOUT: '/logout',
    REGISTER: '/register/',
    USER_STAT: '/user_stat/',
    USER: '/users/',
    USER_RESETPASSWORD: '/user/reset_password/',
    USER_ABILITY: '/user_ability/',
    USER_GALLERY: '/gallery/',
    HOT_GALLERY: '/hot_gallery/',
    UPLOAD_FILE: '/upload_file/',
    LIKE_IT: '/like_it/',
    ORDERS: '/orders/',
    ORDER_CATEGORY: '/order/category/',
    ORDER_CONFIRM: '/order_confirm/',
    SUGGEST_PRICE: '/suggest_cost/',
    APPLY_RECORDS: '/apply_records/',  // 和子资源的url一样, 但是路径不一样
    DEMAND: '/demand/',
    GET_ADD_PRESTORE: '/prestore/',
    PAY_CREATE_ORDER: '/pay/create_order/',
    PAY_CHECK: '/wechat/pay_check/'
};
// 统一添加/api的头
Object.keys(constant.API).forEach(key => {
    let value = constant.API[key];
    constant.API[key] = constant.API_PATH + value;
});
// 不需要添加api头的
constant.API.GALLERY = '/gallery/';
constant.API.IMAGE = '/image/';
constant.API.APPLY_RECORD = '/apply_records/';
constant.API.ORDER_CONFIRM = '/order_confirm/';
constant.API.ORDER_COMMENTS = '/order_comments/';

constant.PATH = {
    HOME: '/',
    LOGIN: '/login/login.html',
    REGISTER: '/register/register.html',
    GALLERY: '/gallery/gallery.html',
    USER_PUB: '/user/public.html',
    USER_PROFILE: '/user/profile.html',
    USER_GALLERY: '/user/space.html',
    USER_SPACE: '/user/space.html',
    USER_ACCOUNT: '/user/account.html',
    ORDER_PUB: '/order/pub.html',
    ORDER_DEMAND: '/public/demand.html',
    ORDER_SHARE: '/order/share.html',
    ORDER_DETAIL: '/order/pub_detail.html',
    ORDER_PUB_DETAIL: '/order/pub_detail.html',
    ORDER_PUB_MANAGEMENT: '/order/pub_management.html',
    ORDER_APPLY_MANAGEMENT: '/order/apply_management.html',
    ORDER_APPLY_DETAIL: '/order/apply_detail.html',    // 申请记录
    ORDER_APPLY_RECORD: '/order/apply_record.html',
    ORDER_INTEGRAL: '/order/integral.html',
    POINTS_DETAIL: '/user/point-detail.html',
};

constant.ORDER = {
    CONFIRMED: 80,
    FIRST_COMMIT: 70,

    // 第一次修改
    FIRST_MODIFY: 60,
    SECOND_COMMIT: 50,

    // 第二次修改
    SECOND_MODIFY: 40,
    THIRD_COMMIT: 30
};

// debugger for dev
window.constant = constant;
module.exports = constant;
