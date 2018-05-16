<template>
  <div class="a-icon-example">
    <div>
      <a-title>Font awesome图标</a-title>
    </div>
    <div class="icon-wrapper">
      <a-icon fa="fa-user"/>
      <a-icon fa="fa-table"/>
      <a-icon fa="fa-list"/>
    </div>
    <div>
      <a-title>阿里巴巴Iconfont图标</a-title>
    </div>
    <div class="icon-wrapper">
      <a-icon iconfont="line"/>
      <a-icon iconfont="loading"/>
    </div>
    <div>
      <a-title>图标大小</a-title>
    </div>
    <div class="icon-wrapper">
      <a-icon iconfont="line" style="font-size: 24px"/>
      <a-icon iconfont="loading" style="font-size: 36px"/>
    </div>
    <div>
      <a-title>图标颜色</a-title>
    </div>
    <div class="icon-wrapper">
      <a-icon iconfont="line" style="color: #495a80"/>
      <a-icon iconfont="loading" style="color: blueviolet"/>
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
    .icon-wrapper{
      padding-left: 24px;
      margin-bottom: 12px;
    }
  }
</style>
