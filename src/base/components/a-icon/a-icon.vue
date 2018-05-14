<template>
  <i :is="type" :icon="icon" :styles="styles" :classes="prefixCls"></i>
</template>

<script>
  import AFa from "./a-fa";
  import AIconfont from "./a-iconfont";

  export default {
    components: {
      AIconfont,
      AFa
    },
    name: "a-icon",
    data() {
      return {
        prefixCls: 'a-icon'
      }
    },
    props: {
      fa: String,
      iconfront: String,
      size: [Number, String],
      color: String
    },
    computed: {
      icon() {
        if (!!this.fa) return this.fa;
        if (!!this.iconfront) return this.iconfront;
      },
      type() {
        if (!!this.fa) return 'a-fa';
        if (!!this.iconfront) return 'a-iconfont';
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

<style scoped lang="stylus">

</style>
