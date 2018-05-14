<template>
  <div class="app-dev-head">
    <ul class="menu-list">
      <li v-effect v-for="item in menuList" class="menu-item" @click="onMenuItemClick(item)">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "app-dev-head",
    data() {
      return {
        menuList: [
          {name: 'a-icon', url: 'aIconExample'},
          {name: 'a-input', url: 'aIconExample'},
          {name: 'a-button', url: 'aButtonExample'},
        ]
      }
    },
    methods: {
      onMenuItemClick(item) {
        this.$router.push(item.url);
      },
    }
  }
</script>

<style scoped lang="stylus">

  .app-dev-head {
    height 44px
    display flex
    flex-direction row
    align-items center
    justify-content: center
    .menu-list {
      display flex
      flex-direction row
      align-items center
      justify-content: center
      .menu-item {
        display inline-block
        background-color blueviolet
        color white
        padding 6px 12px
        margin-right 12px
      }
    }
  }

</style>
