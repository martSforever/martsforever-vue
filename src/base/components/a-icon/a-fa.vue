<template>
  <i :class="faClass" :style="styles"></i>
</template>

<script>
  export default {
    name: "a-fa",
    props: {
      icon: String,
      classes: String,
      styles:Object,
    },
    computed: {
      faClass() {
        return `${this.classes} fa ${this.icon}`;
      },
    }
  }
</script>

<style scoped lang="scss">

</style>
