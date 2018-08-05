<template>
  <div class="test-parent">
    this is test-parent
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "test-parent",
    props: {
      tag: ''
    },
    created() {
      this.$on('call-parent', (data) => {
        console.log(`call parent[${this.tag}]-->>`, data)
      })
    },
  }
</script>

<style scoped lang="scss">

</style>
