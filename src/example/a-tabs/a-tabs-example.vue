<template>
  <div class="a-tabs-example">
    <div style="margin-bottom: 6px">
      <a-button-group>
        <a-button @click="addTab">add tab</a-button>
        <a-button @click="removeTab">remove tab</a-button>
      </a-button-group>
    </div>
    <div class="content">
      <a-tabs ref="tabs"/>
    </div>
  </div>
</template>

<script>
  import ATabs from "../../base/components/a-tabs/a-tabs";
  import AButtonGroup from "../../base/components/a-button/a-button-group";
  import AButton from "../../base/components/a-button/a-button";

  import SomeBusinessTab from './some-business-tab'

  export default {
    name: "a-tabs-example",
    components: {AButton, AButtonGroup, ATabs},
    methods: {
      addTab() {
        this.$refs.tabs.addTab(SomeBusinessTab)
      },
      removeTab() {
        this.$refs.tabs.removeTab()
      },
    }
  }
</script>

<style lang="scss">
  .a-tabs-example {
    width: 100vw;
    height: 100vh;
    text-align: center;
    .content {
      display: inline-block;
      width: 800px;
      height: 500px;
      background-color: white;
      color: black;
    }
  }
</style>
