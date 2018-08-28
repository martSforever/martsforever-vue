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
                  :initialized-on-start="initializedOnStart"
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
        default: null,
        desc: '每个节点渲染所需要的数据'
      },
      activeIcon: {
        type: String,
        default: 'fa-minus-square-o',
        desc: '树展开的时候显示的图标',
      },
      inactiveIcon: {
        type: String,
        default: 'fa-plus-square-o',
        desc: "树收起的时候展示的图标"
      },
      show: {
        type: Boolean,
        default: false,
        desc: '是否展开'
      },
      optionsKey: {
        type: String,
        desc: '子树数据在props->data中的对象属性key',
      },
      renderFunc: {
        type: Function,
        desc: '支持两种自定义节点内容方式，这个是其中一种，通过渲染函数的方式进行，第一个参数为h，第二个参数为节点渲染所需要的数据',
      },
      isRoot: {
        type: Boolean,
        default: true,
        desc: '是否为根节点，这个属性是供a-tree内部使用的，实际业务开发的时候无需关注该属性',
      },
      initializedOnStart: {
        type: Boolean,
        desc: '是否在初始化的时候就渲染所有节点',
      }
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
        initialized: this.initializedOnStart || this.show
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
