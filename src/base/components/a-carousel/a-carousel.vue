<template>
  <div class="a-carousel-wrapper" ref="wrapper" :style="wrapperStyles">
    <div class="a-carousel" ref="carousel" @mousedown="_touchStart">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import {hasClass, prefixStyle} from "../../script/dom";
  import {oneOf} from "../../script/utils";

  export default {
    name: "a-carousel",
    props: {
      width: {
        type: [String, Number],
        default: '100%',
        desc: '滑动容器的宽度，默认占满父元素'
      },
      height: {
        type: [String, Number],
        default: '100%',
        desc: '滑动容器的高度，默认占满父元素'
      },
      itemWidth: {
        type: [String, Number],
        desc: '滑动容器中每一个子元素的宽度'
      },
      swipeable: {
        type: [String, Boolean],
        default: true,
        validator(val) {
          return oneOf(val, [true, false, 'Y', 'N'])
        },
      },
    },
    data() {
      return {
        transition: prefixStyle('transition'),      //css兼容性属性：transition
        transform: prefixStyle('transform'),        //css兼容性属性：transform
        touch: {},                                  //保存拖动过程中的一些数据},
        totalWidth: 0,                              //所有子元素宽度
        maxCarouselLeft: 0                          //最大左偏移距离
      }
    },
    created() {
      this.touch.activeIndex = 0;                   //当前激活的index，每个子元素宽度不一致，显示最后一个元素的时候，index就是最后一个，index从0开始计算
      this.touch.carouselLeft = 0;                  //当前左偏移
      this.touch.itemLefts = [];                    //子元素左边界距离距离
    },
    mounted() {
      this._initializedItemStyle();
      document.addEventListener('mouseup', this._touchend);
      document.addEventListener('mousemove', this._touchmove);
    },
    methods: {
      _initializedItemStyle() {
        let nodes = this.$refs.carousel.childNodes;
        let children = [];
        for (let i = 0; i < nodes.length; i++) {
          let node = nodes[i];
          if (node.classList && hasClass('a-carousel-item', node.classList)) {
            children.push(node);
          }
        }
        for (let i = 0; i < children.length; i++) {
          let child = children[i];
          child.style.width = this.itemStyles.width;
          child.style.height = this.itemStyles.height;
          this.totalWidth += child.offsetWidth;
          /*第一个元素距离左边界是0，随后每一个子元素距离左边界是它的上一个元素的左边界距离加上上一个元素的宽度*/
          if (i === 0) {
            this.touch.itemLefts.push(0);
          } else {
            this.touch.itemLefts.push(this.touch.itemLefts[i - 1] + children[i - 1].offsetWidth);
          }
        }
        this.maxCarouselLeft = -(this.totalWidth - this.$refs.carousel.offsetWidth);
      },
      scrollTo(index) {
        if (index < 0) throw new Error("index不能小于0！");
        if (index > this.touch.itemLefts.length - 1) throw new Error("index大于子元素个数-1");

        let offsetLeft = -(this.touch.itemLefts[index]);
        offsetLeft = Math.min(Math.max(this.maxCarouselLeft, offsetLeft), 0);
        this.touch.activeIndex = index;
        this.touch.carouselLeft = offsetLeft;
        this.$refs.carousel.style[this.transition] = 'all 0.3s';
        this.$refs.carousel.style[this.transform] = `translate3d(${offsetLeft}px,0,0)`;
      },
      getActiveIndex() {
        return this.touch.activeIndex;
      },
      /*松开手指时，根据水平距离以及滑动的距离判断那个子元素应该回到左边界*/
      _getNextIndex(left) {
        let compareLeft = -left;
        for (let i = 0; i < this.touch.itemLefts.length; i++) {
          let left1 = this.touch.itemLefts[i];
          let left2 = this.touch.itemLefts[i + 1];
          if (left1 <= compareLeft && compareLeft <= left2) {
            let mid = (left2 - left1) / 2 + left1;
            return compareLeft > mid ? i + 1 : i;
          }
        }
      },
      _touchStart(e) {
        if (!(this.swipeable === true || this.swipeable === 'Y')) return;
        this.touch.initialized = true;
        this.touch.startX = e.clientX;
        this.touch.startY = e.clientY;
      },
      _touchmove(e) {
        if (!(this.swipeable === true || this.swipeable === 'Y')) return;
        if (!this.touch.initialized) return;
        let deltaX = e.clientX - this.touch.startX;
        let offsetLeft = this.touch.carouselLeft + deltaX;
        this.$refs.carousel.style[this.transition] = '';
        this.$refs.carousel.style[this.transform] = `translate3d(${offsetLeft}px,0,0)`;
      },
      _touchend(e) {
        if (!(this.swipeable === true || this.swipeable === 'Y')) return;
        if (!this.touch.initialized) return;
        let deltaX = e.clientX - this.touch.startX;
        let offsetLeft = this.touch.carouselLeft + deltaX;
        let activeIndex;
        /*判断是否是需要显示最后一个元素，因为每一个元素的宽度可能不相等，_getNextIndex得到的是左边显示的元素，不加判断的话，会导致最后一个元素显示不全*/
        if (offsetLeft <= this.maxCarouselLeft) {
          offsetLeft = this.maxCarouselLeft;
          activeIndex = this.touch.itemLefts.length - 1;
        } else {
          offsetLeft = Math.min(Math.max(this.maxCarouselLeft, offsetLeft), 0);
          activeIndex = this._getNextIndex(offsetLeft);
          offsetLeft = -this.touch.itemLefts[activeIndex];
        }
        this.touch.activeIndex = activeIndex;
        this.touch.carouselLeft = offsetLeft;
        this.$refs.carousel.style[this.transition] = 'all 0.3s';
        this.$refs.carousel.style[this.transform] = `translate3d(${offsetLeft}px,0,0)`;
        this.touch.initialized = false;
      },
    },
    computed: {
      wrapperStyles() {
        let suffixWidth = this.width instanceof Number ? 'px' : '';
        let suffixHeight = this.height instanceof Number ? 'px' : '';
        return {
          width: `${this.width}${suffixWidth}`,
          height: `${this.height}${suffixHeight}`
        }
      },
      itemStyles() {
        let suffixWidth = this.itemWidth instanceof Number ? 'px' : '';
        let styles = {height: '100%'};
        (!!this.itemWidth) && (styles.width = `${this.itemWidth}${suffixWidth}`);
        return styles;
      },
    }
  }
</script>

<style scoped lang="scss">
  .a-carousel-wrapper {
    display: inline-block;
    overflow-x: hidden;
    .a-carousel {
      height: 100%;
      width: 100%;
      white-space: nowrap;

      .a-carousel-item {
        display: inline-block;
        vertical-align: top;
        width: 100%;
      }
    }
  }
</style>
