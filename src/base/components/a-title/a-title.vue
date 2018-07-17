<template>
  <div class="a-title">
    <a-icon icon="line"/>
    <slot></slot>
  </div>
</template>

<script>

  import AIcon from "../a-icon/a-icon";

  export default {
    components: {AIcon},
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
    .a-icon{
      color: $text-color-main;
      font-size: $font-size-xl;
    }
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
