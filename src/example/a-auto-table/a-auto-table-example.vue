<template>
  <div class="a-auto-table-example">
    <a-auto-table :row-num="10">
      <a-table-column-input title="姓名" field="name"/>
      <a-table-column title="年龄" field="age"/>
      <a-table-column title="出生日期" field="birthday"/>
      <a-table-column title="用户类型" field="userType"/>
      <a-table-column title="上级" field="superior"/>
      <a-table-column title="主要负责人" field="chargeMan"/>
    </a-auto-table>
  </div>
</template>

<script>
  import AAutoTable from "../../base/components/a-auto-table/a-auto-table";
  import ATableColumn from "../../base/components/a-table/a-table-column";
  import ATableColumnInput from "../../base/components/a-table/custome/input/a-table-column-input";

  export default {
    name: "a-auto-table-example",
    components: {ATableColumnInput, ATableColumn, AAutoTable}
  }
</script>

<style lang="scss">

</style>
