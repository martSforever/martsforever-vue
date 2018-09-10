<template>
  <div class="a-table-body"
       :style="bodyStyles"
       @scroll="_handleScroll"
       ref="tableBody">
    <table v-watch-dom="_handleDomChange"
           ref="table"
           :style="tableStyles"
           style="table-layout: fixed;word-break: break-all">
      <a-table-row
        v-for="(row,rowIndex) in dataList"
        :key="'row'+uuid()"
        :uuid="'row'+uuid()"
        :row="row"
        :row-index="rowIndex"
        :row-style-func="rowStyleFunc"
        :cell-style-func="cellStyleFunc"
        :bottom-line="bottomLine"
        :striple="striple"
        :render-columns="renderColumns"
        :padding="padding"
        :row-height="rowHeight"
        :border-size="borderSize"
        :border-color="borderColor"
        :border-style="borderStyle"
        :multi-editable="multiEditable"

        :fixed-position="fixedPosition"
      />
    </table>
  </div>
</template>

<script>
  import RenderingScopeSlot from "../rendering-scope-slot";
  import RenderingRenderFunc from "../rendering-render-func";
  import ATableRow from "./a-table-row";
  import {uuid} from "../../script/utils";

  export default {
    name: "a-table-body",
    components: {ATableRow, RenderingRenderFunc, RenderingScopeSlot},
    props: {
      renderColumns: {
        type: Array,
        default: () => []
      },
      dataList: {
        type: Array,
        default: () => []
      },
      fitWidth: {
        type: Boolean,
        default: false
      },
      borderSize: {
        desc: '边框宽度',
      },
      borderColor: {
        type: String,
        default: 'transparent',
        desc: '边框颜色',
      },
      borderStyle: {
        type: String,
        default: 'solid',
        desc: '边框风格',
      },
      padding: {
        type: String,
        desc: '每个单元格的内边距',
      },
      rowHeight: {
        type: String,
      },
      bodyHeight: {
        type: Number,
      },
      bodyHasVerticalScrollbar: {
        type: Boolean,
        default: null
      },
      scrollLeft: {},
      scrollTop: {},
      bottomLine: {
        type: Boolean,
      },
      striple: {
        type: Boolean,
      },
      rowStyleFunc: {
        type: Function,
        desc: '行样式渲染',
      },
      cellStyleFunc: {
        type: Function,
        desc: '单元格样式渲染'
      },
      multiEditable: {},

      fixedPosition: {},
    },
    computed: {
      tableStyles() {
        let ret = {}
        !!this.fitWidth && (ret.width = '100%')
        return ret
      },
      tdStyles() {
        return {
          border: `${this.borderStyle} ${this.borderSize}px ${this.borderColor}`,
        }
      },
      bodyStyles() {
        let ret = {}
        !!this.bodyWidth && (ret.width = this.bodyWidth + 'px')

        if (this.fixedPosition === 'center') {
          ret.height = !!this.bodyHeight ? `${this.bodyHeight}px` : '100%'
        } else {
          ret.overflowX = 'hidden'
          if (!!this.bodyHeight) {
            ret.height = (!!this.hasHorizontalScrollbar ? this.bodyHeight - 17 : this.bodyHeight) + 'px'
          } else {
            ret.height = !!this.hasHorizontalScrollbar ? 'calc(100% -17px)' : '100%'
          }
        }
        return ret
      },
    },
    watch: {
      currentBodyHasVerticalScrollbar(val) {
        this.$emit('update:bodyHasVerticalScrollbar', val)
      },
      scrollLeft(val) {
        if (this.currentScrollLeft !== val) {
          this.currentScrollLeft = val;
          this.$refs.tableBody.scrollLeft = val
        }
      },
      scrollTop(val) {
        if (this.currentScrollTop !== val) {
          this.currentScrollTop = val;
          this.$refs.tableBody.scrollTop = val
        }
      },
      currentScrollLeft(val) {
        this.$emit('update:scrollLeft', val)
      },
      currentScrollTop(val) {
        this.$emit('update:scrollTop', val)
      },
      renderColumns: {
        handler(val) {
          this._hasHorizontalScrollbar()
        },
        deep: true
      },
    },
    data() {
      return {
        currentBodyHasVerticalScrollbar: this.bodyHasVerticalScrollbar,
        currentScrollLeft: this.scrollLeft,
        currentScrollTop: this.scrollTop,

        hasHorizontalScrollbar: false,
        bodyWidth: null,
      }
    },
    mounted() {
      setTimeout(() => this._updateHasScrollBar(), 300)
    },
    methods: {
      uuid,
      _handleScroll(e) {
        this.currentScrollLeft = e.target.scrollLeft
        this.currentScrollTop = e.target.scrollTop
      },
      _handleDomChange() {
        this._updateHasScrollBar()
        let {scrollLeft, offsetWidth, scrollWidth} = this.$refs.tableBody
        if ((scrollWidth - offsetWidth - 17 - scrollLeft) < 1) {
          this.$refs.tableBody.scrollLeft = this.$refs.tableBody.scrollLeft + 17
        }
      },
      _updateHasScrollBar() {
        if (this.fixedPosition === 'center') {
          let bodyHeight = this.$refs.tableBody.offsetHeight
          let tableHeight = this.$refs.table.offsetHeight
          this.currentBodyHasVerticalScrollbar = tableHeight > bodyHeight
        }
      },
      _hasHorizontalScrollbar() {
        setTimeout(() => {
          this.bodyWidth = this.$refs.tableBody.parentNode.parentNode.offsetWidth
          let tableWidth = this.$refs.table.offsetWidth
          if (this.hasHorizontalScrollbar === tableWidth > this.bodyWidth) return
          // console.log(this.hasHorizontalScrollbar, tableWidth, this.bodyWidth)
          this.hasHorizontalScrollbar = tableWidth > this.bodyWidth
        }, 300)
      },
    },
  }
</script>

<style lang="scss">
  .a-table-body {
    display: inline-block;
    overflow-y: auto;
    .a-table-body-tr {
      &.a-table-body-tr-striple:nth-child(even) {
        background-color: $table-bottom-color;
      }
      &.a-table-body-tr-bottom-line {
        .a-table-body-td {
          border-bottom-color: $table-bottom-color !important;
        }
      }
    }
  }
</style>
