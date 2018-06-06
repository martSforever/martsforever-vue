<template>
  <div class="a-switch-example">
    <a-title>基本用法</a-title>
    <div class="example-item">
      <a-switch v-model="value1"/>
    </div>
    <a-title>自定义真假值</a-title>
    <div class="example-item">
      <a-switch v-model="value2" true-value="1" false-value="2"/>
      <a-button>{{value2}}</a-button>
    </div>
    <a-title>大小尺寸</a-title>
    <div class="example-item">
      <a-switch size="small"/>
      <a-switch size="middle"/>
      <a-switch size="large"/>
    </div>
    <a-title>禁用组件</a-title>
    <div class="example-item">
      <a-switch v-model="value3"/>
      <a-switch :disabled="value3"/>
    </div>
    <a-title>各种背景色</a-title>
    <div class="example-item">
      <a-switch color="primary" v-model="value1"/>
      <a-switch color="info" v-model="value1"/>
      <a-switch color="success" v-model="value1"/>
      <a-switch color="warning" v-model="value1"/>
      <a-switch color="error" v-model="value1"/>
    </div>
    <a-title>自定义指示器</a-title>
    <div class="example-item">
      <a-switch/>
      <a-switch icon="fa-gratipay"/>
      <a-switch icon="settingicon" icon-type="iconfont" icon-size="24px"/>
      <a-switch>
        <div class="cst-icon" slot="indicator">韦</div>
      </a-switch>

    </div>
    <a-title>真假插槽</a-title>
    <div class="example-item">
      <a-switch>
        <div slot="true">是</div>
        <div slot="false">否</div>
      </a-switch>
    </div>
  </div>
</template>

<script>
  import ASwitch from "../../base/components/a-switch/a-switch";
  import ATitle from "../../base/components/a-title/a-title";
  import AInput from "../../base/components/a-input/a-input";
  import AButton from "../../base/components/a-button/a-button";

  export default {
    components: {
      AButton,
      AInput,
      ATitle,
      ASwitch
    },
    name: "a-switch-example",
    data() {
      return {
        value1: true,
        value2: '1',
        value3: true
      }
    },
  }
</script>

<style scoped lang="scss">
  .a-switch-example {
    @include fill-parent;
    .example-item {
      padding-left: 12px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
    }
    .cst-icon{
      height: 27px;
      width: 27px;
      border-radius: 13.5px;
      line-height: 27px;
      text-align: center;
      background-color: white;
      color: blueviolet;
    }
  }
</style>
