<template>
  <div class="a-tree-example">
    <a-tree :data="data1" options-key="children">
      <template slot-scope="{data}">
        {{data.name}}
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
            {name: '佛山市'},
            {name: '深圳市'}
          ]
        }
      }
    },
  }
</script>

<style scoped lang="scss">

</style>
