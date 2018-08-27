<template>
  <div class="a-date-panel">
    <a-year-panel v-model="pickYear"
                  v-show="currentView === VIEW.YEAR"
                  @click="currentView = VIEW.MONTH"
                  @click-label="currentView = VIEW.DAY"/>
    <a-month-panel v-model="pickMonth"
                   v-show="currentView === VIEW.MONTH"
                   @prev="pickYear--"
                   @next="pickYear++"
                   @click="currentView = VIEW.DAY">
      <span class="highlight-label" @click="currentView = VIEW.YEAR">{{pickYear}}</span>
    </a-month-panel>
    <a-day-panel v-show="currentView === VIEW.DAY"
                 ref="dayPanel"
                 :pick-year.sync="pickYear"
                 :pick-month.sync="pickMonth"
                 :year.sync="year"
                 :month.sync="month"
                 :day.sync="day"
                 @open-year="currentView = VIEW.YEAR"
                 @open-month="currentView = VIEW.MONTH"
    />
  </div>
</template>

<script>
  import AYearPanel from "./a-year-panel";
  import AMonthPanel from "./a-month-panel";
  import ADayPanel from "./a-day-panel";

  export default {
    name: "a-date-panel",
    components: {ADayPanel, AMonthPanel, AYearPanel},
    props: {
      value: {
        type: Date,
        default: () => new Date()
      }
    },
    data() {
      const VIEW = {YEAR: 0x001, MONTH: 0x002, DAY: 0x003}
      return {
        VIEW,
        currentValue: this.value,
        currentView: VIEW.DAY,

        year: this.value.getFullYear(),
        month: this.value.getMonth() + 1,
        day: this.value.getDate(),

        pickYear: this.value.getFullYear(),
        pickMonth: this.value.getMonth() + 1,
      }
    },
    methods: {
      openView(code) {
        this.currentView = code
      },

      prevYear() {
        this.$refs.yearPanel.prevYear()
      },
      nextYear() {
        this.$refs.yearPanel.nextYear()
      },
      prevMonth() {
        this.$refs.dayPanel.prevMonth()
      },
      nextMonth() {
        this.$refs.dayPanel.nextMonth()
      },
    }
  }
</script>

<style lang="scss">
  .a-date-panel {

  }
</style>
