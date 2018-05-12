<template>
  <div class="a-splitter">

    <div class="swiper-container a-splitter-container" ref="vContainer">
      <div class="swiper-wrapper">
        <div class="swiper-slide swiper-no-swiping" ref="top" v-if="hasTop">
          <slot name="top"/>
        </div>
        <div class="swiper-slide swiper-no-swiping">
          <div class="swiper-container" ref="hContainer">
            <div class="swiper-wrapper">
              <div class="swiper-slide swiper-no-swiping left" ref="left" v-if="hasLeft">
                <slot name="left"/>
              </div>
              <div class="swiper-slide swiper-no-swiping center" ref="center">
                <slot name="content"/>
              </div>
              <div class="swiper-slide swiper-no-swiping right" ref="right" v-if="hasRight">
                <slot name="right"/>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide swiper-no-swiping" ref="bottom" v-if="hasBottom">
          <slot name="bottom"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper/dist/js/swiper.js';

  export default {
    name: "a-splitter",
    props: {
      leftWidth: {
        type: String,
        default: "200px",
        desc: '左侧滑内容宽度'
      },
      rightWidth: {
        type: String,
        default: '200px',
        desc: '右侧滑宽度'
      },
      topHeight: {
        type: String,
        default: "200px",
        desc: '上侧滑高度'
      },
      bottomHeight: {
        type: String,
        default: "200px",
        desc: '下侧滑高度'
      },
      speed: {
        type: Number,
        default: 400,
        desc: '滑动事件(毫秒)'
      }
    },
    data() {
      return {
        hasLeft: false,     //slots中是否存在左侧滑内容
        hasRight: false,    //slots中是否存在右侧滑内容
        hasTop: false,      //slots中是否存在上侧滑内容
        hasBottom: false,   //slots中是否存在下侧滑内容

        hCenterIndex: 0,            //横向页面个数，默认必传content
        vCenterIndex: 0,            //纵向页面个数，默认必传content
      }
    },
    mounted() {
      this._initializeWidth();
      this.hContainer = new Swiper(this.$refs.hContainer, {
        direction: 'horizontal',
        slidesPerView: 'auto',
        noSwiping: true,
      });
      this.vContainer = new Swiper(this.$refs.vContainer, {
        direction: 'vertical',
        slidesPerView: 'auto',
        noSwiping: true,
      });
      this.showCenter();
    },
    created() {
      this.hasLeft = !(this.$slots.left == null);
      this.hasRight = !(this.$slots.right == null);
      this.hasTop = !(this.$slots.top == null);
      this.hasBottom = !(this.$slots.bottom == null);
    },
    methods: {
      showCenter() {
        this.hContainer.slideTo(this.hCenterIndex, this.speed);
        this.vContainer.slideTo(this.vCenterIndex, this.speed);
      },
      showLeft() {
        this.hContainer.slideTo(0, this.speed);
      },
      showRight() {
        this.hContainer.slideTo(2, this.speed);
      },
      showTop() {
        this.vContainer.slideTo(0, this.speed);
      },
      showBottom() {
        this.vContainer.slideTo(2, this.speed);
      },
      _initializeWidth() {
        if (!this.$slots.content) throw new Error("slot name= 'content' 不存在，请检查！");
        if (this.$refs.left) {
          this.hCenterIndex++;
          this.$refs.left.style.width = this.leftWidth;
        }
        if (this.$refs.right) {
          this.$refs.right.style.width = this.rightWidth;
        }
        if (this.$refs.top) {
          this.vCenterIndex++;
          this.$refs.top.style.height = this.topHeight;
        }
        if (this.$refs.bottom) {
          this.$refs.bottom.style.height = this.bottomHeight
        }
      },
    }
  }
</script>

<style scoped lang="stylus">
  .a-splitter {
    .swiper-container {
      $fill-parent();
    }
    $fill-parent();
    .a-splitter-container {
      .left {
      }
      .center {
      }
      .right {
      }
    }
  }
</style>
