/**
  @desc: 遮罩对象
    可以自由配置slot
    header, body, footer
  $dispatchEvent:
  1、 closeModal   关闭模态框
  2、 confirmModal 确认完成模态框事件
*/

<template lang="jade">
.modal-mask(v-show="show", transition="modal", @click="close")
  .modal-wrapper
    .modal-container(@click="stopPropagation")
      .modal-header
        slot.slot-header(name="header") default header
        a.close.fr(@click="close")
          img(src="./close.png")
      .modal-body.clear
        .fl.icon.ml-40(class="icon-{{type}}", v-if="!!type")
        .slot-body
          slot(name="body")
            .text {{text}}
            .sub-text.mt-10 {{subtext}}
      .modal-footer
        slot.slot-footer(name="footer")
          .btn.fr.mr-20(@click="confirm")
            a 确认
          .btn.btn-gray.fr.mr-20(@click="close")
            a 取消
</template>
<script type="text/javascript">
import $ from 'jquery';
import _ from 'lodash';

export default {
    props: {
        show: {
            type: Boolean,
            required: true,
            twoWay: true
        },
        css: {
          type: Object,
          required: false
        },
        type: {
          type: String
        },
        action: {
          type: String
        },
        text: {
          type: String
        },
        subtext: {
          type: String
        }
    },
    ready() {
        let $el = $(this.$el);
        if (_.isObject(this.css)) {
            $el.find('.modal-container').css(this.css);
        }
    },
    methods: {
        stopPropagation (e) {
            e.stopPropagation();
        },
        close () {
            this.show = false;
            this.$dispatch('closeModal', true);
        },
        confirm() {
            this.$dispatch('confirmModal', {
                type: this.type,
                action: this.action
            });
        }
    },
    data () {
        return {

        };
    }
};
</script>
<style lang="less">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  position: relative;
}

.modal-header {
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  padding-right: 20px;
  background: #f4f4f4;
  font-size: 14px;
  color: #333;
  position: relative;
  .close {
    width: 20px;
    position: absolute;
    right: 10px;
    top: 3px;
  }
}
.modal-body {
  margin: 20px 0;
  min-height: 40px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  .icon {
    height: 45px;
    width: 45px;
    &.icon-warning {
      background: url(./warning.png) no-repeat center;
    }
  }
  .slot-body {
    overflow: hidden;
    padding-left: 20px;
    .text {
      color: #333;
      font-size: 18px;
    }
    .sub-text {
      color: #666;
      font-size: 14px;
    }
  }
}

.modal-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  .btn {
    margin-top: 7px;
    height: 28px;
    width: 60px;
    line-height: 28px;
    a {
      padding-left: 5px;
      padding-right: 5px;
      font-size: 14px;
    }
  }
  .slot-footer {
    background: #f4f4f4;
  }
}
/*
 * the following styles are auto-applied to elements with
 * v-transition="modal" when their visiblity is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter, .modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>