<template>
  <div class="scoped-slot-child">
    <div>
      scoped-slot-child
    </div>
    <div class="head">
      <div class="slot-content">
        <slot :message="message" name="head"/>
      </div>
      <div class="render-func-content">
        <rendering-render-func v-if="!!renderHeadFunc" :render-func="renderHeadFunc" :data="{message}"/>
      </div>
      <div class="slot-scope-content">
        <rendering-scope-slot :scope-slot-func="$scopedSlots.head" :data="{message}"/>
      </div>
    </div>
    <div v-for="(item,index) in list" :key="index">
      <div class="slot-content">
        <slot :item="item" name="item"/>
      </div>
      <div class="render-func-content">
        <rendering-render-func v-if="!!renderItemFunc" :render-func="renderItemFunc" :data="{item:item}"/>
      </div>
      <div class="slot-scope-content">
        <rendering-scope-slot :scope-slot-func="$scopedSlots.item" :data="{item:item}"/>
      </div>
    </div>
  </div>
</template>


<script>

  /*
  *  在组件内部，有一种方式渲染调用组件传递的渲染函数，就是将渲染函数交由一个自定义组件rendering-render-func处理，自己动处理渲染函数
  *   有两种方式处理作用于插槽，一个是使用slot处理作用域插槽，还有一个是使用rendering-scope-slot，将组件中的$scopedSlots.#(具名插槽的话，就是插槽的name，否则就是default)，作为参数渲染
  */

  import RenderingScopeSlot from "../../base/components/rendering-scope-slot";
  import RenderingRenderFunc from "../../base/components/rendering-render-func";

  export default {
    name: "scoped-slot-child",
    components: {RenderingRenderFunc, RenderingScopeSlot},
    props: {
      renderHeadFunc: {
        type: Function
      },
      renderItemFunc: {
        type: Function
      },
    },
    data() {
      return {
        message: '22222',
        list: [
          {id: '1', name: '广州市'},
          {id: '2', name: '北京市'},
          {id: '3', name: '上海市'},
        ]
      }
    },
    mounted() {
      console.log(this.$scopedSlots)
    },
  }
</script>

<style lang="scss">
  .scoped-slot-child {
    .slot-content, .render-func-content, .slot-scope-content {
      height: 30px;
      line-height: 30px;
      color: white;
    }
    .slot-content {
      background-color: blueviolet;
    }
    .render-func-content {
      background-color: $text-color-main;
    }
    .slot-scope-content {
      background-color: $text-color-primary;
    }
  }
</style>
