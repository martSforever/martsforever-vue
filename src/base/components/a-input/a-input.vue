<template>
  <div :class="wrapperClass">
    <div :class="prependClass">
      <slot name="prepend"/>
    </div>
    <a-icon :icon="icon" :class="iconClass" v-if="!!icon"/>
    <input
      ref="input"
      :type="type"
      :id="id"
      :name="name"
      :autocomplete="autocomplete"
      :disabled="disabled === true || disabled === 'Y'"
      :placeholder="placeholder"
      :readonly="readonly"
      :value="currentValue"
      :spellcheck="spellcheck"
      :class="inputClass"

      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @click="handleClick"
    />
    <div :class="appendClass">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script>
  import {oneOf} from "../../script/utils";
  import prefix from 'src/base/script/css-prefix.js';
  import AIcon from "../a-icon/a-icon";

  export default {
    components: {AIcon},
    name: "a-input",
    props: {
      type: {
        type: String,
        desc: 'input标签的type属性',
      },
      id: {
        type: String,
        desc: '元素的id属性'
      },
      name: {
        type: String,
        desc: '元素的name属性'
      },
      autocomplete: {
        type: String,
        default: 'off',
        desc: 'html5新属性，自动完成允许浏览器预测对字段的输入'
      },
      disabled: {
        type: [String, Boolean],
        default: false,
        desc: '是否禁用，可以接受四个值：true、false、Y以及N，当true和Y时，禁用，反之不禁用',
        validator: (val) => {
          return oneOf(val, [true, false, 'Y', 'N']);
        },
      },
      placeholder: {
        type: String,
        default: '请输入内容...',
        desc: '原input标签的placeholder属性'
      },
      readonly: {
        type: Boolean,
        default: false
      },
      spellcheck: {
        type: String,
        default: 'false',
      },

      icon: {
        type: String,
        desc: '输入框中是否存在左右图标'
      },
      iconPosition: {
        type: String,
        default: 'right',
        desc: '输入框存在图标时，图标位置（左或者右）',
        validator: (val) => {
          return oneOf(val, ['left', 'right']);
        },
      },

      size: {
        type: String,
        default: 'small',
        desc: '大小',
        validator: (val) => {
          return oneOf(val, ['large', 'middle', 'small']);
        },
      },
      color: {
        type: String,
        desc: '输入框边框以及文字颜色',
        default: 'error',
        validator(val) {
          return oneOf(val, ['primary', 'info', 'success', 'warning', 'error'])
        },
      },
      shape: {
        type: String,
        default: 'fillet',
        validator(val) {
          return oneOf(val, ['round', 'fillet', 'none']);
        },
      },

      value: {
        type: [String, Number],
        default: ''
      },
    },
    data() {
      return {
        prefixCls: prefix.prefixInput,
        isFocus: false,
        currentValue: this.value,
      }
    },
    created() {
    },
    methods: {
      setCurrentValue(value) {
        if (value === this.currentValue) return;
        this.currentValue = value;
      },
      handleInput(event) {
        let value = event.target.value;
        this.$emit('input', value);
        this.setCurrentValue(value);
        this.$emit('on-change', event);
      },
      handleFocus(event) {
        this.isFocus = true;
        this.$emit('on-focus', event);
      },
      handleBlur(event) {
        this.isFocus = false;
        this.$emit('on-blur', event);
      },
      focus() {
        this.$refs.input.focus();
      },
      handleClick(e) {
        this.$emit('click', e)
      },
    },
    watch: {
      value(newVal, oldVal) {
        if (newVal === oldVal) return;
        this.setCurrentValue(newVal);
      },
    },
    computed: {
      inputClass() {
        return [
          `${this.prefixCls}`,
          {
            [`${this.prefixCls}-${this.size}`]: !!this.size,
            [`${this.prefixCls}-disabled`]: this.disabled,
          }
        ]
      },
      wrapperClass() {
        return [
          `${this.prefixCls}-wrapper`,
          {
            [`${this.prefixCls}-wrapper-${this.size}`]: !!this.size,
            [`${this.prefixCls}-wrapper-${this.color}`]: !!this.color,
            [`${this.prefixCls}-wrapper-${this.shape}`]: !!this.shape,
            [`${this.prefixCls}-wrapper-disabled`]: this.disabled,
            [`${this.prefixCls}-wrapper-focus`]: this.isFocus,
          }
        ]
      },
      iconClass() {
        return [
          `${this.prefixCls}-icon`,
          {
            [`${this.prefixCls}-icon-${this.iconPosition}`]: !!this.iconPosition,
          }
        ]
      },
      prependClass() {
        return [
          `${this.prefixCls}-prepend`,
        ]
      },
      appendClass() {
        return [
          `${this.prefixCls}-append`,
        ]
      },
    }
  }
</script>

<style scoped lang="scss">
</style>
