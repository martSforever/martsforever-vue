<template>
  <div class="a-popper" :style="styles">
    <transition name="popper-scale">
      <div class="a-popper-content-wrapper" :class="popperWrapperClasses" v-show="currentValue">
        <div class="a-popper-arrow" :style="arrowStyles"></div>
        <div class="a-popper-content" ref="popperContent">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Popper from 'popper.js'
  import {findComponentUpward, oneOf} from "../../script/utils";
  import ACollapseTransition from "../a-collapse-transition/a-collapse-transition";

  export default {
    name: "a-popper",
    components: {ACollapseTransition},
    props: {
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
      },
      value: {
        type: Boolean,
        default: false
      },
      arrowSize: {
        type: Number,
        default: 20
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
        default: 'center',
        validator(val) {
          return oneOf(val, ['start', 'center', 'end'])
        },
      }
    },
    data() {
      return {
        popper: null,
        width: '',
        currentValue: this.value,

        currentDirection: this.direction,
        currentAlign: this.align,

        arrowTop: 0,
        arrowLeft: 0
      };
    },
    watch: {
      value(val) {
        if (this.currentValue !== val) {
          this.currentValue = val
          if (!!this.currentValue) this.update()
        }
      },
      currentValue(val) {
        this.$emit('input', val)
      },
      direction(val) {
        if (this.currentDirection !== val) {
          this.currentDirection = val
          !!this.popper && this.popper.destroy()
          this.popper = null
          !!this.currentValue && this.update()
        }
      },
      align(val) {
        if (this.currentAlign !== val) {
          this.currentAlign = val
          !!this.popper && this.popper.destroy()
          this.popper = null
          !!this.currentValue && this.update()
        }
      },
    },
    computed: {
      styles() {
        let style = {};
        if (this.width) style.width = `${this.width}px`;
        return style;
      },
      arrowStyles() {
        return {
          width: `${this.arrowSize}px`,
          height: `${this.arrowSize}px`,
          top: `${this.arrowTop}px`,
          left: `${this.arrowLeft}px`
        }
      },
      popperWrapperClasses() {
        return `scale-origin-${this.currentDirection}-${this.currentAlign}`
      },
    },
    methods: {
      update() {
        if (!!this.popper) {
          this.popper.update()
        } else {
          const parent = findComponentUpward(this, this.parentName)
          /*内容popper*/
          this.popper = new Popper(parent.$refs[this.referenceName], this.$el, {
            placement: `${this.currentDirection}-${this.currentAlign}`,
            modifiers: {
              offset: {
                offset: '0,20',
              }
            },
            onUpdate: () => {
              this.refreshArrow()
            },
            onCreate: () => {
              this.refreshArrow()
            }
          })
        }
      },
      refreshArrow() {
        let placement = this.popper.popper.getAttribute('x-placement');
        this.currentDirection = placement.split('-')[0];
        this.currentAlign = placement.split('-')[1];
        console.log(this.currentDirection, this.currentAlign)
      },
    },
    mounted() {
      this.currentValue && this.update()
    },
    beforeDestroy() {
      console.log('a-popper beforeDestroy execute')
    },

  }
</script>

<style lang="scss">
  .a-popper {
    display: inline-block;
    .a-popper-content-wrapper {
      position: relative;
      .a-popper-arrow {
        background-color: #0ac2ff;
        display: inline-block;
        position: absolute;
      }
    }
  }
</style>
