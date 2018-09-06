<template>
  <a-radio active-icon="fa-compress"
           inactive-icon="fa-arrows-alt"
           :value="currentValue"
           @click.native="_handleClick"
           ref="radio"/>
</template>

<script>
  import {insertAfter} from "../../../script/dom";
  import Vue from 'vue'
  import ACollapseTransition from "../../a-collapse-transition/a-collapse-transition";

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
        let tempFunc = this.scopeSlotFunc
        let {row, rowIndex} = this
        let component = {
          render(h) {
            return (<tr>
              <td colSpan="99">
                <div>{tempFunc({row, rowIndex})}</div>
              </td>
            </tr>)
          },
        }
        const vueComponent = new Vue(component)
        this.instance = vueComponent.$mount()
        insertAfter(this.instance.$el, this.trEl)
        this.currentValue = true
        this.$emit('open', this)
      },
      close() {
        if (!this.currentValue) return
        this.trEl.parentNode.removeChild(this.instance.$el)
        this.instance.$destroy()
        this.currentValue = false
        this.$emit('close', this)
      },
    },
    destroyed() {
      this.close()
      this.$emit('destroyed', this)
    },
    mounted() {
      this.$emit('mounted', this)
      let trEl = this.$refs.radio.$el
      this.$nextTick(() => {
        while (!!trEl && trEl.tagName !== 'TR') {
          trEl = trEl.parentNode
        }
        this.trEl = trEl
      })
    },
  }
</script>
