<template>
  <div class="a-scrollbar-example">
    <div>
      <a-button-group shape="round" style="margin-bottom: 20px">
        <a-button @click="add">add</a-button>
        <a-button @click="update">update</a-button>
      </a-button-group>
    </div>
    <div>
      <div class="container">
        <a-scrollbar ref="scrollbara" :scroll-bar-size="scrollbarSize">
          <div class="row" v-for="item in list">{{item}}</div>
        </a-scrollbar>
      </div>
      <div class="container">
        <a-scrollbar ref="scrollbarb">
          <div class="row" v-for="item in list">{{item}}</div>
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
      AScrollbar},
    name: "a-scrollbar-example",
    data() {
      let num = 20;
      let list = [];
      for (var i = 0; i < num; i++) {
        list.push(i);
      }
      return {
        list,
        scrollbarSize:12
      }
    },
    methods:{
      add(){
          this.list.push(this.list.length);
      },
      update(){
          this.$refs.scrollbara.update();
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
        height: 32px;
        margin-bottom: 12px;
        background-color: blueviolet;
      }
    }
  }
</style>
