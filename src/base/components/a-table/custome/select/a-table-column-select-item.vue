<template>
  <div ref="wrapper">
    <keep-alive>
      <a-select
        ref="select"
        :options="options"
        :options-show-key="optionsShowKey"
        :options-value-key="optionsValueKey"
        v-model="currentValue"
        v-if="!!editable && !!currentEditable"/>
      <span v-else>{{row[field]}}--{{labels}}</span>
    </keep-alive>
  </div>
</template>

<script>
  import TableEditMixin from "../table-edit-mixin";
  import ASelect from "../../../a-select/a-select";

  export default {
    name: "a-table-column-select-item",
    components: {ASelect},
    props: {
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
    mixins: [TableEditMixin],
    methods: {},
    computed: {
      labels() {
        return !!this.$refs.select ? this.$refs.select.labels : ''
      },
    },
  }
</script>
