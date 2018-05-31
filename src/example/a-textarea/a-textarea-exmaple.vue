<template>
  <div class="a-textarea-example">
    <a-title>普通输入框</a-title>
    <div class="item"><a-textarea v-model="name"/></div>
    <a-title>输入框大小</a-title>
    <div class="item">
      <a-textarea v-model="name" size="large"/>
      <a-textarea v-model="name" size="middle"/>
      <a-textarea v-model="name" size="small"/>
    </div>
    <a-title>输入框形状</a-title>
    <div class="item">
      <a-textarea v-model="name" shape="fillet"/>
      <a-textarea v-model="name" shape="none"/>
    </div>

    <a-title>可以试试往输入框粘贴图片</a-title>
    <div class="item">
      <div><a-textarea v-model="name" size="large"/></div>
    </div>
    <a-title>输入框颜色</a-title>
    <div class="item">
      <a-textarea v-model="name" size="small" color="primary"/>
      <a-textarea v-model="name" size="small" color="info"/>
      <a-textarea v-model="name" size="small" color="success"/>
      <a-textarea v-model="name" size="small" color="warning"/>
      <a-textarea v-model="name" size="small" color="error"/>
    </div>

  </div>
</template>

<script>
  import ATextarea from "../../base/components/a-textarea/a-textarea";
  import ATitle from "../../base/components/a-title/a-title";

  export default {
    components: {
      ATitle,
      ATextarea
    },
    name: "a-textarea-exmaple",
    data() {
      return {
        disabled: false,
        name: 'hello'
      }
    },
  }
</script>

<style scoped lang="scss">
  .a-textarea-example {
    @include fill-parent;
    .item{
      padding-left: 12px;
      margin-bottom: 12px;
    }
  }
</style>
