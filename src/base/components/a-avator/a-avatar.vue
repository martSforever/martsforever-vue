<template>
  <div class="a-avatar">
    this is a-avatar
    <img :src="src">
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
  export default {
    name: "a-avatar",
    props: {
      src: {
        type: String
      }
    }
  }
</script>

<style lang="scss">

</style>
