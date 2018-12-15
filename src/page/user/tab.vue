<template lang="jade">
ul.tab.fl.mt-150(__vuec__)
  li.profile
    a(href="{{profileURL}}") 基本信息
  li.space
    a(href="{{spaceURL}}") 个人空间
  li.account
    a(href="{{accountURL}}") 账户安全
  li.point-detail
    a.last(href="{{pointsURL}}") 积分管理
</template>
<script>
import $ from 'jquery';
import constant from 'src/assets/js/constant';

export default {
    ready() {
        let pathname = constant.URL.PATH_NAME;
        console.info(pathname)
        pathname = pathname.split('/');
        pathname = pathname[pathname.length - 1];
        pathname = pathname.replace('.html', '');
        let $el = $(this.$el).find('.' + pathname);
        $el.addClass('active');
    },
    data() {
        let profileURL = constant.PATH.USER_PROFILE;
        let spaceURL = constant.PATH.USER_SPACE;
        let accountURL = constant.PATH.USER_ACCOUNT;
        let pointsURL = constant.PATH.POINTS_DETAIL;
        return {
            profileURL,
            spaceURL,
            accountURL,
            pointsURL
        };
    }
}
</script>
<style lang="less">
.tab[__vuec__] {
  font-size: 16px;
  width: 170px;
  li {
    cursor: pointer;
    height: 60px;
    line-height: 60px;
    &.active {
      a {
        color: #4495f7;
        border-bottom: 1px solid #4495f7;
      }
      background: url(./arrow-blue.png) 120px no-repeat;
    }
    a {
      padding: 20px;
      border-bottom: 1px solid #333;
      text-align: center;
      width: 120px;
      color: #919191;
      &.last {
        border-bottom: 0;
      }
    }
  }
}
</style>
