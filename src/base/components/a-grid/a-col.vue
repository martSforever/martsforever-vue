<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script>

  import prefix from 'src/base/script/css-prefix.js';
  import {findComponentsUpward} from "../../script/utils";

  export default {
    name: 'a-col',
    props: {
      span: [Number, String],
      order: [Number, String],
      offset: [Number, String],
      push: [Number, String],
      pull: [Number, String],
      className: String,
      xs: [Number, Object],
      sm: [Number, Object],
      md: [Number, Object],
      lg: [Number, Object]
    },
    data() {
      return {
        gutter: 0,
        prefixCls: prefix.prefixCol
      };
    },
    computed: {
      classes() {
        let classList = [
          `${this.prefixCls}`,
          {
            [`${this.prefixCls}-span-${this.span}`]: this.span,
            [`${this.prefixCls}-order-${this.order}`]: this.order,
            [`${this.prefixCls}-offset-${this.offset}`]: this.offset,
            [`${this.prefixCls}-push-${this.push}`]: this.push,
            [`${this.prefixCls}-pull-${this.pull}`]: this.pull,
            [`${this.className}`]: !!this.className
          }
        ];

        ['xs', 'sm', 'md', 'lg'].forEach(size => {
          if (typeof this[size] === 'number') {
            classList.push(`${this.prefixCls}-${size}-${this[size]}`);
          }
          else if (typeof this[size] === 'object') {
            let props = this[size];
            Object.keys(props).forEach(prop => {
              classList.push(
                prop !== 'span'
                  ? `${this.prefixCls}-${size}-${prop}-${props[prop]}`
                  : `${this.prefixCls}-span-${size}-${props[prop]}`
              );
            });
          }
        });

        return classList;
      },
      styles() {
        let style = {};
        if ((this.gutter - 0) !== 0) {
          style = {
            paddingLeft: (this.gutter - 0) / 2 + 'px',
            paddingRight: (this.gutter - 0) / 2 + 'px'
          };
        }

        return style;
      }
    },
    methods: {
      updateGutter() {
        const Row = findComponentsUpward(this, 'a-row');
        if (Row.length > 0) {
          Row[0].updateGutter(Row[0].gutter);
        }
      }
    },
    mounted() {
      this.updateGutter();
    },
    beforeDestroy() {
      this.updateGutter();
    }
  };
</script>
