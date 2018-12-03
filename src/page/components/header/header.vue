<template lang="jade">
header.header
  div.header-account
    div.container-fluid
      div.logo.fl
        a(href="/")
          img(src="/src/page/components/header/logo.png")
      div.router
        ul
          li(:class="{active: pathname === '/'}")
            a(href="/") 首页
          li(:class="{active: pathname === ORDER_DEMAND}")
            a(href="{{ORDER_DEMAND}}") 需求池
          li(:class="{active: pathname === ORDER_PUB_MANAGEMENT}")
            a(href="{{ORDER_PUB_MANAGEMENT}}") 发单管理
          li(:class="{active: pathname === ORDER_APPLY_MANAGEMENT}")
            a(href="{{ORDER_APPLY_MANAGEMENT}}") 接单管理
          li(:class="{active: pathname === ORDER_INTEGRAL}")
            a(href="{{ORDER_INTEGRAL}}") 积分购买
          li
            a(href="/about.html") 关于自由
      div.account-container.fr
        .fl(v-if="isLogout")
          ul.login
            li.regedit
              a(href="{{REGISTER}}", target="_blank;") 注册
            li.vline |
            li
              a(href="{{LOGIN}}", target="_blank;") 登录
        .fl.logon(v-else)
          div(@click="toggleMenu")
            span.fl.user-display-name.ellipsis {{data.name || ''}}
            span.fl.arrow-down.ml-10 &nbsp;
          .clear
          ul.account-menu(v-show="showMenu")
            li.logout
              a(href="{{USER_PROFILE}}") 个人中心
            li.logout(@click="logout")
              a(href="javascript:;") 退出
        div.fl.ml-20
          input.search(placeholder="Search users")
  div.transition(v-if="isHome")
    .slogon-wrap(v-if="isLogout")
      .slogon
        span.question 自由设计师交易合作平台，根据专长自由合作分包。
        span.btn.ml-20
          a(href="{{REGISTER}}") 加入我们
</template>
<script>
import api from '/src/assets/js/api';
import constant from '/src/assets/js/constant';
import _ from 'lodash';
import eventVue from '../../../assets/js/eventVue'

export default {
    // 获取users的信息
    asyncData (resolve) {
        let self = this;
        this.fetch()
        .done(function () {
            localStorage.setItem("temp_user_id", this.data.id);
            eventVue.$emit("userinfo",this.data)
            resolve(this);
            if (self.isLogout && window.location.pathname.indexOf('/order/') > -1) {
                window.location.href = constant.PATH.LOGIN;
            }
        });
    },
    computed: {
        isHome () {
            return window.location.pathname === '/';
        },
        isLogout () {
            return this.data && JSON.stringify(this.data) === '{}';
        }
    },
    methods: {
        fetch () {
            let promise = api.get({
                url: constant.API.USER_STAT
            });
            window.userStat = promise;
            return promise;
        },
        toggleMenu () {
            this.showMenu = !this.showMenu;
        },
        logout () {
            api.get({
                url: constant.API.LOGOUT
            }).done(() => {
                window.location.href = constant.PATH.HOME;
            });
        }
    },
    data() {
        return _.merge({}, constant.PATH, {
            info: {},
            data: {},
            // 未登录状态
            success: false,
            // 是否显示菜单
            showMenu: false,
            // 用户名
            name: '',
            pathname: window.location.pathname
        });
    }
};
</script>
<style scoped lang="less">
@import (reference) '/src/assets/css/base.less';
.header {
  color: #ccc;
  font-size: 14px;
  position: relative;
  z-index: 99;
  .logo {
    img {
      position: relative;
      top: 5px;
    }
  }
  li {
      display: inline-block;
      padding: 0 5px;
      a {
          cursor: pointer;
          color: #fff;
          opacity: .8;
          &:hover {
              color: #fff;
              opacity: 1;
          }
      }
      &.vline {
          opacity: .2;
      }
  }
  .router {
      float: left;
      li {
          margin-left: 50px;
          &.active {
            a {
              opacity: 1;
            }
          }
      }
  }
  .btn {
    border-radius: 10px;
  }
  .header-account {
    background: rgba(47,47,47,0.98);
    height: @h-header;
    line-height: @h-header;
    .account-container {
      .search {
        background: #fff url(./search.png) 10% 50% no-repeat;
        border-radius: 20px;
        height: 32px;
        width: 160px;
        text-indent: 36px;
      }
      .logon {
        position: relative;
        cursor: pointer;
        .user-display-name {
          max-width: 200px;
        }
        .arrow-down {
          height: 100%;
          width: 8px;
          background: url(./arrow-normal.png) no-repeat center;

        }
        .account-menu {
          z-index: 1;
          position: absolute;
          cursor: pointer;
          width: 80px;
          right: 0;
          background: #464d5a;
          .logout {
            width: 100%;
            a {
              cursor: pointer;
              text-align: center;
            }
          }
        }
      }
      .logon-hover {
        cursor: pointer;
        .arrow-down {
            height: 100%;
            width: 8px;
            margin-left: 5px;
            background: url(./arrow-hover.png) no-repeat center;
        }
        li a {
            opacity: 1;
        }
      }
    }
  }
  .transition {
    height: 400px;
    position: relative;
    background: url(./banner.jpg) center;
    .slogon-wrap {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      height: 90px;
      line-height: 90px;
      background: rgba(0, 0, 0, .5);
      .slogon {
        margin: auto;
        width: 480px;
        color: #818181;
      }
    }
  }
}
</style>
