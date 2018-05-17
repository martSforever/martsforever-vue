<template>
  <i :is="type" :icon="icon" :styles="styles" :classes="prefixCls"></i>
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
      fa: String,
      iconfont: String,
      size: [Number, String],
      color: String
    },
    computed: {
      icon() {
        if (!!this.fa) return this.fa;
        if (!!this.iconfont) return this.iconfont;
      },
      type() {
        if (!!this.fa) return 'a-fa';
        if (!!this.iconfont) return 'a-iconfont';
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
    }
  }
</script>
