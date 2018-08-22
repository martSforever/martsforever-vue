<template>
  <div class="a-time-spinner">
    <a-scrollbar :scroll-bar-size="scrollbarSize"
                 :scroll-bar-color="scrollbarColor"
                 :indicator-color="indicatorColor"
                 ref="scrollbar">
      <div v-for="(item,index) in options"
           :key="index"
           class="item"
           :class="{valid:item != null,active:item === currentValue}"
           @click="_handleClickItem(item,$event)">{{item}}
      </div>
    </a-scrollbar>
  </div>
</template>

<script>
  import AScrollbar from "../a-scrollbar/a-scrollbar";

  export default {
    name: "a-time-spinner",
    components: {AScrollbar},
    props: {
      scrollbarSize: {
        type: Number,
        default: 6
      },
      scrollbarColor: {
        type: String,
        default: 'white'
      },
      indicatorColor: {
        type: String,
        default: '#ddd'
      },
      length: {
        type: Number,
        default: 59
      },
      value: {
        type: Number,
        default: 0
      },
    },
    data() {
      return {
        currentValue: this.value
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
    computed: {
      options() {
        let ret = [], i = 0
        ret.pushArray([null, null, null])
        while (i < this.length) {
          ret.push(i)
          i++
        }
        ret.pushArray([null, null, null])
        return ret
      },
    },
    methods: {
      _handleClickItem(item, e) {
        this.currentValue = item
        this.scrollToY(e.target.offsetTop - 28 * 3)
      },
      updateScrollBar() {
        this.$refs.scrollbar.update()
      },
      scrollToY(y) {
        this.$refs.scrollbar.scrollToY(y)
      },
    }
  }
</script>

<style lang="scss">

  $hover-color: #ddd;

  .a-time-spinner {
    width: 50px;
    height: 196px;
    box-sizing: border-box;
    padding-left: 6px;
    background-color: white;
    float: left;
    .item {
      height: 28px;
      text-align: center;
      line-height: 28px;
    }
    .valid {
      cursor: pointer;
      border-radius: 3px;
      &:hover {
        background-color: $hover-color;
        color: white;
      }
      &.active {
        background-color: $text-color-primary;
        color: white;
      }
    }
  }
</style>
