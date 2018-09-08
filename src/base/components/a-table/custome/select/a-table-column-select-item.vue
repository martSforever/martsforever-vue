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
      <span v-else>{{labels}}</span>
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
    data() {
      return {labels: ''}
    },
    methods: {
      updateLabel() {
        this.labels = ''
        this.options.forEach((option) => {
          if (option[this.optionsValueKey] === this.row[this.field]) {
            this.labels = option[this.optionsShowKey]
          }
        })
      },
      afterSave() {
        console.log('afterSave')
        this.updateLabel()
      },
    },
    mounted() {
      this.updateLabel()
    },
  }
</script>
