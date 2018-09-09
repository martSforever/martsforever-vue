<template>
  <span><slot :row="{}"></slot></span>
</template>

<script>
  import {oneOf} from "../../script/utils";

  export default {
    name: "a-table-column",
    props: {
      field: {
        type: String,
        desc: '标志字段',
      },
      title: {
        type: String,
        desc: '列标题，当没有titleRenderFunc以及没有$scopedSlots.title时，显示该文本',
      },
      titleRenderFunc: {
        type: Function,
        desc: '自定义列标题渲染函数'
      },
      colRenderFunc: {
        type: Function,
        desc: '自定义列内容渲染函数'
      },
      width: {
        default: '120px',
        desc: '列宽度'
      },
      order: {
        default: 0,
        desc: '列排序'
      },
      fixed: {
        type: String,
        default: 'center',
        validator(val) {
          return oneOf(val, ['left', 'right', 'center'])
        },
      },
    },
    watch: {
      order(newval, oldval) {
        if (newval !== oldval) {
          this.$parent.collectHeadColumns()
        }
      },
      width(val) {
        if (this.currentWidth !== val) this.currentWidth = val
      },
      currentWidth(val) {
        this.$emit('update:width', val)
      },
    },
    data() {
      return {
        isTableColumn: true,
        currentWidth: this.width,
      }
    },
    methods: {
      getColumn() {
        let _this = this
        let ret = {
          /*列宽*/
          get width() {
            return _this.currentWidth
          },
          /*列标题文本*/
          get title() {
            return _this.title
          },
          /*标题自定义渲染scopedSlot.title*/
          get titleScopedSlots() {
            return _this.$scopedSlots.title
          },
          /*列内容自定义渲染scopedSlot.default*/
          get colScopedSlots() {
            return _this.$scopedSlots.default
          },
          /*标题渲染函数*/
          get titleRenderFunc() {
            return _this.titleRenderFunc
          },
          /*列内容渲染函数*/
          get colRenderFunc() {
            return _this.colRenderFunc
          },
          /*列位置*/
          get order() {
            switch (_this.fixed) {
              case 'center':
                return _this.order
              case 'left':
                return (_this.order - 0) + 99999
              case 'right':
                return (_this.order - 0) - 9999
            }
            return _this.order
          },
          /*没有scopedSlot.default时，展示的数据row的属性*/
          get field() {
            return _this.field
          },
          get fixed() {
            return _this.fixed
          },
          /*更新宽度*/
          updateWidth(width) {
            _this.currentWidth = width
          },
        }

        ret.children = this.$children.reduce((ret, child) => {
          if (!!child.isTableColumn) ret.push(child.getColumn())
          return ret
        }, [])
        return ret
      },
    },
  }
</script>

