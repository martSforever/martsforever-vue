<template>
  <div class="a-table-head" ref="tableHead" :class="{'a-table-head-border-bottom':!isMultiLevelHeader}">
    <!--表头-->
    <div class="a-table-head-body">
      <table border="1" class="a-table-head-table" :style="tableStyles">
        <tr v-for="(row,trIndex) in headColumns" :key="trIndex">
          <a-table-head-cell
            v-for="(column,cellIndex) in row"
            :key="cellIndex"
            :border-color="!!isMultiLevelHeader?borderColor:'transparent'"
            :border-size="borderSize"
            :border-style="borderStyle"
            :rowspan="column.rowSpan"
            :colspan="column.colSpan"
            :padding="padding"
            :column="column"
            :fixed-position="fixedPosition"/>
        </tr>

        <tr v-if="!!lastRow && !!headColumns && headColumns.length>0"
            :key="lastRowIndex"
            class="a-table-body-tr"
            :style="!!rowStyleFunc?rowStyleFunc(lastRow,lastRowIndex):null"
            :class="{'a-table-body-tr-bottom-line':!!bottomLine,'a-table-body-tr-striple':!!striple}">
          <td v-for="(col,colIndex) in renderColumns"
              :key="colIndex"
              :style="_getTdStyles(col,colIndex,lastRow,lastRowIndex)"
              class="a-table-body-td">
            <div :style="{width:col.width,padding,height:rowHeight}" class="a-table-cell">
              <div v-if="fixedPosition === col.fixed">
                <rendering-scope-slot v-if="!!col.colScopedSlots"
                                      :scope-slot-func="col.colScopedSlots"
                                      :data="{row:lastRow,rowIndex:lastRowIndex,col,colIndex}"/>
                <rendering-render-func v-if="!!col.colRenderFunc"
                                       :render-func="col.colRenderFunc"
                                       :data="{row:lastRow,rowIndex:lastRowIndex,col,colIndex}"/>
                <span v-if="!col.colScopedSlots && !col.colRenderFunc">{{lastRow[col.field]}}</span>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="a-table-head-blank" v-show="!!bodyHasVerticalScrollbar"></div>
  </div>
</template>

<script>
  import RenderingScopeSlot from "../rendering-scope-slot";
  import RenderingRenderFunc from "../rendering-render-func";
  import ATableHeadCell from "./a-table-head-cell";
  import {removePx} from "../../script/utils";
  import ATableColumn from "./a-table-column";
  import ARadio from "../a-radio/a-radio";

  export default {
    name: "a-table-head",
    components: {ARadio, ATableColumn, ATableHeadCell, RenderingRenderFunc, RenderingScopeSlot},
    props: {
      fitWidth: {},
      borderSize: {},
      borderColor: {
        default: '#f2f2f2'
      },
      borderStyle: {},
      padding: {},
      bodyHasVerticalScrollbar: {},
      scrollLeft: {},
      renderColumns: {
        type: Array,
        default: () => []
      },
      rowStyleFunc: {
        type: Function,
        desc: '行样式渲染',
      },
      cellStyleFunc: {
        type: Function,
        desc: '单元格样式渲染'
      },
      lastRow: {},
      bottomLine: {
        type: Boolean,
      },
      striple: {
        type: Boolean,
      },
      rowHeight: {
        type: String,
        desc: '每一行的高度',
      },
      dataList: {},
      headColumns: {
        type: Array,
        default: () => []
      },

      fixedPosition: {},
    },
    data() {
      return {
        maxLevel: 0,
      }
    },
    watch: {
      scrollLeft(val) {
        this.$refs.tableHead.scrollLeft = val
      },
    },
    computed: {
      tableStyles() {
        let ret = {}
        !!this.fitWidth && (ret.width = '100%')
        return ret
      },
      isMultiLevelHeader() {
        return !!this.headColumns && this.headColumns.length > 1
      },
      lastRowIndex() {
        return this.dataList.length
      },
    },
    methods: {
      removePx,
      _getTdStyles(col, colIndex, row, rowIndex) {
        let cellStyles = !!this.cellStyleFunc ? this.cellStyleFunc(col, colIndex, row, rowIndex) : {}
        return Object.assign({}, {border: `${this.borderStyle} ${this.borderSize}px ${this.borderColor}`}, cellStyles)
      },
    },
  }
</script>

<style lang="scss">
  .a-table-head {
    overflow-x: hidden;
    overflow-y: hidden;
    white-space: nowrap;

    max-width: 100%;

    .a-table-head-body {
      display: inline-block;
      white-space: normal;
      flex: 1;
      .a-table-head-table {
        table-layout: fixed;
        word-break: break-all;
      }
    }
    .a-table-head-blank {
      display: inline-block;
      width: 17px;
      background-color: transparent;
      height: 1px
    }

    &.a-table-head-border-bottom {
      border-bottom: solid 1px $table-bottom-color;
    }

  }

</style>
