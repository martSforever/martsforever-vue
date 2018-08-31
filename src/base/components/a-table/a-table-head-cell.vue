<template>
  <td class="a-table-head-cell"
      :rowspan="rowspan"
      :colspan="colspan"
      ref="td"
      :style="tdStyles">
    <!--不能给td设置宽度，当列宽总和大于容器宽度是，table列会被压缩，设置里面的div的宽度即可-->
    <div class="cell-wrapper" :style="_getHeadTdCellStyles(column)">
      <rendering-scope-slot v-if="!!column.titleScopedSlots" :scope-slot-func="column.titleScopedSlots"/>
      <rendering-render-func v-if="!!column.titleRenderFunc" :render-func="column.titleRenderFunc"/>
      <span v-if="!column.titleScopedSlots && !column.titleRenderFunc">{{column.title}}</span>
    </div>
    <div class="drag-indicator"
         :style="dragIndicatorStyles"
         @mousedown="_handleMouseDown"></div>
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
        dragIndicatorHeight: 0,               //用来拖拽的指示器的宽度

      }
    },
    methods: {
      _getHeadTdCellStyles(column) {
        let ret = {}
        ret.width = column.width
        return ret
      },
      _handleMouseMove(e) {
        console.log('move', this.column.title)
      },
      _handleMouseDown(e) {
        document.addEventListener('mousemove', this._handleMouseMove)
        document.addEventListener('mouseup', this._handleMouseUp)
        document.body.style.userSelect = 'none'
      },
      _handleMouseUp(e) {
        document.removeEventListener('mousemove', this._handleMouseMove)
        document.removeEventListener('mouseup', this._handleMouseUp)
        document.body.style.userSelect = 'auto'
      },
    },
    mounted() {
      this.dragIndicatorHeight = this.$refs.td.offsetHeight - 5
    },
    computed: {
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
      z-index: 1;
    }
  }
</style>
