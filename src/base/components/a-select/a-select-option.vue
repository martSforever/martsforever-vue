<template>
  <div class="a-select-option">
    <slot>
      <div class="slot-wrapper">
        {{label}}
      </div>
    </slot>
  </div>
</template>

<script>
  export default {
    name: "a-select-option",
    props: {
      label: {
        type: String,
        required: true
      },
      value: null
    },
  }
</script>

<style lang="scss">
  .a-select-option {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: start;
    cursor: pointer;
    &:hover {
      background-color: #a7dcff;
      color: white;
    }
    .slot-wrapper {
      padding-left: 12px;
    }
  }
</style>
