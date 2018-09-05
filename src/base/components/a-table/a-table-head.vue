<template>
  <div class="a-table-head" ref="tableHead" :class="{'a-table-head-border-bottom':!isMultiLevelHeader}">
    <!--用一个div装下传入的a-table-column，a-table-column实际上没有-->
    <div class="hide-column" v-watch-dom="_handleDomChange">
      <slot></slot>
    </div>
    <!--表头-->
    <div style="display: inline-block;white-space: normal;float: left">
      <table border="1" class="a-table-head-table" :style="tableStyles">
        <tr v-for="(row,trIndex) in headRows" :key="trIndex">
          <a-table-head-cell
            v-for="(column,cellIndex) in row"
            :key="cellIndex"
            :border-color="!!isMultiLevelHeader?borderColor:'transparent'"
            :border-size="borderSize"
            :border-style="borderStyle"
            :rowspan="column.rowSpan"
            :colspan="column.colSpan"
            :padding="padding"
            :column="column"/>
        </tr>
      </table>
    </div>
    <div style="display: inline-block;width: 17px;height: 100%;background-color: #0ac2ff"
         v-show="!!bodyHasVerticalScrollbar"></div>
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
      borderColor: {},
      borderStyle: {},
      padding: {},
      bodyHasVerticalScrollbar: {},
      scrollLeft: {},
    },
    data() {
      return {
        columns: null,
        maxLevel: 0,
        headRows: null,
      }
    },
    watch: {
      columns(val) {
        this.$emit('update:columns', val)
      },
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
        return !!this.headRows && this.headRows.length > 1
      },
    },
    methods: {
      removePx,
      _handleDomChange() {
        this._initializedColumns()
      },
      _initializedColumns() {
        /*---------------------------------------获取所有column的参数-------------------------------------------*/
        let columns = this.$children.reduce((ret, child) => {
          (!!child.isTableColumn) && ret.push(child.getColumn())
          return ret
        }, [])
        /*---------------------------------------计算column的rowSpan以及colSpan，以实现多级表头-------------------------------------------*/
        /*最大层数*/
        let maxLevel = 1;
        /*遍历，计算每个节点的level，以及计算最大level*/
        (function calcLevel(columns, level) {
          if (!!columns && columns.length > 0) {
            if (level > maxLevel) maxLevel = level
            columns.forEach((column) => {
              column.level = level - 1
              calcLevel(column.children, level + 1)
            })
          }
        })(columns, 1);


        /*计算每个节点所占行数以及列数*/
        function calcRowSpan(column) {

          if (!!column.children && column.children.length > 0) {
            column.children.forEach(child => calcRowSpan(child))
            column.rowSpan = 1
            column.colSpan = 0
            column.children.forEach((child) => {
              column.colSpan += child.colSpan
            })
          } else {
            column.rowSpan = maxLevel - column.level
            column.colSpan = 1
          }
        }

        columns.forEach(column => calcRowSpan(column))

        this.maxLevel = maxLevel
        this.columns = columns
        this._updateHeadRows()
      },
      _updateHeadRows() {
        /*将要渲染的头信息*/
        let headRows = []
        let num = 0
        while (num < this.maxLevel) {
          headRows.push([])
          num++
        }

        function iterateColumn(columns) {
          if (!!columns && columns.length > 0) {
            columns.sort((a, b) => (b.order - 0) - (a.order - 0))
            columns.forEach((column) => {
              headRows[column.level].push(column)
              iterateColumn(column.children)
            })
          }
        }

        iterateColumn(this.columns)
        this.headRows = headRows
      },
    }
    ,
    mounted() {
      this._initializedColumns()
    }
    ,
  }
</script>

<style lang="scss">
  .a-table-head {
    overflow-x: hidden;
    overflow-y: hidden;
    white-space: nowrap;

    max-width: 100%;
    display: inline-block;
    &.a-table-head-border-bottom {
      border-bottom: solid 1px $table-bottom-color;
    }
    .hide-column {
      height: 0;
      width: 0;
      overflow: hidden;
    }
    .a-table-head-table {
      table-layout: fixed;
      word-break: break-all;
    }
  }

</style>
