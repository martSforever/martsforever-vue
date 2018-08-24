<template>
  <div class="a-month-panel">
    <div class="head">
      <div>
        <label>{{currentValue}}</label>
        <label>{{$t('date-picker.month')}}</label>
      </div>
    </div>
    <a-pick-panel v-model="currentValue" :current="now" :options="options"/>
  </div>
</template>

<script>
  import ARow from "../a-grid/a-row";
  import ACol from "../a-grid/a-col";
  import AScrollbar from "../a-scrollbar/a-scrollbar";
  import AIcon from "../a-icon/a-icon";
  import APickPanel from "./a-pick-panel";

  export default {
    name: "a-month-panel",
    components: {APickPanel, AIcon, AScrollbar, ACol, ARow},
    props: {
      value: {
        type: Number,
        default: () => new Date().getFullYear()
      }
    },
    watch: {
      value(val) {
        if (this.currentValue !== val) {
          this.currentValue = val
        }
      },
      currentValue(val) {
        this.$emit('input', val)
      },
    },
    data() {
      let currentMonth = new Date().getMonth() + 1
      return {
        currentValue: this.value || currentMonth,
        startValue: this.value || currentMonth,
        now: currentMonth,
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      }
    },
    methods: {
      _handleClick(item) {
        this.currentValue = item
      },
    },
  }
</script>

<style lang="scss">

  $gutter: 6px;
  .a-month-panel {
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

  }
</style>
