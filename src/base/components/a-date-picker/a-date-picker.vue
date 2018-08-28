<template>
  <div class="a-date-picker">

    <div ref="reference" class="input-wrapper">
      <a-input @click="_handleClickInput" :value="showLabel"/>
    </div>

    <a-popover
      parent-name="a-date-picker"
      reference-name="reference"
      direction="bottom"
      align="start"
      v-model="currentShow"
      background-color="#404245"
      shadow="none"
    >
      <div class="a-date-picker-popover-content">
        <a-date-panel :year="dateData.year"
                      :month="dateData.month+1"
                      :day="dateData.day"
                      @click-date="_handleClickDate"
                      @click-year="_handleClickYear"
                      @click-month="_handleClickMonth"
                      :view.sync="view"/>
      </div>
    </a-popover>
  </div>
</template>

<script>

  import AYearPanel from "./a-year-panel";
  import AMonthPanel from "./a-month-panel";
  import ADayPanel from "./a-day-panel";
  import AIcon from "../a-icon/a-icon";
  import AButtonGroup from "../a-button/a-button-group";
  import AButton from "../a-button/a-button";
  import ADatePanel from "./a-date-panel";
  import APopover from "../a-popover/a-popover";
  import AInput from "../a-input/a-input";
  import {oneOf} from "../../script/utils";

  export default {
    name: "a-date-picker",
    components: {AInput, APopover, ADatePanel, AButton, AButtonGroup, AIcon, ADayPanel, AMonthPanel, AYearPanel},
    props: {
      value: {
        type: Date,
        default: () => new Date()
      },
      show: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'date',
        validator(val) {
          return oneOf(val.trim(), ['year', 'month', 'date', 'year|month', 'month|year'])
        },
      },
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
      show(val) {
        if (this.currentShow !== val) {
          this.currentShow = val
        }
      },
      currentShow(val) {
        this.$emit('update:show', val)
        if (!!val) {
          this.resetView()
        }
      },
    },
    data() {
      return {
        currentValue: this.value,
        currentShow: this.show,
        view: 'date'
      }
    },
    methods: {
      _handleClickInput() {
        this.currentShow = true
      },
      _handleClickYear(item) {
        this.currentValue.setFullYear(item)
        if (this.type === 'year') {
          this.currentValue = new Date(this.currentValue)
          this.currentShow = false
        } else
          this.view = 'month'
      },
      _handleClickMonth(item) {
        this.currentValue.setMonth(item - 1)
        if (oneOf(this.type, ['month', 'year|month', 'month|year'])) {
          this.currentValue = new Date(this.currentValue)
          this.currentShow = false
        } else {
          this.view = 'date'
        }
      },
      _handleClickDate(item) {
        this.currentValue = new Date(item.year, item.month, item.day)
        this.currentShow = false
      },
      resetView() {
        switch (this.type) {
          case 'year':
            this.view = 'year'
            break
          case 'year|month':
            this.view = 'year'
            break
          case 'month|year':
            this.view = 'year'
            break
          case 'month':
            this.view = 'month'
            break
          case 'date':
            this.view = 'date'
            break
        }
      },
    },
    computed: {
      dateData() {
        return {
          year: this.currentValue.getFullYear(),
          month: this.currentValue.getMonth(),
          day: this.currentValue.getDate(),
        }
      },
      showLabel() {
        return this.currentValue.format(this.dateFormat)
      },
      dateFormat() {
        switch (this.type) {
          case 'year':
            return 'yyyy'
          case 'month':
            return 'MM'
          case 'year|month':
            return 'yyyy-MM'
          case 'date':
            return 'yyyy-MM-dd'
        }
      },
    },
    mounted() {
      this.resetView()
    },
  }
</script>

<style lang="scss">
  .a-date-picker {
    display: inline-block;
    .input-wrapper {
      display: inline-block;
    }
    .a-date-picker-popover-content {
      display: inline-block;
      border-radius: $border-fillet;
      user-select: none;
    }
  }
</style>
