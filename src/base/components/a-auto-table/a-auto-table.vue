<template>
  <div class="a-auto-table">
    <div class="operation">
      <div class="search-wrapper">
        <a-select color="info"
                  placeholder="搜索类型"
                  :options="searchColumns"
                  options-show-key="title"
                  options-value-key="field"
                  :value="!!searchColumn?searchColumn.field:null"
        />
        <div v-if="!!searchColumn"
             :is="searchColumn.searchComponent"
             v-model="searchValue"
             placeholder="搜索关键字..."
             @auto-table-search-confirm="handleSearchConfirm">
        </div>
      </div>
      &nbsp;
      <div class="button-wrapper">
        <a-button-group>
          <a-button type="primary">新增</a-button>
          <a-button type="error">删除</a-button>
        </a-button-group>
      </div>
      &nbsp;
      <div class="filter-options">
        <a-tag :strings="filterStrings" @click-item="handleRemoveFilterOption" :inputable="false"/>
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
  import ATag from "../a-tag/a-tag";

  export default {
    name: "a-auto-table",
    components: {ATag, ASelect, AInput, AButton, AButtonGroup, ATableColumn, ATable},
    props: {
      rowNum: {},
    },
    data() {
      return {
        dataList: [],                 //列数据
        renderColumns: null,          //渲染的列信息
        searchColumn: null,           //搜索列信息
        searchValue: 'hello',            //当前搜索输入框值

        filterOptions: [],            //筛选信息
      }
    },
    watch: {},
    computed: {
      searchColumns() {
        if (!this.renderColumns) return []
        else {
          let ret = this.renderColumns.reduce((ret, column) => {
            !!column.searchable && ret.push(column)
            return ret
          }, [])
          !!ret.length > 0 && (this.searchColumn = ret[0])
          return ret
        }
      },
      filterStrings() {
        return this.filterOptions.reduce((ret, option) => {
          ret.push(`${option.title}${option.operator}${option.value}`)
          return ret
        }, [])
      },
    },
    methods: {
      handleSearchConfirm(val) {
        let filterOption = Object.assign({}, val, {
          field: this.searchColumn.field,
          title: this.searchColumn.title
        })
        this.filterOptions.push(filterOption)
        this.searchValue = null
      },
      handleRemoveFilterOption(val) {
        this.filterOptions.splice(val.index, 1)
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
