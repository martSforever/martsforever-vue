<template>
  <div class="a-table-fixed" :style="styles" :class="classes" v-if="fixedExist">
    <a-table-head
      ref="tableHead"
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
      :scroll-left="scrollLeft"
      :body-has-vertical-scrollbar="bodyHasVerticalScrollbar"

      :indexing="indexing"
      :last-row="lastRow"
      :head-columns="headColumns"

      :fixed-position="fixedPosition"
    />
    <a-table-body
      ref="tableBody"
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
      :scroll-left="scrollLeft"
      :scroll-top="scrollTop"
      @update:scrollLeft="val=>$emit('update:scrollLeft',val)"
      @update:scrollTop="val=>$emit('update:scrollTop',val)"
      :body-has-vertical-scrollbar.sync="bodyHasVerticalScrollbar"

      :body-height="bodyHeight"
      :multi-editable="multiEditable"
      :border-color="borderColor"

      :fixed-position="fixedPosition"
    />
  </div>
</template>

<script>
  import ATableHead from "./a-table-head";
  import ATableBody from "./a-table-body";
  import {oneOf, removePx} from "../../script/utils";

  export default {
    name: "a-table-fixed",
    components: {ATableBody, ATableHead},
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

      renderColumns: {},
      scrollLeft: {},
      scrollTop: {},

      bodyHeight: {},
      headColumns: {},

      fixedPosition: {
        type: String,
        default: 'center',
        validator(val) {
          return oneOf(val, ['left', 'right', 'center'])
        },
      },
      centerTableScrollLeft: {},
    },
    watch: {
      renderColumns: {
        handler(val) {
          this.updateFixedWidth()
        },
        deep: true,
        immediate: true,
      }
    },
    data() {
      return {
        bodyHasVerticalScrollbar: false,
        fixedWidth: null,
      }
    },
    computed: {
      styles() {
        let ret = {};
        if (this.fixedPosition === 'center')
          ret = {}
        else {
          ret = {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
          }
          !!this.fixedWidth && (ret.width = this.fixedWidth)
        }
        return ret
      },
      classes() {
        return {
          'a-table-fixed-true': this.fixedPosition !== 'center',
          'a-table-fixed-box-shadow': !!this.centerTableScrollLeft
        }
      },

      fixedExist() {
        if (!this.renderColumns || this.renderColumns.length < 1) return true
        for (let i = 0; i < this.renderColumns.length; i++) {
          const renderColumn = this.renderColumns[i];
          if (renderColumn.fixed === this.fixedPosition) return true
        }
        return false
      },
    },
    methods: {
      updateFixedWidth() {
        let width = this.renderColumns.reduce((ret, column) => {
          if (column.fixed === this.fixedPosition) {
            ret += removePx(column.width) + this.borderSize
          }
          return ret
        }, 0)
        this.fixedWidth = (width + this.borderSize) + 'px'
      },
    },
  }
</script>

<style lang="scss">
  .a-table-fixed {
    &.a-table-fixed-true {
      overflow-y: hidden;
      overflow-x: hidden;
      .a-table-head, .a-table-body {
        background-color: white;
      }
      .a-table-body {
        overflow-y: hidden;
        overflow-x: auto;
      }
    }
    &.a-table-fixed-box-shadow {
      box-shadow: 0 0 10px rgba(0, 0, 0, .12);
    }
  }
</style>
