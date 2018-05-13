<template>
  <div class="app-main">
    <canvas class="canvas" ref="bgCanvasDom"></canvas>
    <app-head @on-logo-over="showMenu"/>
    <div class="content">
      <a-splitter ref="menu" left-width="200px">
        <div slot="left" @mouseleave="hideMenu" class="menu-wrapper">
          <app-left-menu/>
          <div>
            hahaha
          </div>
        </div>
        <div slot="content">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </div>
      </a-splitter>
    </div>
  </div>
</template>

<script>
  import AppHead from "./app-head";
  import ASplitter from "../../base/components/a-splitter/a-splitter";
  import AppLeftMenu from "./app-left-menu";
  import canvasbg from 'src/base/script/canvas-bg.js';

  export default {
    name: "app-main",
    components: {
      AppLeftMenu,
      ASplitter,
      AppHead
    },
    methods: {
      showMenu() {
        this.$refs.menu.showLeft();
      },
      hideMenu() {
        this.$refs.menu.showCenter();
      }
    },
    mounted() {
      this.hideMenu();
      canvasbg(this.$refs.bgCanvasDom, 'circleStar');
    },
  }
</script>

<style scoped lang="stylus">
  .app-main {
    $fill-window();
    .content {
      position absolute;
      top: $head-height
      bottom: 0
      left: 0
      right: 0
    }
    .menu-wrapper {
      $fill-parent();
    }
    .canvas {
      position absolute
      $fill-parent();
    }
  }
</style>
