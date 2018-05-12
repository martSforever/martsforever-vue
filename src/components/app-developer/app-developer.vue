<template>
  <div class="app-developer">
    this is developer page
    <svg class="icon iconfront" aria-hidden="true">
      <use xlink:href="#icon-shouhoufuwurexian"></use>
    </svg>
  </div>
</template>

<script>
  export default {
    name: "app-developer",
    data() {
      return {
        currentIndex: 0
      }
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped lang="stylus">
  .iconfront {
    color rebeccapurple
    font-size 100px
  }
</style>
