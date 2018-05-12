<template>
  <div class="app-main">
    <app-head></app-head>
    <div class="content">
      <a-splitter ref="aSplitter" left-width="300px">
        <div slot="left">
          this is left
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

  export default {
    name: "app-main",
    components: {
      ASplitter,
      AppHead
    },
    methods: {}
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
  }
</style>
