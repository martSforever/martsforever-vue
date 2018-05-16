<template>
  <div class="a-title">
    <slot></slot>
  </div>
</template>

<script>

  export default {
    name: "a-title",
  }
</script>

<style scoped lang="scss">
  .a-title {
    display: inline-flex;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    p {
      padding: 0;
      margin: 0;
      width: fit-content;
      display: inline-block;
    }
    .title-icon {
      color: $text-color-main;
    }
  }
</style>
