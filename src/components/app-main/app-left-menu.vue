<template>
  <div class="app-left-menu" v-effect>
    <div class="menu-header">
      <a-title><p>主菜单</p></a-title>
      <!--<button @click="add">add{{menuList.length}}</button>-->
    </div>
    <div class="menu-body">
      <a-scrollbar :data="rows">
        <div v-for="row in rows">
          <ul>
            <li v-for="(item,index) in menuList" class="menu-item">
              <!--{{row}}-->
              <a-iconfront :icon="item.icon" class="menu-icon"/>
              <label>{{item.name}}</label>
            </li>
          </ul>
        </div>
      </a-scrollbar>
    </div>
    <div class="menu-footer">
      this is footer
    </div>
  </div>
</template>

<script>
  import ATitle from "../../base/components/a-title/a-title";
  import AIconfront from "../../base/components/a-iconfront/a-iconfront";
  import AScrollbar from "../../base/components/a-scrollbar/a-scrollbar";

  export default {
    components: {
      AScrollbar,
      AIconfront,
      ATitle
    },
    name: "app-left-menu",
    data() {
      return {
        menuList: [],
        rows: [1, 2, 3, 4, 5, 6, 7, 8],
      }
    },
    created() {
      this.menuList.push({name: '系统管理', icon: 'settingicon', url: ''});
      this.menuList.push({name: '开发测试', icon: 'development', url: ''});
      this.menuList.push({name: '用户管理', icon: 'users', url: ''});
      this.menuList.push({name: '示例', icon: 'example', url: ''});
    },
    methods: {
      add() {
        // this.menuList.push({name: '系统管理', icon: 'settingicon', url: ''});
        this.rows.push(this.rows.length + 1);
      },
    }
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

      overflow-y hidden
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
