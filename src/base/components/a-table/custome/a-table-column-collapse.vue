<template>
  <a-table-column ref="tableColumn" :order="order" width="36px">
    <template slot="title" slot-scope="{}">
      <div class="a-table-standard-cell">
        <a-radio active-icon="fa-compress" inactive-icon="fa-arrows-alt" v-model="totalChecked"/>
      </div>
    </template>
    <template slot-scope="{row,rowIndex}">
      <div class="a-table-standard-cell">
        <a-table-column-collapse-item :scope-slot-func="$scopedSlots.default" :row="row" :row-index="rowIndex"/>
      </div>
    </template>
  </a-table-column>
</template>

<script>
  import ATableColumn from "../a-table-column";
  import AIcon from "../../a-icon/a-icon";
  import ATableColumnCollapseItem from "./a-table-column-collapse-item";
  import RenderingScopeSlot from "../../rendering-scope-slot";

  export default {
    name: "a-table-column-collapse",
    components: {RenderingScopeSlot, ATableColumnCollapseItem, AIcon, ATableColumn},
    props: {
      order: {
        default: 9999
      },
    },
    data() {
      return {
        isTableColumn: true,
        totalChecked: false
      }
    },
    methods: {
      getColumn() {
        return this.$refs.tableColumn.getColumn()
      },
    },
  }
</script>
