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
      .label.fl 专业技能：
      ul.bfc
        li(v-for="r in roles") {{r}}
  .bfc.radar.fr
    radar(:data="data")
.tab
  span(:class="tabActive == 1 ? 'active' : ''", @click='selectTab(1)') 工作历史和反馈
  span(:class="tabActive == 2 ? 'active' : ''", @click='selectTab(2)') 作品展示
his-Back(:uid="ids.uid", v-if="tabActive == 1")
.gallery(v-if="tabActive == 2")
  gallery(:uid="ids.uid", :type="public")
</template>
<script>
import {Vue, router, dheader} from '/src/assets/js/page';
import gallery from '/src/page/components/user-gallery/gallery';
import hisBack from '/src/page/user/hisBack';
import utils from '/src/assets/js/utils';
import api from '/src/assets/js/api';
import radar from '/src/public/radar/radar';

export default {
    components: {
        dheader,
        gallery,
        radar,
        hisBack
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
        },
        selectTab (idx) {
          this.tabActive = idx;
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
            tabActive: 1
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
    color: #fff;
    font-size: 1.8rem;
  }
  .desc {
    width: 800px;
    border-left: 1px solid #999;
    height: 245px;
    overflow: hidden;
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
    top: -260px;
    width: 420px;
    height: 320px - @profilePaddingTop;
  }
}
.tab{
  width: 100%;
  min-width: 1080px;
  margin: 0 auto;
  height: 60px;
  border-bottom: 1px solid #999;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
}
.tab span{
  font-size: 20px;
  color: #999;
  cursor: pointer;
}
.tab .active{
  color: #00b9ff;
}
.gallery{
  margin-top: 60px;
}
</style>