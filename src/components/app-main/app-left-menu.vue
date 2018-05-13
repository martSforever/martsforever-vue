<template>
  <div class="app-left-menu">
    <div class="menu-header">
      <a-title><p>主菜单</p></a-title>
    </div>
    <div class="menu-body">
      <div v-for="row in [1,2,3,4,5,6,7,8]">
        <ul>
          <li v-for="(item,index) in menuList" class="menu-item">
            <a-iconfront :icon="item.icon" class="menu-icon"/>
            <label>{{item.name}}</label>
          </li>
        </ul>
      </div>
    </div>
    <div class="menu-footer">
      this is footer
    </div>
  </div>
</template>

<script>
  import ATitle from "../../base/components/a-title/a-title";
  import AIconfront from "../../base/components/a-iconfront/a-iconfront";

  export default {
    components: {
      AIconfront,
      ATitle
    },
    name: "app-left-menu",
    data() {
      return {
        menuList: []
      }
    },
    created() {
      this.menuList = this.menuList.concat([
        {name: '系统管理', icon: 'settingicon', url: ''},
        {name: '开发测试', icon: 'development', url: ''},
        {name: '用户管理', icon: 'users', url: ''},
        {name: '示例', icon: 'example', url: ''},
      ])
    },
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
      font-size $font-mid
      overflow-y auto
      .menu-item {
        height 32px
        padding: 0 25px
        display flex
        flex-direction row
        justify-content flex-start
        align-items center
        $transition-all();
        &:hover {
          background-color rgba(255, 255, 255, 0.2);
        }
        .menu-icon {
          margin-right 6px
        }
      }
    }
  }
</style>
