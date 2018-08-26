<template>
  <div class="a-tabs">
    <div class="a-tabs-head-wrapper">
      <a-tabs-head :labels="tabLabels" v-model="currentValue"/>
    </div>
    <div class="a-tabs-content-wrapper">
      <a-carousel
        @initialized="_handleCarouselInitialized"
        ref="carousel"
        :swipeable="false"
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
    props: {
      value: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        currentValue: this.value,
        vueComponents: [],
        tabItems: []
      }
    },
    watch: {
      value(val) {
        if (this.currentValue !== val) {
          this.currentValue = val
        }
      },
      /*currentValue变化的时候，更新carousel，因为tabHead是直接双向绑定的currentValue，所以不用更新tabHead*/
      currentValue(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$emit('input', newVal)
          this._updateCarousel(newVal)
        }
      },
    },
    methods: {
      /*手动增加自定义tab*/
      addTab(component) {
        /*let instance = new Vue(component)
        const vueComponent = instance.$mount()
        console.log(vueComponent)
        this.vueComponents.push(vueComponent)
        this.$refs.content.appendChild(vueComponent.$el)*/
      },
      /*手动删除自定义tab*/
      removeTab() {
        let vc = this.vueComponents.pop()
        this.$refs.content.removeChild(vc.$el)
        vc.$destroy()
      },
      /*打开tab*/
      openTab(tabIndex) {
        this.currentValue = tabIndex
      },

      /*更新carousel*/
      _updateCarousel(index) {
        // console.log('_updateCarousel')
        let tabs = this._getTabInstance()
        if (!!tabs) tabs[index].currentInitialized = true
        this.$nextTick(() => this.$refs.carousel.scrollTo(index))
      },
      /*获取子tab 的vue组件实例*/
      _getTabInstance() {
        return this.$refs.carousel.$children.reduce((ret, child) => {
          if (child.$options._componentTag === 'a-tab') {
            ret.push(child)
          }
          return ret
        }, [])
      },
      /*更新tabItems，用于给tabHead展示标签*/
      _handleCarouselInitialized() {
        this.tabItems = this._getTabInstance().reduce((ret, item) => {
          ret.push({
            title: item.title,
            name: item.name
          })
          return ret
        }, [])
      },
    },
    computed: {
      tabLabels() {
        return this.tabItems.map((item) => item.title)
      },
    },
    mounted() {
      /*a-tabs初始化的时候，打开以及初始化指定tab*/
      this._updateCarousel(this.currentValue)
    },
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
