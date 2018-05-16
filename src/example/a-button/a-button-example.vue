<template>
  <div class="a-button-example">
    <div>
      <a-title>按钮图标</a-title>
    </div>
    <div class="btn-wrapper">
      <a-button fa="fa-address-book">fa button</a-button>
      <a-button iconfont="line">iconfont button</a-button>
      <a-button iconfont="line" :loading="isLoading">loading button</a-button>
      <a-button fa="fa-file" :disabled="disabled" @click="sayHello">disabled button</a-button>
      <a-button fa="fa-file" :disabled="!disabled" @click="sayHello">not disabled button</a-button>
    </div>
    <div>
      <a-title>按钮颜色</a-title>
    </div>
    <div class="btn-wrapper">
      <a-button type="info">info</a-button>
      <a-button type="primary">primary</a-button>
      <a-button type="success">success</a-button>
      <a-button type="success" :disabled="disabled">success</a-button>
      <a-button type="warning">warning</a-button>
      <a-button type="warning" :disabled="disabled">warning</a-button>
      <a-button type="error">error</a-button>
    </div>
    <div>
      <a-title>按钮边框</a-title>
    </div>
    <div class="btn-wrapper">
      <a-button>default</a-button>
      <a-button type="ghost">ghost</a-button>
      <a-button type="dashed">dashed</a-button>
      <a-button type="text">text</a-button>
    </div>
    <div>
      <a-title>按钮圆角</a-title>
    </div>
    <div class="btn-wrapper">
      <a-button>default</a-button>
      <a-button shape="round">round</a-button>
      <a-button shape="circle" fa="fa-user"/>
      <a-button shape="fillet">fillet</a-button>
      <a-button shape="none">none</a-button>
    </div>
    <div>
      <a-title>长按钮</a-title>
    </div>
    <div class="btn-wrapper long-btn">
      <a-button type="primary" class="a-btn-long">primary</a-button>
      <a-button type="success" class="a-btn-long">success</a-button>
      <a-button type="error" class="a-btn-long">error</a-button>
    </div>
    <div>
      <a-title>按钮大小</a-title>
    </div>
    <div class="btn-wrapper">
      <a-button>default</a-button>
      <a-button shape="circle" fa="fa-user" size="large"/>
      <a-button shape="none" size="large">large</a-button>
      <a-button shape="none" size="base">base</a-button>
      <a-button shape="none" size="small">small</a-button>
    </div>
    <div>
      <a-title>自定义样式</a-title>
    </div>
    <div class="btn-wrapper">
      <a-button>default</a-button>
      <a-button class="custome-cls">Custome cls</a-button>
    </div>
    <div>
      <a-title>按钮组</a-title>
    </div>
    <div class="btn-wrapper">
      <a-button-group shape="round">
        <a-button>default</a-button>
        <a-button class="custome-cls">Custome cls</a-button>
        <a-button type="success">success</a-button>
        <a-button type="error">error</a-button>
      </a-button-group>
      <a-button-group shape="fillet">
        <a-button>default</a-button>
        <a-button class="custome-cls">Custome cls</a-button>
        <a-button type="success">success</a-button>
        <a-button type="error">error</a-button>
      </a-button-group>
      <a-button-group shape="none">
        <a-button>default</a-button>
        <a-button class="custome-cls">Custome cls</a-button>
        <a-button type="success">success</a-button>
        <a-button type="error">error</a-button>
      </a-button-group>
    </div>

  </div>
</template>

<script>
  import AButton from "../../base/components/a-button/a-button";
  import AIcon from "../../base/components/a-icon/a-icon";
  import ATitle from "../../base/components/a-title/a-title";
  import AButtonGroup from "../../base/components/a-button/a-button-group";

  export default {
    components: {
      AButtonGroup,
      ATitle,
      AIcon,
      AButton
    },
    name: "a-button-example",
    data() {
      return {
        isLoading: true,
        disabled: true
      }
    },
    methods: {
      sayHello() {
        console.log('hello');
      },
    }
  }
</script>

<style scoped lang="scss">
  .a-button-example {
    .btn-wrapper {
      margin-bottom: 12px;
      padding-left: 24px;
      .a-btn {
      }
    }
    .long-btn {
      width: 300px;
    }
    .custome-cls {
      background-color: blueviolet;
    }
  }
</style>
