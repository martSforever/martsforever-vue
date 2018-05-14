<template xmlns:v-effect="http://www.w3.org/1999/xhtml">
  <div class="app-developer">
    this is developer page
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: "app-developer",
  }
</script>

<style scoped lang="stylus">
  .app-developer {
    $fill-parent();
  }
</style>
