<template>
  <div class="a-time-picker">
    <a-dropdown
      :show.sync="currentShow"
      trigger="click">
      <a-input @click="_handleClick" :value="label"/>
      <div slot="dropdown">
        <div class="drop-content">
          <a-time-spinner v-model="hour" ref="hourSpinner" :length="24"/>
          <a-time-spinner v-model="minute" ref="minuteSpinner"/>
          <a-time-spinner v-model="second" ref="secondSpinner"/>
        </div>
        <div class="foot">
          <a-button type="success" @click="_onConfirm">
            <a-icon icon="fa-check"/>
          </a-button>
          <a-button type="error" @click="_onCancel">
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
      value: {
        type: Date,
        default: () => new Date()
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
      value(val) {
        if (this.currentValue !== val) {
          this.currentValue = val
        }
      },
    },
    data() {
      return {
        currentShow: this.show,                                 //当前是否显示
        currentValue: this.value,                               //当前值
        isUpdateScrollBar: false,                               //是否已经刷新过滚动条
        hour: this.value.getHours(),                            //当前选中的小时
        minute: this.value.getMinutes(),                        //当前选中的分钟
        second: this.value.getSeconds(),                        //当前选中的秒
      }
    },
    methods: {
      _handleClick() {
      },
      _refreshScrollBar() {
        if (!this.isUpdateScrollBar) {
          this.$refs.hourSpinner.updateScrollBar()
          this.$refs.hourSpinner.updateScrollTop()
          this.$refs.minuteSpinner.updateScrollBar()
          this.$refs.minuteSpinner.updateScrollTop()
          this.$refs.secondSpinner.updateScrollBar()
          this.$refs.secondSpinner.updateScrollTop()
          this.isUpdateScrollBar = true
        }
      },
      _onConfirm() {
        let time = new Date(this.value)
        time.setHours(this.hour)
        time.setMinutes(this.minute)
        time.setSeconds(this.second)
        this.currentValue = time
        this.$emit('input', this.currentValue)
        this.currentShow = false
      },
      _onCancel() {
        this.currentShow = false
      },
    },
    computed: {
      label() {
        return this.currentValue.format(this.format)
      },
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
