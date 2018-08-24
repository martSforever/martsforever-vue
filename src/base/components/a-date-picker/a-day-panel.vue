<template>
  <div class="a-day-panel">
    <div class="head">
      {{pickYear}}年{{pickMonth+1}}月{{day}}日
    </div>
    <div class="content-wrapper">
      <div class="row">
        <div class="col" v-for="(item,index) in weeks" :key="index">
          {{$t(`date.week.${item}`)}}
        </div>

        <div class="col" v-for="(item,index) in days" :class="{invalid:!item.currentMonth}">
          {{item.day}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import ARow from "../a-grid/a-row";
  import ACol from "../a-grid/a-col";

  export default {
    name: "a-day-panel",
    components: {ACol, ARow},
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
      }
    },
    watch: {},
    data() {
      return {
        weeks: ['0', '1', '2', '3', '4', '5', '6'],
        pickYear: this.year,
        pickMonth: this.month,
      }
    },
    methods: {},
    computed: {
      days() {
        let days = []
        let date = new Date()
        date.setFullYear(this.pickYear, this.pickMonth, 1)
        let month = this.pickMonth

        date.setMonth(month, 1)                     //目标月，要展示的月日历,目标月的第一天
        let week = date.getDay()                    //目标月的第一天是星期几
        date.setDate(0)
        console.log(date.yyyyMMddHHmmss())
        let day = date.getDate()                    //目标月上个月的最后一天
        while (week > 0) {                          //添加上个月的日期
          days.unshift({
            day: day,
            currentMonth: false
          })
          day--
          week--
        }
        date.setMonth(month + 1, 1)                 //设置目标月的下一月
        date.setDate(0)
        day = date.getDate()                        //目标月最后一天
        for (let i = 1; i <= day; i++) {
          days.push({
            day: i,
            currentMonth: true
          })
        }
        week = 13 - date.getDay()                        //需要增加下个月几天
        for (let i = 1; i <= week; i++) days.push({
          day: i,
          currentMonth: false
        })
        return days
      },
    },
    mounted() {

    },
  }
</script>

<style lang="scss">

  $gutter: 6px;
  .a-day-panel {
    background-color: white;
    display: inline-block;
    border-radius: $border-fillet;
    width: 216px;
    height: 216px;
    .head {
      padding: 0 12px;
      height: 40px;
      border-bottom: $border-bottom-line;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-wrapper {
        height: 20px;
        line-height: 20px;
        width: 20px;
        cursor: pointer;
        &:hover {
          background-color: $text-color-main;
          border-radius: 20px;
          color: white;
        }
      }
    }
    .content-wrapper {
      height: 173px;
      width: 100%;
      padding-top: 3px;
      user-select: none;

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

          &:hover, &.now, &.current {
            color: white;
          }
          &:hover {
            background-color: #ddd;
          }
          &.now {
            background-color: #bfccdd;
          }
          &.current {
            background-color: $text-color-primary;
          }

          &.invalid {
            color: $text-color-light;
            &:hover {
              background-color: transparent;
            }
          }
        }
      }
    }
  }
</style>
