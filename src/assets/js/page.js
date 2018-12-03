/**
    @file: 页面基本脚本
    @date: 2016.06.30 04:24 PM
    @author: lisen04@baidu.com
*/

import Vue from 'vue';
import dheader from '/src/page/components/header/header.vue';
import dfooter from '/src/page/components/footer/footer.vue';
import VueAsyncData from 'vue-async-data';

// 开启debugger模式
Vue.config.debug = true;

Vue.use(VueAsyncData);

// 加载公共Filters
Vue.filter('date', require('/third_party/util/filters/dateFormat'));
Vue.filter('encode', function (str) {
    return encodeURIComponent(str);
});
Vue.filter('decode', function (str) {
    return decodeURIComponent(str);
});

export default {
    Vue,
    dheader,
    dfooter
};


