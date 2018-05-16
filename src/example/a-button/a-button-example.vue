<template>
  <div class="a-button-example">
    <div class="btn-wrapper">
      <a-button fa="fa-address-book">fa button</a-button>
      <a-button iconfont="line">iconfont button</a-button>
      <a-button iconfont="line" :loading="isLoading">loading button</a-button>
      <a-button fa="fa-file" :disabled="disabled" @click="sayHello">disabled button</a-button>
      <a-button fa="fa-file" :disabled="!disabled" @click="sayHello">not disabled button</a-button>
    </div>
    <div class="btn-wrapper">
      <a-button>default</a-button>
      <a-button type="primary">primary</a-button>
      <a-button type="ghost">ghost</a-button>
      <a-button type="dashed">dashed</a-button>
      <a-button type="text">text</a-button>
    </div>
    <div class="btn-wrapper">
      <a-button type="info">info</a-button>
      <a-button type="success">success</a-button>
      <a-button type="success" :disabled="disabled">success</a-button>
      <a-button type="warning">warning</a-button>
      <a-button type="warning" :disabled="disabled">warning</a-button>
      <a-button type="error">error</a-button>
    </div>

    <a-button type="error" class="a-btn-long">error</a-button>

  </div>
</template>

<script>
  import AButton from "../../base/components/a-button/a-button";
  import AIcon from "../../base/components/a-icon/a-icon";

  export default {
    components: {
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
      margin-bottom: 12px
    }
  }
</style>
