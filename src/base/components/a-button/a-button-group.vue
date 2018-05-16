<template>
  <div class="a-btn-group" :class="classes">
    <slot></slot>
  </div>
</template>

<script>

  import {oneOf} from "../../script/utils";

  const prefixCls = 'a-btn-group';

  export default {
    name: "a-button-group",
    props: {
      shape: {
        validator(value) {
          return oneOf(value, ['round', 'fillet', 'none']);
        }
      },
      size: {
        validator(value) {
          return oneOf(value, ['small', 'large', 'base']);
        }
      },
      vertical: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes() {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-${this.size}`]: !!this.size,
            [`${prefixCls}-${this.shape}`]: !!this.shape,
            [`${prefixCls}-vertical`]: this.vertical
          }
        ];
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
