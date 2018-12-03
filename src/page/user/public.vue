<template lang="jade">
dheader
.profile(__vuec__)
  .detail.fl
    .avatar
      img(:src="user.avatar")
    .bfc.mt-40
      .watching
        label 浏览总量
        .number.fr.mr-20 {{user.view_count}}
      .liking.mt-10
        img(src="/src/page/components/gallery/like.png")
        .number.fr.mr-20 {{user.like_count}}
  .fl.desc.ml-20
    .name.ml-30 {{user.name}}
    .slogon.ml-30 {{user.desc}}
    .business.mt-80.pl-30.pt-20
      .label.fl 承接业务：
      ul.bfc
        li(v-for="r in roles") {{r}}
  .bfc.radar.fr.mr-30
    radar(:data="data")
gallery(:uid="ids.uid", :type="public")
</template>
<script>
import {Vue, router, dheader} from '/src/assets/js/page';
import gallery from '/src/page/components/user-gallery/gallery';
import utils from '/src/assets/js/utils';
import api from '/src/assets/js/api';
import radar from '/src/public/radar/radar';

export default {
    components: {
        dheader,
        gallery,
        radar
    },
    watch: {
        roles(val) {
          console.log(val);
        }
    },
    computed: {
        roles() {
            return this.user.role.split(',');
        }
    },
    asyncData (resolve) {
        this.fetch().done(function () {
            this.user = this.data;
            resolve(this);
        });
    },
    methods: {
        // 获取用户基本信息
        fetch() {
            return api.get({
                url: constant.API.USER + this.ids.uid,
            });
        }
    },
    data () {
        let id = utils.getURLParam('id');
        let uid = utils.getURLParam('uid');
        return {
            user: {},
            ids: {
              id: id,
              uid: uid,
              page: 1,
              per_page: 100
            },
            info: {},
            data: {},
            success: false,
        };
    }
};
</script>
<style lang="less">
@import (reference) 'src/assets/css/base';

@profilePaddingTop: 40px;
.profile[__vuec__] {
  padding-left: 70px;
  padding-top: @profilePaddingTop;
  height: 320px;
  background: url(./banner.jpg) no-repeat center;
  color: #999;
  .avatar {
    width: 138px;
    height: 138px;
    img {
      height: 100%;
      width: 100%;
      border-radius: 69px;
    }
  }
  .name {
    color: #fff;
    height: 56px;
    font-size: 40px;
  }
  .watching,
  .liking {
    width: 180px;
  }
  .watching {
    font-size: 20px;
  }
  .number {
    font-size: 20px;
  }
  .slogon {
    font-size: 1.8rem;
  }
  .desc {
    border-left: 1px solid #999;
    height: 245px;
  }
  .liking img {
    height: 18px;
    width: 18px;
  }
  .business {
    border-top: 1px solid #999;
    .label {
      font-size: 1.4rem;
    }
    ul {
      padding-left: 40px;
    }
    li {
      color: #00b9ff;
      font-size: 1.4rem;
    }
  }
  .radar {
    position: relative;
    top: -20px;
    width: 420px;
    height: 320px - @profilePaddingTop;
  }
}
</style>