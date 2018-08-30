<template>
  <div class="a-table-example">
    <div class="operation">
      <a-input v-model="title"/>
    </div>
    <a-table>
      <a-table-column field="date" title="日期">
        <template slot-scope="data" slot="title">
          {{title}}
        </template>
      </a-table-column>
      <a-table-column field="age" title="配送信息">
        <a-table-column field="name" title="姓名"></a-table-column>
        <a-table-column field="address" title="配送地址">
          <a-table-column field="province" title="省"></a-table-column>
          <a-table-column field="city" title="市"></a-table-column>
          <a-table-column field="district" title="县"></a-table-column>
        </a-table-column>
      </a-table-column>
      <a-table-column field="dispatchInfo" title="发货信息">
        <a-table-column field="dispatchDate" title="发货时间"></a-table-column>
        <a-table-column field="dispatchAddress" title="发货地址"></a-table-column>
      </a-table-column>
      <a-table-column title="a">
        <a-table-column title="b">
          <a-table-column title="c">

          </a-table-column>
        </a-table-column>
        <a-table-column title="d"></a-table-column>
      </a-table-column>
    </a-table>
  </div>
</template>

<script>
  import ATable from "../../base/components/a-table/a-table";
  import ATableColumn from "../../base/components/a-table/a-table-column";
  import AInput from "../../base/components/a-input/a-input";

  export default {
    name: "a-table-example",
    components: {AInput, ATableColumn, ATable},
    data() {
      return {
        title: 'hello world hahajkshakjdhakdhjkashd'
      }
    },
  }
</script>

<style lang="scss">
  .a-table-example {
    .operation {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
