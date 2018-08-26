<template>
  <div>
    some-business-sub-content-->>{{name}}
  </div>
</template>

<script>
  export default {
    props: {
      name: ''
    },
    name: "some-business-sub-content",
    destroyed() {
      console.log(`${this.name} destroyed`)
    },
    mounted() {
      console.log(`${this.name} initialized`)
      this.dates = []

      let i = 10000
      while (i > 0) {
        i--
        this.dates.push(new Date())
      }
    },
  }
</script>

<style lang="scss">

</style>
