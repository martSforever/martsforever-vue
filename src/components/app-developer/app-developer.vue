<template>
  <div>
    this is developer page
    <div class="test-div"></div>
  </div>
</template>

<script>
  export default {
    name: "app-developer"
  }
</script>

<style scoped lang="stylus">
  .test-div{
    height 100px
    width 100px
    background-color aliceblue
    &:active{
      background-color aqua
    }
  }
</style>
