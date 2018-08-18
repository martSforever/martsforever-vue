<template>
  <div class="a-collapse-example">
    <a-button @click="isShow = !isShow">toggle</a-button>
    <a-collapse-transition>
      <div class="content" v-show="isShow"></div>
    </a-collapse-transition>
  </div>
</template>

<script>
  import ACollapseTransition from "../../base/components/a-collapse-transition/a-collapse-transition";
  import AButton from "../../base/components/a-button/a-button";

  export default {
    name: "a-collapse-example",
    components: {AButton, ACollapseTransition},
    data() {
      return {
        isShow: true
      }
    },
  }
</script>

<style lang="scss">
  .a-collapse-example {
    .content {
      height: 300px;
      width: 200px;
      background: #f2f2f2;
    }
  }
</style>
