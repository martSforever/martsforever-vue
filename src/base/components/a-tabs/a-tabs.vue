<template>
  <div class="a-tabs">
    <a-tabs-head :labels="tabLabels" @change="_handleChangeLabel"/>
    <a-carousel
      ref="carousel"
      :swipeable="false"
      height="100px">
      <div
        class="a-carousel-item item-cls"
        v-for="(item,index) in list"
        :style="{backgroundColor:item.color}"
      >
        <div>{{item.name}}--{{index}}</div>
      </div>
    </a-carousel>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ATabsHead from "./a-tabs-head";
  import ACarousel from "../a-carousel/a-carousel";

  export default {
    name: "a-tabs",
    components: {ACarousel, ATabsHead},
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
        console.log(item, index)
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

  }
</style>
