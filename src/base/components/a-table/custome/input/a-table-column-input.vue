<template>
  <a-table-column ref="tableColumn" :order="order">
    <template slot-scope="{column}" slot="title">
      <div>{{title}}</div>
    </template>
    <template slot-scope="{row,rowIndex}">
      <a-table-column-input-item :row="row" :row-index="rowIndex" :field="field"/>
    </template>
  </a-table-column>
</template>

<script>
  import ATableColumn from "../../a-table-column";
  import AInput from "../../../a-input/a-input";
  import ATableColumnInputItem from "./a-table-column-input-item";

  export default {
    name: "a-table-column-input",
    components: {ATableColumnInputItem, AInput, ATableColumn},
    props: {
      title: {
        default: '输入列'
      },
      order: {
        default: 0
      },
      field: {
        type: String,
        required: true
      },
    },
    data() {
      return {
        isTableColumn: true,
        currentValue: null,
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
