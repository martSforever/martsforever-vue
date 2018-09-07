import {getParentTrEl} from "../../../script/dom";

let TableEditMixin = {
  props: {
    row: {},                                //当前行数据
    rowIndex: {},                           //当前行索引
    field: {},                              //当前列使用的row中的属性
    editable: {                             //是否可编辑
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      isTableEditItem: true,                //是否为表格编辑组件
      currentValue: this.row[this.field],   //当前编辑双向绑定的值
      trEl: null,                           //当前单元格所属tr，tr的dom对象
      currentEditable: false,               //当前是否处于编辑状态
    }
  },
  watch: {
    row: {
      handler(newval) {
        /*当row中的属性被改变之后，刷新当前编辑双向绑定的值*/
        if (newval[this.field] !== this.currentValue) this.currentValue = newval[this.field]
      },
      deep: true
    },
    currentEditable(val) {
      /*当取消编辑状态之后，将当前双向绑定的值，重置会row中对象field的值*/
      if (!val) this.currentValue = this.row[this.field]
    },
  },
  mounted() {
    /*如果当前为表头单元格，直接返回*/
    if (JSON.stringify(this.row) === JSON.stringify({})) return

    /*为了方便列头单元格组件操作该列中所有的组件，在挂载的时候发出事件，将当前组件对象发出*/
    this.$emit('mounted', this)
    this.trEl = getParentTrEl(this.$el)
    this.trEl.addEventListener('dblclick', this.handleClickRow)
    this.$on('save-edit', this._handleSave)
    this.$on('cancel-edit', this._handleCancel)
  },

  methods: {
    handleClickRow(e) {
      this.currentEditable = true
    },

    _handleSave() {
      this.row[this.field] = this.currentValue
      !!this.handleSave && this.handleSave()
      this.currentEditable = false
    },

    _handleCancel() {
      !!this.handleCancel && this.handleCancel()
      this.currentEditable = false
    },
  },

  destroyed() {
    if (JSON.stringify(this.row) === JSON.stringify({})) return
    this.trEl.removeEventListener('click', this.handleClickRow)
  },
}

export default TableEditMixin
