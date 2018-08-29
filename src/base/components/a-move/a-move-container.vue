<template>
  <transition-group name="a-move-container" tag="div" class="wrapper">
    <slot></slot>
  </transition-group>
</template>

<script>
  export default {
    name: "a-move-container"
  }
</script>

<style lang="scss">

  .a-move-container-enter, .a-move-container-leave-to {
    opacity: 0;
    transform: translate(80%, 30%);
  }

  .a-move-container-leave-active {
    position: absolute;
  }

</style>
