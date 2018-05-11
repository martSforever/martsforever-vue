<template>
  <div class="app-head">
    <transition name="to-bottom">
      <div class="app-head-content" v-if="show">
        <div class="left">left</div>
        <div class="center">center</div>
        <div class="right">right</div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "app-head",
    data() {
      return {
        show: false
      }
    },
    mounted() {
      this.show = true;
    }
  }
</script>

<style scoped lang="stylus">
  .app-head {
    .app-head-content {
      display flex
      height head-height
      background-color: rgba(255, 255, 255, 0.1);
      position absolute
      top: 0
      left: 0
      right: 0
      .left, .center, .right {
        display inline-block
        height 100%
        font-size font-sm
      }
      .left {
        width 156px
      }
      .center {
        flex 1
      }
      .right {
        width 256px
      }
    }

  }
</style>
