<template>
  <div class="a-table-body"
       :style="bodyStyles">
    <table>
      <tr v-for="(row,rowIndex) in dataList" :key="rowIndex">
        <td v-for="(col,colIndex) in columns" :key="colIndex" :style="tdStyles">
          <div :style="{width:col.width,padding,height:rowHeight}" class="a-table-cell">
            {{row[col.field]}}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "a-table-body",
    props: {
      columns: {
        type: Array,
        default: () => []
      },
      dataList: {
        type: Array,
        default: () => []
      },

      borderSize: {
        default: 6,
        desc: '边框宽度',
      },
      borderColor: {
        type: String,
        default: 'transparent',
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
      rowHeight: {
        type: String,
        default: '40px'
      },
      bodyHeight: {
        type: Number,
      },
    },
    computed: {
      tdStyles() {
        return {
          border: `${this.borderStyle} ${this.borderSize}px ${this.borderColor}`,
        }
      },
      bodyStyles() {
        let ret = {}
        console.log(this.bodyHeight)
        !!this.bodyHeight && (ret.height = this.bodyHeight + 'px')
        return ret
      },
    },
  }
</script>

<style lang="scss">
  .a-table-body {
    width: 100%;
    overflow-x: auto;
    overflow-y: auto;
  }
</style>
