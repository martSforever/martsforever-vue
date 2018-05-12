<template>
  <div class="app-left-menu">
    <div class="menu-header">
      <p>主菜单</p>
    </div>
    <div class="menu-body">
      this is body
    </div>
    <div class="menu-footer">
      this is footer
    </div>
  </div>
</template>

<script>
  export default {
    name: "app-left-menu"
  }
</script>

<style scoped lang="stylus">
  .app-left-menu {
    $fill-parent();
    border-right solid 1px $font-color-deep
    box-sizing border-box
    padding: 12px 0px
    display flex
    flex-direction column
    .menu-header, .menu-footer {
      height 44px
      display flex
      align-items center
      justify-content: flex-start
      flex-direction row
      font-size $font-big
      font-weight bold
    }
    .menu-body {
      flex: 1
    }
  }
</style>
