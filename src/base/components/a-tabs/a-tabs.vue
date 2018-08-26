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
        tabs: []
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
        const vueComponent = new Vue(component)
        const vueInstance = vueComponent.$mount()

        const aTab = vueInstance.$children[0]
        if (aTab.$options.name !== 'a-tab') {
          console.error('要添加的vue组件的根节点必须是a-tab！！！')
          vueInstance.$destroy()
          return
        }

        this.$refs.carousel.appendChild(vueInstance.$el)
        this.$refs.carousel.$children.push(vueInstance)
        this._handleCarouselInitialized()
        return this.tabs[this.tabs.length - 1]
      },
      /*手动删除自定义tab*/
      removeTab(tabItem) {
        let {tab, instance, name, title} = tabItem
        this.$refs.carousel.removeChild(instance.$el)
        this.$refs.carousel.$children.remove(instance)
        instance.$destroy()
        this._handleCarouselInitialized()
      },
      /*打开tab*/
      openTab(tabIndex) {
        this.currentValue = tabIndex
      },

      /*更新carousel*/
      _updateCarousel(index) {
        // console.log('_updateCarousel')
        let tabs = this.getTabs()
        if (!!tabs) tabs[index].tab.currentInitialized = true
        this.$nextTick(() => this.$refs.carousel.scrollTo(index))
      },
      /*获取子tab 的vue组件实例*/
      getTabs() {
        return this.$refs.carousel.$children.reduce((ret, child) => {
          let item = {}
          let tab, instance;
          if (child.$options.name === 'a-tab') {
            tab = child
            instance = tab
          } else if (!!child.$children[0] && child.$children[0].$options.name === 'a-tab') {
            tab = child.$children[0]
            instance = child
          } else {
            console.error(`${child.$options.name}不是a-tab，根节点也不是a-tab实例`)
          }
          item = {
            tab,
            instance,
            name: tab.name,
            title: tab.title
          }
          ret.push(item)
          return ret
        }, [])
      },
      /*更新tabItems，用于给tabHead展示标签*/
      _handleCarouselInitialized() {
        this.tabs = this.getTabs()
      },
    },
    computed: {
      tabLabels() {
        return this.tabs.map((item) => item.title)
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
