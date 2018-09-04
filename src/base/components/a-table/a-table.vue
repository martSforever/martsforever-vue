<template>
  <div class="a-table" :style="tableStyles" ref="table">
    <div class="a-table-content" @mousewheel="_handleMouseWheel">
      <a-table-head
        ref="tableHead"
        :fit-width="fitWidth"
        :border-color="borderColor||headBorderColor"
        :border-size="borderSize"
        :border-style="borderStyle"
        :padding="padding"
        @update:columns="columns = $event">
        <slot></slot>
      </a-table-head>
      <a-table-body
        ref="tableBody"
        :columns="renderColumns"
        :data-list="list"
        :border-color="borderColor"
        :border-size="borderSize"
        :padding="padding"
        :border-style="borderStyle"
        :body-height="bodyHeight"
        :row-height="rowHeight"/>
    </div>
    <div class="a-table-right-side">
      <div style="height: 1000px;width: 100%;background-color: rebeccapurple">&nbsp;</div>
    </div>
  </div>
</template>

<script>
  import ATableHead from "./a-table-head";
  import AScrollbar from "../a-scrollbar/a-scrollbar";
  import AButtonGroup from "../a-button/a-button-group";
  import AButton from "../a-button/a-button";
  import ATableBody from "./a-table-body";

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
    },
    data() {
      return {
        columns: null,
        bodyHeight: null,
      }
    },
    watch: {},
    computed: {
      renderColumns() {
        if (!this.columns || this.columns.length < 1) return []
        let ret = []

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
      _initializedTableHeight() {
        if (!!this.tableHeight) {
          let tableHeight = this.$refs.table.offsetHeight
          let headHeight = this.$refs.tableHead.$el.offsetHeight
          let bodyHeight = tableHeight - headHeight
          this.bodyHeight = bodyHeight
        }
      },
      _handleMouseWheel(e){
        console.log(e)
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
    display: flex;
    flex-direction: row;
    .a-table-content {
      flex: 1;
      overflow-x: auto;
      overflow-y: hidden;
    }
    .a-table-right-side {
      width: 17px;
      height: 100%;
      background-color: white;
      overflow-y: auto;
    }
    .a-table-cell {
      box-sizing: border-box;
      display: flex;
      align-items: center;
    }
  }
</style>
