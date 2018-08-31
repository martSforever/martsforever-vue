<template>
  <span><slot></slot></span>
</template>

<script>
  export default {
    name: "a-table-column",
    props: {
      field: {
        type: String,
      },
      title: {
        type: String,
      },
      titleRenderFunc: {
        type: Function,
      },
      colRenderFunc: {
        type: Function
      },
      width: {
        default: '120px'
      },
      order: {
        default: 0
      },
    },
    methods: {
      getColumn() {
        let _this = this
        let ret = {
          get width() {
            return _this.width
          },
          get title() {
            return _this.title
          },
          get titleScopedSlots() {
            return _this.$scopedSlots.title
          },
          get colScopedSlots() {
            return _this.$scopedSlots.default
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

<style scoped lang="scss">

</style>
