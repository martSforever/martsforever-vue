<template>
  <div ref="wrapper">
    <keep-alive>
      <a-date-picker-string v-model="currentValue" v-if="!!editable && !!currentEditable"/>
      <span v-else>{{row[field]}}</span>
    </keep-alive>
  </div>
</template>

<script>
  import TableEditMixin from "../table-edit-mixin";
  import ADatePickerString from "../../../a-date-picker/a-date-picker-string";

  export default {
    name: "a-table-column-date-picker-string-item",
    components: {ADatePickerString},
    mixins: [TableEditMixin]
  }
</script>

<style lang="scss">

</style>
