<template>
  <i :is="type" :icon="icon" :styles="styles" :class="classes" @click="handleClick"></i>
</template>

<script>
  import AFa from "./a-fa";
  import AIconfont from "./a-iconfont"
  import prefix from 'src/base/script/css-prefix.js';

  export default {
    components: {
      AIconfont,
      AFa
    },
    name: "a-icon",
    data() {
      return {
        prefixCls: prefix.prefixIcon
      }
    },
    props: {
      size: [Number, String],
      color: String,
      icon: {
        type: String,
        required: true
      },
      className: null
    },
    computed: {
      type() {
        return this.icon.indexOf('fa-') > -1 ? 'a-fa' : 'a-iconfont'
      },
      classes() {
        return [this.prefixCls, this.className]
      },
      styles() {
        let style = {};
        if (this.size) {
          style['font-size'] = `${this.size}px`;
        }
        if (this.color) {
          style.color = this.color;
        }
        return style;
      }
    },
    methods: {
      handleClick(e) {
        this.$emit('click', e);
      },
    }
  }
</script>
