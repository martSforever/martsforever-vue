<template>
  <div class="app-background">
    <a-title class="title">设置背景</a-title>
    <div class="content">
      <div class="example-list">
        <div class="example-item" v-for="item in examples" @click="changeBg(item)"><img :src="item.img" v-effect
                                                                                        class="img"></div>
      </div>
      <div>
        <button @click="loadBg">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import ATitle from "../../base/components/a-title/a-title";

  export default {
    components: {ATitle},
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
      .example-list {
        padding: 24px 0;
        background-color: rgba(255, 255, 255, 0.1);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        .example-item {
          width: 255px;
          height: 255px;
          padding: 0 12px;
          .img {
            @include fill-parent;
            border-radius: 6px;
            position: relative;
            top: 1px;
          }
        }
      }
    }
  }
</style>
