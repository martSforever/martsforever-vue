<template>
  <div class="a-modal-example">
    <a-title>基本用法</a-title>
    <div class="example-item">
      <a-button @click="show1 = !show1">show--{{show1}}</a-button>
      <a-modal v-model="show1" title="选择安全性菜单">
        balabala-->>{{show1}}
      </a-modal>
    </div>
  </div>
</template>

<script>
  import ATitle from "../../base/components/a-title/a-title";
  import AButton from "../../base/components/a-button/a-button";
  import AModal from "../../base/components/a-modal/a-modal";

  export default {
    components: {
      AModal,
      AButton,
      ATitle
    },
    name: "a-modal-example",
    data() {
      return {
        show1: true
      }
    },
  }
</script>

<style scoped lang="scss">
  .a-modal-example {
    @include fill-parent;
    .example-item {
      margin-bottom: 12px;
      padding-left: 12px;
    }
  }
</style>
