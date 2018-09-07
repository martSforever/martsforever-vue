<template>
  <a-table-column width="36px" ref="tableColumn" :order="order">
    <template slot-scope="{}" slot="title">
      <div class="a-table-standard-cell">
        <a-radio inactive-icon="fa-dot-circle-o"
                 v-model="totalChecked"
                 :active-icon="activeIcon"
                 :inactive-icon="inactiveIcon"/>
      </div>
    </template>
    <template slot-scope="{row,rowIndex}">
      <div class="a-table-standard-cell">
        <a-table-column-select-item :row="row"
                                    @join="_handleJoin"
                                    @quit="_handleQuit"
                                    @mounted="_handleMounted"
                                    :multi-select="multiSelect"
                                    :active-icon="activeIcon"
                                    :inactive-icon="inactiveIcon"
                                    @destroyed="(val)=>allItems.remove(val)"
                                    @change-all="changeAll"/>
      </div>
    </template>
  </a-table-column>
</template>

<script>
  import ATableColumn from "../../a-table-column";
  import ATableColumnSelectItem from "./a-table-column-select-item";

  export default {
    name: "a-table-column-select",
    components: {ATableColumnSelectItem, ATableColumn},
    props: {
      order: {
        default: 9998
      },
      multiSelect: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        isTableColumn: true,

        totalChecked: false,
        selectItems: [],
        allItems: [],
      }
    },
    watch: {
      totalChecked(val) {
        if (!!this.multiSelect) {
          this.changeAll(val)
        } else {
          if (!val) {
            this.changeAll(false)
          }
        }
      },
    },
    methods: {
      getColumn() {
        return this.$refs.tableColumn.getColumn()
      },
      _handleJoin(item) {
        this.selectItems.push(item)
      },
      _handleQuit(item) {
        this.selectItems.remove(item)
      },
      _handleMounted(item) {
        if (JSON.stringify(item.row) !== JSON.stringify({})) {
          this.allItems.push(item)
        }
      },
      changeAll(val) {
        this.allItems.forEach((item) => item.currentValue = val)
      },
      getSelected() {
        let result;
        if (!!this.multiSelect) {
          result = this.selectItems.reduce((ret, item) => {
            ret.push(item.row)
            return ret
          }, [])
        } else {
          result = this.selectItems.length > 0 ? this.selectItems[0].row : null
        }
        return result
      },
    },
    computed: {
      activeIcon() {
        return !!this.multiSelect ? 'fa-check-square' : 'fa-dot-circle-o'
      },
      inactiveIcon() {
        return !!this.multiSelect ? 'fa-square-o' : 'fa-circle-thin'
      },
    },
    mounted() {
    },
  }

</script>
