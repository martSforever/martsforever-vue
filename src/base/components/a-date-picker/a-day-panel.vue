<template>
  <div class="a-day-panel">
    <div class="head">
      2018年10月11日
    </div>
    <div class="content-wrapper">
      <div class="row">
        <div class="col" v-for="(item,index) in weeks" :key="index">
          {{$t(`date.week.${item}`)}}
        </div>

        <div class="col" v-for="(item,index) in days">
          {{item}}
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
    props: {},
    watch: {},
    data() {
      return {
        weeks: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
        days: []
      }
    },
    methods: {},
    mounted() {
      let num = 1
      while (num <= 42) {
        this.days.push(num)
        num++
      }
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
        }
      }
    }
  }
</style>
