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
    created() {
      console.log(`${name} initialized`)
    },
    destroyed() {
      console.log(`${name} destroyed`)
    },
  }
</script>

<style lang="scss">

</style>
