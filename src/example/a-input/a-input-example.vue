<template>
  <div class="a-input-example">
    <a-title>默认输入框</a-title>
    <div class="input-wrapper">
      <a-input v-model="name"/>
    </div>
    <a-title>输入框大小</a-title>
    <div class="input-wrapper">
      <a-input v-model="name" size="small"/>
      <a-input v-model="name" size="middle"/>
      <a-input v-model="name" size="large"/>
    </div>
    <a-title>读写以及禁用状态</a-title>
    <div class="input-wrapper">
      <a-input v-model="name" :readonly="readonly"/>
      <a-input v-model="name" :disabled="disabled"/>
    </div>
    <a-title>形状</a-title>
    <div class="input-wrapper">
      <a-input v-model="name" shape="round"/>
      <a-input v-model="name" shape="fillet"/>
      <a-input v-model="name" shape="none"/>
    </div>
    <a-title>颜色</a-title>
    <div class="input-wrapper">
      <a-input v-model="name" color="primary"/>
      <a-input v-model="name" color="info"/>
      <a-input v-model="name" color="success"/>
      <a-input v-model="name" color="warning"/>
      <a-input v-model="name" color="error"/>
    </div>
    <a-title>input标签原生属性</a-title>
    <div class="input-wrapper">
      <a-input v-model="name" id="primary"/>
      <a-input v-model="name" name="primary"/>
      <a-input v-model="name" type="password"/>
      <a-input placeholder="primary"/>
    </div>
    <a-title>内置图标以及图标位置</a-title>
    <div class="input-wrapper">
      <a-input v-model="name" icon="fa-user"/>
      <a-input v-model="name" icon="line" icon-type="iconfont"/>
      <a-input v-model="name" icon="fa-user" icon-position="left"/>
      <a-input v-model="name" icon="fa-user" icon-position="right" shape="round"/>
    </div>
    <a-title>插槽</a-title>
    <div class="input-wrapper">
      <a-input v-model="name" icon="fa-globe" shape="round" color="primary">
        <div slot="prepend"><div style="width: 56px;text-align: right;display: inline-block">http://</div></div>
        <div slot="prepend"><div style="width: 36px;text-align: center;display: inline-block">www.</div></div>
        <div slot="append"><div style="width: 48px;text-align: center;display: inline-block">.com</div></div>
        <div slot="append"><div style="width: 32px;text-align: left;display: inline-block">.cn</div></div>
      </a-input>
    </div>
  </div>
</template>

<script>
  import AInput from "../../base/components/a-input/a-input";
  import ATitle from "../../base/components/a-title/a-title";

  export default {
    components: {
      ATitle,
      AInput
    },
    name: "a-input-example",
    data() {
      return {
        name: 'martsforever',
        readonly: true,
        autocomplete: 'on',
        disabled: true,
        shape: 'fillet',
        size: 'large',
        color: 'primary'
      }
    },
  }
</script>

<style scoped lang="scss">
  .a-input-example {
    text-align: left;
    padding-top: 16px;
    .input-wrapper {
      padding-left: 12px;
    }
  }

</style>
