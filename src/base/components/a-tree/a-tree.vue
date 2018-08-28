<template>
  <div class="a-tree">
    <div class="a-tree-content-wrapper">
      <div class="icon-wrapper">
        <a-radio
          @click.native="toggle"
          :disabled="true"
          :active-icon="activeIcon"
          :inactive-icon="inactiveIcon"
          :value="currentShow || !(!!childKey && !!data[childKey] && data[childKey].length>0)"/>
      </div>
      <div class="check-wrapper" v-if="!!checkKey">
        <a-radio
          @change="_handleCheckChange"
          :active-icon="checkedIcon"
          :inactive-icon="uncheckedIcon"
          v-model="data[checkKey]"
        />
      </div>
      <node-content @click.native="_handleClickNodeContent"/>
    </div>
    <a-collapse-transition>
      <div class="a-tree-options-wrapper"
           v-show="!!childKey && !!data[childKey] && data[childKey].length>0 && currentShow">
        <div v-if="initialized">
          <a-tree v-for="(item,index) in data[childKey]"
                  :key="index"
                  :data="item"
                  :is-root="false"
                  :child-key="childKey"
                  :active-icon="activeIcon"
                  :inactive-icon="inactiveIcon"
                  :initialized-on-start="initializedOnStart"
                  :before-open="beforeOpen"
                  :render-func="renderFunc"
                  :open-on-start="openOnStart"
                  :checkKey="checkKey"/>
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
      checkedIcon: {
        type: String,
        default: 'fa-check-square',
        desc: '复选框激活图标',
      },
      uncheckedIcon: {
        type: String,
        default: 'fa-square-o',
        desc: '复选框为选中图标'
      },
      childKey: {
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
      },
      beforeOpen: {
        type: Function,
        desc: '在打开之前触发的动作，可以用来延迟加载数据',
      },
      openOnStart: {
        type: Boolean,
        default: false,
        desc: '是否在初始化的时候就打开所有节点',
      },
      openOnClickContent: {
        type: Boolean,
        default: true,
        desc: '是否在点击tree节点的时候，展开或者收缩节点树内容'
      },
      checkKey: {
        type: String,
        desc: '该属性的值为复选框是否选中所绑定的data的属性key，只有该属性不为空的时候，才会显示复选框'
      }
    },
    watch: {
      currentShow(val) {
        this.$emit('update:show', val)
        if (!this.initialized && !!val) this.initialized = true
      },
    },
    data() {
      let currentShow = this.openOnStart
      return {
        root: null,                                                     //根节点
        currentShow,                                                    //展开收起状态
        initialized: this.initializedOnStart || currentShow,            //是否已经初始化树内容
      }
    },
    methods: {
      /*点击节点事件*/
      _handleClickNodeContent() {
        !!this.openOnClickContent && this.toggle()
      },
      /*复选框改产触发动作*/
      _handleCheckChange(checked) {
        /*将子节点全部重设*/
        if (!!this.data && !!this.childKey && !!this.data[this.childKey] && this.data[this.childKey].length > 0) {
          let _this = this

          function iterate(array) {
            if (!!array && array.length > 0)
              array.forEach((item) => {
                item.setBindingPrototype(_this.checkKey, checked)
                iterate(item[_this.childKey])
              })
          }

          iterate(this.data[this.childKey])
        }
        /*选中子节点的花，将父节点也选中*/
        if (!!checked) {
          let parent = this.parent
          while (!!parent) {
            parent.data.setBindingPrototype(this.checkKey, true)
            console.log(parent.data.name)
            parent = parent.parent
          }
        }
      },
      /*展开收起树节点内容*/
      toggle() {
        if (!this.currentShow) this.initialized = true
        this.$nextTick(() => {
          !!this.currentShow ?
            this._close()
            :
            this._open()
        })
      },
      /*打开节点内容*/
      _open() {
        if (!!this.beforeOpen) {
          this.beforeOpen(this.data, () => {
            this.currentShow = true
          })
        } else
          this.currentShow = true
      },
      /*收起节点内容*/
      _close() {
        this.currentShow = false
      },
    },
    created() {
      console.log('created')
      let parentTree = this.$parent.$parent
      this.root = !!this.isRoot ? this : parentTree.root
      this.parent = !!this.isRoot ? null : parentTree
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
      .icon-wrapper, .check-wrapper {
        display: inline-block;
      }
      .icon-wrapper {
        width: 30px;
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
