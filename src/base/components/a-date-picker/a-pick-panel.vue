<template>
  <div class="a-pick-panel">
    <a-row :gutter="6">
      <a-col v-for="(item,index) in options" :key="index" span="8">
        <div class="year-item" :class="{current:item===currentValue,now:item === current}" @click="_handleClick(item)">
          <slot :item="item">
            {{item}}
          </slot>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import ARow from "../a-grid/a-row";
  import ACol from "../a-grid/a-col";

  export default {
    name: "a-pick-panel",
    components: {ACol, ARow},
    props: {
      value: null,
      options: {
        type: Array,
        default: () => []
      },
      current: null
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
        currentValue: this.value
      }
    },
    methods: {
      _handleClick(item) {
        this.currentValue = item
      },
    }
  }
</script>

<style lang="scss">
  .a-pick-panel {
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
          padding: 0 3px;
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
