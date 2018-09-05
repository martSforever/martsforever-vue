<template>
  <span><slot></slot></span>
</template>

<script>
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
    },
    watch: {
      order(newval, oldval) {
        if (newval !== oldval) {
          this.$parent._updateHeadRows()
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
        currentWidth: this.width
      }
    },
    methods: {
      getColumn() {
        let _this = this
        let ret = {
          get width() {
            return _this.currentWidth
          },
          get title() {
            return _this.title
          },
          get titleScopedSlots() {
            return _this.$scopedSlots.title
          },
          get colScopedSlots() {
            return _this.$scopedSlots.content
          },
          get titleRenderFunc() {
            return _this.titleRenderFunc
          },
          get colRenderFunc() {
            return _this.colRenderFunc
          },
          get order() {
            return _this.order
          },
          get field() {
            return _this.field
          },
          updateWidth(width) {
            _this.currentWidth = width
          },
        }

        ret.children = this.$children.reduce((ret, child) => {
          if (child.$options.name === 'a-table-column') ret.push(child.getColumn())
          return ret
        }, [])
        return ret
      },
    },
  }
</script>

