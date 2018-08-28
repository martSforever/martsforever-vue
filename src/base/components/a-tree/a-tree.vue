<template>
  <div class="a-tree">
    <div class="a-tree-content-wrapper" @click="toggle">
      <div class="icon-wrapper">
        <a-radio
          :disabled="true"
          :active-icon="activeIcon"
          :inactive-icon="inactiveIcon"
          :value="currentShow || !(!!optionsKey && !!data[optionsKey] && data[optionsKey].length>0)"/>
      </div>
      <node-content/>
    </div>
    <a-collapse-transition>
      <div class="a-tree-options-wrapper"
           v-show="!!optionsKey && !!data[optionsKey] && data[optionsKey].length>0 && currentShow">
        <div v-if="initialized">
          <a-tree v-for="(item,index) in data[optionsKey]"
                  :key="index"
                  :data="item"
                  :is-root="false"
                  :options-key="optionsKey"
                  :active-icon="activeIcon"
                  :inactive-icon="inactiveIcon"
                  :render-func="renderFunc"/>
        </div>
      </div>
    </a-collapse-transition>
  </div>
</template>

<script>
  import ACollapseTransition from "../a-collapse-transition/a-collapse-transition";
  import ARadio from "../a-radio/a-radio";
  import {findComponentUpward} from "../../script/utils";

  export default {
    name: "a-tree",
    components: {
      ARadio,
      ACollapseTransition,
      NodeContent: {
        render(h) {
          let tree = this.$parent
          return (
            <div class="a-tree-node-content">
              {!!tree.renderFunc && (tree.renderFunc.call(tree._renderProxy, h, tree.data))}
              {!!tree.root.$scopedSlots.default && tree.root.$scopedSlots.default(tree.data)}
            </div>
          )
        },
      }
    },
    props: {
      data: {
        default: null
      },
      activeIcon: {
        type: String,
        default: 'fa-minus-square-o',
      },
      inactiveIcon: {
        type: String,
        default: 'fa-plus-square-o'
      },
      show: {
        type: Boolean,
        default: false
      },
      optionsKey: {
        type: String,
      },
      renderFunc: {
        type: Function,
      },
      isRoot: {
        type: Boolean,
        default: true
      },
    },
    watch: {
      show(val) {
        if (this.currentShow !== val) this.currentShow = val
      },
      currentShow(val) {
        this.$emit('update:show', val)
        if (!this.initialized && !!val) this.initialized = true
      },
    },
    data() {
      return {
        root: null,
        currentShow: this.show,
        initialized: this.show
      }
    },
    methods: {
      toggle() {
        if (!this.currentShow) this.initialized = true
        this.$nextTick(() => {
          !!this.currentShow ?
            this._close()
            :
            this._open()
        })
      },
      _open() {
        this.currentShow = true
      },
      _close() {
        this.currentShow = false
      },
    },
    created() {
      console.log('created')
      let parent = findComponentUpward(this, 'a-tree')
      this.root = !!this.isRoot ? this : parent.root
    },
    destroyed() {
      console.log('destroyed')
    },
  }
</script>

<style lang="scss">
  .a-tree {
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0;
    }
    .a-tree-content-wrapper {
      cursor: pointer;
      display: inline-block;
      .icon-wrapper {
        width: 30px;
        display: inline-block;
      }
      .a-tree-node-content {
        display: inline-block;
      }
    }
    .a-tree-options-wrapper {
      padding-left: 30px;
      margin-top: 12px;
    }
  }
</style>
