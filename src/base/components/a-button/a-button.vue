<template>
  <button
    :type="htmlType"
    :class="classes"
    :disabled="disabled"
    v-effect
    ref="btn"
    :style="styles"
    @click="handleClick">
    <a-icon iconfont="loading" v-if="loading" :class="{'a-load-loop':loading}"/>
    <a-icon :iconfont="iconfont" :fa="fa" v-if="(!!iconfont || !!fa) && !loading"/>
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
        validator(value) {
          return oneOf(value, ['circle', 'round', 'fillet', 'none']);
        }
      },
      size: {
        validator(value) {
          return oneOf(value, ['small', 'large', 'base']);
        }
      },
      loading: Boolean,
      disabled: Boolean,
      htmlType: {
        default: 'button',
        validator(value) {
          return oneOf(value, ['button', 'submit', 'reset']);
        }
      },
      icon: String,
      long: {
        type: Boolean,
        default: false
      },
      iconfont: String,
      fa: String,
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

<style lang="scss">

</style>
