<template>
  <div class="a-dropdown-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "a-dropdown-item"
  }
</script>

<style scoped lang="scss">
  .a-dropdown-item {
    min-height: 32px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 12px;
    color: #999;
    &:hover {
      background-color: $text-color-primary;
      color: white;
    }
  }
</style>
