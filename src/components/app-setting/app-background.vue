<template>
  <div class="app-background">
    <a-title class="title">设置背景</a-title>
    <div class="content">
      <div class="example-list">
        <div class="example-item" v-for="item in examples" @click="changeBg(item)"><img :src="item.img" v-effect></div>
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
        ]
      }
    },
    methods: {
      changeBg(item) {
        let appSetting = JSON.parse(window.localStorage.APP_SETTING);
        appSetting.bgType = item.type;
        window.localStorage.APP_SETTING = JSON.stringify(appSetting);
        window.location.reload();
      }
    }
  }
</script>

<style scoped lang="stylus">
  .app-background {
    padding 24px
    $fill-parent();
    .title, .iconfront {
      font-size 32px !important
    }
    .content {
      padding 12px
      .example-list {
        display flex
        flex-direction row
        align-items center
        justify-content space-around
        flex-wrap nowrap
        .example-item {
          width: 255px
          height: 255px
          margin-right 12px
          img {
            $fill-parent();
            $prefix(border-radius, 6px);
          }
        }
      }
    }
  }
</style>
