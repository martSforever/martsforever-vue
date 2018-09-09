<template>
  <div class="a-table-fixed">
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
  import {oneOf} from "../../script/utils";

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
    },
    data() {
      return {
        bodyHasVerticalScrollbar: false,
      }
    },
  }
</script>

<style lang="scss">

</style>
