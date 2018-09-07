<template>
  <div class="a-table" :style="tableStyles" ref="table">
    <div class="a-table-content">
      <a-table-head
        ref="tableHead"
        :fit-width="fitWidth"
        :border-size="borderSize"
        :border-style="borderStyle"
        :padding="padding"
        @update:columns="columns = $event"
        :scroll-left="scrollLeft"
        :indexing="indexing"
        :row-style-func="rowStyleFunc"
        :cell-style-func="cellStyleFunc"
        :render-columns="renderColumns"
        :bottom-line="bottomLine"
        :striple="striple"
        :row-height="rowHeight"
        :last-row="lastRow"
        :data-list="list"
        :body-has-vertical-scrollbar="bodyHasVerticalScrollbar"
      >
        <a-table-column-index v-if="!!indexing"/>
        <slot></slot>
      </a-table-head>
      <a-table-body
        ref="tableBody"
        :fit-width="fitWidth"
        :render-columns="renderColumns"
        :data-list="list"
        :border-color="borderColor"
        :border-size="borderSize"
        :padding="padding"
        :border-style="borderStyle"
        :body-height="bodyHeight"
        :row-height="rowHeight"
        :scroll-left.sync="scrollLeft"
        :bottom-line="bottomLine"
        :striple="striple"
        :row-style-func="rowStyleFunc"
        :cell-style-func="cellStyleFunc"
        :body-has-vertical-scrollbar.sync="bodyHasVerticalScrollbar"/>
    </div>
  </div>
</template>

<script>
  import ATableHead from "./a-table-head";
  import AScrollbar from "../a-scrollbar/a-scrollbar";
  import AButtonGroup from "../a-button/a-button-group";
  import AButton from "../a-button/a-button";
  import ATableBody from "./a-table-body";
  import {removePx} from "../../script/utils";
  import ATableColumnIndex from "./custome/index/a-table-column-index";

  export default {
    name: "a-table",
    components: {ATableColumnIndex, ATableBody, AButton, AButtonGroup, AScrollbar, ATableHead},
    props: {
      fitWidth: {
        type: Boolean,
        default: false,
        desc: '表格宽度是否自适应，当列宽不够需要自动拉伸以填充容器宽度的时候，该选项建议为true',
      },
      list: {
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
      tableHeight: {
        desc: '表格高度，与rowNum不可以同时使用，指定tableHeight之后，body的高度会自动计算，内容超长body会出现纵向滚动条',
      },
      rowNum: {
        type: Number,
        desc: 'body高度，与tableHeight不可以同时使用，指定rowNum之后，body的高度我rowNum*rowHeight'
      },
      bottomLine: {
        type: Boolean,
        default: true,
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
    },
    data() {
      return {
        columns: null,
        bodyHeight: null,
        bodyHasVerticalScrollbar: false,
        scrollLeft: 0
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
          let headHeight = this.$refs.tableHead.$el.offsetHeight
          /*8：td莫名其妙的padding*/
          let bodyHeight = !!this.rowNum ? (this.rowNum * (removePx(this.rowHeight) + 6 + this.borderSize)) : (tableHeight - headHeight)
          this.bodyHeight = bodyHeight
        }
      },

      /*通知所有节点保存编辑的数据*/
      saveEdit() {
        const editItems = this._findTableEditItemComponentDownward(this)
        editItems.forEach((item) => item.$emit('save-edit'))
      },
      /*通知所有节点取消编辑的数据*/
      cancelEdit() {
        const editItems = this._findTableEditItemComponentDownward(this)
        editItems.forEach((item) => item.$emit('cancel-edit'))
      },

      _findTableEditItemComponentDownward(context) {
        return context.$children.reduce((ret, item) => {
          if (!!item.isTableEditItem) ret.push(item)
          const foundChildren = this._findTableEditItemComponentDownward(item)
          return ret.concat(foundChildren)
        }, [])
      },
    },
  }
</script>

<style lang="scss">
  .a-table {
    width: 100%;
    background-color: white;
    padding-left: 20px;
    padding-top: 20px;
    .a-table-content {
      width: calc(100% - 40px);
    }
    .a-table-standard-cell {
      text-align: center;
    }
    .a-table-cell {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      div {
        width: 100%
      }
    }
  }
</style>
