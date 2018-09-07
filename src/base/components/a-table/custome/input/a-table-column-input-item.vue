<template>
  <div>
    <a-input v-model="currentValue"/>
  </div>
</template>

<script>
  import AInput from "../../../a-input/a-input";

  export default {
    name: "a-table-column-input-item",
    components: {AInput},
    props: {
      row: {},
      rowIndex: {},
      field: {},
    },
    data() {
      return {
        currentValue: this.row[this.field]
      }
    },
    mounted() {

    },
  }
</script>

<style lang="scss">

</style>
