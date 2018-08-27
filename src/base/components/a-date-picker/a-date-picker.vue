<template>
  <div class="a-date-picker">
    <div>
      <a-button-group>
        <a-button @click="currentView = VIEW.YEAR">year</a-button>
        <a-button @click="currentView = VIEW.MONTH">month</a-button>
        <a-button @click="currentView = VIEW.DAY">day</a-button>
      </a-button-group>
    </div>
    <div class="a-date-picker-popover-content">
      <!--<div class="head">
        <div class="left">
          <a-icon icon="fa-angle-double-left" class-name="text" @click="prevYear"/>
          <a-icon icon="fa-angle-left" class-name="text" @click="prevMonth"/>
        </div>
        <span class="info">
          <span class="text" @click="openView(VIEW.YEAR)">{{pickYear}}</span>
          -
          <span class="text" @click="openView(VIEW.MONTH)">{{pickMonth}}</span>
        </span>
        <div class="right">
          <a-icon icon="fa-angle-right" class-name="text" @click="nextMonth"/>
          <a-icon icon="fa-angle-double-right" class-name="text" @click="nextYear"/>
        </div>
      </div>-->
      <div class="content">
        <a-year-panel v-model="pickYear" v-show="currentView === VIEW.YEAR"/>
        <a-month-panel v-model="pickMonth" v-show="currentView === VIEW.MONTH"/>
        <a-day-panel v-show="currentView === VIEW.DAY"
                     ref="dayPanel"
                     :pick-year.sync="pickYear"
                     :pick-month.sync="pickMonth"
                     :year.sync="year"
                     :month.sync="month"
                     :day.sync="day"/>
      </div>
    </div>
  </div>
</template>

<script>

  import AYearPanel from "./a-year-panel";
  import AMonthPanel from "./a-month-panel";
  import ADayPanel from "./a-day-panel";
  import AIcon from "../a-icon/a-icon";
  import AButtonGroup from "../a-button/a-button-group";
  import AButton from "../a-button/a-button";

  export default {
    name: "a-date-picker",
    components: {AButton, AButtonGroup, AIcon, ADayPanel, AMonthPanel, AYearPanel},
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
  .a-date-picker {
    .head {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
      .text {
        cursor: pointer;
        padding: 3px 6px;
        border-radius: $border-fillet;
        font-size: 13px;
        &:hover {
          color: white;
          background-color: $text-color-main;
        }
      }
    }
    .a-date-picker-popover-content {
      display: inline-block;
      background-color: #f2f2f222;
      border-radius: $border-fillet;
      user-select: none;
    }
  }
</style>
