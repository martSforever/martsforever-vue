<template>
  <div class="a-input">
    this is a-input wahaha
    hhhkdjlaskj
    <input v-model="name"/>
  </div>
</template>

<script>
  import {oneOf} from "../../script/utils";

  export default {
    name: "a-input",
    props: {
      disabled: {
        type: [String, Boolean],
        default: false,
        desc: '是否禁用，可以接受四个值：true、false、Y以及N，当true和Y时，禁用，反之不禁用',
        validator: (val) => {
          return oneOf(val, [true, false, 'Y', 'N']);
        },
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
      type: {
        type: String,
        default: 'input',
        desc: '是输入框input还是文本域textarea',
        validator: (val) => {
          return oneOf(val, ['input', 'textarea']);
        },
      },
      placeholder: {
        type: String,
        default: '请输入内容...',
        desc: '原input标签的placeholder属性'
      },
      size: {
        type: String,
        default: 'small',
        desc: '大小',
        validator: (val) => {
          return oneOf(val, ['large', 'middle', 'small']);
        },
      },
      value: {
        type: [String, Number],
        default: ''
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        name: 'hello vue nc,asn'
      }
    },
    created() {
      console.log(process.env);
    },
  }
</script>

<style scoped lang="scss">
  .a-input {
    color: red
  }
</style>
