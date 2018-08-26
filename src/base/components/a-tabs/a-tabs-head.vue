<template>
  <div class="a-tabs-head">
    <div class="a-tabs-head-item"
         v-for="(item,index) in labels"
         :key="index"
         ref="items"
         @mouseenter="_handleMouseEnter"
         @mouseleave="_handleMouseLeave"
         :class="{active:currentValue === index}"
         @click="_handleClickItem(item,index)">
      {{item}}
    </div>
    <div class="a-tabs-head-indicator" :style="indicatorStyle"></div>
  </div>
</template>

<script>
  export default {
    name: "a-tabs-head",
    props: {
      labels: {
        type: Array,
        default: () => []
      },
      indicatorSize: {
        type: Number,
        default: 3
      },
      indicatorColor: {
        type: String,
        default: '#84d8ff'
      },
      value: {
        type: Number,
        default: 0
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
      labels(val) {
        this.$nextTick(() => {
          if (!!val && val.length > 0 && !!this.$refs.items) {
            let el = this.$refs.items[this.currentValue]
            while (!el && this.currentValue > -1) {
              this.currentValue--
              el = this.$refs.items[this.currentValue]
            }
            if (this.currentValue > -1) {
              this.indicatorLeft = el.offsetLeft
              this.indicatorWidth = el.offsetWidth
            }
          }
        })
      },
    },
    data() {
      return {
        currentValue: this.value,
        indicatorLeft: 0,
        indicatorWidth: 100,
        timer: null,
      }
    },
    methods: {
      _handleMouseEnter(e) {
        if (!!this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
        this.indicatorLeft = e.target.offsetLeft
        this.indicatorWidth = e.target.offsetWidth
      },
      _handleMouseLeave(e) {
        if (!!this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
        this.timer = setTimeout(() => {
          this.indicatorLeft = this.$refs.items[this.currentValue].offsetLeft
          this.indicatorWidth = this.$refs.items[this.currentValue].offsetWidth
        }, 100)
      },
      _handleClickItem(item, index) {
        this.currentValue = index
        this.$emit('change', {item, index})
      },
    },
    computed: {
      indicatorStyle() {
        return {
          left: `${this.indicatorLeft}px`,
          width: `${this.indicatorWidth}px`,
          backgroundColor: this.indicatorColor,
          height: `${this.indicatorSize}px`,
          borderRadius: `${this.indicatorSize}px`,
        }
      },
    }
  }
</script>

<style lang="scss">
  .a-tabs-head {
    position: relative;
    padding-left: 12px;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    .a-tabs-head-item {
      height: 100%;
      display: inline-flex;
      align-items: center;
      margin-right: 24px;
      user-select: none;
      color: #999;
      &.active {
        color: $text-color-primary;
      }
    }
    .a-tabs-head-indicator {
      transition: all 0.15s;
      position: absolute;
      border-radius: 2px;
      bottom: 0;
    }
  }
</style>
