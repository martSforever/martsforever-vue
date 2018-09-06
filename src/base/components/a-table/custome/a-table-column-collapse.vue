<template>
  <a-table-column ref="tableColumn" :order="order" width="36px">
    <template slot="title" slot-scope="{}">
      <div class="a-table-standard-cell">
        <a-radio active-icon="fa-compress"
                 inactive-icon="fa-arrows-alt"
                 :value="totalChecked"
                 :disabled="true"
                 @click.native="_handleClick"/>
      </div>
    </template>
    <template slot-scope="{row,rowIndex}">
      <div class="a-table-standard-cell">
        <a-table-column-collapse-item :scope-slot-func="$scopedSlots.default"
                                      :row="row"
                                      :row-index="rowIndex"
                                      @mounted="_handleMounted"
                                      @destroyed="_handleDestroyed"
                                      @open="_handleOpen"
                                      @close="_handleClose"/>
      </div>
    </template>
  </a-table-column>
</template>

<script>
  import ATableColumn from "../a-table-column";
  import AIcon from "../../a-icon/a-icon";
  import ATableColumnCollapseItem from "./a-table-column-collapse-item";
  import RenderingScopeSlot from "../../rendering-scope-slot";

  export default {
    name: "a-table-column-collapse",
    components: {RenderingScopeSlot, ATableColumnCollapseItem, AIcon, ATableColumn},
    props: {
      order: {
        default: 9999
      },
      multiple: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        isTableColumn: true,                                //是否为table column
        totalChecked: false,                                //列表头绑定数据
        allItems: [],                                       //该列所有行对象
        openItems: [],                                      //该列所有打开的行对象
      }
    },
    watch: {},
    methods: {
      /*标准扩展方法*/
      getColumn() {
        return this.$refs.tableColumn.getColumn()
      },
      /*子行在初始化的时候，将该行添加到所有行中，以便全局控制*/
      _handleMounted(item) {
        if (JSON.stringify(item.row) !== JSON.stringify({}))
          this.allItems.push(item)
      },
      /*子行在销毁的时候，将该行从所有行中删除*/
      _handleDestroyed(item) {
        this.allItems.remove(item)
      },
      /*设置所有行为open或者close*/
      changeAll(flag) {
        this.allItems.forEach((item) => item.toggle(flag))
      },
      /*处理行打开动作*/
      _handleOpen(item) {
        if (!this.multiple && this.openItems.length > 0) this.openItems[0].close()
        this.totalChecked = true
        this.openItems.push(item)
      },
      /*处理行关闭动作*/
      _handleClose(item) {
        this.openItems.remove(item)
        !this.openItems.length > 0 && (this.totalChecked = false)
      },
      /*点击列表头动作*/
      _handleClick() {
        this.totalChecked = !this.totalChecked
        this.changeAll(this.totalChecked)
      },
    },
  }
</script>
