<template>
  <a-table-column ref="tableColumn" :order="order" width="36px">
    <template slot="title" slot-scope="{}">
      <div class="a-table-standard-cell">
        <a-radio active-icon="fa-compress" inactive-icon="fa-arrows-alt"/>
      </div>
    </template>
    <template slot-scope="{}">
      <div class="a-table-standard-cell">
        <a-table-column-collapse-item/>
      </div>
    </template>
  </a-table-column>
</template>

<script>
  import ATableColumn from "../a-table-column";
  import AIcon from "../../a-icon/a-icon";
  import ATableColumnCollapseItem from "./a-table-column-collapse-item";

  export default {
    name: "a-table-column-collapse",
    components: {ATableColumnCollapseItem, AIcon, ATableColumn},
    props: {
      order: {
        default: 9999
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
