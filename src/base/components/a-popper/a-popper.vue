<template>
  <div class="a-popper">
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
        const parent = findComponentUpward(this, this.parentName)

        if (!!this.popper) {
          this.$nextTick(() => {
            this.popper.update();
            this.popperStatus = true;
          });
        } else {
          this.$nextTick(() => {
            console.log('a-popper parent-->>', parent.$options.name, this.referenceName, parent.$refs[this.referenceName])
            this.popper = new Popper(
              parent.$refs[this.referenceName],
              this.$el,
              {
                placement: this.placement,
                modifiers: {
                  computeStyle: {
                    gpuAcceleration: false
                  },
                  preventOverflow: {
                    boundariesElement: 'window'
                  }
                },
                onCreate: () => {
                  this.resetTransformOrigin();
                  this.$nextTick(this.popper.update());
                },
                onUpdate: () => {
                  this.resetTransformOrigin();
                }
              }
            )
          })
        }
        // set a height for parent is Modal and Select's width is 100%
        if (parent.$options.name === 'iSelect') {
          this.width = parseInt(getStyle(parent.$el, 'width'));
        }
      },
      destroy() {
        if (this.popper) {
          setTimeout(() => {
            if (this.popper && !this.popperStatus) {
              this.popper.destroy();
              this.popper = null;
            }
            this.popperStatus = false;
          }, 300);
        }
      },
      resetTransformOrigin() {
        // 不判断，Select 会报错，不知道为什么
        if (!this.popper) return;

        let x_placement = this.popper.popper.getAttribute('x-placement');
        let placementStart = x_placement.split('-')[0];
        let placementEnd = x_placement.split('-')[1];
        const leftOrRight = x_placement === 'left' || x_placement === 'right';
        if (!leftOrRight) {
          this.popper.popper.style.transformOrigin = placementStart === 'bottom' || (placementStart !== 'top' && placementEnd === 'start') ? 'center top' : 'center bottom';
        }
      }
    },
    created() {
      this.$on('on-update-popper', this.update);
      this.$on('on-destroy-popper', this.destroy);
      this.update()
    },
    beforeDestroy() {
      if (this.popper) {
        this.popper.destroy();
      }
    }
  }
</script>

<style lang="scss">
  .a-popper {
    display: inline-block;
  }
</style>
