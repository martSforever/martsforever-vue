<template>
  <div class="a-popper">
    <transition name="popper-scale">
      <div class="a-popper-content-wrapper" :class="popperWrapperClasses" v-show="currentValue"
           :style="wrapperStyles">
        <div class="a-popper-arrow" :style="arrowStyles"></div>
        <div class="a-popper-content" ref="popperContent" :style="popoverContentStyles">
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
      },
      shadow: {
        type: String,
        default: '0px 0px 20px #f2f2f2'
      },
      borderRadius: {
        type: String,
        default: '3px'
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
      wrapperStyles() {
        let styles = {};
        return styles;
      },
      arrowStyles() {
        let styles = {
          width: `${this.arrowSize}px`,
          height: `${this.arrowSize}px`,
          transform: 'rotate(45deg)',
        }
        !!this.borderRadius && (styles.borderRadius = this.borderRadius)
        !!this.shadow && (styles.boxShadow = this.shadow)

        switch (this.currentDirection) {
          case 'top':
            styles.bottom = `${-this.arrowSize / 2 + this.arrowSize / 5}px`
            switch (this.currentAlign) {
              case 'start':
                styles.left = `${this.arrowSize / 2}px`
                break
              case 'center':
                styles.left = `${(this.$el.offsetWidth - (this.arrowSize * Math.sqrt(2))) / 2}px`
                break
              case 'end':
                styles.right = `${this.arrowSize / 2}px`
                break
            }
            break
          case 'bottom':
            styles.top = `${-this.arrowSize / 2 + this.arrowSize / 5}px`
            switch (this.currentAlign) {
              case 'start':
                styles.left = `${this.arrowSize / 2}px`
                break
              case 'center':
                styles.left = `${(this.$el.offsetWidth - (this.arrowSize * Math.sqrt(2))) / 2}px`
                break
              case 'end':
                styles.right = `${this.arrowSize / 2}px`
                break
            }
            break
          case 'left':
            styles.right = `${-this.arrowSize / 2 + this.arrowSize / 5}px`
            switch (this.currentAlign) {
              case 'start':
                styles.top = `${this.arrowSize / 2}px`
                break
              case 'center':
                styles.top = `${(this.$el.offsetWidth - (this.arrowSize * Math.sqrt(2))) / 2}px`
                break
              case 'end':
                styles.bottom = `${this.arrowSize / 2}px`
                break
            }
            break
          case 'right':
            styles.left = `${-this.arrowSize / 2 + this.arrowSize / 5}px`
            switch (this.currentAlign) {
              case 'start':
                styles.top = `${this.arrowSize / 2}px`
                break
              case 'center':
                styles.top = `${(this.$el.offsetWidth - (this.arrowSize * Math.sqrt(2))) / 2}px`
                break
              case 'end':
                styles.bottom = `${this.arrowSize / 2}px`
                break
            }
            break
        }


        return styles
      },
      popoverContentStyles() {
        let styles = {}
        !!this.width && (styles.width = `${this.width}px`)
        !!this.shadow && (styles.boxShadow = this.shadow)
        !!this.borderRadius && (styles.borderRadius = this.borderRadius)
        return styles
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
          console.log('new Popper')
          this.popper = new Popper(parent.$refs[this.referenceName], this.$el, {
            placement: `${this.currentDirection}-${this.currentAlign}`,
            modifiers: {
              offset: {
                offset: `0,${this.arrowSize}`,
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
    background: transparent;
    display: inline-block;
    .a-popper-content-wrapper {
      background: transparent;
      position: relative;
      .a-popper-content {
        overflow: hidden;
      }
      .a-popper-arrow {
        background-color: white;
        display: inline-block;
        position: absolute;
        z-index: -1;
      }
    }
  }
</style>
