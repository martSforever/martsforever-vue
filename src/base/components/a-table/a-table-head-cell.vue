<template>
  <td class="a-table-head-cell"
      :rowspan="rowspan"
      :colspan="colspan"
      @mousemove="_handleMouseMove"
      @mouseleave="_handleMouseLeave"
      @mousedown="_handleMouseDown"
      ref="td"
      :style="tdStyles">
    <!--不能给td设置宽度，当列宽总和大于容器宽度是，table列会被压缩，设置里面的div的宽度即可-->
    <div class="cell-wrapper" :style="_getHeadTdCellStyles(column)">
      <rendering-scope-slot v-if="!!column.titleScopedSlots" :scope-slot-func="column.titleScopedSlots"/>
      <rendering-render-func v-if="!!column.titleRenderFunc" :render-func="column.titleRenderFunc"/>
      <span v-if="!column.titleScopedSlots && !column.titleRenderFunc">{{column.title}}</span>
    </div>
    <div class="drag-indicator" :style="dragIndicatorStyles"></div>
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

      borderSize: {
        type: Number,
        default: 6,
        desc: '边框宽度',
      },
      borderColor: {
        type: String,
        default: '#f2f2f2',
        desc: '边框颜色',
      },
      borderStyle: {
        type: String,
        default: 'solid',
        desc: '边框风格',
      },
      cellColor: {
        type: String,
        default: 'white'
      },
    },
    data() {
      return {
        isHoverBorder: false,
        dragIndicatorHeight: 0
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
      },
      _handleMouseLeave(e) {
        if (!this.isBottom) return
      },
      _handleMouseDown(e) {
      },
    },
    mounted() {
      this.dragIndicatorHeight = this.$refs.td.offsetHeight - 5
    },
    computed: {
      /*是否为最下级表头，就是没有子表头的*/
      isBottom() {
        let children = this.column.children
        return !(!!children && children.length > 0)
      },
      tdStyles() {
        return {
          border: `${this.borderStyle} ${this.borderSize}px ${this.borderColor}`,
          backgroundColor: `${this.cellColor}`
        }
      },
      dragIndicatorStyles() {
        return {
          width: `${this.borderSize}px`,
          right: `-${this.borderSize}px`,
          height: this.dragIndicatorHeight + 'px'
        }
      },
    },
  }
</script>

<style lang="scss">
  .a-table-head-cell {
    color: black;
    /*不在支持cellspacing，使用border替代*/
    position: relative;
    .cell-wrapper {
      padding: 6px;
      width: 100%;
      .rendering-scope-slot, .rendering-render-func {
        display: inline-block;
      }
    }
    .drag-indicator {
      position: absolute;
      height: 100%;
      background-color: black;
      top: 0;
      cursor: w-resize;
    }
  }
</style>
