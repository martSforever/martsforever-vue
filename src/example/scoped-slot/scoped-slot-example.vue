<template>
  <div class="scoped-slot-example">
    <scoped-slot-child :render-head-func="renderHead" :render-item-func="renderItem">
      <template slot-scope="{message}" slot="head">
        this is slot-scope content--->>>{{message}}--{{parentMessage}}
      </template>
      <template slot-scope="{item}" slot="item">
        <div>
          this is slot-scope item--->>>{{item.id}}+{{item.name}}
        </div>
      </template>
    </scoped-slot-child>
  </div>
</template>

<script>
  import ScopedSlotChild from "./scoped-slot-child";
  import ATree from "../../base/components/a-tree/a-tree";

  /*
  *  在调用组件方面，有两种方式将需要渲染的内容交由组件渲染，一种是通过作用域插槽，还有一种是使用渲染函数render
  */

  export default {
    name: "scoped-slot-example",
    components: {ATree, ScopedSlotChild},
    data() {
      return {
        parentMessage: '111111',
        cities: {
          name: '广东省',
          children: [
            {
              name: '广州市',
              children: [
                {name: '白云区'},
                {name: '越秀区'},
                {name: '天河区'},
              ]
            },
            {
              name: '佛山市',
              children: [
                {name: '禅城区'},
                {name: '顺德区'},
              ]
            },
            {name: '深圳市'}
          ]
        }
      }
    },
    methods: {
      renderHead(h, {message}) {
        return (
          <div>
            this is render func content--->>>{message}--{this.parentMessage}
          </div>
        )
      },
      renderItem(h, {item}) {
        return (
          <div>
            this is render func item--->>>{item.id}+{item.name}
          </div>
        )
      },
    },
  }
</script>

<style lang="scss">
  .scoped-slot-example {

  }
</style>
