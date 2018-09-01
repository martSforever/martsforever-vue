<template>
  <div class="a-table">
    <a-table-head :fit-width="fitWidth"
                  :border-color="borderColor"
                  :border-size="borderSize"
                  :border-style="borderStyle">
      <slot></slot>
    </a-table-head>
  </div>
</template>

<script>
  import ATableHead from "./a-table-head";
  import AScrollbar from "../a-scrollbar/a-scrollbar";

  export default {
    name: "a-table",
    components: {AScrollbar, ATableHead},
    props: {
      fitWidth: {
        type: Boolean,
        default: false,
        desc: '表格宽度是否自适应，当列宽不够需要自动拉伸以填充容器宽度的时候，该选项建议为true',
      },
      list: {
        type: Array,
        default: () => [],
        desc: '列表数据',
      },
      borderSize: {
        default: 6,
        desc: '边框宽度',
      },
      borderColor: {
        type: String,
        default: '#f2f2f2',
        desc: '边框颜色',
      },
      borderStyle: {
        type: String,
        default: 'solid',
        desc: '边框风格',
      },
    },
    mounted() {
    },
  }
</script>

<style lang="scss">
  .a-table {
    width: 100%;
    overflow: auto;
  }
</style>
