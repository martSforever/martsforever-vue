<template>
  <div class="a-input-example">
    <div class="row">
      <div class="col">this is col content</div>
    </div>
    <div class="row margin">
      <div class="col">this is col content</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "a-input-example"
  }
</script>

<style scoped lang="scss">
  .a-input-example {
    @include fill-parent;
    padding: 24px;
    .row {
      width: 500px;
      background-color: blueviolet;
      height: 36px;
      .col {
        background-color: #495a80;
        height: 100%;
        float: left;
      }
      &.margin {
        margin-left: -8px;
        margin-right: -8px;
        .col {
          padding-left: 8px;
          padding-right: 8px;
        }
      }
    }
  }
</style>
