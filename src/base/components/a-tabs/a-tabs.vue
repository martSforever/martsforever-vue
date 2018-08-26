<template>
  <div class="a-tabs">
    <div class="a-tabs-head-wrapper">
      <a-tabs-head :labels="tabLabels" @change="_handleChangeLabel"/>
    </div>
    <div class="a-tabs-content-wrapper">
      <a-carousel
        @initialized="_handleCarouselInitialized"
        ref="carousel"
        :swipeable="true"
        height="100%">
        <slot></slot>
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
        tabItems: []
      }
    },
    methods: {
      addTab(component) {
        /*let instance = new Vue(component)
        const vueComponent = instance.$mount()
        console.log(vueComponent)
        this.vueComponents.push(vueComponent)
        this.$refs.content.appendChild(vueComponent.$el)*/
        this.list.push({
          name: new Date().getTime(),
          color: '#ff7261',
        })
      },
      removeTab() {
        let vc = this.vueComponents.pop()
        this.$refs.content.removeChild(vc.$el)
        vc.$destroy()
      },
      _handleChangeLabel({item, index}) {
        this.$refs.carousel.scrollTo(index)
      },
      _handleCarouselInitialized() {
        this.tabItems = this.$refs.carousel.$children.reduce((ret, child) => {
          if (child.$options._componentTag === 'a-tab') {
            ret.push({
              title: child.title,
              name: child.name
            })
          }
          return ret
        }, [])
        console.log(this.tabItems)
      },
    },
    computed: {
      tabLabels() {
        return this.tabItems.map((item) => item.title)
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
