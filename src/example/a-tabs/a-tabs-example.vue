<template>
  <div class="a-tabs-example">
    <div style="margin-bottom: 6px">
      <a-button-group>
        <a-button @click="addTabByChangeList">addTabByChangeList</a-button>
        <a-button @click="removeTabByChangeList">removeTabByChangeList</a-button>
        <a-button @click="addTab">addTab</a-button>
        <a-button @click="removeTab">removeTab</a-button>
      </a-button-group>
      <div>a-tabs-example-->>{{tabIndex}}</div>
    </div>
    <div class="content">
      <a-tabs ref="tabs" v-model="tabIndex">
        <a-tab classes="item-cls"
               :title="item.name"
               :name="item.name+'code'"
               v-for="(item,index) in list"
               :styles="{backgroundColor:item.color}"
               :initialized.sync="item.init"
               :key="index">
          <div>{{item.name}}--{{index}}</div>
          <some-business-sub-content :name="item.name"/>
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
  import SomeBusinessSubContent from "./some-business-sub-content";
  import InvalidTab from "./invalid-tab";

  export default {
    name: "a-tabs-example",
    components: {SomeBusinessSubContent, ATab, AButton, AButtonGroup, ATabs},
    data() {
      return {
        tabIndex: 3,
        list: [
          {name: '西红柿', color: '#abf', init: false},
          {name: '牙膏', color: '#ff7261', init: false},
          {name: '奶茶', color: '#598dff', init: false},
          {name: '炸酱面', color: '#4effbc', init: false},
          {name: '烧烤摊', color: '#ff24ad', init: false},
        ],
      }
    },
    methods: {
      addTabByChangeList() {
        this.list.push({name: '果冻', color: '#ff9950'},)
        this.$nextTick(() => this.$refs.tabs.openTab(this.list.length - 1))
      },
      removeTabByChangeList() {
        // this.$refs.tabs.removeTab()
        this.list.pop()
      },
      addTab() {
        this.addInstance = this.$refs.tabs.addTab(SomeBusinessTab)
        this.$nextTick(() => this.$refs.tabs.openTab(this.$refs.tabs.tabLabels.length - 1))

      },
      removeTab() {
        this.$refs.tabs.removeTab(this.addInstance)
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
