<template>
  <div class="a-table">
    <a-table-head :fit-width="fitWidth">
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
        default: () => []
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
