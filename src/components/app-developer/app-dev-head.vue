<template>
  <div class="app-dev-head">
    <a-button-group shape="round">
      <a-button v-for="(item,index) in menuList" :key="index" class="menu-item" @click="onMenuItemClick(item)"
                :class="{'active-btn':item.name === name}">{{item.name}}
      </a-button>
    </a-button-group>
  </div>
</template>

<script>
  import AButtonGroup from "../../base/components/a-button/a-button-group";
  import AButton from "../../base/components/a-button/a-button";

  export default {
    components: {
      AButton,
      AButtonGroup
    },
    name: "app-dev-head",
    data() {
      return {
        menuList: [
          {name: 'a-icon', url: 'aIconExample'},
          {name: 'a-input', url: 'aInputExample'},
          {name: 'a-button', url: 'aButtonExample'},
        ],
        name: 'a-icon'
      }
    },
    methods: {
      onMenuItemClick(item) {
        this.name = item.name;
        this.$router.push(item.url);
      },
    }
  }
</script>

<style scoped lang="scss">

  .app-dev-head {
    height: 44px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .active-btn {
      background-color: $text-color-main;
    }
  }

</style>
