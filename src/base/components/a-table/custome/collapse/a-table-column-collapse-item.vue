<template>
  <a-radio active-icon="fa-compress"
           inactive-icon="fa-arrows-alt"
           :value="currentValue"
           @click.native="_handleClick"
           ref="radio"/>
</template>

<script>
  import {insertAfter} from "../../../../script/dom";
  import Vue from 'vue'
  import ACollapseTransition from "../../../a-collapse-transition/a-collapse-transition";
  import {findComponentUpward} from "../../../../script/utils";

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
        show: false,
        table: null,
        instances: []
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
        this.centerCollapse = this._getInstance('center')
        this.leftCollapse = this._getInstance('left')

        this.currentValue = true
        this.$emit('open', this)
      },
      close() {
        if (!this.currentValue) return
        this.show = false

        this.centerCollapse.instance.$on('close-transition-end', () => {
          this.centerCollapse.parentNode.removeChild(this.centerCollapse.instance.$el)
          this.centerCollapse.instance.$destroy()
          if (!!this.leftCollapse) {
            this.leftCollapse.instance.$on('close-transition-end', () => {
              this.leftCollapse.parentNode.removeChild(this.leftCollapse.instance.$el)
              this.leftCollapse.instance.$destroy()
              this.currentValue = false
              this.$emit('close', this)
            })
          } else {
            this.currentValue = false
            this.$emit('close', this)
          }
        })

      },
      _getInstance(fixedPosition) {
        if (!!this.table.tableRow[fixedPosition]) {
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
          insertAfter(instance.$el, this.table.tableRow[fixedPosition][this.rowIndex].$refs.tr)
          return {
            instance,
            parentNode: this.table.tableRow[fixedPosition][this.rowIndex].$refs.tr.parentNode
          }
        }
        return null
      },
    },
    beforeDestroy() {
      this.close()
    },
    destroyed() {
      this.$emit('destroyed', this)
    },
    mounted() {
      this.$emit('mounted', this)
      this.table = findComponentUpward(this, 'a-table')
    },
  }
</script>
