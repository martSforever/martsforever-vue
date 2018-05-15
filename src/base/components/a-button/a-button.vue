<template>
  <button
    :type="htmlType"
    :class="classes"
    :disabled="disabled"
    v-effect
    @click="handleClick">
    <a-icon iconfont="loading" v-if="loading" :class="{'a-load-loop':loading}"/>
    <a-icon :iconfont="iconfont" :fa="fa" v-if="(!!iconfont || !!fa) && !loading"/>
    <span v-if="showSlot" ref="slot"><slot></slot></span>
  </button>
</template>

<script>
  import {oneOf} from "../../script/utils";
  import AIcon from "../a-icon/a-icon";

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
          return oneOf(value, ['circle', 'circle-outline']);
        }
      },
      size: {
        validator(value) {
          return oneOf(value, ['small', 'large', 'default']);
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
        prefixCls: 'a-btn',
        showSlot: true
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
          }
        ];
      }
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

<style scoped lang="stylus">
  .a-btn {
    background transparent
    color $text-color-light
    border: solid 1px rgba(255, 255, 255, 0.1);
    padding 6px 12px
    outline none
    &[disabled=disabled] {
      background-color rgba(255, 255, 255, 0.3)
      cursor not-allowed
    }
  }
</style>
