<template>
  <div class="a-tabs-example">
    <div style="margin-bottom: 6px">
      <a-button-group>
        <a-button @click="addTab">add tab</a-button>
        <a-button @click="removeTab">remove tab</a-button>
      </a-button-group>
    </div>
    <div class="content">
      <a-tabs ref="tabs">
        <a-tab classes="item-cls"
               :title="item.name"
               :name="item.name+'code'"
               v-for="(item,index) in list"
               :styles="{backgroundColor:item.color}"
               :key="index">
          <div>{{item.name}}--{{index}}</div>
        </a-tab>
      </a-tabs>
    </div>
  </div>
</template>

<script>
  import ATabs from "../../base/components/a-tabs/a-tabs";
  import AButtonGroup from "../../base/components/a-button/a-button-group";
  import AButton from "../../base/components/a-button/a-button";

  import SomeBusinessTab from './some-business-tab'
  import ATab from "../../base/components/a-tabs/a-tab";

  export default {
    name: "a-tabs-example",
    components: {ATab, AButton, AButtonGroup, ATabs},
    data() {
      return {
        list: [
          {name: '西红柿', color: '#abf'},
          {name: '牙膏', color: '#ff7261'},
          {name: '奶茶', color: '#598dff'},
          {name: '炸酱面', color: '#4effbc'},
          {name: '烧烤摊', color: '#ff24ad'},
        ],
      }
    },
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
