/**
  @file: components mixins
  @author: lisen04@baidu.com

*/

import constant from 'src/assets/js/constant';

export default {
    data() {
        return {
            data: {},
            info: {},
            success: false,
            and: '&',
            publicURL: constant.PATH.USER_PUB,
            demandURL: constant.PATH.ORDER_DEMAND
        };
    }
};

