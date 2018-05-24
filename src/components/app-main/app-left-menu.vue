<template>
  <div class="app-left-menu" v-effect>
    <div class="menu-header">
      <a-title class="menu-title"><p>主菜单</p></a-title>
      <!--<button @click="add">add{{menuList.length}}</button>-->
    </div>
    <div class="menu-body">
      <a-scrollbar>
        <div v-for="row in rows">
          <ul>
            <li v-for="(item,index) in menuList" class="menu-item" @click="gotoMenu(item)">
              <a-icon :iconfont="item.icon" class="menu-icon"></a-icon>
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
  import AScrollbar from "../../base/components/a-scrollbar/a-scrollbar";
  import AIcon from "../../base/components/a-icon/a-icon";

  export default {
    components: {
      AIcon,
      AScrollbar,
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
      this.menuList.push({name: '开发测试', icon: 'development', url: '/developer'});
      this.menuList.push({name: '背景设置', icon: 'settingicon', url: '/appBackground'});
      this.menuList.push({name: '系统管理', icon: 'settingicon', url: '/appSystem'});
      this.menuList.push({name: '用户管理', icon: 'users', url: '/appUser'});
      this.menuList.push({name: '示例', icon: 'example', url: '/appExample'});
    },
    methods: {
      add() {
        // this.menuList.push({name: '系统管理', icon: 'settingicon', url: ''});
        this.rows.push(this.rows.length + 1);
      },
      gotoMenu(item) {
        this.$router.push(item.url);
      },
    }
  }
</script>

<style scoped lang="scss">
  .app-left-menu {
    @include fill-parent;
    .menu-header {
      .menu-title {
        font-size: 18px;
        font-weight: bold;
      }
      .iconfont {
        color: $text-color-main;
        font-size: 24px;
      }
    }
    border-right: solid 1px $text-color-deep;
    box-sizing: border-box;
    padding: 12px 0;
    display: flex;
    flex-direction: column;
    .menu-header, .menu-footer {
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: row;
      font-size: $font-size-large;
      font-weight: bold;
    }
    .menu-body {
      flex: 1;
      font-size: $font-size-base;
      overflow-y: hidden;
      .menu-item {
        height: 32px;
        padding: 0 25px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        @include transition-all;
        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
        .menu-icon {
          margin-right: 6px
        }
      }
    }
  }
</style>
