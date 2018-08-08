<template>
  <div class="a-popper" :style="styles">
    <a-collapse-transition v-if="initialized">
      <div v-if="currentValue">
        <slot></slot>
      </div>
    </a-collapse-transition>
  </div>
</template>

<script>
  import Popper from 'popper.js'
  import {findComponentUpward} from "../../script/utils";
  import ACollapseTransition from "../a-collapse-transition/a-collapse-transition";

  export default {
    name: "a-popper",
    components: {ACollapseTransition},
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
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        popper: null,
        width: '',
        popperStatus: false,
        initialized: this.value,
        currentValue: this.value
      };
    },
    watch: {
      value(val) {
        if (!this.initialized && !!val) this.initialized = true
        this.$nextTick(() => {
          if (this.currentValue !== val) {
            this.currentValue = val
            if (!!this.currentValue) this.update()
          }
        })
      },
      currentValue(val) {
        this.$emit('input', val)
      },
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
          console.log('initialized')
          const parent = findComponentUpward(this, this.parentName)
          this.popper = new Popper(parent.$refs[this.referenceName], this.$el, {
            placement: this.placement,
          })
        }
      },
      destroy() {

      },
    },
    mounted() {
    },
    beforeDestroy() {
      console.log('beforeDestroy')
    },
  }
</script>

<style lang="scss">
  .a-popper {
    display: inline-block;
    .popper__arrow {
      background-color: #0ac2ff;
      height: 25px;
      width: 50px;
      display: inline-block;
    }
  }
</style>
