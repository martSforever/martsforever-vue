<template>
  <div class="a-table">
    <div>
      <a-button-group>
        <a-button @click="log">log</a-button>
      </a-button-group>
    </div>
    <a-table-head :fit-width="fitWidth"
                  :border-color="borderColor"
                  :border-size="borderSize"
                  :border-style="borderStyle"
                  @update:columns="columns = $event">
      <slot></slot>
    </a-table-head>
  </div>
</template>

<script>
  import ATableHead from "./a-table-head";
  import AScrollbar from "../a-scrollbar/a-scrollbar";
  import AButtonGroup from "../a-button/a-button-group";
  import AButton from "../a-button/a-button";

  export default {
    name: "a-table",
    components: {AButton, AButtonGroup, AScrollbar, ATableHead},
    props: {
      fitWidth: {
        type: Boolean,
        default: false,
        desc: '表格宽度是否自适应，当列宽不够需要自动拉伸以填充容器宽度的时候，该选项建议为true',
      },
      list: {
        type: Array,
        default: () => [],
        desc: '列表数据',
      },
      borderSize: {
        default: 6,
        desc: '边框宽度',
      },
      borderColor: {
        type: String,
        default: '#f2f2f2',
        desc: '边框颜色',
      },
      borderStyle: {
        type: String,
        default: 'solid',
        desc: '边框风格',
      },
    },
    data() {
      return {
        columns: null
      }
    },
    watch: {},
    methods: {
      log(e) {
        this.renderColumns.forEach((child) => {
          console.log(child.title)
        })
      },
    },
    computed: {
      renderColumns() {
        if (!this.columns || this.columns.length < 1) return []
        let ret = []

        function iterate(column) {
          if (!!column.children && column.children.length > 0) {
            column.children.forEach((child) => {
              iterate(child)
            })
          } else {
            ret.push(column)
          }
        }

        this.columns.forEach((child) => iterate(child))
        return ret
      },
    },
  }
</script>

<style lang="scss">
  .a-table {
    width: 100%;
    overflow: auto;
  }
</style>
