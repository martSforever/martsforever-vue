<template>
  <div>
    a-table-column-select
  </div>
</template>

<script>
  export default {
    name: "a-table-column-select",
    mounted() {
      /*@formatter:off*/
        return {
          width: '36px',
          order: 9999,
          titleRenderFunc: (h, {column}) => (<div class="a-table-standard-cell"><a-radio inactive-icon="fa-dot-circle-o"/></div>),
          colRenderFunc: (h, {rowIndex}) =>(<div class="a-table-standard-cell"><a-radio/></div>),
          }
        /*@formatter:on*/
    },
  }

</script>

<style lang="less">

</style>
