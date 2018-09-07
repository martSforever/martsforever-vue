<template>
  <div ref="wrapper">
    <a-input v-model="currentValue" v-if="!!editable && !!currentEditable"/>
    <span v-else>{{row[field]}}</span>
  </div>
</template>

<script>
  import AInput from "../../../a-input/a-input";
  import TableEditMixin from "../table-edit-mixin";

  export default {
    name: "a-table-column-input-item",
    components: {AInput},
    mixins: [TableEditMixin],
  }
</script>
