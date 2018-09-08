<template>
  <tr
    class="a-table-body-tr"
    @dblclick="_handleDblClick"
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
  import {findTableEditItemComponentDownward} from "./custome";
  import {findComponentUpward} from "../../script/utils";

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

      borderSize: {
        desc: '边框宽度',
      },
      borderColor: {
        type: String,
        desc: '边框颜色',
      },
      borderStyle: {
        type: String,
        desc: '边框风格',
      },
      multiEditable: {},
    },
    data() {
      return {
        currentEditable: false,
        table: null
      }
    },
    watch: {
      currentEditable(val) {
        this._changeEditable(val)
      },
    },
    methods: {
      _getTdStyles(col, colIndex, row, rowIndex) {
        let tdStyles = {border: `${this.borderStyle} ${this.borderColor} ${this.borderSize}px`}
        let cellStyles = !!this.cellStyleFunc ? this.cellStyleFunc(col, colIndex, row, rowIndex) : {}
        return Object.assign({}, tdStyles, cellStyles)
      },
      _handleDblClick() {
        if (!this.multiEditable) this.table.cancelEdit()
        !this.currentEditable && (this.currentEditable = true)
      },
      enableEdit() {
        this.currentEditable = true
      },
      disableEdit() {
        this.currentEditable = false
      },
      saveEdit() {
        if (!this.currentEditable) return
        findTableEditItemComponentDownward(this).forEach(item => item.handleSave())
        this.currentEditable = false
      },
      _changeEditable(flag) {
        findTableEditItemComponentDownward(this).forEach(item => item[!!flag ? 'enableEdit' : 'disableEdit']())
      },
    },
    mounted() {
      this.table = findComponentUpward(this, 'a-table')
    },
  }
</script>
