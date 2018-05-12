<template>
  <div class="a-title">
    |
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "a-title"
  }
</script>

<style scoped lang="stylus">
  .a-title {
    display inline-block
    width 100%
    p {
      padding 0
      margin: 0
      width fit-content
      display inline-block
    }
  }
</style>
