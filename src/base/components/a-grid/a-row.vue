<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
  import prefix from "../../script/css-prefix";
  import {findComponentsDownward, oneOf} from "../../script/utils";

  export default {
    name: 'a-row',
    props: {
      type: {
        validator(value) {
          return oneOf(value, ['flex']);
        }
      },
      align: {
        validator(value) {
          return oneOf(value, ['top', 'middle', 'bottom']);
        }
      },
      justify: {
        validator(value) {
          return oneOf(value, ['start', 'end', 'center', 'space-around', 'space-between']);
        }
      },
      gutter: {
        type: [Number, String],
        default: 0
      },
      className: String
    },
    data() {
      return {
        prefixCls: prefix.prefixRow
      }
    },
    computed: {
      classes() {
        return [
          this.prefixCls,
          {
            // [`${this.prefixCls}`]: !this.type,
            [`${this.prefixCls}-${this.type}`]: !!this.type,
            [`${this.prefixCls}-${this.type}-${this.align}`]: !!this.align,
            [`${this.prefixCls}-${this.type}-${this.justify}`]: !!this.justify,
            [`${this.className}`]: !!this.className
          }
        ];
      },
      styles() {
        let style = {};
        if ((this.gutter-0) !== 0) {
          style = {
            marginLeft: (this.gutter-0) / -2 + 'px',
            marginRight: (this.gutter-0) / -2 + 'px'
          };
        }

        return style;
      }
    },
    methods: {
      updateGutter(val) {
        const Cols = findComponentsDownward(this, 'a-col');
        if (Cols.length) {
          Cols.forEach((child) => {
            if ((val-0) !== 0) {
              console.log(val,(val-0));
              child.gutter = (val-0);
            }
          });
        }
      }
    },
    watch: {
      gutter(val) {
        this.updateGutter(val);
      }
    }
  };
</script>

<style scoped lang="scss">

</style>
