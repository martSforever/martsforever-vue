<template>
  <div class="app-main">
    <app-head></app-head>
    <div class="content">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import AppHead from "./app-head";

  export default {
    name: "app-main",
    components: {AppHead}
  }
</script>

<style scoped lang="stylus">
  .app-main {
    fill-window();
    .content {
      position absolute;
      top: head-height
    }
  }
</style>
