<template>
  <a-table-column :title="title" ref="tableColumn" :width="width" :field="field">
    <template slot-scope="{row,rowIndex}">
      <a-table-column-select-item
        :options="options"
        :options-show-key="optionsShowKey"
        :options-value-key="optionsValueKey"
        :row="row"
        :row-index="rowIndex"
        :field="field"
      >
        <slot></slot>
      </a-table-column-select-item>
    </template>
  </a-table-column>
</template>

<script>
  import ATableColumn from "../../a-table-column";
  import ATableColumnSelectItem from "./a-table-column-select-item";

  export default {
    name: "a-table-column-select",
    components: {ATableColumnSelectItem, ATableColumn},
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
      options: {
        type: Array,
      },
      optionsShowKey: {
        type: String,

      },
      optionsValueKey: {
        type: String,
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
