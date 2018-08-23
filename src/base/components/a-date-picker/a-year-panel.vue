<template>
  <div class="a-year-panel">
    <div class="head">
      <div class="icon-wrapper" @click="page = page-1">
        <a-icon icon="fa-angle-double-left"/>
      </div>
      {{currentValue}}
      <div class="icon-wrapper" @click="page = page+1">
        <a-icon icon="fa-angle-double-right"/>
      </div>
    </div>
    <a-row :gutter="6">
      <a-col v-for="(item,index) in options" :key="index" span="8">
        <div class="year-item" :class="{current:item===currentValue,now:item === now}" @click="_handleClick(item)">
          {{item}}
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import ARow from "../a-grid/a-row";
  import ACol from "../a-grid/a-col";
  import AScrollbar from "../a-scrollbar/a-scrollbar";
  import AIcon from "../a-icon/a-icon";

  export default {
    name: "a-year-panel",
    components: {AIcon, AScrollbar, ACol, ARow},
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

  $gutter: 6px;
  .a-year-panel {
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
      justify-content: space-between;
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
    .a-row {
      height: 176px;
      .a-col {
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        .year-item {
          border-radius: $border-fillet;
          cursor: pointer;
          display: inline-block;
          height: 28px;
          line-height: 28px;
          width: 40px;
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
