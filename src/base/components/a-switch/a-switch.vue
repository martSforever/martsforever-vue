<template>
  <div :class="cls" @click="handleClick">
    <div :class="indicatorCls">
      <slot name="indicator" v-if="customeIndicator"/>
      <a-icon :icon="icon" v-else :style="iconStyles"/>
    </div>

    <div class="a-switch-custome">
      <transition-group name="fade-in">
        <div class="a-switch-custome-item a-switch-custome-item-left" v-show="!isTrue" key="left">
          <slot name="true"/>
        </div>
        <div class="a-switch-custome-item a-switch-custome-item-right" v-show="isTrue" key="right">
          <slot name="false"/>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>

  import prefix from 'src/base/script/css-prefix.js';
  import {oneOf} from "../../script/utils";
  import AIcon from "../a-icon/a-icon";

  export default {
    components: {AIcon},
    name: "a-switch",
    props: {
      value: {
        type: [String, Number, Boolean],
        default: false,
      },
      trueValue: {
        type: [String, Number, Boolean],
      },
      falseValue: {
        type: [String, Number, Boolean],
      },
      size: {
        type: String,
        default: 'middle',
        validator(val) {
          return oneOf(val, ['small', 'middle', 'large']);
        },
      },
      disabled: {
        type: [String, Boolean],
        default: false,
        validator(val) {
          return oneOf(val, ['Y', 'N', true, false]);
        },
      },
      color: {
        type: String,
        default: 'error',
        validator(val) {
          return oneOf(val, ['primary', 'info', 'success', 'warning', 'error'])
        },
      },
      icon: {
        type: String,
        default: 'fa-circle',
      },

      iconSize: {
        type: String,
      },
      iconColor: {
        type: String
      }
    },
    data() {
      return {
        prefix: prefix.prefixSwitch,
        currentValue: this.value,
        customeIndicator: false,
      }
    },
    computed: {
      cls() {
        return [
          `${this.prefix}`,
          {
            [`${this.prefix}-${this.size}`]: true,
            [`${this.prefix}-${this.color}`]: true,
            [`${this.prefix}-disabled`]: this.disabled === true || this.disabled === 'Y',
            [`${this.prefix}-false`]: !this.isTrue,
          }
        ]
      },
      isTrue() {
        return this.currentValue === true || (this.trueValue && this.currentValue === this.trueValue);
      },
      indicatorCls() {
        return [
          `${this.prefix}-indicator`,
          {
            [`${this.prefix}-indicator-left`]: this.isTrue,
            [`${this.prefix}-indicator-right`]: !this.isTrue
          }
        ]
      },
      iconStyles() {
        let styles = {};
        !!this.iconSize && (styles.fontSize = this.iconSize);
        !!this.iconColor && (styles.color = this.iconColor);
        return styles;
      },
    },
    created() {
      (!!this.$slots.indicator) && (this.customeIndicator = true);
    },
    methods: {
      handleClick(e) {
        if (this.disabled === true || this.disabled === 'Y') return;
        if (this.isTrue) {
          this.currentValue = !!this.falseValue ? this.falseValue : false
        } else {
          this.currentValue = !!this.trueValue ? this.trueValue : true
        }
        this.$emit('input', this.currentValue);
      },
    },
    watch: {
      value(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.currentValue = newVal;
        }
      },
    }
  }
</script>

<style lang="scss">

</style>
