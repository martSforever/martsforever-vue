<template>
  <div class="a-table-example-edit">

    <div>
      <div class="operation">
        <div class="item">
          单行编辑：
          <a-switch v-model="multiEditable"/>
        </div>
        <div class="item">
          宽度自适应：
          <a-switch v-model="fit"/>
        </div>

        <a-button-group>
          <a-button-group>
            <a-button @click="saveTableEditData">save edit</a-button>
            <a-button @click="cancelEdit">cancel edit</a-button>
          </a-button-group>
        </a-button-group>
        &nbsp;
        <a-button-group>
          <a-button-group>
            <a-button @click="addRow">add row</a-button>
            <a-button @click="deleteRow">delete row</a-button>
          </a-button-group>
        </a-button-group>
      </div>

    </div>

    <div>
      <a-table
        ref="table"
        :list="dataList"
        :multi-editable="multiEditable"
        border-size="9"
        :row-num="6"
        :fit-width="fit"
      >
        <!--常规列-->
        <a-table-column field="name" title="姓名(不可编辑)"/>
        <a-table-column field="code" title="编码(不可编辑)"/>

        <!--文本输入列-->
        <a-table-column-input field="name" title="姓名"/>
        <a-table-column-input field="code" title="编码"/>

        <!--日期选择列-->
        <a-table-column-date-picker-string field="date" title="出生日期"/>

      </a-table>
    </div>

  </div>
</template>

<script>
  import AButtonGroup from "../../base/components/a-button/a-button-group";
  import AButton from "../../base/components/a-button/a-button";
  import ATable from "../../base/components/a-table/a-table";
  import ATableColumnInput from "../../base/components/a-table/custome/input/a-table-column-input";
  import ASwitch from "../../base/components/a-switch/a-switch";
  import ATableColumn from "../../base/components/a-table/a-table-column";
  import ATableColumnDatePickerString
    from "../../base/components/a-table/custome/date-picker/a-table-column-date-picker-string";
  import {deepCopy} from "../../base/script/utils";

  export default {
    name: "a-table-example-edit",
    components: {ATableColumnDatePickerString, ATableColumn, ASwitch, ATableColumnInput, ATable, AButton, AButtonGroup},
    data() {
      return {
        multiEditable: false,
        fit: true,
        dataList: [
          {name: '渣渣辉', code: '0x001', date: '2018-09-01'},
          {name: '刘德华', code: '0x002', date: '2018-09-02'},
          {name: '刘青云', code: '0x003', date: '2018-09-03'},
          {name: '赵又廷', code: '0x004', date: '2018-09-04'},
          {name: '黄渤', code: '0x005', date: '2018-09-05'},
          {name: '古天乐', code: '0x006', date: '2018-09-06'},
          {name: '吴彦祖', code: '0x007', date: '2018-09-07'},
          {name: '小李子', code: '0x008', date: '2018-09-08'},
          {name: '杰森斯坦', code: '0x010', date: '2018-09-09'},
        ]
      }
    },
    methods: {
      saveTableEditData() {
        this.$refs.table.saveEdit()
      },
      cancelEdit() {
        this.$refs.table.cancelEdit()
      },

      addRow() {
        this.dataList.unshift(deepCopy(this.dataList.last()))
      },
      deleteRow() {
        this.dataList.shift()
      },
    },
  }
</script>

<style lang="scss">
  .a-table-example-edit {
    height: 100%;
    .operation {
      display: inline-flex;
      align-items: center;
      padding: 24px;
      .item {
        display: inline-flex;
        align-items: center;
        margin-right: 24px;
      }
    }
  }
</style>
