<template>
  <div class="a-table-head">
    <!--用一个div装下传入的a-table-column，a-table-column实际上没有-->
    <div class="hide-column">
      <slot></slot>
    </div>
    <!--表头-->
    <table border="1" class="a-table-head-table" :style="tableStyles">
      <tr v-for="(row,index) in headRows" :key="index">
        <td v-for="(column,index) in row"
            :rowspan="column.rowSpan"
            :colspan="column.colSpan"
            class="a-table-head-td"
            :width="column.width"
            :key="index">
          <div class="cell">
            <rendering-scope-slot v-if="!!column.titleScopedSlots" :scope-slot-func="column.titleScopedSlots"/>
            <rendering-render-func v-if="!!column.titleRenderFunc" :render-func="column.titleRenderFunc"/>
            <span v-if="!column.titleScopedSlots && !column.titleRenderFunc">{{column.title}}</span>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import RenderingScopeSlot from "../rendering-scope-slot";
  import RenderingRenderFunc from "../rendering-render-func";

  export default {
    name: "a-table-head",
    components: {RenderingRenderFunc, RenderingScopeSlot},
    props: {
      fitWidth: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        columns: null,
        headRows: null
      }
    },
    computed: {
      tableStyles() {
        let ret = {}
        !!this.fitWidth && (ret.width = '100%')
        return ret
      },
    },
    methods: {
      _initializedColumns() {
        /*---------------------------------------获取所有column的参数-------------------------------------------*/
        let columns = this.$children.reduce((ret, child) => {
          ret.push(child.getColumn())
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

        /*将要渲染的头信息*/
        let headRows = []
        let num = 0
        while (num < maxLevel) {
          headRows.push([])
          num++
        }

        /*计算每个节点所占行数以及列数*/
        function calcRowSpan(column) {
          headRows[column.level].push(column)
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

        this.columns = columns
        this.headRows = headRows
      },
    },
    mounted() {
      this._initializedColumns()
      console.log(this.columns, this.headRows)
    },
  }
</script>

<style lang="scss">
  .a-table-head {
    .hide-column {
      height: 0;
      width: 0;
      overflow: hidden;
    }

    .a-table-head-table {

      table-layout: fixed;
      word-break: break-all;
      .a-table-head-td {
        background-color: white;
        color: black;
        /*不在支持cellspacing，使用border替代*/
        border: solid 6px #f2f2f2;
        .cell {
          /*min-height: 30px;*/
          /*display: inline-flex;*/
          /*align-items: center;*/
          padding: 6px;
        }
        .rendering-scope-slot, .rendering-render-func {
          display: inline-block;
        }
      }
    }
  }

</style>
