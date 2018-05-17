<template>
  <div class="a-scrollbar" ref="scrollbar">
    <div class="a-scrollbar-content" ref="scrollbarContent" @scroll="_onContentVScroll">
      <slot></slot>
    </div>
    <div class="a-scrollbar-h" ref="vScrollbar">
      <div class="a-scroll-bar-h-indicator" ref="vIndicator"></div>
    </div>
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
    computed: {},
    methods: {
      update() {
        this._initialize();
      },
      _initialize() {
        this.$nextTick(function () {
          this._initializeHScrollbar();
          this._initializeVScrollbar();
        });
      },
      _initializeHScrollbar() {
      },
      /*初始化纵向滚动条*/
      _initializeVScrollbar() {
        this.$refs.scrollbarContent.style.width = `${this.$refs.scrollbar.offsetWidth + 17}px`;
        this.$refs.vScrollbar.style.backgroundColor = this.scrollBarColor;
        this.$refs.vScrollbar.style.width = `${this.scrollBarSize}px`;
        this.$refs.vScrollbar.style.borderRadius = `${this.scrollbarRadius}px`;

        this.$refs.vIndicator.style.height = `${this._calculateVIndicatorSize()}px`;
        this.$refs.vIndicator.style.backgroundColor = this.indicatorColor;
        this.$refs.vIndicator.style.borderRadius = `${this.scrollbarRadius}px`;

        this.$refs.vIndicator.addEventListener('mousedown', this._onVIndicatorMouseDown);
        document.addEventListener('mousemove', this._onMousemove);
        document.addEventListener('mouseup', this._onMouseup);
      },
      _calculateHIndicatorSize() {

      },
      /*计算纵向滚动条指示器高度*/
      _calculateVIndicatorSize() {
        if (!this.$refs.scrollbarContent) return 0;
        let showHeight = this.$refs.scrollbarContent.offsetHeight;
        let actualHeight = this.$refs.scrollbarContent.scrollHeight;
        let ret = showHeight * showHeight / actualHeight;
        return ret;
      },

      /*纵向滚动触发事件*/
      _onContentVScroll(e) {
        let contentScrollTop = this.$refs.scrollbarContent.scrollTop;
        let scrollBarScrollTop = (contentScrollTop / this.$refs.scrollbarContent.scrollHeight) * this.$refs.scrollbarContent.offsetHeight;
        this.$refs.vIndicator.style.top = `${scrollBarScrollTop}px`;
      },
      /*纵向指示器点击开始*/
      _onVIndicatorMouseDown(e) {
        e.preventDefault();
        this.vTouch.initialized = true;
        this.vTouch.startX = e.clientX;
        this.vTouch.startY = e.clientY;
        this.vTouch.startTop = removePx(this.$refs.vIndicator.style.top);
        this.vTouch.maxTop = this.$refs.vScrollbar.offsetHeight - this.$refs.vIndicator.offsetHeight;
      },
      /*纵向指示器点击移动*/
      _onMousemove(e) {
        e.preventDefault();
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
      /*纵向指示器点击结束*/
      _onMouseup(e) {
        this.vTouch.initialized = false;
      },
      _onMouseenter() {
        this.autoHide && (this.showScrollBar = true);
      },
      _onMouseleave() {
        this.vTouch.initialized = false;
        this.autoHide && (this.showScrollBar = false);
      },
    },
    beforeDestroy() {
      this.$refs.vIndicator.removeEventListener('mousedown', this._onVIndicatorMouseDown);
      document.removeEventListener('mousemove', this._onMousemove);
      document.removeEventListener('mouseup', this._onMouseup);
    },
  }
</script>

<style scoped lang="scss">
  .a-scrollbar {
    overflow-x: hidden;
    position: relative;
    overflow-y: hidden;
    &, & .a-scrollbar-content {
      @include fill-parent;
    }
    .a-scrollbar-content {
      overflow-y: auto;
    }
    .a-scrollbar-h {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      .a-scroll-bar-h-indicator {
        width: 100%;
        position: relative;
        box-shadow: 0 0 8px $text-color-main;
      }
    }
  }
</style>
