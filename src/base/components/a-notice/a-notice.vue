<template>
  <div class="a-notice">
    <div class="standard">
      <div class="title">
        <span class="text">{{title}}</span>
        <a-icon icon="fa-times" @click="close"/>
      </div>
      <div class="message">{{message}}</div>
    </div>
  </div>
</template>

<script>
  import {oneOf} from "../../script/utils";
  import AIcon from "../a-icon/a-icon";

  export default {
    name: "a-notice",
    components: {AIcon},
    props: {
      duration: {
        type: Number,
        default: 3000,
        desc: '自动关闭时间间隔',
      },
      message: {
        type: String,
        desc: '要显示的信息',
      },
      title: {
        type: String,
        default: 'Notice Title',
        desc: '标题',
      },
      closable: {
        type: Boolean,
        default: true,
        desc: '是否可以关闭',
      },
      autoClose: {
        type: Boolean,
        default: true,
        desc: '是否自动关闭',
      },
      type: {
        type: String,
        default: 'info',
        desc: '消息提示类型，共有4种',
        validator(val) {
          return oneOf(val, ['info', 'success', 'warn', 'error'])
        },
      },
    },
    methods: {
      close() {
        this.$emit('close')
      },
    },
    mounted() {
      !!this.autoClose && setTimeout(() => this.close(), this.duration)
    },
  }
</script>

<style lang="scss">
  .a-notice {
    background-color: white;
    border-radius: $border-fillet;
    margin: 6px;
    padding: 12px;
    min-width: 225px;
    .standard {
      .title {
        font-size: 18px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .text {
          color: black;
        }
        .a-icon {
          cursor: pointer;
          @include transition-all();
          &:hover {
            transform: rotate(360deg);
          }
        }
      }
      .message {
        font-size: 14px;
      }
    }
  }
</style>