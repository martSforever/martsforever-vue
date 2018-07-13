<template>
  <button
    :type="htmlType"
    :class="classes"
    :disabled="disabled"
    v-effect
    ref="btn"
    :style="styles"
    @click="handleClick">
    <a-icon icon="loading" v-if="loading === true || loading === 'Y'"
            :class="{'a-load-loop':(loading === true || loading === 'Y')}"/>

    <a-icon :icon="icon" v-if="(!!icon) && !loading"/>
    <span v-if="showSlot" ref="slot"><slot></slot></span>
  </button>
</template>

<script>
  import {oneOf} from "../../script/utils";
  import AIcon from "../a-icon/a-icon";
  import prefix from 'src/base/script/css-prefix.js';

  export default {
    components: {AIcon},
    name: "a-button",
    props: {
      type: {
        validator(value) {
          return oneOf(value, ['primary', 'ghost', 'dashed', 'text', 'info', 'success', 'warning', 'error', 'default'])
        }
      },
      shape: {
        default: 'fillet',
        validator(value) {
          return oneOf(value, ['circle', 'round', 'fillet', 'none']);
        }
      },
      size: {
        validator(value) {
          return oneOf(value, ['small', 'large', 'base']);
        }
      },
      loading: {
        type: [String, Boolean],
        default: false,
        validator(val) {
          return oneOf(val, [true, false, 'Y', 'N'])
        },
      },
      disabled: Boolean,
      htmlType: {
        default: 'button',
        validator(value) {
          return oneOf(value, ['button', 'submit', 'reset']);
        }
      },
      icon: {
        type: String
      },
      long: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        prefixCls: prefix.prefixBtn,
        showSlot: true,
      }
    },
    computed: {
      classes() {
        return [
          `${this.prefixCls}`,
          {
            [`${this.prefixCls}-${this.type}`]: !!this.type,
            [`${this.prefixCls}-long`]: this.long,
            [`${this.prefixCls}-${this.shape}`]: !!this.shape,
            [`${this.prefixCls}-${this.size}`]: !!this.size,
            [`${this.prefixCls}-loading`]: this.loading != null && this.loading,
            [`${this.prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || this.loading)
          },
        ];
      },
      styles() {
        if (!this.showSlot && (!!this.iconfont || !!this.fa || this.loading) && this.shape === 'circle') {
          let width = this.$refs.btn.offsetWidth;
          let height = this.$refs.btn.offsetHeight;
          let ret = width > height ? width : height;
          return {
            height: `${ret}px`,
            width: `${ret}px`,
          }
        } else return {};
      },
    },
    methods: {
      handleClick(event) {
        this.$emit('click', event);
      }
    },
    mounted() {
      this.showSlot = this.$slots.default !== undefined;
    }
  }
</script>
