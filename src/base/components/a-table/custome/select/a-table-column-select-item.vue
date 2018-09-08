<template>
  <div ref="wrapper">
    <keep-alive>
      <a-select v-model="currentValue" v-if="!!editable && !!currentEditable">

      </a-select>
      <span v-else>{{row[field]}}</span>
    </keep-alive>
  </div>
</template>

<script>
  import TableEditMixin from "../table-edit-mixin";
  import ASelect from "../../../a-select/a-select";

  export default {
    name: "a-table-column-select-item",
    components: {ASelect},
    mixins: [TableEditMixin],
  }
</script>
