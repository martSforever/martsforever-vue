<template>
  <div
    ref="wrapper"
    @click="handleWrapperClick"
    :class="wrapperClass"
  >
    <a-scrollbar>
      <div
        ref="content"
        :class="contentClass"
        :contenteditable="!disabled"
        @input="handleInput"
        @click="handleContentClick"
        @focus="handleFocus"
        @blur="handleBlur"
      ></div>
    </a-scrollbar>
    <input type="hidden" :id="id" :name="name" :disabled="disabled"/>
  </div>
</template>

<script>

  import {oneOf} from "../../script/utils";
  import prefix from 'src/base/script/css-prefix.js';
  import AScrollbar from "../a-scrollbar/a-scrollbar";
  import {moveCursorToEnd, onPasteImage} from "../../script/dom";

  export default {
    components: {AScrollbar},
    name: "a-textarea",

    props: {
      id: {
        type: String,
        desc: '元素的id属性'
      },
      name: {
        type: String,
        desc: '元素的name属性'
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

      size: {
        type: String,
        default: 'middle',
        validator(val) {
          return oneOf(val, ['small', 'middle', 'large']);
        },
        desc: '输入框大小'
      },
      color: {
        type: String,
        default: 'primary',
        validator(val) {
          return oneOf(val, ['primary', 'info', 'success', 'warning', 'error'])
        },
      },
      shape: {
        type: String,
        default: 'fillet',
        validator(val) {
          return oneOf(val, ['fillet', 'none']);
        },
      },


      value: {
        type: [String, Number],
        default: ''
      },
    },

    data() {
      return {
        currentValue: this.value, /*存储当前用来双向绑定的值*/
        prefixCls: prefix.prefixtextArea, /*当前组件样式前缀*/
        isFocus: false, /*当前组件是否获取了焦点*/
      }
    },
    methods: {
      handleInput(event) {
        let value = event.target.innerText;
        this.$emit('input', value);
        this.setCurrentValue(value);
        this.$emit('on-change', event);
      },
      handleWrapperClick(event) {
        this.$refs.content.focus();
        /*将div设置为可编辑之后，每次获取焦点。光标都会放在第一个字符前面，体验非常不好，这里设置每次获取焦点的时候，将光标放到最后一位*/
        moveCursorToEnd(this.$refs.content);
        this.$emit('on-click', event);
      },
      handleContentClick(event) {
        event.stopPropagation();
      },
      handleFocus(event) {
        this.isFocus = true;
      },
      handleBlur(event) {
        this.isFocus = false;
      },
      setCurrentValue(value) {
        if (value === this.currentValue) return;
        this.currentValue = value;
      },
    },
    computed: {
      contentClass() {
        return [
          `${this.prefixCls}`,
        ];
      },
      wrapperClass() {
        return [
          `${this.prefixCls}-wrapper`, {
            [`${this.prefixCls}-wrapper-${this.shape}`]: !!this.shape,
            [`${this.prefixCls}-wrapper-${this.color}`]: !!this.color,
            [`${this.prefixCls}-wrapper-${this.size}`]: !!this.size,
            [`${this.prefixCls}-wrapper-focus`]: !!this.isFocus,
          }
        ];
      },
    },
    watch: {
      value(val) {
        this.setCurrentValue(val);
        /*如果在content内用{{currentValue}}绑定值的话，每次值改变，都会导致光标的位置回到初点，这里加判断，如果当前正在编辑的话，就不需要改变值*/
        if (!this.isFocus) this.$refs.content.innerText = this.value;
      }
    },
    mounted() {
      /*初始值设置*/
      this.$refs.content.innerText = this.value;
      /*图片粘贴事件处理*/
      onPasteImage(this.$refs.content, (result) => {
        let img = new Image();
        img.src = result;
        img.style.maxWidth = `${this.$refs.wrapper.offsetWidth - (6) * 2}px`;
        this.$refs.content.append(img);
      })
    },
  }
</script>

<style scoped lang="scss">

</style>
