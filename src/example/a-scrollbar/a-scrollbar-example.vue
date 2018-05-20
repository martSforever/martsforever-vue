<template>
  <div class="a-scrollbar-example">
    <div>
      <a-button-group shape="round" style="margin-bottom: 20px">
        <a-button @click="add">add</a-button>
        <a-button @click="add2">add2</a-button>
        <a-button @click="remove">remove</a-button>
        <a-button @click="update">update</a-button>
        <a-button @click="toggleIf">toggleIf</a-button>
      </a-button-group>
    </div>
    <div>
      <div class="container" v-if="showScrollBar">
        <a-scrollbar ref="scrollbara" :scroll-bar-size="scrollbarSize">
          <div class="row" v-for="(item,index) in list">
            {{index}}
            <img :src="item.url"/>
          </div>
        </a-scrollbar>
      </div>
      <div class="container" v-if="showScrollBar">
        <a-scrollbar ref="scrollbara" :scroll-bar-size="scrollbarSize">
          <div class="row" v-for="(item,index) in list2">
            {{index}}
            <img :src="item.url"/>
          </div>
        </a-scrollbar>
      </div>
      <div class="container" v-if="showScrollBar">
        <a-scrollbar ref="scrollbar" :scroll-bar-size="scrollbarSize">
          <div class="col" v-for="(item,index) in list">
            <img :src="item.url"/>
            {{index}}
          </div>
        </a-scrollbar>
      </div>

    </div>
  </div>
</template>

<script>
  import AScrollbar from "../../base/components/a-scrollbar/a-scrollbar";
  import AButtonGroup from "../../base/components/a-button/a-button-group";
  import AButton from "../../base/components/a-button/a-button";

  export default {
    components: {
      AButton,
      AButtonGroup,
      AScrollbar
    },
    name: "a-scrollbar-example",
    data() {
      let num = 20;
      let list = [];
      let list2 = [];
      for (let i = 0; i < num; i++) {
        list.push({
          url: 'http://img3.redocn.com/tupian/20100113/xiaoliankatongxiangkuang_113352_small.jpg'
        });
      }
      list2.push(list[0]);
      list2.push(list[1]);
      return {
        list,
        list2,
        scrollbarSize: 6,
        showScrollBar: true
      }
    },
    methods: {
      add() {
        this.list.push({
          url: `http://img3.redocn.com/tupian/20100113/xiaoliankatongxiangkuang_113352_small.jpg?time=${this.getTime()}`
        });
      },
      add2() {
        this.list2.push({
          url: `http://img3.redocn.com/tupian/20100113/xiaoliankatongxiangkuang_113352_small.jpg?time=${this.getTime()}`
        });
      },
      remove() {
        this.list.splice(0, 1);
      },
      update() {
        this.$refs.scrollbara.update();
      },
      toggleIf() {
        this.showScrollBar = !this.showScrollBar;
      },
      getTime() {
        return new Date().getTime();
      },
    }
  }
</script>

<style scoped lang="scss">
  .a-scrollbar-example {
    @include fill-parent;
    @include flex-center;
    flex-direction: column;
    .container {
      height: 360px;
      width: 400px;
      background-color: #495a80;
      display: inline-block;
      .row {
        margin-bottom: 12px;
        background-color: blueviolet;
        width: 600px;
      }
      .col {
        display: inline-block;
        width: max-content;
      }
    }
  }
</style>
