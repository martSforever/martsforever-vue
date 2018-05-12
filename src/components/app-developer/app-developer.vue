<template>
  <div class="app-developer">
    <div class="wrapper">
      <div class="swiper-container" ref="swiperContainer">
        <div class="swiper-wrapper">
          <div class="swiper-slide slide1 swiper-no-swiping">Slide 1</div>
          <div class="swiper-slide slide2 swiper-no-swiping">Slide 2</div>
          <div class="swiper-slide slide3 swiper-no-swiping">Slide 3</div>
        </div>
      </div>
    </div>
    <input v-model="currentIndex"/>
    <button @click="slideTo">slideTo</button>
  </div>
</template>

<script>
  import Swiper from 'swiper/dist/js/swiper.js';

  export default {
    name: "app-developer",
    data() {
      return {
        currentIndex: 0
      }
    },
    mounted() {
      this.mySwiper = new Swiper(this.$refs.swiperContainer, {
        direction: 'horizontal',
        slidesPerView: 'auto',
        noSwiping: true,
      })
    },
    methods: {
      slideTo() {
        this.mySwiper.slideTo(this.currentIndex);
      },
    }
  }
</script>

<style scoped lang="stylus">
  .wrapper {
    height 300px
    width 300px
    background-color gray
    display inline-block
    .swiper-container {
      $fill-parent();
      .slide1 {
        width 40%
      }
      .slide2 {
        width 60%
      }
    }
  }


</style>
