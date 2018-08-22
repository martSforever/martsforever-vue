<template>
  <div class="a-time-picker">
    <a-dropdown
      :show.sync="currentShow"
      trigger="click">
      <a-input @click="_handleClick" :value="currentShow"/>
      <div slot="dropdown">
        <div class="drop-content">
          <a-time-spinner ref="hourSpinner" :length="24"/>
          <a-time-spinner ref="minuteSpinner"/>
          <a-time-spinner ref="secondSpinner"/>
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
  import ATimeSpinner from "./a-time-spinner";

  export default {
    name: "a-time-picker",
    components: {ATimeSpinner, AButton, AIcon, AScrollbar, AInput, ADropdown},
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
          this.$refs.hourSpinner.updateScrollBar()
          this.$refs.minuteSpinner.updateScrollBar()
          this.$refs.secondSpinner.updateScrollBar()
          this.isUpdateScrollBar = true
          setTimeout(() => {
            this.$refs.hourSpinner.scrollToY(28 * 3)
            this.$refs.minuteSpinner.scrollToY(28 * 3)
            this.$refs.secondSpinner.scrollToY(28 * 3)
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
