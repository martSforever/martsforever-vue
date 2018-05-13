<template>
  <div class="a-scrollbar" ref="scrollbar" @mousemove.prevent="_mousemove" @mouseup="_mouseup" @mouseleave="_mouseleave"
       @mouseenter="_mouseenter">
    <div class="a-scrollbar-content" ref="scrollbarContent" @scroll="_contentVScroll">
      <slot></slot>
    </div>
    <transition name="to-left">
      <div class="a-scrollbar-h" ref="vScrollbar" v-show="showScrollBar">
        <div class="a-scroll-bar-h-indicator" ref="vIndicator" @mousedown.prevent="_vIndicatorMouseDown"></div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {oneOf, removePx} from "../../script/utils";

  export default {
    props: {
      data: {},
      autoHide: {
        type: Boolean,
        default: true
      },
      scrollBarColor: {
        type: String,
        default: '#000',
        desc: '滚动条背景色'
      },
      scrollBarSize: {
        type: Number,
        default: 5,
        desc: '如果是横向，就是滚动条高度，如果是纵向，就是滚动条宽度'
      },
      scrollbarRadius: {
        type: Number,
        default: 12,
        desc: '滚条圆角'
      },
      indicatorColor: {
        type: String,
        default: '#e03636',
        desc: '指示器颜色'
      },
      direction: {
        type: String,
        default: 'vertical',
        desc: '滚动条方向',
        validator(value) {
          return oneOf(value, ['vertical', 'horizontal']);
        },
      }
    },
    name: "a-scrollbar",
    data() {
      return {
        vTouch: {},
        showScrollBar: false
      }
    },
    mounted() {
      this._initialize();
    },
    watch: {
      data(newVal, oldVal) {
        this._initialize();
      }
    },
    methods: {
      update() {
        this._initialize();
      },
      _initialize() {
        this.$nextTick(function () {
          if (this.direction === 'horizontal') {
            this._initializeHScrollbar();
          } else {
            this._initializeVScrollbar();
          }
        });
      },
      _initializeHScrollbar() {
      },
      _initializeVScrollbar() {
        this.$refs.scrollbarContent.style.width = `${this.$refs.scrollbar.offsetWidth + 17}px`;
        this.$refs.vScrollbar.style.backgroundColor = this.scrollBarColor;
        this.$refs.vScrollbar.style.width = `${this.scrollBarSize}px`;
        this.$refs.vScrollbar.style.borderRadius = `${this.scrollbarRadius}px`;

        this.$refs.vIndicator.style.height = `${this._calculateVIndicatorSize()}px`;
        this.$refs.vIndicator.style.backgroundColor = this.indicatorColor;
        this.$refs.vIndicator.style.borderRadius = `${this.scrollbarRadius}px`;
      },
      _calculateHIndicatorSize() {

      },
      _calculateVIndicatorSize() {
        let showHeight = this.$refs.scrollbarContent.offsetHeight;
        let actualHeight = this.$refs.scrollbarContent.scrollHeight;
        let ret = showHeight * showHeight / actualHeight;
        return ret;
      },
      _contentVScroll(e) {
        let contentScrollTop = this.$refs.scrollbarContent.scrollTop;
        let scrollBarScrollTop = (contentScrollTop / this.$refs.scrollbarContent.scrollHeight) * this.$refs.scrollbarContent.offsetHeight;
        this.$refs.vIndicator.style.top = `${scrollBarScrollTop}px`;
      },
      _vIndicatorMouseDown(e) {
        this.vTouch.initialized = true;
        this.vTouch.startX = e.clientX;
        this.vTouch.startY = e.clientY;
        this.vTouch.startTop = removePx(this.$refs.vIndicator.style.top);
        this.vTouch.maxTop = this.$refs.vScrollbar.offsetHeight - this.$refs.vIndicator.offsetHeight;
      },
      _mousemove(e) {
        if (!this.vTouch.initialized) return;
        const deltaX = e.clientX - this.vTouch.startX;
        const deltaY = e.clientY - this.vTouch.startY;
        /*指示器滚动*/
        let indicatorResultTop = Math.min(Math.max(this.vTouch.startTop + deltaY, 0), this.vTouch.maxTop);
        this.$refs.vIndicator.style.top = `${indicatorResultTop}px`;
        /*内容滚动*/
        let scrollContentResultTop = (removePx(indicatorResultTop) / this.$refs.vIndicator.offsetHeight) * this.$refs.vScrollbar.scrollHeight;
        this.$refs.scrollbarContent.scrollTop = `${scrollContentResultTop}`;
      },
      _mouseup(e) {
        this.vTouch.initialized = false;
      },
      _mouseenter() {
        this.autoHide && (this.showScrollBar = true);
      },
      _mouseleave() {
        this.vTouch.initialized = false;
        this.autoHide && (this.showScrollBar = false);
      },
    }
  }
</script>

<style scoped lang="stylus">
  .a-scrollbar {
    overflow-x hidden
    position relative
    overflow-y hidden
    &, & .a-scrollbar-content {
      $fill-parent();
    }
    .a-scrollbar-content {
      overflow-y auto
    }
    .a-scrollbar-h {
      position absolute
      right 0
      top: 0
      height 100%
      .a-scroll-bar-h-indicator {
        width 100%
        position relative
        $prefix(box-shadow, 0 0 8px $font-color-red);
      }
    }
  }
</style>
