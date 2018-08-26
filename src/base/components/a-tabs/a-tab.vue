<template>
  <a-carousel-item classes="a-tab" :classes="classes" :styles="styles">
    <!--<div class="a-tab-head" @click="currentInitialized = true">tab head</div>
    <div v-if="currentInitialized">
      <slot></slot>
    </div>-->
    <slot></slot>
  </a-carousel-item>
</template>

<script>
  import ACarouselItem from "../a-carousel/a-carousel-item";

  export default {
    name: "a-tab",
    components: {ACarouselItem},
    props: {
      initialized: false,
      classes: null,
      styles: null,
      title: {
        type: String,
        default: 'title' + new Date().getTime()
      },
      name: {
        default: new Date().getTime()
      }
    },
    data() {
      return {
        currentInitialized: this.initialized
      }
    },
  }
</script>

<style lang="scss">
  .a-tab-head {
    background-color: rebeccapurple;
    color: white;
    height: 24px;
    line-height: 24px;
  }
</style>
