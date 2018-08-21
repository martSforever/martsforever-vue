<template>
  <div class="a-dropdown">
    <div ref="reference"
         @click="_handleClickReference"
         @mouseenter="_handleMouseEnter('reference')"
         @mouseleave="_handleMouseLeave('reference')"
         class="a-dropdown-reference">
      <slot></slot>
    </div>
    <a-popover
      parent-name="a-dropdown"
      reference-name="reference"
      v-model="currentShow"
      @mouseenter.native="_handleMouseEnter('popover')"
      @mouseleave.native="_handleMouseLeave('popover')"
      :align="align"
      :direction="direction"
      :show-arrow="showArrow">
      <div class="a-dropdown-content">
        <slot name="dropdown"></slot>
      </div>
    </a-popover>
  </div>
</template>

<script>
  import APopover from "../a-popover/a-popover";
  import {oneOf} from "../../script/utils";

  const TRIGGER_HOVER = 'hover'
  const TRIGGER_CLICK = 'click'

  export default {
    name: "a-dropdown",
    components: {APopover},
    props: {
      trigger: {
        type: String,
        default: TRIGGER_HOVER,
        validator(val) {
          return oneOf(val, [TRIGGER_HOVER, TRIGGER_CLICK])
        },
      },
      show: {
        type: Boolean,
        default: false
      },
      direction: {
        type: String,
        default: 'bottom',
        validator(val) {
          return oneOf(val, ['top', 'bottom', 'left', 'right'])
        },
      },
      align: {
        type: String,
        default: 'start',
        validator(val) {
          return oneOf(val, ['start', 'center', 'end'])
        },
      },
      showArrow: {
        type: Boolean,
        default: true
      },
      tag: null
    },
    data() {
      return {
        currentShow: this.show,
        timer: null,
      }
    },
    methods: {
      _handleClickReference() {
        this.trigger === TRIGGER_CLICK && (this.currentShow = true)
      },
      _handleMouseEnter(type) {
        if (this.trigger !== TRIGGER_HOVER) return
        if (!!this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
        this.timer = setTimeout(() => {
          this.currentShow = true
        }, 100)
      },
      _handleMouseLeave(type) {
        if (this.trigger !== TRIGGER_HOVER) return
        if (!!this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
        this.timer = setTimeout(() => {
          this.currentShow = false
        }, 100)
      },
    }
  }
</script>

<style lang="scss">
  .a-dropdown {
    .a-dropdown-reference {
      display: block;
    }
    .a-dropdown-content {
      background-color: white;
      padding: 12px 0;
    }
  }
</style>
