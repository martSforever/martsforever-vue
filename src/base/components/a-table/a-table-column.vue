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
    },
    methods: {
      getColumn() {
        let ret = {
          field: this.field,
          title: this.title,
          titleScopedSlots: this.$scopedSlots.title,
          colScopedSlots: this.$scopedSlots.default,
          titleRenderFunc: this.titleRenderFunc,
          colRenderFunc: this.colRenderFunc
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
