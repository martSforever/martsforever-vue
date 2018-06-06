<template>
  <div :class="cls">
    <transition :name="transitionName">
      <div
        :class="shadowCls"
        :style="shadowStyles"
        v-dom-portal="underBody === true || underBody === 'Y'"
        @click.stop="handleClickWrapper"
        v-show="currentValue">
        <div
          :class="contentCls"
          :style="contentStyles"
          @click.stop="handleClickContent">
          <div :class="headCls" v-if="hasHeadSlot || !!title || (closeIcon === true || closeIcon === 'Y')">
            <slot name="head"/>
            <div v-if="!hasHeadSlot">{{title}}</div>
            <a-icon fa="fa-times" class="close-icon" @click="handleClickCloseIcon"/>
          </div>
          <div :class="bodyCls">
            <slot></slot>
          </div>
          <div :class="footCls" v-if="hasFootSlot">
            <slot name="foot"/>
            <div v-if="!hasFootSlot">tooltip</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import prefix from 'src/base/script/css-prefix.js';
  import {oneOf} from "../../script/utils";
  import AIcon from "../a-icon/a-icon";

  export default {
    components: {AIcon},
    name: "a-modal",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      shadowColor: {
        type: String,
        default: 'rgba(0,0,0,0.3)',
        desc: '遮罩颜色',
      },
      width: {
        type: String,
        default: '500px',
        desc: '内容宽度',
      },
      height: {
        type: String,
        default: '300px',
        desc: '内容高度',
      },
      underBody: {
        type: [Boolean, String],
        default: true,
        desc: '是否将遮罩连同对话框移动到body节点下'
      },
      shape: {
        type: String,
        default: 'fillet',
        validator(val) {
          return oneOf(val, ['fillet', 'none']);
        },
      },
      transitionName: {
        type: String,
        default: 'scale-in'
      },
      title: {
        type: String
      },
      closeIcon: {
        type: [String, Boolean],
        default: true,
        validator(val) {
          return oneOf(val, ['Y', 'N', true, false]);
        },
      }
    },
    watch: {
      value(newVal, oldVal) {
        if (newVal !== oldVal) this.currentValue = newVal;
      },
    },
    data() {
      return {
        prefix: prefix.prefixModal,
        currentValue: this.value,
        hasHeadSlot: !!this.$slots.head,
        hasFootSlot: !!this.$slots.foot
      }
    },
    created() {

    },
    computed: {
      cls() {
        return [
          `${this.prefix}`,
        ]
      },
      shadowCls() {
        return [
          `${this.prefix}-shadow`
        ]
      },
      headCls() {
        return [
          `${this.prefix}-head`
        ]
      },
      contentCls() {
        return [
          `${this.prefix}-content`,
          `${this.prefix}-content-${this.shape}`
        ]
      },
      bodyCls() {
        return [
          `${this.prefix}-body`
        ]
      },
      footCls() {
        return [
          `${this.prefix}-foot`
        ]
      },

      shadowStyles() {
        return {
          backgroundColor: this.shadowColor
        }
      },
      contentStyles() {
        return {
          width: this.width,
          height: this.height
        }
      },
    },
    methods: {
      handleClickWrapper(e) {
        this.currentValue = false;
        this.$emit('input', this.currentValue);
      },
      handleClickContent(e) {
        this.$emit('clickContent');
      },
      handleClickCloseIcon(e) {
        console.log('click');
        this.currentValue = false;
        this.$emit('input', this.currentValue);
      }
    },
  }
</script>
