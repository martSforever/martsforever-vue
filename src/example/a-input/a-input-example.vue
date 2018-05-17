<template>
  <div class="a-input-example">
    <div class="container">
      <div class="row">aaa</div>
    </div>
    <div class="container">

      <div class="row">
        <div class="a-col a-col-4">
          <div class="col1">111</div>
        </div>
        <div class="a-col a-col-8">
          <div class="col2">222</div>
        </div>
        <div class="a-col a-col-12">
          <div class="col3">333</div>
        </div>
      </div>

      <div class="row">
        <div class="a-col a-col-12 a-col-offset-4">
          <div class="col3">333</div>
        </div>
      </div>

      <div class="row">
        <div class="a-col a-col-4 a-col-push-8">
          <div class="col1">333</div>
        </div>
        <div class="a-col a-col-8 a-col-pull-4">
          <div class="col3">333</div>
        </div>
      </div>

      <div class="row flex-row">
        <div class="a-col a-col-4 a-col-order-1">
          <div class="col1">333</div>
        </div>
        <div class="a-col a-col-8 a-col-order-3">
          <div class="col3">333</div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">bbb</div>
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
    text-align: center;
    .container {
      width: 100%;
      overflow-x: hidden;
      margin-bottom: 21px;
      display: block;
      float: left;
      background-color: black;
      & * {
        box-sizing: border-box;
      }
      .row {
        height: auto;
        margin-left: -8px;
        margin-right: -8px;
        position: relative;
        &:before,
        &:after {
          content: "";
          display: table;
          clear: both;
        }
      }
      .flex-row {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  $cell-num: 24;

  .a-col {
    display: block;
    float: left;
    padding-left: 8px;
    padding-right: 8px;
    @for $i from 1 through $cell-num {
      &.a-col-#{$i} {
        width: (1 / $cell-num * $i * 100) * 1%;
      }

      &.a-col-offset-#{$i} {
        margin-left: (1 / $cell-num * $i * 100) * 1%;
      }

      &.a-col-pull-#{$i} {
        position: relative;
        right: (1 / $cell-num * $i * 100) * 1%;
      }

      &.a-col-push-#{$i} {
        position: relative;
        left: (1 / $cell-num * $i * 100) * 1%;
      }
      &.a-col-order-#{$i} {
        order: $i;
      }
    }
  }

  .col1 {
    background-color: rebeccapurple;
    height: 36px;
  }

  .col2 {
    background-color: #e03636;
    height: 48px;
  }

  .col3 {
    background-color: turquoise;
    height: 24px;
  }

</style>
