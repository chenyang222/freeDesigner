<template lang="jade">
.wrap(__vuec__, v-if="count > 1")
  .paginator.container
    ul
      li.prevAll(@click="prevAll", :class="{disabled: isFirst}")
        a 首页
      li.prevOne.ml-10(@click="prevOne | debounce 150", :class="{disabled: isFirst}")
        a 上一页
      li.preEllipsis.ml-10(v-show="showPreEllipsis", @click="prevCountNumber")
        a ...
      li.ml-10(v-for="(index, item) in loopCount",
          :class="{active: this.page === item}")
          a(@click="this.page = item") {{item}}
      li.nextEllipsis.ml-10(v-show="showNextEllipsis", @click="nextCountNumber")
        a ...
      li.nextOne.ml-10(@click="nextOne | debounce 150", :class="{disabled: isLast}")
        a 下一页
      li.nextAll.ml-10(@click="nextAll", :class="{disabled: isLast}")
        a 尾页
</template>
<script>
export default {
    // info parameters [total_count, per_page, page]
    props: ['info', 'size'],
    created() {
        if (!this.info) {
            this.info = {
                page: 1
            };
        }
    },
    computed: {
        // 分页组的数目
        showCountNumber() {
            return Math.ceil(this.count / this.maxsize);
        },
        // 分页组的起始页
        startCount() {
            if (!this.countNumber) return;
            let number = this.countNumber - 1;
            let count = number * this.maxsize + 1;
            return count;
        },
        // 分页组的结束页
        endCount() {
            if (!this.countNumber) return;
            let count = this.countNumber * this.maxsize;
            count = count > this.count ? this.count : count;
            return count;
        },
        // 分页组循环的数组
        loopCount() {
            if (!this.startCount && !this.endCount) return;
            let list = [];
            for (let i = this.startCount; i <= this.endCount; i++) {
                list.push(i);
            }
            return list;
        },
        // 是否显示前省略
        showPreEllipsis() {
            // 当前页大于显示的页数
            return this.page > this.maxsize;
        },
        // 是否显示后省略
        showNextEllipsis() {
            // 当前页不在最后一页
            return this.endCount < this.count;
        },
        // 是否是第一页
        isFirst() {
            return this.page === 1;
        },
        // 是否是最后一页
        isLast() {
            return this.page >= this.count;
        }
    },
    watch: {
        page(val, oldVal) {
            this.dispatchChangePageEvent();
        },
        info(info) {
            if (!info) return;
            let page = parseInt(info.page, 10);
            let totalCount = info.total_count;
            let perPage = info.per_page;
            // count is 当前分页的数目
            let count = Math.ceil(totalCount / perPage);
            let number = Math.ceil(this.page / this.maxsize);
            this.page = page;
            this.countNumber = number;
            this.count = count;
        }
    },
    methods: {
        // 重新fetch当前页面数据
        dispatchChangePageEvent() {
            this.$dispatch('changePage', this.page);
        },
        // 到第一页
        prevAll() {
            if (this.page === 1) {
                return;
            }
            this.countNumber = 1;
            this.page = 1;
        },
        // 上一页
        prevOne(e) {
            if (this.page !== 1) {
                let page = --this.page;
                this.page = page;
                // 假如上一页到了上一个分组
                if (page < this.startCount) {
                    this.countNumber--;
                }
                return;
            }
        },
        // 跳到上一个分页组
        prevCountNumber() {
            if (this.countNumber > 1) {
                this.countNumber--;
                let page = this.page - this.maxsize;
                this.page = page < 1 ? 1 : page;
            }
        },
        // 跳到下一个分页组
        nextCountNumber() {
            if (this.countNumber < this.showCountNumber) {
                this.countNumber++;
                let page = this.page + this.maxsize;
                this.page = page > this.count ? this.count : page;
            }
        },
        // 下一页
        nextOne(e) {
            if (this.page < this.count) {
                let page = ++this.page;
                this.page = page;
                // 假如下一页到了下一个分组
                if (page > this.endCount) {
                    this.countNumber++;
                }
                return;
            }
        },
        // 最后一页
        nextAll() {
            if (this.page >= this.count) {
                return;
            }
            this.countNumber = this.showCountNumber;
            this.page = this.count;
        }
    },
    data() {
        let maxsize = this.size || 8;
        return {
            countNumber: 0,
            page: 1,
            maxsize: maxsize,
            count: 0
        };
    }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import (reference) 'src/assets/css/variables';
.wrap[__vuec__] {
  height: 40px;
  line-height: 40px;
  .paginator {
      font-size: 16px;
      .disabled a {
        color: @disabled;
        &:hover {
          color: @disabled;
        }
      }
      a {
          cursor: pointer;
      }
      ul {
        display: block;
        margin: auto;
        width: 360px;
      }
      li {
          float: left;
          &.active a {
            color: @blue-normal;
          }
      }
  }
}
</style>
