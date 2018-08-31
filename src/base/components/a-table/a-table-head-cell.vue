<template>
  <td class="a-table-head-cell" :rowspan="rowspan" :colspan="colspan">
    <slot></slot>
  </td>
</template>

<script>
  export default {
    name: "a-table-head-cell",
    props: {
      rowspan: {
        default: 1,
        desc: '占行数',
      },
      colspan: {
        default: 1,
        desc: '占列数',
      },
      column: null,
    },
  }
</script>

<style lang="scss">
  .a-table-head-cell {

  }
</style>
