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
        :key="rowIndex"
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
      />
    </table>
  </div>
</template>

<script>
  import RenderingScopeSlot from "../rendering-scope-slot";
  import RenderingRenderFunc from "../rendering-render-func";
  import ATableRow from "./a-table-row";

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
        !!this.bodyHeight && (ret.height = this.bodyHeight + 'px')
        return ret
      },
    },
    watch: {
      currentBodyHasVerticalScrollbar(val) {
        this.$emit('update:bodyHasVerticalScrollbar', val)
      },
      scrollLeft(val) {
        if (this.currentScrollLeft !== val) this.currentScrollLeft = val;
      },
      currentScrollLeft(val) {
        this.$emit('update:scrollLeft', val)
      },
    },
    data() {
      return {
        currentBodyHasVerticalScrollbar: this.bodyHasVerticalScrollbar,
        currentScrollLeft: this.scrollLeft
      }
    },
    mounted() {
      setTimeout(() => this._updateHasScrollBar(), 100)
    },
    methods: {
      _handleScroll(e) {
        this.currentScrollLeft = e.target.scrollLeft
      },
      _handleDomChange() {
        this._updateHasScrollBar()
        let {scrollLeft, offsetWidth, scrollWidth} = this.$refs.tableBody
        if ((scrollWidth - offsetWidth - 17 - scrollLeft) < 1) {
          this.$refs.tableBody.scrollLeft = this.$refs.tableBody.scrollLeft + 17
        }
      },
      _updateHasScrollBar() {
        let bodyHeight = this.$refs.tableBody.offsetHeight
        let tableHeight = this.$refs.table.offsetHeight
        this.currentBodyHasVerticalScrollbar = tableHeight > bodyHeight
      },

    },
  }
</script>

<style lang="scss">
  .a-table-body {
    max-width: 100%;
    display: inline-block;
    overflow-x: auto;
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
      &:hover {
        background-color: darken($table-bottom-color, 3) !important;
      }
    }
  }
</style>
