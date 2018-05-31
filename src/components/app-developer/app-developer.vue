<template xmlns:v-effect="http://www.w3.org/1999/xhtml">
  <div class="app-developer">
    <app-dev-head/>
    <!--<a-scrollbar>-->
      <transition name="fade-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    <!--</a-scrollbar>-->
  </div>
</template>

<script>
  import AppDevHead from "./app-dev-head";
  import AScrollbar from "../../base/components/a-scrollbar/a-scrollbar";

  export default {
    components: {
      AScrollbar,
      AppDevHead
    },
    name: "app-developer",
  }
</script>

<style scoped lang="scss">
  .app-developer {
    @include fill-parent;
  }
</style>
