<template>
  <svg class="icon iconfront" aria-hidden="true">
    <use :xlink:href="result"></use>
  </svg>
</template>

<script>
  const prefix = 'aicon';
  export default {
    name: "a-iconfront",
    props: {
      icon: {
        type: String,
      }
    },
    data() {
      return {
        result: `#${prefix}-${this.icon}`
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
