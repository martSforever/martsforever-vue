<template>
  <a-radio active-icon="fa-compress"
           inactive-icon="fa-arrows-alt"
           :value="currentValue"
           @click.native="_handleClick"
           ref="radio"/>
</template>

<script>
  import {getParentTrEl, insertAfter} from "../../../../script/dom";
  import Vue from 'vue'
  import ACollapseTransition from "../../../a-collapse-transition/a-collapse-transition";

  export default {
    name: "a-table-column-collapse-item",
    components: {ACollapseTransition},
    props: {
      scopeSlotFunc: {
        type: Function
      },
      renderFunc: {
        type: Function
      },
      row: {},
      rowIndex: {},
    },
    data() {
      return {
        currentValue: false,
        trEl: null,
        show: false,
      }
    },
    methods: {
      _handleClick(e) {
        this.toggle(!this.currentValue)
      },
      toggle(flag = false) {
        this[!!flag ? 'open' : 'close']()
      },
      open() {
        if (!!this.currentValue) return
        this.instance = this._getInstance()
        this.currentValue = true
        this.$emit('open', this)
      },
      close() {
        if (!this.currentValue) return
        this.show = false
        this.instance.$on('close-transition-end', () => {
          this.trEl.parentNode.removeChild(this.instance.$el)
          this.instance.$destroy()
          this.currentValue = false
          this.$emit('close', this)
        })
      },
      _getInstance() {
        const vueComponent = new Vue({
          props: {parent: {default: () => this}},
          render(h) {
            return (<tr>
              <td colSpan="99">
                <a-collapse-transition onAfterLeave={this.handleTransitionEnd}>
                  <div v-show={this.parent.show}>
                    {this.parent.scopeSlotFunc({row: this.parent.row, rowIndex: this.parent.rowIndex})}
                  </div>
                </a-collapse-transition>
              </td>
            </tr>)
          },
          mounted() {
            /*组件挂载之后，触发折叠动画*/
            this.parent.show = true
          },
          methods: {
            handleTransitionEnd() {
              /*收起动画结束之后，对外发出结束事件*/
              if (!this.parent.show) this.$emit('close-transition-end')
            },
          },
        })
        const instance = vueComponent.$mount()
        insertAfter(instance.$el, this.trEl)
        return instance
      },
    },
    destroyed() {
      this.close()
      this.$emit('destroyed', this)
    },
    mounted() {
      this.$emit('mounted', this)
      this.trEl = getParentTrEl(this.$refs.radio.$el)
    },
  }
</script>
