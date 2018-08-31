<template>
  <div class="a-table-example">
    <div class="operation">
      <div class="item">
        table宽度自适应：
        <a-switch v-model="fitWidth"/>
      </div>
      <div class="item">
        列标题：
        <a-input v-model="title"/>
      </div>
      <div class="item">
        列排序：
        <a-input v-model="firstOrder">
          <div slot="prepend" style="width: 30px;text-align: center;cursor: pointer;" @click="firstOrder++">
            <a-icon icon="fa-plus"/>
          </div>
          <div slot="append" style="width: 30px;text-align: center;cursor: pointer;" @click="firstOrder--">
            <a-icon icon="fa-minus"/>
          </div>
        </a-input>
      </div>
      <div class="item">
        列宽度：
        <a-input v-model="columnWidth">
          <div slot="prepend" style="width: 30px;text-align: center;cursor: pointer;" @click="columnWidth+=10">
            <a-icon icon="fa-plus"/>
          </div>
          <div slot="append" style="width: 30px;text-align: center;cursor: pointer;" @click="columnWidth-=10">
            <a-icon icon="fa-minus"/>
          </div>
        </a-input>
      </div>
    </div>
    <a-table :fit-width="fitWidth">
      <a-table-column order="15" field="date" title="日期">
        <template slot-scope="data" slot="title">
          slot-scope's content -->> {{title}}
        </template>
      </a-table-column>
      <a-table-column order="10" field="age" :title="title">
        <a-table-column field="name" title="姓名" :width="columnWidth+'px'"></a-table-column>
        <a-table-column field="address" title="配送地址">
          <a-table-column order="10" field="province" title="省"></a-table-column>
          <a-table-column order="20" field="city" title="市"></a-table-column>
          <a-table-column order="15" field="district" title="县"></a-table-column>
        </a-table-column>
      </a-table-column>
      <a-table-column :order="firstOrder" field="dispatchInfo" title="发货信息">
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
      <a-table-column title="other"></a-table-column>
      <a-table-column title="other"></a-table-column>
      <a-table-column title="other"></a-table-column>
      <a-table-column title="other"></a-table-column>
      <a-table-column title="other"></a-table-column>
      <a-table-column title="other"></a-table-column>
      <a-table-column title="other"></a-table-column>
      <a-table-column title="other"></a-table-column>
      <a-table-column title="other"></a-table-column>
      <a-table-column title="other"></a-table-column>
    </a-table>

    <!--<table style="background-color: white" cellspacing="10">
      <tr>
        <td class="test-td">
          <div class="test-cell">标题1</div>
        </td>
        <td class="test-td">
          <div class="test-cell">标题1</div>
        </td>
        <td class="test-td">
          <div class="test-cell">标题1</div>
        </td>
        <td class="test-td">
          <div class="test-cell">标题1</div>
        </td>
        <td class="test-td">
          <div class="test-cell">标题1</div>
        </td>
        <td class="test-td" @mousemove="_handleMouseMove" @mouseleave="_handleMouseLeave" ref="td">
          <div class="test-cell">标题1</div>
        </td>
      </tr>
    </table>-->

  </div>
</template>

<script>
  import ATable from "../../base/components/a-table/a-table";
  import ATableColumn from "../../base/components/a-table/a-table-column";
  import AInput from "../../base/components/a-input/a-input";
  import ASwitch from "../../base/components/a-switch/a-switch";
  import AIcon from "../../base/components/a-icon/a-icon";

  export default {
    name: "a-table-example",
    components: {AIcon, ASwitch, AInput, ATableColumn, ATable},
    data() {
      return {
        title: '日期',
        fitWidth: false,
        firstOrder: '13',
        columnWidth: 200
      }
    },

    methods: {
      _handleMouseMove(e) {
        let {offsetX, offsetY} = e
        let offsetWidth = this.$refs.td.offsetWidth
        if (Math.abs(offsetX - offsetWidth + 5) < 5) {
          document.body.style.cursor = 'w-resize'
        } else {
          document.body.style.cursor = 'default'
        }
      },
      _handleMouseLeave(e) {
        document.body.style.cursor = 'default'
      },
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
      .item {
        display: flex;
        align-items: center;
        margin-right: 12px;
      }
    }

    .test-td {
      border: solid 6px #f2f2f2;
      margin: 3px;
    }
    .test-cell {
      height: 30px;
      padding: 12px;
    }
  }
</style>
