<template>
  <div class="a-auto-table">
    <div class="operation">
      <div class="search-wrapper">
        <a-select color="info"
                  placeholder="搜索类型"
                  :options="searchTypes"
                  options-show-key="title"
                  options-value-key="field"
                  v-model="selectType"
        />
        <a-input icon="fa-search" color="info" placeholder="搜索关键字..."/>
      </div>
      &nbsp;
      <div class="button-wrapper">
        <a-button-group>
          <a-button type="primary">新增</a-button>
          <a-button type="error">删除</a-button>
        </a-button-group>
      </div>
    </div>
    <a-table
      @update:renderColumns="val=> renderColumns = val"
      :data-list="dataList"
      :row-num="rowNum">
      <slot></slot>
    </a-table>
  </div>
</template>

<script>
  import ATable from "../a-table/a-table";
  import ATableColumn from "../a-table/a-table-column";
  import AButtonGroup from "../a-button/a-button-group";
  import AButton from "../a-button/a-button";
  import AInput from "../a-input/a-input";
  import ASelect from "../a-select/a-select";

  export default {
    name: "a-auto-table",
    components: {ASelect, AInput, AButton, AButtonGroup, ATableColumn, ATable},
    props: {
      rowNum: {},
    },
    data() {
      return {
        dataList: [],
        renderColumns: null,
        selectType: null,
      }
    },
    computed: {
      searchTypes() {
        if (!this.renderColumns) return []
        else {
          console.log(this.renderColumns)
          return this.renderColumns.reduce((ret, column) => {
            let {title, field} = column
            ret.push({title, field})
            return ret
          }, [])
        }
      },
    },
  }
</script>

<style lang="scss">
  .a-auto-table {
    background-color: white;
    .operation {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 20px 20px 0;
      .button-wrapper {
        .a-btn span {
          color: white;
        }
      }
    }

  }
</style>
