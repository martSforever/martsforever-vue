<template>
  <a-table-column :title="title" ref="tableColumn" :width="width">
    <template slot-scope="{row,rowIndex}">

    </template>
  </a-table-column>
</template>

<script>
  import ATableColumn from "../../a-table-column";

  export default {
    name: "a-table-column-select",
    components: {ATableColumn},
    props: {
      title: {
        default: '选择日期'
      },
      order: {
        default: 0
      },
      field: {
        type: String,
        required: true
      },
      width: {
        default: '160px'
      },
    },
    data() {
      return {
        isTableColumn: true,
      }
    },
    methods: {
      getColumn() {
        return this.$refs.tableColumn.getColumn()
      },
    },
  }
</script>

<style lang="scss">

</style>
