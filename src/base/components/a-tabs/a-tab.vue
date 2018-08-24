<template>
  <div class="a-tab">
    <div class="a-tab-head" @click="currentInitialized = true">tab head</div>
    <div v-if="currentInitialized">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "a-tab",
    props: {
      initialized: false
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
