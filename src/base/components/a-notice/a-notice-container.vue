<template>
  <div class="a-notice-container" :style="containerStyles">
    <div class="a-notice-wrapper" :style="contentStyles">
      <a-move-container>
        <a-move-item v-for="(option) in noticeOptions" :key="option.id">
          <a-notice
            :message="option.message"
            :title="option.title"
            :type="option.type"
            :auto-close="option.autoClose"
            :duration="option.duration"
            :render-func="option.renderFunc"
            @close="_handleClose(option)"/>
        </a-move-item>
      </a-move-container>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue'
  import {deepCopy, oneOf, uuid} from "../../script/utils";
  import ANotice from "./a-notice";
  import AMoveContainer from "../a-move/a-move-container";
  import AMoveItem from "../a-move/a-move-item";

  const NoticeContainer = {
    name: "a-notice-container",
    components: {AMoveItem, AMoveContainer, ANotice},
    props: {
      horizontal: {
        type: String,
        default: 'end',
        validator(val) {
          return oneOf(val, ['start', 'center', 'end'])
        },
      },
      vertical: {
        type: String,
        default: 'start',
        validator(val) {
          return oneOf(val, ['start', 'center', 'end'])
        },
      },
    },
    data() {
      return {
        PositionMap: {},
        noticeOptions: []
      }
    },
    methods: {
      _handleClick() {
        console.log('click')
      },
      addNotice(options) {
        options.id = uuid()
        this.noticeOptions.push(options)
      },
      _getContainerStylesData() {
        return {
          [this.horizontal === 'end' ? 'right' : 'left']: this.horizontal === 'center' ? 50 : 0,
          [this.vertical === 'end' ? 'bottom' : 'top']: this.vertical === 'center' ? 50 : 0,
        }
      },
      _handleClose(option) {
        this.noticeOptions.remove(option)
      },
    },
    computed: {
      containerStyles() {
        let containerStyles = this._getContainerStylesData()
        containerStyles.iterate((key, value) => containerStyles[key] = `${value}%`)
        return containerStyles
      },
      contentStyles() {
        let contentStyles = this._getContainerStylesData()
        contentStyles.iterate((key, value) => contentStyles[key] = `${-value}%`)
        return contentStyles
      },
    },
    newInstance(props) {
      const component = new Vue({
        render(h) {
          return h(NoticeContainer, {props})
        },
      })
      const instance = component.$mount()
      document.body.appendChild(instance.$el)
      return instance.$children[0]
    },
  }
  export default NoticeContainer
</script>

<style lang="scss">
  .a-notice-container {
    position: absolute;
    z-index: 1;
    .a-notice-wrapper {
      position: relative;
    }
  }
</style>
