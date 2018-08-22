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
              <div v-for="(item,index) in hours"
                   :key="index"
                   class="item"
                   :class="{valid:item !== '',active:item === hour}"
                   @click="_handleClickItem(item,$event,'hour')">{{item}}
              </div>
            </a-scrollbar>
          </div>
          <div class="col minute">
            <a-scrollbar :scroll-bar-size="scrollbarSize"
                         :scroll-bar-color="scrollbarColor"
                         :indicator-color="indicatorColor"
                         ref="scrollbarMinutes">
              <div v-for="(item,index) in minutes"
                   :key="index"
                   class="item"
                   :class="{valid:item !== '',active:item === minute}"
                   @click="_handleClickItem(item,$event,'minute')">{{item}}
              </div>
            </a-scrollbar>
          </div>
          <div class="col second">
            <a-scrollbar :scroll-bar-size="scrollbarSize"
                         :scroll-bar-color="scrollbarColor"
                         :indicator-color="indicatorColor"
                         ref="scrollbarSeconds">
              <div v-for="(item,index) in seconds"
                   :key="index"
                   class="item"
                   :class="{valid:item !== '',active:item === second}"
                   @click="_handleClickItem(item,$event,'second')">{{item}}
              </div>
            </a-scrollbar>
          </div>
        </div>
        <div class="foot">
          <a-button type="success">
            <a-icon icon="fa-check"/>
          </a-button>
          <a-button type="error">
            <a-icon icon="fa-times"/>
          </a-button>
        </div>
      </div>
    </a-dropdown>
  </div>
</template>

<script>
  import ADropdown from "../a-dropdown/a-dropdown";
  import AInput from "../a-input/a-input";
  import AScrollbar from "../a-scrollbar/a-scrollbar";
  import AIcon from "../a-icon/a-icon";
  import AButton from "../a-button/a-button";

  export default {
    name: "a-time-picker",
    components: {AButton, AIcon, AScrollbar, AInput, ADropdown},
    props: {
      show: {
        type: Boolean,
        default: false
      },
      format: {
        type: String,
        default: 'hh:mm:ss'
      },
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

      hours.pushArray(['', '', '']).unshiftArray(['', '', ''])
      minutes.pushArray(['', '', '']).unshiftArray(['', '', ''])
      seconds.pushArray(['', '', '']).unshiftArray(['', '', ''])

      return {
        hours: hours,                     //小时数组
        minutes: minutes,                 //分钟数组
        seconds: seconds,                 //秒数组
        currentShow: this.show,           //当前是否显示

        scrollbarSize: 6,                 //滚动条大小
        scrollbarColor: 'white',          //滚动条颜色
        indicatorColor: '#ddd',           //滚动条指示器颜色

        isUpdateScrollBar: false,         //是否已经刷新过滚动条

        hour: 0,                          //当前选中的小时
        minute: 0,                        //当前选中的分钟
        second: 0,                        //当前选中的秒
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
          setTimeout(() => {
            this.$refs.scrollbarHours.scrollToY(28 * 3)
            this.$refs.scrollbarMinutes.scrollToY(28 * 3)
            this.$refs.scrollbarSeconds.scrollToY(28 * 3)
          }, 100)
        }
      },
      _handleClickItem(item, e, type) {
        if (item === '') return
        switch (type) {
          case 'hour':
            this.hour = item
            this.$refs.scrollbarHours.scrollToY(e.target.offsetTop - 28 * 3)
            break
          case 'minute':
            this.minute = item
            this.$refs.scrollbarMinutes.scrollToY(e.target.offsetTop - 28 * 3)
            break
          case 'second':
            this.second = item
            this.$refs.scrollbarSeconds.scrollToY(e.target.offsetTop - 28 * 3)
            break
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
      height: 196px;
      width: 150px;
      background-color: white;
      .col {
        width: 50px;
        float: left;
        height: 196px;
        box-sizing: border-box;
        padding-left: 6px;
        .item {
          height: 28px;
          text-align: center;
          line-height: 28px;
        }
        .valid {
          transition: all 0.4s;
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
      .minute {
        border-left: solid 1px $hover-color;
        border-right: solid 1px $hover-color;
      }
    }
    .foot {
      padding: 6px 6px 0 6px;
      border-top: #ddd solid 1px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .a-btn {
        margin-left: 6px;
        .a-icon {
          color: white;
        }
      }
    }
  }
</style>
