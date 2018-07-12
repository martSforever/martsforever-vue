<template>
  <div class="a-icon-example">
    <div>
      <a-title>Font awesome图标</a-title>
    </div>
    <div class="icon-wrapper">
      <a-icon icon="fa-user"/>
      <a-icon icon="fa-table"/>
      <a-icon icon="fa-list"/>
    </div>
    <div>
      <a-title>阿里巴巴Iconfont图标</a-title>
    </div>
    <div class="icon-wrapper">
      <a-icon icon="line"/>
      <a-icon icon="loading"/>
    </div>
    <div>
      <a-title>图标大小</a-title>
    </div>
    <div class="icon-wrapper">
      <a-icon icon="line" style="font-size: 24px"/>
      <a-icon icon="loading" style="font-size: 36px"/>
    </div>
    <div>
      <a-title>图标颜色</a-title>
    </div>
    <div class="icon-wrapper">
      <a-icon icon="line" style="color: #495a80"/>
      <a-icon icon="loading" style="color: blueviolet"/>
    </div>
    <div>
      <a-title>通过type属性指定图标类型，fa还是iconfont</a-title>
    </div>
    <div class="icon-wrapper">
      <a-icon icon="line" style="color: #495a80"/>
      <a-icon icon="fa-list" style="color: blueviolet"/>
    </div>
  </div>
</template>

<script>
  import AIcon from "../../base/components/a-icon/a-icon";
  import ATitle from "../../base/components/a-title/a-title";

  export default {
    components: {
      ATitle,
      AIcon,
    },
    name: "a-icon-example",
    data() {
      return {
        currentIndex: 0
      }
    },
    mounted() {
      console.log(window);
    },
    methods: {
      sayHello() {
        console.log('hello');
      },
    }
  }
</script>

<style scoped lang="scss">
  .a-icon-example {
    @include fill-parent;
    .icon-wrapper {
      padding-left: 24px;
      margin-bottom: 12px;
    }
  }
</style>
