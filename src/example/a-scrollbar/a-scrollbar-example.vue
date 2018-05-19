<template>
  <div class="a-scrollbar-example">
    <div>
      <a-button-group shape="round" style="margin-bottom: 20px">
        <a-button @click="add">add</a-button>
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
      <!--   <div class="container">
           <a-scrollbar ref="scrollbarb">
             <div class="row" v-for="item in list">{{item}}</div>
           </a-scrollbar>
         </div>-->
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
      for (let i = 0; i < num; i++) {
        list.push({
          url: 'http://img3.redocn.com/tupian/20100113/xiaoliankatongxiangkuang_113352_small.jpg'
        });
      }
      return {
        list,
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
      height: 500px;
      width: 500px;
      background-color: #495a80;
      display: inline-block;
      .row {
        margin-bottom: 12px;
        background-color: blueviolet;
      }
    }
  }
</style>
