<template>
  <div class="a-scrollbar" ref="scrollbar">
    <div class="a-scrollbar-content" ref="scrollbarContent" @scroll="_onContentVScroll">
      <a-button @click="log">log</a-button>
      <slot></slot>
    </div>
    <div class="a-scrollbar-h" ref="vScrollbar">
      <div class="a-scroll-bar-h-indicator" ref="vIndicator"></div>
    </div>
  </div>
</template>

<script>
  import {removePx} from "../../script/utils";
  import {watchDomChildList} from "../../script/watch";
  import AButton from "../a-button/a-button";

  export default {
    components: {AButton},
    props: {
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
    computed: {},
    methods: {
      log() {
        console.dir(this.$refs.scrollbarContent.scrollHeight);
      },
      update() {
        console.log('update');
        this._updateVSize();
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
        // console.log('_initializeVScrollbar');
        this._updateVSize();
        this._watchContentSize();
        this.$refs.vIndicator.addEventListener('mousedown', this._onVIndicatorMouseDown);
        document.addEventListener('mousemove', this._onMousemove);
        document.addEventListener('mouseup', this._onMouseup);
      },
      /*更新纵向滚动条高度*/
      _updateVSize() {
        this.$refs.scrollbarContent.style.width = `${this.$refs.scrollbar.offsetWidth + 17}px`;
        this.$refs.vScrollbar.style.backgroundColor = this.scrollBarColor;
        this.$refs.vScrollbar.style.width = `${this.scrollBarSize}px`;
        this.$refs.vScrollbar.style.top = `${this.scrollBarSize}px`;
        this.$refs.vScrollbar.style.bottom = `${this.scrollBarSize}px`;


        this.$refs.vScrollbar.style.borderRadius = `${this.scrollbarRadius}px`;

        this.$refs.vIndicator.style.height = `${this._calculateVIndicatorSize()}px`;
        this.$refs.vIndicator.style.backgroundColor = this.indicatorColor;
        this.$refs.vIndicator.style.borderRadius = `${this.scrollbarRadius}px`;
      },
      /*计算纵向滚动条指示器高度*/
      _calculateVIndicatorSize() {
        if (!this.$refs.scrollbarContent) return 0;
        let contentOffsetHeight = this.$refs.scrollbarContent.offsetHeight;
        let contentScrollHeight = this.$refs.scrollbarContent.scrollHeight;
        let scrollbarOffsetHeight = this.$refs.vScrollbar.offsetHeight;
        return scrollbarOffsetHeight * contentOffsetHeight / contentScrollHeight;
      },
      /*纵向滚动触发事件*/
      _onContentVScroll(e) {
        let contentScrollTop = this.$refs.scrollbarContent.scrollTop;
        let scrollBarScrollTop = (contentScrollTop / this.$refs.scrollbarContent.scrollHeight) * this.$refs.vScrollbar.offsetHeight;
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
        let scrollContentResultTop = (indicatorResultTop / this.$refs.vScrollbar.scrollHeight) * this.$refs.scrollbarContent.scrollHeight;
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
      _watchContentSize() {
        /*检测内容dom子节点变化，当变化完时，更新滚动条高度*/
        this.observe = watchDomChildList(this.$refs.scrollbarContent, (mutations) => {
          this.update();
        });
      },
    },
    beforeDestroy() {
      /*纵向滚动事件清除*/
      // console.log('beforeDestroy');
      this.$refs.vIndicator.removeEventListener('mousedown', this._onVIndicatorMouseDown);
      document.removeEventListener('mousemove', this._onMousemove);
      document.removeEventListener('mouseup', this._onMouseup);
      this.observe.disconnect();
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
      .a-scroll-bar-h-indicator {
        width: 100%;
        position: relative;
        box-shadow: 0 0 8px $text-color-main;
      }
    }
  }
</style>
