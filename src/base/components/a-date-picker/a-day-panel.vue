<template>
  <div class="a-day-panel">

    <div class="pick-panel-head">
      <div>
        <a-icon icon="fa-angle-double-left" class-name="highlight-label" @click="currentPickYear--"/>
        <a-icon icon="fa-angle-left" class-name="highlight-label" @click="prevMonth"/>
      </div>
      <div>
        <span class="highlight-label" @click="$emit('open-year')">{{pickYear}}
        </span>-<span
        class="highlight-label" @click="$emit('open-month')">{{$t(`date.month${pickMonth}`)}}</span>
      </div>
      <div>
        <a-icon icon="fa-angle-right" class-name="highlight-label" @click="nextMonth"/>
        <a-icon icon="fa-angle-double-right" class-name="highlight-label" @click="currentPickYear++"/>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="row">
        <div class="col" v-for="(item,index) in weeks" :key="index">
          {{$t(`date.week.${item}`)}}
        </div>
      </div>
      <div class="row">
        <div class="col"
             v-for="(item,index) in days"
             :key="index"
             @click="_handleClick(item)"
             :class="colClasses(item)">
          {{item.day}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import ARow from "../a-grid/a-row";
  import ACol from "../a-grid/a-col";
  import AIcon from "../a-icon/a-icon";

  export default {
    name: "a-day-panel",
    components: {AIcon, ACol, ARow},
    props: {
      year: {
        type: Number,
        default: new Date().getFullYear()
      },
      month: {
        type: Number,
        default: new Date().getMonth()
      },
      day: {
        type: Number,
        default: new Date().getDate()
      },
      pickYear: {type: Number},
      pickMonth: {type: Number},
    },
    data() {
      let now = new Date()
      return {
        weeks: ['0', '1', '2', '3', '4', '5', '6'],
        currentPickYear: this.pickYear != null ? this.pickYear : this.year,
        currentPickMonth: (this.pickMonth != null ? this.pickMonth : this.month) - 1,

        currentYear: this.year,
        currentMonth: this.month,
        currentDay: this.day,

        nowYear: now.getFullYear(),
        nowMonth: now.getMonth() + 1,
        nowDay: now.getDate()
      }
    },
    watch: {
      year(val) {
        if (this.currentYear !== val) {
          this.currentYear = val
        }
      },
      currentYear(val) {
        this.$emit('update:year', val)
      },
      month(val) {
        if (this.currentMonth !== val) {
          this.currentMonth = val
        }
      },
      currentMonth(val) {
        this.$emit('update:month', val)
      },
      day(val) {
        if (this.currentDay !== val) {
          this.currentDay = val
        }
      },
      currentDay(val) {
        this.$emit('update:day', val)
      },
      pickYear(val) {
        if (this.currentPickYear !== val) {
          this.currentPickYear = val
        }
      },
      currentPickYear(val) {
        this.$emit('update:pickYear', val)
      },
      pickMonth(val) {
        if (this.currentPickMonth !== val - 1) {
          this.currentPickMonth = val - 1
        }
      },
      currentPickMonth(val) {
        this.$emit('update:pickMonth', val + 1)
      },
    },
    computed: {
      days() {
        let days = []
        let date = new Date()
        let month = this.currentPickMonth                                //当前显示日历版的月份
        date.setFullYear(this.currentPickYear, month, 1)                 //当前日历版的年月时间
        /*---------------------------------------添加目标月上个月日期-------------------------------------------*/
        let week = date.getDay()                                  //目标月的第一天是星期几
        date.setDate(0)                                           //设置时间为目标月上个月的最后一天
        let day = date.getDate()
        while (week > 0) {                                        //添加上个月的最后几天
          days.unshift({
            day: day,
            month: date.getMonth(),
            year: date.getFullYear(),
          })
          day--
          week--
        }
        /*---------------------------------------添加目标月日期-------------------------------------------*/
        date.setFullYear(this.currentPickYear, month + 1, 1)             //设置日期为目标月的下一月，1号
        date.setDate(0)                                           //设置日期为目标月最后一天
        day = date.getDate()                                      //目标月最后一天
        for (let i = 1; i <= day; i++) {                          //添加目标月日期
          days.push({
            day: i,
            month: date.getMonth(),
            year: date.getFullYear(),
          })
        }
        /*---------------------------------------添加目标月下个月日期-------------------------------------------*/
        date.setFullYear(this.currentPickYear, month + 1, 1)             //设置日期为目标月的下一月，1号
        for (let i = 1; days.length < 42; i++) days.push({
          day: i,
          month: date.getMonth(),
          year: date.getFullYear(),
        })
        return days
      },
    },
    methods: {
      nextMonth() {
        this.currentPickMonth++
        if (this.currentPickMonth === 12) {
          this.currentPickMonth = 0
          this.currentPickYear++
        }
      },
      prevMonth() {
        this.currentPickMonth--
        if (this.currentPickMonth === -1) {
          this.currentPickMonth = 11
          this.currentPickYear--
        }
      },
      colClasses(item) {
        return {
          invalid: item.month !== this.currentPickMonth || item.year !== this.currentPickYear,
          current: this.currentYear === item.year && (this.currentMonth - 1) === item.month && this.currentDay === item.day,
          now: this.nowYear === item.year && (this.nowMonth - 1) === item.month && this.nowDay === item.day,
        }
      },
      _handleClick(item) {
        this.$emit('click', item)
      },
    }
  }
</script>

<style lang="scss">

  $gutter: 6px;
  .a-day-panel {
    display: inline-block;
    width: 216px;
    .content-wrapper {
      height: 173px;
      width: 100%;
      padding-top: 3px;
      user-select: none;
      text-align: center;
      .row {
        width: 100%;
        .col {
          width: 28px;
          height: 24px;
          line-height: 24px;
          margin-right: 1px;
          display: inline-block;
          box-sizing: border-box;
          font-size: 12px;
          border-radius: $border-fillet;
          cursor: pointer;

          &:hover, &.now, &.current, &.invalid {
            color: white;
          }
          &:hover {
            background-color: $text-color-main;
            color: white;
          }
          &.now {
            background-color: #bfccdd;
          }
          &.current {
            background-color: $text-color-primary;
          }

          &.invalid {
            color: black;
            &:hover {
              color: white;
            }
          }
        }
      }
    }
  }
</style>
