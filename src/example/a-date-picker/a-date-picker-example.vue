<template>
  <div class="a-date-picker-example">
    <a-date-picker/>
    --{{year}}--
    <div>
      <a-year-panel v-model="year"/>
    </div>
  </div>
</template>

<script>
  import ADatePicker from "../../base/components/a-date-picker/a-date-picker";
  import AYearPanel from "../../base/components/a-date-picker/a-year-panel";

  export default {
    name: "a-date-picker-example",
    components: {AYearPanel, ADatePicker},
    data() {
      return {
        year: null
      }
    },
  }
</script>

<style lang="scss">
  .a-date-picker-example {
    width: 100vw;
    text-align: center;
  }
</style>
