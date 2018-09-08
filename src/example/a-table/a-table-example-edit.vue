<template>
  <div class="a-table-example-edit">

    <div>
      <div class="operation">
        <div class="item">
          单行编辑：
          <a-switch v-model="multiEditable"/>
        </div>

        <a-button-group>
          <a-button-group>
            <a-button @click="saveTableEditData">save edit</a-button>
            <a-button @click="cancelEdit">cancel edit</a-button>
          </a-button-group>
        </a-button-group>
      </div>

    </div>

    <div>
      <a-table
        ref="table"
        :list="dataList"
        :multi-editable="multiEditable"
      >
        <!--文本输入列-->
        <a-table-column-input field="name" title="姓名"/>
        <a-table-column-input field="code" title="编码"/>
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

  export default {
    name: "a-table-example-edit",
    components: {ASwitch, ATableColumnInput, ATable, AButton, AButtonGroup},
    data() {
      return {
        multiEditable: false,
        dataList: [
          {name: '渣渣辉', code: '0x001'},
          {name: '刘德华', code: '0x002'},
          {name: '刘青云', code: '0x003'},
          {name: '赵又廷', code: '0x004'},
          {name: '黄渤', code: '0x005'},
          {name: '古天乐', code: '0x006'},
          {name: '吴彦祖', code: '0x007'},
          {name: '小李子', code: '0x008'},
          {name: '杰森斯坦', code: '0x010'},
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
