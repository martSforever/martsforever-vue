<template>
  <div class="a-date-picker-example">
    <div>--{{year}}--{{month}}--{{day}}--</div>
    <div>pick-->>{{pickYear}}--{{pickMonth}}</div>
    <div style="display: flex;justify-content: space-around">
      <a-year-panel v-model="pickYear"/>
      <a-month-panel v-model="pickMonth"/>
      <a-day-panel :year.sync="year"
                   :month.sync="month"
                   :day.sync="day"
                   :pick-year.sync="pickYear"
                   :pick-month.sync="pickMonth"/>
    </div>
    <div style="margin-top: 100px">
      <div>{{date.yyyyMMddHHmmss()}}</div>
      <a-date-picker v-model="date"/>
    </div>
  </div>
</template>

<script>
  import ADatePicker from "../../base/components/a-date-picker/a-date-picker";
  import AYearPanel from "../../base/components/a-date-picker/a-year-panel";
  import AMonthPanel from "../../base/components/a-date-picker/a-month-panel";
  import ADayPanel from "../../base/components/a-date-picker/a-day-panel";

  export default {
    name: "a-date-picker-example",
    components: {ADayPanel, AMonthPanel, AYearPanel, ADatePicker},
    data() {
      return {
        year: 2018,
        month: 8,
        day: 28,

        pickYear: 2018,
        pickMonth: 8,

        date: new Date()
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
