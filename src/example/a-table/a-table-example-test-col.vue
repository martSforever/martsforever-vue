<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "a-table-example-test-col",
    mounted() {
      this.list = []
      for (let i = 0; i < 5000; i++) {
        this.list.push(new Date())
      }
    },
  }
</script>

<style lang="scss">

</style>
