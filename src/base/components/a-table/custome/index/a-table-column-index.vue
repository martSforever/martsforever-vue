<template>
  <a-table-column :order="order" title="#" :width="width" ref="tableColumn" field="_index" :searchable="false">
    <template slot-scope="{}" slot="title">
      <div class="a-table-standard-cell">#</div>
    </template>
    <template slot-scope="{rowIndex}">
      <div class="a-table-standard-cell">{{rowIndex+1}}</div>
    </template>
  </a-table-column>
</template>

<script>
  import ATableColumn from "../../a-table-column";

  export default {
    name: "a-table-column-index",
    components: {ATableColumn},
    props: {
      width: {
        default: '36px'
      },
      order: {
        default: 9999
      },
    },
    data() {
      return {
        isTableColumn: true
      }
    },
    methods: {
      getColumn() {
        return this.$refs.tableColumn.getColumn()
      },
    },
  }
</script>
