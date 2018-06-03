<template>
  <div class="a-carousel-example-item">
    {{name}}
  </div>
</template>

<script>
  export default {
    name: "a-carousel-exmaple-item",
    props: {
      name: {
        default: 'name-???'
      }
    },
    created(){
      console.log(`created:${this.name}`)
    },
  }
</script>

<style scoped lang="scss">
  .a-carousel-example-item {
    color: white;
    height: 100% !important;
    width: 100% !important;
  }
</style>
