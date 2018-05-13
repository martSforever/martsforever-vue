<template>
  <div class="a-title">
    <a-iconfront icon="line" class="title-icon"/>
    <slot></slot>
  </div>
</template>

<script>
  import AIconfront from "../a-iconfront/a-iconfront";

  export default {
    components: {AIconfront},
    name: "a-title",
  }
</script>

<style scoped lang="stylus">
  .a-title {
    display inline-flex
    width 100%
    align-items center
    justify-content flex-start
    flex-direction row
    p {
      padding 0
      margin: 0
      width fit-content
      display inline-block
    }
    .title-icon {
      font-size 24px
      color $font-color-red
    }
  }
</style>
