<template lang="jade">
modal(:show.sync="show", :css="{width: 480, height: 600}")
  h3.fl(slot="header")
    a 留言记录
  .slot-body.mt-40(slot="body", __vuec__)
    ul.messages.mt-30
      li.mt-30(v-for="message in messages")
        .message-left(v-if="uid !== message.user.id")
          .name.fl {{message.user.name}}：
          .message.fl {{message.message}}
        .message-right.fr(v-if="uid === message.user.id")
          .message.fl {{message.message}}
          .name.fl ：{{message.user.name}}
        .clear
    .leave-message.mt-30
      textarea.fl(v-model="leave_message", placeholder="输入您说的话", @keyup.enter="postComment")
      .btn.fl.ml-20
        a(@click="postComment") 发送留言
  div(slot="footer")
</template>
<script>
import modal from 'src/public/modal/modal';
import constant from 'src/assets/js/constant';
import api from 'src/assets/js/api';
import mixins from 'src/page/mixins';
import $ from 'jquery';


export default {
    mixins: [mixins],
    props: ['aid', 'show'],
    components: {
        modal
    },
    computed: {
        url() {
            if (!this.aid) return;
            return constant.API.APPLY_RECORDS + this.aid + constant.API.ORDER_COMMENTS;
        }
    },
    watch: {
        show(val) {
            val && this.scrollBottom();
        },
        aid() {
            // debugger;
            this.reloadAsyncData();
        }
    },
    asyncData(resolve) {
        setTimeout(function () {
            window.userStat.done(function () {
                this.uid = this.data.id;
                resolve(this);
            });
        }, 200);
        this.fetch().done(function () {
            this.messages = this.data;
            resolve(this);
        });
    },
    methods: {
        fetch() {
            let url = this.url;
            return api.get({
                url
            });
        },
        scrollBottom() {
            $('.messages').scrollTop(10000);
        },
        // 3. 发单人留言
        postComment() {
            let self = this;
            api.post({
                url: this.url,
                data: {
                    message: this.leave_message
                }
            }).done(() => {
                self.reloadAsyncData();
                self.leave_message = '';
                self.scrollBottom();
            });
        }
    },
    data(){
        return {
            uid: '',
            leave_message: '',
            messages: []
        }
    }
};
</script>
<style lang="less">
@import (reference) 'src/assets/css/variables';

.slot-body[__vuec__] {
  .name {
    color: @cyan;
  }
  textarea {
    width: 320px;
  }
}
.messages {
  height: 400px;
  overflow-y: auto;
}
.message {
  border: 1px solid #ccc;
  padding: 15px;
  width: 200px;
  border-radius: 5px;
  &.gray {
    color: #999;
  }
}
</style>
