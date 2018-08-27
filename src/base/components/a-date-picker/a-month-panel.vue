<template>
  <div class="a-month-panel">

    <div class="pick-panel-head">
      <a-icon icon="fa-angle-double-left" class-name="highlight-label"/>
      <span>{{$t(`date.month${currentValue}`)}}</span>
      <a-icon icon="fa-angle-double-right" class-name="highlight-label"/>
    </div>

    <a-pick-panel v-model="currentValue" :current="now" :options="options">
      <template slot-scope="data">
        {{$t(`date.month${data.index+1}`)}}
      </template>
    </a-pick-panel>
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
  .a-month-panel {
    display: inline-block;
    width: 216px;
  }
</style>
