<template>
  <div class="a-date-panel">
    <a-year-panel v-model="pickYear"
                  v-if="currentView === VIEW.YEAR"
                  @click="_handleClickYear"
                  @click-label="currentView = VIEW.DAY"/>
    <a-month-panel v-model="pickMonth"
                   v-if="currentView === VIEW.MONTH"
                   @prev="pickYear--"
                   @next="pickYear++"
                   @click="_handleClickMonth">
      <span class="highlight-label" @click="currentView = VIEW.YEAR">{{pickYear}}</span>
    </a-month-panel>
    <a-day-panel v-if="currentView === VIEW.DAY"
                 ref="dayPanel"
                 :pick-year.sync="pickYear"
                 :pick-month.sync="pickMonth"
                 :year="year"
                 :month="month"
                 :day="day"
                 @click="_handleClickDate"
                 @open-year="currentView = VIEW.YEAR"
                 @open-month="currentView = VIEW.MONTH"
    />
  </div>
</template>

<script>
  import AYearPanel from "./a-year-panel";
  import AMonthPanel from "./a-month-panel";
  import ADayPanel from "./a-day-panel";
  import {oneOf} from "../../script/utils";

  export default {
    name: "a-date-panel",
    components: {ADayPanel, AMonthPanel, AYearPanel},
    props: {
      view: {
        type: String,
        default: 'date',
        validator(val) {
          return oneOf(val, ['year', 'month', 'date'])
        },
      },
      year: {
        type: Number
      },
      month: {
        type: Number,
      },
      day: {
        type: Number,
      }
    },
    watch: {
      view(val) {
        if (this.currentView !== val) {
          this.currentView = val
        }
      },
      currentView(val) {
        this.$emit('update:view', val)
      },
    },
    data() {
      const VIEW = {YEAR: 'year', MONTH: 'month', DAY: 'date'}
      return {
        VIEW,
        currentView: this.view,

        pickYear: this.year,
        pickMonth: this.month,
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

      _handleClickYear(item) {
        this.pickYear = item
        this.$emit('click-year', item)
      },
      _handleClickMonth(item) {
        this.pickMonth = item
        this.$emit('click-month', item)
      },
      _handleClickDate(item) {
        this.$emit('click-date', item)
      },
    }
  }
</script>

<style lang="scss">
  .a-date-panel {

  }
</style>
