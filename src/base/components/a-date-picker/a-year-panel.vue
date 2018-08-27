<template>
  <div class="a-year-panel">
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
    name: "a-year-panel",
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
      return {
        currentValue: this.value || new Date().getFullYear(),
        startValue: this.value || new Date().getFullYear(),
        now: new Date().getFullYear(),
        page: 0,
      }
    },
    methods: {
      _handleClick(item) {
        this.currentValue = item
      },
      nextYear() {
        this.page++
      },
      prevYear() {
        this.page--
      },
    },
    computed: {
      options() {
        let ret = []
        let start = this.startValue - 4 + (this.page * 12)
        let end = this.startValue + 9 - 1 + (this.page * 12)
        while (start < end) {
          ret.push(start++)
        }
        return ret
      },
    }
  }
</script>

<style lang="scss">
  .a-year-panel {
    display: inline-block;
    width: 216px;
  }
</style>
