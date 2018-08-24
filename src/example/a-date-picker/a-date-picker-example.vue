<template>
  <div class="a-date-picker-example">
    <a-date-picker/>
    --{{year}}--{{month}}--
    <div>
      <a-year-panel v-model="year"/>
      <a-month-panel v-model="month"/>
    </div>
  </div>
</template>

<script>
  import ADatePicker from "../../base/components/a-date-picker/a-date-picker";
  import AYearPanel from "../../base/components/a-date-picker/a-year-panel";
  import AMonthPanel from "../../base/components/a-date-picker/a-month-panel";

  export default {
    name: "a-date-picker-example",
    components: {AMonthPanel, AYearPanel, ADatePicker},
    data() {
      return {
        year: null,
        month: null
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
