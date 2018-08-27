<template>
  <div class="a-date-picker">

    <div ref="reference" class="input-wrapper">
      <a-input @click="_handleClickInput"/>
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
        <a-date-panel/>
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
      }
    },
    data() {
      return {
        currentShow: this.show
      }
    },
    methods: {
      _handleClickInput() {
        this.currentShow = true
      },
    }
  }
</script>

<style lang="scss">
  .a-date-picker {
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
