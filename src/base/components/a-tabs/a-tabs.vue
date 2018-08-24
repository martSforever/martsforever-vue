<template>
  <div class="a-tabs">
    <div class="a-tabs-head">
      this is tabs head
    </div>
    <div ref="content">
      tabs content
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: "a-tabs",
    data() {
      return {
        vueCopmponents: []
      }
    },
    methods: {
      addTab(component) {
        let instance = new Vue(component)
        const vueComponent = instance.$mount()
        console.log(vueComponent)
        this.vueCopmponents.push(vueComponent)
        this.$refs.content.appendChild(vueComponent.$el)
      },
      removeTab() {
        let vc = this.vueCopmponents.pop()
        this.$refs.content.removeChild(vc.$el)
        vc.$destroy()
      },
    }
  }
</script>

<style lang="scss">
  .a-tabs {
    text-align: left;
    .a-tabs-head {
      background-color: $text-color-primary;
      color: white;
      height: 32px;
      line-height: 32px;
    }
  }
</style>
