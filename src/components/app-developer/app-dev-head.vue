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
          // {name: 'icon', url: 'aIconExample'},
          {name: 'input', url: 'aInputExample'},
          {name: 'button', url: 'aButtonExample'},
          // {name: 'grid', url: 'aGridExample'},
          {name: 'scrollbar', url: 'aScrollbarExample'},
          // {name: 'textarea', url: 'aTextareaExample'},
          {name: 'carousel', url: 'aCarouselExample'},
          // {name: 'switch', url: 'aSwitchExample'},
          {name: 'modal', url: 'aModal'},
          {name: 'radio', url: 'aRadio'},
          {name: 'popover', url: 'popover'},
          {name: 'collapse', url: 'collapse'},
          {name: 'canvas', url: 'canvas'},
          {name: 'select', url: 'aSelect'},
          {name: 'dropdown', url: 'aDropDown'},
          {name: 'time-picker', url: 'time-picker'},
          {name: 'date-picker', url: 'date-picker'},
          {name: 'tabs', url: 'tabs'},
          {name: 'i18n', url: 'i18n'},
          // {name: 'test', url: 'test'},
          // {name: 'avatar', url: 'avatar'},
          {name: 'tree', url: 'tree'},
          {name: 'tag', url: 'tag'},
          {name: 'a-move', url: 'a-move'},
          {name: 'notice', url: 'notice'},
          {name: 'scopedslot', url: 'scopedslot'},
          {name: 'table', url: 'table'},
          {name: 'table-edit', url: 'table-edit'},
          {name: 'auto-table', url: 'auto-table'},
          {name: 'parent-child', url: 'parent-child'},
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
