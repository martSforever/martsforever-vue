<template>
  <div class="a-tree-example">
    <a-tree :data="data1"
            child-key="children"
            :render-func="renderTreeNode"
            :before-open="handleTreeBeforeOpen"
            :open-on-start="false"
            :initialized-on-start="false"
            check-key="checked"
            :open-on-click-content="true">
      <template slot-scope="item">
        <span class="name" style="background-color: #0ac2ff">{{item.name}}</span>
      </template>
    </a-tree>
  </div>
</template>

<script>
  import ATree from "../../base/components/a-tree/a-tree";

  export default {
    name: "a-tree-example",
    components: {ATree},
    data() {
      return {
        data1: {
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
      renderTreeNode(h, item) {
        return (
          <span class="name" style={{backgroundColor: 'blueviolet', marginRight: '12px'}}>{item.name}</span>
        )
      },
      handleTreeBeforeOpen(data, next) {
        console.log('handleTreeBeforeOpen', data)
        /*data.children.pushArray([
          {name: 'aaa'},
          {name: 'bbb'},
          {name: 'ccc'},
        ])*/
        /*setTimeout(() => {
          next()
        }, 300)*/
        next()
      },
    },
  }
</script>

<style lang="scss">
  .a-tree-example {
    .name {
      border-radius: $border-fillet;
      display: inline-block;
      color: white;
      height: 20px;
      width: 100px;
      text-align: center;
      line-height: 20px;
      user-select: none;
    }
  }

</style>
