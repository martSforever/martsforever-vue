<template>
  <div class="a-table-head" :style="{marginBottom:`${-removePx(padding)/2}px`}">
    <!--用一个div装下传入的a-table-column，a-table-column实际上没有-->
    <span class="hide-column"><slot></slot></span>
    <!--表头-->
    <table border="1" class="a-table-head-table" :style="tableStyles">
      <tr v-for="(row,trIndex) in headRows" :key="trIndex">
        <a-table-head-cell
          v-for="(column,cellIndex) in row"
          :key="cellIndex"
          :border-color="borderColor"
          :border-size="borderSize"
          :border-style="borderStyle"
          :rowspan="column.rowSpan"
          :colspan="column.colSpan"
          :column="column"/>
      </tr>
    </table>
  </div>
</template>

<script>
  import RenderingScopeSlot from "../rendering-scope-slot";
  import RenderingRenderFunc from "../rendering-render-func";
  import ATableHeadCell from "./a-table-head-cell";
  import {removePx} from "../../script/utils";

  export default {
    name: "a-table-head",
    components: {ATableHeadCell, RenderingRenderFunc, RenderingScopeSlot},
    props: {
      fitWidth: {
        type: Boolean,
        default: false
      },

      borderSize: {
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
      padding: {
        type: String,
        default: '12px',
        desc: '每个单元格的内边距',
      },
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
    },
    computed: {
      tableStyles() {
        let ret = {}
        !!this.fitWidth && (ret.width = '100%')
        return ret
      },
    },
    methods: {
      removePx,
      _initializedColumns() {
        /*---------------------------------------获取所有column的参数-------------------------------------------*/
        let columns = this.$children.reduce((ret, child) => {
          (child.$options.name === 'a-table-column') && ret.push(child.getColumn())
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
    },
    mounted() {
      this._initializedColumns()
      // console.log(this.columns, this.headRows)
    },
  }
</script>

<style lang="scss">
  .a-table-head {
    width: max-content;

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
