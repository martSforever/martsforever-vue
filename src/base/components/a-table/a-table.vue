<template>
  <div class="a-table" :style="tableStyles" ref="table">
    <a-table-column-handler :columns.sync="columns" :head-columns.sync="headColumns">
      <a-table-column-index v-if="!!indexing"/>
      <slot></slot>
    </a-table-column-handler>
    <div class="a-table-content">
      <a-table-fixed
        ref="center"
        :fit-width="fitWidth"
        :data-list="dataList"
        :border-size="borderSize"
        :border-style="borderStyle"
        :padding="padding"
        :row-height="rowHeight"
        :bottom-line="bottomLine"
        :striple="striple"
        :row-style-func="rowStyleFunc"
        :cell-style-func="cellStyleFunc"
        :render-columns="renderColumns"
        :scroll-left.sync="scrollLeft"
        :scroll-top.sync="scrollTop"

        :indexing="indexing"
        :last-row="lastRow"
        :head-columns="headColumns"

        :body-height="bodyHeight"
        :multi-editable="multiEditable"
        :border-color="borderColor"
      />

      <a-table-fixed
        ref="left"
        fixed-position="left"

        :fit-width="fitWidth"
        :data-list="dataList"
        :border-size="borderSize"
        :border-style="borderStyle"
        :padding="padding"
        :row-height="rowHeight"
        :bottom-line="bottomLine"
        :striple="striple"
        :row-style-func="rowStyleFunc"
        :cell-style-func="cellStyleFunc"
        :render-columns="renderColumns"
        :scroll-top.sync="scrollTop"

        :indexing="indexing"
        :last-row="lastRow"
        :head-columns="headColumns"

        :body-height="bodyHeight"
        :multi-editable="multiEditable"
        :border-color="borderColor"
        :center-table-scroll-left="scrollLeft"
      />
    </div>
  </div>
</template>

<script>
  import ATableHead from "./a-table-head";
  import AScrollbar from "../a-scrollbar/a-scrollbar";
  import AButtonGroup from "../a-button/a-button-group";
  import AButton from "../a-button/a-button";
  import ATableBody from "./a-table-body";
  import {findComponentsDownward, removePx} from "../../script/utils";
  import ATableColumnIndex from "./custome/index/a-table-column-index";
  import {findTableEditItemComponentDownward} from "./custome";
  import ATableColumnHandler from "./a-table-column-handler";
  import ATableFixed from "./a-table-fixed";

  export default {
    name: "a-table",
    components: {
      ATableFixed,
      ATableColumnHandler, ATableColumnIndex, ATableBody, AButton, AButtonGroup, AScrollbar, ATableHead
    },
    props: {
      fitWidth: {
        type: Boolean,
        default: false,
        desc: '表格宽度是否自适应，当列宽不够需要自动拉伸以填充容器宽度的时候，该选项建议为true',
      },
      dataList: {
        type: Array,
        default: () => [],
        desc: '列表数据',
      },
      borderSize: {
        default: 2,
        desc: '边框宽度',
      },
      borderColor: {
        type: String,
        desc: '边框颜色',
        default: 'transparent'
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
        default: '40px',
        desc: '每一行的高度',
      },
      bottomLine: {
        type: Boolean,
        default: false,
        desc: '每行是否有一条底部下划线',
      },
      striple: {
        type: Boolean,
        default: true,
        desc: '斑马纹'
      },
      rowStyleFunc: {
        type: Function,
        desc: '行样式渲染',
      },
      cellStyleFunc: {
        type: Function,
        desc: '单元格样式渲染'
      },
      indexing: {
        type: Boolean,
        default: true
      },
      lastRow: {},
      multiEditable: {
        type: Boolean,
        default: false
      },

      rowNum: {
        type: Number,
        desc: 'body高度，与tableHeight不可以同时使用，指定rowNum之后，body的高度我rowNum*rowHeight'
      },
      tableHeight: {
        desc: '表格高度，与rowNum不可以同时使用，指定tableHeight之后，body的高度会自动计算，内容超长body会出现纵向滚动条',
      },

    },
    data() {
      return {
        columns: [],
        headColumns: [],

        bodyHeight: null,
        bodyHasVerticalScrollbar: false,
        scrollLeft: 0,
        scrollTop: 0,

        tableRow: {
          'left': null,
          'center': null,
        }
      }
    },
    watch: {},
    computed: {
      /*获取渲染表头所需要的数据*/
      renderColumns() {
        if (!this.columns || this.columns.length < 1) return []
        let ret = []

        /*递归遍历节点，将列数据收集起来，是一个森林结构*/
        function iterate(column) {
          if (!!column.children && column.children.length > 0) {
            column.children.forEach((child) => {
              iterate(child)
            })
          } else {
            ret.push(column)
          }
        }

        this.columns.forEach((child) => iterate(child))
        this.$nextTick(() => this._initializedTableHeight())
        this.$emit('update:renderColumns', ret)
        return ret
      },
      tableStyles() {
        let ret = {}
        !!this.tableHeight && (ret.height = this.tableHeight)
        return ret
      },
    },
    methods: {
      /*初始化表头以及表体高度*/
      _initializedTableHeight() {
        if (!!this.tableHeight || !!this.rowNum) {
          let tableHeight = this.$refs.table.offsetHeight
          let headHeight = this.$refs.center.$refs.tableHead.$el.offsetHeight
          /*8：td莫名其妙的padding*/
          let bodyHeight = !!this.rowNum ? (this.rowNum * (removePx(this.rowHeight) + 6 + (this.borderSize - 0))) : (tableHeight - headHeight)
          this.bodyHeight = bodyHeight
        }
      },

      /*通知所有节点保存编辑的数据*/
      saveEdit() {
        findComponentsDownward(this, 'a-table-row').forEach(item => item.saveEdit())
      },
      /*通知所有节点取消编辑的数据*/
      cancelEdit() {
        findComponentsDownward(this, 'a-table-row').forEach(item => item.disableEdit())
      },

      /*列初始化时，调用该函数，将列component实例添加到数组中，方便对主体table以及固定table的列做统一处理，比如在双击固定table或者主体table的时候，都触发双方的列的dblclick事件*/
      addTableRow(fixedPosition, rowComponent) {
        if (!this.tableRow[fixedPosition]) this.tableRow[fixedPosition] = {}
        this.tableRow[fixedPosition][rowComponent.rowIndex] = rowComponent
        rowComponent.$el.handleDblClick = (e) => this.trigDblClick(rowComponent.rowIndex)
        rowComponent.$el.addEventListener('dblclick', rowComponent.$el.handleDblClick)
      },
      /*列销毁的时候，调用该甘薯，将列component对象移除出数组*/
      removeTableRow(fixedPosition, rowComponent) {
        rowComponent.$el.removeEventListener('dblclick', rowComponent.$el.handleDblClick)
        delete this.tableRow[fixedPosition][rowComponent.rowIndex]
      },

      trigDblClick(rowIndex) {
        this.tableRow['center'][rowIndex].handleDblClick()
        if (!!this.tableRow['left'] && Object.keys(this.tableRow['left']).length > 0) {
          console.log(this.tableRow)
          this.tableRow['left'][rowIndex].handleDblClick()
        }
      },
    },
  }
</script>

<style lang="scss">
  .a-table {
    width: 100%;
    background-color: white;
    padding-left: 20px;
    .a-table-content {
      width: calc(100% - 40px);
      position: relative;
    }
    .a-table-standard-cell {
      text-align: center;
    }
    .a-table-cell {
      box-sizing: border-box;
      display: flex;
      align-items: center;
    }
  }
</style>
