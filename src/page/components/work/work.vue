/**
  @desc: user/space,  upload personal work
*/

<template lang="jade">
.cover
  a(href="{{works[index].large_image}}", target="blank")
    img(:src="works[index].large_image")
  .slider.mt-20
    .fl.left(@click="slideWorkList(false)")
    .fl.works-container
      .works
        span(v-for="work in works")
          img(:src="work.small_image", @click="changeWork($index)")
    .fr.right(@click="slideWorkList(true)")
</template>
<script>
import api from '/src/assets/js/api';
import constant from '/src/assets/js/constant';
import $ from 'jquery';

export default {
    props: ['ids'],
    asyncData (resolve, reject) {
        if (!this.ids.uid || !this.ids.id) {
            return;
        }
        this.fetch().done(function () {
            this.works = this.data;
            resolve(this);
        });
    },
    watch: {
        ids: {
            deep: true,
            handler (val) {
                this.url = constant.API.USER + val.uid + constant.API.GALLERY + val.id + constant.API.IMAGE;
                this.index = 0;
                this.reloadAsyncData();
            }
        }
    },
    methods: {
        fetch () {
            return api.get({
                url: this.url
            });
        },
        slideWorkList (isRight) {
            let isLeft = !isRight;
            let $works = $(this.$el).find('.works').eq(0);
            let marginLeft = parseInt($works.css('marginLeft'), 10) || 0;
            let worksWidth = $works.width();
            let offset = 104;
            if (isLeft && marginLeft !== 0) {
                $works.css('marginLeft', marginLeft + offset);
            }
            console.log(this.showWidth - marginLeft);
            console.log(worksWidth);
            console.log((this.showWidth - marginLeft) <= worksWidth);
            if (isRight &&  (this.showWidth - marginLeft) <= worksWidth) {
                $works.css('marginLeft', marginLeft - offset);
            }
        },
        changeWork(index) {
            this.index = index;
        }
    },
    data () {
        return {
            url: constant.API.USER + this.ids.uid + constant.API.GALLERY + this.ids.id + constant.API.IMAGE,
            index: 0, // 默认的相册里面的第一张图片
            works: [{}],
            data: [],
            info: {},
            success: false,
            showWidth: 292 // 幻灯片显示的宽度
        };
    }
};
</script>
<style scoped lang="less">
.cover {
  width: 440px;
  height: 420px;
  background: #fff;
  padding: 20px;
  img {
    width: 400px;
  }
  .slider {
    height: 64px;
    .left,
    .right,
    {
      width: 20px;
      height: 64px;
      cursor: pointer;
    }
    .left {
      background: url('./arrow-left.png') center no-repeat;
    }
    .right {
      background: url('./arrow-right.png') center no-repeat;
    }
    .works-container {
      padding-left: 30px;
      padding-right: 30px;
      position: relative;
      overflow: hidden;
      height: 64px;
      z-index: 2;
      width: 352px;
    }
    .works {
      z-index: 1;
      white-space: nowrap;
      float: left;
      span {
        z-index: 0;
        width: 84px;
        float: left;
        &:not(:first-child) {
          margin-left: 20px;
        }
        img {
          cursor: pointer;
          // height: 64px;
          max-width: 100%;
          margin: auto;
          display: block;
        }
      }
    }
  }
}
</style>
