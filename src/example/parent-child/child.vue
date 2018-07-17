<template>
  <div>
    <div>child head--{{name}}</div>
    <button @click="_handleClick">
      <slot></slot>
    </button>
  </div>
</template>

<script>
  export default {
    name: "child",
    props: {
      name: null
    },
    methods: {
      _handleClick() {
        console.log(this.name)
        this.parent.sayHelloParent()
      },
    }
  }
</script>

<style scoped lang="scss">

</style>
