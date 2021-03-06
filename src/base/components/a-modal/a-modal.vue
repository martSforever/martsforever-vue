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
            <div v-if="!hasHeadSlot && !!title" class="default-header">
              <a-icon :icon="typeIcon.icon" :style="typeIconColor(typeIcon.color)"/>
              {{title}}
            </div>
            <a-icon icon="fa-times" class="close-icon" @click="handleClickCloseIcon"/>
          </div>
          <div :class="bodyCls" :style="bodyStyles">
            <slot></slot>
          </div>
          <div :class="footCls" v-show="hasFootSlot && showFoot">
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

  const typeIcons = {
    success: {
      icon: 'fa-info-circle',
      color: '#00ff80'
    },
    info: {
      icon: 'Idea',
      color: '#c0c0c8'
    },
    primary: {
      icon: 'info',
      color: '#0ac2ff'
    },
    warning: {
      icon: 'warning',
      color: '#e9f01d'
    },
    error: {
      icon: 'error',
      color: '#e03636'
    },
  };

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
      },
      type: {
        type: String,
        default: 'primary',
        validator(val) {
          return oneOf(val, ['info', 'primary', 'success', 'error', 'warning']);
        },
      },
      relativeTop: {
        type: Number,
        default: 25
      },
      showFoot: {
        type: Boolean,
        default: true
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
          backgroundColor: this.shadowColor,
        }
      },
      bodyStyles() {
        return {
          minHeight:'78px'
        }
      },
      contentStyles() {
        return {
          width: this.width,
          height: this.height,
          position: 'relative',
          top: `-${this.relativeTop}%`,
        }
      },
      typeIcon() {
        return typeIcons[this.type];
      },
      hasFootSlot() {
        return !!this.$slots.foot;
      },
    },
    methods: {
      typeIconColor(color) {
        return {
          color: color,
          fontSize: '20px',
          marginRight: '12px'
        }
      },
      handleClickWrapper(e) {
        this.hide();
      },
      handleClickContent(e) {
        this.$emit('clickContent');
      },
      handleClickCloseIcon(e) {
        this.hide();
      },
      show() {
        (this.currentValue !== true) && (this.$emit('change', true));
        this.currentValue = true;
        this.$emit('input', this.currentValue);
      },
      hide() {
        (this.currentValue !== false) && (this.$emit('change', false));
        this.currentValue = false;
        this.$emit('input', this.currentValue);
      },
    },
  }
</script>
