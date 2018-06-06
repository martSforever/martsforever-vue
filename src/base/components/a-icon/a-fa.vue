<template>
  <i :class="faClass" :style="styles" @click="handleClick"></i>
</template>

<script>
  export default {
    name: "a-fa",
    props: {
      icon: String,
      classes: String,
      styles: Object,
    },
    computed: {
      faClass() {
        return `${this.classes} fa ${this.icon}`;
      },
    },
    methods: {
      handleClick(e) {
        this.$emit('click', e);
      },
    }
  }
</script>

<style scoped lang="scss">

</style>
