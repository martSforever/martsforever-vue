<template>
  <div class="a-scrollbar" ref="scrollbarWrapper">
    <div class="a-scrollbar-content" ref="scrollbarContent" @scroll="_onScroll">
      <a-button @click="log">log</a-button>
      <slot></slot>
    </div>
    <div class="a-scrollbar-v" ref="vScrollbar" v-show="vShowScrollbar">
      <div class="a-scroll-bar-v-indicator" ref="vIndicator"></div>
    </div>
    <div class="a-scrollbar-h" ref="hScrollbar">
      <div class="a-scroll-bar-h-indicator" ref="hIndicator"></div>
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
        default: 'rgba(0,0,0,0.5)',
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
        vTouch: {},                   //纵向滚动时，用来存储一些数据的对象
        hTouch: {},                   //横向滚动时，用来存储一些数据的对象
        vShowScrollbar: false,        //纵向滚动条是否显示
        hShowScrollbar: true,         //横向滚动条是否显示
      }
    },
    mounted() {
      this._initialize();
    },
    computed: {},
    methods: {
      log() {
        console.dir(this.$refs.scrollbarContent);
      },
      update() {
        console.log('update');
        this._vUpdateSize();
        this._hUpdateSize();
      },
      _initialize() {
        this.$nextTick(function () {
          this._watchContentSize();
          this._hInitializeScrollbar();
          this._vInitializeScrollbar();
          document.addEventListener('mousemove', this._onMousemove);
          document.addEventListener('mouseup', this._onMouseup);
          this._vUpdateSize();
          this._hUpdateSize();
        });
      },
      /*初始化纵向滚动条*/
      _vInitializeScrollbar() {
        /*内容宽度增加17个像素，把滚动条隐藏*/
        this.$refs.scrollbarContent.style.width = `${this.$refs.scrollbarWrapper.offsetWidth + 17}px`;
        /*滚动条背景色，宽高位置，圆角设置*/
        this.$refs.vScrollbar.style.backgroundColor = this.scrollBarColor;
        this.$refs.vScrollbar.style.width = `${this.scrollBarSize}px`;
        this.$refs.vScrollbar.style.top = `${this.scrollBarSize}px`;
        this.$refs.vScrollbar.style.bottom = `${this.scrollBarSize}px`;
        this.$refs.vScrollbar.style.borderRadius = `${this.scrollbarRadius}px`;
        /*滚动条指示器设置*/
        this.$refs.vIndicator.style.backgroundColor = this.indicatorColor;
        this.$refs.vIndicator.style.borderRadius = `${this.scrollbarRadius}px`;
        this.$refs.vIndicator.addEventListener('mousedown', this._vOnIndicatorMouseDown);
      },
      /*更新纵向滚动条高度*/
      _vUpdateSize() {
        this.$refs.vIndicator.style.height = `${this._vCalculateIndicatorSize()}px`;
      },
      /*计算纵向滚动条指示器高度*/
      _vCalculateIndicatorSize() {
        /*内容咩有初始化的时候，直接返回0*/
        if (!this.$refs.scrollbarContent) {
          this.vShowScrollbar = false;
          return 0;
        }
        /*内容可视高度*/
        let contentOffsetHeight = this.$refs.scrollbarContent.offsetHeight - 17;
        /*内容滚动实际高度*/
        let contentScrollHeight = this.$refs.scrollbarContent.scrollHeight;
        console.log('contentOffsetHeight', contentOffsetHeight);
        console.log('contentScrollHeight', contentScrollHeight);

        /*当内容滚动高度与可视高度相等时（内容高度不足容器显示高度），不显示滚动条*/
        this.vShowScrollbar = !(contentScrollHeight === contentOffsetHeight);

        /*滚动条高度*/
        //貌似是因为用了v-show控制滚动条显隐，导致滚动条第一次显示的时候，获取得到的offsetHeight一直都是0，这里
        //换一种方法，通过内容可视高度减去滚动条宽度来获取滚动条高度，因为可能会存在纵向滚动条以及横向滚动条，所以纵向滚动条的上下部都会缩短滚动条宽度的距离，横向滚动条也一样，缩短一些距离
        // let scrollbarOffsetHeight = this.$refs.vScrollbar.offsetHeight;
        let scrollbarOffsetHeight = (this.$refs.scrollbarContent.offsetHeight) - (2 * this.scrollBarSize);
        /*指示器高度*/
        let indicatorHeight = scrollbarOffsetHeight * contentOffsetHeight / contentScrollHeight;
        console.log('scrollbarOffsetHeight', scrollbarOffsetHeight);
        console.log('indicatorHeight', indicatorHeight);
        return indicatorHeight;
      },
      /*纵向滚动触发事件*/
      _vOnContentScroll(e) {
        /*内容滚动位置*/
        let contentScrollTop = this.$refs.scrollbarContent.scrollTop;
        let scrollBarScrollTop = (contentScrollTop / (this.$refs.scrollbarContent.scrollHeight - this.$refs.scrollbarContent.offsetHeight + 17)) * (this.$refs.vScrollbar.offsetHeight - this.$refs.vIndicator.offsetHeight);
        this.$refs.vIndicator.style.top = `${scrollBarScrollTop}px`;
      },
      /*纵向指示器点击开始*/
      _vOnIndicatorMouseDown(e) {
        e.preventDefault();
        this.vTouch.initialized = true;
        this.vTouch.startX = e.clientX;
        this.vTouch.startY = e.clientY;
        this.vTouch.startTop = removePx(this.$refs.vIndicator.style.top);
        /*内容滚动高度最大为：内容滚动高度减去内容可视高度，同理滚动条的滚动高度也是一样*/
        this.vTouch.maxTop = this.$refs.vScrollbar.offsetHeight - this.$refs.vIndicator.offsetHeight;
      },
      _vOnIndicatorMove(e) {
        /*纵向指示器点击移动*/
        if (!!this.vTouch.initialized) {
          const deltaY = e.clientY - this.vTouch.startY;
          /*指示器滚动*/
          let indicatorResultTop = Math.min(Math.max(this.vTouch.startTop + deltaY, 0), this.vTouch.maxTop);
          this.$refs.vIndicator.style.top = `${indicatorResultTop}px`;
          /*内容滚动*/
          let scrollContentResultTop = (indicatorResultTop / (this.$refs.vScrollbar.offsetHeight - this.$refs.vIndicator.offsetHeight)) * (this.$refs.scrollbarContent.scrollHeight - this.$refs.scrollbarContent.offsetHeight + 17);
          this.$refs.scrollbarContent.scrollTop = `${scrollContentResultTop}`;
        }
      },

      _hInitializeScrollbar() {
        /*内容宽度增加17个像素，把横向滚动条隐藏*/
        this.$refs.scrollbarContent.style.height = `${this.$refs.scrollbarWrapper.offsetHeight + 17}px`;
        /*滚动条背景色，宽高位置，圆角设置*/
        this.$refs.hScrollbar.style.backgroundColor = this.scrollBarColor;
        this.$refs.hScrollbar.style.height = `${this.scrollBarSize}px`;
        this.$refs.hScrollbar.style.left = `${this.scrollBarSize}px`;
        this.$refs.hScrollbar.style.right = `${this.scrollBarSize}px`;
        this.$refs.hScrollbar.style.borderRadius = `${this.scrollbarRadius}px`;
        /*滚动条指示器设置*/
        this.$refs.hIndicator.style.backgroundColor = this.indicatorColor;
        this.$refs.hIndicator.style.borderRadius = `${this.scrollbarRadius}px`;
        this.$refs.hIndicator.addEventListener('mousedown', this._hOnIndicatorMouseDown);
      },
      _hUpdateSize() {
        this.$refs.hIndicator.style.width = `${this._hCalculateIndicatorSize()}px`;
      },
      _hCalculateIndicatorSize() {
        /*内容咩有初始化的时候，直接返回0*/
        if (!this.$refs.scrollbarContent) {
          this.hShowScrollbar = false;
          return 0;
        }
        /*内容可视宽度度*/
        let contentOffsetWidth = this.$refs.scrollbarContent.offsetWidth - 17;
        /*内容滚动实际高度*/
        let contentScrollWidth = this.$refs.scrollbarContent.scrollWidth;
        /*当内容滚动高度与可视高度相等时（内容高度不足容器显示高度），不显示滚动条*/
        this.hShowScrollbar = !(contentScrollWidth === contentOffsetWidth);
        /*滚动条长度*/
        //貌似是因为用了v-show控制滚动条显隐，导致滚动条第一次显示的时候，获取得到的offsetWidth一直都是0，这里
        //换一种方法，通过内容可视宽度减去滚动条大小（这里是高度）来获取滚动条长度，因为可能会存在纵向滚动条以及横向滚动条，所以纵向滚动条的上下部都会缩短滚动条宽度的距离，横向滚动条也一样，缩短一些距离
        // let scrollbarOffsetHeight = this.$refs.vScrollbar.offsetHeight;
        let scrollbarOffsetWdith = this.$refs.scrollbarContent.offsetWidth - (2 * this.scrollBarSize);
        /*指示器宽度*/
        let indicatorWidth = scrollbarOffsetWdith * contentOffsetWidth / contentScrollWidth;
        return indicatorWidth;
      },
      /*横向滚动触发事件*/
      _hOnContentScroll(e) {
        /*内容滚动位置*/
        let contentScrollLeft = this.$refs.scrollbarContent.scrollLeft;
        /*指示器滚动位置*/
        let scrollBarScrollLeft = (contentScrollLeft / (this.$refs.scrollbarContent.scrollWidth - this.$refs.scrollbarContent.offsetWidth + 17)) * (this.$refs.hScrollbar.offsetWidth - this.$refs.hIndicator.offsetWidth);
        // console.log(this.$refs.scrollbarContent.scrollWidth, this.$refs.scrollbarContent.scrollLeft, this.$refs.scrollbarContent.offsetWidth);
        this.$refs.hIndicator.style.left = `${scrollBarScrollLeft}px`;
      },
      /*纵向指示器点击开始*/
      _hOnIndicatorMouseDown(e) {
        e.preventDefault();
        this.hTouch.initialized = true;
        this.hTouch.startX = e.clientX;
        this.hTouch.startY = e.clientY;
        this.hTouch.startLeft = removePx(this.$refs.hIndicator.style.left);
        /*内容滚动宽度最大为：内容滚动宽度减去内容可视宽度，同理滚动条的滚动宽度也是一样*/
        this.hTouch.maxLeft = this.$refs.hScrollbar.offsetWidth - this.$refs.hIndicator.offsetWidth;
      },
      _hOnIndicatorMove(e) {
        /*横向指示器移动*/
        if (!!this.hTouch.initialized) {
          const deltaX = e.clientX - this.hTouch.startX;
          /*指示器滚动*/
          let indicatorResultLeft = Math.min(Math.max(this.hTouch.startLeft + deltaX, 0), this.hTouch.maxLeft);
          this.$refs.hIndicator.style.left = `${indicatorResultLeft}px`;
          /*内容滚动*/
          let scrollContentResultLeft = (indicatorResultLeft / (this.$refs.hScrollbar.offsetWidth - this.$refs.hIndicator.offsetWidth)) * (this.$refs.scrollbarContent.scrollWidth - this.$refs.scrollbarContent.offsetWidth + 17);
          this.$refs.scrollbarContent.scrollLeft = `${scrollContentResultLeft}`;
        }
      },

      _onScroll(e) {
        this._vOnContentScroll(e);
        this._hOnContentScroll(e);
      },
      _onMousemove(e) {
        e.preventDefault();
        this._vOnIndicatorMove(e);
        this._hOnIndicatorMove(e);
      },
      /*纵向指示器点击结束*/
      _onMouseup(e) {
        this.vTouch.initialized = false;
        this.hTouch.initialized = false;
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
      this.$refs.vIndicator.removeEventListener('mousedown', this._vOnIndicatorMouseDown);
      this.$refs.hIndicator.removeEventListener('mousedown', this._hOnIndicatorMouseDown);
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
      overflow-y: scroll;

      overflow-x: scroll;
      white-space: nowrap;
    }
    .a-scrollbar-v {
      position: absolute;
      right: 0;
      .a-scroll-bar-v-indicator {
        position: relative;
        cursor: pointer;
        width: 100%;
      }
    }
    .a-scrollbar-h {
      position: absolute;
      bottom: 0;
      .a-scroll-bar-h-indicator {
        position: relative;
        cursor: pointer;
        height: 100%;
      }
    }
  }
</style>
