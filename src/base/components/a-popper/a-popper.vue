<template>
  <div class="a-popper" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
  import Popper from 'popper.js'
  import {getStyle} from "../../script/dom";
  import {findComponentUpward} from "../../script/utils";

  export default {
    name: "a-popper",
    props: {
      placement: {
        type: String,
        default: 'bottom-start'
      },
      className: {
        type: String
      },
      referenceName: {
        type: String,
        default: 'reference',
        required: true
      },
      parentName: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        popper: null,
        width: '',
        popperStatus: false
      };
    },
    computed: {
      styles() {
        let style = {};
        if (this.width) style.width = `${this.width}px`;
        return style;
      }
    },
    methods: {
      update() {
        if (!!this.popper) {
          this.popper.update()
        } else {
          const parent = findComponentUpward(this, this.parentName)
          this.popper = new Popper(parent.$refs[this.referenceName], this.$el, {
            placement: this.placement
          })
        }
      },
      destroy() {

      },
    },
    mounted() {
      this.update()
    },
    beforeDestroy() {
      console.log('beforeDestroy')
    },
  }
</script>

<style lang="scss">
  .a-popper {
    display: inline-block;
  }
</style>
