<template>
  <div>
    <div>parent head...</div>
    <slot></slot>
    <slot name="sub"></slot>
  </div>
</template>

<script>
  export default {
    name: "parent",
    methods: {
      sayHelloParent() {
        console.log('hello,parent');
      },
    }
  }
</script>

<style scoped lang="scss">

</style>
