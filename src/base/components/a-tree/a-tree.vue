<template>
  <div class="a-tree">
    <div class="a-tree-head" @click="toggle">
      <div class="indicator">
        <a-radio :active-icon="activeIcon"
                 :inactive-icon="inactiveIcon"
                 :value="!currentShow"
                 v-if="!!optionsKey && !!data[optionsKey]"/>
      </div>
      <div class="content">
        <slot :data="data"></slot>
      </div>
    </div>
    <a-collapse-transition v-if="!!optionsKey && !!data[optionsKey]">
      <div class="a-tree-option-wrapper" v-if="currentShow">
        <a-tree v-for="(item,index) in data[optionsKey]"
                :key="index"
                :data="item"
                :active-icon="activeIcon"
                :inactive-icon="inactiveIcon"
                :options-key="optionsKey">
          <slot :data="item"></slot>
        </a-tree>
      </div>
    </a-collapse-transition>
  </div>
</template>

<script>
  import ACollapseTransition from "../a-collapse-transition/a-collapse-transition";
  import ARadio from "../a-radio/a-radio";

  export default {
    name: "a-tree",
    components: {ARadio, ACollapseTransition},
    props: {
      data: {
        type: Object,
        default: null
      },
      activeIcon: {
        type: String,
        default: 'fa-plus-square-o',
      },
      inactiveIcon: {
        type: String,
        default: 'fa-minus-square-o'
      },
      show: {
        type: Boolean,
        default: false
      },
      optionsKey: {
        type: String,
      }
    },
    watch: {
      show(val) {
        if (this.currentShow !== val) this.currentShow = val
      },
      currentShow(val) {
        this.$emit('update:show', val)
      },
    },
    data() {
      return {
        currentShow: this.show
      }
    },
    methods: {
      toggle() {
        this.currentShow = !this.currentShow
      },
    }
  }
</script>

<style lang="scss">
  .a-tree {
    .a-tree-head {
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      margin-bottom: 12px;
      .indicator {
        width: 30px;
      }
    }
    .a-tree-option-wrapper {
      padding-left: 30px;
    }
  }
</style>
