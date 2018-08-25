<template>
  <div class="a-carousel-item" :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "a-carousel-item",
    props: {
      classes: null,
      styles: null
    }
  }
</script>

<style scoped lang="scss">

</style>
