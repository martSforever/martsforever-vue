<template>
  <tr class="a-table-body-tr"
      :style="!!rowStyleFunc?rowStyleFunc(row,rowIndex):null"
      :class="{'a-table-body-tr-bottom-line':!!bottomLine,'a-table-body-tr-striple':!!striple}">
    <td v-for="(col,colIndex) in renderColumns"
        :key="colIndex"
        :style="_getTdStyles(col,colIndex,row,rowIndex)"
        class="a-table-body-td">
      <div :style="{width:col.width,padding,height:rowHeight}" class="a-table-cell">
        <rendering-scope-slot v-if="!!col.colScopedSlots"
                              :scope-slot-func="col.colScopedSlots"
                              :data="{row,rowIndex,col,colIndex}"/>
        <rendering-render-func v-if="!!col.colRenderFunc"
                               :render-func="col.colRenderFunc"
                               :data="{row,rowIndex,col,colIndex}"/>
        <span v-if="!col.colScopedSlots && !col.colRenderFunc">{{row[col.field]}}</span>
      </div>
    </td>
  </tr>
</template>

<script>
  import RenderingScopeSlot from "../rendering-scope-slot";
  import RenderingRenderFunc from "../rendering-render-func";

  export default {
    name: "a-table-row",
    components: {RenderingRenderFunc, RenderingScopeSlot},
    props: {
      row: {},
      rowIndex: {},
      rowStyleFunc: {
        type: Function,
        desc: '行样式渲染',
      },
      cellStyleFunc: {
        type: Function,
        desc: '单元格样式渲染'
      },
      bottomLine: {
        type: Boolean,
      },
      striple: {
        type: Boolean,
      },
      renderColumns: {},
      padding: {},
      rowHeight: {},
    },
    methods: {
      _getTdStyles(col, colIndex, row, rowIndex) {
        let tdStyles = this.tdStyles
        let cellStyles = !!this.cellStyleFunc ? this.cellStyleFunc(col, colIndex, row, rowIndex) : {}
        return Object.assign({}, tdStyles, cellStyles)
      },
    },
  }
</script>
