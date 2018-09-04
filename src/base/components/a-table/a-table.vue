<template>
  <div class="a-table" :style="tableStyles" ref="table">
    <a-table-head
      ref="tableHead"
      :fit-width="fitWidth"
      :border-color="borderColor||headBorderColor"
      :border-size="borderSize"
      :border-style="borderStyle"
      :padding="padding"
      @update:columns="columns = $event"
      :scroll-left="scrollLeft"
      :body-has-vertical-scrollbar="bodyHasVerticalScrollbar"
    >
      <slot></slot>
    </a-table-head>
    <a-table-body
      ref="tableBody"
      :fit-width="fitWidth"
      :columns="renderColumns"
      :data-list="list"
      :border-color="borderColor"
      :border-size="borderSize"
      :padding="padding"
      :border-style="borderStyle"
      :body-height="bodyHeight"
      :row-height="rowHeight"
      :scroll-left.sync="scrollLeft"
      :body-has-vertical-scrollbar.sync="bodyHasVerticalScrollbar"/>
  </div>
</template>

<script>
  import ATableHead from "./a-table-head";
  import AScrollbar from "../a-scrollbar/a-scrollbar";
  import AButtonGroup from "../a-button/a-button-group";
  import AButton from "../a-button/a-button";
  import ATableBody from "./a-table-body";
  import {removePx} from "../../script/utils";

  export default {
    name: "a-table",
    components: {ATableBody, AButton, AButtonGroup, AScrollbar, ATableHead},
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
        default: 6,
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
      headBorderColor: {
        type: String,
        default: '#f2f2f2',
        desc: '标题边框色',
      },
      padding: {
        type: String,
        default: '12px',
        desc: '每个单元格的内边距',
      },
      rowHeight: {
        type: String,
        default: '40px',
        desc: '每一行的高度',
      },
      tableHeight: {},
      rowNum: {
        type: Number
      },
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
          let bodyHeight = !!this.rowNum ? (this.rowNum * (removePx(this.rowHeight) + 8) + 20) : (tableHeight - headHeight)
          this.bodyHeight = bodyHeight
        }
      },
    },
    mounted() {

    },
  }
</script>

<style lang="scss">
  .a-table {
    width: 100%;
    background-color: white;
    .a-table-cell {
      box-sizing: border-box;
      display: flex;
      align-items: center;
    }
  }
</style>
