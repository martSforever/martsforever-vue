<template>
  <td class="a-table-head-cell"
      :rowspan="rowspan"
      :colspan="colspan"
      @mousemove="_handleMouseMove"
      @mouseleave="_handleMouseLeave"
      ref="td">
    <!--不能给td设置宽度，当列宽总和大于容器宽度是，table列会被压缩，设置里面的div的宽度即可-->
    <div class="cell" :style="_getHeadTdCellStyles(column)">
      <rendering-scope-slot v-if="!!column.titleScopedSlots" :scope-slot-func="column.titleScopedSlots"/>
      <rendering-render-func v-if="!!column.titleRenderFunc" :render-func="column.titleRenderFunc"/>
      <span v-if="!column.titleScopedSlots && !column.titleRenderFunc">{{column.title}}</span>
    </div>
  </td>
</template>

<script>
  import RenderingRenderFunc from "../rendering-render-func";
  import RenderingScopeSlot from "../rendering-scope-slot";

  export default {
    name: "a-table-head-cell",
    components: {RenderingScopeSlot, RenderingRenderFunc},
    props: {
      rowspan: {
        default: 1,
        desc: '占行数',
      },
      colspan: {
        default: 1,
        desc: '占列数',
      },
      column: null,
    },
    data() {
      return {
        isHoverBorder: false
      }
    },
    methods: {
      _getHeadTdCellStyles(column) {
        let ret = {}
        ret.width = column.width
        return ret
      },
      _handleMouseMove(e) {
        if (!this.isBottom) return
        let {offsetX} = e
        let offsetWidth = this.$refs.td.offsetWidth
        document.body.style.cursor = Math.abs(offsetX - offsetWidth + 5) < 5 ? 'w-resize' : 'default'
      },
      _handleMouseLeave(e) {
        if (!this.isBottom) return
        document.body.style.cursor = 'default'
      },
    },
    computed: {
      /*是否为最下级表头，就是没有子表头的*/
      isBottom() {
        let children = this.column.children
        return !(!!children && children.length > 0)
      }
    },
  }
</script>

<style lang="scss">
  .a-table-head-cell {

  }
</style>
