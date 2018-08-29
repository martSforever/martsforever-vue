<template>
  <div class="a-move-item" :class="[className]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "a-move-item",
    props: {
      className: {
        type: String
      }
    }
  }
</script>

<style lang="scss">
  .a-move-item {
    transition: all 0.4s;
    display: block;
  }

</style>
