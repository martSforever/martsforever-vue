<template>
  <svg :class="iconfontCls" aria-hidden="true" :style="styles" @click="handleClick">
    <use :xlink:href="iconfont"></use>
  </svg>
</template>

<script>
  const prefix = 'aicon';
  export default {
    name: "a-iconfont",
    props: {
      icon: String,
      classes: String,
      styles: Object,
    },
    computed: {
      iconfont() {
        return `#${prefix}-${this.icon}`;
      },
      iconfontCls() {
        return `${this.classes} icon iconfont`;
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
