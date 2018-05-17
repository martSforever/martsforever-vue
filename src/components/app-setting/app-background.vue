<template>
  <div class="app-background">
    <a-title class="title">设置背景</a-title>
    <div class="content">
      <a-row type="flex" justify="space-between" gutter="32">
        <a-col span="4" v-for="(item,index) in examples" :key="index">
          <div @click="changeBg(item)">
            <img :src="item.img" v-effect class="img">
          </div>
        </a-col>
      </a-row>
      <div class="confirm-wrapper">
        <a-button fa="fa-check" @click="loadBg" size="large" shape="round"/>
      </div>
    </div>
  </div>
</template>

<script>
  import ATitle from "../../base/components/a-title/a-title";
  import AButton from "../../base/components/a-button/a-button";
  import ARow from "../../base/components/a-grid/a-row";
  import ACol from "../../base/components/a-grid/a-col";

  export default {
    components: {
      ACol,
      ARow,
      AButton,
      ATitle
    },
    name: "app-background",
    data() {
      return {
        examples: [
          {name: '点与线', img: require('src/base/image/bg-example/bg1.png'), type: 'dotsAndLine'},
          {name: '点与线', img: require('src/base/image/bg-example/bg2.png'), type: 'square'},
          {name: '点与线', img: require('src/base/image/bg-example/bg3.png'), type: 'movedots'},
          {name: '点与线', img: require('src/base/image/bg-example/bg4.png'), type: 'starrySky'},
          {name: '点与线', img: require('src/base/image/bg-example/bg5.png'), type: 'hexagon'},
          {name: '点与线', img: require('src/base/image/bg-example/bg6.png'), type: 'circleStar'},
        ],
        currentType: '',
        selectType: '',
      }
    },
    created() {
      let appSetting = JSON.parse(window.localStorage.APP_SETTING);
      let type = appSetting.bgType;
      this.currentType = type ? type : 'dotsAndLine';
      this.selectType = this.currentType;
    },
    methods: {
      changeBg(item) {
        this.selectType = item.type;
      },
      loadBg() {
        let appSetting = JSON.parse(window.localStorage.APP_SETTING);
        appSetting.bgType = this.selectType;
        window.localStorage.APP_SETTING = JSON.stringify(appSetting);
        window.location.reload();
      }
    }
  }
</script>

<style scoped lang="scss">
  .app-background {
    padding: 24px;
    @include fill-parent;
    .title, .iconfont {
      font-size: 32px !important;
    }
    .content {
      width: calc(100% - 48px);
      border-radius: 6px;
      overflow-x: hidden;
      .img {
        width: 100%;
        height: auto;
        border-radius: 6px;
        position: relative;
        top: 1px;
      }
    }
    .confirm-wrapper {
      padding-top: 36px;
      text-align: center;
    }
  }
</style>
