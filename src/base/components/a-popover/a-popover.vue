<template>
  <div class="a-popper">
    <transition name="popper-scale">
      <div class="a-popper-content-wrapper" :class="popperWrapperClasses" v-show="currentValue"
           v-clickout-side="_handleClickOutside">
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
    name: "a-popover",
    components: {ACollapseTransition},
    props: {
      referenceName: {
        type: String,
        default: 'reference',
        required: true,
        desc: '要引用的对象的$refs的名称',
      },
      parentName: {
        type: String,
        required: true,
        desc: '父引用组件名，因为reference是从父引用组件的$refs中寻找的，所以而a-popper不一定在父引用组件的根节点下，所以这里需要指定父引用节点名称',
      },
      value: {
        type: Boolean,
        default: false,
        desc: '双向绑定的数据，是否显示popover',
      },
      arrowSize: {
        type: Number,
        default: 20,
        desc: '小三角大小，默认单位为px',
      },
      direction: {
        type: String,
        default: 'bottom',
        desc: '位置，有四种选择：上下左右',
        validator(val) {
          return oneOf(val, ['top', 'bottom', 'left', 'right'])
        },
      },
      align: {
        type: String,
        default: 'center',
        desc: '对其方式，如果direction是上或者下，那对其方式start、center、end对应为左对齐，居中对其以及右对齐，反之为顶部对其、居中对其以及底部对其',
        validator(val) {
          return oneOf(val, ['start', 'center', 'end'])
        },
      },
      shadow: {
        type: String,
        default: '0px 0px 20px #f2f2f2',
        desc: '阴影',
      },
      borderRadius: {
        type: String,
        default: '3px',
        desc: '边框圆角'
      },
      hideOnClickOutside: {
        type: Boolean,
        default: true,
        desc: '是否在点击popover外部元素的时候，关闭popover'
      },
      sizeEqual: {
        type: Boolean,
        default: true,
        desc: '是否令popper与reference在方向上宽度一致'
      }
    },
    data() {
      return {
        popper: null,
        currentValue: this.value,
        currentDirection: this.direction,
        currentAlign: this.align,
        referenceWidth: null,
        referenceHeight: null,
        arrowDirectionMap: {
          top: 'bottom',
          bottom: 'top',
          left: 'right',
          right: 'left',
        }
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
          this.$emit('update:align', val)
          !!this.popper && this.popper.destroy()
          this.popper = null
          !!this.currentValue && this.update()
        }
      },
      currentDirection(val) {
        this.$emit('update:direction', val)
      },
      currentAlign(val) {
        this.$emit('update:align', val)
      },
    },
    computed: {
      equalSizeData() {
        return oneOf(this.currentDirection, ['top', 'bottom']) ?
          {key: 'width', val: this.referenceWidth} : {key: 'height', val: this.referenceHeight}
      },
      arrowStyles() {
        let styles = {
          width: `${this.arrowSize}px`,
          height: `${this.arrowSize}px`,
          transform: 'rotate(45deg)',
        }
        !!this.borderRadius && (styles.borderRadius = this.borderRadius)
        !!this.shadow && (styles.boxShadow = this.shadow)

        styles[this.arrowDirectionMap[this.currentDirection]] = `${-this.arrowSize / 2 + this.arrowSize / 5}px`
        let align = this.getArrowAlign()
        styles[align.key] = align.value
        return styles
      },
      popoverContentStyles() {
        let styles = {}
        if (!!this.sizeEqual && !!this.equalSizeData) {
          ((styles[this.equalSizeData.key] = `${this.equalSizeData.val}px`))
        }
        !!this.shadow && (styles.boxShadow = this.shadow)
        !!this.borderRadius && (styles.borderRadius = this.borderRadius)
        return styles
      },
      popperWrapperClasses() {
        return `scale-origin-${this.currentDirection}-${this.currentAlign}`
      },
      reference() {
        const parent = findComponentUpward(this, this.parentName)
        return parent.$refs[this.referenceName] || {}
      },
    },
    methods: {
      update() {
        if (!!this.popper) {
          this.popper.update()
        } else {
          /*内容popper*/
          // console.log('new Popper')
          this.popper = new Popper(this.reference, this.$el, {
            placement: `${this.currentDirection}-${this.currentAlign}`,
            modifiers: {
              offset: {
                offset: `0,${this.arrowSize / 1.5}`,
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
      getArrowAlign() {
        if (oneOf(this.currentDirection, ['top', 'bottom'])) {
          return {
            key: this.currentAlign === 'end' ? 'right' : 'left',
            value: this.currentAlign === 'center' ? `${(this.$el.offsetWidth - (this.arrowSize * Math.sqrt(2))) / 2}px` : `${this.arrowSize / 2}px`
          }
        } else {
          return {
            key: this.currentAlign === 'end' ? 'bottom' : 'top',
            value: this.currentAlign === 'center' ? `${(this.$el.offsetWidth - (this.arrowSize * Math.sqrt(2))) / 2}px` : `${this.arrowSize / 2}px`
          }
        }
      },
      _handleClickOutside() {
        !!this.hideOnClickOutside && (this.currentValue = false)
      },
    },
    mounted() {
      this.currentValue && this.update()
      this.referenceWidth = this.reference.offsetWidth
      this.referenceHeight = this.reference.offsetHeight
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
