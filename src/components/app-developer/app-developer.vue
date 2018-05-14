<template xmlns:v-effect="http://www.w3.org/1999/xhtml">
  <div class="app-developer">
    <app-dev-head/>
    <transition name="fade-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import AppDevHead from "./app-dev-head";

  export default {
    components: {AppDevHead},
    name: "app-developer",
  }
</script>

<style scoped lang="stylus">
  .app-developer {
    $fill-parent();
  }
</style>
