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
  import {findComponentUpward, removePx} from "../../script/utils";

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
        table: null,
        indicatorRect: {},
      }
    },
    methods: {
      _getHeadTdCellStyles(column) {
        let ret = {}
        ret.width = column.width
        return ret
      },
      _handleMouseMove(e) {
        this.indicator.style.left = `${e.clientX}px`
      },
      _handleMouseDown(e) {
        this.startX = e.clientX

        /*点击indicator之后，给document加上mousemove事件以及moveup事件*/
        document.addEventListener('mousemove', this._handleMouseMove)
        document.addEventListener('mouseup', this._handleMouseUp)
        document.body.style.userSelect = 'none'                                             //拖拽期间，不能选中任何东西

        /*拖拽的indicator的样式*/
        this.indicator = document.createElement('div')
        this.indicator.style.width = `${e.target.offsetWidth}px`
        this.indicator.style.backgroundColor = 'cadetblue'
        this.indicator.style.zIndex = 1
        this.indicator.style.height = `${this.table.$el.offsetHeight}px`
        this.indicator.style.display = 'inline-block'
        this.indicator.style.position = 'absolute'
        this.indicator.style.top = `${this.table.$el.getBoundingClientRect().top}px`
        this.indicator.style.left = `${e.clientX - e.target.offsetWidth / 2}px`

        document.body.appendChild(this.indicator)
      },
      _handleMouseUp(e) {
        /*拖拽结束之后，清除监听的事件*/
        document.removeEventListener('mousemove', this._handleMouseMove)
        document.removeEventListener('mouseup', this._handleMouseUp)
        document.body.style.userSelect = 'auto'                                             //拖拽结束之后，恢复选中动作
        document.body.removeChild(this.indicator)                                           //拖拽结束后，删除indicator

        this.endX = e.clientX
        let durX = this.endX - this.startX
        let width = removePx(this.column.width)
        width = width + durX
        width = width > 30 ? width : 30
        this.column.updateWidth(`${width}px`)
      },
    },
    mounted() {
      this.dragIndicatorHeight = this.$refs.td.offsetHeight - 5
      this.table = findComponentUpward(this, 'a-table')
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
