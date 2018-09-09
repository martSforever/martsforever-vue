<template>
  <a-table-column :title="title" ref="tableColumn" :width="width">
    <template slot-scope="{row,rowIndex}">
      <a-table-column-date-picker-string-item :row="row" :row-index="rowIndex" :field="field"/>
    </template>
  </a-table-column>
</template>

<script>
  import ATableColumn from "../../a-table-column";
  import TableEditMixin from "../table-edit-mixin";
  import ADatePickerString from "../../../a-date-picker/a-date-picker-string";
  import ATableColumnDatePickerStringItem from "./a-table-column-date-picker-string-item";

  export default {
    name: "a-table-column-date-picker-string",
    components: {ATableColumnDatePickerStringItem, ADatePickerString, ATableColumn},
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
        default: '180px'
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
