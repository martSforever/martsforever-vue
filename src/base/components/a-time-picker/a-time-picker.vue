<template>
  <div class="a-time-picker">
    <a-dropdown
      :show.sync="currentShow"
      trigger="click">
      <a-input @click="_handleClick" :value="currentShow"/>
      <div slot="dropdown">
        <div class="drop-content">
          <div class="col hour">
            <a-scrollbar :scroll-bar-size="scrollbarSize"
                         :scroll-bar-color="scrollbarColor"
                         :indicator-color="indicatorColor"
                         ref="scrollbarHours">
              <div v-for="(item,index) in hours" :key="index" class="item">{{item}}</div>
            </a-scrollbar>
          </div>
          <div class="col minute">
            <a-scrollbar :scroll-bar-size="scrollbarSize"
                         :scroll-bar-color="scrollbarColor"
                         :indicator-color="indicatorColor"
                         ref="scrollbarMinutes">
              <div v-for="(item,index) in minutes" :key="index" class="item">{{item}}</div>
            </a-scrollbar>
          </div>
          <div class="col second">
            <a-scrollbar :scroll-bar-size="scrollbarSize"
                         :scroll-bar-color="scrollbarColor"
                         :indicator-color="indicatorColor"
                         ref="scrollbarSeconds">
              <div v-for="(item,index) in seconds" :key="index" class="item">{{item}}</div>
            </a-scrollbar>
          </div>
        </div>
      </div>
    </a-dropdown>
  </div>
</template>

<script>
  import ADropdown from "../a-dropdown/a-dropdown";
  import AInput from "../a-input/a-input";
  import AScrollbar from "../a-scrollbar/a-scrollbar";

  export default {
    name: "a-time-picker",
    components: {AScrollbar, AInput, ADropdown},
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      show(val) {
        if (this.currentShow !== val) {
          this.currentShow = val
        }
      },
      currentShow(val) {
        this.$emit('update:show', val)
        if (!!val) {
          this._refreshScrollBar()
        }
      },
    },
    data() {
      let hours = []
      for (let i = 0; i < 24; i++) hours.push(i)
      let minutes = []
      for (let i = 0; i < 60; i++) minutes.push(i)
      let seconds = []
      for (let i = 0; i < 60; i++) seconds.push(i)

      return {
        hours: hours,                     //小时数组
        minutes: minutes,                 //分钟数组
        seconds: seconds,                 //秒数组
        currentShow: this.show,           //当前是否显示

        scrollbarSize: 6,                 //滚动条大小
        scrollbarColor: 'white',          //滚动条颜色
        indicatorColor: '#ddd',        //滚动条指示器颜色

        isUpdateScrollBar: false,         //是否已经刷新过滚动条

        hour: null,                       //当前选中的小时
        minute: null,                     //当前选中的分钟
        second: null,                     //当前选中的秒
      }
    },
    methods: {
      _handleClick() {
      },
      _refreshScrollBar() {
        if (!this.isUpdateScrollBar) {
          this.$refs.scrollbarHours.update()
          this.$refs.scrollbarMinutes.update()
          this.$refs.scrollbarSeconds.update()
          this.isUpdateScrollBar = true
        }
      },
    },
    mounted() {

    },
  }
</script>

<style lang="scss">

  $hover-color: #ddd;

  .a-time-picker {
    display: inline-block;
    .drop-content {
      height: 200px;
      width: 150px;
      background-color: white;
      .col {
        width: 50px;
        float: left;
        height: 200px;
        box-sizing: border-box;
        .item {
          height: 28px;
          text-align: center;
          line-height: 28px;
          transition: all 0.4s;
          &:hover {
            background-color: $hover-color;
            color: white;
          }
        }
      }
      .minute {
        border-left: solid 1px $hover-color;
        border-right: solid 1px $hover-color;
      }
    }
  }
</style>
