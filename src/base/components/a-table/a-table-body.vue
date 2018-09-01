<template>
  <div class="a-table-body">
    <table>
      <tr v-for="(row,rowIndex) in dataList" :key="rowIndex">
        <td v-for="(col,colIndex) in columns" :key="colIndex" :style="tdStyles">
          <div :style="{width:col.width,padding}">
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
        default: '#f2f2f2',
        desc: '边框颜色',
      },
      borderStyle: {
        type: String,
        default: 'solid',
        desc: '边框风格',
      },
      cellColor: {
        type: String,
        default: 'white'
      },
      padding: {
        type: String,
        default: '12px',
        desc: '每个单元格的内边距',
      },
    },
    computed: {
      tdStyles() {
        return {
          border: `${this.borderStyle} ${this.borderSize}px ${this.borderColor}`,
          backgroundColor: `${this.cellColor}`
        }
      },
    },
  }
</script>

<style lang="scss">

</style>
