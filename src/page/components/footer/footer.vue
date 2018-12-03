<style scoped lang="less">
@import (reference) '/src/assets/css/base.less';

.footer {
    height: @h-footer;
    background-color: @bg-footer;
    font-size: 12px; // 1.2rem
    color: #fff;
    a {
        color: #fff;
    }
    .container {
        height: 240px;
        .title {
            font-size: 14px;
            font-weight: 700;
            margin-bottom: 8px;
            &:hover {
                opacity: .8;
            }
        }
        ul {
            float: left;
            margin-top: 60px;
            &:not(.first) {
                margin-left: 120px;
            }
            li{
                opacity: .8;
                line-height: 2;
                &:hover {
                    opacity: 1;
                }
            }
            &.weixin img{
                height: 64px;
                width: 64px;
            }
            &.authorized img{
                height: 80px;
                width: 80px;
            }
            &.authorized,
            &.weixin {
                li {
                    cursor: default;
                    opacity: .8;
                }
            }
        }
    }
    .bottom {
        color: #fff;
        opacity: .4;
        height: 60px;
        -webkit-background-clip: padding-box; /* for Safari */
        background-clip: padding-box; /* for IE9+, Firefox 4+, Opera, Chrome */
        border-top: 1px solid rgba(255, 255, 255, .1);
        text-align: center;
        line-height: 60px;
    }
}

</style>
<template lang="jade">
footer.footer
  div.container
  div.bottom
    span @2016 Designer
    span.ml-20
      a(href="https://www.baidu.com/duty/", target="_blank") 自由设计师平台
</template>
<script>
export default {
    data() {
        return {};
    }
};
</script>
