<template>
  <div class="a-tabs">
    <div class="a-tabs-head-wrapper">
      <a-tabs-head :labels="tabLabels" @change="_handleChangeLabel"/>
    </div>
    <div class="a-tabs-content-wrapper">
      <a-carousel
        ref="carousel"
        :swipeable="false"
        height="100%">
        <a-carousel-item classes="item-cls"
                         v-for="(item,index) in list"
                         :styles="{backgroundColor:item.color}"
                         :key="index">
          <div>{{item.name}}--{{index}}</div>
        </a-carousel-item>
      </a-carousel>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ATabsHead from "./a-tabs-head";
  import ACarousel from "../a-carousel/a-carousel";
  import ACarouselItem from "../a-carousel/a-carousel-item";

  export default {
    name: "a-tabs",
    components: {ACarouselItem, ACarousel, ATabsHead},
    data() {
      return {
        vueComponents: [],

        list: [
          {name: 'input', color: '#abf', width: '100px', initialized: false},
          {name: 'button', color: '#ff7261', width: '200px', initialized: false},
          {name: 'textarea', color: '#598dff', width: '300px', initialized: false},
          {name: 'hello', color: '#4effbc', width: '200px', initialized: false},
          {name: 'balbala', color: '#ff24ad', width: '200px', initialized: false},
        ],
      }
    },
    methods: {
      addTab(component) {
        let instance = new Vue(component)
        const vueComponent = instance.$mount()
        console.log(vueComponent)
        this.vueComponents.push(vueComponent)
        this.$refs.content.appendChild(vueComponent.$el)
      },
      removeTab() {
        let vc = this.vueComponents.pop()
        this.$refs.content.removeChild(vc.$el)
        vc.$destroy()
      },

      _handleChangeLabel({item, index}) {
        this.$refs.carousel.scrollTo(index)
      },
    },
    computed: {
      tabLabels() {
        return [
          '西红柿', '牙膏', '烙饼', '杂酱面', '烧烤摊'
        ]
      },
    }
  }
</script>

<style lang="scss">
  .a-tabs {
    text-align: left;
    position: relative;
    height: 100%;
    width: 100%;
    .a-tabs-head-wrapper {
      height: 44px;
      font-size: 16px;
    }
    .a-tabs-content-wrapper {
      position: absolute;
      top: 50px;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>
