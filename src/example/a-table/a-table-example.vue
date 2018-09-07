<template>
  <div class="a-table-example">
    <div class="operation">
      <div class="item">
        table宽度自适应：
        <a-switch v-model="fitWidth"/>
      </div>
      <div class="item">
        索引：
        <a-switch v-model="indexing"/>
      </div>
      <div class="item">
        单选：
        <a-switch v-model="singleSelect"/>
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
        边框宽度：
        <a-input v-model="borderSize">
          <div slot="prepend" style="width: 30px;text-align: center;cursor: pointer;" @click="borderSize++">
            <a-icon icon="fa-plus"/>
          </div>
          <div slot="append" style="width: 30px;text-align: center;cursor: pointer;" @click="borderSize--">
            <a-icon icon="fa-minus"/>
          </div>
        </a-input>
      </div>
      <div class="item">
        列宽度：
        <a-input v-model="columnWidth">
          <div slot="prepend" style="width: 30px;text-align: center;cursor: pointer;"
               @click="columnWidth=(removePx(columnWidth)+10)+'px'">
            <a-icon icon="fa-plus"/>
          </div>
          <div slot="append" style="width: 30px;text-align: center;cursor: pointer;"
               @click="columnWidth=(removePx(columnWidth)-10)+'px'">
            <a-icon icon="fa-minus"/>
          </div>
        </a-input>
      </div>
    </div>

    <div>
      <a-button-group>
        <a-button @click="addRow">add row</a-button>
        <a-button @click="removeRow">remove row</a-button>
        <a-button @click="getMultiSelected">getMultiSelected</a-button>
        <a-button @click="getSingleSelected">getSingleSelected</a-button>
      </a-button-group>
    </div>

    <div style="height: 800px;background-color: transparent">
      <a-table :fit-width="fitWidth"
               :border-size="borderSize"
               :list="dataList"
               row-height="40px"
               padding="6px"
               :bottom-line="true"
               :striple="true"
               :row-style-func="null"
               :cell-style-func="null"
               :indexing="indexing"
               :last-row="{dispatchDate:'wowowowowowowowowowo'}"
               :row-num="7">
        <a-table-column-index/>
        <a-table-column-collapse>
          <template slot-scope="{row,rowIndex}">
            <div style="background-color: cadetblue;color: white;height: 72px">
              {{row.dispatchDate}}--{{rowIndex}}---xxxxxxxxxx
            </div>
          </template>
        </a-table-column-collapse>

        <a-table-column-collapse>
          <template slot-scope="{row,rowIndex}">
            <div style="background-color: seagreen;color: white;height: 72px">
              this is another collapse col-->>{{row.dispatchDate}}--{{rowIndex}}---yyyyyyyyyy
            </div>
          </template>
        </a-table-column-collapse>
        <a-table-column-collapse :multiple="false">
          <template slot-scope="{row,rowIndex}">
            <div style="background-color: greenyellow;color: white;height: 72px">
              this is another collapse col-->>{{row.dispatchDate}}--{{rowIndex}}---zzzzzzz
            </div>
          </template>
        </a-table-column-collapse>
        <a-table-column-select ref="multiSelect" :multi-select="true"/>
        <a-table-column-select ref="singleSelect"/>

        <a-table-column-input :order="17" field="dispatchDate"/>

        <a-table-column order="15" field="date" title="日期" :width.sync="columnWidth">
          <template slot-scope="{column}" slot="title">
            slot-scope's content -->> {{title}}--{{column.title}}
          </template>
          <template slot-scope="{row, rowIndex, col, colIndex}">
            <div>
              slot-scope content: {{title}}-{{rowIndex}}- {{row.date}}
            </div>
          </template>
        </a-table-column>
        <a-table-column order="10" field="age" :title="title">
          <a-table-column field="name" title="姓名" width="120px"></a-table-column>
          <a-table-column field="address" title="配送地址">
            <a-table-column order="10" field="province" title="省"></a-table-column>
            <a-table-column order="20" field="city" title="市"></a-table-column>
            <a-table-column order="15" field="district" title="县"></a-table-column>
          </a-table-column>
        </a-table-column>
        <a-table-column :order="firstOrder" field="dispatchInfo" title="发货信息">
          <a-table-column field="dispatchDate" title="发货时间"
                          :col-render-func="cellRenderFunc"
                          width="200px"></a-table-column>
          <a-table-column field="dispatchAddress" title="发货地址"></a-table-column>
        </a-table-column>
        <a-table-column title="a">
          <a-table-column title="b">
            <a-table-column title="c">
            </a-table-column>
          </a-table-column>
          <a-table-column title="d"></a-table-column>
        </a-table-column>

        <!--<a-table-column title="other"></a-table-column>
        <a-table-column title="other"></a-table-column>
        <a-table-column title="other"></a-table-column>
        <a-table-column title="other"></a-table-column>
        <a-table-column title="other"></a-table-column>
        <a-table-column title="other"></a-table-column>
        <a-table-column title="other"></a-table-column>
        <a-table-column title="other"></a-table-column>
        <a-table-column title="other"></a-table-column>
        <a-table-column title="other"></a-table-column>-->
      </a-table>
    </div>
  </div>
</template>

<script>
  import ATable from "../../base/components/a-table/a-table";
  import ATableColumn from "../../base/components/a-table/a-table-column";
  import AInput from "../../base/components/a-input/a-input";
  import ASwitch from "../../base/components/a-switch/a-switch";
  import AIcon from "../../base/components/a-icon/a-icon";
  import {removePx} from "../../base/script/utils";
  import AButtonGroup from "../../base/components/a-button/a-button-group";
  import AButton from "../../base/components/a-button/a-button";
  import ATableColumnIndex from "../../base/components/a-table/custome/index/a-table-column-index";
  import ATableColumnSelect from "../../base/components/a-table/custome/select/a-table-column-select";
  import ATableColumnCollapse from "../../base/components/a-table/custome/collapse/a-table-column-collapse";
  import ATableExampleTestCol from "./a-table-example-test-col";
  import ATableColumnInput from "../../base/components/a-table/custome/input/a-table-column-input";

  export default {
    name: "a-table-example",
    components: {
      ATableColumnInput,
      ATableExampleTestCol,
      ATableColumnCollapse,
      ATableColumnSelect,
      ATableColumnIndex, AButton, AButtonGroup, AIcon, ASwitch, AInput, ATableColumn, ATable
    },
    data() {
      return {
        title: '日期',
        fitWidth: false,
        firstOrder: '13',
        columnWidth: `1250px`,
        borderSize: 2,
        indexing: true,
        singleSelect: true,
        /*@formatter:off*/
        dataList: [
          {date: '11', dispatchDate: 'aaa',dispatchAddress:'22',name:'bbb',province:'sheng',city:'city',district:'district'},
          {date: '11', dispatchDate: 'bbb',dispatchAddress:'22',name:'bbb',province:'sheng',city:'city',district:'district'},
          {date: '11', dispatchDate: 'ccc',dispatchAddress:'22',name:'bbb',province:'sheng',city:'city',district:'district'},
          {date: '11', dispatchDate: 'ddd',dispatchAddress:'22',name:'bbb',province:'sheng',city:'city',district:'district'},
          {date: '11', dispatchDate: 'eee',dispatchAddress:'22',name:'bbb',province:'sheng',city:'city',district:'district'},
          {date: '11', dispatchDate: 'fff',dispatchAddress:'22',name:'bbb',province:'sheng',city:'city',district:'district'},
          {date: '11', dispatchDate: 'ggg',dispatchAddress:'22',name:'bbb',province:'sheng',city:'city',district:'district'},
          {date: '11', dispatchDate: 'hhh',dispatchAddress:'22',name:'bbb',province:'sheng',city:'city',district:'district'},
          {date: '11', dispatchDate: 'iii',dispatchAddress:'22',name:'bbb',province:'sheng',city:'city',district:'district'},
          {date: '11', dispatchDate: 'jjj',dispatchAddress:'22',name:'bbb',province:'sheng',city:'city',district:'district'},
          {date: '11', dispatchDate: 'kkk',dispatchAddress:'22',name:'bbb',province:'sheng',city:'city',district:'district'},
          {date: '11', dispatchDate: 'lll',dispatchAddress:'22',name:'bbb',province:'sheng',city:'city',district:'district'},
        ],
        /*@formatter:on*/
      }
    },
    methods: {
      removePx,
      addRow() {
        this.dataList.unshift({
          date: new Date().yyyyMMddHHmmss(),
          dispatchDate: 'aaa',
          dispatchAddress: '22',
          name: 'bbb',
          province: 'sheng',
          city: 'city',
          district: 'district'
        })
      },
      removeRow() {
        this.dataList.pop()
      },
      rowStyleFunc(row, index) {
        if (index % 2 === 0) {
          return {
            backgroundColor: 'black'
          }
        }
      },
      cellStyleFunc(col, colIndex, row, rowIndex) {
        let backgroundColor = colIndex === 2 ? 'red' : 'yellow'
        return {backgroundColor}
      },
      cellRenderFunc(h, {row, rowIndex, col, colIndex}) {
        return (
          <div>{row.date}-|||-{rowIndex}--{row[col.field]}--{colIndex}</div>
        )
      },

      getMultiSelected() {
        let rows = this.$refs.multiSelect.getSelected()
        rows.forEach((row) => {
          console.log(row.dispatchDate)
        })
      },
      getSingleSelected() {
        let row = this.$refs.singleSelect.getSelected()
        console.log(row.dispatchDate)
      },
    },

    mounted() {

    },
  }
</script>

<style lang="scss">
  .a-table-example {

    height: 100%;

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
    }
  }
</style>
