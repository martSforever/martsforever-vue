<template>
  <div class="a-grid-example">
    <div class="container">
      <div class="example-wrapper">
        <a-title>基础用法，一共24格</a-title>
        <a-row>
          <a-col span="2">
            <div class="ct-cls">col-2</div>
          </a-col>
          <a-col span="4">
            <div class="ct-cls">col-4</div>
          </a-col>
          <a-col span="6">
            <div class="ct-cls">col-6</div>
          </a-col>
          <a-col span="8">
            <div class="ct-cls">col-8</div>
          </a-col>
          <a-col span="4">
            <div class="ct-cls">col-4</div>
          </a-col>
        </a-row>
      </div>
      <div class="example-wrapper">
        <a-title>列间隔gutter(单位px)</a-title>
        <a-row gutter="16">
          <a-col span="2">
            <div class="ct-cls">col-2</div>
          </a-col>
          <a-col span="4">
            <div class="ct-cls">col-4</div>
          </a-col>
          <a-col span="6">
            <div class="ct-cls">col-6</div>
          </a-col>
          <a-col span="8">
            <div class="ct-cls">col-8</div>
          </a-col>
          <a-col span="4">
            <div class="ct-cls">col-4</div>
          </a-col>
        </a-row>
      </div>
      <div class="example-wrapper">
        <a-title>flex布局的栅格</a-title>
        <a-row type="flex" align="middle">
          <a-col span="2">
            <div class="ct-cls" style="height: 12px">col-2</div>
          </a-col>
          <a-col span="4">
            <div class="ct-cls" style="height: 24px">col-4</div>
          </a-col>
          <a-col span="6">
            <div class="ct-cls" style="height: 36px">col-6</div>
          </a-col>
          <a-col span="8">
            <div class="ct-cls" style="height: 48px">col-8</div>
          </a-col>
          <a-col span="4">
            <div class="ct-cls" style="height: 36px">col-4</div>
          </a-col>
        </a-row>
      </div>
      <div class="example-wrapper">
        <a-row type="flex" justify="space-between">
          <a-col span="2">
            <div class="ct-cls" style="height: 12px">col-2</div>
          </a-col>
          <a-col span="4">
            <div class="ct-cls" style="height: 24px">col-4</div>
          </a-col>
          <a-col span="6">
            <div class="ct-cls" style="height: 36px">col-6</div>
          </a-col>
          <a-col span="4">
            <div class="ct-cls" style="height: 36px">col-4</div>
          </a-col>
        </a-row>
      </div>
      <div class="example-wrapper">
        <a-row type="flex" justify="start">
          <a-col span="2">
            <div class="ct-cls" style="height: 12px">col-2</div>
          </a-col>
          <a-col span="4">
            <div class="ct-cls" style="height: 24px">col-4</div>
          </a-col>
          <a-col span="6">
            <div class="ct-cls" style="height: 36px">col-6</div>
          </a-col>
          <a-col span="4">
            <div class="ct-cls" style="height: 36px">col-4</div>
          </a-col>
        </a-row>
      </div>
      <div class="example-wrapper">
        <a-row type="flex" align="bottom" justify="end">
          <a-col span="2">
            <div class="ct-cls" style="height: 12px">col-2</div>
          </a-col>
          <a-col span="4">
            <div class="ct-cls" style="height: 24px">col-4</div>
          </a-col>
          <a-col span="6">
            <div class="ct-cls" style="height: 36px">col-6</div>
          </a-col>
          <a-col span="4">
            <div class="ct-cls" style="height: 36px">col-4</div>
          </a-col>
        </a-row>
      </div>
      <div class="example-wrapper">
        <a-title>当使用flex布局时，可以使用order属性排序</a-title>
        <a-row type="flex" align="middle" gutter="16">
          <a-col span="2" order="1">
            <div class="ct-cls">col-2</div>
          </a-col>
          <a-col span="4" order="2">
            <div class="ct-cls">col-4</div>
          </a-col>
          <a-col span="6" order="4">
            <div class="ct-cls">col-6</div>
          </a-col>
          <a-col span="8" order="3">
            <div class="ct-cls">col-8</div>
          </a-col>
          <a-col span="4" order="5">
            <div class="ct-cls">col-4</div>
          </a-col>
        </a-row>
      </div>
      <div class="example-wrapper">
        <a-title>当使用浮动布局时，可以使用pull以及push属性排序</a-title>
        <a-row gutter="16">
          <a-col span="2" push="10" :xs="xs[0]">
            <div class="ct-cls">col-2</div>
          </a-col>
          <a-col span="4" pull="2" :xs="xs[1]">
            <div class="ct-cls">col-4</div>
          </a-col>
          <a-col span="6" pull="2" :xs="xs[2]">
            <div class="ct-cls">col-6</div>
          </a-col>
        </a-row>
      </div>
      <div class="example-wrapper">
        <a-title>响应式布局，可以用chrome把客户端变成移动端模式，当为普通模式时，分别占2,4,6格，当为移动端时，分别占4,8,12格</a-title>
        <a-row gutter="16">
          <a-col span="2" :xs="xs[0]">
            <div class="ct-cls">col-2</div>
          </a-col>
          <a-col span="4" :xs="xs[1]">
            <div class="ct-cls">col-4</div>
          </a-col>
          <a-col span="6" :xs="xs[2]">
            <div class="ct-cls">col-6</div>
          </a-col>
        </a-row>
      </div>
    </div>

  </div>
</template>

<script>
  import ARow from "../../base/components/a-grid/a-row";
  import ACol from "../../base/components/a-grid/a-col";
  import ATitle from "../../base/components/a-title/a-title";

  export default {
    components: {
      ATitle,
      ACol,
      ARow
    },
    name: "a-grid-example",
    data() {
      return {
        xs: [4, 8, 12, 8]
      }
    },
  }
</script>

<style scoped lang="scss">
  .a-grid-example {
    @include fill-parent;
    .container {
      width: 100%;
      overflow-x: hidden;
      .example-wrapper {
        margin-bottom: 12px;
        .a-row {
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
          .ct-cls {
            background-color: rgba($text-color-main, 0.4);
            height: 32px;
            @include flex-center;
          }
        }
      }
    }
  }
</style>
