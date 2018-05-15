<template>
  <div class="a-button-example">
    <a-button fa="fa-address-book">fa button</a-button>
    <a-button iconfont="line">iconfont button</a-button>
    <a-button iconfont="line" :loading="isLoading">loading button</a-button>
    <a-button fa="fa-file" :disabled="disabled" @click="sayHello">disabled button</a-button>
    <a-button fa="fa-file" :disabled="!disabled" @click="sayHello">not disabled button</a-button>
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

<style scoped lang="stylus">

</style>
